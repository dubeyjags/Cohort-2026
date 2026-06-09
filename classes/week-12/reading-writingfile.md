# Node .js FS Module (File System)

import fs from node:fs // methods importants

## Sync Methods
fs.readFileSync('filename.format', 'encoding') // to read the content of a file
fs.writeFileSync('filename.format', 'content') // to create a new file with the given content or overwrite an existing file with the given content
fs.appendFileSync('filename.format', 'content') // to append the given content to the end of an existing file
fs.unlinkSync('filename.format') // to delete the file at the given path
fs.statSync('filename.format') // to get the file info (size, birth time, last modified time, etc)
fs.lstatSync('filename.format') // to get the file info (size, birth time, last modified time, etc)
fs.readdirSync('path') // to get the list of files inside the given directory
fs.mkdirSync('path') // to create a new directory at the given path
fs.rmdirSync('path') // to delete the directory at the given path
fs.renameSync('oldPath', 'newPath') // to rename the file or directory at the given path
fs.truncateSync('path', length) // to truncate the file at the given path to the given length

## Async Methods
fs.readFile('filename.format', 'encoding', (err, data) => {}) // to read the content of a file
fs.writeFile('filename.format', 'content', (err) => {}) // to create a new file with the given content or overwrite an existing file with the given content
fs.appendFile('filename.format', 'content', (err) => {}) // to append the given content to the end of an existing file
fs.unlink('filename.format', (err) => {}) // to delete the file at the given path
fs.stat('filename.format', (err, stats) => {}) // to get the file info (size, birth time, last modified time, etc)
fs.lstat('filename.format', (err, stats) => {}) // to get the file info (size, birth time, last modified time, etc)
fs.readdir('path', (err, files) => {}) // to get the list of files inside the given directory
fs.mkdir('path', (err) => {}) // to create a new directory at the given path
fs.rmdir('path', (err) => {}) // to delete the directory at the given path
fs.rename('oldPath', 'newPath', (err) => {}) // to rename the file or directory at the given path
fs.truncate('path', length, (err) => {}) // to truncate the file at the given path to the given length

## Promise Methods

Promises are a way to handle asynchronous operations in a more readable way. They allow you to write asynchronous code that is easier to understand and maintain.

A promise is an object that represents the eventual completion (or failure) of an operation and its resulting value. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

Promises are useful when you need to perform an asynchronous operation and then perform some action with the result of that operation. For example, you can use a promise to read a file and then process its content.

Here's an example of how to define a promise method:

const readFilePromise = (path, encoding) => new Promise((resolve, reject) => {
  fs.readFile(path, encoding, (err, data) => {
    if (err) reject(err)
    else resolve(data)
  })
})

This method returns a promise that resolves with the content of the file when the file is read successfully, or rejects with an error if there is an issue reading the file.

You can use a promise method like this one by calling it and then using the `then` method to perform an action with the result of the operation. For example:

readFilePromise('file.txt', 'utf8')
  .then(content => {
    // process the content
  })
  .catch(err => {
    // handle the error
  })

Alternatively, you can use the `async/await` syntax to write asynchronous code that is easier to read and maintain. For example:

const readFileAsync = async (path, encoding) => {
  try {
    const content = await new Promise((resolve, reject) => {
      fs.readFile(path, encoding, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
    return content
  } catch (err) {
    throw err
  }
}

You can use this method like this:

const processFile = async () => {
  try {
    const content = await readFileAsync('file.txt', 'utf8')
    // process the content
  } catch (err) {
    // handle the error
  }
}

IPL Management system

