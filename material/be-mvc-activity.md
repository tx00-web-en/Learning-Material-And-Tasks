# Activity: MVC 

In this lab, you will learn the importance of using the MVC (Model-View-Controller) architecture and Router when designing an API server.

- [Part 1: Lab Instructions](#part-1-lab-instructions)
- [Part 2: Push to GitHub](#part-2-push-to-github)
- [Refresher: Testing the API in Postman](#refresher-using-postman)

> Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub.  

---
## Part 1: Lab Instructions

#### Step 1: Set Up the Project

- **Clone the Starter Repository:**
  - Clone the starter repository for the lab using the following command:
    ```bash
    git clone https://github.com/tx00-resources-en/starter-api-cars-mvc api-cars-mvc
    ```
  - Remove the existing Git history to create a fresh project:
    ```bash
    rm -rf api-cars-mvc/.git
    ```
  - Navigate into the project directory and install the necessary dependencies:
    ```bash
    cd api-cars-mvc
    npm install
    npm run dev
    ```

#### Step 2: Test the Car API

- **Explore the Car API:**
  - The car API is already implemented and fully functional. Use Postman to test all available routes. [Instructions for testing are provided at the end of this document](#refresher-using-postman).
  - For example, to add a new car, you can use this data model:
    ```json
    {
      "model": "Toyota Camry",
      "color": "Blue",
      "age": 3
    }
    ```

#### Step 3: Test the User API

- **Initial Testing of User API:**
  - In `routes/userRouter.js`, only the `GET /users` route has been implemented. Test this route using Postman to ensure it returns the expected response, "Hello from getAll." 

#### Step 4: Implement the Remaining User Routes

- **Complete the User API:**
  - Refer to the `routes/carRouter.js` file to guide your implementation of the remaining routes in `userRouter.js`.
  - Make sure to write the logic for creating, updating, and deleting users.
  - Use Postman to test each route you implement.[ Instructions for testing are provided at the end of this document](#users-api). 

#### Step 5: Rewrite the User Controllers

- Rewrite the controllers in `controllers/userControllers.js` to handle user data, following the structure used in `controllers/carControllers.js`.
- Ensure you use appropriate JavaScript features like the spread syntax, for example, `Car.addOne({ ...req.body });`, to properly handle incoming data.

#### Step 6: Test All User Routes

- **Final Testing:**
  - After implementing the controllers, test all user-related routes with Postman.
  - To add a new user, use the following data model:
    ```json
    {
      "name": "Matti Seppänen",
      "password": "M@45mtg$",
      "username": "mattis",
      "address": "Mannerheimintie 14, 00100 Helsinki",
      "age": 23
    }
    ```

---
## Part 2: Push to GitHub

- Once all functions are implemented and tested, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub.  

---
## Refresher: Using Postman

#### Cars API

1. **Create a New Collection in Postman:**
   - Open Postman.
   - Click on **Collections** in the left sidebar, then click **New Collection**.
   - Name your collection "Cars API" and save it.

2. **Add a Request to the Collection:**
   - Inside your "Cars API" collection, click **Add Request**.
   - Name your request according to the endpoint you want to test (e.g., "Get All Cars").

3. **Testing Endpoints:**

   - **GET /cars**
     - Method: **GET**
     - URL: `http://localhost:4000/cars`
     - Click **Send** to retrieve a list of all cars.
     - Save the request in the collection as "Get All cars".

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
     - Save the request in the collection as "Create a car".

   - **GET /cars/:id**
     - Method: **GET**
     - URL: `http://localhost:4000/cars/{id}`. Replace `{id}` with the actual ID of the car you want to retrieve. **Note:** The curly braces `{}` are not part of the URL.
     - Click **Send** to retrieve the specific car.
     - Save the request in the collection as "Get car by ID".

   - **PUT /car/:id**
     - Method: **PUT**
     - URL: `http://localhost:4000/cars/{id}`. Replace `{id}` with the actual ID of the car you want to retrieve. **Note:** The curly braces `{}` are not part of the URL.
     - Go to the **Body** tab, select **raw**, and choose **JSON**.
     - Enter the updated data model in the body (e.g., changing the task or completion status):
       ```json
            {
              "age": 4
            }
       ```
     - Click **Send** to update the car's information.
     - Save the request in the collection as "Update car by ID".

   - **DELETE /cars/:id**
     - Method: **DELETE**
     - URL: `http://localhost:4000/cars/{id}`. Replace `{id}` with the actual ID of the car you want to retrieve. **Note:** The curly braces `{}` are not part of the URL.
     - Click **Send** to delete the specific car.
     - Save the request in the collection as "Delete car by ID".

4. **Save and Organize Your Requests:**
   - Ensure all requests are saved under the "cars API" collection for easy access.

5. **Run the Collection:**
   - You can run the entire collection by clicking the **Run** button in the top right corner of the collection window in Postman.
   - This will execute all the saved requests sequentially.

#### Users API

1. **Create a New Collection in Postman:**
   - Open Postman.
   - Click on **Collections** in the left sidebar, then click **New Collection**.
   - Name your collection "User API" and save it.

2. **Add a Request to the Collection:**
   - Inside your "User API" collection, click **Add Request**.
   - Name your request according to the endpoint you want to test (e.g., "Get All Users").

3. **Testing Endpoints:**

   - **GET /users**
     - Method: **GET**
     - URL: `http://localhost:4000/users`
     - Click **Send** to retrieve a list of all users.
     - Save the request in the collection as "Get All Users".

   - **POST /users**
     - Method: **POST**
     - URL: `http://localhost:4000/users`
     - Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
     - Enter the following data model in the body:
       ```json
       {
         "name": "Matti Seppänen",
         "password": "M@45mtg$",
         "username": "mattis",
         "address": "Mannerheimintie 14, 00100 Helsinki",
         "age": 23
       }
       ```
     - Click **Send** to create a new user entry.
     - Save the request in the collection as "Create a User".

   - **GET /users/:id**
     - Method: **GET**
     - URL: `http://localhost:4000/users/{id}`. Replace `{id}` with the actual ID of the user you want to retrieve. **Note:** The curly braces `{}` are not part of the URL.
     - Click **Send** to retrieve the specific user.
     - Save the request in the collection as "Get User by ID".

   - **PUT /users/:id**
     - Method: **PUT**
     - URL: `http://localhost:4000/users/{id}`. Replace `{id}` with the actual ID of the user you want to retrieve. **Note:** The curly braces `{}` are not part of the URL.
     - Go to the **Body** tab, select **raw**, and choose **JSON**.
     - Enter the updated data model in the body (e.g., changing the address or age):
       ```json
       {
         "name": "Matti Seppänen",
         "password": "M@45mtg$",
         "username": "mattis",
         "address": "New Address, 00100 Helsinki",
         "age": 24
       }
       ```
     - Click **Send** to update the user's information.
     - Save the request in the collection as "Update User by ID".

   - **DELETE /users/:id**
     - Method: **DELETE**
     - URL: `http://localhost:4000/users/{id}`. Replace `{id}` with the actual ID of the user you want to delete. **Note:** The curly braces `{}` are not part of the URL.
     - Click **Send** to delete the specific user.
     - Save the request in the collection as "Delete User by ID".

4. **Save and Organize Your Requests:**
   - Ensure all requests are saved under the "User API" collection for easy access.

5. **Run the Collection:**
   - You can run the entire collection by clicking the **Run** button in the top right corner of the collection window in Postman.
   - This will execute all the saved requests sequentially.


---

## Conclusion

By completing this lab, you  should have understood the importance of separating concerns using the MVC architecture and routing practices, which are essential for creating scalable and maintainable API servers.


<!-- # Activity: MVC

Refactor the `car API` to follow MVC

#### Create folders

1. Create the `controllers` folder, move the `carHandlers.js` there and rename the file to `carControllers.js` file
2. Create the `models` folder, move the `carLib.js` there and rename the file to `carModel.js` file
3. Create the `routes` folder and inside create `carRoutes.js` file


**Folder structure:**
```
project-root/
│
├── controllers/
│   └── carControllers.js
│
├── models/
│   └── carModel.js
│
├── routes/
│   └── carRoutes.js
│
├── app.js
└── package.json
```

This structure keeps your project organized by separating concerns into different folders: controllers, models, and routes.

### 2. Update the path in the `carControllers.js` file

Open `carControllers.js` file, and change this line 
`const Car = require("./carLib");` to the following:

```sh
const Car = require("./carModel");
```

### 3. Move the routes to `carRoutes.js`

**`routes/carRoutes.js`:**
```javascript
const express = require("express");
const router = express.Router();

const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carControllers");

// GET /cars
router.get("/", getAllCars);

// POST /cars
router.post("/", createCar);

// GET /cars/:carId
router.get("/:carId", getCarById);

// PUT /cars/:carId
router.put("/:carId", updateCar);

// DELETE /cars/:carId
router.delete("/:carId", deleteCar);

module.exports = router;
```

### 4. Update `app.js` to use the new routes

**`app.js`:**
```javascript
const express = require("express");
const app = express();
const carRoutes = require("./routes/carRoutes");

// Middleware to parse JSON
app.use(express.json());

// Use the car routes
app.use("/api/cars/v1",carRoutes);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

This refactoring helps to keep your code organized and maintainable by separating the route definitions from the main application file. 
-->