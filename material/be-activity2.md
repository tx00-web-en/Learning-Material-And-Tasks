# Activity 2

<!-- push to GitHub -->
<!-- --coverage -->

## Part 1 of 3: Initial Setup
---

1. Clone the [starter repository](https://github.com/tx00-resources-en/week6-be-workout-v2)  
   - After cloning, **delete** the `.git` directory.  
2. Rename `.env.example` to `.env`.  
   - Inside the `.env` file, notice that there are two MongoDB URIs: one for development and one for testing purposes.  
3. Run `npm install`.  
4. Run `npm test` to execute the tests using Jest.  
5. Open the `workout-v2/tests/workout.test.js` file and refactor the code to follow a more structured and descriptive style, similar to what you did in **Activity 1**.  



---

## Part 2 of 3: Writing Additional Tests
---

- Extend the backend test suite to validate the following operations:  
  - **Delete** a workout  
  - **Update** a workout  
  - **Read** a single workout by ID  
- Use **Supertest** to send HTTP requests to your API and verify the responses.

👉 **Important:** All these requests require authentication. You must include the `Authorization` header with a valid bearer token in your tests.  

**Example (GET all workouts):**
```js
await api
  .get("/api/workouts")
  .set("Authorization", "bearer " + token)
  .expect(200)
  .expect("Content-Type", /application\/json/);
```

When writing your own tests for `DELETE`, `UPDATE`, and `READ` operations, follow the same pattern:  
- Create or use a valid token in your test setup.  
- Add `.set("Authorization", "bearer " + token)` to each request.  
- Assert the correct status codes and response bodies.  

**Hints for each operation:**
- **Delete:**  
  - Create a workout in the test DB.  
  - Send a `DELETE /api/workouts/:id` request with the token.  
  - Expect status `204` (or your chosen convention).  
  - Verify the workout is gone.  

- **Update:**  
  - Create a workout.  
  - Send a `PUT /api/workouts/:id` with updated fields and the token.  
  - Expect status `200` and check that the response body reflects the update.  

- **Read (single workout):**  
  - Create a workout.  
  - Send a `GET /api/workouts/:id` with the token.  
  - Expect status `200` and confirm the returned workout matches the created one.  

---

## Part 3 of 3: Notes and Best Practices
---

### 1. Separation of Server Logic
- The server logic has been moved into a separate file called `app.js`.  
- In `index.js`, we now import this `app.js` file and use it to create an HTTP server.  
- This separation allows us to use `app.js` with **Supertest** more effectively, since Supertest manages its own server and ports during testing.  

**Example `index.js`:**
```js
const app = require('./app');
const http = require('http');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
```

### 2. Configuration Management
- Instead of using the custom config module in `workout-v2/utils/`, you could use a standardized package like [node-config](https://github.com/lorenwest/node-config).  
- This provides robust configuration management and better handling of environment‑specific settings.  


### 3. Handling `Content-Type` in Tests
- In `tests/workout.test.js`, we used:  
  ```js
  .expect('Content-Type', /application\/json/)
  ```
- Why regex?  
  - `/application\/json/` matches `application/json` even if extra info is present, e.g. `application/json; charset=utf-8`.  
  - If you used a plain string comparison (`'application/json'`), the test would fail when headers include encoding.  
- ✅ Regex ensures the test passes as long as `application/json` is part of the header.  


### 4. Jest Reminders
When working with Jest, you can:  
- Replace [`test()` with `it()`] for BDD style.  
- [Skip certain tests] with `.skip`.  
- Run tests individually with `.only` or via the command line.  

**Example (command line):**
```bash
npm run test -- --test-name-pattern="Workouts"
```

👉 Why the double `--`?  
- The **first `--`** tells npm to stop parsing options for itself.  
- The **second part** (`--test-name-pattern=...`) is passed directly to Jest.  
- If you only used one `--`, npm would try to interpret the flag and throw an error.  




<!-- Links -->
[`test()` with `it()`]:https://jestjs.io/docs/api#testname-fn-timeout
[Skip certain tests]:https://codewithhugo.com/run-skip-single-jest-test/