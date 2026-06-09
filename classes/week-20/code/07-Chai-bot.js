import { checkOpenAI } from "./01-chAi.js";
import readline from "readline";

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log("client", client.baseURL);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const systemPrompt = "You are a helpful assistant.";
const userPrompt = "Explain what a token is in 2 sentences.";

function askQuestions(userPrompt) {
    return new Promise((resolve) => {
        rl.question(userPrompt, async (answer) => {
            resolve(answer);
        });
    });
}

while (true) {
    const userQuestion = await askQuestions(userPrompt);
    console.log("Answer:", userQuestion);
    if (userQuestion.toLowerCase() === "exit") {
        console.log("Exiting...");
        break;
    }
    const stream = await client.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuestion },
        ],
        stream: true,
    });
    process.stdout.write("Answer: ");
    for await (const message of stream) {
        const delta = message.choices[0].delta?.content;
        if (delta) {
            process.stdout.write(delta);
        }
    }
}
rl.close();