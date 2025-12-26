import fs from 'fs';
import path from 'path';

// 🚨 CORREÇÃO CRÍTICA DO CAMINHO DA DATABASE 🚨
// Baseado na sua estrutura: dados/database/grupos/
const DATABASE_DIR = path.join(process.cwd(), 'dados', 'database');

// --- Funções Auxiliares ---
const getFunctions = (nazu, info) => {
    
    // 1. FUNÇÃO REPLY ROBUSTA (Para evitar falhas silenciosas)
    const reply = (text, options = {}) => {
        const jid = info.key.remoteJid;
        
        try {
            // Tentativa 1: Enviar com a citação original (quoted: info)
            return nazu.sendMessage(jid, { text, ...options }, { quoted: info });
        } catch (e) {
            // Tentativa 2: Enviar a mensagem sem a citação
            console.error('[ERRO DE REPLY] Falha na mensagem QUOTED, tentando sem citação:', e.message);
            try {
                return nazu.sendMessage(jid, { text, ...options }); 
            } catch (e2) {
                console.error('[ERRO FATAL] Falha no envio de texto simples! O socket está offline?', e2.message);
                return null;
            }
        }
    };
    
    // 2. Função para construir o caminho do arquivo de grupo
    const buildGroupFilePath = (groupId) => {
        return path.join(DATABASE_DIR, 'grupos', `${groupId}.json`); 
    }
    
    // 3. Função para obter o nome do usuário (Usada como FALLBACK ou para JID puro)
    const getUserName = (jid) => {
        // Retorna a parte numérica como fallback, mas usaremos info.pushName
        return jid.split('@')[0];
    };

    return { reply, buildGroupFilePath, getUserName };
};
// -------------------------


/**
 * Executa a lógica de advertência automática.
 * Retorna TRUE se o comando deve ser bloqueado, FALSE caso contrário.
 */
export async function autoWarnUser(senderJid, groupId, nazu, command, info) {
    const { reply, buildGroupFilePath, getUserName } = getFunctions(nazu, info);
    
    // Usamos info.pushName para o nome de exibição no grupo
    const displayUser = info.pushName || getUserName(senderJid);
    
    console.log(`\n[AUTO-WARN DEBUG] Tentativa de Adv para: ${senderJid} no grupo: ${groupId}. Comando: ${command}`);

    const groupFilePath = buildGroupFilePath(groupId);
    let groupData;
    
    // Tentativa de leitura do arquivo
    try {
        if (!fs.existsSync(groupFilePath)) {
            console.log(`[AUTO-WARN DEBUG] Arquivo de grupo não encontrado. Criando novo.`);
            groupData = { warnings: {}, config: {} };
        } else {
            groupData = JSON.parse(fs.readFileSync(groupFilePath, 'utf-8'));
        }
    } catch (error) {
        console.error(`[AUTO-WARN ERROR] Falha na leitura/parsing dos dados do grupo ${groupId}:`, error.message);
        await reply("❌ Erro interno ao verificar dados do grupo. Não foi possível aplicar Auto-Warn.");
        return true; 
    }
    
    groupData.config = groupData.config || {};
    
    // 1. VERIFICAÇÃO DE STATUS (LIGADO/DESLIGADO)
    if (!groupData.config.auto_warn_enabled) {
         console.log(`[AUTO-WARN DEBUG] Auto-Warn DESATIVADO no grupo. Permite o comando.`);
         return false; // Permite o comando
    }
    
    console.log(`[AUTO-WARN DEBUG] Auto-Warn ATIVADO. Prosseguindo com a advertência.`);
    
    if (senderJid === nazu.user.id.split(':')[0] + '@s.whatsapp.net') {
        return false; 
    }
    
    const reason = `Uso do comando [${command}] sem ser Dono, Subdono ou Administrador.`;
    
    // 2. ADICIONA NOVA ADVERTÊNCIA
    groupData.warnings = groupData.warnings || {};
    groupData.warnings[senderJid] = groupData.warnings[senderJid] || [];
    groupData.warnings[senderJid].push({
        reason,
        timestamp: Date.now(),
        issuer: nazu.user.id 
    });
    
    const warningCount = groupData.warnings[senderJid].length;
    
    // 3. SALVA OS DADOS ATUALIZADOS
    try {
        fs.writeFileSync(groupFilePath, JSON.stringify(groupData, null, 2), 'utf-8');
        console.log(`[AUTO-WARN DEBUG] Adv salva para ${senderJid}. Total: ${warningCount}`);
    } catch (error) {
        console.error(`[AUTO-WARN ERROR] Falha ao salvar dados do grupo ${groupId}:`, error.message);
        await reply("❌ Erro interno ao salvar a advertência. Auto-Warn não aplicado.");
        return true; // Bloqueia o comando
    }
    
    // 4. VERIFICA E BANIMENTO
    if (warningCount >= 3) {
        try {
            // MENSAGEM DE BANIMENTO COM MENÇÃO CORRETA
            await reply(`🚫 BANIDO: O usuário @${displayUser} atingiu ${warningCount} advertências e será BANIDO!\nMotivo: ${reason}`, {
                mentions: [senderJid] // CRÍTICO: Inclui o JID na lista de menções
            });
            
            await nazu.groupParticipantsUpdate(groupId, [senderJid], 'remove');
            
            delete groupData.warnings[senderJid];
            fs.writeFileSync(groupFilePath, JSON.stringify(groupData, null, 2), 'utf-8');
            console.log(`[AUTO-WARN DEBUG] Usuário banido e advertências limpas.`);

            return true; 
        } catch (e) {
            console.error(`[AUTO-WARN ERROR] Falha ao banir usuário ${senderJid}:`, e.message);
            // MENSAGEM DE ERRO DE BANIMENTO
            await reply(`⚠️ ERRO: O usuário @${displayUser} atingiu 3 advs, mas falhei ao banir.`, {
                mentions: [senderJid]
            });
            delete groupData.warnings[senderJid];
            fs.writeFileSync(groupFilePath, JSON.stringify(groupData, null, 2), 'utf-8');
            return true; // Bloqueia o comando
        }
    } else {
        // 5. NOTIFICAÇÃO (Advertência Simples)
        
        // MENSAGEM DE ADVERTÊNCIA COM MENÇÃO CORRETA
        await reply(`⚠️ ADVERTÊNCIA: O usuário @${displayUser} recebeu adv automática (${warningCount}/3).\nMotivo: ${reason}`, {
            mentions: [senderJid] // CRÍTICO: Inclui o JID na lista de menções
        });
        
        console.log(`[AUTO-WARN DEBUG] Notificação de adv enviada. Não banido.`);
        return true; // Bloqueia o comando
    }
}