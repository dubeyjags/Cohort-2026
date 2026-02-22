const arr = [1, 2, 3, 4, 5];
console.log(arr.length); // 5
console.log(arr[0]); // 1
console.log(arr[4]); // 5
console.log(arr.push(6)); // Adds 6 to the end of the array and returns new length
console.log(arr); // [1, 2, 3, 4, 5, 6]
console.log(arr.unshift(0)); // Adds 0 to the start of the array and returns new length
console.log(arr); // [0, 1, 2, 3, 4, 5, 6]
const arr2 = [7, 8, 9];
const merged = arr.concat(arr2);
console.log(merged); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const filled = new Array(5).fill(0);
console.log(filled);    // [0, 0, 0, 0, 0]
const fromString = Array.from("hello");
console.log(fromString); // ['h', 'e', 'l', 'l', 'o']   