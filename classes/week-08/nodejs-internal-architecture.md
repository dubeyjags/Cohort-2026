# Node.js Internal Architecture (High Level)
Sabse important cheez samjho:
> Node.js = V8 Engine + libuv + Event Loop

- V8 → JavaScript run karta hai
- libuv → async operations handle karta hai
- Event Loop → callbacks execute karta hai

```
                Node.js
                  │
        ┌─────────┴─────────┐
        │                   │
     V8 Engine            libuv
 (JS execution)     (Async operations)
        │                   │
        │             Event Loop
        │                   │
        │           ┌───────┴────────┐
        │           │                │
   JS Call Stack   Thread Pool   OS APIs
```

## Browser vs Node.js
### browser environment
```
Browser
 ├─ DOM
 ├─ Web APIs
 │   ├─ setTimeout
 │   ├─ fetch
 │   └─ DOM events
 └─ JS Engine (V8)
 ```
### Node.js

Node me DOM nahi hota.
```
Node.js
 ├─ V8 Engine
 ├─ Node APIs
 │   ├─ fs
 │   ├─ http
 │   ├─ timers
 │   └─ crypto
 └─ libuv
      ├─ Event Loop
      └─ Thread Pool
```
## Node.js Execution Flow
### Step 1 — Start Process
1️⃣ V8 start karta hai  
2️⃣ libuv initialize hota hai  
3️⃣ Event loop ready hota hai  
### Step 2 — Execute Top Level Code


## Event Loop  
`Event Loop ka kaam:`  
async callbacks ko execute karna.  
```
           Event Loop
                │
   ┌────────────┼────────────┐
   │            │            │
Timers       IO Poll      Check
(setTimeout) (fs,http) (setImmediate)
   │            │            │
   └──────► Callbacks ◄──────┘
```
## Event Loop Phases (Important)
Node event loop me 6 phases hote hain.
```
┌─────────────────────┐
│       Timers        │
│ setTimeout          │
│ setInterval         │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Pending Callbacks   │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Idle / Prepare      │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Poll Phase          │
│ (I/O events)        │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Check Phase         │
│ setImmediate()      │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Close Callbacks     │
└─────────────────────┘
```
## Thread Pool
Node single threaded hai lekin background me thread pool hota hai.\
`Thread Pool Size = 4`
Ye libuv manage karta hai.  
used for
```
fs
crypto
dns
compression
```

```
          Node.js
             │
        Event Loop
             │
     ┌───────┴────────┐
     │                │
 Non Blocking     Thread Pool
 Operations          │
                     │
           ┌─────────┼─────────┐
           │         │         │
        Thread1   Thread2   Thread3
===================================

const fs = require("fs");

fs.readFile("file.txt", () => {
  console.log("file read");
});
================
JS Thread
   │
   ▼
libuv
   │
   ▼
Thread Pool
   │
   ▼
Callback → Event Loop

```
## IO Polling Phase
Ye phase wait karta hai:
```
file system
network
database
=======================
const fs = require("fs");

fs.readFile("file.txt", () => {
  console.log("done");
});

========================
readFile
   │
Thread Pool
   │
File read complete
   │
Poll Queue
   │
Event Loop
   │
Callback executed
```
## setImmediate()

`setImmediate()` check phase me run hota hai.

```
setImmediate(() => {
  console.log("Immediate");
});
```
`Check Phase`

## process.nextTick()

Ye event loop phase ka part nahi hai.  
Ye microtask queue hai.  
Priority sabse zyada hoti hai.  
```
console.log("start");

process.nextTick(() => {
  console.log("nextTick");
});

console.log("end");
--------------------
start
end
nextTick
===========
Call Stack
   │
   ▼
process.nextTick queue
   │
   ▼
Event Loop phases

```
## Promise vs nextTick
1️⃣ process.nextTick  
2️⃣ Promise microtask  
3️⃣ Event Loop phases 

```
console.log("start");

setTimeout(() => console.log("timeout"), 0);

setImmediate(() => console.log("immediate"));

Promise.resolve().then(() => console.log("promise"));

process.nextTick(() => console.log("nextTick"));

console.log("end");

start
end
nextTick
promise
timeout
immediate
```

# Complete Node Architecture Diagram
```
                Node.js
                   │
             V8 Engine
          (JS Execution)
                   │
              Call Stack
                   │
           ┌───────▼────────┐
           │   Event Loop   │
           └───────┬────────┘
                   │
   ┌───────────────┼────────────────┐
   │               │                │
Timers        IO Poll           Check
(setTimeout)  (fs,http)     (setImmediate)
   │               │                │
   └──────► Callback Queue ◄───────┘
                   │
             process.nextTick
             Promise Queue
                   │
               libuv
                   │
             Thread Pool
             (4 threads)
```
###  libuv
Node async engine

### Microtask Queue
Promise  
process.nextTick

### Call Stack
JS execution stack  

4️⃣ Event Loop Phases  
- timers
- pending callbacks
- poll
- check
- close

5️⃣ OS Delegation

Network operations OS ko diye jaate hain.

https://app.eraser.io/workspace/MLNcCyBE86fcme83ERYN
https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick


