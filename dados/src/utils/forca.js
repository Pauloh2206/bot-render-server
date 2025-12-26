import { GoogleGenAI } from '@google/genai';

/**
 * Busca palavra na Gemini com níveis de dificuldade média/fácil e histórico
 */
export async function getForcaIA(apiKey, usadas = []) {
    try {
        const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return { palavra: "WHATSAPP", tema: "Aplicativo" };
        }

        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY }); 

        // Lógica de dificuldade ajustada apenas para Fácil e Média
        const dificuldades = ["muito fácil", "fácil", "média"];
        const nivel = dificuldades[Math.floor(Math.random() * dificuldades.length)];

        const prompt = `Gere uma palavra para jogo da forca.
        Nível de dificuldade: ${nivel}.
        REGRAS: 
        1. Use apenas substantivos comuns e conhecidos (objetos, animais, frutas, profissões).
        2. Evite palavras muito longas, termos técnicos ou científicos.
        3. A palavra deve ser fácil de adivinhar em um contexto informal.
        4. NÃO use nenhuma destas palavras: ${usadas.join(', ')}.
        
        Retorne APENAS um JSON puro:
        {
          "palavra": "PALAVRA",
          "tema": "Dica curta e clara"
        }`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });
        
        const texto = response.text;
        const jsonMatch = texto.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            const res = JSON.parse(jsonMatch[0]);
            return {
                palavra: res.palavra.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                tema: res.tema
            };
        }
    } catch (e) {
        console.error("Erro na Forca Gemini:", e.message);
    }

    // Backup com palavras de nível fácil/médio caso a IA falhe
    const backup = [
        { palavra: "BANANA", tema: "Fruta" }, { palavra: "CADEIRA", tema: "Objeto" },
        { palavra: "CAVALO", tema: "Animal" }, { palavra: "CELULAR", tema: "Tecnologia" },
        { palavra: "MOCHILA", tema: "Objeto" }, { palavra: "SAPATO", tema: "Vestuário" }
    ];
    const filtrado = backup.filter(b => !usadas.includes(b.palavra));
    return filtrado.length > 0 ? filtrado[Math.floor(Math.random() * filtrado.length)] : backup[0];
}

export function renderForca(v) {
    const fases = [
        "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========", 
        "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========", 
        "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========", 
        "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========", 
        "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========", 
        "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========", 
        "  +---+\n  |   |\n      |\n      |\n      |\n      |\n========="  
    ];
    return fases[v] || fases[0];
}