# CRUD

- [Part 1: Understanding Array Manipulations in JavaScript](#part-1-understanding-array-manipulations-in-javascript)
-  [Part 2: Understanding Controllers and Handlers](#part-2-understanding-controllers-and-handlers)
- [Links](#links)

---

## Part 1: Understanding Array Manipulations in JavaScript

This part explains key concepts in JavaScript array manipulation through a practical example involving car data management. We'll explore the data model, specific array methods like `push()` and `find()`, and various important code elements such as `id: nextId++`, `if (require.main === module)`, and module exports.

#### Data Model

The data model for this code is a simple JavaScript object representing a car, with three properties:

```javascript
{
    "model": "Corolla",
    "color": "Red",
    "age": 3
}
```

Each car object contains:
- **`model`**: A string indicating the car model (e.g., "Corolla").
- **`color`**: A string specifying the car's color (e.g., "Red").
- **`age`**: A number representing the car's age (e.g., 3 years old).

This model is used consistently to add, update, and manipulate car entries within an array.

#### `push()`: Adding Elements to an Array

The `push()` method is used to add new elements to the end of an array. In this code, `push()` is used in the `addOne()` function to insert a new car object into the `carArray`.

Example from the code:

```javascript
function addOne(model, color, age) {
    if (!model || !color || !age) {
        return false;
    }

    const newCar = {
        id: nextId++,
        model,
        color,
        age
    };

    carArray.push(newCar);
    return newCar;
}
```

- **How it works**: `push()` adds the `newCar` object to the end of `carArray`. This effectively updates the array with the new data while maintaining the order of elements.

#### `find()`: Searching for Elements

The `find()` method is used to search an array and return the first element that matches a given condition. In the `findById()` function, `find()` is used to locate a car by its ID.

Example from the code:

```javascript
function findById(id) {
    const numericId = Number(id);
    const car = carArray.find(item => item.id === numericId);
    if (car) {
        return car;
    } else {
        return false;
    }
}
```

- **How it works**: `find()` iterates over `carArray` and returns the first car object whose `id` matches `numericId`. If no matching car is found, it returns `false`.

#### Using `===` and `!==`: Strict Equality and Inequality

In JavaScript, `===` is used for strict equality comparison, meaning both the value and type must match. Similarly, `!==` is used for strict inequality.

Example:

- **`===`** in `findById()` ensures that the `id` being compared is of the same type (number) and has the same value as the `numericId`.
  
```javascript
const car = carArray.find(item => item.id === numericId);
```

- **`!==`** in `deleteOneById()` is used to filter out the car with the matching ID, returning only cars that do not match the provided ID.

```javascript
carArray = carArray.filter(car => car.id !== Number(id));
```

This strict comparison is crucial for ensuring that the operations perform accurately without unintended type coercion.

#### `id: nextId++`: Assigning Unique Identifiers

The code uses `id: nextId++` to assign a unique ID to each new car added to the array. This line leverages the post-increment operator `++` to ensure that every car object gets a unique ID starting from 1.

Example from the code:

```javascript
const newCar = {
    id: nextId++, // Assigns current value of nextId and then increments it
    model,
    color,
    age
};
```

- **How it works**: `nextId++` assigns the current value of `nextId` to `id` and then increments `nextId` by 1. This guarantees that each new car receives a distinct ID sequentially.

#### `if (require.main === module) { ... }`: Direct Execution Check

This line checks if the script is being run directly rather than being imported as a module in another script.

Example from the code:

```javascript
if (require.main === module) {
    // Code inside this block runs only if the file is executed directly
}
```

- **How it works**: `require.main === module` evaluates to `true` if the current module is the entry point of the application (i.e., it was run directly with `node fileName.js`). If true, the code block will execute, allowing for testing or demonstration purposes without affecting module functionality when imported elsewhere.

#### Exporting the Car Object

To make the functions accessible from other modules, the code uses an object to group them and `module.exports` to export this object.

Example from the code:

```javascript
Car = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = Car;
```

- **How it works**: The `Car` object contains all the relevant functions. `module.exports = Car;` makes this object available for import in other files using `require()`. This structure allows the functions to be reused and organized within larger applications.

<!-- ### Conclusion

This code snippet demonstrates essential JavaScript array manipulation techniques with a practical example involving car data. By understanding the data model and functions like `push()` and `find()`, along with the use of strict equality, unique ID assignment, direct execution checks, and module exports, you can effectively manage and manipulate array data in JavaScript applications. -->

---

## Part 2: Understanding Controllers and Handlers

In a Node.js and Express.js application, controllers or handlers manage incoming HTTP requests and produce the appropriate responses. This part will delve into key aspects of handling requests and responses, using the example code for managing car data. Specifically, we'll cover the request object, response object, status codes, and methods like `res.json` and `res.send`.

#### Request Object and `req.body`

The **request object (`req`)** in Express.js represents the HTTP request and contains various properties that provide information about the request, including the request body, query parameters, URL parameters, headers, and more.

- **`req.body`**: This property contains the body data sent by the client, typically in POST, PUT, or PATCH requests. It is essential for receiving data that needs to be processed or stored on the server.

Example from the `createCar` function:

```javascript
const createCar = (req, res) => {
  const { model, color, age } = req.body; // Extracts model, color, and age from the request body

  const newCar = Car.addOne(model, color, age);

  if (newCar) {
    res.json(newCar);
  } else {
    res.status(500).json({ message: "Failed to create car" });
  }
};
```

- **How it works**: In the `createCar` handler, `req.body` is used to extract the `model`, `color`, and `age` properties provided by the client when creating a new car. This data is then passed to the `Car.addOne()` function to add the car to the database or in-memory storage.

#### Response Object

The **response object (`res`)** in Express.js represents the HTTP response that the server sends back to the client. It provides several methods for setting the status, headers, and body of the response.

#### Status Codes: `res.status(500)`, `res.status(404)`, `res.status(200)`

Status codes indicate the result of the request:

- **`res.status(200)`**: Indicates success. This status code is automatically assumed when using `res.json()` or `res.send()` without explicitly setting a status code.
- **`res.status(404)`**: Indicates that the requested resource could not be found. This is used in cases where a lookup fails, such as when searching for a car by ID that does not exist.
- **`res.status(500)`**: Indicates a server error. This status code is used when an unexpected condition prevents the server from fulfilling the request, such as failing to create a car.

Example usage of status codes:

```javascript
const getCarById = (req, res) => {
  const carId = req.params.carId;
  const car = Car.findById(carId);
  if (car) {
    res.json(car); // Responds with status 200 by default and the car data in JSON format
  } else {
    res.status(404).json({ message: 'Car not found' }); // Responds with status 404 if the car is not found
  }
};
```

- **How it works**: In `getCarById`, if the car is found, the handler responds with status `200` and the car data in JSON format. If not found, it responds with status `404` and a JSON message indicating that the car was not found.


#### `res.json()`: Sending JSON Responses

**`res.json()`** is a method used to send a JSON-formatted response to the client. It automatically sets the `Content-Type` header to `application/json` and serializes the JavaScript object or array into JSON.

Example from multiple handlers:

```javascript
res.json(newCar); // Sends the newly created car object as a JSON response
```

- **How it works**: In `createCar`, `res.json(newCar)` sends the newly created car object back to the client in JSON format. This method is preferred for APIs because JSON is a widely accepted format for data exchange.

> In JavaScript, the `res.status()` method sets the status code and then returns the response object, allowing you to chain the `.json()` method.

#### `res.send()`: Sending Text Responses

**`res.send()`** (not explicitly used in the given code but often referred to alongside JSON responses) can be used to send plain text, HTML, or any other type of data as a response. 

Example:

```javascript
res.send("Car deleted successfully"); // Sends a plain text response
```

In APIs, text responses are less common than JSON but might be used for simple success messages or debugging.

#### Handling Requests with the Handlers: Example Walkthrough

Here’s a quick breakdown of each handler’s role:

1. **`getAllCars(req, res)`**:
   - Retrieves all cars using `Car.getAll()` and sends them as a JSON response.

2. **`createCar(req, res)`**:
   - Extracts car details from `req.body`, attempts to add the car, and responds with the created car or a `500` status if creation fails.

3. **`getCarById(req, res)`**:
   - Retrieves a specific car by ID from `req.params`, sending it in JSON format or a `404` status if not found.

4. **`updateCar(req, res)`**:
   - Updates a car by ID using data from `req.body` and responds with the updated car or a `404` status if the car isn’t found.

5. **`deleteCar(req, res)`**:
   - Deletes a car by ID and responds with a success message or a `404` status if the car doesn’t exist.

Each of these handlers makes use of `req` to access request data and `res` to send back appropriate responses, often with specific HTTP status codes to indicate the outcome of the request.

<!-- ### Conclusion

Understanding the use of the request (`req`) and response (`res`) objects in Express.js is crucial for building effective APIs. The request object allows you to access data sent by the client, while the response object provides the methods needed to send appropriate feedback, status codes, and data formats back to the client. This clear communication between the client and server is what makes modern web applications functional and user-friendly. -->

---
## Links

- [Request Object](./request.md)
- [Response Object](./response.md)
