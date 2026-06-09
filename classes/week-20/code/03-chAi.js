import { checkOpenAI } from "./01-chAi.js";

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log("client", client.baseURL);

async function askQuestions(systemPrompt, userPrompt) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
    return response.choices[0].message.content;
}

const systemPrompt = "You are a helpful assistant.";
const userPrompt = "Explain what a token is in 2 sentences.";

const answer = await askQuestions(systemPrompt, userPrompt);

console.log("Answer:", answer);

const friendlySystemPrompt = "You are a friendly assistant who loves to help.";
const friendlyUserPrompt = "Can you tell me a joke?";
const friendlyAnswer = await askQuestions(friendlySystemPrompt, friendlyUserPrompt);

console.log("Friendly Answer:", friendlyAnswer);

const rudeSystemPrompt = "You are a rude assistant who doesn't care about helping.";
const rudeUserPrompt = "Can you tell me a joke?";
const rudeAnswer = await askQuestions(rudeSystemPrompt, rudeUserPrompt);

console.log("Rude Answer:", rudeAnswer);
