# Ultimate JavaScript Tricky Concepts Guide 

## 1️⃣ this

> this is a keyword that refers to the object that is currently executing the function.

Its value depends on how the function is called.
```
const user = {
  name: "John",
  greet() {
    console.log(this.name);
  }
};

user.greet(); //John
```
Arrow Function
```
const user = {
  name: "John",
  greet() {
    const inner = () => {
      console.log(this.name);
    };
    inner();
  }
};
```
| Case             | `this` value       |
| ---------------- | ------------------ |
| Object method    | object             |
| Regular function | window / undefined |
| Arrow function   | parent scope       |


## 2️⃣ Closures
> A closure is when a function remembers variables from its outer scope even after the outer function has finished executing.
```
function outer(){
  let count = 0;
  return function inner(){
    count++;
    console.log(count);
  };
}
const counter = outer();
counter(); //1
counter(); //2
counter(); //3
```
**Uses**

Closures are used in:  
React hooks  
Data privacy  
Function factories  
Event handlers

## 3️⃣ Hoisting
Definition

Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope before execution.

```
var a;
console.log(a);
a = 5;
// undefined

with let and const
console.log(a);
let a = 5;
// ReferenceError
```
| Keyword | Hoisted | Initialized |
| ------- | ------- | ----------- |
| var     | Yes     | undefined   |
| let     | Yes     | No          |
| const   | Yes     | No          |

## 4️⃣ Prototype
> Every JavaScript function has a prototype object used to share properties and methods between instances.

```
function Person(name){
  this.name = name;
}

Person.prototype.sayHi = function(){
  console.log("Hi " + this.name);
};

const p1 = new Person("John");
p1.sayHi();
```
## 5️⃣ Prototype Chain
> JavaScript searches properties in a chain of prototypes.

```
const obj = {};
obj.toString();

obj
↓
Object.prototype
↓
null
```
This is the prototype chain.

## 6️⃣ Event Loop
> The Event Loop manages asynchronous operations in JavaScript.
```
Call Stack
↓
Microtask Queue (Promises)
↓
Callback Queue (setTimeout)
```
```
console.log("1");

setTimeout(()=>{
 console.log("2");
},0);

Promise.resolve().then(()=>{
 console.log("3");
});

console.log("4");

// 1
// 4
// 3
// 2
```

## 7️⃣ Promise
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
## 8️⃣ Async / Await
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

## 9️⃣ call, apply, bind
> These methods control the value of this.

### call()
`greet.call(user);`  
Arguments → separate.

### apply()
`greet.apply(user,[25]);`  
Arguments → array.

### call()
`const fn = greet.bind(user);
fn();`  
Returns new function.

| Method | Executes Immediately | Arguments |
| ------ | -------------------- | --------- |
| call   | Yes                  | separate  |
| apply  | Yes                  | array     |
| bind   | No                   | separate  |

## 🔟 new
> new creates an object from a constructor function.
```
function Person(name){
  this.name = name;
}

const p1 = new Person("John");
```
- 1 Create empty object
- 2 Set this to object
- 3 Link prototype
- 4 Return object

## 1️⃣1️⃣ Shallow vs Deep Copy
### Shallow Copy
Copies reference.
```
const obj = {a:1};
const copy = obj;
```
Changing copy changes obj.

### Deep Copy

Creates new memory.
```
const copy = JSON.parse(JSON.stringify(obj));
```

## 1️⃣2️⃣ Debounce vs Throttle
### Debounce
Runs function after delay.  
`Example: search input.`

### Throttle
Runs function once every interval.  
`Example: scroll event.`


| Concept           | Why Important      |
| ----------------- | ------------------ |
| this              | object context     |
| closures          | memory + functions |
| hoisting          | variable behavior  |
| prototype         | inheritance        |
| event loop        | async behavior     |
| promises          | async control      |
| async/await       | modern async       |
| call/apply/bind   | control this       |
| new               | object creation    |
| shallow/deep copy | memory handling    |


# JavaScript Architecture Overview
                JS ENGINE
        -------------------------
        |                       |
        |   Memory Heap        |
        |  (Stores Variables)  |
        |                       |
        -------------------------
                 |
                 |
        -------------------------
        |      Call Stack       |
        |  (Runs Functions)     |
        -------------------------
                 |
                 v
            Event Loop
                 |
        -------------------------
        |     Microtask Queue   |
        |  (Promises, async)    |
        -------------------------
                 |
        -------------------------
        |     Callback Queue    |
        | (setTimeout, Events)  |
        -------------------------

## 1️⃣ Memory Heap
> Memory Heap is where variables, objects, and functions are stored.
```
let a = 10;

const user = {
 name: "John"
};

Memory Heap
-----------
a → 10

user → {
  name:"John"
}
```

## 2️⃣ Call Stack
> The Call Stack keeps track of functions being executed.
```
function a(){
 b();
}
function b(){
 console.log("Hello");
}
a();

Call Stack
a()
b()
console.log()

After execution it becomes:
(empty)
```


## 3️⃣ Web APIs (Browser)
Browser provides APIs like:
```
setTimeout
fetch
DOM events
```
The timer runs in Web API, not in JS engine.

## 4️⃣ Callback Queue
After Web API finishes, callback goes to Callback Queue.
```
setTimeout
↓
Callback Queue
↓
Call Stack
```
## 5️⃣ Microtask Queue
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

6️⃣ Event Loop
> Event Loop continuously checks:  
`Is Call Stack empty?`  
If yes → move tasks from queue.




```
Code Execution  
      ↓  
Call Stack  
      ↓  
Web APIs  
      ↓  
Queues  
 ┌───────────────┐  
 │ Microtask     │  
 │ (Promises)    │  
 └───────────────┘  
      ↓  
 ┌───────────────┐  
 │ Callback      │  
 │ (setTimeout)  │  
 └───────────────┘  
      ↓  
Event Loop pushes to  
Call Stack  
```

