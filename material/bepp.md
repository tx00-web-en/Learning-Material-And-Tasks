# Backend Testing with Jest and Supertest

This pair programming activity focuses on testing backend APIs using **Jest** and **Supertest**. Rather than starting from scratch, you will build upon a starter repository that provides example tests. The goal is to write tests for the **Jobs API** following the same logic used in the provided tests for the **Tours and Workouts** API.

<!-- 
### Provided Tests:
1. **`examples/tours-no-auth.test.js`**: Tests for endpoints.
2. **`examples/tours-auth.test.js`**: Tests for protected Tours endpoints.
3. **`examples/users.test.js`**: Tests for user authentication and user-related endpoints. -->

Your task will be to apply this testing approach to the **Jobs API**.

> **Reminder:** Commit your work after each iteration and push it to GitHub to track your progress.

---

## Activity Structure and Setup

This activity is divided into **three parts**, where you will focus on writing tests for both protected and non-protected endpoints for the **Jobs API** and user endpoints. Two versions of the backend will be provided:
- `backend-no-auth`: Jobs API without authentication.
- `backend-auth`: Jobs API with authentication.

You will write tests for each version accordingly.

**Setup**

1. Clone the starter files.
2. Clone the [starter repository](https://github.com/tx00-resources-en/week7-bepp-starter)
   - After cloning, **delete** the `.git` directory.

---

### Part 1: Testing Non-Protected Endpoints

In the first part, you will write tests for **Jobs API endpoints that do not require authentication**.

#### Iteration 1: Setup
1. **Navigate to the `backend-no-auth` directory**:
   - Rename the `.env.example` file to `.env`.
   - Run `npm install` to install dependencies, followed by `npm run dev` to start the development server.

2. **Create a Test File**:
   - In the `tests` folder, create a file called `jobs.test.js`.
   - Follow the same structure as the example test in `examples/tours-no-auth.test.js`.
   - Test the Jobs API endpoints like GET, POST, DELETE, etc., for non-protected routes.   
   - If you encounter any difficulties, you can refer to a similar example in `examples/tours-no-auth.test.js`.
   
   <!-- - The code is **missing a test case**. You can implement it based on the example from `tours-no-auth.test.js`:
     ```js
     it("should return 400 for invalid job ID when DELETE /api/jobs/:id", async () => {
       // your code here
     });
     ``` -->

4. **Run the Tests**:
   - Use `npm test` to run the tests and ensure everything works as expected.

---

### Part 2: Testing Protected Endpoints and Users

In this part, you will write tests for **Jobs API endpoints that require authentication** and for **User Authentication** (signup, login).

#### Iteration 1: Setup
1. **Navigate to the `backend-auth` directory**:
   - Rename the `.env.example` file to `.env`.
   - Run `npm install` and `npm run dev` to start the server.

2. **Write Tests for Protected Jobs Endpoints**:
   - Create a new test file `jobs-auth.test.js`.
   - Follow the example provided in `examples/tours-auth.test.js`.
   - Test protected routes such as PUT, POST, DELETE, ensuring only authenticated users can access them.
   - If you encounter any difficulties, you can refer to a similar example in `examples/tours-auth.test.js`. 
<!--    
   - The code is **missing a test case**. You can implement it based on the example from `tours-auth.test.js`:
     ```js
     it("should update one job by ID when PUT /api/jobs/:id is called", async () => {
       // your code here
     });
     ``` -->

#### Iteration 2: Write Tests for User Authentication
1. **Create a File for User Tests**:
   - In the `tests` folder, create a file called `users.test.js`.
   - Follow the example in `examples/users.test.js`.
   - Write tests for user signup, login, and other user-related actions.
   - If you encounter any difficulties, you can refer to a similar example in `sample-solution/users.test`.  
   
   <!-- The code is **missing two test cases**. You can implement them based on the example from `examples/users.test`
     - Test case for signup with invalid credentials:
       ```js
       it("should return an error with invalid credentials", async () => {
         // your code here
       });
       ```
     - Test case for login with invalid credentials:
       ```js
       it("should return an error with invalid credentials", async () => {
         // your code here
       });
       ``` -->

3. **Run the Tests**:
   - Use `npm test` to ensure all your tests for protected routes and user authentication work correctly.

---

### Part 3: Important Considerations and Advanced Setup

When writing tests for your project, keep in mind the following **best practices** and **configuration settings** for testing in your **group project**:

1. **Refactor the Server Code**:
   - Extract all the logic into `app.js` (except for the listening part) and move the listening logic to `index.js`, like this:

   ```js
   // app.js
   // your code here
   module.exports = app;
    //instead of this:
   // app.listen(process.env.PORT, () => {
   //   console.log(`Server running on port ${process.env.PORT}`)
   // })  
   ```

   ```js
   //index.js
   const app = require("./app");
   const http = require("http");
   const config = require("./utils/config");
   const logger = require("./utils/logger");

   const server = http.createServer(app);

   // const PORT = config.PORT || 4000; 
   server.listen(config.PORT, () => {
     logger.info(`Server running on port ${config.PORT}`);
   });
   ```

2. **Install `cross-env`**:
   - Normally, `cross-env` should be installed as a dev dependency, but some deployment platforms may require it as a regular dependency. To install:
   
   ```bash
   npm install cross-env
   ```

3. **Install Dev Dependencies**:
   - Install the required testing libraries (`jest` and `supertest`) as dev dependencies:
   
   ```bash
   npm install jest supertest -D
   ```

4. **Choose a Secure JWT Secret**:
   - When choosing your JWT secret, make sure to use at least **64 bytes of randomness**. For example:
   
   `fd20f5055aa4ddae6e76493a39e4481f87810080c7ac9587e49339ed61cd22f7`

   You can use online tools like [Browserling's Random Hex Generator](https://www.browserling.com/tools/random-hex) to generate this.

5. **Test Teardown**:
   - Create a `tests/teardown.js` file. This script will run after all tests are completed to clean up resources such as database connections or mock servers.
   - In `package.json`, add the following configuration:
   
     ```json
     "jest": {
       "testEnvironment": "node",
       "globalTeardown": "./tests/teardown.js"
     }
     ```

6. **Explanation of `package.json` Test Configurations**:
   - **NODE_ENV**: Specifies the environment where the tests will run. Setting `NODE_ENV=test` ensures the app uses the test configuration (e.g., test database).
   - **cross-env**: Allows you to set environment variables across different platforms, ensuring compatibility with Windows, macOS, and Linux.
   - **--runInBand**: Forces Jest to run tests serially (one by one) instead of in parallel. This can prevent issues related to shared resources like databases or files.

   The final configuration in `package.json` looks like this:

   ```json
   "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
   ```

7. **`glob` Version Override**:
   - You might see an override for the `glob` package in `package.json` to ensure compatibility with other dependencies:
   
     ```json
     "overrides": {
       "glob": "10.4.2"
     }
     ```

   - The `glob` package is used for pattern matching and file searching. Older versions of `glob` may cause warnings during Jest execution due to deprecated features. By specifying `"glob": "10.4.2"`, you ensure compatibility with the latest versions of Jest and avoid deprecation issues.

8. **Running Tests One by One**:
   - To run individual tests instead of running all tests at once, use the `--testNamePattern` flag in Jest:
   
     ```bash
     npm test -- --testNamePattern="should return 400 for invalid job ID"
     ```

9. **Seeder Script (`seeder.js`)**:
   - Consider adding a script to seed data into the database. Here's an example of a [seeder.js script](https://github.com/bradtraversy/proshop_mern/blob/master/backend/seeder.js) that you can reference.

