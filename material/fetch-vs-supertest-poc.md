# Proof of Concept: Using Fetch Instead of Supertest

## Why Jest?

Before comparing Supertest and Fetch, it is worth clarifying what **Jest** does and does not do.

**Jest is a test runner.** It is responsible for:

- Discovering and executing test files.
- Providing `describe`, `it`/`test`, `beforeAll`, `beforeEach`, `afterAll`, `afterEach`.
- Providing the `expect(...)` assertion library.
- Reporting pass/fail results in the terminal.

**Jest does not make HTTP requests.** You need a separate tool for that. In the labs you used **Supertest** for this role. This document shows that **the native `fetch` API** can fill that role instead.

---

## The Two Approaches Side by Side

### Approach A – Jest + Supertest (used in the labs)

Supertest wraps your Express app and handles all HTTP transport internally. The server never binds to a real network port.

```js
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app); // no app.listen() needed

test("GET /api/workouts returns 200", async () => {
  await api.get("/api/workouts").expect(200);
});
```

### Approach B – Jest + Fetch (this document)

`fetch` is a real HTTP client. It requires a real server to be listening on a port, so you start and stop the server manually in the test lifecycle.

```js
const app = require("../app");
let server;

beforeAll((done) => {
  server = app.listen(3005, done); // bind to a port
});

afterAll((done) => {
  server.close(done); // release the port
});

test("GET /api/workouts returns 200", async () => {
  const res = await fetch("http://localhost:3005/api/workouts");
  expect(res.status).toBe(200);
});
```

---

## Pros and Cons

### Supertest

| Pros | Cons |
|---|---|
| No server startup required – simpler setup | Extra dependency (`npm install supertest`) |
| Fluent API – chain `.expect(200).expect("Content-Type", /json/)` | Supertest-specific syntax to learn |
| Slightly faster – no real network socket | Only works for Node.js backend testing |
| Works even if a port is already in use | |

### Fetch

| Pros | Cons |
|---|---|
| Built into Node.js 18+ – zero extra dependencies | Must manually start and stop the server |
| Same API used in browsers and frontend tests – one mental model | Must write full URLs (`http://localhost:3005/...`) |
| Closer to "real" usage – makes an actual HTTP call | Slightly slower due to real network I/O |
| Familiar to anyone who has written frontend code | You lose Supertest's chained `.expect()` helpers |

---

## How Supertest Works Under the Hood

Understanding this makes the trade-off clearer:

1. `supertest(app)` calls `app.listen(0)` internally – port `0` tells the OS to assign any free ephemeral port.
2. It remembers that port and prepends it to every path you pass to `.get(...)`, `.post(...)`, etc.
3. After each test file it closes that internal server.

Because of step 1, you never have a port conflict, and because everything is in-process the overhead is minimal. The downside is an extra package and a slightly different assertion style.

With `fetch` you are doing all of this yourself, explicitly.

---

## How `beforeAll` Signals Completion to Jest

When starting a server there are two patterns. Both are valid:

**Pattern 1 – callback-based (`done`)**

```js
beforeAll((done) => {
  server = app.listen(3005, () => {
    console.log("Test server running on port 3005");
    done(); // tells Jest "async setup is finished, run the tests"
  });
});
```

Jest sees that `beforeAll` accepts an argument (`done`) and waits for it to be called before proceeding. If `done` is never called, Jest will time out.

**Pattern 2 – promise-based (`async/await`)**

```js
beforeAll(async () => {
  await new Promise((resolve) => {
    server = app.listen(3005, resolve);
  });
});
```

Jest sees an `async` function, waits for the returned Promise to settle, then proceeds. Both patterns are equivalent; choose whichever you find more readable.

---

## A Note on `Content-Type` Header Assertions

With Supertest you write:
```js
.expect("Content-Type", /application\/json/)
```

With `fetch` you inspect the header directly:
```js
expect(res.headers.get("content-type")).toMatch(/application\/json/);
```

Both use a regex for the same reason: Express sends `application/json; charset=utf-8`, so an exact string comparison would fail. The regex matches as long as `application/json` appears anywhere in the value.

---

## When to Choose Each

| Situation | Recommendation |
|---|---|
| Backend-only project, fast feedback loop | **Supertest** – less setup, chainable assertions |
| Node 18+, want zero extra dependencies | **Fetch** is a practical option |
| Team already writes frontend tests with `fetch`/`msw` | **Fetch** – consistent mental model across test suites |
| CI environment where port conflicts are a concern | **Supertest** – no real port binding |
| Learning / exploring HTTP fundamentals | **Fetch** – the explicit server lifecycle is instructive |

The choice is rarely critical. Both approaches test the same thing: real HTTP request → real Express handler → real database. Pick the one that fits your team and stick to it.

---

## Full Example: Supertest vs Fetch

The tables below show each operation side by side so the mechanical differences are clear.

### Server lifecycle

| | Supertest | Fetch |
|---|---|---|
| Import | `const api = supertest(app)` | `let server` |
| Start | nothing needed | `server = app.listen(PORT, done)` in `beforeAll` |
| Stop | nothing needed | `server.close()` in `afterAll` |

### GET request

```js
// Supertest
await api.get("/api/workouts").expect(200);

// Fetch
const res = await fetch(`http://localhost:${PORT}/api/workouts`);
expect(res.status).toBe(200);
```

### POST request with a body

```js
// Supertest
await api.post("/api/workouts").send({ title: "Situps", reps: 25, load: 10 }).expect(201);

