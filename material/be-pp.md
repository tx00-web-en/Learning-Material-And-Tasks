# Backend Pair Programming

---
## Overview

In this activity, you will **refactor the API developed last week to use a database**. 

<!-- Please use the provided starter code, as it contains tests for the endpoints. -->

During the activity, you will **switch roles**: the driver (who writes the code) becomes the navigator (who reviews and guides), and vice versa. After each major step, make sure to **commit your changes and switch roles** to ensure both participants contribute to the coding and reviewing process.

---
## Iteration 1

1. **Decide Initial Roles**:
   - Determine who will start as the driver and who will be the navigator. Remember to switch roles after each major step.

2. **Clone the Sample Solution**:
   Instead of starting from scratch, we will start from the API from last week. You can either use the code that you wrote or this code. If using the sample solution:

   - Clone the tours API repository:
     ```bash
     git clone https://github.com/tx00-resources-en/week4-be-pp-sample-sol week5-be-pp
     cd week5-be-pp
     rm -rf .git
     ```
   - **Explanation**: Removing the `.git` directory ensures that you start with a fresh Git history for your new repository.

3. **Install Dependencies and Run the Server**:
   - Install the required dependencies and start the development server:
     ```bash
     npm install
     npm run dev
     ```

4. **Test the API**:
   - Use Postman to ensure the API is functioning correctly. Make sure all endpoints respond as expected.

5. **Initialize a New Git Repository and Push to GitHub**:
   - Follow the [instructions](./push-to-github.md) to make the directory a new Git repository and push your code to GitHub.
   - Collaborate with your pair by working on *separate branches* and merging them at the end. Be sure to practice creating pull requests. **If this process seems complex** *at the moment*, you **can skip it for now**, but make sure to watch the related recording for further understanding.
   - **Quick Steps**:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin <your-repo-url>
     git push -u origin main
     ```
---

## Iteration 2: Refactoring the Tours Endpoints

1. **Database connection:**
   - Import and call `connectDB()` in your `app.js`:

      ```js
        const connectDB = require("./config/db"); 
        //...
        connectDB();
        //...
      ```

2. **Refactor the Tours API**:
   - Update the tours API to use MongoDB by modifying the `models/tourModel.js` file. Replace the existing code with the following schema:
   ```js
   const mongoose = require("mongoose");

   const Schema = mongoose.Schema;

   const tourSchema = new Schema(
     {
       name: {
         type: String,
         required: true,
       },
       info: {
         type: String,
         required: true,
       },
       image: {
         type: String,
         required: true,
       },
       price: {
         type: String,
         required: true,
       },
     },
     { timestamps: true }
   );

   module.exports = mongoose.model("Tour", tourSchema);
   ```

3. **Update the Tour Controllers**:
   - Use Mongoose methods such as `find()` in the tour controller to interact with the MongoDB database. Refer to the [cars API example](https://github.com/tx00-resources-en/be-starter-v2) for guidance.

5. **Ensure Functionality**:
   - After refactoring, verify that the API functions correctly by testing all endpoints using Postman. Ensure each endpoint returns the expected response.

<!-- 5. **Run Tests**:
   - Open a new terminal and execute the command `npm test tours.test.js` to run the tests. If any tests fail, review your code to ensure it aligns with the provided endpoint descriptions. -->

6. **Commit Changes**:
   - Commit your changes with a meaningful message (e.g., "Refactor tours API to use MongoDB").

7. Here's the description of the endpoints:

- **Base URL**: `/api/tours`
- **Server**: Hosted on `localhost:4000` (e.g., `http://localhost:4000/api/tours`)


#### Endpoints

1. **GET /api/tours**
- **Description**: Retrieves a list of all tours, sorted by their creation date in descending order (latest first).
- **Response**:
  - **200 OK**: Returns a JSON array of tour objects, each containing `name`, `info`, `image`, `price`, followed by `_id`, `createdAt`, `updatedAt`.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs while retrieving the tours.
