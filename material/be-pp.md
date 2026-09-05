# Pair Programming: Back end

There are two parts to this lab. Part 2 is intended **primarily for the group members responsible for implementing the AI** features in their group project.** For all other students, it is recommended but not mandatory.

----

## Part 1: MVC with Database


### Overview

In this activity, you will **refactor the API developed last week to use a database**. 

During the activity, you will **switch roles**: the driver (who writes the code) becomes the navigator (who reviews and guides), and vice versa. After each major step, make sure to **commit your changes and switch roles** to ensure both participants contribute to the coding and reviewing process.


**Commit messages: Recommended format**

- *feat* Short for feature. Used when you add a new feature or new functionality to the codebase.
- *refactor* used when you change existing code without altering behavior. This improves structure, readability, or organization.
- *chore* used for maintenance tasks that don’t change application behavior. Examples: updating dependencies, adding logging, renaming files, config changes.

### Iteration 0

1. **Decide Initial Roles**:
   - Determine who will start as the driver and who will be the navigator. Remember to switch roles after each major step.

2. **Clone the Sample Solution**:
   Use the following commands to get started:
   - Clone the tours API repository:
     ```bash
     git clone https://github.com/tx00-resources-en/w5-bepp-starter week5-be-pp
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
     git commit -m "chore: initialize project structure and repository"
     git remote add origin <your-repo-url>
     git push -u origin main
     ```

**Prerequisites Before Moving Forward**

Before proceeding to Iteration 1, **ensure MongoDB is installed and running** on your local machine:

- Open MongoDB Compass and connect to `mongodb://localhost:27017`
- If the connection succeeds, MongoDB is running correctly
- If the connection fails, start MongoDB using:
  - **Windows**: Start MongoDB service from the Services app
  - **macOS/Linux**: Run `sudo systemctl start mongod` or `brew services start mongodb-community`

### Iteration 1: Using Environment Variables with `.env`

In this iteration, we'll set up environment variables in your Express.js application using a `.env` file. This practice helps manage configuration data that may differ between environments (e.g., development, testing, production).

1. **Prepare the `.env` File**
   - Copy the example environment file  `.env.example` to `.env`
   - Open the `.env` file and review its contents. You will find settings for the port and database URI:
     ```env
     GEMINI_API_KEY=Jh6AIvfYH87KKL34KllmsHg
     DEBUG_GEMINI=false
     PORT=4000
     MONGO_URI=mongodb://localhost:27017/w5-bepp
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

5. **Restart the Server and Verify**

   - Restart your server to apply the changes.
   - Test your API to ensure that everything works as expected with the new configuration.
   - Commit your changes:
     ```bash
     git commit -m "chore: configure dotenv for environment management"
     ```

---

### Iteration 2: Configure AI Integration

1. **Add AI API Key to Environment Variables**
   - Stop the server (otherwise the modifications to `.env` will not take effect)
   - Open the `.env` file
   - Add your Google AI API key by replacing the placeholder:
     ```env
     GOOGLE_AI_API_KEY=your-actual-api-key-here
     ```

2. **Test the AI Endpoint with Postman**

   - **POST** request to `/ai/tour-suggestions`
   - **Body (raw JSON)**:

```json
{
  "destination": "Tokyo",
  "duration": "5 days",
  "budget": "1500",
  "season": "Spring",
  "preferences": "food, culture, technology",
  "travelStyle": "guided tour"
}
```

   - **Expected Response**: Markdown-formatted tour suggestions based on the input parameters.

3. **Commit Your Changes**
   ```bash
   git commit -m "chore: configure environment variables for AI integration"
   ```

---

### Iteration 3: Refactor Tours API to Use MongoDB

1. **Database connection:**
   - Import and call `connectDB()` in your `app.js`:

      ```js
        const connectDB = require("./config/db"); 
        //...
        connectDB();
        //...
      ```

   - **Verify the connection**: After adding `connectDB()`, restart your server and observe the console output. You should see a success message (e.g., `"MongoDB connected successfully"`). If you see an error, verify:
     - MongoDB is running locally
     - The `MONGO_URI` in your `.env` file is correct

2. **Refactor the Tours API**:
   - Update the tours API to use MongoDB by modifying the `models/tourModel.js` file. Replace the existing code with the following schema:
   ```js
    const mongoose = require('mongoose');

    const tourSchema = new mongoose.Schema({
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
        type: String, // kept as string since data uses "1,450"
        required: true,
    },
    duration: {
        type: String, // e.g. "5 days"
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    season: {
        type: String,
        required: true,
    },
    specialOffer: {
        type: String,
        required: true,
    },
    }, {
    timestamps: true
    });

    const Tour = mongoose.model('Tour', tourSchema);
    module.exports = Tour;
   ```

3. **Update the Tour Controllers**:
   - Modify `controllers/tourController.js` to use Mongoose methods such as `find()`, `findById()`, `create()`, `findByIdAndUpdate()`, and `findByIdAndDelete()`.
   - Refer to the [cars API example](https://github.com/tx00-resources-en/be-starter-v2) for guidance.

4. **Test Functionality**:
   - After refactoring, test all endpoints using Postman to ensure they work correctly with MongoDB.
   - Verify each endpoint returns the expected response.

5. **Commit Your Changes**:
   ```bash
   git commit -m "refactor: migrate tours API to MongoDB"
   ```

---

**Tours API Endpoints Reference**

Here's the description of the endpoints:

- **Base URL**: `/api/tours`
- **Server**: Hosted on `localhost:4000` (e.g., `http://localhost:4000/api/tours`)


