import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.CHATBOT_API_KEY;
const MODEL = 'llama-3.1-8b-instant';

export const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        if (!GROQ_API_KEY) {
            throw new Error('Groq API Key not configured');
        }

        const { query } = JSON.parse(event.body || '{}');

        if (!query || query.trim().length === 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Query is required' })
            };
        }

        const openai = new OpenAI({
            apiKey: GROQ_API_KEY,
            baseURL: "https://api.groq.com/openai/v1"
        });

        const systemPrompt = `
You are an expert Career AI for the "Uddisha" platform.
Your task is to analyze a user's career-related search query and translate it into structured filters for our database of 1,200+ careers.

CATEGORIES AVAILABLE:
Technology, Healthcare, Engineering, Business, Education, Arts, Legal, Manufacturing, Transportation, Construction, Government, Agriculture, Energy, Retail, Hospitality, Science, Media, Nonprofit, Sports, Environmental.

OUTPUT FORMAT (JSON only):
{
  "relevantCategories": ["Category1", "Category2"],
  "relevantSubcategories": ["Subcategory1", "Subcategory2"],
  "expandedKeywords": ["keyword1", "keyword2", "keyword3"],
  "reasoning": "A one-sentence explanation of why these match."
}

RULES:
1. ONLY return the JSON. No preamble or explanation outside the JSON.
2. "expandedKeywords" should include professional synonyms and specific job titles that might not be in the original query but are highly relevant.
3. If the query is vague, suggest broadly matching categories.
4. If the query is about a specific local Indian term (e.g. "Munshi"), map it to the professional equivalent (e.g. "Legal", "Clerk", "Advocate").
`;

        const completion = await openai.chat.completions.create({
            model: MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Query: "${query}"` }
            ],
            temperature: 0.3,
            max_tokens: 500,
            response_format: { type: "json_object" }
        });

        const responseText = completion.choices[0]?.message?.content || '{}';
        const aiData = JSON.parse(responseText);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ...aiData,
                success: true,
                model: MODEL,
                timestamp: new Date().toISOString()
            })
        };

    } catch (error: any) {
        console.error('AI Search Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal search error',
                message: error.message
            })
        };
    }
};
