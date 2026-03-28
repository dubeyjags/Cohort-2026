# Backend with Mongoose
npm init -y
npm i express@latest
update  package.json with type "module"
npm i mongoose
npm i dotenv
create files
- .env // PORT and other secreat codes
- .env.example // dummy instructed valyue
- .gitignore (nodemodule,.env, *.log)

create server.js
create port and node_env(deploment) at env file
import env at server and 
create src/app.js
- import express
import app.js to server.js
server.js - create db connections
create common and modules folder
cerate common/config/db.js
create MONGODBURL at env
update db .js
call connectdb at server.js
cerate common/utils/api-response.js
cerate common/utils/api-error.js
npm i joi (validator) - dto



server.js
```js
import dotenv
const PORT = process.env.PORT || 4000
const start = async() => {
    app.listen(PORT, () => {
        log(server at port at env)
    })
};
start().catch((err), => {
    log(error)
    process.exit(1)
})
```
src/app.js
```js
import express
const app = express()
export default app;
```
common/config/db.js
```js
import mongoose

const connectdb = async ()=>{
    awit moongoose.connect(url)
    log('db connected')
}
export default connectdb();
```
api-response.js
```js

class ApiResponse {
    static ok(res,mes,data = null){
        return res.status()
    }
}
export default ApiRepose;
```