1. **GET /api/tours**
- **Description**: Retrieves a list of all tours, sorted by their creation date in descending order (latest first).
- **Response**:
  - **200 OK**: Returns a JSON array of tour objects, each containing `name`, `info`, `image`, `price`, followed by `_id`, `createdAt`, `updatedAt`.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs while retrieving the tours.
- **Example Response**:
  ```json
    [
    {
        "_id": "6735a2f9c1d4a9b123456789",
        "name": "Adventures in Tokyo - 5 Day Tour",
        "info": "Discover the vibrant mix of tradition and modernity in Tokyo. Visit ancient temples like Senso-ji, explore futuristic districts such as Shibuya and Akihabara, and enjoy authentic Japanese cuisine from sushi to ramen. Guided tours will take you through bustling markets, serene gardens, and hidden alleyways filled with local charm.",
        "image": "https://tx00-web-en.github.io/resources/img/tours/tour-2.jpeg",
        "price": "1,450",
        "duration": "5 days",
        "rating": 4.8,
        "season": "Spring 2027",
        "specialOffer": "Early bird discount 10%",
        "createdAt": "2025-11-14T16:30:00.000Z",
        "updatedAt": "2025-11-14T16:30:00.000Z",
        "__v": 0
    },
    {
        "_id": "6735a2f9c1d4a9b987654321",
        "name": "Best of Paris in 7 Days Tour",
        "info": "On this tour, you'll enjoy guided neighborhood walks through the city's historic heart. Join us for the Best of Paris in 7 Days!",
        "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
        "price": "1,995",
        "duration": "7 days",
        "rating": 4.6,
        "season": "Summer 2028",
        "specialOffer": "Group discount available",
        "createdAt": "2025-11-14T16:30:00.000Z",
        "updatedAt": "2025-11-14T16:30:00.000Z",
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
    {
    "name": "Adventures in Tokyo - 5 Day Tour",
    "info": "Discover the vibrant mix of tradition and modernity in Tokyo. Visit ancient temples like Senso-ji, explore futuristic districts such as Shibuya and Akihabara, and enjoy authentic Japanese cuisine from sushi to ramen. Guided tours will take you through bustling markets, serene gardens, and hidden alleyways filled with local charm.",
    "image": "https://tx00-web-en.github.io/resources/img/tours/tour-2.jpeg",
    "price": "1,450",
    "duration": "5 days",
    "rating": 4.8,
    "season": "Spring 2027",
    "specialOffer": "Early bird discount 10%"
    }
  ```
