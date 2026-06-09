import { checkOpenAI } from "./01-chAi.js";
import {calculator, calculateTool} from "./calculator.js";

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log("client", client.baseURL);

const tool = [calculateTool];

const systemPrompt = "You are a helpful assistant who can use tools to answer questions.";
const userPrompt = "What is 5 + 7?";

const firstResponse = await client.chat.completions.create({
    model,
    messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
    ],
    tools: tool,
    tool_choice: "auto",
});

const message = firstResponse.choices[0].message;
console.log("First response message:", message);

console.log("Tool calls:", message);
console.log("Tool calls:", message.tool_calls);
message.tool_calls.forEach(async (toolCall) => {
    console.log("Tool call:", toolCall);
    const { name, arguments: args } = toolCall;
    if (name === "calculate") {
        const result = calculator(args.expression);
        console.log("Tool call result:", result);
    }
});
