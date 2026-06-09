# API and Server Actions in Next.js

## Rendering Architecture Overview

```
                          Next.js App
                               │
               ┌───────────────┴───────────────┐
               │                               │
        SERVER SIDE                       CLIENT SIDE
               │                               │
    ┌──────────▼──────────┐       ┌────────────▼────────────┐
    │   Server Components  │       │   Client Components      │
    │  (default in App Dir)│       │   ('use client' on top)  │
    │                      │       │                          │
    │  - DB queries        │       │  - useState / useEffect  │
    │  - API calls         │       │  - onClick, onChange     │
    │  - Auth checks       │       │  - Browser APIs          │
    │  - Heavy logic       │       │  - Animations            │
    └──────────────────────┘       └──────────────────────────┘
               │                               │
               │    RSC Payload (JSON-like)    │
               └───────────────►───────────────┘
                    sent to browser, hydrated
```

---

## Client Components

> Run in the **browser**. Used for anything interactive.

**When to use:** user interaction, browser APIs, React hooks.

```tsx
'use client'   // ← MUST be at the very top of the file

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

**What you CAN do in Client Components:**
- `useState`, `useEffect`, `useRef`, custom hooks
- `onClick`, `onChange`, `onSubmit` event handlers
- `window`, `document`, `localStorage`
- Open modals, animate, handle form inputs

**What you CANNOT do:**
- `async/await` at the component level (no direct DB calls)
- Access server-only secrets / env variables
- Import server-only modules (e.g., `fs`, `prisma` directly)

---

## Server Components

> Run on the **server**. Default for every file in the `app/` directory.

**When to use:** data fetching, DB queries, secure logic, SEO content.

```tsx
// No 'use client' → this is a Server Component by default

import { db } from '@/lib/db'

export default async function UserList() {
  // fetch directly — no useEffect needed
  const users = await db.user.findMany()

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

**What you CAN do in Server Components:**
- `async/await` at the top level
- Direct DB calls (Prisma, Drizzle, etc.)
- Read server-only env variables (`process.env.SECRET_KEY`)
- Import and render Client Components inside them

**What you CANNOT do:**
- `useState`, `useEffect`, or any React hook
- Access `window`, `document` (not available on server)
- Attach event handlers (`onClick`, etc.)

### Component Nesting Rules

```
Server Component
    └── Server Component  ✅
    └── Client Component  ✅

Client Component
    └── Client Component  ✅
    └── Server Component  ❌ (cannot import directly)
         ↳ BUT you can pass it as {children} prop ✅
```

```tsx
// ✅ Passing Server Component into Client Component via children
// layout.tsx (Server Component)
import Modal from './Modal'         // Client Component
import UserCard from './UserCard'   // Server Component

export default function Page() {
  return (
    <Modal>
      <UserCard />   {/* passed as children — works fine */}
    </Modal>
  )
}
```

---

## React Server Component (RSC) Payload

When Next.js renders a Server Component, it sends a special **RSC Payload** to the browser — a compact JSON-like stream describing the component tree and its data.

```
Server renders:                RSC Payload sent to browser:
─────────────────              ────────────────────────────
<UserList>              →      { type: 'ul', children: [
  <li>Alice</li>                 { type: 'li', text: 'Alice' },
  <li>Bob</li>                   { type: 'li', text: 'Bob' }
</UserList>                    ]}
```

- No JS for Server Components is sent to the client → **smaller bundle**
- Client Components are hydrated on top of this payload
- Enables fast initial page loads + good SEO

---

## API Routes (`app/api/.../route.ts`)

> Full REST endpoints inside your Next.js app. No separate Express server needed.

### File Structure

```
app/
└── api/
    └── users/
        └── route.ts        ← handles /api/users
    └── users/
        └── [id]/
            └── route.ts    ← handles /api/users/:id
```

### Syntax — All HTTP Methods

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

// GET /api/users
export async function GET(req: NextRequest) {
  const users = await db.user.findMany()
  return NextResponse.json(users, { status: 200 })
}

// POST /api/users
export async function POST(req: NextRequest) {
  const body = await req.json()
  const newUser = await db.user.create({ data: body })
  return NextResponse.json(newUser, { status: 201 })
}

// PUT /api/users  (full update)
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const updated = await db.user.update({
    where: { id: body.id },
    data: body,
  })
  return NextResponse.json(updated)
}

// DELETE /api/users
export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  await db.user.delete({ where: { id } })
  return NextResponse.json({ message: 'Deleted' })
}
```

### Dynamic Route with Params

```ts
// app/api/users/[id]/route.ts
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({ where: { id: params.id } })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}
```

### Reading Query Params

```ts
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') ?? '1'
  // GET /api/users?page=2
  return NextResponse.json({ page })
}
```

---

## Server Actions

> Functions that run **on the server** but are called **from the client** — no API route needed.

### When to use Server Actions vs API Routes

```
┌──────────────────────────────┬────────────────────────────────┐
│        Server Actions        │         API Routes             │
├──────────────────────────────┼────────────────────────────────┤
│ Form submissions             │ External clients / mobile apps │
│ Mutations tied to a component│ Public REST/JSON endpoints     │
│ Simpler — no fetch() needed  │ Fine-grained HTTP control      │
│ Works with React form actions│ Custom headers / status codes  │
└──────────────────────────────┴────────────────────────────────┘
```

### Syntax — Server Action in a Server Component

```tsx
// app/contact/page.tsx  (Server Component)

export default function ContactPage() {
  async function sendMessage(formData: FormData) {
    'use server'   // ← marks this function as a Server Action

    const message = formData.get('message') as string
    await db.message.create({ data: { text: message } })
  }

  return (
    <form action={sendMessage}>
      <input name="message" type="text" />
      <button type="submit">Send</button>
    </form>
  )
}
```

### Syntax — Server Action in a separate file (reusable)

```ts
// app/actions/user.actions.ts
'use server'   // ← at the top of the file, all exports become Server Actions

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  await db.user.create({ data: { name } })
  revalidatePath('/users')   // revalidate the cache for /users page
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } })
  revalidatePath('/users')
}
```

### Using a Server Action from a Client Component

```tsx
// app/users/AddUserForm.tsx
'use client'

import { createUser } from '@/app/actions/user.actions'

export default function AddUserForm() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" required />
      <button type="submit">Add User</button>
    </form>
  )
}
```

### Using a Server Action with `useTransition` (loading state)

```tsx
'use client'

import { useTransition } from 'react'
import { deleteUser } from '@/app/actions/user.actions'

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => deleteUser(id))}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
```

---

## Quick Decision Guide

```
Do you need to expose an endpoint to the outside world?
    YES → API Route (app/api/.../route.ts)
    NO  → Server Action ('use server')

Is the data fetching read-only (no mutation)?
    YES → Server Component (async/await directly)
    NO  → Server Action or API Route

Does the component need interactivity (hooks, events)?
    YES → Client Component ('use client')
    NO  → Server Component (default)
```

---

## Summary Table

| Feature | Server Component | Client Component | Server Action | API Route |
|---|---|---|---|---|
| Runs on | Server | Browser | Server | Server |
| `async/await` | ✅ | ❌ | ✅ | ✅ |
| DB access | ✅ | ❌ | ✅ | ✅ |
| React hooks | ❌ | ✅ | ❌ | ❌ |
| Event handlers | ❌ | ✅ | ❌ | ❌ |
| `window` / DOM | ❌ | ✅ | ❌ | ❌ |
| Needs `fetch()` call | ❌ | ✅ | ❌ | depends |
| HTTP methods | — | — | POST only | GET/POST/PUT/DELETE |
