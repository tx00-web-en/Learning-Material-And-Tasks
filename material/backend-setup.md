# Backend Setup Guide

## 1) Setup: backend structure and hierarchy

Use this backend structure:

```text
backend/
  .env
  .env.example
  app.js
  index.js
  package.json
  config/
    db.js
  controllers/
    productControllers.js
  middleware/
    customMiddleware.js
  models/
    productModel.js
  routes/
    productRouter.js
  tests/
    teardown.js
  utils/
    config.js
    logger.js
```

Recommended responsibility for each part:

- `index.js`: starts the server and connects to the database.
- `app.js`: creates the Express app, registers middleware, routes, and error handling.
- `config/db.js`: reusable MongoDB connection setup.
- `controllers/`: request-handling logic.
- `models/`: Mongoose schemas and models.
- `routes/`: Express routes.
- `middleware/`: shared middleware such as logging and error handling.
- `utils/`: shared configuration and logger helpers.
- `tests/`: backend test helpers and test files.

## 2) Reusable setup files

These parts can usually be reused in other Express + MongoDB projects with only small changes.

### Install the packages

From `package.json`, install:

```bash
npm install cors dotenv express mongoose cross-env
npm install -D nodemon
```

### package.json scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### .env

Use an environment file like this:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/products-api
```

### config/db.js

This file is reusable in most projects that use Mongoose:

```js
const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### middleware/customMiddleware.js

This middleware setup is also reusable:

```js
const logger = require('../utils/logger');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

module.exports = { unknownEndpoint, errorHandler, requestLogger };
```

### index.js

This is the usual backend entry point:

```js
const app = require('./app');
const connectDB = require('./config/db');
const config = require('./utils/config');
const logger = require('./utils/logger');

connectDB();

const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

module.exports = server;
```

### app.js

Most of this file can be reused from one project to another. The main thing that usually changes is the route import and route path.

```js
const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/productRouter');
const {
  unknownEndpoint,
  errorHandler,
  requestLogger,
} = require('./middleware/customMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/products', productRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
```

## What usually changes from project to project

You can usually reuse the setup files above, but these parts often need project-specific changes:

- route names such as `/api/products`
- router imports such as `productRouter`
- model names and schema fields
- controller logic
- environment variable values
- test database name

## Later: user administration packages

When you start adding user administration and authentication, you will usually need these extra packages:

```bash
npm install bcryptjs jsonwebtoken
```
