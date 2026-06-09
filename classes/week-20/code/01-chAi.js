import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPEN_API_KEY;

export const getApiKey = () => {
  if (!API_KEY) {
    throw new Error('API key is not defined in the environment variables.');
    process.exit(1);
  }
    return API_KEY;
}

export const checkOpenAI = async () => {
    const openai = (await import('openai')).OpenAI;
    const client = new openai({
        apiKey: getApiKey(),
    });
    if (!client) {
        throw new Error('Failed to initialize OpenAI client.');
        process.exit(1);
    }
    console.log('OpenAI client initialized successfully.');
    return client; 
}