- **Example Response**:
  ```json
    {
    "_id": "6735b3e2f9a1c9d123456789",
    "name": "Adventures in Tokyo - 5 Day Tour",
    "info": "Discover the vibrant mix of tradition and modernity in Tokyo. Visit ancient temples like Senso-ji, explore futuristic districts such as Shibuya and Akihabara, and enjoy authentic Japanese cuisine from sushi to ramen. Guided tours will take you through bustling markets, serene gardens, and hidden alleyways filled with local charm.",
    "image": "https://tx00-web-en.github.io/resources/img/tours/tour-2.jpeg",
    "price": "1,450",
    "duration": "5 days",
    "rating": 4.8,
    "season": "Spring 2027",
    "specialOffer": "Early bird discount 10%",
    "createdAt": "2025-11-14T16:40:00.000Z",
    "updatedAt": "2025-11-14T16:40:00.000Z",
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
- **Example Request**: `GET http://localhost:4000/api/tours/6735b3e2f9a1c9d123456789`
- **Example Response**:
  ```json
    {
    "_id": "6735b3e2f9a1c9d123456789",
    "name": "Adventures in Tokyo - 5 Day Tour",
    "info": "Discover the vibrant mix of tradition and modernity in Tokyo. Visit ancient temples like Senso-ji, explore futuristic districts such as Shibuya and Akihabara, and enjoy authentic Japanese cuisine from sushi to ramen. Guided tours will take you through bustling markets, serene gardens, and hidden alleyways filled with local charm.",
    "image": "https://tx00-web-en.github.io/resources/img/tours/tour-2.jpeg",
    "price": "1,450",
    "duration": "5 days",
    "rating": 4.8,
    "season": "Spring 2025",
    "specialOffer": "Early bird discount 10%",
    "createdAt": "2025-11-14T16:40:00.000Z",
    "updatedAt": "2025-11-14T16:40:00.000Z",
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
  PUT http://localhost:4000/api/tours/6735b3e2f9a1c9d123456789
  ```
  
  ```json
  {
    "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
    "price": "2,295"
  }
  ```
- **Example Response**:
  ```json
    {
    "_id": "6735b3e2f9a1c9d123456789",
    "name": "Adventures in Tokyo - 5 Day Tour",
    "info": "Discover the vibrant mix of tradition and modernity in Tokyo. Visit ancient temples like Senso-ji, explore futuristic districts such as Shibuya and Akihabara, and enjoy authentic Japanese cuisine from sushi to ramen. Guided tours will take you through bustling markets, serene gardens, and hidden alleyways filled with local charm.",
    "image": "https://tx00-web-en.github.io/resources/img/tours/tour-1.jpeg",
    "price": "2,295",
    "duration": "5 days",
    "rating": 4.8,
    "season": "Spring 2025",
    "specialOffer": "Early bird discount 10%",
    "createdAt": "2025-11-14T16:40:00.000Z",
    "updatedAt": "2025-11-14T16:40:00.000Z",
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

---

### Iteration 4: Refactor Users API to Use MongoDB

1. **Refactor the Users API**:
   - Update the users API to use MongoDB by modifying the `models/userModel.js` file. Replace the existing code with the following schema:
   ```js
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // ensures no duplicate emails
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
        enum: ['Male', 'Female', 'Other'], // restricts to known values
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    membership_status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active',
    },
    account_verified: {
        type: Boolean,
        default: false,
    },
    company: {
        type: String,
    },
    }, {
    timestamps: true // adds createdAt and updatedAt automatically
    });

    const User = mongoose.model('User', userSchema);
    module.exports = User;
   ```

2. **Update the User Controllers**:
   - Modify `controllers/userController.js` to use Mongoose methods (`find()`, `findById()`, `create()`, `findByIdAndUpdate()`, `findByIdAndDelete()`).
   - Refer to the [cars API example](https://github.com/tx00-resources-en/be-starter-v2) for guidance.

3. **Test Functionality**:
   - Test all user endpoints using Postman to ensure they work correctly with MongoDB.
   - Verify each endpoint returns the expected response.

4. **Commit Your Changes**:
   ```bash
   git commit -m "refactor: migrate users API to MongoDB"
   ```

---

**Users API Endpoints Reference**

Here's the description of the endpoints:

- **Base URL**: `/api/users`
- **Server**: Hosted on `localhost:4000` (e.g., `http://localhost:4000/api/users`)