- **Example Response**:
  ```json
  [
    {
      "name": "London in 7 Days Tour",
      "info": "Explore the best of London in 7 days with our expert guides.",
      "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
      "price": "2,195",
      "_id": "614c1b6f62b9e53b8c4b28c5",
      "createdAt": "2025-11-10T08:55:23.123Z",
      "updatedAt": "2025-11-10T09:55:23.123Z",
      "__v": 0
    },
    {
      "name": "Paris Weekend Getaway",
      "info": "A quick weekend tour of Paris with visits to the Eiffel Tower and the Louvre.",
      "image": "https://www.course-api.com/images/tours/tour-2.jpeg",
      "price": "1,295",
      "_id": "614c1b6f62b9e53b8c4b28c6",
      "createdAt": "2025-11-09T10:15:40.456Z",
      "updatedAt": "2025-11-09T11:15:40.456Z",
      "__v": 0
    }
  ]
  ```

2. **POST /api/tours**
- **Description**: Creates a new tour using the details provided in the request body.
- **Request Body**: A JSON object containing the tour details (`name`, `info`, `image`, `price`).
- **Response**:
  - **201 Created**: Returns the newly created tour object, followed by `_id`, `createdAt`, `updatedAt`, and `__v`.
  - **400 Bad Request**: Returns a JSON error message if tour creation fails (e.g., validation errors).
- **Example Request**:
  ```http
  POST http://localhost:4000/api/tours
  ```

  ```json
  POST http://localhost:4000/api/tours  
  {
    "name": "Rome in 5 Days Tour",
    "info": "Discover the ancient history and vibrant culture of Rome in this 5-day tour.",
    "image": "https://www.course-api.com/images/tours/tour-3.jpeg",
    "price": "1,995"
  }
  ```
- **Example Response**:
  ```json
  {
    "name": "Rome in 5 Days Tour",
    "info": "Discover the ancient history and vibrant culture of Rome in this 5-day tour.",
    "image": "https://www.course-api.com/images/tours/tour-3.jpeg",
    "price": "1,995",
    "_id": "614c1b6f62b9e53b8c4b28c7",
    "createdAt": "2025-11-11T12:25:33.789Z",
    "updatedAt": "2025-11-11T12:25:33.789Z",
    "__v": 0
  }
  ```

3. **GET /api/tours/:tourId**
- **Description**: Retrieves a single tour by its unique ID.
- **URL Parameters**: 
  - `:tourId` - The unique identifier of the tour to retrieve.
- **Response**:
  - **200 OK**: Returns the tour object with fields `name`, `info`, `image`, `price`, followed by `_id`, `createdAt`, `updatedAt`, and `__v`.
  - **400 Bad Request**: Returns a JSON error message if the provided `tourId` is invalid.
  - **404 Not Found**: Returns a JSON error message if no tour with the specified ID is found.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs during retrieval.
- **Example Request**: `GET http://localhost:4000/api/tours/614c1b6f62b9e53b8c4b28c5`
- **Example Response**:
  ```json
  {
    "name": "London in 7 Days Tour",
    "info": "Explore the best of London in 7 days with our expert guides.",
    "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
    "price": "2,195",
    "_id": "614c1b6f62b9e53b8c4b28c5",
    "createdAt": "2025-11-10T08:55:23.123Z",
    "updatedAt": "2025-11-10T09:55:23.123Z",
    "__v": 0
  }
  ```

4. **PUT /api/tours/:tourId**
- **Description**: Updates an existing tour with the specified ID using the new data provided in the request body. This endpoint replaces the existing data with the new data.
- **URL Parameters**: 
  - `:tourId` - The unique identifier of the tour to update.
- **Request Body**: A JSON object containing the updated tour details (`name`, `info`, `image`, `price`).
- **Response**:
  - **200 OK**: Returns the updated tour object, followed by `_id`, `createdAt`, `updatedAt`, and `__v`.
  - **400 Bad Request**: Returns a JSON error message if the provided `tourId` is invalid.
  - **404 Not Found**: Returns a JSON error message if no tour with the specified ID is found.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs during the update.
