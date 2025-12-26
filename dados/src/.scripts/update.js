import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { exec } from 'child_process';
import os from 'os';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/Pauloh2206/Shania-Yan-Mod.git';
// ---------------------------------------

const BACKUP_DIR = path.join(process.cwd(), `backup_${new Date().toISOString().replace(/[:.]/g, '_').replace(/T/, '_')}`);
const TEMP_DIR = path.join(process.cwd(), 'temp_nazuna');
const isWindows = os.platform() === 'win32';

// --- VARIÁVEIS DE CUSTOMIZAÇÃO (MARCADORES REMOVIDOS) ---
// Seus arquivos index.js e update.js serão agora buscados diretamente do seu repositório.
// --------------------------------------------------------

const colors = {
reset: '\x1b[0m',
green: '\x1b[1;32m',
red: '\x1b[1;31m',
blue: '\x1b[1;34m',
yellow: '\x1b[1;33m',
cyan: '\x1b[1;36m',
magenta: '\x1b[1;35m',
dim: '\x1b[2m',
bold: '\x1b[1m',
};

function printMessage(text) {
console.log(`${colors.green}${text}${colors.reset}`);
}

function printWarning(text) {
console.log(`${colors.red}${text}${colors.reset}`);
}

function printInfo(text) {
console.log(`${colors.cyan}${text}${colors.reset}`);
}

function printDetail(text) {
console.log(`${colors.dim}${text}${colors.reset}`);
}

function printSeparator() {
console.log(`${colors.blue}============================================${colors.reset}`);
}

async function cleanupOldBackups() {
 printInfo('🧹 Verificando e removendo backups antigos...');
 try {
  const items = await fs.readdir(process.cwd());
  const backupPattern = /^backup_\d{4}-\d{2}-\d{2}_/; // Padrão 'backup_YYYY-MM-DD_'

  for (const item of items) {
   if (backupPattern.test(item)) {
    const fullPath = path.join(process.cwd(), item);
    if (fsSync.statSync(fullPath).isDirectory()) {
     // Evita deletar o diretório de backup atual
     if (fullPath !== BACKUP_DIR) {
     printDetail(`🗑️ Removendo backup antigo: ${item}`);
     await fs.rm(fullPath, { recursive: true, force: true });
     }
    }
   }
  }
  printDetail('✅ Limpeza de backups antigos concluída.');
 } catch (error) {
  printWarning(`⚠️ Erro ao limpar backups antigos: ${error.message}`);
 }
}


