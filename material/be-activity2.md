# Lab 2 – Testing Protected Routes with JWT Authentication

In Lab 1 you learned the fundamentals of API testing with Jest and Supertest.  
In this lab you will work with a **more realistic API** where every workout route is protected by a JWT access token. You will learn how to obtain a token inside your test setup and how to attach it to every request.

---

## Part 1 – Project Setup

1. Clone the [starter repository](https://github.com/tx00-resources-en/week6-be-workout-v2).  
   After cloning, **delete** the `.git` directory.

2. Rename `.env.example` to `.env`.  
   The file defines two MongoDB connection strings – one for development, one for testing – just like in Lab 1.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the test suite:
   ```bash
   npm test
   ```

5. Open `tests/workout.test.js` and read through it before you start changing anything.  
   The tasks in this lab ask you to refactor and extend this file.

---

## Part 2 – Understanding the Test File

### 2.1 What is new compared to Lab 1?

The v2 API adds two things:

| Feature | Where it lives |
|---|---|
| User authentication (signup / login) | `routes/user.js` → `controllers/userController.js` |
| JWT middleware that protects all workout routes | `middleware/requireAuth.js` |

Because every request to `/api/workouts` now requires a valid JWT, the tests must **obtain a token first** and **attach it to every request**.

---

### 2.2 Imports

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");
```

Two things are new here compared to Lab 1:

| Addition | Why |
|---|---|
| `require("../models/userModel")` | Lets the test wipe the user collection in `beforeAll` so signup always starts clean. |
| `require("./data/workouts.js")` | Loads a shared array of workout fixtures from a dedicated file instead of defining them inline. Keeping test data in a separate file makes it reusable across multiple test files. |

---

### 2.3 `beforeAll` – signing up once and saving the token

```js
let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

afterAll(() => {
  mongoose.connection.close();
});
```

**Key concepts:**

| Concept | Explanation |
|---|---|
| `beforeAll` (not `beforeEach`) | The signup only needs to happen **once** for the whole suite. The resulting token stays valid for all tests. Using `beforeEach` here would be wasteful (signup on every test) and prone to unique-email collisions. |
| `let token = null` outside all blocks | Declares `token` in the module scope so every `describe` block and test can read it. |
| `await User.deleteMany({})` | Ensures a clean user collection before signup. If a previous test run left the email in the database the signup would fail with a duplicate-email error. |
| `token = result.body.token` | Stores the JWT returned by the signup endpoint. Every subsequent request simply reads this variable. |
| `afterAll` closes the connection | Same reason as Lab 1 – prevents Jest from hanging after tests complete. |

---

### 2.4 The `describe` block with `beforeEach` and the Authorization header

```js
describe("when there is initially some workouts saved", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0])
      .send(workouts[1]);
  });

  test("Workouts are returned as json", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("New workout added successfully", async () => {
    const newWorkout = { title: "testworkout", reps: 10, load: 100 };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
  });
});
```

**Key concepts:**

| Concept | Explanation |
|---|---|
| `.set("Authorization", "bearer " + token)` | Adds the `Authorization` HTTP header to the request. The `requireAuth` middleware reads this header, extracts the token, and verifies it with the JWT secret. Without this header the server returns `401 Unauthorized`. |
| `beforeEach` resets workouts | Every test starts with exactly two known workouts, just like Lab 1. |
| `workouts[0]`, `workouts[1]` | From `tests/data/workouts.js` – a shared fixture file. Using an external file keeps the test file readable when the fixture data grows. |

**What happens if you omit the Authorization header?**

The `requireAuth` middleware will return:
```json
{ "error": "Authorization token required" }
```
with status `401`, and your test will fail on the expected status code assertion.

---

### 2.5 How `requireAuth` works (the middleware)

```js
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1]; // ["bearer", "<token>"]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};
```

The middleware:
1. Reads the `Authorization` header.
2. Splits on the space to isolate the token string after `bearer `.
3. Verifies the token with `jwt.verify`. If it is valid, it attaches the user's `_id` to `req.user` and calls `next()` to let the request continue.
4. If verification fails (expired, tampered, missing), it returns `401`.

The route file applies this middleware to **all** workout routes:

```js
router.use(requireAuth); // applied before any route handler
```

---

## Part 3 – Refactoring in BDD Style with Multiple `describe` Blocks

Rewrite `tests/workout.test.js` so that it:
- Uses `it()` instead of `test()`.
- Groups tests into **one `describe` block per API action/route**, rather than one large block.
- Uses nested `describe` blocks to model valid and invalid scenarios within a route.
- Reads like a natural-language specification.

Target output shape in the Jest reporter:

```
POST /api/user/signup
  ✓ should return a token on successful signup

GET /api/workouts
  ✓ should return workouts as JSON with status 200

POST /api/workouts
  when the payload is valid
    ✓ should create a workout and return status 201
  when the payload is invalid
    ✓ should return status 400 when title is missing
