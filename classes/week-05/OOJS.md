## JS have some concept same as C++, Python,JAVA,

## JS main concept for tricky is
- this   
```
- this is for access the parent object keys  
- parent key are accessable in object methods
- this cannnot be accessable at inner child methods
- but is can accessable at forEach
- Also can accesable at arrow methods inside the methods
```
- Call
- bind
- apply
- new
- prototype
- Classes
- Promisses



Step 1: brand new object is created {}

Step 2: every function has a prototype. Even the object itself also has prototype
we LINK both of them together 

Step 3: now comes “this”, whoever calls it will bind with caller reference.
bind “this” to new object

Step 4: automatically the newly created object is returned by the Constructor
Explicit return of object