1. **GET /api/users**
- **Description**: Retrieves a list of all users, sorted by their creation date in descending order (latest first).
- **Response**:
  - **200 OK**: Returns a JSON array of user objects, each containing `name`, `email`, `phone_number`, `gender`, `date_of_birth`, `membership_status`, `_id`, `createdAt`, and `updatedAt`.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs while retrieving the users.

> **Security Note**: Passwords are shown in these examples **for learning purposes only** to demonstrate full CRUD operations. In production applications:
> - Passwords should **never** be returned in API responses
> - Passwords must be stored as **hashed values** (not plain text)
> - Proper authentication and password handling will be covered in detail in our upcoming **authentication session**
- **Example Response**:
  ```json
    [
    {
        "_id": "6735c4e2f9a1c9d123456789",
        "name": "Matti Seppänen",
        "email": "matti@example.com",
        "password": "M@45mtg$", 
        "phone_number": "+358401234567",
        "gender": "Male",
        "date_of_birth": "2000-01-15T00:00:00.000Z",
        "membership_status": "Active",
        "account_verified": true,
        "company": "Nordic Travel Ltd",
        "createdAt": "2025-11-14T16:50:00.000Z",
        "updatedAt": "2025-11-14T16:50:00.000Z",
        "__v": 0
    },
    {
        "_id": "6735c4e2f9a1c9d987654321",
        "name": "Anna Virtanen",
        "email": "anna@example.com",
        "password": "A#nna2025!",
        "phone_number": "+358409876543",
        "gender": "Female",
        "date_of_birth": "1995-07-20T00:00:00.000Z",
        "membership_status": "Active",
        "account_verified": false,
        "company": "Scandi Tours Oy",
        "createdAt": "2025-11-14T16:50:00.000Z",
        "updatedAt": "2025-11-14T16:50:00.000Z",
        "__v": 0
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
    "name": "Matti Seppänen",
    "email": "matti@example.com",
    "password": "M@45mtg$",
    "phone_number": "+358401234567",
    "gender": "Male",
    "date_of_birth": "2000-01-15",
    "membership_status": "Active",
    "account_verified": true,
    "company": "Nordic Travel Ltd"
    }
  ```
- **Example Response**:
  ```json
    {
        "_id": "6735c4e2f9a1c9d123456789",
        "name": "Matti Seppänen",
        "email": "matti@example.com",
        "password": "M@45mtg$",
        "phone_number": "+358401234567",
        "gender": "Male",
        "date_of_birth": "2000-01-15T00:00:00.000Z",
        "membership_status": "Active",
        "account_verified": true,
        "company": "Nordic Travel Ltd",
        "createdAt": "2025-11-14T16:50:00.000Z",
        "updatedAt": "2025-11-14T16:50:00.000Z",
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
- **Example Request**: `GET http://localhost:4000/api/users/6735c4e2f9a1c9d123456789`
- **Example Response**:
  ```json
    {
        "_id": "6735c4e2f9a1c9d123456789",
        "name": "Matti Seppänen",
        "email": "matti@example.com",
        "password": "M@45mtg$",
        "phone_number": "+358401234567",
        "gender": "Male",
        "date_of_birth": "2000-01-15T00:00:00.000Z",
        "membership_status": "Active",
        "account_verified": true,
        "company": "Nordic Travel Ltd",
        "createdAt": "2025-11-14T16:50:00.000Z",
        "updatedAt": "2025-11-14T16:50:00.000Z",
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
  PUT http://localhost:4000/api/users/6735c4e2f9a1c9d123456789
  ```
  
  ```json 
  {
    "email": "matti.seppanen@example.com",
    "password": "Matti2@1234",     
    "phone_number": "+358401234567"
  }
  ```
