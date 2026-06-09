mkdir projectName
cd 
pnpm init // update with required things
mkdir apps/api apps/web packages/utils

packages/utils
    pnpm init
    pnpm add zod
    pnpm add -D typescript
    tsc --init
    package.json
        "scripts": {
            "dev": "tsc --watch",
            "build": "tsc"
        },
    src/index.ts
        createUserSchema with zod

apps/api
    pnpm init
    pnpm add express
    pnpm add -D typescript tsx @types/node @types/express
    package.json
        "scripts": {
        "dev": "tsx --watch src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js"
    },
    src/index.ts
        create simple route / to hello world
    `pnpm dev`
    package.json
        export:{
            "*":"./src/index.ts"
        }

package.json
    name:"goodname"
packages/utils/package.json
    name "@goodname/utils"
apps/api/package.json
    name "@goodname/api"
    "@peer-class/utils": "workspace:*",

apps/web pnpm create next-app@latest


turborepo - is the build system and task orchestrator monorepos
- manages
-- tasks
-- build orders
-- caching
-- paralles execution

pnpm add -D turbo -w
create turbo.json


RPC - Remote Procedure calls
procedure is the functions
client call on the function at server

GRPC
TRPC- Typecscript RPC

packages mkdir trpc
pnpm init
pnpm add -D typescript
pnpm add @trpc/server
package.json
    "scripts": {
        "dev": "tsc --watch",
        "build": "tsc"
    },
tsc --init

apps\api
    pnpm add @trpc/server

apps\web
    pnpm add @trpc/client @tanstack/react-query @trpc/react-query

benefits of tanstack?

apps\web\trpc\trpc.ts
apps\web\trpc\Provider.tsx
update layout with Provider wrapper

