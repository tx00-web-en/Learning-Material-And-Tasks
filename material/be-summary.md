# Summary – API Testing with Vitest and Supertest

* [1. The Testing Stack](#1-the-testing-stack)
* [2. Project Setup](#2-project-setup)
* [3. Vitest Configuration](#3-vitest-configuration)
* [4. Test File Structure](#4-test-file-structure)
* [5. Lifecycle Hooks](#5-lifecycle-hooks)
* [6. Making HTTP Requests with Supertest](#6-making-http-requests-with-supertest)
* [7. Testing Protected Routes (JWT)](#7-testing-protected-routes-jwt)
* [8. BDD Style – `describe` / `it`](#8-bdd-style--describe--it)
* [9. Best Practices](#9-best-practices)
* [10. Running Tests Selectively](#10-running-tests-selectively)
* [11. Fetch as an Alternative to Supertest](#11-fetch-as-an-alternative-to-supertest)
* [12. BDD vs TDD](#12-bdd-vs-tdd)
* [13. Managing Environments with `cross-env` and `dotenv`](#13-managing-environments-with-cross-env-and-dotenv)
* [Links](#links)

---

## 1. The Testing Stack

| Layer                   | Tool                        | Role                                                  |
| ----------------------- | --------------------------- | ----------------------------------------------------- |
| Test runner             | **Vitest**                  | Discovers test files, runs tests, and reports results |
| Assertions              | **Vitest `expect`**         | Verifies that values match expectations               |
| HTTP client             | **Supertest**               | Sends HTTP requests to the Express application        |
| Alternative HTTP client | **Node `fetch`** (Node 18+) | Sends HTTP requests to a running server               |

**Vitest does not make HTTP requests.**

Vitest runs the test functions and provides the testing APIs such as:

```js
describe()
it()
test()
expect()
beforeAll()
beforeEach()
afterEach()
```

Supertest is the tool that communicates with the Express API.

For example:

```js
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
```

The test can then make requests such as:

```js
await api
  .get("/api/workouts")
  .expect(200);
```

---

## 2. Project Setup

### Separate test database

A backend application should use a dedicated MongoDB database for automated tests.

For example:

```text
MONGO_URI=mongodb://...          # development / production

TEST_MONGO_URI=mongodb://...     # test runs only
```

The configuration can select the appropriate database based on `NODE_ENV`:

```js
// utils/config.js

require("dotenv").config();

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

module.exports = {
  MONGO_URI,
  PORT: process.env.PORT,
};
```

Tests often delete and recreate data during testing. Using a dedicated test database prevents automated tests from modifying development or production data.

### `package.json` scripts

A typical setup is:

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "test": "cross-env NODE_ENV=test vitest run",
    "test:watch": "cross-env NODE_ENV=test vitest"
  }
}
```

`cross-env` sets `NODE_ENV` consistently across Windows, macOS, and Linux.

The important difference between the two test commands is:

```bash
vitest run
```

runs the tests once and exits, while:

```bash
vitest
```

runs Vitest in watch mode.

---

## 3. Vitest Configuration

If the project uses **CommonJS** and does not have:

```json
"type": "module"
```

in `package.json`, create:

```text
vitest.config.mjs
```

The `.mjs` extension allows the configuration file to use ES module syntax without converting the entire application to ES modules.

A typical backend configuration is:

```js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Makes describe, test, it, expect, beforeEach, etc.
    // available globally.
    globals: true,

    // Backend tests run in Node rather than a browser environment.
    environment: "node",

    // Useful when multiple test files share the same database.
    fileParallelism: false,

    // Gives asynchronous database operations enough time to complete.
    testTimeout: 20000,
  },
});
```

### Why `globals: true`?

With:

```js
globals: true
```

test files can use:

```js
describe()
test()
it()
expect()
beforeAll()
beforeEach()
afterEach()
```

without importing each function from Vitest.

For example:

```js
describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    // ...
  });
});
```

Without `globals: true`, the functions would normally be imported:

```js
import { describe, it, expect } from "vitest";
```

### Why `environment: "node"`?

Backend API tests execute in Node.js, so Vitest should use the Node environment rather than a browser-like environment such as `jsdom`.

### Why `fileParallelism: false`?

Multiple test files may operate on the same MongoDB test database.

Disabling file-level parallelism prevents different test files from modifying the shared database at the same time.

This is particularly useful for educational projects where several API test files share the same test database.

### Why `.mjs`?

The application can continue using CommonJS:

```js
const express = require("express");

module.exports = app;
```

while the Vitest configuration uses:

```js
import { defineConfig } from "vitest/config";
```

The `.mjs` extension tells Node that `vitest.config.mjs` is an ES module.

If the entire project is later converted to ES modules by adding:

```json
{
  "type": "module"
}
```

the configuration can instead be named:

```text
vitest.config.js
```

with the same `import` / `export default` syntax.

---

## 4. Test File Structure

### Imports and wiring Supertest

A CommonJS backend test might begin with:

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");
```

`supertest(app)` creates a Supertest client around the Express application.

The application should normally be exported separately from the file that starts the production server.

### Test data and a database helper

```js
const initialWorkouts = [
  { title: "test workout 1", reps: 11, load: 101 },
  { title: "test workout 2", reps: 12, load: 102 },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});

  return workouts.map((w) => w.toJSON());
};
```

* `initialWorkouts` is the **fixed, known state** used to prepare the database for tests.
* Controlling the starting state makes tests predictable.
* `workoutsInDb()` reads the database directly.
* Database helpers allow tests to verify that an HTTP operation actually persisted the expected change.

### External fixture files

In larger projects, fixture data can live in a dedicated file:

```js
// tests/data/workouts.js

const workouts = [
  { title: "Workout 2023-10-05", reps: 35, load: 20 },
  { title: "Workout 2023-10-06", reps: 11, load: 101 },
];

module.exports = workouts;
```

The test can then import the fixture:

```js
// workout.test.js

const workouts = require("./data/workouts.js");
```

Benefits:

* test files stay focused on assertions
* multiple test files can share fixtures
* fixture data can be changed in one place

---

## 5. Lifecycle Hooks

Vitest provides lifecycle hooks for preparing test state and performing repeated setup.

| Hook         | When it runs                     | Typical use                   |
| ------------ | -------------------------------- | ----------------------------- |
| `beforeAll`  | Once before the tests in a suite | One-time setup                |
| `beforeEach` | Before every test                | Reset mutable test data       |
| `afterEach`  | After every test                 | Reset mocks or per-test state |

### `beforeEach`

A common API testing pattern is to reset the database before each test:

```js
beforeEach(async () => {
  await Workout.deleteMany({});
  await Workout.insertMany(initialWorkouts);
});
```

### Why use `beforeEach` for database reset?

Suppose one test creates a new workout.

If the next test expects exactly two workouts, the first test could affect the second test.

Resetting the collection before every test creates a known starting state:

```text
Test 1
  ↓
reset database
  ↓
run test


Test 2
  ↓
reset database
  ↓
run test


Test 3
  ↓
reset database
  ↓
run test
```

This makes tests independent and predictable.

### `beforeAll`

Use `beforeAll` when some setup only needs to happen once for a group of tests.

For example, a test suite that requires an authenticated user can create the user once and save the token:

```js
let token = null;

beforeAll(async () => {
  await User.deleteMany({});

  const result = await api
    .post("/api/user/signup")
    .send({
      email: "test@example.com",
      password: "R3g5T7#gh",
    });

  token = result.body.token;
});
```

---

## 6. Making HTTP Requests with Supertest

### GET request

```js
it("should return workouts as JSON with status 200", async () => {
  await api
    .get("/api/workouts")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
```

### POST request with a body

```js
it("should persist a valid workout and include it in subsequent GET", async () => {
  const newWorkout = {
    title: "Situps",
    reps: 25,
    load: 10,
  };

  await api
    .post("/api/workouts")
    .send(newWorkout)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/workouts");

  expect(response.body).toHaveLength(initialWorkouts.length + 1);
  expect(response.body.map((w) => w.title)).toContain("Situps");
});
```

### DELETE with a database snapshot

```js
it("should delete the workout and return status 204 when the id is valid", async () => {
  const workoutsAtStart = await workoutsInDb();

  const workoutToDelete = workoutsAtStart[0];

  await api
    .delete(`/api/workouts/${workoutToDelete.id}`)
    .expect(204);

  const workoutsAtEnd = await workoutsInDb();

  expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

  expect(
    workoutsAtEnd.map((w) => w.title)
  ).not.toContain(workoutToDelete.title);
});
```

**Never hard-code a MongoDB `_id` in a test.**

IDs are generated when documents are inserted and can change between test runs.

Instead:

1. Read the current document.
2. Obtain its current ID.
3. Perform the operation.
4. Verify the result.

This is sometimes called the **snapshot-before pattern**.

### Why use a regex for `Content-Type`?

Express commonly sends:

```text
application/json; charset=utf-8
```

Therefore:

```js
.expect("Content-Type", /application\/json/)
```

matches the important part of the header without requiring an exact match.

---

## 7. Testing Protected Routes (JWT)

### Obtaining a token once with `beforeAll`

```js
let token = null;

beforeAll(async () => {
  await User.deleteMany({});

  const result = await api
    .post("/api/user/signup")
    .send({
      email: "test@example.com",
      password: "R3g5T7#gh",
    });

  token = result.body.token;
});
```

`beforeAll` runs once for the relevant test suite.

The token is stored in a variable that the tests can use when making authenticated requests.

### Attaching the token to requests

```js
it("should return workouts as JSON for an authenticated user", async () => {
  await api
    .get("/api/workouts")
    .set("Authorization", "bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
```

`.set()` adds an HTTP header to the request.

The authentication middleware reads the `Authorization` header, extracts the token, verifies it, and either allows the request to continue or returns an authentication error.

### Testing the unauthenticated case

```js
it("should return 401 when no token is provided", async () => {
  await api
    .get("/api/workouts")
    .expect(401);
});

it("should return 401 when the token is malformed", async () => {
  await api
    .get("/api/workouts")
    .set("Authorization", "bearer invalidtoken123")
    .expect(401);
});
```

Always test both:

* successful authenticated requests
* unsuccessful authentication attempts

This verifies both the success path and the security boundary.

### Full example with CRUD operations

```js
describe("POST /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
  });

  describe("when the payload is valid", () => {
    it("should create a workout and return status 201", async () => {
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send({
          title: "Situps",
          reps: 25,
          load: 10,
        })
        .expect(201);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send({
          reps: 10,
          load: 100,
        })
        .expect(400);
    });
  });
});

describe("DELETE /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});

    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send({
        title: "Situps",
        reps: 25,
        load: 10,
      });
  });

  it("should remove the workout and return status 200", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);

    const id = all.body[0]._id;

    await api
      .delete(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .expect(200);

    const remaining = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);

    expect(remaining.body).toHaveLength(0);
  });
});

describe("PATCH /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});

    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send({
        title: "Situps",
        reps: 25,
        load: 10,
      });
  });

  it("should persist updated fields and return status 200", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);

    const id = all.body[0]._id;

    await api
      .patch(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .send({ reps: 99 })
      .expect(200);

    const updated = await api
      .get(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token);

    expect(updated.body.reps).toBe(99);
  });
});
```

---

## 8. BDD Style – `describe` / `it`

Vitest supports both `test()` and `it()`.

Using `it()` together with well-named `describe()` blocks can make tests read like specifications:

> "GET /api/workouts — it should return all workouts."

### One `describe` block per route / action

Rather than putting everything into one large test block, group tests by HTTP method and route:

```js
describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    // ...
  });

  it("should return workouts as JSON with status 200", async () => {
    // ...
  });
});

describe("POST /api/workouts", () => {
  describe("when the payload is valid", () => {
    it("should return status 201", async () => {
      // ...
    });

    it("should persist the workout in the database", async () => {
      // ...
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      // ...
    });
  });
});

describe("DELETE /api/workouts/:id", () => {
  describe("when the id is valid", () => {
    it("should return status 204", async () => {
      // ...
    });

    it("should remove the workout from the database", async () => {
      // ...
    });
  });
});
```

### Guidelines

* One `describe` per HTTP verb / resource action.
* Nest `describe` blocks to model scenarios.
* Keep each `it` focused on a single observable outcome.
* Give tests descriptive names.
* Use route names in `describe` blocks so the test output is easy to understand.

---

## 9. Best Practices

### Separate `app.js` from `index.js`

```js
// index.js – production entry point

const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
```

```js
// app.js – imported by tests and index.js
const express = require("express");
const app = express();

// middleware and routes...

module.exports = app;
```

The important idea is that `app.js` defines and exports the Express application, while `index.js` starts the network server.

This allows API tests to import the Express application directly:

```js
const app = require("../app");

const api = supertest(app);
```

| File       | Used by                  |
| ---------- | ------------------------ |
| `app.js`   | Tests and `index.js`     |
| `index.js` | Production / `npm start` |

### Use a separate test database

Point `TEST_MONGO_URI` at a dedicated database.

Tests may delete and recreate collections, so they should never operate on development or production data.

### Snapshot before, act, snapshot after

For DELETE and UPDATE tests:

1. Read the database to obtain a real `_id`.
2. Perform the operation.
3. Read the database again.
4. Verify that the expected change persisted.

### Keep test data in fixture files

For suites with many tests, move fixture arrays to `tests/data/`.

This keeps test files focused on behavior and assertions.

<!-- 
### Use Vitest mocks and spies when needed

Vitest provides mocking and spying APIs through `vi`.

Common examples:

```js
vi.fn()
vi.spyOn(object, "method")
vi.mock("./module")
```

If the test file does not use global Vitest APIs, they can be imported explicitly:

```js
import { vi } from "vitest";
```

The exact mocking setup can depend on whether the project uses CommonJS or ES modules. 
-->

### Test coverage


> **Note:** To use Vitest coverage with `--coverage`, install the `vitest coverage` dependency first.

Vitest can generate coverage reports.

Depending on the coverage provider configured for the project, a typical command is:

```bash
npm test -- --coverage
```

Coverage reports can measure areas such as:

* statements
* branches
* functions
* lines

100% coverage does not guarantee that an application has no bugs. Good assertions and meaningful test cases are still essential.

---

## 10. Running Tests Selectively

Vitest provides several ways to run only part of a test suite.

### `it.only` – run one test

```js
it.only("should return all workouts", async () => {
  // ...
});
```

This focuses the test run on that test.

**Never commit `.only` to version control.**

Otherwise, other tests may silently stop running.

### `it.skip` – skip a test

```js
it.skip("feature not yet implemented", async () => {
  // ...
});
```

The test remains in the suite but is not executed.

### Run a specific file

You can pass a test file to Vitest. For example:

```bash
npm test -- tests/workout.test.js
```


### Run tests matching a name

Vitest supports test-name filtering with. The pattern can match part of a test name.

For example:

```bash
npm test -- -t "GET /api/workouts"
```

### The double `--` explained

When using an npm script:

```bash
npm test -- -t "GET /api/workouts"
```

the first `--` tells npm to forward the following arguments to the command defined by the `test` script.

The resulting command is effectively: `vitest run -t "GET /api/workouts`

### Sequential test file execution

For a backend that shares a MongoDB database, use the Vitest configuration:

```js
fileParallelism: false
```

when sequential test-file execution is needed.

---

## 11. Fetch as an Alternative to Supertest

With Node.js 18+, `fetch` is built in.

It can be used as an alternative to Supertest when you want to test the API through an actual HTTP server.

### Key difference: server lifecycle

With Supertest:

```js
const api = supertest(app);

const response = await api
  .get("/api/workouts")
  .expect(200);
```

You can test the Express application directly without choosing a port yourself.

With `fetch`, you need a real server URL:

```js
const response = await fetch(
  "http://localhost:3005/api/workouts"
);

expect(response.status).toBe(200);
```

This means the test setup must arrange for an HTTP server to be available.

### Side-by-side comparison

| Operation                 | Supertest                                    | Fetch                                               |
| ------------------------- | -------------------------------------------- | --------------------------------------------------- |
| GET                       | `await api.get("/api/workouts").expect(200)` | `await fetch("http://localhost:3005/api/workouts")` |
| POST                      | `api.post(...).send(body)`                   | `fetch(url, { method: "POST", ... })`               |
| Response body             | `response.body`                              | `await response.json()`                             |
| Content-Type              | `.expect("Content-Type", /json/)`            | `response.headers.get("content-type")`              |
| Requires real HTTP server | No                                           | Yes                                                 |

### Pros and cons

|                                 | Supertest                | Fetch            |
| ------------------------------- | ------------------------ | ---------------- |
| Additional dependency           | Yes                      | No, Node 18+     |
| Works directly with Express app | Yes                      | No               |
| Real HTTP connection            | No                       | Yes              |
| Server management               | Minimal                  | Required         |
| API style                       | Express testing oriented | Standard web API |

### When to choose each

| Situation                               | Possible choice |
| --------------------------------------- | --------------- |
| Backend API testing                     | **Supertest**   |
| No additional HTTP testing dependency   | **Fetch**       |
| Learning HTTP fundamentals              | **Fetch**       |
| Testing an Express application directly | **Supertest**   |

Supertest is particularly convenient for integration testing an Express application because the test can work directly with the `app` object.

---

## 12. BDD vs TDD

Both methodologies encourage systematic testing, but they emphasize different aspects.

| Dimension     | TDD                        | BDD                                   |
| ------------- | -------------------------- | ------------------------------------- |
| Primary focus | Development through tests  | Describing observable behavior        |
| Typical level | Unit and integration tests | Behavior and acceptance               |
| Language      | Code-centric               | Human-readable                        |
| Cycle         | Red → Green → Refactor     | Specify → Implement → Verify          |
| Tools         | Many testing frameworks    | Many testing frameworks and BDD tools |
| Focus         | Implementation behavior    | Observable system behavior            |

Vitest can be used for both styles.

Using `describe()` / `it()` with behavior-focused names is a lightweight BDD-style approach that does not require a separate BDD framework.

### TDD-flavored naming

```js
test("deleteWorkout_shouldReturn204_whenIdValid", async () => {
  // ...
});
```

### BDD-flavored naming

```js
describe("DELETE /api/workouts/:id", () => {
  describe("when the id is valid", () => {
    it("should return status 204", async () => {
      // ...
    });
  });
});
```

The second style communicates the behavior and expected outcome directly.

---

## 13. Managing Environments with `cross-env` and `dotenv`

### Why separate environments?

| Environment   | Purpose                                |
| ------------- | -------------------------------------- |
| `production`  | Live users and real data               |
| `development` | Local development and debugging        |
| `test`        | Automated tests and isolated test data |

### `.env` file

```text
PORT=3001

MONGO_URI=mongodb://localhost:27017/workout-app

TEST_MONGO_URI=mongodb://localhost:27017/workout-app-test

SECRET=your_jwt_secret
```

Never commit real secrets or `.env` files containing credentials to version control.

Commit an `.env.example` containing placeholder values instead.

### Loading variables with `dotenv`

```js
// utils/config.js

require("dotenv").config();

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

module.exports = {
  MONGO_URI,
  PORT: process.env.PORT,
};
```

### Switching environments with `cross-env`

`cross-env` makes environment-variable commands work consistently across operating systems.

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "test": "cross-env NODE_ENV=test vitest run"
  }
}
```

When you run:

```bash
npm test
```

the command sets:

```text
NODE_ENV=test
```

which causes the application configuration to select:

```text
TEST_MONGO_URI
```

instead of:

```text
MONGO_URI
```

This means you do not need to manually switch database configuration before running tests.

---

## Links

* [Vitest documentation](https://vitest.dev/guide/)
* [Vitest configuration](https://vitest.dev/config/)
* [Vitest migration from Jest](https://vitest.dev/guide/migration.html)
* [Vitest API](https://vitest.dev/api/)
* [Supertest on npm](https://www.npmjs.com/package/supertest)
* [Node.js built-in `fetch`](https://nodejs.org/dist/latest/docs/api/globals.html#fetch)
* [jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)
* [cross-env on npm](https://www.npmjs.com/package/cross-env)
* [dotenv on npm](https://www.npmjs.com/package/dotenv)
* [Node.js – development vs production](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production)
* [Separating test / development / production databases](https://dev.to/kristianroopnarine/how-to-separate-your-test-development-and-production-databases-using-nodeenv-anl)
