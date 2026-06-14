## 00 Getting started with nextjs
`npx create-next-app@latest`
`npm run dev`

## 01 UI Foundataion: Shadcn/ui, Darkmode and Tanstack query
Prebuild preset theme (update some folder and files)
`npx shadcn@latest init --preset b2oqEgsCm --base base --template next --pointer`  
add component `npx shadcn@latest add` a to select all componennt

[For Darkmode]https://ui.shadcn.com/docs/dark-mode/next
`npm install next-themes`
components/provider/theme-provider.tsx
wrap the themeprovider
create modeTOggle component as per guide

[Tanstack Query]https://tanstack.com/query/v4/docs/framework/react/overview
 `npm i @tanstack/react-query@4`
 components/provider/query-provider.tsx

## 02 setup db and prisma

DB URL // Docker/Neon
[NEON]https://console.neon.tech/
create db> Connect > Prisma  
[Prisma Docs]https://www.prisma.io/docs/prisma-orm/quickstart/postgresql
`
npm install prisma @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
npx prisma init`

lib/db.ts
```ts
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma/client"
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrimsaClient() {
    const url = process.env.DATABASE_URL
    if (!url) {
        throw new Error("DATABASE_URL is not defined")
    }
    const adapter = new PrismaPg({
        connectionString: url,
    })
    return new PrismaClient({
        adapter
    })
}
export const prisma = globalForPrisma.prisma || createPrimsaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```
`npx prisma generate`
`npx prisma migrate dev`

