import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

console.log("✅ Disha chatbot function loaded - Groq Llama 3.3 active");

function getStructuredFallback() {
    return `
Hi! I'm Disha, your AI career assistant.

Although my advanced AI features are temporarily offline, I can still support you with expert guidance:

1. Ask me anything about career choices, job search, resume tips, or interviews.  
2. I’ll give you advice based on your goals, skills, and interests.  
3. For deeper insights, visit CareerCompass at https://clinquant-froyo-25a7a6.netlify.app — your personal AI-powered career planner.  

Let’s move one step closer to your dream career. What would you like to explore today?
`;
}

export const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const apiKey = process.env.GROQ_API_KEY || process.env.CHATBOT_API_KEY;

        if (!apiKey) {
            console.error('❌ No Groq API Key found.');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'API key missing',
                    response: getStructuredFallback(),
                    fallback: true,
                }),
            };
        }

        const { message } = JSON.parse(event.body || '{}');

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Message required',
                    response: 'Please ask something specific about careers, skills, or job opportunities.',
                }),
            };
        }

        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://api.groq.com/openai/v1"
        });

        const systemPrompt = `
You are Disha, an expert AI career assistant on the CareerCompass platform.

🧭 FORMAT (strict):
1. Give a short, clear step one
2. Give a short, clear step two
3. Give a short, clear step three

🌱 End with a short motivational quote (1 line only).

🧠 TONE:
- Friendly, supportive, clear
- Avoid robotic or overly formal tone
- Use plain English — warm and helpful

🚫 IMPORTANT RULES:
- Keep answers short and helpful
- DO NOT use paragraphs or storytelling
- DO NOT promote CareerCompass unless it adds real value
- ONLY mention CareerCompass if it's genuinely useful or when user asks
- NEVER mention other companies or platforms
- DO NOT exaggerate — give real, direct, honest answers
`;

        const completion = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 800,
            top_p: 0.9,
        });

        const text = completion.choices[0]?.message?.content;

        if (!text || text.trim().length === 0) {
            throw new Error('Empty or invalid Groq response');
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: text.trim(),
                success: true,
                model: 'llama-3.3-70b-versatile',
                timestamp: new Date().toISOString(),
            }),
        };

    } catch (error: any) {
        console.error('❌ AI Handler Error:', error.message || error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal error',
                response: getStructuredFallback(),
                fallback: true,
                timestamp: new Date().toISOString(),
            }),
        };
    }
};
