# Backend Testing with Jest and Supertest — Pair Programming Activity

This pair programming activity focuses on testing backend APIs using **Jest** and **Supertest**.
You will not start from scratch. You will build on a **starter repository** that includes example test files.
Your task is to write tests for the **Jobs API**, both with and without authentication, using the same logic shown in the example tests.

---

### What You Will Do

1. Set up two versions of the backend:

   * `backend-no-auth` → Jobs API without authentication
   * `backend-auth` → Jobs API with authentication
2. Write tests for:

   * Non-protected Jobs endpoints (Part 1)
   * Protected Jobs endpoints (Part 2)
   * User authentication (Part 2)
3. Follow BDD-style test descriptions.
4. Commit after each iteration using the required commit format.

---

### **Starter Resources**

You are given **three example test files** to use as references:

1. `examples/tours-no-auth.test.js` → Non-protected endpoint tests
2. `examples/tours-auth.test.js` → Protected endpoint tests
3. `examples/users.test.js` → User signup/login tests

Use these as templates when creating your Jobs API tests.

> **Important:** Rewrite tests in BDD style.
> Example:
> **BDD:** `it("should return all jobs when GET /api/jobs is requested")`
> **Not BDD:** `it("returns jobs")` or `it("GET /api/jobs")`

---

### **Important Rules**

1. Commit after each step.
2. Use this commit message pattern:

```bash
# After completing each iteration
[iter1] Part 1: Add GET endpoint tests for jobs
[iter2] Part 1: Add POST, PUT, DELETE endpoint tests for jobs
[iter1-p2] Part 2: Add user signup and login tests
[iter2-p2] Part 2: Add protected jobs endpoint tests
```

---

### **Setup**

