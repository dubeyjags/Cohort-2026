# Javascript Essentials

## Print Statements
`console.log("Hello");`     // General output, most commonly used   
`console.warn("Warning");`  // Yellow warning message  
`console.error("Error");`   // Red error message  
`console.table([{a:1},{a:2}])`; // Displays data in table format  
`console.count("loop");`    // Counts how many times it is called with same label  
`console.clear();`          // Clears console  
`console.time("t");`        // Start timer  
`console.timeEnd("t");`     // End timer and show duration  


## Variables

`Overridding` 
`Accesscible`
```
`let` can be override
`const` cannot be override only define once
`var` is the older one not used for now
```


## DataTypes
`Typeof` to check the datatype  
`typeof 123;`        // "number"  
`typeof "abc";`      // "string"   
`typeof true;`       // "boolean"  
`typeof undefined;`  // "undefined"  
`typeof null;`       // "object" (JS bug/quirk)  
`typeof {};         `// "object"  
`typeof [];         `// "object"  
`typeof Symbol();`   // "symbol"  

### Numbers

`toFixed()` // specify the number of decimal round off  
`toPrecision()`// specify the number of decimal places  
`Number.isInteger()`  
`Number.parseInt()`  
`Number.parseFloat()`  
`Number.MAX_VALUE`  


### Strings
**Properties**  
`length` – get the length 

**Methods**  
`toUpperCase()` – convert to uppercase  
`toLowerCase()` – convert to lowercase  
`trim()` – remove whitespace from both ends  
`trimStart()` – remove whitespace from start  
`trimEnd()` – remove whitespace from end  
`slice(start, end)` – extract part of string  
`substring(start, end)` – similar to slice  
`replace(old, new)` – replace text  
`replaceAll(old, new)` – replace all matches  
`includes(value)` – check if exist  
`startsWith(value)` – check beginning  
`endsWith(value)` – check ending  
`split(separator)` – convert to array  
`charAt(index)` – get character  
`indexOf(value)` – first position  
`lastIndexOf(value)` – last position  
`concat(str)` – join strings


### BigInt
*number with n char* 

### Boolean
**value in True or False**  
*0,false is also false*

### Null
`Intentional empty value`
### undefined
`Value not assigned`

### Symbols
`let sym = Symbol("id");    `  
not mostly used
### Array
**Properties**  
`length` count the items   

**Methods**  
*Create/add items*
"push()",     // add to end  
"unshift()",  // add to start  
"concat()",   // merge arrays  
"fill()",     // fill with value  
"Array.from()"// create from iterable  

### Object