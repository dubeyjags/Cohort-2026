# Express with Node.js: Basic to Advanced

## Introduction
Express is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.

---

## Getting Started

### Installation

```bash
npm init -y
npm install express
```

### Basic Server

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

## Routing

```js
app.get('/about', (req, res) => {
    res.send('About Page');
});

app.post('/submit', (req, res) => {
    res.send('Form Submitted');
});
```

---

## Middleware

```js
app.use(express.json()); // Parse JSON bodies

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
```

---

## Serving Static Files

```js
app.use(express.static('public'));
```

---

## Route Parameters & Query Strings

```js
app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

app.get('/search', (req, res) => {
    res.send(`Query: ${req.query.q}`);
});
```

---

## Error Handling

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

---

## Advanced Topics

### Modular Routing

```js
const router = express.Router();

router.get('/profile', (req, res) => {
    res.send('User Profile');
});

app.use('/user', router);
```

### Environment Variables

```js
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.listen(PORT);
```

### Connecting to a Database

```js
// Example with MongoDB and Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
```

---

## Useful Middleware

- `body-parser` (now built-in as `express.json()` and `express.urlencoded()`)
- `cors` for Cross-Origin Resource Sharing
- `morgan` for logging

---

## Resources

- [Express Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)



https://link.excalidraw.com/readonly/twcMhFTurtFzNlryDVil?darkMode=true