1. Clone the starter repository:
   [https://github.com/tx00-resources-en/week7-bepp-starter](https://github.com/tx00-resources-en/week7-bepp-starter)

2. **Delete the `.git` folder** so you can create your own repo.

---

## PART 1 — Testing Non-Protected Jobs Endpoints (backend-no-auth)

### **Iteration 1**

1. Navigate to the `backend-no-auth` directory.

2. Create a new `.env` file by copying `.env.example`

3. Install dependencies:

   ```bash
   npm install
   npm run dev
   ```

4. Create a test file:

   ```
   tests/jobs.test.js
   ```

5. **Write Tests for Non-Protected Jobs Endpoints**
   Follow the structure in `examples/tours-no-auth.test.js` to write tests for the following endpoints:

    | Method | Endpoint        | Description   |
    | ------ | --------------- | ------------- |
    | GET    | `/api/jobs`     | Get all jobs  |
    | GET    | `/api/jobs/:id` | Get job by ID |


Your tests should check:

* **Success case (200):** GET /api/jobs returns a 200 status and an array of job objects
* **Response format:** Each job object contains `id`, `title`, `company`, `salary`, `description`, etc.
* **Get by ID (200):** GET /api/jobs/:id returns a single job with the correct ID
* **Invalid ID (404):** GET /api/jobs/invalid-id returns a 404 status
* **Edge cases:** Empty database, non-existent IDs
* **Adjust** backend status codes where needed to ensure consistency with the test requirements.

**Suggested test count:** 4-7 test cases

Example BDD-style test:

```js
it("should return all jobs when GET /api/jobs is requested", async () => {
  //
});
```

Run your tests using:

```bash
npm test
```

### **Iteration 2**

Write tests for the following endpoints:

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| POST   | `/api/jobs`     | Create a job  |
| PUT    | `/api/jobs/:id` | Update a job  |
| DELETE | `/api/jobs/:id` | Delete a job  |

**Test cases to include:**

* **Create job (POST):**
  * Valid job data returns 201 status and created job object
  * Missing required fields (title, company) returns 400
  * Successfully saves to database

* **Update job (PUT):**
  * Valid update data returns 200 status with updated job
  * Invalid ID returns 404
  * Partial updates work correctly
  * Invalid data returns 400

* **Delete job (DELETE):**
  * Valid deletion returns 204 or 200 status
  * Invalid ID returns 404
  * Job is removed from database

* **Adjust** backend status codes where needed to ensure consistency with the test requirements.

**Suggested test count:** 9-12 test cases


---

## **PART 2 — Testing Protected Jobs Endpoints (backend-auth)**

### **Iteration 1**

1. Navigate to `backend-auth`
2. Create a new `.env` file by copying `.env.example`
3. Install dependencies:

   ```bash
   npm install
   npm run dev
   ```

Create:

```
tests/users.test.js
```

Follow the pattern in `examples/users.test.js`.

Write tests for:

| Method | Endpoint            | Purpose                              |
| ------ | ------------------- | ------------------------------------ |
| POST   | `/api/users/signup` | Register user (valid + invalid data) |
| POST   | `/api/users/login`  | Login (valid + invalid creds)        |

Test cases to include:

* **Signup:**
  * Valid signup returns 201 status and user object with email
  * Missing email or password returns 400
  * Invalid email format returns 400
  * Password too short (less than 6 chars) returns 400
  * Duplicate email returns 400
  * Signup response should NOT include plaintext password

* **Login:**
  * Valid login with correct credentials returns 200 status and JWT token
  * Invalid email returns 401
  * Wrong password returns 401
  * Missing email or password returns 400
  * Token is a valid JWT string

* **Adjust** backend status codes where needed to ensure consistency with the test requirements.

**Suggested test count:** 6-12 test cases


##### **Iteration 2 — Write Tests for Protected Jobs Endpoints**

Create:

```
tests/jobs-auth.test.js
```

Follow `examples/tours-auth.test.js`.

Steps inside your tests:

1. Signup or login a user
2. Save the returned JWT token
3. Use `set("Authorization", "Bearer <token>")` when calling protected routes

Protected endpoints:

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| POST   | `/api/jobs`     | Create job (requires auth) |
| PUT    | `/api/jobs/:id` | Update job (requires auth) |
| DELETE | `/api/jobs/:id` | Delete job (requires auth) |

**Test cases to include:**

**Without token (should return 401 Unauthorized):**

* POST /api/jobs without Authorization header
* PUT /api/jobs/:id without Authorization header
* DELETE /api/jobs/:id without Authorization header
* Invalid token format (e.g., "Bearer invalid-token")
* Expired token (if applicable)

**With valid token (should succeed):**

* POST /api/jobs creates a new job and returns 201
* PUT /api/jobs/:id updates job and returns 200
* DELETE /api/jobs/:id deletes job and returns 204/200
* Created job is associated with the authenticated user
* User can only modify their own jobs (if applicable)

* **Adjust** backend status codes where needed to ensure consistency with the test requirements.

**Suggested test count:** 7-14 test cases

---

## **PART 3 — Backend Testing Best Practices**

These practices should be implemented in **both** `backend-no-auth` and `backend-auth`, and are **meant for your group project**:

---

#### **1. Refactor server**

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

---

#### **2. Install cross-env**

   - `cross-env` should be installed as a *regular dependency* (not *dev dependency*). To install:
   
   ```bash
   npm install cross-env
   ```

---

#### **3. Install test dependencies**

   - Install the required testing libraries (`jest` and `supertest`) as dev dependencies:
   
   ```bash
   npm install jest supertest -D
   ```

---

#### **4. Use a strong JWT secret**

   - When choosing your JWT secret, make sure to use at least **64 bytes of randomness**. For example:
   
   `fd20f5055aa4ddae6e76493a39e4481f87810080c7ac9587e49339ed61cd22f7`

   You can use online tools like [Browserling's Random Hex Generator](https://www.browserling.com/tools/random-hex) to generate this.

---

#### **5. Add Jest teardown**

   - Create a `tests/teardown.js` file. This script will run after all tests are completed to clean up resources such as database connections or mock servers.
   - In `package.json`, add the following configuration:
   
     ```json
     "jest": {
       "testEnvironment": "node",
       "globalTeardown": "./tests/teardown.js"
     }
     ```

---

#### **6. Recommended test script**

   ```json
   "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
   ```
   - **NODE_ENV**: Specifies the environment where the tests will run. Setting `NODE_ENV=test` ensures the app uses the test configuration (e.g., test database).
   - **cross-env**: Allows you to set environment variables across different platforms, ensuring compatibility with Windows, macOS, and Linux.
   - **--runInBand**: Forces Jest to run tests serially (one by one) instead of in parallel. This can prevent issues related to shared resources like databases or files.

---

#### **7. glob package override**

   - You might see an override for the `glob` package in `package.json` to ensure compatibility with other dependencies:
   
     ```json
     "overrides": {
       "glob": "^13.0.0"
     }
     ```

   - The `glob` package is used for pattern matching and file searching. Older versions of `glob` may cause warnings during Jest execution due to deprecated features. By specifying `"glob": "^13.0.0"`, you ensure compatibility with the latest versions of Jest and avoid deprecation issues.

---

#### **8. Run a single test by name**

   - To run individual tests instead of running all tests at once, use the `--testNamePattern` flag in Jest:
   
     ```bash
     npm test -- --testNamePattern="should return 400 for invalid job ID"
     ```
---

#### **9. Optional: Seeder Script**

   - Consider adding a script to seed data into the database. Here's an example of a [seeder.js script](https://github.com/bradtraversy/proshop_mern/blob/master/backend/seeder.js) that you can reference.

---

## **Common Pitfalls to Avoid**

1. **Forgetting `async`/`await`** - All test callbacks that use async operations must be `async`, and promises must be awaited
2. **Shared test data** - Reset or create fresh test data for each test to avoid tests affecting each other
3. **Hardcoding IDs** - Use the response from one test to get dynamic IDs instead of hardcoding values
4. **Token expiration** - Generate a fresh token for each test or store it in a variable accessible to all tests
5. **Not cleaning up** - Use `beforeEach` and `afterEach` hooks to set up and tear down test data
6. **Testing implementation details** - Focus on behavior (what the API does) not implementation (how it does it)

---

## **Helpful Resources**

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [HTTP Status Codes Reference](https://httpwg.org/specs/rfc7231.html#status.codes)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)



<!-- # Pair Programming: Back end

The [pair programming task](./be-pp-current.md) will become visible once we start the session. In the meantime, you are strongly encouraged to review a task from a [previous period](./be-pp-old.md). This session’s pair programming activity will be **similar, though not identical**, and reflecting on earlier work will help you make the most of our time together.

> [!IMPORTANT]
> - Review the group activities, watch the pre‑session video, and revisit the task from the **previous period**.  
> - [Read about Strong‑Style Pair Programming](./about-pair-prog.md).  
> - For the pair programming to be accepted, **both members must alternate iterations.**  
> - Example:* Iteration 1 – Member 1, Iteration 2 – Member 2, Iteration 3 – Member 1, Iteration 4 – Member 2, and so on.  
>   - *Note:* All commits will be graded separately.  
> - After each iteration, take a **screenshot** of the pushed commit on GitHub. The screenshot must clearly show both the **commit message** and the **user who made the commit**. Save all screenshots in a folder named **`screenshots`** within your repository.  
> - You may use the **Live Share** extension in VS Code to facilitate collaboration. However, commits must still alternate between members. It will **not** be considered pair programming if only one member is making all the commits.   
-->
