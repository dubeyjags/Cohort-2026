## HTTP Methods (HTTP Verbs)
> HTTP Methods are actions that the client requests the server to perform on a resource.

### Client Request Sources
Requests can come from many clients:

- Browser
- Mobile App
- curl (CLI tool)
- Postman
- Requestly
- Thunder Client

### HTTP Request Flow Diagram
```
Client
(browser / mobile / curl)
        │
        │ HTTP Request (GET/POST/PUT...)
        ▼
Server (Node.js API)
        │
        │ Process request
        ▼
Database / Service
        │
        ▼
HTTP Response
(status + data)
```

## GET Method  
GET retrieves data from the server.  
It does not modify data.

| Feature     | Meaning                      |
| ----------- | ---------------------------- |
| Safe        | Does not modify data         |
| Idempotent  | Multiple calls → same result |
| Cacheable   | Browser/CDN can cache        |
| Prefetching | Browser can preload          |

```
Client
   │
   │ GET /products
   ▼
Server
   │
   │ Fetch products
   ▼
Database
   │
   ▼
Response → product list
```

**Pros**

✔ Fast
✔ Cacheable
✔ Safe request

**Cons**

❌ Data visible in URL
❌ Limited size

## POST Method  
POST creates a new resource on the server.
```
Client
   │
   │ POST /users
   │ {name:"John"}
   ▼
Server
   │
   │ Insert new user
   ▼
Database
   │
   ▼
Response → created
```
| Feature        | Meaning                                |
| -------------- | -------------------------------------- |
| Create         | Creates new resource                   |
| Not Idempotent | Multiple calls create multiple records |
| Body data      | Can send JSON                          |

**Pros**

✔ Supports large data
✔ Used for creating resources

**Cons**

❌ Cannot be cached
❌ Multiple requests create duplicates

## PUT Method  
PUT replaces the entire resource.

```
Client
   │
   │ PUT /users/1
   ▼
Server
   │
   │ Replace user
   ▼
Database
```
**Pros**

✔ Predictable
✔ Idempotent

**Cons**

❌ Must send full object
❌ Risk overwriting data


## PATCH Method  
PATCH updates only part of a resource.

```
Client
   │
   │ PATCH /users/1
   │ {age:26}
   ▼
Server
   │
   │ Update field
   ▼
Database
```
**Pros**

✔ Efficient
✔ Sends small data

**Cons**

❌ Harder to implement sometimes

## DELETE Method  
DELETE removes a resource.

```
Client
   │
   │ DELETE /users/1
   ▼
Server
   │
   │ Remove record
   ▼
Database
```
## HEAD Method  
Same as GET, but returns only headers.

```
Content-Length: 100MB
Content-Type: application/zip
```
**Use Cases**
- Check file size
- Check if resource exists
- Metadata checks

## OPTIONS Method
Returns allowed HTTP methods for a resource.

`Allow: GET, POST, PUT`

**Major Use**

Used in CORS preflight requests.

# CORS (Cross-Origin Resource Sharing)
> CORS allows a server to specify which domains can access its resources.

```
Browser
   │
   │ OPTIONS request (preflight)
   ▼
Server
   │
   │ Access-Control-Allow-Origin
   ▼
Browser
   │
   │ Actual request (GET/POST)
```
`
Access-Control-Allow-Origin: *  
Access-Control-Allow-Methods: GET,POST  
Access-Control-Allow-Headers: Content-Type  
`

## HTTP Status Codes
> Status codes tell the client what happened to the request.
| Range   | Meaning       |
| ------- | ------------- |
| 100–199 | Informational |
| 200–299 | Success       |
| 300–399 | Redirection   |
| 400–499 | Client Error  |
| 500–599 | Server Error  |

### Important Codes
**Success**  
```
200 OK
201 Created
204 No Content
```
**Redirection**
```
301 Moved Permanently
302 Found
304 Not Modified
```
**Client Errors**
```
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
```
**Server Errors**
```
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

# Node.js Architecture
> Node.js is a JavaScript runtime built on the V8 engine.  
> It allows JavaScript to run outside the browser.

```
Application Code
       │
       ▼
V8 Engine
(JS execution)
       │
       ▼
Node APIs
       │
       ▼
libuv
(Event loop + thread pool)
       │
       ▼
Operating System
```

## V8 Engine
> V8 executes JavaScript code.
```
converts JS → machine code  
uses JIT compiler  
manages memory
```
**Responsibilities**
| Component    | Role                        |
| ------------ | --------------------------- |
| Call Stack   | Function execution          |
| Heap         | Memory storage              |
| JIT Compiler | Converts JS to machine code |


## Limitation

V8 cannot handle
- files
- networking
- timers

### libuv Library
> libuv is a C library used by Node.js for asynchronous operations.

> It enables Node.js to be non-blocking.

### Responsibilities
- Event loop
- Thread pool
- Async file system
- DNS lookup
- Networking

```
JavaScript
   │
   ▼
V8 Engine
   │
   ▼
libuv
 ├─ Event Loop
 ├─ Thread Pool
 ├─ Async I/O
 └─ OS interaction
 ```
## Thread Pool

Handles heavy tasks like:
- file reading
- crypto operations
- DNS lookup

Default size = 4 threads

## Node Core Modules

Node provides built-in modules.
- fs
- path
- os
- process
- http

### fs (File System)

Used to read/write files.
```
const fs = require("fs")

fs.readFile("file.txt", (err,data)=>{
 console.log(data)
})
```
### path

Handles file paths.
```
const path = require("path")

path.join(__dirname,"file.txt")

```
### os

System information.
```
const os = require("os")

