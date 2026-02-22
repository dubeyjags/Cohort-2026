const str = "Hello, World!";
console.log(str.length); // 13
console.log(str.toUpperCase()); // "HELLO, WORLD!"
console.log(str.toLowerCase()); // "hello, world!"
console.log(str.trim()); // "Hello, World!" (no leading or trailing whitespace)
const strWithWhitespace = "   Hello, World!   ";
console.log(strWithWhitespace.trimStart()); // "Hello, World!   "
console.log(strWithWhitespace.trimEnd()); // "   Hello, World!"
console.log(str.slice(0, 5)); // "Hello"
console.log(str.substring(0, 5)); // "Hello"
console.log(str.replace("World", "Universe")); // "Hello, Universe!"
console.log(str.replaceAll("World", "Universe")); // "Hello, Universe!"
console.log(str.includes("World")); // true
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!")); // true
console.log(str.split(",")); // ["Hello", " World!"]    
console.log(str.charAt(0)); // "H"
console.log(str.indexOf("World")); // 6
console.log(str.lastIndexOf("World")); // 6     
console.log(str.concat(" How are you?")); // "Hello, World! How are you?"    