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
 * Sanitiza nomes de arquivos para evitar erros no Linux
 */
function sanitizeFileName(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

/**
 * BUSCA DE METADADOS
 */
export async function getVideoMetadata(query) {
    // Usando python3 -m yt_dlp para garantir compatibilidade no Render
    const command = `python3 -m yt_dlp --dump-json "ytsearch1:${query}" --no-playlist --restrict-filenames --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36" --no-check-certificate --geo-bypass`;

    try {
        const { stdout } = await execPromise(command, { encoding: 'utf8', maxBuffer: 1024 * 10000 });
        const metadata = JSON.parse(stdout);

        return {
            title: metadata.title,
            author: metadata.channel,
            views: metadata.view_count ? metadata.view_count.toLocaleString('pt-BR') : 'N/A',
            duration: metadata.duration_string || 'N/A',
            url: metadata.webpage_url,
            thumbnail: metadata.thumbnail,
            seconds: metadata.duration,
            id: metadata.id
        };
    } catch (error) {
        console.error("Erro ao buscar metadados:", error.message);
        throw new Error(`❌ Falha ao buscar informações da música. Verifique se o link é válido.`);
    }
}

/**
 * DOWNLOAD ULTRA RÁPIDO (M4A)
 */
export async function downloadYoutubeM4A_Fast(videoUrl) {
    try {
        const timestamp = Date.now();
        const safeName = `audio_${timestamp}.m4a`;
        const fileName = path.join(TEMP_FOLDER, safeName);

        const command = `python3 -m yt_dlp -f "bestaudio[ext=m4a]" --output "${fileName}" --restrict-filenames "${videoUrl}" --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36" --no-check-certificate --geo-bypass`;

        await execPromise(command);

        if (!fs.existsSync(fileName)) {
            throw new Error('Arquivo não encontrado após o download.');
        }

        return fileName;
    } catch (error) {
        console.error("Erro no download de áudio:", error.message);
        throw new Error('❌ Falha ao baixar a música no modo rápido. Tente novamente mais tarde.');
    }
}