console.log(os.cpus())
```
### process

Information about running process.
```
process.version
process.env.PORT
```
```
Client
   │
   │ HTTP Request
   ▼
Node Server
   │
   ▼
V8 Engine executes JS
   │
   ▼
libuv Event Loop
   │
   ├─ Database
   ├─ File system
   └─ Network
   ▼
Response returned
```

| Topic             | Key Idea                      |
| ----------------- | ----------------------------- |
| HTTP Methods      | Define API actions            |
| CORS              | Control cross-origin requests |
| Status Codes      | Request result                |
| V8                | JS execution engine           |
| libuv             | Async I/O system              |
| Node Core Modules | System APIs                   |


# TypeScript = JavaScript + Types
> TypeScript is a superset of JavaScript that adds static typing and extra syntax to help developers catch errors earlier.

> TypeScript code must be compiled into JavaScript before it runs.
```
function add(a, b) {
  return a + b;
}
======================
function add(a: number, b: number): number {
  return a + b;
}
===================
add("5", 10) // ❌ error
```
## Interpreted Language
> JavaScript is an interpreted language, meaning it runs directly in the browser or Node.js without compilation.

> TypeScript itself is not interpreted.
> It must be compiled into JavaScript first.

```
TypeScript (.ts)
        ↓
   TypeScript Compiler (tsc)
        ↓
JavaScript (.js)
        ↓
Browser / Node.js
```
### Compile TypeScript
> TypeScript must be compiled into JavaScript.
`npm install -g typescript`  
`npm install -g typescript`

TypeScript is Smart (Type Inference)
> TypeScript can automatically guess the type without explicitly writing it.
> This is called Type Inference.

```
function add(a: number, b: number) {
  return a + b
}

TypeScript infers the return type:
number
```

## Basic Type Usage
```
let id: number = 10
let username: string = "Amit"
let isAdmin: boolean = true
```
## Object Type
Define the structure of an object.
```
let user: { id: number; name: string } = {
  id: 1,
  name: "Rahul"
}
```

## Creating Custom Types
> We can create custom types using type keyword.

```
type UserId = number  
let id: UserId = 101
```
### Constructor + Public / Private

TypeScript supports Access Modifiers like OOP languages.
| Modifier  | Meaning                          |
| --------- | -------------------------------- |
| public    | accessible everywhere            |
| private   | accessible only inside class     |
| protected | accessible in class + subclasses |


## OMIT Utility Type
> Omit removes properties from an object type.
`Omit<Type, Keys>`
```
type User = {
  id: number
  name: string
  password: string
}

type SafeUser = Omit<User, "password">
```

## Using Full Object Type  
Sometimes we want to use the entire object type.
```
type User = {
  id: number
  name: string
}

function createUser(user: User) {
  console.log(user.name)
}
```

| Concept          | Meaning                        |
| ---------------- | ------------------------------ |
| TypeScript       | JavaScript + Types             |
| Compilation      | TS → JS                        |
| Type Inference   | TS automatically detects types |
| Custom Types     | `type UserId = number`         |
| Object Types     | `{ id:number }`                |
| Property Types   | `User['id']`                   |
| Access Modifiers | public / private               |
| Utility Types    | `Omit`, `Pick`, `Partial`      |

## keyof  
keyof creates a union type of the keys of an object.

`keyof Type`
```
type User = {
  id: number
  name: string
  age: number
}

type UserKeys = keyof User \\ "id" | "name" | "age"

```
## typeof
> Gets the type of a variable or object.

```
const user = {
  id: 1,
  name: "Rahul"
}

type UserType = typeof user
==================
type UserType = {
  id: number
  name: string
}

```
## Pick
> Creates a new type by selecting specific properties from another type.

`Pick<Type, Keys>`
```
type User = {
  id: number
  name: string
  email: string
}

type UserPreview = Pick<User, "id" | "name">
=======
{
  id: number
  name: string
}
```
## Omit  
Removes properties from a type.
`Omit<Type, Keys>`
```
type User = {
  id: number
  name: string
  password: string
}

type SafeUser = Omit<User, "password">
============================
{
  id: number
  name: string
}
```
## Partial
> Makes all properties optional.
```
type User = {
  id: number
  name: string
}
====================
type UpdateUser = Partial<User>

{
  id?: number
  name?: string
}

const update: UpdateUser = {
  name: "Amit"
}
```

## Readonly
> Makes properties read-only.
```
type User = {
  id: number
  name: string
}

const user: Readonly<User> = {
  id: 1,
  name: "Rahul"
}
```
## Record
> Creates an object type with specific key and value types.

`Record<Keys, Type>`
```
type Roles = "admin" | "user" | "guest"

const rolePermissions: Record<Roles, number> = {
  admin: 1,
  user: 2,
  guest: 3
}
```
## Generics
> Generics allow you to create reusable types or functions.

`<T>`
```
function getValue<T>(value: T): T {
  return value
}
===============
getValue<number>(10)
getValue<string>("Hello")
```
## as const
> Makes values readonly and literal types.

`const role = "admin" as const`

```
const roles = ["admin", "user", "guest"] as const
readonly ["admin","user","guest"]

```
## Mapped Types
> Mapped types allow you to create new types from existing ones by transforming properties.

```
type User = {
  id: number
  name: string
}
Mapped Type

type OptionalUser = {
  [Key in keyof User]?: User[Key]
}

Result

{
  id?: number
  name?: string
}
```
These 5 TypeScript utilities are used the most in real projects:

1️⃣ Pick
2️⃣ Omit
3️⃣ Partial
4️⃣ keyof
5️⃣ Record




