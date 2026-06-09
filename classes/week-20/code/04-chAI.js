import { checkOpenAI } from "./01-chAi.js";

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log("client", client.baseURL);

const conversationHistory = [];

async function askQuestions(systemPrompt, userPrompt, history = []) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userPrompt },
    ],
  });

  history.push({ role: "user", content: userPrompt });
  history.push({
    role: "assistant",
    content: response.choices[0].message.content,
  });
  return response.choices[0].message.content;
}

const userPrompt = "my name is Jags dubey and i am preparing for my coding interview can you help me with that?";

const answer = await askQuestions("You are a helpful assistant.", userPrompt, conversationHistory);

console.log("Answer:", answer);

const followUpPrompt = "What are some common coding interview questions I should prepare for?";
const followUpAnswer = await askQuestions("You are a helpful assistant.", followUpPrompt, conversationHistory);

console.log("Follow-up Answer:", followUpAnswer);

const summaryPrompt = "Summarize the conversation with my name and the questions I asked in 2 sentences.";
const summaryAnswer = await askQuestions("You are a helpful assistant.", summaryPrompt, conversationHistory);

console.log("Summary Answer:", summaryAnswer);