function setupGracefulShutdown() {
const shutdown = () => {
 console.log('\n');
 printWarning('🛑 Atualização cancelada pelo usuário.');
 process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
}

async function displayHeader() {
const header = [
 `${colors.bold}🚀 Shania Yan (Nazu) - Atualizador${colors.reset}`,
 `${colors.bold}👨‍💻 Adaptado por Paulo${colors.reset}`,
];

printSeparator();
for (const line of header) {
 process.stdout.write(line + '\n');
}
printSeparator();
console.log();
}

async function checkRequirements() {
printInfo('🔍 Verificando requisitos do sistema...');

try {
 await execAsync('git --version');
 printDetail('✅ Git encontrado.');
} catch (error) {
 printWarning('⚠️ Git não encontrado! É necessário para atualizar o Nazuna.');
 if (isWindows) {
 printInfo('📥 Instale o Git em: https://git-scm.com/download/win');
 } else if (os.platform() === 'darwin') {
 printInfo('📥 Instale o Git com: brew install git');
 } else {
 printInfo('📥 Instale o Git com: sudo apt-get install git (Ubuntu/Debian) ou equivalente.');
 }
 process.exit(1);
}

try {
 await execAsync('npm --version');
 printDetail('✅ NPM encontrado.');
} catch (error) {
 printWarning('⚠️ NPM não encontrado! É necessário para instalar dependências.');
 printInfo('📥 Instale o Node.js e NPM em: https://nodejs.org');
 process.exit(1);
}

printDetail('✅ Todos os requisitos atendidos.');
}

async function confirmUpdate() {
printWarning('⚠️ Atenção: A atualização sobrescreverá arquivos existentes, exceto configurações e dados salvos.');
printInfo('📂 Um backup será criado automaticamente.');
printWarning('🛑 Pressione Ctrl+C para cancelar a qualquer momento.');

return new Promise((resolve) => {
 let countdown = 5;
 const timer = setInterval(() => {
 process.stdout.write(`\r⏳ Iniciando em ${countdown} segundos...${' '.repeat(20)}`);
 countdown--;

 if (countdown < 0) {
  clearInterval(timer);
  process.stdout.write('\r        \n');
  printMessage('🚀 Prosseguindo com a atualização...');
  resolve();
 }
 }, 1000);
});
}

// --- FUNÇÃO createBackup ---
async function createBackup() {
// Limpa backups antigos antes de criar o novo
await cleanupOldBackups();

printMessage('📁 Criando backup dos arquivos...');

try {
 // Validate backup directory path
 if (!BACKUP_DIR || BACKUP_DIR.includes('..')) {
 throw new Error('Caminho de backup inválido');
 }

 // Criação dos diretórios no backup.
 await fs.mkdir(path.join(BACKUP_DIR, 'dados', 'database'), { recursive: true });
 await fs.mkdir(path.join(BACKUP_DIR, 'dados', 'midias'), { recursive: true });
 await fs.mkdir(path.join(BACKUP_DIR, 'dados', 'src'), { recursive: true }); // Garante que a pasta src existe no backup

 const databaseDir = path.join(process.cwd(), 'dados', 'database');
 if (fsSync.existsSync(databaseDir)) {
 printDetail('📂 Copiando diretório de banco de dados...');
 try {
  await fs.access(databaseDir);
  await fs.cp(databaseDir, path.join(BACKUP_DIR, 'dados', 'database'), { recursive: true });
 } catch (accessError) {
  printWarning(`⚠️ Não foi possível acessar o diretório de banco de dados: ${accessError.message}`);
  throw new Error('Falha ao acessar diretório de dados para backup');
 }
 }

 const configFile = path.join(process.cwd(), 'dados', 'src', 'config.json');
 if (fsSync.existsSync(configFile)) {
 printDetail('📝 Copiando arquivo de configuração...');
 try {
  await fs.access(configFile, fsSync.constants.R_OK);
  await fs.copyFile(configFile, path.join(BACKUP_DIR, 'dados', 'src', 'config.json'));
 } catch (accessError) {
  printWarning(`⚠️ Não foi possível acessar o arquivo de configuração: ${accessError.message}`);
  throw new Error('Falha ao acessar arquivo de configuração para backup');
 }
 }
 
 const midiasDir = path.join(process.cwd(), 'dados', 'midias');
 if (fsSync.existsSync(midiasDir)) {
 printDetail('🖼️ Copiando diretório de mídias...');
 try {
  await fs.access(midiasDir);
  await fs.cp(midiasDir, path.join(BACKUP_DIR, 'dados', 'midias'), { recursive: true });
 } catch (accessError) {
  printWarning(`⚠️ Não foi possível acessar o diretório de mídias: ${accessError.message}`);
  throw new Error('Falha ao acessar diretório de mídias para backup');
 }
 }

 // Verifica se os backups cruciais foram criados
 const backupSuccess = (
 fsSync.existsSync(path.join(BACKUP_DIR, 'dados', 'database')) ||
 fsSync.existsSync(path.join(BACKUP_DIR, 'dados', 'src', 'config.json'))
 );

 if (!backupSuccess) {
 throw new Error('Backup incompleto - dados cruciais não foram copiados');
 }

 printMessage(`✅ Backup salvo em: ${BACKUP_DIR}`);
} catch (error) {
 printWarning(`❌ Erro ao criar backup: ${error.message}`);
 printInfo('📝 A atualização será cancelada para evitar perda de dados.');
 throw error;
}
}
// --- FIM createBackup ---

async function downloadUpdate() {
printMessage('📥 Baixando a versão mais recente do Nazuna...');

try {
 if (!TEMP_DIR || TEMP_DIR.includes('..')) {
 throw new Error('Caminho de diretório temporário inválido');
 }

 if (fsSync.existsSync(TEMP_DIR)) {
 printDetail('🔄 Removendo diretório temporário existente...');
 try {
  await fs.rm(TEMP_DIR, { recursive: true, force: true });
 } catch (rmError) {
  printWarning(`⚠️ Não foi possível remover diretório temporário existente: ${rmError.message}`);
  throw new Error('Falha ao limpar diretório temporário');
 }
 }

 printDetail('🔄 Clonando repositório...');
 let gitProcess;
 try {
 gitProcess = exec(`git clone --depth 1 ${REPO_URL} "${TEMP_DIR}"`, (error) => {
  if (error) {
  // O tratamento principal está no 'close'
  }
 });
 } catch (execError) {
 printWarning(`❌ Falha ao iniciar processo Git: ${execError.message}`);
 throw new Error('Falha ao iniciar processo de download');
 }

 const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
 let i = 0;
 const interval = setInterval(() => {
 process.stdout.write(`\r${spinner[i]} Baixando...`);
 i = (i + 1) % spinner.length;
 }, 100);

 return new Promise((resolve, reject) => {
 gitProcess.on('close', async (code) => {
  clearInterval(interval);
  process.stdout.write('\r    \r');
 
  if (code !== 0) {
  printWarning(`❌ Git falhou com código de saída ${code}`);
  reject(new Error(`Git clone failed with exit code ${code}`));
  return;
  }

  if (!fsSync.existsSync(TEMP_DIR)) {
  reject(new Error('Diretório temporário não foi criado após o clone'));
  return;
  }

  const gitDir = path.join(TEMP_DIR, '.git');
  if (!fsSync.existsSync(gitDir)) {
  reject(new Error('Clone do repositório Git inválido'));
  return;
  }

  try {
  const readmePath = path.join(TEMP_DIR, 'README.md');
  if (fsSync.existsSync(readmePath)) {
   await fs.unlink(readmePath);
  }
  } catch (unlinkError) {
  printWarning(`⚠️ Não foi possível remover README.md: ${unlinkError.message}`);
  }

  printMessage('✅ Download concluído com sucesso.');
  resolve();
 });

 gitProcess.on('error', (error) => {
  clearInterval(interval);
  process.stdout.write('\r    \r');
  printWarning(`❌ Erro no processo Git: ${error.message}`);
  reject(error);
 });
 });
} catch (error) {
 printWarning(`❌ Falha ao baixar a atualização: ${error.message}`);
 printInfo('🔍 Verificando conectividade com o GitHub...');
 try {
 await execAsync(isWindows ? 'ping github.com -n 1' : 'ping -c 1 github.com');
 printWarning('⚠️ Verifique permissões ou configuração do Git.');
 } catch {
 printWarning('⚠️ Sem conexão com a internet. Verifique sua rede.');
 }
 throw error;
}
}

// --- FUNÇÃO cleanOldFiles (ADAPTADA) ---
async function cleanOldFiles(options = {}) {
const { removeNodeModules = true, removePackageLock = true } = options;
printMessage('🧹 Limpando arquivos antigos...');

try {
 const itemsToDelete = [
 { path: path.join(process.cwd(), '.git'), type: 'dir', name: '.git' },
 { path: path.join(process.cwd(), '.github'), type: 'dir', name: '.github' },
 { path: path.join(process.cwd(), '.npm'), type: 'dir', name: '.npm' },
 { path: path.join(process.cwd(), 'README.md'), type: 'file', name: 'README.md' },
 ];

 if (removeNodeModules) {
 itemsToDelete.push({ path: path.join(process.cwd(), 'node_modules'), type: 'dir', name: 'node_modules' });
 } else {
 printDetail('🛠️ Mantendo node_modules existente.');
 }

 if (removePackageLock) {
 itemsToDelete.push({ path: path.join(process.cwd(), 'package-lock.json'), type: 'file', name: 'package-lock.json' });
 } else {
 printDetail('🛠️ Mantendo package-lock.json existente.');
 }

 for (const item of itemsToDelete) {
 if (fsSync.existsSync(item.path)) {
  printDetail(`📂 Removendo ${item.name}...`);
  if (item.type === 'dir') {
  await fs.rm(item.path, { recursive: true, force: true });
  } else {
  await fs.unlink(item.path);
  }
 }
 }

 const dadosDir = path.join(process.cwd(), 'dados');
 if (fsSync.existsSync(dadosDir)) {
 printDetail('📂 Removendo diretório de código-fonte antigo...');

 // Remove o diretório SRC inteiro (exceto database e midias)
 const srcDir = path.join(dadosDir, 'src');
 if(fsSync.existsSync(srcDir)){
    await fs.rm(srcDir, { recursive: true, force: true });
    printDetail('✅ Diretório dados/src removido para garantir a cópia limpa.');
 }

 printMessage('✅ Limpeza concluída com sucesso.');
 }

} catch (error) {
 printWarning(`❌ Erro ao limpar arquivos antigos: ${error.message}`);
 throw error;
}
}
// --- FIM cleanOldFiles ---


// --- FUNÇÃO applyUpdate CORRIGIDA ---
async function applyUpdate() {
printMessage('🚀 Aplicando atualização (cópia direcionada)...');

try {
 // 1. CÓPIA DE ARQUIVOS NA RAIZ (package.json, etc.)
 printDetail('📝 Copiando arquivos da raiz...');
 const rootItems = await fs.readdir(TEMP_DIR);
 for (const item of rootItems) {
  if (item !== 'dados' && item !== '.git') {
  const src = path.join(TEMP_DIR, item);
  const dest = path.join(process.cwd(), item);
  if (fsSync.statSync(src).isDirectory()) {
   await fs.cp(src, dest, { recursive: true });
  } else {
   await fs.copyFile(src, dest);
  }
  }
 }
 
 // 2. CÓPIA DE DADOS/SRC (Onde está index.js e youtube.js)
 // O diretório dados/src foi removido em cleanOldFiles. Precisamos criá-lo e copiar o novo código.
 printDetail('📂 Copiando novos arquivos de código (dados/src)...');
 const tempSrcDir = path.join(TEMP_DIR, 'dados', 'src');
 const currentSrcDir = path.join(process.cwd(), 'dados', 'src');

 await fs.mkdir(currentSrcDir, { recursive: true });

 await fs.cp(tempSrcDir, currentSrcDir, { recursive: true });

 printMessage('✅ Atualização aplicada com sucesso.');
} catch (error) {
 printWarning(`❌ Erro ao aplicar atualização: ${error.message}`);
 throw error;
}
}
// --- FIM applyUpdate CORRIGIDA ---

// --- FUNÇÃO restoreBackup (ATUALIZADA) ---
async function restoreBackup() {
printMessage('📂 Restaurando backup...');

try {
 // Cria os diretórios necessários na instalação atual
 await fs.mkdir(path.join(process.cwd(), 'dados', 'database'), { recursive: true });
 await fs.mkdir(path.join(process.cwd(), 'dados', 'midias'), { recursive: true });
 // Garante que a pasta src existe antes de restaurar o config.json
 await fs.mkdir(path.join(process.cwd(), 'dados', 'src'), { recursive: true }); 


 // Restaura o database
 const backupDatabaseDir = path.join(BACKUP_DIR, 'dados', 'database');
 if (fsSync.existsSync(backupDatabaseDir)) {
 printDetail('📂 Restaurando banco de dados...');
 await fs.cp(backupDatabaseDir, path.join(process.cwd(), 'dados', 'database'), { recursive: true });
 }

 // Restaura o config.json
 const backupConfigFile = path.join(BACKUP_DIR, 'dados', 'src', 'config.json');
 if (fsSync.existsSync(backupConfigFile)) {
 printDetail('📝 Restaurando arquivo de configuração (config.json)...');
 await fs.copyFile(backupConfigFile, path.join(process.cwd(), 'dados', 'src', 'config.json'));
 }

 // Restaura as mídias
 const backupMidiasDir = path.join(BACKUP_DIR, 'dados', 'midias');
 if (fsSync.existsSync(backupMidiasDir)) {
 printDetail('🖼️ Restaurando diretório de mídias...');
 await fs.cp(backupMidiasDir, path.join(process.cwd(), 'dados', 'midias'), { recursive: true });
 }

 printMessage('✅ Backup restaurado com sucesso.');
} catch (error) {
 printWarning(`❌ Erro ao restaurar backup: ${error.message}`);
 throw error;
}
}
// --- FIM restoreBackup ---

async function checkDependencyChanges() {
printInfo('🔍 Verificando mudanças nas dependências...');

try {
 const currentPackageJsonPath = path.join(process.cwd(), 'package.json');
 const newPackageJsonPath = path.join(TEMP_DIR, 'package.json');
 if (!fsSync.existsSync(currentPackageJsonPath) || !fsSync.existsSync(newPackageJsonPath)) {
 printDetail('📦 Arquivo package.json não encontrado, instalação será necessária');
 return 'MISSING_PACKAGE_JSON';
 }
 const currentPackage = JSON.parse(await fs.readFile(currentPackageJsonPath, 'utf8'));
 const newPackage = JSON.parse(await fs.readFile(newPackageJsonPath, 'utf8'));
 const relevantKeys = ['dependencies', 'devDependencies', 'optionalDependencies', 'scripts'];
 let changed = false;
 for (const key of relevantKeys) {
 const a = JSON.stringify(currentPackage[key] || {});
 const b = JSON.stringify(newPackage[key] || {});
 if (a !== b) changed = true;
 }
 if (changed) {
 printDetail('📦 Dependências/scripts alterados, reinstalação necessária');
 return 'DEPENDENCIES_CHANGED';
 }
 const nodeModulesPath = path.join(process.cwd(), 'node_modules');
 if (!fsSync.existsSync(nodeModulesPath)) {
 printDetail('📦 node_modules não encontrado, instalação necessária');
 return 'MISSING_NODE_MODULES';
 }
 const allDeps = Object.keys({
 ...currentPackage.dependencies,
 ...currentPackage.devDependencies,
 ...currentPackage.optionalDependencies
 });
 for (const depName of allDeps) {
 const depPath = path.join(nodeModulesPath, depName);
 if (!fsSync.existsSync(depPath)) {
  printDetail(`📦 Dependência não encontrada: ${depName}`);
  return 'MISSING_DEPENDENCIES';
 }
 }
 printDetail('✅ Nenhuma dependência alterada, reinstalação não necessária');
 return 'NO_CHANGES';
} catch (error) {
 printWarning(`❌ Erro ao verificar dependências: ${error.message}`);
 return 'ERROR';
}
}

async function installDependencies(precomputedResult) {
const checkResult = precomputedResult ?? await checkDependencyChanges();
if (checkResult === 'NO_CHANGES') {
 printMessage('⚡ Dependências já estão atualizadas, pulando instalação');
 return;
}
printMessage('📦 Instalando dependências...');
try {
 await new Promise((resolve, reject) => {
 const npmProcess = exec('npm run config:install', { shell: isWindows }, (error) =>
  error ? reject(error) : resolve()
 );
 const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
 let i = 0;
 const interval = setInterval(() => {
  process.stdout.write(`\r${spinner[i]} Instalando dependências...`);
  i = (i + 1) % spinner.length;
 }, 100);
 npmProcess.on('close', (code) => {
  clearInterval(interval);
  process.stdout.write('\r        \r');
  if (code === 0) {
  resolve();
  } else {
  reject(new Error(`NPM install failed with exit code ${code}`));
  }
 });
 });
 const nodeModulesPath = path.join(process.cwd(), 'node_modules');
 if (!fsSync.existsSync(nodeModulesPath)) {
 throw new Error('Diretório node_modules não foi criado após a instalação');
 }
 printMessage('✅ Dependências instaladas com sucesso.');
} catch (error) {
 printWarning(`❌ Falha ao instalar dependências: ${error.message}`);
 printInfo('📝 Tente executar manualmente: npm run config:install');
 throw error;
}
}

// --- FUNÇÃO cleanupTempDir (SUA FUNÇÃO DE LIMPEZA DE TEMP) ---
async function cleanupTempDir() {
printMessage('🧹 Limpando diretório temporário de download...');

try {
 if (fsSync.existsSync(TEMP_DIR)) {
  await fs.rm(TEMP_DIR, { recursive: true, force: true });
  printDetail('✅ Diretório temporário removido.');
 }
} catch (error) {
 printWarning(`❌ Erro ao limpar arquivos temporários: ${error.message}`);
}
}

async function main() {
let backupCreated = false;
let downloadSuccessful = false;
let updateApplied = false;
let dependencyCheckResult = null;

try {
 setupGracefulShutdown();
 await displayHeader();
 await checkRequirements();
 await confirmUpdate();

 // 1. BACKUP (Apenas dados essenciais e config.json)
 await createBackup();
 backupCreated = true;
 if (!fsSync.existsSync(BACKUP_DIR)) throw new Error('Falha ao criar diretório de backup');

 // 2. DOWNLOAD
 await downloadUpdate();
 downloadSuccessful = true;
 if (!fsSync.existsSync(TEMP_DIR)) throw new Error('Falha ao baixar atualização');

 // 3. VERIFICAR E LIMPAR (Remove a pasta de código-fonte antiga)
 dependencyCheckResult = await checkDependencyChanges();
 const shouldRemoveModules = dependencyCheckResult !== 'NO_CHANGES';
 await cleanOldFiles({
 removeNodeModules: shouldRemoveModules,
 removePackageLock: shouldRemoveModules,
 });

 // 4. APLICAR ATUALIZAÇÃO (Cópia direcionada e explícita do código-fonte)
 await applyUpdate();
 updateApplied = true;
 const newPackageJson = path.join(process.cwd(), 'package.json');
 if (!fsSync.existsSync(newPackageJson)) throw new Error('Falha ao aplicar atualização - package.json ausente');

 // 5. RESTAURAR DADOS (Apenas database, config.json e midias)
 await restoreBackup();

 // 6. INSTALAR DEPENDÊNCIAS
 await installDependencies(dependencyCheckResult);

 // 7. LIMPEZA FINAL: Remove o temporário
 await cleanupTempDir();

 printMessage('🧹 Removendo backup temporário de sucesso...');
 try {
  await fs.rm(BACKUP_DIR, { recursive: true, force: true });
  printDetail(`✅ Backup removido: ${path.basename(BACKUP_DIR)}`);
 } catch (error) {
  printWarning(`⚠️ Erro ao remover o backup. Ele pode ser deletado manualmente em: ${BACKUP_DIR}`);
 }

 // 8. PUXAR LOGS DE VERSÃO
 printMessage('🔄 Buscando informações do último commit...');
 try {
  const apiRepo = REPO_URL.replace('https://github.com/', 'https://api.github.com/repos/').replace('.git', '');
  
  const response = await fetch(`${apiRepo}/commits?per_page=1`, {
  headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) {
  throw new Error(`Erro ao buscar commits: ${response.status} ${response.statusText}`);
  }
  const linkHeader = response.headers.get('link');
  const NumberUp = linkHeader?.match(/page=(\d+)>;\s*rel="last"/)?.[1];
  const jsonUp = { total: Number(NumberUp) || 0 };
  await fs.writeFile(path.join(process.cwd(), 'dados', 'database', 'updateSave.json'), JSON.stringify(jsonUp));
  printDetail('✅ updateSave.json atualizado.');

 } catch (error) {
  printWarning(`⚠️ Não foi possível registrar a versão (updateSave.json): ${error.message}`);
  printInfo('📝 Sua atualização foi aplicada, mas o arquivo de registro de versão pode estar desatualizado. Se o bot pedir para atualizar de novo, execute o script novamente.');
 }

 printSeparator();
 printMessage('🎉 Atualização concluída com sucesso!');
 printMessage('🚀 Inicie o bot com: npm start');
 printSeparator();
} catch (error) {
 printSeparator();
 printWarning(`❌ Erro durante a atualização: ${error.message}`);

 // Recuperação de erro aprimorada
 if (backupCreated && !updateApplied) {
 try {
  await cleanOldFiles({ removeNodeModules: false, removePackageLock: false }); // Limpa o que foi aplicado do download falho
  await restoreBackup();
  printInfo('📂 Backup da versão antiga restaurado automaticamente.');
 } catch (restoreError) {
  printWarning(`❌ Falha ao restaurar backup automaticamente: ${restoreError.message}`);
 }
 } else if (!backupCreated) {
 printWarning('⚠️ Nenhum backup foi criado. Se houve falha, seus dados podem estar corrompidos.');
 }

 // Limpa apenas o TEMP_DIR, preservando o BACKUP_DIR para inspeção manual
 await cleanupTempDir();

 printWarning(`📂 Backup disponível em: ${BACKUP_DIR || 'Indisponível'}`);
 printInfo('📝 Para restaurar manualmente, copie os arquivos do backup para os diretórios correspondentes.');
 printInfo('📩 Em caso de dúvidas, contate o desenvolvedor.');

 process.exit(1);
}
}

main();