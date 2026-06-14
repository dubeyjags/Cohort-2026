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


