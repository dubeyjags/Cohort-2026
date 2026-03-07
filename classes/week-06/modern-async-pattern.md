## Modern Aysnc patterns   

Queues,
Promises,
Closures

Closures :- A closure is when a function remembers variables from its outer **scope** even after the outer function has finished executing.

```
function outer(){
  let count = 0;
  return function inner(){
    count++;
    console.log(count);
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```
**Uses**

Closures are used in:  
React hooks  
Data privacy  
Function factories  
Event handlers

#  Promise
> A Promise represents the result of an asynchronous operation.  
Pending  
Fulfilled  
Rejected  

```
const p = new Promise((resolve,reject)=>{
  resolve("Success");
});
p.then(console.log);

```
## Async / Await
> async/await is syntactic sugar over Promises that makes asynchronous code look synchronous.
```
async function load(){
 const data = await Promise.resolve("Done");
 console.log(data);
}
```
Equivalent Promise code:
```
Promise.resolve("Done")
.then(console.log);
```

# Queues

## Callback Queue
After Web API finishes, callback goes to Callback Queue.
```
setTimeout
↓
Callback Queue
↓
Call Stack
```
## Microtask Queue
Microtask queue contains Promises.
```
Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()

Order
1 Call Stack
2 Microtask Queue (Promises)
3 Callback Queue (Timers)

```


DOM

