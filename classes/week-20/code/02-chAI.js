import { checkOpenAI } from "./01-chAi.js";

const client = await checkOpenAI();

const model = 'gpt-4o-mini';
// console.log('client',client)

const response = await client.chat.completions.create({
    model,
    messages: [
        {
            role: 'system',
            content: 'You are a helpful assistant.'
        },
        {
            role: 'user',
            content: 'Explain what a token is in 2 sentences.'
        }
    ]
}); 

console.log('response', response);
console.log('response2', response.choices[0].message.content);

const usageStats = response.usage;
console.log('Usage statistics:', usageStats);
console.log('Usage statistics:', usageStats);