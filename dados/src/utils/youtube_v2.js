import { exec } from 'child_process';
import fs from 'fs';

export async function downloadMp3V2(url, outputPath, bitrate) {
    return new Promise((resolve, reject) => {
        // Usando python3 -m yt_dlp e pipe para ffmpeg
        const command = `python3 -m yt_dlp --no-playlist --no-check-certificate -f "ba" -o - "${url}" | ffmpeg -i pipe:0 -vn -acodec libmp3lame -ab ${bitrate} -preset ultrafast -threads 0 -f mp3 "${outputPath}"`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`[ERRO DOWNLOAD V2]: ${stderr || error.message}`);
                return reject(new Error("❌ Falha na conversão de áudio. Tente o modo rápido."));
            }
            if (!fs.existsSync(outputPath)) {
                return reject(new Error("❌ Arquivo de saída não foi gerado."));
            }
            resolve(outputPath);
        });
    });
}