- **Example Request**:
  ```http
  PUT http://localhost:4000/api/tours/614c1b6f62b9e53b8c4b28c5
  ```
  
  ```json
  {
    "name": "London in 8 Days Tour",
    "info": "Explore the best of London in 8 days with our expert guides.",
    "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
    "price": "2,295"
  }
  ```
- **Example Response**:
  ```json
  {
    "name": "London in 8 Days Tour",
    "info": "Explore the best of London in 8 days with our expert guides.",
    "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
    "price": "2,295",
    "_id": "614c1b6f62b9e53b8c4b28c5",
    "createdAt": "2025-11-10T08:55:23.123Z",
    "updatedAt": "2025-11-11T10:00:00.000Z",
    "__v": 0
  }
  ```

5. **DELETE /api/tours/:tourId**
- **Description**: Deletes the tour with the specified ID.
- **URL Parameters**: 
  - `:tourId` - The unique identifier of the tour to delete.
- **Response**:
  - **204 No Content**: Successfully deletes the tour. No content is returned in the response.
  - **400 Bad Request**: Returns a JSON error message if the provided `tourId` is invalid.
  - **404 Not Found**: Returns a JSON error message if no tour with the specified ID is found.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs during deletion.


----
## Iteration 3: Refactoring the Users Endpoints

1. **Refactor the Users API**:
   - Update the users API to use MongoDB by modifying the `models/userModel.js` file. Replace the existing code with the following schema:
   ```js
    const mongoose = require("mongoose");

    const Schema = mongoose.Schema;

    const userSchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: true,
        unique: true,
        },
        password: {
        type: String,
        required: true,
        },
        phone_number: {
        type: String,
        required: true,
        },
        gender: {
        type: String,
        required: true,
        },
        date_of_birth: {
        type: Date,
        required: true,
        },
        membership_status: {
        type: String,
        required: true,
        },
    },
    { timestamps: true  }
    );

    module.exports = mongoose.model("User", userSchema);
   ```

