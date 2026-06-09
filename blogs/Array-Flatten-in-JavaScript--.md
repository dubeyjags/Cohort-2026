# Array Flatten in JavaScript

Array can store all data types of value like, String, number, boolean, object and Array too. yes Arary can store another array in the single value in it. so,

*If Array has values of another Arrays so we call it Nested Arrays*

```js
let numbers = [1, 2, [3, 4], [5, 6]];
```
- Main array contains normal values
- It also contains smaller arrays inside it

## Nested arrays are common in:

- API responses
- Menu structures
- Categories/subcategories
- Matrix data
- Tree-like structures

`Sometimes we need all values in one simple array.`

```js
[1, [2, 3], [4, 5]] // nested arrays
[1, 2, 3, 4, 5] // flatten arrays
```


## Flatten Arrays

Flattening converts a nested structure into a single flat list

## Approches to convert nested to flatten arrays

### 1) Using .flat() (modern js)

```js
let arr = [1, 2, [3, 4], [5, 6]]; //nested array 
let result = arr.flat(); // flatten and store on another var
console.log(result); //[1, 2, 3, 4, 5, 6]
```

`.flat() Flatten all levels of arrays`

### 2) Using Loops

```js
let arr = [1, 2, [3, 4]];
let result = [];

for (let i = 0; i < arr.length; i++) {
  if (Array.isArray(arr[i])) {
    result = result.concat(arr[i]);
  } else {
    result.push(arr[i]);
  }
}

console.log(result);
```
When flattening arrays:

- Check each item
- If normal value → add directly
- If array → take values out
- Repeat until fully flat


### 3) Using Recursion

```js
function flatten(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flatten([1, [2, [3, 4]]]));
```

| Method        | Best For                    |
| ------------- | --------------------------- |
| `flat()`      | Simple and modern           |
| Loop + concat | Beginner understanding      |
| Recursion     | Interviews and deep nesting |


## Summary
Nested arrays = arrays inside arrays  
Flattening = converting into one simple array  
Use .flat() for easy cases  
Learn recursion  
Always think step-by-step while solving 

[\[Arrays Basic\]](https://dubeyjags.hashnode.dev/javascript-arrays-101)