```

**Your task:** Refactor the entire file to match this style.

<details>
<summary>Sample solution – click to expand</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

afterAll(() => {
  mongoose.connection.close();
});

// ─── POST /api/user/signup ────────────────────────────────────────────────────

describe("POST /api/user/signup", () => {
  it("should return a token on successful signup", async () => {
    // token was already obtained in beforeAll – just verify it is not null
    expect(token).not.toBeNull();
  });
});

// ─── GET /api/workouts ────────────────────────────────────────────────────────

describe("GET /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[1]);
  });

  it("should return workouts as JSON with status 200", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return all workouts belonging to the authenticated user", async () => {
    const response = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body).toHaveLength(2);
  });

  it("should return 401 when no token is provided", async () => {
    await api.get("/api/workouts").expect(401);
  });
});

// ─── POST /api/workouts ───────────────────────────────────────────────────────

describe("POST /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
  });

  describe("when the payload is valid", () => {
    it("should create a workout and return status 201", async () => {
      const newWorkout = { title: "testworkout", reps: 10, load: 100 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(201);
    });

    it("should persist the new workout in the database", async () => {
      const newWorkout = { title: "Situps", reps: 25, load: 10 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(201);

      const response = await api
        .get("/api/workouts")
        .set("Authorization", "bearer " + token);

      const titles = response.body.map((w) => w.title);
      expect(titles).toContain("Situps");
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      const newWorkout = { reps: 10, load: 100 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(400);
    });

    it("should not increase the number of workouts when payload is invalid", async () => {
      const newWorkout = { reps: 10 };
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout);

      const response = await api
        .get("/api/workouts")
        .set("Authorization", "bearer " + token);

      expect(response.body).toHaveLength(0);
    });
  });
});
```

</details>

---

## Part 4 – Writing Additional Tests

Extend the test suite to cover three more workout operations:

| Operation | Route | Expected status |
|---|---|---|
| Read single workout | `GET /api/workouts/:id` | `200` |
| Delete a workout | `DELETE /api/workouts/:id` | `200` |
| Update a workout | `PATCH /api/workouts/:id` | `200` |

**Rules for all three:**
- Every request must include `.set("Authorization", "bearer " + token)`.
- Always obtain the `id` by reading from the database after seeding (never hard-code an `_id`).
- Check both the response status **and** the database state after the operation.

**Hints:**

**Read single workout (GET /api/workouts/:id)**
```
1. In beforeEach, seed one workout.
2. Fetch all workouts and take the id from the first result.
3. GET /api/workouts/:id with the token.
4. Expect 200 and confirm the returned title matches.
```

**Delete a workout (DELETE /api/workouts/:id)**
```
1. Seed workouts in beforeEach.
2. Read the list to get a real id.
3. DELETE /api/workouts/:id with the token – expect 200.
4. GET all again – confirm the deleted title is gone.
```

**Update a workout (PATCH /api/workouts/:id)**
```
1. Seed a workout.
2. Read the list to get a real id.
3. PATCH /api/workouts/:id with { reps: 99 } and the token – expect 200.
4. GET the workout by id – confirm reps is now 99.
```

<details>
<summary>Sample solution – click to expand</summary>

```js
// ─── GET /api/workouts/:id ────────────────────────────────────────────────────

describe("GET /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
  });

  it("should return the workout with status 200 when the id is valid", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const id = all.body[0]._id;

    const response = await api
      .get(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(workouts[0].title);
  });

  it("should return 404 when the id does not exist", async () => {
    const fakeId = "000000000000000000000000";
    await api
      .get(`/api/workouts/${fakeId}`)
      .set("Authorization", "bearer " + token)
      .expect(404);
  });
});

// ─── DELETE /api/workouts/:id ─────────────────────────────────────────────────

describe("DELETE /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[1]);
  });

  it("should return status 200 and the deleted workout when the id is valid", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const workoutToDelete = all.body[0];

    const response = await api
      .delete(`/api/workouts/${workoutToDelete._id}`)
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body._id).toBe(workoutToDelete._id);
  });

  it("should remove the workout from the database", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const workoutToDelete = all.body[0];

    await api
      .delete(`/api/workouts/${workoutToDelete._id}`)
      .set("Authorization", "bearer " + token);

    const remaining = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);

    const titles = remaining.body.map((w) => w.title);
    expect(titles).not.toContain(workoutToDelete.title);
    expect(remaining.body).toHaveLength(1);
  });
});

// ─── PATCH /api/workouts/:id ──────────────────────────────────────────────────

describe("PATCH /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
  });

  it("should return status 200 after a successful update", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const id = all.body[0]._id;

    await api
      .patch(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .send({ reps: 99 })
      .expect(200);
  });

  it("should persist the updated fields in the database", async () => {
    const all = await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token);
    const id = all.body[0]._id;

    await api
      .patch(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token)
      .send({ reps: 99 });

    const updated = await api
      .get(`/api/workouts/${id}`)
      .set("Authorization", "bearer " + token);

    expect(updated.body.reps).toBe(99);
  });
});
```

