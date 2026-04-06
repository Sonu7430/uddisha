import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
        const body = JSON.parse(event.body || '{}');
        const helpData = body;

        // Insert into Supabase
        const { error } = await supabase.from('help_requests').insert({
            name: helpData.name,
            email: helpData.email,
            rating: helpData.rating,
            category: helpData.category,
            message: helpData.message,
            improvements: helpData.improvements,
            user_agent: event.headers['user-agent']
        });

        if (error) throw error;

        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    } catch (error: any) {
        console.error('Help request error:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
};
