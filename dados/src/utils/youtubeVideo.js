import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execPromise = promisify(exec);

// Caminho absoluto para a pasta temp
const TEMP_FOLDER = path.join(__dirname, '..', '..', '..', 'temp');

if (!fs.existsSync(TEMP_FOLDER)) {
    fs.mkdirSync(TEMP_FOLDER, { recursive: true });
}

/**
 * MODO ULTRA FAST: Otimizado para o Render
 */
export async function downloadYoutubeMp4_Fast(videoUrl) {
    try {
        const timestamp = Date.now();
        const safeName = `video_${timestamp}.mp4`;
        const fileName = path.join(TEMP_FOLDER, safeName);

        // Usando python3 -m yt_dlp e limitando a 720p para economizar RAM/Rede no Render
        const command = `python3 -m yt_dlp -f "best[height<=720][ext=mp4]/best[ext=mp4]/best" --output "${fileName}" --restrict-filenames "${videoUrl}"`;

        await execPromise(command, { maxBuffer: 1024 * 1024 * 100 }); 

        if (!fs.existsSync(fileName)) throw new Error("Erro: Arquivo não encontrado após download.");

        return fileName;
    } catch (error) {
        console.error("ERRO NO DOWNLOAD DE VÍDEO:", error.message);
        throw new Error("❌ Falha ao baixar o vídeo. O arquivo pode ser muito grande ou o link está protegido.");
    }
}
