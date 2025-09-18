# Activity 2

<!-- push to GitHub -->
<!-- --coverage -->

###  Part 1/2:

1. Clone the [starter repository](https://github.com/tx00-resources-en/week6-be-workout-v2)
   - After cloning, **delete** the `.git` directory.
2. Rename `.env.example` to `.env`.
  - Inside the `.env` file, notice that there are two MongoDB URIs: one for development and one for testing purposes.
3. Run `npm install`  
4. Run  `npm test` to run the tests using Jest.
5. Open the `workout-v2/tests/workout.test.js` file and refactor the code to follow a more structured and descriptive style, similar to what is demonstrated in the first activity.

###  Part 2/2:

- Create backend tests to validate the functionality of the following operations: `delete`, `update`, and `read`ing a single workout

>  Note:

1. **Separation of Server Logic**:
   - The server logic has been moved into a separate file called `app.js`. In `index.js`, we now import this `app.js` file and use it to create an HTTP server.
   - This separation allows us to use `app.js` with **Supertest** more effectively, as Supertest creates its own internal server and manages ports independently during testing.

   Here’s the updated code in `index.js`:

   ```js
   const app = require('./app');
   const http = require('http');

   const server = http.createServer(app);

   server.listen(config.PORT, () => {
     logger.info(`Server running on port ${config.PORT}`);
   });
   ```

2. **Using Node Configurations**:
   - Instead of using the custom config module located in `workout-v2/utils/`, we could have used a more standardized package like [node-config](https://github.com/lorenwest/node-config). This package provides robust configuration management and allows for better handling of environment-specific settings.

3. **Handling Content-Type Header in Tests**:
   - In the test file `tests/workout.test.js`, we used `.expect('Content-Type', /application\/json/)`.

     Here’s what’s happening:
     - `/application\/json/` is a **regular expression (regex)**. The forward slashes `/` mark the start and end of the regex pattern. Since the desired string is `application/json`, we use `\/` to escape the slash, so it isn't mistaken for the regex's closing delimiter.

   - Instead of using a regex, we could have written the test as:
     ```js
     .expect('Content-Type', 'application/json')
     ```

     However, the issue with using a string comparison is that the header's value must match **exactly**. In practice, the `Content-Type` header might include additional information, like character encoding:
     ```
     application/json; charset=utf-8
     ```

     - With the string comparison, the test would fail because of the additional `charset=utf-8`.
     - By using a **regex**, we can match just the important part (`application/json`), ignoring any extra data like the character encoding. This ensures that the test passes as long as `application/json` is part of the `Content-Type` header, which is what we care about.

4. Note: When working with Jest, you have the following options:
   - You can replace [`test()` with `it()`].
   - You can [skip certain tests] as needed.
   - You can run tests individually (More details below).



<!-- Links -->
[`test()` with `it()`]:https://jestjs.io/docs/api#testname-fn-timeout
[skip certain tests]:https://codewithhugo.com/run-skip-single-jest-test/