# Theory: Understanding Middlewares

---
## Introduction

### What is Middleware?

In Express.js, **middleware** functions are functions that have access to the HTTP request (`req`), response (`res`), and the next middleware function in the application's request-response cycle. Middleware can execute code, modify the request and response objects, end the request-response cycle, or call the next middleware function in the stack.

### Why Use Middleware in Express?

Middleware is a powerful concept that allows developers to:
- Organize and structure their code into reusable components.
- Implement common tasks such as logging, authentication, parsing request bodies, error handling, etc.
- Control the flow of requests, responses, and how data is managed within an Express application.

Middleware functions are executed in the order they are defined in the application. This flexibility allows developers to create a pipeline of middleware functions that handle different aspects of the request-response cycle.

### How to Use Middleware in Express

To use middleware in an Express application, you can use the `app.use()` method to apply middleware globally or apply it to specific routes. Here are a few examples:

1. **Applying middleware globally:**
   ```javascript
   const express = require('express');
   const app = express();

   // Built-in middleware to parse JSON bodies
   app.use(express.json());

   // Custom middleware to log requests
   const logger = require('./middleware/logger');
   app.use(logger);

   // Other routes and middleware...
   ```

2. **Applying middleware to specific routes:**
   ```javascript
   const express = require('express');
   const app = express();

   // Route-specific middleware
   app.get('/users', logger, (req, res) => {
     res.send('User list');
   });
   ```

---
## Types of Middleware in Express.js

Express.js provides different types of middleware:

### 1. Built-in Middleware

Express comes with several built-in middleware functions. These are ready-to-use middleware that handle common tasks:

- **`express.json()`**: Parses incoming requests with JSON payloads.  
  ```javascript
  app.use(express.json());
  ```
- **`express.urlencoded()`**: Parses incoming requests with URL-encoded payloads.  
  ```javascript
  app.use(express.urlencoded({ extended: true }));
  ```
- **`express.static()`**: Serves static files such as images, CSS files, and JavaScript files.  
  ```javascript
  app.use(express.static('public'));
  ```

### 2. Third-Party Middleware

Third-party middleware is created by the community and can be installed via npm. These middleware modules offer additional functionality that is not included with the core Express package. Some popular third-party middleware include:

- **`morgan`**: An HTTP request logger middleware for Node.js.  
  ```javascript
  const morgan = require('morgan');
  app.use(morgan('dev'));
  ```

- **`cors`**: A middleware to enable Cross-Origin Resource Sharing (CORS).  
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```

### 3. Custom Middleware

Custom middleware allows you to create your own functions to handle specific tasks. This is where you can define your own middleware logic tailored to your application's needs. Here are two examples:

1. **Logger Middleware (`logger.js`):** This middleware logs details of every request made to the server.
   ```javascript
   // middleware/logger.js

   // Custom middleware to log requests
   const logger = (req, res, next) => {
     const { method, url } = req;
     const timestamp = new Date().toISOString();
     console.log(`[${timestamp}] ${method} to ${url}`);
     next(); // Pass control to the next middleware function
   };

   module.exports = logger;
   ```

2. **Unknown Endpoint Middleware (`unknownEndpoint.js`):** This middleware handles requests to unknown routes.
   ```javascript
   // middleware/unknownEndpoint.js

   // Custom middleware for unknown endpoints
   const unknownEndpoint = (request, response) => {
     response.status(404).send({ error: 'unknown endpoint' });
   };

   module.exports = unknownEndpoint;
   ```

---
## Where Can Middleware Be Used in Express?

Middleware can be used at different levels within an Express application:

### 1. Application-Level Middleware

Application-level middleware is bound to an instance of the Express application object (`app`). It can be used for logging, setting headers, parsing request bodies, or any other tasks that should happen for every request to the app.

Example using the `logger` middleware:
```javascript
const express = require('express');
const app = express();
const logger = require('./middleware/logger');

// Apply middleware globally for all routes
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});
```

### 2. Route-Level Middleware

Route-level middleware is specific to certain routes and is applied only when those routes are requested. It can be used to handle tasks specific to certain routes, such as validating user input or checking user authentication.

Example using the `logger` middleware for a specific route:
```javascript
const express = require('express');
const app = express();
const logger = require('./middleware/logger');

// Apply middleware only to the /api route
app.get('/api', logger, (req, res) => {
  res.send('API endpoint accessed');
});
```

### 3. Router-Level Middleware: 

Applied to all routes within a specific router using `router.use()`:

```js
const express = require('express');
const router = express.Router();
const { getBlogPosts, addBlogPost } = require('../controllers/blogPostController');
const logger = require('../middleware/logger')

// require logger for all blog routes
router.use(logger)

// GET all BlogPosts
router.get('/', getBlogPosts);

// POST a new BlogPost
router.post('/', addBlogPost);
// ...

module.exports = router;
```

The `logger` middleware applies to all routes defined within this specific router. Therefore, it is referred to as **router-level middleware**, not global middleware.

If you were to apply `logger` using `app.use(logger)`, it would be considered global middleware, affecting all routes in the application.

### 4. Error Handling Middleware

> More on this next week

Error handling middleware is a special type of middleware that is used to handle errors in an application. It has four arguments: `(err, req, res, next)` and must be defined after all other `app.use()` and route calls.

Example of error-handling middleware:
```javascript
const express = require('express');
const app = express();

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
```



## Conclusion

Middleware is a powerful feature of Express.js that helps you build scalable, maintainable, and efficient web applications. By understanding and using built-in, third-party, and custom middleware, you can extend your Express application to handle a variety of tasks, such as logging, error handling, and more, with ease. Whether applied at the application level, route level, or specifically for error handling, middleware provides the flexibility needed to manage the complexity of modern web applications.

## Links

- [Application-level vs Route based middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Writing middleware](https://expressjs.com/en/guide/writing-middleware.html)
- [How To Use And Write Express Middleware](https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/)

<!-- 

### Example: Middleware function requestTime

Next, we’ll create a middleware function called “requestTime” and add a property called requestTime to the request object.
   ```javascript
  const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
  }
   ```

The app now uses the requestTime middleware function. Also, the callback function of the root path route uses the property that the middleware function adds to req (the request object).
   ```javascript
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
   ```

When you make a request to the root of the app, the app now displays the timestamp of your request in the browser.
-->