2. **Update the User Controllers**:
   - Use Mongoose methods such as `find()` in the user controller to interact with the MongoDB database. Refer to the [cars API example](https://github.com/tx00-resources-en/be-starter-v2) for guidance.

3. **Ensure Functionality**:
   - After refactoring, verify that the API functions correctly by testing all endpoints using Postman. Ensure each endpoint returns the expected response.

<!-- 4. **Run Tests**:
   - Open a new terminal and execute the command `npm test users.test.js` to run the tests. If any tests fail, review your code to ensure it aligns with the provided endpoint descriptions (below). -->

4. **Commit Changes**:
   - Commit your changes with a meaningful message (e.g., "Refactor user API to use MongoDB").

5. Here's the description of the endpoints:

- **Base URL**: `/api/users`
- **Server**: Hosted on `localhost:4000` (e.g., `http://localhost:4000/api/users`)

**Endpoints**

1. **GET /api/users**
- **Description**: Retrieves a list of all users, sorted by their creation date in descending order (latest first).
- **Response**:
  - **200 OK**: Returns a JSON array of user objects, each containing `name`, `email`, `phone_number`, `gender`, `date_of_birth`, `membership_status`, `_id`, `createdAt`, and `updatedAt`. *In a real API, we do not return the password field for security reasons. We will discuss the best practices for handling sensitive data in our next backend session.*
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs while retrieving the users.
- **Example Response**:
  ```json
  [
    {
      "name": "Matti Seppänen",
      "email": "matti@example.com",
      "password": "Matti@1234",
      "phone_number": "+358401234567",
      "gender": "Male",
      "date_of_birth": "2000-01-15",
      "membership_status": "Active",
      "_id": "614c1b6f62b9e53b8c4b28c5",	  
      "createdAt": "2025-11-10T08:55:23.123Z",
      "updatedAt": "2025-11-10T09:55:23.123Z",
      "__v": 0,	  
    },
    {
      "name": "Sara Virtanen",
      "email": "sara@example.com",
      "password": "Sara@1234",      
      "phone_number": "+358401234568",
      "gender": "Female",
      "date_of_birth": "1995-07-20",
      "membership_status": "Inactive",
      "_id": "614c1b6f62b9e53b8c4b28c6",	  
      "createdAt": "2025-11-09T10:15:40.456Z",
      "updatedAt": "2025-11-09T11:15:40.456Z",
      "__v": 0,	  
    }
  ]
  ```

2. **POST /api/users**
- **Description**: Creates a new user using the details provided in the request body.
- **Request Body**: A JSON object containing the user details (`name`, `email`, `password`, `phone_number`, `gender`, `date_of_birth`, `membership_status`).
- **Response**:
  - **201 Created**: Returns the newly created user object, including `_id`, `createdAt`, and `updatedAt`. 
  - **400 Bad Request**: Returns a JSON error message if user creation fails (e.g., validation errors).
- **Example Request**:
  ```http
  POST http://localhost:4000/api/users
  ```
  
  ```json  
  {
    "name": "Anna Korhonen",
    "email": "anna@example.com",
    "password": "Anna@1234",
    "phone_number": "+358401234569",
    "gender": "Female",
    "date_of_birth": "1992-11-05",
    "membership_status": "Active"
  }
  ```
- **Example Response**:
  ```json
  {
    "name": "Anna Korhonen",
    "email": "anna@example.com",
    "password": "Anna@1234",    
    "phone_number": "+358401234569",
    "gender": "Female",
    "date_of_birth": "1992-11-05",
    "membership_status": "Active",
    "_id": "614c1b6f62b9e53b8c4b28c7",	
    "createdAt": "2025-11-11T12:25:33.789Z",
    "updatedAt": "2025-11-11T12:25:33.789Z",
	"__v": 0
  }
  ```

3. **GET /api/users/:userId**
- **Description**: Retrieves a single user by their unique ID.
- **URL Parameters**: 
  - `:userId` - The unique identifier of the user to retrieve.
- **Response**:
  - **200 OK**: Returns the user object with fields `name`, `email`, `phone_number`, `gender`, `date_of_birth`, `membership_status`, `_id`, `createdAt` and `updatedAt`. 
  - **400 Bad Request**: Returns a JSON error message if the provided `userId` is invalid.
  - **404 Not Found**: Returns a JSON error message if no user with the specified ID is found.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs during retrieval.
- **Example Request**: `GET http://localhost:4000/api/users/614c1b6f62b9e53b8c4b28c5`
- **Example Response**:
  ```json
  {
    "name": "Matti Seppänen",
    "email": "matti@example.com",
    "password": "Matti@1234",    
    "phone_number": "+358401234567",
    "gender": "Male",
    "date_of_birth": "2000-01-15",
    "membership_status": "Active",
    "_id": "614c1b6f62b9e53b8c4b28c5",	
    "createdAt": "2025-11-10T08:55:23.123Z",
    "updatedAt": "2025-11-10T09:55:23.123Z",
    "__v": 0	
  }
  ```

4. **PUT /api/users/:userId**
- **Description**: Updates an existing user with the specified ID using the new data provided in the request body. This endpoint replaces the existing data with the new data.
- **URL Parameters**: 
  - `:userId` - The unique identifier of the user to update.
- **Request Body**: A JSON object containing the updated user details (`name`, `email`, `password`, `phone_number`, `gender`, `date_of_birth`, `membership_status`).
- **Response**:
  - **200 OK**: Returns the updated user object, including `_id`, `createdAt`, and `updatedAt`. 
  - **400 Bad Request**: Returns a JSON error message if the provided `userId` is invalid.
  - **404 Not Found**: Returns a JSON error message if no user with the specified ID is found.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs during the update.
- **Example Request**:
  ```http
  PUT http://localhost:4000/api/users/614c1b6f62b9e53b8c4b28c5
  ```
  
  ```json 
  {
    "name": "Matti Seppänen",
    "email": "matti.seppanen@example.com",
    "password": "Matti2@1234",     
    "phone_number": "+358401234567",
    "gender": "Male",
    "date_of_birth": "2000-01-15",
    "membership_status": "Inactive"
  }
  ```
- **Example Response**:
  ```json
  {
    "name": "Matti Seppänen",
    "email": "matti.seppanen@example.com",
    "password": "Matti2@1234",     
    "phone_number": "+358401234567",
    "gender": "Male",
    "date_of_birth": "2000-01-15",
    "membership_status": "Inactive",
    "_id": "614c1b6f62b9e53b8c4b28c5",	
    "createdAt": "2025-11-10T08:55:23.123Z",
    "updatedAt": "2025-11-11T10:00:00.000Z",
    "__v": 0	
  }
  ```

5. **DELETE /api/users/:userId**
- **Description**: Deletes the user with the specified ID.
- **URL Parameters**: 
  - `:userId` - The unique identifier of the user to delete.
- **Response**:
  - **204 No Content**: Successfully deletes the user, with no content returned in the response.
  - **400 Bad Request**: Returns a JSON error message if the provided `userId` is invalid.


---
## Iteration 4: Using Environment Variables with `.env`

In this iteration, we'll set up environment variables in your Express.js application using a `.env` file. This practice helps manage configuration data that may differ between environments (e.g., development, testing, production).

1. **Prepare the `.env` File**

   - Rename the `.env.example` file to `.env`.
   - Open the `.env` file and review its contents. You will find settings for the port and database URI:
     ```env
     PORT=4000
     MONGO_URI=mongodb://localhost:27017/web-dev
     ```

2. **Exclude `.env` from Version Control**

   - Ensure the `.env` file is excluded from version control in the same way as the `node_modules` directory. This is handled by the `.gitignore` file:
     ```sh
     node_modules/
     .env
     ```

   - Make sure to **remember this practice for all future projects** to keep sensitive configuration data secure.

3. **Install and Configure `dotenv`**

   - Install the `dotenv` package to load environment variables from the `.env` file:
     ```sh
     npm install dotenv
     ```

   - Open `app.js` and add the following line at the top of the file to configure `dotenv`:
     ```js
     require('dotenv').config();
     const port = process.env.PORT || 4000;
     ```

4. **Update Database Configuration**

   - In `config/db.js`, replace the hardcoded database URI with the one from the `.env` file:
     ```js
     mongoose.connect(process.env.MONGO_URI);
     ```

5. **Restart the Server and Run Tests**

   - Restart your server to apply the changes.
   - Run your tests to ensure that everything works as expected with the new configuration.

----
## Iteration 5: Implementing Error-Handling Middleware

In this iteration, we will focus on implementing and testing error-handling middleware.

The file `middleware/customMiddleware.js` exports the `errorHandler` middleware. This middleware logs the error message and responds with a generic error message.

```javascript
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  response.status(500).json({
    message: "Something went wrong!",
  });
};

module.exports = { unknownEndpoint, errorHandler };
```

1. Import Middleware in `app.js`

Update your `app.js` file to import both `unknownEndpoint` and `errorHandler` from `customMiddleware.js`. Replace the existing import statement with the following:

```javascript
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
```

3. Use Middleware in `app.js`

Add the middleware to your Express app before `app.listen`. This ensures that the middleware is applied after all routes and other middleware. Update `app.js` as follows:

```javascript
// Use the unknownEndpoint middleware for handling undefined routes
app.use(unknownEndpoint);

// Use the errorHandler middleware for handling errors
app.use(errorHandler);
```

4. Test the Error-Handling Middleware

To see the error-handling middleware in action, add a route that triggers an error. Add the following code to `app.js`:

```javascript
// Example route that throws an error
app.get('/error', (req, res, next) => {
  // Trigger an error
  const error = new Error("Network problem");
  next(error);
});
```

Make a GET request to `http://localhost:4000/error` using your browser, Postman, or cURL. You should receive a response with the message `Something went wrong!"`.

**Important Notes**

1. **Middleware Definition**:
   - The `errorHandler` middleware uses four parameters: `(error, request, response, next)`. This allows it to handle errors passed through `next()`.

2. **Passing Errors**:
   - To invoke the error-handling middleware, you use `next(error)` in your route or middleware, passing the error object to the `errorHandler`.

---
## Iteration 6

In this iteration, we will switch from using a local MongoDB server to a cloud-based MongoDB service. 

<!-- 
This iteration consists of two parts.

### Part A: Update to Cloud-Based URI

1. **Update Environment Configuration**:
   - Open the `.env` file and change the `MONGO_URI` value from `mongodb://localhost:27017/web-dev` to the URI from Atlas:
     ```
     MONGO_URI=<provided-URI>
     ```

2. **Run Tests**:
   - Execute `npm test`. If your tests passed in Iterations 2 and 3, they should pass here as well.

### Part B: Set Up MongoDB Atlas 
-->

1. **Create an Atlas Account**:
   - Register for an account with MongoDB Atlas and follow the setup instructions provided [here](./atlas.md).

2. **Wait for Cluster Readiness**:
   - Note that it may take up to 30 minutes for the Atlas URI to become operational. You can complete this part outside of class if needed.

3. **Update Environment Configuration**:
   - Once your Atlas cluster is ready, open the `.env` file and update the `MONGO_URI` to the URI you received from Atlas:
     ```
     MONGO_URI=<atlas-URI>
     ```

<!-- 4. **Run Tests**:
   - Execute `npm test` again. If your tests were successful in Iterations 2 and 3, they should continue to pass. -->

This iteration helps you transition from a local MongoDB setup to a cloud-based MongoDB Atlas setup, ensuring your application works seamlessly with both environments.

----
## Iteration 7: PATCH vs PUT

- **PUT Request**: Used to update an entire resource on the server. A PUT request replaces the entire resource with the new data you provide. When using PUT, you should send the complete updated resource.

- **PATCH Request**: Used for partial updates of a resource. With PATCH, you only need to send the fields you want to update, leaving the rest of the resource unchanged.

### Issue with Friday's Code

Last Friday, we encountered an issue where the existing data was not being fully replaced even when using `{ overwrite: true }`. This is because the `overwrite` option is deprecated and does not work as intended. As a result, the current implementation was behaving like a PATCH request rather than a PUT request.

### Solution: Using `findOneAndReplace`

To properly implement a PUT request, you can use `findOneAndReplace` instead of `findOneAndUpdate`. The `findOneAndReplace` method will replace the entire document with the new data provided.

1. **Temporarily Comment Out the Old Code**:
   - Comment out or disable the existing `findOneAndUpdate` code.

2. **Add the New Code**:
   - Replace it with the following code snippet that uses `findOneAndReplace`:

   ```javascript
   const updateUser = async (req, res) => {
     const { userId } = req.params;

     if (!mongoose.Types.ObjectId.isValid(userId)) {
       return res.status(400).json({ message: "Invalid User ID" });
     }

     try {
       const updatedUser = await User.findOneAndReplace(
         { _id: userId },
         { ...req.body },
         { new: true }
       );
       if (updatedUser) {
         res.status(200).json(updatedUser);
       } else {
         res.status(404).json({ message: "User not found" });
       }
     } catch (error) {
       res.status(500).json({ message: "Failed to update user" });
     }
   };
   ```

3. **Test the New Implementation**:
   - Test the new `findOneAndReplace` implementation by updating only one field of the user document. Observe how the entire document is replaced, and ensure it behaves as expected.

4. **Revert to Old Code**:
   - After experimenting with `findOneAndReplace`, you can go back to the old `findOneAndUpdate` code.


**Happy coding!** :rocket: :heart: