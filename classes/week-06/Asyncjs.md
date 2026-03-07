# Async JS
JavaScript is a single-threaded language, meaning it executes one task at a time using one call stack.

However, JavaScript can still perform asynchronous operations (like API calls, timers, DOM events) by outsourcing tasks to the browser or Node.js APIs.

### Examples of async tasks:

fetch() (API calls)  
setTimeout()    
setInterval()  
DOM events  
File operations  

These tasks run outside the JS engine, and when finished, their callbacks are placed into queues.

```
                JS ENGINE
        ------------------------
        |                      |
        |    Memory Heap      |
        |  (variables/data)   |
        |                      |
        ------------------------
                 |
        ------------------------
        |      Call Stack      |
        |   (runs functions)   |
        ------------------------
                 |
             Event Loop
                 |
      -------------------------
      |    Microtask Queue    |
      |  (Promises / await)   |
      -------------------------
                 |
      -------------------------
      |    Callback Queue     |
      | (setTimeout / events) |
      -------------------------
```


## 1️⃣ Call Stack
> The Call Stack is where JavaScript executes functions in order.  
> It works like a stack (LIFO – Last In First Out).  
> When a function runs → it is pushed onto the stack.
When it finishes → it is popped off.

```
function first(){
  second();
}
function second(){
  console.log("Hello");
}
first();

**Call Stack**

first()
second()
console.log()

(empty after execution)
```


## 2️⃣ Queue (Task Queue / Callback Queue)
> The Queue stores callbacks waiting to be executed.

Examples that go to this queue:
```
setTimeout
setInterval
DOM events
```
```
setTimeout(()=>{
 console.log("Timer finished");
},2000);

What to do? → console.log
When? → after 2000 ms
```


## 3️⃣ Event Loop
The Event Loop decides which task should go into the Call Stack next.  
`Is Call Stack empty?`

If yes:  
- Run Microtask Queue  
- Run Callback Queue

**Event Loop Flow**
```
Call Stack empty
        ↓
Check Microtask Queue
        ↓
Execute Promises
        ↓
Check Callback Queue
        ↓
Execute setTimeout / events
```

### Queue

When async work finishes, its callback goes into a queue.
Types of Queues
```
Microtask Queue
Callback Queue
```

### Priority
```
1️⃣ Synchronous Code
2️⃣ Microtasks (Promises)
3️⃣ Macrotasks (Timers)
```

### Microtask Queue

Higher priority queue.

Contains:
```
Promises
async/await
MutationObserver

```
Callback Queue (Macrotask Queue)  
Lower priority queue.  
Contains:
```
setTimeout
setInterval
DOM events
```


## 4️⃣ Promises
> A Promise represents the future result of an asynchronous operation.

Example:
- API request
- Database call
- Timer

### Promise States
```
Pending   → still running
Fulfilled → success
Rejected  → error
```
### Promise Syntax
A promise requires a resolver function.  
Resolver function receives two parameters:
```
resolve
reject
 
return new Promise((resolve, reject) => {
   setTimeout(()=>{
       resolve("Data received");
   },2000);
});

What to do? → resolve data  
When? → after 2 seconds  
```

**Promise Handling Methods**

`.then()`

> Runs when promise resolves successfully.

```
promise.then((data)=>{
 console.log(data);
});
```

console.log acts as a callback function.

`.catch()`

Runs when promise fails.

```
promise.catch((err)=>{
 console.log(err);
});
```
`.finally()`
Runs always.
```
promise.finally(()=>{
 console.log("Completed");
});
```

**Combined Syntax**  
`Method 1`
```
promise.then(
   (data)=>console.log(data),
   (err)=>console.log(err)
);
```
`Method 2 (Most Used)`
```
promise
   .then((data)=>console.log(data))
   .catch((err)=>console.log(err));
```
**Promise Chaining**

We can use multiple `.then()`.  
Each `.then()` returns a new promise.

```
promise
   .then((data)=>{
      console.log(data);
      return data;
   })
   .then((data)=>{
      console.log("Next:",data);
   })
   .catch((err)=>{
      console.log(err);
   });
```
**Promise Internal Structure**

Conceptually a promise looks like this:

```
Promise Object

{
  state: pending | fulfilled | rejected
  value: result
  thenArray: [functions]
  catchArray: [functions]
}
```
### Promise Diagram
```
Create Promise
      ↓
   Pending
      ↓
 ----------------
 |              |
Resolve       Reject
 |              |
then()        catch()
```
## Outsourced APIs
Outsourced APIs
```
fetch
setTimeout
console
DOM events
File system
--------------
fetch()
   ↓
Browser / OS network layer
   ↓
Response
   ↓
Promise resolved
```
## Promise Static Methods
`Promise.resolve()`  Creates an instant resolved promise.
```
Promise.resolve("Done")
.then(console.log);
```
`Promise.all()` Waits for all promises to complete.
```
Promise.all([p1,p2,p3])
.then(console.log);
```
`Promise.allSettled()` Returns results of all promises (success + failure).
`Promise.any()` Returns first successful promise.


## Microtask Queue vs Macrotask Queue

JavaScript processes tasks in priority order.

**Microtask Queue**
High priority.
```
Promises
async/await
MutationObserver
```

**Macrotask Queue**  
Lower priority.
```
setTimeout
setInterval
DOM events
```
**Execution Priority**
```
1. Synchronous Code
2. Microtasks (Promises)
3. Macrotasks (Timers)

console.log("Start");

setTimeout(()=>{
 console.log("Timer");
},0);

Promise.resolve()
.then(()=>{
 console.log("Promise");
});

console.log("End");

Start
End
Promise
Timer
```

## Async / Await
async/await is a simpler syntax for working with promises.
```
async function nice(){
   const result = await hPromise;
   console.log(result);
}
```
await pauses execution until the promise resolves.

**Error Handling**
```
async function nice(){
 try{
   const result = await hPromise;
   console.log(result);
 }catch(err){
   console.log(err);
 }
}
```

# Final Async Flow
```
Sync Code
   ↓
Call Stack
   ↓
Event Loop
   ↓
Microtask Queue (Promise)
   ↓
Callback Queue (setTimeout)
   ↓
Execute
```