- **Example Response**:
  ```json
    {
        "_id": "6735c4e2f9a1c9d123456789",
        "name": "Matti Seppänen",
        "email": "matti.seppanen@example.com",
        "password": "Matti2@1234",     
        "phone_number": "+358401234567",
        "gender": "Male",
        "date_of_birth": "2000-01-15T00:00:00.000Z",
        "membership_status": "Active",
        "account_verified": true,
        "company": "Nordic Travel Ltd",
        "createdAt": "2025-11-14T16:50:00.000Z",
        "updatedAt": "2025-11-14T16:50:00.000Z",
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
  - **404 Not Found**: Returns a JSON error message if no user with the specified ID is found.
  - **500 Internal Server Error**: Returns a JSON error message if an error occurs during deletion.

---

### Iteration 5: Implement Error-Handling Middleware

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

1. **Import Middleware in `app.js`**

   Update your `app.js` file to import both `unknownEndpoint` and `errorHandler` from `customMiddleware.js`:

   ```javascript
   const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
   ```

2. **Use Middleware in `app.js`**

   Add the middleware to your Express app **before** `app.listen()`. This ensures the middleware is applied after all routes:

   ```javascript
   // Use the unknownEndpoint middleware for handling undefined routes
   app.use(unknownEndpoint);

   // Use the errorHandler middleware for handling errors
   app.use(errorHandler);
   ```

3. **Test the Error-Handling Middleware**

   Add a test route that triggers an error in `app.js`:

   ```javascript
   // Example route that throws an error (for testing purposes only)
   app.get('/error', (req, res, next) => {
     const error = new Error("Network problem");
     next(error);
   });
   ```

   Make a GET request to `http://localhost:4000/error` using your browser, Postman, or cURL. You should receive:
   ```json
   {
     "message": "Something went wrong!"
   }
   ```

   > **Note**: This `/error` endpoint is **for testing purposes only**. In production applications, you would not include such endpoints.

4. **Commit Your Changes**
   ```bash
   git commit -m "feat: add global error handling middleware"
   ```

  
**Important Notes**

1. **Middleware Definition**:
   - The `errorHandler` middleware uses four parameters: `(error, request, response, next)`. This allows it to handle errors passed through `next()`.

2. **Passing Errors**:
   - To invoke the error-handling middleware, you use `next(error)` in your route or middleware, passing the error object to the `errorHandler`.

---

### Iteration 6: Migrate to MongoDB Atlas (Cloud Database)

In this iteration, you will switch from using a local MongoDB server to a cloud-based MongoDB Atlas service.

1. **Create a MongoDB Atlas Account**
   - Register for a free account with MongoDB Atlas
   - Follow the setup instructions provided [here](./atlas.md)
   - Create a new cluster and obtain your connection URI

2. **Wait for Cluster Readiness**
   - Note: It may take up to 30 minutes for the Atlas cluster to become operational
   - You can complete this part outside of class if needed

3. **Update Environment Configuration**
   - Once your Atlas cluster is ready, open the `.env` file
   - Replace the local MongoDB URI with your Atlas URI:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
     ```
   - Replace `<username>`, `<password>`, and `<database>` with your actual credentials

4. **Test the Cloud Connection**
   - Restart your server and verify the connection to Atlas is successful
   - Test your API endpoints to ensure they work with the cloud database

5. **Commit Your Changes**
   ```bash
   git commit -m "chore: migrate database from local MongoDB to Atlas"
   ```

Your application now works seamlessly with both local and cloud MongoDB environments!


---

## Part 2: AI Integration (Optional)

> **Target Audience**: This task is **primarily intended for group members responsible for implementing AI features in their group project**. It is optional for all other students.

In this part, you will work with AI-powered endpoints to enhance your application's functionality.

1. **Understand the Existing AI Setup**
   - Review the AI code explanation in [**`AI_API_Setup_and_Logic.md`**](https://github.com/tx00-resources-en/AI-part2-demo/blob/main/AI_API_Setup_and_Logic.md)
   - Ensure the current AI API is running correctly by following the setup instructions

2. **Complete the AI Task**
   - Follow the step-by-step instructions in [**`task.md`**](https://github.com/tx00-resources-en/AI-part2-demo/blob/main/task.md)
   - Each step includes a sample solution wrapped in a `<details>` tag for reference
   - Reuse the same logic and structure to build your new AI endpoint

3. **Commit Your Work**
   - Use appropriate commit messages following the format established in Part 1:
     - *feat* when you add a new feature or new functionality to the codebase.
     - *refactor* when you change existing code without altering behavior. 
     - *chore* used for maintenance tasks that don’t change application behavior.