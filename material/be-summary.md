# Backend Testing


- [Part 1: Backend Testing](#part-1-backend-testing)
- [Part 2: Backend Testing: Focus on Protected Routes](#part-2-backend-testing-with-jest-and-supertest-focus-on-protected-routes)
- [BDD vs TDD](#part-3-bdd-vs-tdd)
- [Managing Different Environments in Node.js](#part-4-managing-different-environments-in-nodejs)

---
## Part 1: Backend Testing

Testing is an essential part of backend development, ensuring that your APIs work correctly and reliably. In Node.js applications, a combination of **Jest** and **Supertest** offers a powerful way to test APIs and backend logic effectively. In this section, we will break down how you can use both tools together, why relying on only Supertest might not be enough, and how Jest compares to other popular testing frameworks like **Mocha** and **Chai**.

### Setting Up Jest and Supertest

To illustrate how to use Jest and Supertest together, consider the following code, where we test an API for a workout management system:

```javascript
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  { title: "test workout 1", reps: 11, load: 101 },
  { title: "test workout 2", reps: 12, load: 102 }
];

beforeEach(async () => {
  await Workout.deleteMany({});
  await new Workout(initialWorkouts[0]).save();
  await new Workout(initialWorkouts[1]).save();
});

describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("should include a specific workout in the returned list", async () => {
    const response = await api.get("/api/workouts");
    const titles = response.body.map(workout => workout.title);
    expect(titles).toContain("test workout 2");
  });

  it("should respond with JSON format and status 200", async () => {
    await api
      .get("/api/workouts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
```

In this example, the API is tested using Jest and Supertest. Let's dive deeper into why we use these two tools and how they complement each other.

### Supertest: The API Testing Tool

Supertest is an HTTP assertion library designed specifically for testing Node.js HTTP servers. It allows you to make HTTP requests to your server (without needing to actually start the server) and verify the responses. 

In the code above, Supertest is used to:

- **Send GET/POST/DELETE requests**: `api.get("/api/workouts")` sends a GET request to fetch workouts.
- **Validate HTTP responses**: Using Supertest, we can chain assertions like `.expect(200)` to check response status and `.expect("Content-Type", /application\/json/)` to verify headers.

### Why Not Just Supertest? The Role of Jest

While Supertest is excellent for making HTTP requests and performing basic assertions, it doesn't provide a complete testing framework. This is where **Jest** comes into play. Jest offers:

1. **Test Suite Organization**: 
   - Jest allows you to organize tests into `describe` and `test` blocks, making it easier to manage complex test suites. Supertest alone does not offer such organizational features.
  
2. **Rich Assertions**:
   - Jest comes with a rich assertion library built-in (`expect`), which allows you to verify that data matches expectations. For example, in the code:
     ```javascript
     expect(response.body).toHaveLength(initialWorkouts.length);
     expect(contents).toContain("test workout 2");
     ```
     Jest’s assertion capabilities go beyond Supertest’s simple `.expect()` method for HTTP responses.

3. **Mocking and Spying**: 
   - Jest excels at mocking functions, objects, and modules, which is useful for testing isolated components and mocking external dependencies (e.g., databases, third-party APIs).

4. **Snapshot Testing**: 
   - Jest supports snapshot testing, where you can store and compare complex data structures (like responses) in "snapshots" to detect unintended changes over time.

### Jest vs. Mocha/Chai: Test Runners and Assertion Libraries

While Jest is an all-in-one solution (offering a test runner, assertions, and mocking tools), other popular combinations like **Mocha** and **Chai** provide similar functionality but require more setup.

1. **Test Runner**:
   - **Jest** is a complete testing framework, offering built-in support for running tests, handling test suites, and generating reports.
   - **Mocha** is just a test runner and does not come with built-in assertions or mocking, meaning you'll need to add other libraries like **Chai** (assertions) or **Sinon** (mocking).

2. **Assertions**:
   - **Jest** uses its own `expect` API, which is very user-friendly and powerful.
   - **Chai** provides similar functionality but must be set up separately, and you might need additional plugins (e.g., `chai-http` for HTTP assertions).
   
   Example in **Jest**:
   ```javascript
   expect(response.body).toHaveLength(initialWorkouts.length);
   ```

   Equivalent in **Chai**:
   ```javascript
   expect(response.body).to.have.lengthOf(initialWorkouts.length);
   ```

3. **Setup Complexity**:
   - **Jest** requires minimal configuration. It has a zero-config philosophy, meaning you can start writing tests with little to no setup.
   - **Mocha/Chai** requires more initial setup. You need to install and configure multiple libraries to achieve what Jest offers out of the box.

### Why Jest is Often Preferred

For many developers, Jest is the preferred choice for several reasons:
- **All-in-one solution**: Jest combines a test runner, assertion library, and mocking/stubbing tools in a single package.
- **Better performance**: Jest is known for its speed and ability to run tests in parallel.
- **Easy to use**: Jest is beginner-friendly, with minimal configuration required, allowing teams to focus more on writing tests and less on tooling setup.

However, **Mocha/Chai** is still a solid alternative, especially for teams that prefer modularity and are already familiar with those tools.

### Conclusion

Combining **Jest** and **Supertest** provides a powerful approach to testing Node.js backend applications. Supertest simplifies API request validation, while Jest adds structure, advanced assertions, mocking, and overall simplicity. While alternatives like Mocha/Chai are also popular, Jest’s all-in-one nature and user-friendly design make it a popular choice in modern development environments.

By leveraging the strengths of both Jest and Supertest, you can ensure that your backend APIs are tested thoroughly, ensuring reliability and quality in your application's critical components.

---
## Part 2: Backend Testing with Jest and Supertest: Focus on Protected Routes

In many backend applications, certain API routes are protected and require user authentication, usually via tokens (like JWT). Testing these protected routes is critical to ensuring that your authentication and authorization mechanisms work correctly. In this part, we will focus on testing protected routes using **Jest** and **Supertest**.

### Why Testing Protected Routes is Essential

Protected routes restrict access to specific users or user roles, ensuring that only authorized users can perform certain actions. For instance:
- **Authenticated users** might have access to their data (e.g., fetching workout records).
- **Admins** might be allowed to manage user accounts or other critical resources.
- **Unauthorized users** should be prevented from accessing these routes, and the API should return proper HTTP responses (e.g., `401 Unauthorized`).

By testing these routes, you verify that:
1. Only authenticated users can access the protected routes.
2. The correct authorization token is required.
3. Proper HTTP responses are returned for valid and invalid requests.

### Setting Up Testing for Protected Routes

Here’s an example of how to test protected routes using Jest and Supertest, focusing on an API that manages workouts. The tests ensure that users must authenticate before they can access or modify workout data.

```javascript
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  // Clear users and sign up a new user to get a valid token
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;  // Store the token for later use
});

describe("when there are initially some workouts saved", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    // Add initial workouts as an authenticated user
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0])
      .send(workouts[1]);
  });

  it("should return workouts as JSON for an authenticated user", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should allow a new workout to be added with a valid token", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
  });

  it("should fail to add a workout without a token", async () => {
    const newWorkout = {
      title: "unauthorized workout",
      reps: 15,
      load: 80,
    };
    await api
      .post("/api/workouts")
      .send(newWorkout)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
```

### Key Concepts in the Code

1. **Token-Based Authentication**: 
   - In the `beforeAll` block, a user is signed up via `/api/user/signup`, and a JWT token is returned in the response (`result.body.token`). This token is stored and used in subsequent requests for authentication.
   - Tokens are attached to requests using the `.set("Authorization", "bearer " + token)` method. This simulates how a client would send a JWT in the `Authorization` header.

2. **Testing Protected Routes**:
   - **Valid Access**: In the test `Workouts are returned as JSON`, an authenticated user successfully fetches all workouts.
   - **Workout Creation**: In `New workout added successfully`, a valid user adds a new workout, and the server responds with `201 Created`.
   - **Unauthorized Access**: The test `Workout addition fails without token` verifies that trying to add a workout without an authorization token results in a `401 Unauthorized` response.

3. **Handling Multiple Requests**: 
   - In the `beforeEach` block, two workouts are added sequentially using `api.post("/api/workouts")`. This ensures that each test has some predefined data to work with.
   - In each test, the token is sent to the server to simulate an authenticated user, ensuring only valid users can access protected endpoints.

### Advantages of Jest for Testing Protected Routes

- **Easy Token Management**: With Jest’s `beforeAll` and `beforeEach` hooks, setting up authenticated users and managing tokens is seamless. You can ensure the token is refreshed or reused across multiple test cases.
  
- **Clear Test Organization**: Jest's `describe` and `test` blocks allow you to organize tests by route and test scenario (e.g., successful authentication vs. failed authentication).
  
- **Custom Matchers**: Jest's `expect` statements make assertions readable and powerful. For example, you can expect certain status codes (`.expect(401)` for unauthorized access) and content types (`.expect("Content-Type", /application\/json/)`) directly in your test chains.

### Testing Edge Cases

Testing protected routes requires more than just verifying that authenticated users can access data. You should also cover potential edge cases:

1. **Expired Tokens**: Test what happens when an expired JWT is sent.
   ```javascript
      it("should fail to access workouts with an expired token", async () => {
      const expiredToken = "someExpiredTokenHere";
      await api
         .get("/api/workouts")
         .set("Authorization", "bearer " + expiredToken)
         .expect(401); // Expect unauthorized due to token expiration
      });

   ```

2. **Missing Tokens**: Verify that the server rejects requests with no token or with improperly formatted tokens.
   ```javascript
      it("should fail to access workouts without a token", async () => {
      await api
         .get("/api/workouts")
         .expect(401); // No token sent, expect unauthorized
      });

      it("should fail to access workouts with a malformed token", async () => {
      const malformedToken = "invalidtoken123";
      await api
         .get("/api/workouts")
         .set("Authorization", "bearer " + malformedToken)
         .expect(401); // Expect failure due to malformed token
      });
   ```
<!-- 
### Jest vs. Mocha/Chai for Testing Protected Routes

While Mocha/Chai can also be used to test protected routes, Jest provides a few advantages:
- **Less Configuration**: Jest has built-in features like mocking and assertions, so there's no need to install additional libraries like `chai-http`.
- **Cleaner Syntax**: Jest’s `expect` method makes it simple to test HTTP status codes, response headers, and data. In contrast, Mocha/Chai often requires more setup and boilerplate.
  
For example, the same tests in Mocha/Chai might require importing `chai`, `chai-http`, and configuring token management separately. With Jest, you get a more integrated and faster testing experience. 
-->

<!-- 
### Conclusion

Testing protected routes is a critical aspect of ensuring your backend APIs are secure and behave as expected under various authentication scenarios. By using **Jest** and **Supertest**, you can easily simulate authenticated users, send tokens in requests, and validate both successful and unsuccessful access to protected routes. 

With **Jest**, you also benefit from its intuitive setup, powerful matchers, and overall simplicity, making it an excellent choice for testing Node.js applications, especially those with complex authentication requirements. 
-->

---
## Part 3: BDD vs TDD

-  `describe()`
-  `test()` vs `it()` vs `should`
-  `expect()` vs  `assert()`


Behavior-Driven Development (BDD) and Test-Driven Development (TDD) are both software development methodologies that emphasize testing early in the development process. However, they have distinct differences in their approach and focus. Here are the key differences between BDD and TDD:

1. **Focus on Language and Communication**:
   - **BDD**: BDD emphasizes natural language descriptions to define the behavior of a software system. It encourages collaboration among developers, testers, and domain experts by using common, human-readable language to describe requirements and specifications.
   - **TDD**: TDD focuses on writing test cases in code before implementing the actual functionality. While it also requires clear test descriptions, the emphasis is more on technical aspects and code-level testing.

2. **Audience**:
   - **BDD**: BDD is oriented toward a wider audience, including non-technical stakeholders like product managers, business analysts, and domain experts. It aims to bridge the gap between technical and non-technical team members.
   - **TDD**: TDD is primarily for developers and focuses on the technical aspects of testing and code quality.

3. **Testing Level**:
   - **BDD**: BDD typically focuses on high-level, end-to-end testing and acceptance testing. It often involves testing the system's behavior as a whole, simulating user interactions.
   - **TDD**: TDD is more focused on unit testing, where individual components or functions are tested in isolation. It addresses lower-level details and verifies that specific code units behave as expected.

4. **Test Description Style**:
   - **BDD**: BDD encourages the use of descriptive, user-centric test descriptions written in plain language. Common BDD tools like Cucumber and SpecFlow use "Given-When-Then" syntax.
   - **TDD**: TDD test descriptions tend to be more technical and are written in code. They often follow a naming convention like "testMethodName_shouldDoSomething."

5. **Development Process**:
   - **BDD**: In BDD, tests are often written after defining the behavior and requirements using scenarios and feature files. It drives the development process by outlining expected behavior.
   - **TDD**: TDD follows a "Red-Green-Refactor" cycle, where failing tests (Red) are written before writing the actual code to make them pass (Green). Afterward, the code is refactored for clarity and optimization.

6. **Tools and Frameworks**:
   - **BDD**: BDD commonly uses specialized tools and frameworks like Cucumber, SpecFlow, and Behave. These tools help in writing and executing tests in a human-readable format.
   - **TDD**: TDD often utilizes testing frameworks like JUnit, NUnit, or Jest, which are more code-centric and focused on unit testing.
   - **AI**: You can generate tests quickly using AI e.g. `copilot` or `ChatGPT`

7. **Granularity of Testing**:
   - **BDD**: BDD tests typically have a broader scope and may encompass multiple components or modules, testing interactions between them.
   - **TDD**: TDD tests are more fine-grained and focus on individual functions or methods.

While both BDD and TDD promote early testing, BDD places a strong emphasis on collaboration, natural language descriptions, and high-level behavior testing. TDD, on the other hand, is centered around unit testing, technical test descriptions, and a developer-centric approach. The choice between these methodologies depends on the project's requirements, team composition, and testing objectives.

---


## Part 4: Managing Different Environments in Node.js

When developing an API server in Node.js, it's important to manage different environments—such as **production**, **development**, and **test**—effectively. These environments often require different configurations, such as database connections or API keys, making environment variables crucial for separating these settings.

In this section, we'll cover why different environments are necessary, how to manage them using `.env` files, and how to use tools like `cross-env` to streamline environment switching.



#### Why Do We Need Different Environments in an API Server?

1. **Production**: This is the live environment where the application is used by real users. The production environment often requires the use of optimized code, stable databases, and security measures like encrypted credentials.
   
2. **Development**: This environment is where the app is actively built and tested by developers. Here, it's common to use debugging tools and databases that are specific to development.

3. **Testing**: The test environment is used for running automated tests. It needs its own isolated configuration to avoid impacting development or production systems, especially when testing features like database operations.

Different environments require different settings, such as:
- Databases (e.g., production uses live data, while development uses mock data).
- API keys (test keys in development, real keys in production).
- Logging levels (detailed logs in development, minimal logs in production).

#### How to Manage Environments Using `.env` Files

Node.js supports environment variables through `process.env`. The most common way to store environment variables is by using a `.env` file. This file holds environment-specific configuration that can be loaded into the application when needed.

#### Setting Up Environment Variables

1. **Install Dependencies**: Start by creating a new Node.js project and install the required packages:
   ```bash
   mkdir env-variable-lab
   cd env-variable-lab
   npm init -y
   npm install dotenv cross-env
   ```

2. **Create `.env` File**: In your project root, create a `.env` file to store different configurations:
   ```bash
   PORT=3001
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/w6-be
   TEST_MONGO_URI=mongodb://localhost:27017/TEST-w6-be
   JWT_SECRET=abc123
   ```

   This file defines different settings for development, such as the database URI and a secret key for JWT authentication.

#### Using Environment Variables in the Code

3. **Load Variables with `dotenv`**: In your configuration file (e.g., `config.js`), use the `dotenv` package to load the variables from `.env`, and use `process.env` to access them:
   
   ```js
   // config.js
   require("dotenv").config();
   
   const NODE_ENV = process.env.NODE_ENV || 'development';
   const PORT = process.env.PORT;
   const MONGO_URI = NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
   
   module.exports = {
     NODE_ENV,
     MONGO_URI,
     PORT,
   };
   ```

4. **Main Application File (`index.js`)**: Require the configuration file in your main application file to access the environment-specific settings:
   
   ```js
   // index.js
   const config = require('./config');
   
   console.log("Database URI: ", config.MONGO_URI);
   console.log("Environment: ", config.NODE_ENV);
   console.log("Running on port: ", config.PORT);
   ```

#### Switching Between Environments with `cross-env`

When running a Node.js application, you need to switch between environments like **development**, **test**, and **production**. `cross-env` is a popular package that helps manage environment variables across different operating systems.

#### Why Use `cross-env`?

Without `cross-env`, environment variables can be tricky to manage on different platforms. For example, setting variables works differently on Linux/macOS than it does on Windows. `cross-env` makes this consistent across all operating systems.

#### Setting Up `cross-env` in `package.json`

To streamline the switching between environments, use `cross-env` in your `package.json` file's scripts section:
   
```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development node index.js",
    "test": "cross-env NODE_ENV=test node index.js"
  }
}
```

Now, you can run your app in different environments by executing the following commands:
- **Production**: `npm start`
- **Development**: `npm run dev`
- **Testing**: `npm test`

Each script sets the `NODE_ENV` variable to the corresponding environment using `cross-env`, ensuring consistency across platforms.

#### Example Commands

1. **Start in Development**: This will run the app in development mode.
   ```bash
   npm run dev
   ```

2. **Start in Production**: This command switches the environment to production mode.
   ```bash
   npm start
   ```

3. **Start in Test**: Running your tests will use the test environment configuration.
   ```bash
   npm test
   ```

#### Summary: Key Steps to Manage Environments in Node.js

1. **Create a `.env` file** for storing environment-specific variables (e.g., database URIs, ports).
2. **Use `dotenv`** in your configuration file to load environment variables into `process.env`.
3. **Implement `cross-env`** in your `package.json` to easily switch between `production`, `development`, and `test` environments.
4. **Use `process.env.NODE_ENV`** to dynamically switch between environments in your code (e.g., connecting to different databases).

By using environment variables effectively, you can make your Node.js application more flexible, secure, and easier to manage across different environments like production, development, and testing.

---
## Links

- [Jest, Mocha, Chai, Supertest, and superagent](./Jest-vs-Supertest.md)
- [Supertest: How to Test APIs Like a Pro](https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/)
- [Dead-Simple API Tests With SuperTest, Mocha, and Chai](https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/)
- [Development and Production](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production)
- [Testing: Need for different databases](https://dev.to/kristianroopnarine/how-to-separate-your-test-development-and-production-databases-using-nodeenv-anl)
- [Environment variables](./env-var.md)
- [cross-env: ](https://www.npmjs.com/package/cross-env) `"start": "cross-env  NODE_ENV=production node index.js"`