## Node and Typescript Setup
npm init -y
tsx --init
- update /rootDir to src // for src files
- update /outDir to dist // for compiled files
- update module to nodenext
- create src/index.ts
tsc -p .
npx gitignore Node
npm i typescript -D
npm i tsc-watch -D
package.json
- "dev":  "tsc-watch --onSuccess \"node ./dist/index.js\""

# Express Project setup
npm i express
npm i @types/express -D
npm i @types/node -D
npm i zod // for valdation for env and others

create src/app/index.ts for express or else // for express setup
- create async function main and export
- install zod
create src/env.ts
import env to src/index.ts 
import appserver form src/app/index.ts to src/index.ts and pass it to the httpserver in the app/index.ts




