import { checkOpenAI } from "./01-chAi.js";

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log("client", client.baseURL);

const stream = await client.chat.completions.create({
    model,
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is latest in AI?" },
    ],
    stream: true,
});

let lastMessage = null;

for await (const message of stream) {
    const delta = message.choices[0].delta?.content;
    if (delta) {
       process.stdout.write(delta);
    }
    lastMessage += delta;
}