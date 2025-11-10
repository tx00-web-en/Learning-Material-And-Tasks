### Pair Programming Activity

---

## Overview

In this activity, you will collaboratively implement an API server using the MVC pattern, starting from the pre-existing tours API. The API will include two routers: one for users and one for tours.

Throughout the activity, you will switch roles: the driver (who writes code) becomes the navigator (who reviews and guides), and vice versa. Remember to switch roles regularly, preferably after each major step, to ensure both participants contribute to coding and reviewing.

---

## Instructions

### Step 0: Setup

1. **Decide Initial Roles**:
   - Determine who will start as the driver and who will be the navigator. Remember to switch roles after each major step.

2. **Clone the starter code**:
   - Use the following commands to get started:
     ```bash
     git clone https://github.com/tx00-resources-en/week4-be-pp-starter week4-be-pp
     cd week4-be-pp
     ```
   - **Note**: Remove the `.git` directory to ensure that you start with a fresh Git history for your new repository.

3. **Install Dependencies and Run the Server**:
   - Install the required dependencies and start the development server:
     ```bash
     npm install
     npm run dev
     ```
4. **Test the API**:
   - Use Postman to ensure the API is functioning correctly by following [the steps from last week](https://github.com/tx00-web-en/Learning-Material-And-Tasks/blob/week3/material/be-pair-prog2.md#step-by-step-guide-to-testing-endpoints). Make sure all endpoints respond as expected.

5. **Initialize a New Git Repository and Push to GitHub**:
   - Follow the [instructions](./push-to-github.md) to make the directory a new Git repository and push your code to GitHub.
   - **Quick Steps**:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin <your-repo-url>
     git push -u origin main
     ```
   - Ensure `.gitignore` is set up correctly to avoid committing `node_modules`.

### Step 1: Refactoring to MVC Pattern

1. **Refactor the Tours API**:
   - Refactor the tours API to follow the MVC (Model-View-Controller) pattern. This pattern separates concerns, making the code modular and easier to maintain.
   - Restructure the project as follows:
     ```
     /controllers
       tourControllers.js
     /models
       tourModel.js
     /routes
       tourRouter.js
     app.js
     package.json
     ```
   - For reference, see the [cars API example](https://github.com/tx00-resources-en/starter-api-cars-mvc).

2. **Ensure Functionality**:
   - After refactoring, verify that the API is still functional by testing all endpoints using Postman. Check that each endpoint returns the expected response.

3. **Commit Changes**:
   - Commit your changes with a meaningful message (e.g., "Refactor tours API to MVC pattern").

### Step 2: Update Status Codes

To adhere to RESTful principles, update the status codes returned by the API to be more specific.

1. **Update Status Codes in `tourControllers.js`**:
   - Replace the response in `deleteTour()`:
     ```javascript
     // From:
     res.json({ message: "Deleted successfully" });
     // To:
     res.status(204).send(); // 204 No Content
     ```
   - Replace the response in `createTour()`:
     ```javascript
     // From:
     res.json(newTour);
     // To:
     res.status(201).json(newTour); // 201 Created
     ```
   - These status codes are used to adhere to RESTful principles: `204 No Content` indicates successful deletion without returning content, and `201 Created` indicates successful resource creation.

2. **Test the Modifications**:
   - Use Postman to test the modified endpoints. Check that `DELETE` requests return a `204 No Content` status and `POST` requests return a `201 Created` status.

3. **Commit Changes**:
   - Commit your changes with a meaningful message and push to GitHub.

### Step 3: Implement User Model, Controller, and Router

Now, you will add functionality for a new "user" entity.

1. **Create `userModel.js`**:
   - Create the `userModel.js` file based on `tourModel.js`. The data model is shown below:
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
       "country": "Finland"
     }
     ```

2. **Test `userModel.js`**:
   - Run the model in a separate terminal to ensure it works:
     ```bash
     node models/userModel.js
     ```
   - **Expected Output**: Confirm there are no syntax errors or issues when the model runs.

3. **Create Controllers & Router**:
   - Create `userControllers.js` and `userRouter.js` files based on `tourControllers.js` and `tourRouter.js`. Define logic to handle user-related operations and routing.

4. **Update `app.js`**:
   - Import `userRouter`:
     ```javascript
     const userRouter = require('./routes/userRouter');
     ```
   - Use `userRouter` for all `/users` routes:
     ```javascript
     app.use('/users', userRouter);
     ```

5. **Test the API**:
   - Use Postman to test the new user endpoints. Ensure they are functioning as expected, returning the correct status codes and responses.

6. **Commit Changes**:
   - Commit your changes with a meaningful message and push to GitHub.

### Step 4: Modify Routes

1. **Update Routes in `app.js`**:
   - Ensure routes are accessible under `/api/tours` and `/api/users`:
     ```javascript
     app.use('/api/tours', tourRouter);
     app.use('/api/users', userRouter);
     ```
2. **Test Modified Routes**:
   - Use Postman to test the modified routes (e.g., `GET /api/users`, `GET /api/tours`). Verify that all endpoints respond correctly under the new base paths.

### Step 5: Implement Third-Party Middleware

1. **Install `morgan` Middleware**:
   ```bash
   npm install morgan
   ```

2. **Add `morgan` to `app.js`**:
   - Add `morgan` for logging HTTP requests:
     ```javascript
     const morgan = require('morgan');
     app.use(morgan('tiny'));
     ```
   - **Explanation**:
     - **dev**: Concise output colored by response status for development use.
     - **short**: Shorter than default, includes response time.
     - **tiny**: Minimal output.
   - Example of a custom logging format:
     ```javascript
     app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
     ```

3. **Test Logging**:
   - Use Postman to connect to endpoints and observe the output in `console.log`. For example, you should see logs similar to:
     ```
     GET /api/tours 200 12ms - 34
     ```

4. **Commit Changes**:
   - Commit your changes with a meaningful message and push to GitHub.

### Step 6: Implement Custom Middleware for Authentication

1. **Create `auth.js` Middleware**:
   - Inside the `middleware` folder, create `auth.js` to check if the role is admin. Use code from the [homework video](https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/).

2. **Import and Use the Middleware**:
   - Import `auth.js` into `userRouter.js` and `tourRouter.js`.
   - Protect all routes except for `GET /api/users` and `GET /api/tours`:
     ```javascript
     const auth = require('../middleware/auth');
     router.use(auth);
     ```

3. **Test Your Code**:
   - Add a query to your route (e.g., `POST /api/users?admin=true`) to test the middleware. Check that access is granted or denied appropriately.

4. **Commit Changes**:
   - Commit your changes with a meaningful message and push to GitHub.

### Step 7: Sync with GitHub

- Ensure that both members have synchronized their code with GitHub:
  - Pull the latest changes from the remote repository.
  - Resolve any merge conflicts.
  - Push the merged code back to GitHub.


---

## Links

- [How To Use And Write Express Middleware](https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/)
- [Every Important HTTP Status Code Explained](https://blog.webdevsimplified.com/2022-12/http-status-codes/) 
