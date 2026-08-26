# Activity: Understanding Middlewares in Express.js

In this lab, you will learn about different types of middleware in an Express.js application, including built-in middleware, custom middleware, and how the order and placement of middleware affect the application's behavior.

## Part 0: Setup

   - Clone the repository using the following command:
     ```bash
     git clone https://github.com/tx00-resources-en/api-cars-middleware
     ```

   - Change into the project directory and install dependencies:
     ```bash
     cd api-cars-middleware
     npm install
     npm run dev
     ```

---
## Part A: Working with Middleware in `app.js`

Take a look at the existing middleware configuration in the `app.js` file:

```js
const express = require("express");
const app = express();
const carRouter = require("./routes/carRouter");
const { middleware1, middleware2 } = require("./middleware/customMiddlewares");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");

// Middleware to parse JSON
app.use(express.json());

app.use(logger);

app.get("/", middleware1, (req, res) => res.send("API Running!"));

// Use the carRouter for all /cars routes
app.use("/cars", carRouter);

app.use(middleware2);
app.use(notFound);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### 1. Understanding Built-in Middleware: JSON Parser

- **What is the JSON Parser Middleware?**
  - `express.json()` is a built-in middleware in Express.js that parses incoming JSON requests and makes the parsed data available in `req.body`. It is essential for handling JSON data sent in HTTP requests.

- **Experiment**:
  - Comment out the line `app.use(express.json());` in `app.js`.
  - Use Postman to send a POST request to the API with the following JSON body:
    ```json
    {
      "model": "Toyota Camry",
      "color": "Blue",
      "age": 3
    }
    ```
  - Observe that the server is unable to parse the JSON data without the middleware, leading to errors or undefined `req.body`.

### 2. Comparing Built-in and Custom Middleware

- **Built-in Middleware**:
  - `express.json()` is built into Express.js to handle parsing of JSON payloads from incoming requests.

- **Custom Middleware**:
  - `logger` is a custom middleware that logs the HTTP method, URL, and timestamp of each request.

- **Experiment**:
  - Observe the use of both middleware in the `app.js` file:
    ```js
    app.use(express.json()); // Built-in middleware
    app.use(logger); // Custom middleware
    ```
  - Note that `express.json()` handles request parsing, while `logger` outputs request details to the console.

### 3. Middleware Behavior and Order

- **Understanding Middleware Order and Behavior**:
  - The order in which middleware is applied affects how requests are handled. In `app.js`, the middleware functions `logger`, `middleware1`, and `notFound` serve different purposes.
  
- **Experiment**:
  - Understand the role of each middleware in the starter code:
    - `logger` logs each request before any other middleware or route handlers are processed.
    - `middleware1` runs for the root URL (`/`) requests.
    - `notFound` handles any requests that do not match any route and returns a 404 status.

- **Application-Level vs. Route-Level Middleware**:
  - Application-level middleware (e.g., `app.use(logger)`) applies to all routes.
  - Route-level middleware (e.g., `app.get("/", middleware1, ...)`) applies only to specific routes.

---
## Part B: Middleware in `carRouter.js`

Examine the middleware configuration in the `carRouter.js` file:

```js
const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carControllers');
const {
  middleware3,
  middleware4,
  middleware5,
  middlewareNoNext,
} = require('../middleware/customMiddlewares');

router.use(middleware3);

// GET /cars
router.get('/', getAllCars);

router.use(middleware4);

// POST /cars
router.post('/', createCar);

// GET /cars/:carId
router.get('/:carId', middleware5, getCarById);

// PUT /cars/:carId
router.put('/:carId', updateCar);

router.use(middlewareNoNext);

// DELETE /cars/:carId
router.delete('/:carId', deleteCar);

module.exports = router;
```

### 1. Understanding Middleware Order in `carRouter.js`

- **Impact of Middleware Order**:
  - Middleware is executed in the order it is defined. In `carRouter.js`:
    - `middleware3` is applied to all routes.
    - `middleware4` affects all routes defined after it.
    - `middleware5` is only applied to the `GET /cars/:carId` route.
    - `middlewareNoNext` stops further processing after the `PUT /cars/:carId` route because it does not call `next()`.

- **Experiment**:
  - Use Postman to test each route (`GET /cars`, `POST /cars`, `GET /cars/:carId`, etc.).
  - Observe the console logs and responses to see how each middleware affects the request flow.

### 2. Router-Level Middleware vs. Route-Level Middleware

- **Router-Level Middleware**:
  - Applies to all routes within the router.
  - Example: `router.use(middleware3)` is applied to all routes in `carRouter`.

- **Route-Level Middleware**:
  - Applies only to specific routes.
  - Example: `router.get('/:carId', middleware5, getCarById)` applies `middleware5` only to the `GET /cars/:carId` route.

- **Experiment**:
  - Compare the behavior of `router.use(middleware3)` (router-level) with `router.get('/:carId', middleware5, getCarById)` (route-level) by testing the routes with Postman.

### 3. Effect of Middleware that Doesn't Call `next()`

- **Understanding `middlewareNoNext`**:
  - `middlewareNoNext` does not call `next()`, effectively stopping the request-response cycle and preventing any middleware or route handler defined after it from executing.

- **Experiment**:
  - Attempt to delete a car using the `DELETE /cars/:carId` route.
  - Observe that the request does not reach the `deleteCar` controller due to `middlewareNoNext` halting the cycle.
  - Understand the importance of calling `next()` in middleware to ensure proper flow through subsequent middleware or route handlers.

## Conclusion

By the end of this lab, you should have gained a clearer understanding of how middleware worked in Express.js, including the differences between built-in and custom middleware, the significance of middleware order, and the impact of router-level versus route-level middleware. You also saw firsthand how middleware functions that did not call `next()` affected the request lifecycle.