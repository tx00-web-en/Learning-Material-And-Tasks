# Activity: CRUD

In this lab, you will build API handlers for managing `cars` and `todos` by working with two different repositories. The lab is divided into two parts:

- Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 
- You can refer to the example files [dogHandlers.js](./src/dogHandlers.js) and [petHandlers.js](./src/petHandlers.js) located in the `src` folder. 

---
## Part 1: Implementing `carHandlers.js`

#### Step 1: Clone the Repository

1. Clone the repository for the cars API using the following command:
  ```bash
  git clone https://github.com/tx00-resources-en/api-cars
  ```
2. Navigate to the cloned directory:
  ```bash
  cd api-cars
  ```

3. Remove the `.git` folder:
    - **Windows Users:** Run the following command to remove the Git history: `Remove-Item -Recurse -Force .git`
    - **macOS/Linux Users:** Run the following command to remove the repository's Git history: `rm -rf .git`  

#### Step 2: Implement `carHandlers.js`

- The file `carHandlers.js` currently has no code. You will add the following snippets step by step.

##### **Snippet 1: Import `carLib.js`**
- In the first snippet, you need to import the `Car` object from `carLib.js`, which contains the functions you implemented previously:
  ```javascript
  const Car = require("./carLib");
  ```

##### **Snippet 2: Get All Cars**
- This snippet defines a handler for the `GET /cars` endpoint, which retrieves all cars:
  ```javascript
  const getAllCars = (req, res) => {
    const cars = Car.getAll();
    res.json(cars);
  };
  ```
  - **Explanation:** 
    - `Car.getAll()` calls the `getAll` function from `carLib.js`, which returns the list of all cars.
    - `res.json(cars);` sends the list of cars as a JSON response.

##### **Snippet 3: Create a New Car**
- This snippet defines a handler for the `POST /cars` endpoint, which creates a new car:
  ```javascript
  const createCar = (req, res) => {
    const { model, color, age } = req.body;

    const newCar = Car.addOne(model, color, age);

    if (newCar) {
      res.json(newCar);
    } else {
      res.status(500).json({ message: "Failed to create car" });
    }
  };
  ```
  - **Explanation:**
    - The handler extracts `model`, `color`, and `age` from the request body (`req.body`).
    - `Car.addOne(model, color, age)` attempts to create a new car using the `addOne` function from `carLib.js`.
    - If successful, the new car is returned as a JSON response. If it fails (e.g., due to missing fields), a 500 error is returned.

##### **Snippet 4: Get a Car by ID**
- This snippet defines a handler for the `GET /cars/:carId` endpoint, which retrieves a car by its ID:
  ```javascript
  const getCarById = (req, res) => {
    const carId = req.params.carId;
    const car = Car.findById(carId);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  };
  ```
  - **Explanation:**
    - `req.params.carId` retrieves the car ID from the URL.
    - `Car.findById(carId)` searches for the car with the specified ID.
    - If the car is found, it is returned as a JSON response; otherwise, a 404 error is returned.

##### **Snippet 5: Update a Car by ID**
- This snippet defines a handler for the `PUT /cars/:carId` endpoint, which updates a car's details:
  ```javascript
  const updateCar = (req, res) => {
    const carId = req.params.carId;

    const { model, color, age } = req.body;

    const updatedCar = Car.updateOneById(carId, { model, color, age });

    if (updatedCar) {
      res.json(updatedCar);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  };
  ```
  - **Explanation:**
    - The handler retrieves the car ID from the URL and the updated data from the request body.
    - `Car.updateOneById(carId, { model, color, age })` attempts to update the car's details.
    - If the update is successful, the updated car is returned as a JSON response. If the car is not found, a 404 error is returned.

##### **Snippet 6: Delete a Car by ID**
- This snippet defines a handler for the `DELETE /cars/:carId` endpoint, which deletes a car by its ID:
  ```javascript
  const deleteCar = (req, res) => {
    const carId = req.params.carId;

    const isDeleted = Car.deleteOneById(carId);

    if (isDeleted) {
      res.json({ message: "Car deleted successfully" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  };
  ```
  - **Explanation:**
    - The handler retrieves the car ID from the URL.
    - `Car.deleteOneById(carId)` attempts to delete the car with the specified ID.
    - If the deletion is successful, a success message is returned as a JSON response. If the car is not found, a 404 error is returned.

##### **Snippet 7: Export the Handlers**
- Finally, you need to export the handlers so they can be used in other parts of the application:
  ```javascript
  module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
  };
  ```

#### Testing the Car API in Postman

1. **Create a New Collection in Postman:**
   - Open Postman.
   - Click on **Collections** in the left sidebar, then click **New Collection**.
   - Name your collection "Car API" and save it.

2. **Add a Request to the Collection:**
   - Inside your "Car API" collection, click **Add Request**.
   - Name your request according to the endpoint you want to test (e.g., "Get All Cars").

