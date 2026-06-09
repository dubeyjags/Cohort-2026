# Introduction to AI

---

## Backstory — Why AI Exists

- **1950s**: Alan Turing proposed the "Turing Test" — can a machine think?
- **1956**: The term "Artificial Intelligence" coined at Dartmouth Conference
- **Rule-based era**: Early AI was hand-crafted rules (if-else logic, expert systems)
- **Machine Learning shift**: Instead of writing rules, we feed data and let models *learn* patterns
- **Deep Learning (2012+)**: Neural networks with many layers — breakthrough in image/speech recognition
- **Transformer Architecture (2017)**: Google's "Attention is All You Need" paper — foundation of modern LLMs

---

## Why We Need AI

- Automates repetitive, time-consuming tasks (data entry, classification, summarization)
- Handles scale humans can't — millions of requests per second
- Finds patterns in large datasets (medical diagnosis, fraud detection)
- Natural language understanding — computers can now "understand" text/speech
- Code generation, content creation, customer support

---

## Tokens

- AI models don't read words — they read **tokens** (chunks of text)
- A token ≈ ~4 characters or ~¾ of a word on average
- `"Hello, world!"` → ~4 tokens
- Pricing and context limits are measured in tokens
- **Context window**: max tokens a model can "see" at once (e.g., GPT-4 = 128K tokens, Claude = 200K+)
- Input tokens + Output tokens = total cost

```
"ChatGPT is great" → ["Chat", "G", "PT", " is", " great"] (roughly)
```

---

## Research

Key papers and milestones:
- **Attention is All You Need** (2017) — Transformer architecture
- **GPT-1/2/3** (OpenAI, 2018–2020) — Generative Pre-trained Transformers
- **RLHF** (Reinforcement Learning from Human Feedback) — how models are fine-tuned to be helpful
- **Constitutional AI** (Anthropic) — alignment via principles
- **Scaling Laws** — more data + more compute = better models (up to a point)

---

## OpenAI

- Founded 2015 as a non-profit, now "capped-profit"
- Created GPT series, DALL-E, Whisper, Codex, ChatGPT
- **GPT-4o** — current flagship model (multimodal: text + image + audio)
- Released the **OpenAI API** — lets developers integrate AI into their apps

### Companies Built on OpenAI / Similar Research

| Company | Model(s) | Notes |
|---|---|---|
| **OpenAI** | GPT-4o, o1, o3 | Industry leader |
| **Anthropic** | Claude 3.5, Claude 4 | Safety-focused, ex-OpenAI team |
| **DeepSeek** | DeepSeek-V3, R1 | Chinese lab, very cost-efficient |
| **Google** | Gemini 1.5 / 2.0 | Multimodal, long context |
| **Meta** | Llama 3 | Open source |
| **Mistral** | Mistral Large | European, open weights |

---

## Tools (AI Ecosystem)

- **LLMs**: The core language model (GPT, Claude, Gemini, Llama)
- **Function Calling / Tool Use**: Let the model trigger external APIs/functions
- **Embeddings**: Convert text into vectors for semantic search
- **RAG** (Retrieval-Augmented Generation): Attach your own docs to a model
- **Agents**: Models that can plan and take multi-step actions autonomously
- **Fine-tuning**: Train a base model further on your specific data
- **Prompt Engineering**: Craft prompts to get better outputs without retraining

---

## BYOK — Bring Your Own Key

- Most AI platforms let you use *your own* API key instead of theirs
- You pay the AI provider (OpenAI, Anthropic) directly — no markup
- Common in tools like: Cursor, Perplexity, LangChain, open-source UIs
- Gives you: cost control, model choice, rate limit ownership

---

## SOTA — State of the Art

- The *best performing* model/method on a benchmark at a given time
- Changes frequently — AI moves fast
- Common benchmarks: MMLU, HumanEval, MATH, GPQA, SWE-bench
- "SOTA" is relative — best for coding ≠ best for reasoning ≠ best for cost

---

## OpenAI API Key Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / log in → API Keys → Create new key
3. Copy the key — you only see it once
4. Add billing / usage limits to avoid surprise charges

> Never commit your API key to git. Always use `.env` files.

---

## Project Setup

### 1. Initialize Node project

```bash
npm init -y
```

### 2. Install dependencies

```bash
npm install openai dotenv
```

### 3. Create `.env` file

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=3000
```

### 4. Add `.gitignore`

```
node_modules/
.env
```

### 5. Basic OpenAI call (Node.js)

```js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Explain what a token is in 2 sentences." }
  ],
});

console.log(response.choices[0].message.content);
```

### 6. Run it

```bash
node index.js
```

---

## Key Concepts Summary

| Term | Meaning |
|---|---|
| LLM | Large Language Model — the AI brain |
| Token | Unit of text the model processes |
| Context Window | Max tokens the model can process at once |
| Prompt | Input you send to the model |
| Completion | Output the model generates |
| Temperature | Randomness of output (0 = deterministic, 1 = creative) |
| BYOK | Bring Your Own Key — use your API key |
| SOTA | State of the Art — current best model/method |
| RAG | Retrieval-Augmented Generation |
| RLHF | Reinforcement Learning from Human Feedback |



chat-gpt is model
LLM is what we can get from API

AI need roles to talk
- system - who is the system to talk - general mode
- user - who are you
- Assistent - jo response aa rha h
- Tools - functions

memory to store db
vector db used to storing the tokens and store the context, pinecode, qdrant, postgress, chroma


for await js
generatot functions
streaming prompt
addon for tools 
with manuals and helpers

Tools
Basic functional
meta deta