// Fetch
const res = await fetch(`http://localhost:${PORT}/api/workouts`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Situps", reps: 25, load: 10 }),
});
expect(res.status).toBe(201);
```

### Reading the response body

```js
// Supertest – body is already parsed
const titles = response.body.map((w) => w.title);

// Fetch – must call .json() explicitly
const body = await res.json();
const titles = body.map((w) => w.title);
```

### Content-Type assertion

```js
// Supertest
await api.get("/api/workouts").expect("Content-Type", /application\/json/);

// Fetch
const res = await fetch(`http://localhost:${PORT}/api/workouts`);
expect(res.headers.get("content-type")).toMatch(/application\/json/);
```

---

## Complete Fetch-Based Test File

This is the Lab 1 test suite rewritten to use `fetch` instead of Supertest. The test logic is identical; only the HTTP mechanism changes.

```js
// tests/workout_api.test.js  (Fetch version)
const mongoose = require("mongoose");
const app = require("../app");
const Workout = require("../models/workoutModel");

const PORT = 3005;
let server;

const initialWorkouts = [
  { title: "test workout 1", reps: 11, load: 101 },
  { title: "test workout 2", reps: 12, load: 102 },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────

// Pattern 1: callback-based
beforeAll((done) => {
  server = app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    done();
  });
});

// Pattern 2: promise-based (alternative – pick one)
// beforeAll(async () => {
//   await new Promise((resolve) => {
//     server = app.listen(PORT, resolve);
//   });
// });

beforeEach(async () => {
  await Workout.deleteMany({});
  await Workout.insertMany(initialWorkouts);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

// ─── GET /api/workouts ────────────────────────────────────────────────────────

describe("when there are initially some workouts saved", () => {
  it("should return all workouts", async () => {
    const res = await fetch(`http://localhost:${PORT}/api/workouts`);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toHaveLength(initialWorkouts.length);
  });

  it("should include a specific workout in the returned list", async () => {
    const res = await fetch(`http://localhost:${PORT}/api/workouts`);
    const body = await res.json();

    const titles = body.map((w) => w.title);
    expect(titles).toContain("test workout 2");
  });

  it("should return workouts as JSON with status 200", async () => {
    const res = await fetch(`http://localhost:${PORT}/api/workouts`);

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/application\/json/);
  });

  it("should add a new workout and return status 201", async () => {
    const newWorkout = { title: "test workout x", reps: 19, load: 109 };

    const res = await fetch(`http://localhost:${PORT}/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });

    expect(res.status).toBe(201);
  });

  it("should persist a valid workout and include it in subsequent GET", async () => {
    const newWorkout = { title: "Situps", reps: 25, load: 10 };

    const postRes = await fetch(`http://localhost:${PORT}/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });

    expect(postRes.status).toBe(201);
    expect(postRes.headers.get("content-type")).toMatch(/application\/json/);

    const getRes = await fetch(`http://localhost:${PORT}/api/workouts`);
    const body = await getRes.json();

    const titles = body.map((w) => w.title);
    expect(body).toHaveLength(initialWorkouts.length + 1);
    expect(titles).toContain("Situps");
  });

  it("should reject a workout missing a title with status 400", async () => {
    const newWorkout = { reps: 23 };

    const postRes = await fetch(`http://localhost:${PORT}/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });

    expect(postRes.status).toBe(400);

    const getRes = await fetch(`http://localhost:${PORT}/api/workouts`);
    const body = await getRes.json();

    expect(body).toHaveLength(initialWorkouts.length);
  });
});

// ─── DELETE /api/workouts/:id ─────────────────────────────────────────────────

describe("deletion of a workout", () => {
  it("should delete the workout and return status 204 when the id is valid", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToDelete = workoutsAtStart[0];

    const res = await fetch(
      `http://localhost:${PORT}/api/workouts/${workoutToDelete.id}`,
      { method: "DELETE" }
    );

    expect(res.status).toBe(204);

    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

    const titles = workoutsAtEnd.map((w) => w.title);
    expect(titles).not.toContain(workoutToDelete.title);
  });
});
```

---

## Summary

| Topic | Key point |
|---|---|
| Jest's role | Test runner and assertion library – it does not make HTTP requests. |
| Supertest's role | HTTP client that hooks directly into the Express app, no real port needed. |
| Fetch's role | Built-in HTTP client (Node 18+) that makes real requests over `localhost`. |
| Extra work with Fetch | Start the server in `beforeAll`, stop it in `afterAll`, write full URLs. |
| `done` vs `async/await` in `beforeAll` | Two equivalent ways to signal to Jest that async setup has completed. |
| Body parsing | Supertest parses automatically; with Fetch you must call `await res.json()`. |
| Header assertions | Both use regex to avoid failing on `; charset=utf-8` suffixes. |
| Recommendation | Supertest for backend-focused projects; Fetch if you want zero extra dependencies or a unified API with your frontend tests. |

---

## Links

- [Node.js built-in fetch (Node 18+)](https://nodejs.org/dist/latest/docs/api/globals.html#fetch)
- [Supertest on npm](https://www.npmjs.com/package/supertest)
- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Jest async setup with `done` and promises](https://jestjs.io/docs/asynchronous)
