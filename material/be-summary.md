# Summary – API Testing with Jest and Supertest

- [1. The Testing Stack](#1-the-testing-stack)
- [2. Project Setup](#2-project-setup)
- [3. Test File Structure](#3-test-file-structure)
- [4. Lifecycle Hooks](#4-lifecycle-hooks)
- [5. Making HTTP Requests with Supertest](#5-making-http-requests-with-supertest)
- [6. Testing Protected Routes (JWT)](#6-testing-protected-routes-jwt)
- [7. BDD Style – `describe` / `it`](#7-bdd-style--describe--it)
- [8. Best Practices](#8-best-practices)
- [9. Running Tests Selectively](#9-running-tests-selectively)
- [10. Fetch as an Alternative to Supertest](#10-fetch-as-an-alternative-to-supertest)
- [11. BDD vs TDD](#11-bdd-vs-tdd)
- [12. Managing Environments with `cross-env` and `dotenv`](#12-managing-environments-with-cross-env-and-dotenv)
- [Links](#links)

---

## 1. The Testing Stack

| Layer | Tool | Role |
|---|---|---|
| Test runner | **Jest** | Discovers test files, runs them, reports results |
| Assertions | **Jest `expect`** | Verifies that values match expectations |
| HTTP client | **Supertest** | Sends HTTP requests to the Express app without starting a real server |
| Alternative HTTP client | **Node `fetch`** (Node 18+) | Sends real HTTP requests to a manually started server |

**Jest does not make HTTP requests.** It only runs your test functions and checks assertions. Supertest (or `fetch`) is the tool that actually talks to the API.

---

## 2. Project Setup

### Separate test database

Every project uses two MongoDB connection strings in `.env`:

```
MONGO_URI=mongodb://...         # development / production
TEST_MONGO_URI=mongodb://...    # test runs only
```

The config file switches between them based on `NODE_ENV`:

```js
// utils/config.js
require("dotenv").config();

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

module.exports = { MONGO_URI, PORT: process.env.PORT };
```

Tests routinely wipe and recreate data. Pointing them at a dedicated database keeps development data safe and makes every test run deterministic.

### `package.json` scripts

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev":   "cross-env NODE_ENV=development nodemon index.js",
    "test":  "cross-env NODE_ENV=test jest --verbose --runInBand"
  }
}
```

`cross-env` sets `NODE_ENV` consistently across Windows, macOS, and Linux.  
`--runInBand` forces Jest to run test files sequentially, which avoids race conditions when multiple files share the same database.

---

## 3. Test File Structure

### Imports and wiring Supertest

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");       // Express app – no app.listen()
const api = supertest(app);          // Supertest manages its own internal server
const Workout = require("../models/workoutModel");
```

`supertest(app)` wraps the Express app and handles all HTTP transport internally. The app never binds to a real network port, so there are no port conflicts.

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

- `initialWorkouts` is the **fixed, known state** the database is reset to before every test. Controlling the starting state makes tests deterministic.
- `workoutsInDb()` reads the database directly. Tests use it to verify that an operation actually persisted (or removed) data, not just that the HTTP response looked correct.

### External fixture files (v2)

In larger projects, fixture data lives in a dedicated file:

```js
// tests/data/workouts.js
const workouts = [
  { title: "Workout 2023-10-05", reps: 35, load: 20 },
  { title: "Workout 2023-10-06", reps: 11, load: 101 },
];
module.exports = workouts;
```

```js
// workout.test.js
const workouts = require("./data/workouts.js");
```

Benefits: the test file stays focused on assertions; multiple test files can share the same fixtures; changing a fixture value only requires editing one file.

---

## 4. Lifecycle Hooks

| Hook | When it runs | Typical use |
|---|---|---|
| `beforeAll` | Once before the entire suite (or `describe` block) | Expensive one-time setup – e.g. sign up a user and save the JWT token |
| `beforeEach` | Before every single test | Reset mutable state – wipe the collection and re-seed it |
| `afterAll` | Once after all tests finish | Cleanup that only needs to happen once – close the DB connection |
| `afterEach` | After every single test | Rarely needed; useful for resetting mocks |

```js
// ── called once ───────────────────────────────────────────────
afterAll(() => {
  mongoose.connection.close(); // prevents Jest from hanging
});

// ── called before every test ──────────────────────────────────
beforeEach(async () => {
  await Workout.deleteMany({});
  await Workout.insertMany(initialWorkouts);
});
```

> **Why `beforeEach` for database reset?**  
> If one test adds a document and the next test expects only the initial count, the second test will fail. Resetting before every test guarantees independence – a test can never be broken by what a previous test did.

> **Why `afterAll` for connection close?**  
> Without this, Mongoose keeps the connection open and Jest waits indefinitely. Always close the connection once after all tests, not after every test.

---

## 5. Making HTTP Requests with Supertest

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
  const newWorkout = { title: "Situps", reps: 25, load: 10 };

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

  await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

  const workoutsAtEnd = await workoutsInDb();
  expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);
  expect(workoutsAtEnd.map((w) => w.title)).not.toContain(workoutToDelete.title);
});
```

**Never hard-code a MongoDB `_id` in a test.** IDs are generated at insert time and change on every `beforeEach`. Always read current IDs from the database first (snapshot-before pattern).

### Why use regex for `Content-Type`?

Express sends `application/json; charset=utf-8`. An exact string match would fail because of the `; charset=utf-8` suffix. The regex `/application\/json/` matches as long as `application/json` appears anywhere in the header value.

---

## 6. Testing Protected Routes (JWT)

### Obtaining a token once with `beforeAll`

```js
let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});
```

`beforeAll` runs once for the entire suite. Signing up inside `beforeEach` would be wasteful (repeated on every test) and would hit duplicate-email errors on the second run. The token is stored in the module-level `let token` variable so every `describe` block can read it.

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

`.set("Authorization", "bearer " + token)` adds the `Authorization` HTTP header. The `requireAuth` middleware on the server reads this header, extracts the token string (after the space), verifies it with `jwt.verify`, and either calls `next()` or returns `401`.

### Testing the unauthenticated case

```js
it("should return 401 when no token is provided", async () => {
  await api.get("/api/workouts").expect(401);
});

it("should return 401 when the token is malformed", async () => {
  await api
    .get("/api/workouts")
    .set("Authorization", "bearer invalidtoken123")
    .expect(401);
});
```

Always test the failure path alongside the success path. A route that only returns the right data for valid tokens – but does not actually reject invalid ones – is not secure.

### Full example with all CRUD operations

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
        .send({ title: "Situps", reps: 25, load: 10 })
        .expect(201);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send({ reps: 10, load: 100 })
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
      .send({ title: "Situps", reps: 25, load: 10 });
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
      .send({ title: "Situps", reps: 25, load: 10 });
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

## 7. BDD Style – `describe` / `it`

Jest allows `it()` as an alias for `test()`. Using `it` with well-named `describe` blocks makes tests read like a specification in plain English:

> *"GET /api/workouts — it should return all workouts"*

### One `describe` block per route / action

Rather than one large block, group tests by HTTP verb and route:

```js
describe("GET /api/workouts", () => {
  it("should return all workouts", async () => { ... });
  it("should return workouts as JSON with status 200", async () => { ... });
});

describe("POST /api/workouts", () => {
  describe("when the payload is valid", () => {
    it("should return status 201", async () => { ... });
    it("should persist the workout in the database", async () => { ... });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => { ... });
    it("should not increase the number of workouts", async () => { ... });
  });
});

describe("DELETE /api/workouts/:id", () => {
  describe("when the id is valid", () => {
    it("should return status 204", async () => { ... });
    it("should remove the workout from the database", async () => { ... });
  });
});
```

**Guidelines:**
- One `describe` per HTTP verb / resource action.
- Nest `describe` blocks to model sub-scenarios (valid payload, invalid payload, no token).
- Keep each `it` focused on a single observable outcome.
- Name `describe` blocks after the route so Jest output groups failures clearly.

---

## 8. Best Practices

### Separate `app.js` from `index.js`

```js
// index.js – production entry point only
const app = require("./app");
const http = require("http");
const config = require("./utils/config");

const server = http.createServer(app);
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
```

```js
// app.js – imported by both tests and index.js
const express = require("express");
const app = express();
// ... middleware and routes ...
module.exports = app;
```

If `app.js` called `app.listen()` itself, Supertest and `index.js` would both try to bind the same port and conflict. Keeping the `listen()` call in `index.js` prevents this entirely.

| File | Used by |
|---|---|
| `app.js` | Tests (via Supertest) and `index.js` |
| `index.js` | Production / `npm start` only |

### Use a separate test database

Point `TEST_MONGO_URI` at a dedicated database. Tests wipe collections on every run and must never touch development or production data.

### Snapshot before, act, snapshot after

For DELETE and UPDATE tests:
1. Read the database to get a real `_id`.
2. Perform the operation.
3. Read the database again to confirm the change persisted.

### Keep test data in fixture files

For suites with many tests, move fixture arrays to `tests/data/` and import them. The test file stays focused on assertions.

### Test coverage

```bash
npm test -- --coverage
```

Jest generates a report showing **statements**, **branches**, **functions**, and **lines** covered. 100% coverage does not mean zero bugs – the quality of assertions still matters – but low coverage on a critical module is a warning sign.

---

## 9. Running Tests Selectively

### `it.only` – run just one test

```js
it.only("should return all workouts", async () => { ... });
```

Jest skips every other test in the file. **Never commit `.only` to version control** – it silently disables all other tests and can give a false sense of confidence.

### `it.skip` – mark a test as pending

```js
it.skip("feature not yet implemented", async () => { ... });
```

Jest reports it as skipped rather than failing.

### Run a specific file

```bash
npm test -- tests/workout_api.test.js
```

### Run tests matching a name pattern

```bash
npm test -- --testNamePattern="GET /api/workouts"
```

The argument can be a full test name, a partial string, or a `describe` block label.

### The double `--` explained

```
npm test  --  --testNamePattern="..."
         ↑           ↑
    npm stops here   passed straight to Jest
```

The first `--` tells npm to stop parsing its own options and forward everything after it directly to the underlying script (Jest). Without it, npm tries to interpret `--testNamePattern` itself and throws an error.

---

## 10. Fetch as an Alternative to Supertest

With Node.js 18+, `fetch` is built in. It is a practical alternative to Supertest, especially if you want zero extra production dependencies or a consistent HTTP API across frontend and backend tests.

### Key difference: server lifecycle

```js
// Supertest – no server management needed
const api = supertest(app);

// Fetch – you must start and stop the server yourself
let server;

beforeAll((done) => {
  server = app.listen(3005, done);
});

afterAll((done) => {
  server.close(done);
});
```

Supertest calls `app.listen(0)` internally, using an OS-assigned ephemeral port, so there are never port conflicts. With `fetch` you manage this explicitly.

### Side-by-side comparison

| Operation | Supertest | Fetch |
|---|---|---|
| GET | `await api.get("/api/workouts").expect(200)` | `const res = await fetch("http://localhost:3005/api/workouts"); expect(res.status).toBe(200)` |
| POST | `await api.post(...).send(body).expect(201)` | `fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(body) })` |
| Response body | `response.body` (auto-parsed) | `await res.json()` (must call manually) |
| Content-Type | `.expect("Content-Type", /json/)` | `expect(res.headers.get("content-type")).toMatch(/json/)` |

### Pros and cons

| | Supertest | Fetch |
|---|---|---|
| Dependencies | `npm install supertest` | None (Node 18+) |
| Server setup | Automatic | Manual (`beforeAll` / `afterAll`) |
| Speed | Slightly faster (no network socket) | Slightly slower (real TCP connection) |
| Port conflicts | Impossible (ephemeral port) | Possible if port is already in use |
| Familiar to frontend devs | No | Yes |

### When to choose each

| Situation | Recommendation |
|---|---|
| Backend-only project, fast CI | **Supertest** |
| Node 18+, zero extra dependencies | **Fetch** is viable |
| Unified API across frontend and backend tests | **Fetch** |
| Learning HTTP fundamentals | **Fetch** – the explicit lifecycle is instructive |

### `beforeAll` – two equivalent patterns

```js
// Pattern 1: callback-based
beforeAll((done) => {
  server = app.listen(3005, done);
});

// Pattern 2: promise-based
beforeAll(async () => {
  await new Promise((resolve) => {
    server = app.listen(3005, resolve);
  });
});
```

Jest waits for `done()` to be called (pattern 1) or for the returned Promise to settle (pattern 2) before running any tests.

---

## 11. BDD vs TDD

Both methodologies emphasize writing tests early, but they differ in scope and audience.

| Dimension | TDD | BDD |
|---|---|---|
| Primary audience | Developers | Developers + non-technical stakeholders |
| Level | Unit tests | Integration / acceptance tests |
| Language | Code-centric (`testMethodName_shouldBehave`) | Human-readable (`describe / it / should`) |
| Cycle | Red → Green → Refactor | Specify behavior → Implement → Verify |
| Tools | Jest, JUnit, NUnit | Jest (with `it`), Cucumber, SpecFlow |
| Focus | Individual functions / methods | Observable system behavior |

In practice, Jest supports both styles. Using `describe` / `it` with behavior-focused names is a lightweight form of BDD that does not require a separate tool.

```js
// TDD-flavored naming
test("deleteWorkout_shouldReturn204_whenIdValid", async () => { ... });

// BDD-flavored naming
describe("DELETE /api/workouts/:id", () => {
  describe("when the id is valid", () => {
    it("should return status 204", async () => { ... });
  });
});
```

The second form reads as a sentence and communicates intent to anyone reading the test output, not just developers.

---

## 12. Managing Environments with `cross-env` and `dotenv`

### Why separate environments?

| Environment | Purpose |
|---|---|
| `production` | Live users, real data, real credentials |
| `development` | Active development, local data, debugging tools |
| `test` | Automated test runs, isolated database, deterministic data |

### `.env` file

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/workout-app
TEST_MONGO_URI=mongodb://localhost:27017/workout-app-test
SECRET=your_jwt_secret
```

Never commit `.env` to version control. Commit `.env.example` with placeholder values instead.

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

Without `cross-env`, setting environment variables works differently on Windows (`set NODE_ENV=test`) versus Linux/macOS (`NODE_ENV=test`). `cross-env` normalises this:

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev":   "cross-env NODE_ENV=development nodemon index.js",
    "test":  "cross-env NODE_ENV=test jest --verbose --runInBand"
  }
}
```

Running `npm test` automatically sets `NODE_ENV=test`, which causes `config.js` to use `TEST_MONGO_URI` instead of `MONGO_URI`. No manual switching required.

---

## Links

- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Jest – `test()` and `it()`](https://jestjs.io/docs/api#testname-fn-timeout)
- [Jest – async setup with `done` and promises](https://jestjs.io/docs/asynchronous)
- [Jest – `--coverage`](https://jestjs.io/docs/cli#--coverageboolean)
- [Skip / only tests in Jest](https://codewithhugo.com/run-skip-single-jest-test/)
- [Supertest on npm](https://www.npmjs.com/package/supertest)
- [Supertest: How to Test APIs Like a Pro](https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/)
- [Dead-Simple API Tests With SuperTest, Mocha, and Chai](https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/)
- [Node.js built-in fetch (Node 18+)](https://nodejs.org/dist/latest/docs/api/globals.html#fetch)
- [jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)
- [cross-env on npm](https://www.npmjs.com/package/cross-env)
- [dotenv on npm](https://www.npmjs.com/package/dotenv)
- [Node.js – development vs production](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production)
- [Separating test / dev / prod databases](https://dev.to/kristianroopnarine/how-to-separate-your-test-development-and-production-databases-using-nodeenv-anl)
