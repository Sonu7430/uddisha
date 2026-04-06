import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
    };

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
            console.error('❌ TELEGRAM_BOT_TOKEN is missing');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Server configuration error' }),
            };
        }

        const body = JSON.parse(event.body || '{}');

        // Basic logging for debugging
        console.log('📩 Received Telegram Update:', JSON.stringify(body, null, 2));

        const message = body.message;

        if (!message || !message.chat || !message.text) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Update ignored' }),
            };
        }

        const chatId = message.chat.id;
        const text = message.text;
        const userFirstName = message.from?.first_name || 'there';

        let payload;

        if (text === '/start') {
            payload = {
                chat_id: chatId,
                text: "Welcome to CareerCompass 🎓\nYour AI career guide.\n\nWhat do you want to do?",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🎯 Find My Career", callback_data: "career" }],
                        [{ text: "🧠 Take Stream Test", callback_data: "test" }],
                        [{ text: "📄 Resume Builder", callback_data: "resume" }]
                    ]
                }
            };
        } else {
            payload = {
                chat_id: chatId,
                text: `Hello ${userFirstName}! You said: "${text}"`,
            };
        }

        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('❌ Telegram API Error:', responseData);
            throw new Error(`Telegram API failed: ${responseData.description}`);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true }),
        };

    } catch (error: any) {
        console.error('❌ Telegram Handler Error:', error.message || error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal error' }),
        };
    }
};
