# PNPM
`PNPM i` it caches the installation so that next time its will be fast install with pnpm

## pnpm i express @types/node @types/express
touch index.js

## public folder = Access folder publicly  because express prevent the folder and file access to user like db.js, index.js
so created public folder access the user for index.html,images,
`app.use(express.static('public'));`

curl is the cli utility to make calls

## Socket.io   
https://socket.io/docs/v4/server-installation/


load inbuild module at top and third party packages at last

websockets are statefull connections 
redis is also websocket server
so we use redis to make all server same satus



pnpm i ioredis
redis need different connection for publisher and subscriber

npx or pnpm dlx = it means dont need to install just for running
or node --watch file.js

cmds
export PORT=8000 && node --watch index.js
export PORT=8005 && node --watch index.js
export PORT=9000 && node --watch index.js
export PORT=9005 && node --watch index.js