3. **Testing Endpoints:**

   - **GET /cars**
     - Method: **GET**
     - URL: `http://localhost:4000/cars`
     - Click **Send** to retrieve a list of all cars.
     - Save the request in the collection as "Get All Cars".

   - **POST /cars**
     - Method: **POST**
     - URL: `http://localhost:4000/cars`
     - Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
     - Enter the following data model in the body:
       ```json
       {
         "model": "Toyota Camry",
         "color": "Blue",
         "age": 3
       }
       ```
     - Click **Send** to create a new car entry.
     - Save the request in the collection as "Create a Car".

   - **GET /cars/:id**
     - Method: **GET**
     - URL: `http://localhost:4000/cars/id`
     - Replace `id` with the actual ID of the car you want to retrieve (you can get this from the response of the POST request).
     - Click **Send** to retrieve the specific car.
     - Save the request in the collection as "Get Car by ID".

   - **PUT /cars/:id**
     - Method: **PUT**
     - URL: `http://localhost:4000/cars/id`
     - Go to the **Body** tab, select **raw**, and choose **JSON**.
     - Enter the updated data model in the body (e.g., changing the car’s color or other attributes):
       ```json
       {
         "color": "Red",
         "age": 4
       }
       ```
     - Click **Send** to update the car's information.
     - Save the request in the collection as "Update Car by ID".

   - **DELETE /cars/:id**
     - Method: **DELETE**
     - URL: `http://localhost:4000/cars/id`
     - Replace `id` with the actual ID of the car you want to delete.
     - Click **Send** to delete the specific car.
     - Save the request in the collection as "Delete Car by ID".

4. **Save and Organize Your Requests:**
   - Ensure all requests are saved under the "Car API" collection for easy access.

5. **Run the Collection:**
   - You can run the entire collection by clicking the **Run** button in the top right corner of the collection window in Postman.
   - This will execute all the saved requests sequentially.



---
## Part 2: Implementing `todoHandlers.js`

#### Step 1: Clone the Repository

1. Clone the repository for the todos API using the following command:
  ```bash
  git clone https://github.com/tx00-resources-en/api-todos
  ```

2. Navigate to the cloned directory:
  ```bash
  cd api-todos
  ```

3. Remove the `.git` folder:
    - **Windows Users:** Run the following command to remove the Git history: `Remove-Item -Recurse -Force .git`
    - **macOS/Linux Users:** Run the following command to remove the repository's Git history: `rm -rf .git`  


#### Step 2: Implement handlers

- Similar to Part 1, the file `todoHandlers.js` currently has no code. You will add similar snippets as you did in `carHandlers.js`, but this time using the `todosLib.js` library.

- getAllTodos()
- createTodo()
- getTodoById() 
- updateTodo()
- deleteTodo()

#### Step 3: Testing the API in Postman

1. **Create a New Collection in Postman:**
   - Open Postman.
   - Click on **Collections** in the left sidebar, then click **New Collection**.
   - Name your collection "Todos API" and save it.

2. **Add a Request to the Collection:**
   - Inside your "Todos API" collection, click **Add Request**.
   - Name your request according to the endpoint you want to test (e.g., "Get All Todos").

3. **Testing Endpoints:**

   - **GET /todos**
     - Method: **GET**
     - URL: `http://localhost:4000/todos`
     - Click **Send** to retrieve a list of all todos.
     - Save the request in the collection as "Get All Todos".

   - **POST /todos**
     - Method: **POST**
     - URL: `http://localhost:4000/todos`
     - Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
     - Enter the following data model in the body:
       ```json
       {
         "task": "Buy groceries",
         "completed": false,
         "dueDate": "2025-08-30"
       }
       ```
     - Click **Send** to create a new todo entry.
     - Save the request in the collection as "Create a Todo".

   - **GET /todos/:id**
     - Method: **GET**
     - URL: `http://localhost:4000/todos/id`
     - Replace `id` with the actual ID of the todo you want to retrieve (you can get this from the response of the POST request).
     - Click **Send** to retrieve the specific todo.
     - Save the request in the collection as "Get Todo by ID".

   - **PUT /todos/:id**
     - Method: **PUT**
     - URL: `http://localhost:4000/todos/id`
     - Go to the **Body** tab, select **raw**, and choose **JSON**.
     - Enter the updated data model in the body (e.g., changing the task or completion status):
       ```json
       {
         "task": "Buy groceries and cook dinner",
         "completed": true,
         "dueDate": "2025-08-31"
       }
       ```
     - Click **Send** to update the todo's information.
     - Save the request in the collection as "Update Todo by ID".

   - **DELETE /todos/:id**
     - Method: **DELETE**
     - URL: `http://localhost:4000/todos/id`
     - Replace `id` with the actual ID of the todo you want to delete.
     - Click **Send** to delete the specific todo.
     - Save the request in the collection as "Delete Todo by ID".

4. **Save and Organize Your Requests:**
   - Ensure all requests are saved under the "Todos API" collection for easy access.

5. **Run the Collection:**
   - You can run the entire collection by clicking the **Run** button in the top right corner of the collection window in Postman.
   - This will execute all the saved requests sequentially.

#### Step 4: push to GitHub

Follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 

---
## Summary

In Part 1, you worked with `carHandlers.js`, where each snippet built an API endpoint for managing car data:

- **Snippet 1:** Imported the `carLib.js` library to access the car manipulation functions.
- **Snippet 2:** Defined a handler to get all cars.
- **Snippet 3:** Defined a handler to create a new car.
- **Snippet 4:** Defined a handler to get a car by its ID.
- **Snippet 5:** Defined a handler to update a car by its ID.
- **Snippet 6:** Defined a handler to delete a car by its ID.
- **Snippet 7:** Exported the handlers for use in other parts of the application.

In Part 2, you applied the same method to implement `todoHandlers.js` for managing todos