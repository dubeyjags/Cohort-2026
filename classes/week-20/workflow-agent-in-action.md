# Workflow Agents in Action

## 1. Speculative Decoding

### What
A technique to speed up LLM inference without changing output quality.
Uses **two models working together**: a small fast draft model and a large accurate target model.

### Why
LLM inference (generating tokens) is slow because each token depends on the previous one (sequential). Speculative decoding parallelizes verification to get target-model quality at draft-model speed.

### How it works
```
Draft model  →  generates N tokens cheaply and quickly
Target model →  verifies all N tokens in ONE forward pass
               - accepts tokens that match its distribution
               - rejects the first bad token and regenerates from there
```

### LLM Parameters involved
| Term | Meaning |
|------|---------|
| Training | Updating model weights using data (done once, expensive) |
| Inference | Running the model to generate output (done every request) |
| Draft model | Small/mini model — fast, cheap, slightly less accurate |
| Target model | Large model — slow, expensive, high quality |

### APIs
- **Completion API** — older style, returns full text at once (`/completions`)
- **Response API** — newer style, streams tokens as they are generated (`/chat/completions` with `stream: true`)

---

## 2. Logging, Monitoring & Tracing

### Why it matters
In production AI systems you need to know:
- Which LLM calls were made
- How long each step took
- What failed and why
- Cost per request

### Key concepts
| Term | Meaning |
|------|---------|
| Logging | Recording events to files or a database |
| Monitoring | Watching metrics over time (latency, error rate, cost) |
| Endpoint detection | Knowing which API endpoints were hit |
| Traces | A full picture of one request across multiple services/steps |

### Standard pattern — Standardize → Store
```
Raw event
   ↓
Class / Schema (standardize the shape)
   ↓
Store in file or DB (winston, postgres, etc.)
```

### winston (Node.js logging)
```js
// install
npm i winston

// usage
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
})

logger.info('LLM call started', { model: 'gpt-4', tokens: 200 })
logger.error('LLM call failed', { error: err.message })
```

---

## 3. Workflows & Durability

### What is a Workflow?
A sequence of **steps** that together complete a larger task.
```
Step 1: validate input
Step 2: call LLM
Step 3: save result to DB
Step 4: send email
```

### What is Durability?
If your server crashes mid-workflow, a durable system **resumes from the last completed step** — it does not start over.

Without durability → crash = lost work, double charges, inconsistent state.
With durability → crash = auto-resume, exactly-once execution per step.

---

## 4. Inngest

### What
Inngest is a **durable workflow engine** — a layer you put on top of your HTTP server that gives your functions:
- Automatic retries
- Step-level durability (resume from where it stopped)
- Scheduling and delays
- Background job queues
- Built-in concurrency and throttle controls

### Why Inngest over plain async/await?
| Plain async/await | Inngest |
|-------------------|---------|
| Crashes lose progress | Resumes from last step |
| No retry on failure | Auto-retries with backoff |
| Hard to schedule | `step.sleep`, `step.waitForEvent` built-in |
| No visibility | Dashboard shows every run + step |
| Manual queue setup | Zero-infra queue out of the box |

### Inngest vs Kafka
| | Inngest | Kafka |
|---|---------|-------|
| Primary use | Durable workflows, background jobs | High-throughput event streaming |
| Setup | Zero-infra (managed cloud or local CLI) | Needs brokers, zookeeper/KRaft |
| Durability | Step-level, automatic | Consumer offset (manual handling) |
| Visibility | Built-in UI dashboard | Needs extra tooling (Kafdrop, etc.) |
| Best for | App-level workflows, AI agents | Data pipelines, millions of events/sec |
| Learning curve | Low | High |

**Rule of thumb:** Use Inngest for workflows inside your app. Use Kafka when you need to move massive volumes of events between many services.

---

## 5. Inngest Setup — Step by Step

### Step 1: Install
```bash
npm i inngest
```

### Step 2: Project structure
```
todo-inngest/
├── server.js          ← Express app that serves the Inngest handler
├── store.js           ← DB/state (e.g. in-memory array or postgres)
└── inngest/
    ├── client.js      ← Create the Inngest client (singleton)
    └── function.js    ← Define your workflow functions
```

### Step 3: Environment variable
```env
# .env
INNGEST_DEV=1          # tells Inngest to connect to local dev server
```

### Step 4: Create the Inngest client
```js
// inngest/client.js
import { Inngest } from 'inngest'

export const inngest = new Inngest({ id: 'todo-app' })
//                                         ↑ unique app name
```

