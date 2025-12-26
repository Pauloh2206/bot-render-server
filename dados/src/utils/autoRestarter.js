import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutoRestarter {
    constructor() {
        this.restartCount = 0;
        this.maxRestarts = 5;
        this.restartCooldown = 30000; // 30 segundos
        this.lastRestart = 0;
        this.criticalErrors = [
            'ENOSPC', // No space left on device
            'ENOMEM', // Out of memory
            'EMFILE', // Too many open files
            'ECONNRESET', // Connection reset
            'ERR_UNHANDLED_ERROR',
            'UnhandledPromiseRejectionWarning'
        ];
        this.logFile = path.join(__dirname, '../../../logs/auto-restart.log');
        this.pidFile = path.join(__dirname, '../../../nazuna.pid');
        this.isShuttingDown = false;
        this.childProcess = null;
        
        this.setupErrorHandlers();
        this.setupGracefulShutdown();
    }

    /**
     * Configura handlers para erros não tratados
     */
    setupErrorHandlers() {
        // Captura erros não tratados
        process.on('uncaughtException', async (error) => {
            await this.handleCriticalError('uncaughtException', error);
        });

        // Captura promise rejections não tratadas
        process.on('unhandledRejection', async (reason, promise) => {
            await this.handleCriticalError('unhandledRejection', reason);
        });

        // Captura warnings
        process.on('warning', async (warning) => {
            if (warning.name === 'MaxListenersExceededWarning') {
                await this.logEvent('warning', `MaxListeners exceeded: ${warning.message}`);
            }
        });

        // Monitora uso de memória
        setInterval(async () => {
            await this.checkMemoryUsage();
        }, 60000); // A cada minuto
    }

    /**
     * Configura shutdown gracioso
     */
    setupGracefulShutdown() {
        const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
        
        signals.forEach((signal) => {
            process.on(signal, async () => {
                await this.gracefulShutdown(signal);
            });
        });
    }

    /**
     * Trata erros críticos
     */
    async handleCriticalError(type, error) {
        try {
            const errorMessage = error?.message || error?.toString() || 'Erro desconhecido';
            const errorCode = error?.code || error?.errno || 'UNKNOWN';
            
            await this.logEvent('critical_error', {
                type,
                message: errorMessage,
                code: errorCode,
                stack: error?.stack || 'Stack não disponível',
                timestamp: new Date().toISOString(),
                memoryUsage: process.memoryUsage(),
                restartCount: this.restartCount
            });

            // Verifica se é um erro crítico que requer reinício
            const needsRestart = this.criticalErrors.some(criticalError => 
                errorMessage.includes(criticalError) || errorCode === criticalError
            );

            if (needsRestart) {
                await this.initiateRestart(`Erro crítico detectado: ${errorCode} - ${errorMessage}`);
            } else {
                console.error(`❌ Erro não crítico capturado (${type}):`, errorMessage);
            }
        } catch (logError) {
            console.error('❌ Erro ao processar erro crítico:', logError.message);
            // Se não conseguir logar, tenta reiniciar imediatamente
            await this.forceRestart('Falha no sistema de logs');
        }
    }

    /**
     * Verifica uso de memória
     */
    async checkMemoryUsage() {
        try {
            const memUsage = process.memoryUsage();
            const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
            const memTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
            
            // Log de uso de memória alto
            if (memUsedMB > 512) { // > 512MB
                await this.logEvent('high_memory', {
                    heapUsed: memUsedMB,
                    heapTotal: memTotalMB,
                    rss: Math.round(memUsage.rss / 1024 / 1024),
                    external: Math.round(memUsage.external / 1024 / 1024)
                });
            }

            // Reinicia se uso de memória for crítico
            if (memUsedMB > 1024) { // > 1GB
                await this.initiateRestart(`Uso crítico de memória: ${memUsedMB}MB`);
            }
        } catch (error) {
            console.error('❌ Erro ao verificar uso de memória:', error.message);
        }
    }

    /**
     * Inicia processo de reinicialização
     */
    async initiateRestart(reason) {
        if (this.isShuttingDown) return;

        const now = Date.now();
        
        // Verifica cooldown entre reinicializações
        if (now - this.lastRestart < this.restartCooldown) {
            await this.logEvent('restart_blocked', `Restart bloqueado por cooldown. Razão: ${reason}`);
            return;
        }

        // Verifica limite de reinicializações
        if (this.restartCount >= this.maxRestarts) {
            await this.logEvent('restart_limit', `Limite de ${this.maxRestarts} reinicializações atingido. Sistema será finalizado.`);
            await this.gracefulShutdown('MAX_RESTARTS_REACHED');
            return;
        }

        this.restartCount++;
        this.lastRestart = now;
        this.isShuttingDown = true;

        await this.logEvent('restart_initiated', {
            reason,
            count: this.restartCount,
            maxRestarts: this.maxRestarts
        });

        try {
            // Força limpeza antes do restart
            await this.performEmergencyCleanup();
            
            // Salva estado atual
            await this.saveRestartState();
            
            // Reinicia processo
            await this.restartProcess();
        } catch (error) {
            console.error('❌ Erro durante reinicialização:', error.message);
            await this.forceRestart('Falha no processo de reinicialização');
        }
    }

    /**
     * Força reinicialização imediata
     */
    async forceRestart(reason) {
        
        try {
            await this.logEvent('force_restart', reason);
            await this.saveRestartState();
        } catch {
            // Ignora erros de log em restart forçado
        }

        // Mata processo atual e inicia novo
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }

    /**
     * Realiza limpeza emergencial antes do restart
     */
    async performEmergencyCleanup() {
        try {
            
            // Força garbage collection se disponível
            if (global.gc) {
                global.gc();
            }

            // Limpa caches em memória
            if (global.messagesCache) {
                global.messagesCache.clear();
            }

            // Limpa arquivos temporários
            const tempDirs = ['/tmp/nazuna-*', './temp/*'];
            
            for (const tempPattern of tempDirs) {
                try {
                    const { exec } = await import('child_process');
                    exec(`rm -rf ${tempPattern}`, { timeout: 5000 }, (error) => {
                        if (error && !error.message.includes('No such file')) {
                            console.warn(`⚠️ Erro na limpeza de ${tempPattern}:`, error.message);
                        }
                    });
                } catch {
                    // Ignora erros de limpeza
                }
            }

        } catch (error) {
            console.warn('⚠️ Erro na limpeza emergencial:', error.message);
        }
    }

    /**
     * Salva estado para preservar entre reinicializações
     */
    async saveRestartState() {
        try {
            const state = {
                restartCount: this.restartCount,
                lastRestart: this.lastRestart,
                timestamp: new Date().toISOString(),
                pid: process.pid,
                memoryUsage: process.memoryUsage(),
                uptime: process.uptime()
            };

            const stateFile = path.join(__dirname, '../../../restart-state.json');
            await fs.writeFile(stateFile, JSON.stringify(state, null, 2));
            
            // Salva PID atual
            await fs.writeFile(this.pidFile, process.pid.toString());
        } catch (error) {
            console.warn('⚠️ Erro ao salvar estado:', error.message);
        }
    }

    /**
     * Carrega estado de reinicializações anteriores
     */
    async loadRestartState() {
        try {
            const stateFile = path.join(__dirname, '../../../restart-state.json');
            const stateData = await fs.readFile(stateFile, 'utf8');
            const state = JSON.parse(stateData);
            
            // Verifica se é do mesmo dia
            const stateDate = new Date(state.timestamp).toDateString();
            const today = new Date().toDateString();
            
            if (stateDate === today) {
                this.restartCount = state.restartCount || 0;
                this.lastRestart = state.lastRestart || 0;
                
                await this.logEvent('state_loaded', {
                    previousRestarts: this.restartCount,
                    previousPid: state.pid
                });
            } else {
                // Novo dia, reseta contador
                this.restartCount = 0;
                this.lastRestart = 0;
            }
        } catch (error) {
            // Arquivo não existe ou erro de parsing - não é crítico
            this.restartCount = 0;
            this.lastRestart = 0;
        }
    }

    /**
     * Reinicia o processo
     */
    async restartProcess() {
        try {
            console.log('🔄 [RENDER RESTART] Solicitando reinício limpo via process.exit(0)...');
            await this.logEvent('restart_initiated_render', 'O Render detectará o desligamento e reiniciará o container automaticamente.');
            
            // Aguarda um pouco para logs serem gravados
            setTimeout(() => {
                process.exit(0);
            }, 2000);
            
        } catch (error) {
            console.error('❌ Falha na solicitação de reinício:', error.message);
            process.exit(1);
        }
    }

    /**
     * Shutdown gracioso
     */
    async gracefulShutdown(signal) {
        if (this.isShuttingDown) return;
        this.isShuttingDown = true;

        try {
            await this.logEvent('graceful_shutdown', signal);
            
            // Limpa arquivo PID
            try {
                await fs.unlink(this.pidFile);
            } catch {
                // Ignora erro se arquivo não existir
            }

            // Mata processo filho se existir
            if (this.childProcess && !this.childProcess.killed) {
                this.childProcess.kill('SIGTERM');
            }

            // Força garbage collection final
            if (global.gc) {
                global.gc();
            }

            // Finaliza processo após breve delay
            setTimeout(() => {
                process.exit(signal === 'MAX_RESTARTS_REACHED' ? 1 : 0);
            }, 2000);
            
        } catch (error) {
            console.error('❌ Erro durante shutdown:', error.message);
            process.exit(1);
        }
    }

    /**
     * Registra eventos no log
     */
    async logEvent(type, data) {
        try {
            // Garante que diretório de logs existe
            const logsDir = path.dirname(this.logFile);
            await fs.mkdir(logsDir, { recursive: true });

            const logEntry = {
                timestamp: new Date().toISOString(),
                type,
                data,
                pid: process.pid,
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage()
            };

            const logLine = JSON.stringify(logEntry) + '\n';
            await fs.appendFile(this.logFile, logLine);
            
        } catch (error) {
            console.error('❌ Erro ao escrever log:', error.message);
        }
    }

    /**
     * Inicia o sistema de auto-restart
     */
    async start() {
        try {
            await this.loadRestartState();
            
            await this.logEvent('auto_restart_started', {
                restartCount: this.restartCount,
                maxRestarts: this.maxRestarts,
                pid: process.pid
            });

            // Verifica se foi reiniciado
            if (process.env.NAZUNA_RESTARTED === 'true') {
                await this.logEvent('restart_success', {
                    previousRestartCount: process.env.NAZUNA_RESTART_COUNT || 'unknown'
                });
            }
        } catch (error) {
            console.error('❌ Erro ao iniciar sistema de auto-restart:', error.message);
        }
    }

    /**
     * Para o sistema de auto-restart
     */
    async stop() {
        this.isShuttingDown = true;
        await this.logEvent('auto_restart_stopped', 'Manual stop');
    }

    /**
     * Obtém estatísticas do sistema
     */
    getStats() {
        return {
            restartCount: this.restartCount,
            maxRestarts: this.maxRestarts,
            lastRestart: this.lastRestart,
            isShuttingDown: this.isShuttingDown,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            pid: process.pid
        };
    }

    /**
     * Reinicialização manual (para comandos do bot)
     */
    async manualRestart(reason = 'Reinicialização manual') {
        await this.logEvent('manual_restart', reason);
        await this.initiateRestart(reason);
    }
}

export default AutoRestarter;