</details>

---

## Part 5 – Best Practices and Notes

### 5.1 Keeping `app.js` and `index.js` separate

In v2, the Express application lives entirely in `app.js`. The `index.js` only creates an HTTP server and starts it listening:

```js
// index.js
const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
```

**Why this matters for testing:**  
Supertest imports `app.js` directly and manages its own internal server. If `app.js` called `app.listen()` itself, there would be a port-binding conflict when both `index.js` and Supertest tried to bind the same port. Keeping the listen call in `index.js` prevents this entirely.

| `app.js` | `index.js` |
|---|---|
| Defines routes, middleware, DB connection | Creates and starts the HTTP server |
| Used by both tests (via Supertest) and production | Used only in production / `npm start` |

---

### 5.2 Why `Content-Type` is matched with a regex

```js
.expect("Content-Type", /application\/json/)
```

Express typically sends:
```
Content-Type: application/json; charset=utf-8
```

If you used an exact string comparison (`"application/json"`), the test would fail because of the `; charset=utf-8` suffix. The regex `/application\/json/` succeeds as long as `application/json` appears *anywhere* in the header value.

---

### 5.3 `beforeAll` vs `beforeEach` – choosing the right hook

| Hook | Runs | Use when |
|---|---|---|
| `beforeAll` | Once before the whole suite (or `describe` block) | Expensive setup that does not change between tests – e.g. signing up a user and saving a token. |
| `beforeEach` | Before every single test | Resetting mutable state – e.g. clearing a collection and re-seeding it so every test starts fresh. |
| `afterAll` | Once after the whole suite | Cleanup that only needs to happen once – e.g. closing the DB connection. |

Using `beforeAll` for signup keeps the suite fast. Using `beforeEach` for seeding workouts guarantees each test operates on a clean, predictable database.

---

### 5.4 Storing test fixtures in a separate file

The v2 project keeps its fixture data in `tests/data/workouts.js`:

```js
const workouts = [
  { title: "Workout 2023-10-05", reps: 35, load: 20 },
  { title: "Workout 2023-10-06", reps: 11, load: 101 },
  // ...
];
module.exports = workouts;
```

Benefits:
- The test file stays focused on assertions, not data definitions.
- Multiple test files can import the same fixtures without duplication.
- Changing a fixture value only requires editing one place.

---

### 5.5 Test coverage

Jest can report how much of your source code is exercised by the tests. Add the `--coverage` flag to generate a report:

```bash
npm test -- --coverage
```

Jest will output a table showing the percentage of **statements**, **branches**, **functions**, and **lines** covered for each source file, and generate an HTML report inside `coverage/lcov-report/`.

**Interpreting the output:**

```
File                    | Stmts | Branch | Funcs | Lines
------------------------|-------|--------|-------|------
controllers/workout...  |  85%  |  70%   |  100% |  85%
middleware/requireAuth  |  90%  |  75%   |  100% |  90%
```

- **Statements**: individual executable statements reached.
- **Branch**: both sides of every `if`/`else` hit at least once.
- **Functions**: every function called at least once.

100% coverage does not mean zero bugs – it means every line was *executed*. The quality of assertions still matters.

---

### 5.6 Jest quick reference

| Goal | How |
|---|---|
| Run one test only | `it.only(...)` |
| Skip a test | `it.skip(...)` |
| Run a specific file | `npm test -- tests/workout.test.js` |
| Run tests matching a pattern | `npm test -- --testNamePattern="GET /api"` |
| Generate coverage report | `npm test -- --coverage` |

**Reminder about the double `--`:**

```
npm test  --  --testNamePattern="..."
         ↑           ↑
    npm stops here  passed straight to Jest
```

---

## Summary

| Concept | Key takeaway |
|---|---|
| Protected routes | Every request to a guarded endpoint needs `.set("Authorization", "bearer " + token)`. |
| `beforeAll` for auth | Sign up once before all tests; reuse the token everywhere. |
| `beforeEach` for DB reset | Wipe and re-seed before every test to guarantee a clean starting state. |
| `app.js` / `index.js` split | Keeps Supertest from conflicting with `app.listen()`. |
| Fixture files | Store test data in `tests/data/` for reuse and readability. |
| `Content-Type` regex | Avoids false failures caused by `; charset=utf-8` in the header value. |
| Coverage | `npm test -- --coverage` shows what code the tests actually exercise. |

---

## Links

- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Supertest on npm](https://www.npmjs.com/package/supertest)
- [jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)
- [Jest `--coverage`](https://jestjs.io/docs/cli#--coverageboolean)
- [Skip / only tests in Jest](https://codewithhugo.com/run-skip-single-jest-test/)