### Step 5: Define a function with steps
```js
// inngest/function.js
import { inngest } from './client.js'

export const processTodo = inngest.createFunction(
  { id: 'process-todo' },          // unique function id
  { event: 'todo/created' },       // trigger: which event fires this

  async ({ event, step }) => {

    // step.run — a durable step. If it crashes, it retries only THIS step.
    const validated = await step.run('validate-todo', async () => {
      const { title, userId } = event.data
      if (!title) throw new Error('Title required')
      return { title, userId }
    })

    // step.run — call an external service
    const saved = await step.run('save-to-db', async () => {
      return await store.create(validated)
    })

    // step.ai — built-in AI step (calls LLM, retries automatically)
    const summary = await step.ai.infer('summarize', {
      model: step.ai.models.openai({ model: 'gpt-4o' }),
      body: {
        messages: [{ role: 'user', content: `Summarize: ${saved.title}` }]
      }
    })

    // step.sleep — pause workflow for a duration (durable, not setTimeout)
    await step.sleep('wait-before-email', '10m')

    // step.run — send notification after sleep
    await step.run('send-email', async () => {
      await sendEmail(saved.userId, summary)
    })

    return { saved, summary }
  }
)
```

### Step 6: Serve Inngest in your Express app
```js
// server.js
import express from 'express'
import { serve } from 'inngest/express'
import { inngest } from './inngest/client.js'
import { processTodo } from './inngest/function.js'

const app = express()
app.use(express.json())

// Inngest handler — exposes /api/inngest endpoint
app.use('/api/inngest', serve({ client: inngest, functions: [processTodo] }))

// Your normal routes
app.post('/todos', async (req, res) => {
  const todo = req.body
  // Send event to Inngest — this triggers the workflow
  await inngest.send({ name: 'todo/created', data: todo })
  res.json({ message: 'Todo created, workflow started' })
})

app.listen(3000, () => console.log('Server on :3000'))
```

### Step 7: Run it
```bash
# Terminal 1 — your app
node --watch inngest todo-inngest/server.js

# Terminal 2 — Inngest local dev server (dashboard + event relay)
npx inngest-cli@latest dev
```

Open `http://localhost:8288` → Inngest dashboard shows all functions, runs, steps.

---

## 6. Inngest Core Concepts

### Trigger
What fires a function. Can be an event name or a cron schedule.
```js
// Event trigger
{ event: 'user/signup' }

// Cron trigger (runs every day at 9am)
{ cron: '0 9 * * *' }
```

### step.run
A durable, retriable unit of work.
```js
const result = await step.run('step-name', async () => {
  // anything here — DB call, API call, computation
  return someValue   // result is memoized on success
})
```
- If this step already succeeded in a previous attempt → **skipped, cached result returned**
- If it fails → retried automatically (default 3 times with exponential backoff)

### step.ai
Shorthand for calling an LLM as a durable step.
```js
const response = await step.ai.infer('llm-step', {
  model: step.ai.models.openai({ model: 'gpt-4o' }),
  body: { messages: [{ role: 'user', content: 'Hello' }] }
})
```

### step.sleep
Pauses the workflow for a duration. The server is free during the pause — no thread blocked.
```js
await step.sleep('pause', '1h')    // pause 1 hour
await step.sleep('pause', '3d')    // pause 3 days
```

### step.waitForEvent
Pause until another event arrives (e.g. wait for user confirmation).
```js
const approval = await step.waitForEvent('wait-for-approval', {
  event: 'todo/approved',
  match: 'data.todoId',   // must match event.data.todoId
  timeout: '24h'          // give up after 24 hours
})
```

### Concurrency
Limit how many runs of a function execute at the same time.
```js
inngest.createFunction(
  {
    id: 'send-email',
    concurrency: { limit: 5 }   // max 5 simultaneous runs
  },
  { event: 'email/send' },
  async ({ event, step }) => { ... }
)
```

### Throttle
Rate-limit how many times a function runs in a time window.
```js
inngest.createFunction(
  {
    id: 'call-llm',
    throttle: {
      count: 10,          // max 10 runs
      period: '1m',       // per 1 minute
      key: 'event.data.userId'  // per user (optional)
    }
  },
  { event: 'ai/request' },
  async ({ event, step }) => { ... }
)
```

---

## 7. Full Mental Model

```
Your App                Inngest Engine              Dashboard
---------               --------------              ---------
POST /todos
  │
  └─► inngest.send()──► event queue
                             │
                        matches trigger
                             │
                        runs function
                             │
                        step 1 ──► ✓ memoized
                        step 2 ──► ✗ failed → retry
                        step 2 ──► ✓ memoized
                        step 3 ──► ✓ memoized
                             │
                        complete                ◄── visible here
```

Each `step.run` result is stored. If the process crashes at step 3, Inngest replays the function — steps 1 and 2 return instantly from cache, only step 3 runs again.
