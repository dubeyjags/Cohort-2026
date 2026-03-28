npm init -y 
npm i express@latest
update package.json type modules
npm i mongoose
npm i dotenv
create .env // for all keys and passwrods
create .gitignore // not to commits
create server.js
create src/app.js // export express
call app in server.js
create src/common/config // for common configs
create src/modules /// for common modules
create src/common/config/db.js // for common connections from mongoose website
call connectdb at server.js
create src/common/utils/api-response.js // for common response setup
create src/common/utils/api-error.js // for common error
npm i joi // for validation  like zod, yup, expess validtor, joi, arktype
create src/common/dto/base.dto.js // for common error 
create src/module/auth/dto/
 auth.contoller.js
 auth.middleware.js
 auth.model.js // For mongoose schema
 auth.routes.js
 auth.service.js

npm i jsonwebtoken // for creating tokens also crpto can used
create src/common/utils/jwt.utils.js (validate the user with token )
Session - true (each call can be access / statefull)

token can store in cookie 
- normal cookie (user can manupulate)
- secure cookie (httponly, user cannot manupulate)

stateless (valid for 15 min)
- bearer 

token (can be verified- have some code like jwt sign)
access token valid for 15 min
refreshtoken valid for 24hrs

update .env with tokens

encrpt can decrypt 
hashing can only hash same value each time

npm i cookie-parser
















mongoose (help to connet with mongo)
stuckture
server.js
src/app.js
src/controller // business logic
src/routes // path or url
src/models // structure of the forms name,email etc
src/utils // dbconnect,mail

frameworks (services)
 user.model.js
 user.controller.js // function call
 user.service.js // logics
 user.rotues.js


structure
express
mongoose
standerd structure for api/err
zod validation lib
DTO // data tranfer object -- design pattern for form validation
middlewares
dto for services like auth, cart and so on
tokens

reading points
`process.exit(1);` 
- model (what required in db)
- route (validate the user and check with dto not to get extra infor)
    - validate with dto (specific like rgister)
- controller (call specific service for the required like register )
- service (can talk with db to check)

Authentication
- who you are talking about, verify who you are

Authorization
- what you can access, what you can do

# rolebased access / activicy based acess