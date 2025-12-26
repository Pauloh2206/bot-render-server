import { GoogleGenerativeAI } from '@google/generative-ai';

export async function getQuizIA(apiKey) {
    try {
        const GEMINI_API_KEY = apiKey || process.env.GEMINI_API_KEY;
        
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); 

        const model = genAI.getGenerativeModel(
            { model: "gemini-2.5-flash-lite" },
            { apiVersion: 'v1beta' } 
        );

        // Prompt turbinado para evitar monotonia de geografia
        const prompt = `Gere uma pergunta de quiz criativa e variada sobre o Brasil (Nível Médio).
        REGRAS DE TEMAS: Varie entre Cultura Pop, Música, Culinária Típica, História Curiosa, Esportes ou Invenções Brasileiras. 
        PROIBIDO: Não gere perguntas sobre capitais, estados ou fronteiras (chega de geografia!).
        
        FORMATO DE RETORNO: Retorne APENAS um JSON puro:
        {"pergunta": "...", "opcoes": ["A) ", "B) ", "C) ", "D) "], "correta": "LETRA"}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const texto = response.text();
        
        const jsonMatch = texto.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const res = JSON.parse(jsonMatch[0]);
            return {
                pergunta: res.pergunta,
                opcoes: res.opcoes,
                correta: res.correta.replace(/[\(\)]/g, "").toUpperCase().trim()
            };
        }
    } catch (e) {
        console.error("DEBUG QUIZ:", e.message);
        return null;
    }
}