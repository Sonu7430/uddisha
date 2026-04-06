
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Simple .env parser since we can't rely on dotenv being installed/configured for this script
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (!fs.existsSync(envPath)) {
            console.log('❌ .env file not found');
            return {};
        }
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Remove quotes
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        console.error('Error reading .env:', e);
        return {};
    }
}

async function testGroq() {
    const env = loadEnv();
    const apiKey = env.GROQ_API_KEY || env.CHATBOT_API_KEY;

    if (!apiKey) {
        console.error('❌ No API key found in .env (checked GROQ_API_KEY, CHATBOT_API_KEY)');
        process.exit(1);
    }

    console.log('✅ Found API Key (length: ' + apiKey.length + ')');

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://api.groq.com/openai/v1"
        });

        console.log('Attempting to call Groq Llama 3.3 70B...');
        const completion = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Hello, are you working?" }
            ],
        });

        console.log('✅ API Call Successful!');
        console.log('Response:', completion.choices[0].message.content);

    } catch (error) {
        console.error('❌ API Call Failed:');
        console.error(error);
    }
}

testGroq();
