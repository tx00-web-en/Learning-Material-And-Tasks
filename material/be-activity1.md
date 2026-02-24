# Lab 1 – API Testing with Jest and Supertest

In this lab you will learn how to write automated integration tests for a REST API using **Jest** as the test runner and **Supertest** as the HTTP client. You will explore the test file that ships with the starter project, understand each concept step by step, and then refactor the tests to follow a cleaner, behavior-driven style.

---

## Part 1 – Project Setup

1. Clone the [starter repository](https://github.com/tx00-resources-en/week6-be-workout-v1).  
   After cloning, **delete** the `.git` directory so you can start a fresh history.

2. Rename `.env.example` to `.env`.  
   Open the file and notice it defines **two MongoDB connection strings**:
   - `MONGODB_URI` – used when the app runs normally (development/production).
   - `TEST_MONGODB_URI` – used only during test runs so tests never touch your real data.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the test suite to verify everything works before you change anything:
   ```bash
   npm test
   ```

> **Why a separate test database?**  
> Tests routinely delete and recreate data. Pointing them at a dedicated database keeps your development data safe and makes each test run predictable.

---

## Part 2 – Understanding the Test File

Open `./tests/workout_api.test.js`. The file is broken into logical sections; we will look at each one.

### 2.1 Imports and wiring Supertest to the Express app

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");
```

| Line | Why it is here |
|---|---|
| `require("../app")` | Imports the Express application **without** calling `app.listen()`. The app is never bound to a port – Supertest handles that internally. |
| `supertest(app)` | Wraps the Express app so you can make HTTP requests like `api.get("/api/workouts")` directly in your tests, no running server needed. |
| `require("../models/workoutModel")` | Gives the test direct access to the Mongoose model so it can seed and inspect the database independently of the HTTP layer. |

**Key concept – why not just use `fetch`?**  
`fetch` (or `axios`) requires a real server to be listening on a port. Supertest starts a temporary in-process server automatically, which is simpler to set up and keeps tests fully isolated.

---

### 2.2 Test data and a database helper

```js
const initialWorkouts = [
  { title: "test workout 1", reps: 11, load: 101 },
  { title: "test workout 2", reps: 12, load: 102 },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};
```

- `initialWorkouts` is the **known, fixed state** the database is reset to before every test. By controlling the starting state you make tests **deterministic** – the same test always produces the same result.
- `workoutsInDb()` is a small helper that fetches the current database contents. Tests use it to verify that an operation actually changed the database (not just the HTTP response).

---

### 2.3 Lifecycle hooks – `beforeEach` and `afterAll`

```js
afterAll(() => {
  mongoose.connection.close();
});

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});
```

| Hook | When it runs | Purpose |
|---|---|---|
| `beforeEach` | Before **every single test** | Wipes the collection and re-inserts the two initial workouts. Every test therefore starts with the same clean slate. |
| `afterAll` | Once, after **all tests** finish | Closes the Mongoose connection so Jest can exit cleanly. Without this Jest often hangs. |

> **Important:** `beforeEach` runs before *every* test, not once for the whole suite. This is intentional – if a test adds or deletes a document, the next test must not be affected by that change.

---

### 2.4 Testing GET and POST – the main `describe` block

```js
describe("when there is initially some notes saved", () => {
  test("all workouts are returned", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  test("a specific workout is within the returned workouts", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });

  test("Workouts are returned as json", async () => {
    await api
      .get("/api/workouts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("a valid workout can be added", async () => {
    const newWorkout = { title: "Situps", reps: 25, load: 10 };

    await api
      .post("/api/workouts")
      .send(newWorkout)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(response.body).toHaveLength(initialWorkouts.length + 1);
    expect(contents).toContain("Situps");
  });

  test("workout without title is not added", async () => {
    const newWorkout = { reps: 23 };
    await api.post("/api/workouts").send(newWorkout).expect(400);
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });
});
```

**Concepts to notice:**

- `api.get(...)` / `api.post(...).send(body)` – Supertest's fluent API mirrors the HTTP verbs.
- Chaining `.expect(200)` checks the status code; `.expect("Content-Type", /json/)` checks a response header using a regular expression.
- The "invalid workout" test checks **both** the immediate response (`400`) **and** the database state (count unchanged). This confirms the server correctly rejected the document, not just returned an error.

---

### 2.5 Testing DELETE

```js
describe("deletion of a workout", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToDelete = workoutsAtStart[0];

    await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

    const contents = workoutsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(workoutToDelete.title);
  });
});
```

The pattern here is:
1. **Snapshot before** – read the database to find a real `id`.
2. **Act** – send the DELETE request.
3. **Snapshot after** – confirm the database changed as expected.

Never hard-code a MongoDB `_id` in a test. IDs are generated at insert time, so they change on every `beforeEach`. Always read current IDs from the database first.

---

## Part 3 – Refactoring: `test()` → `it()` (BDD Style)

Jest allows using `it()` as an alias for `test()`. Using `it` together with well-named `describe` blocks makes tests read like plain English:

> *"when there are initially some workouts saved — it should return all workouts"*

**Original code:**
```js
describe("when there is initially some notes saved", () => {
  test("all workouts are returned", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  test("a specific workout is within the returned workouts", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });
});
```

**Refactored in BDD style:**
```js
describe("when there are initially some workouts saved", () => {
  it("should return all workouts", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("should include a specific workout in the returned list", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });
});
```

**What changed and why:**

| Before | After | Reason |
|---|---|---|
| `test("all workouts are returned")` | `it("should return all workouts")` | Reads as a sentence when combined with the `describe` label. |
| Vague describe label "some notes saved" | "some workouts saved" | Matches the actual domain. |
| Passive description | Active `should …` phrasing | Makes the expected behavior immediately clear. |

**Your task:** Refactor the *entire* `workout_api.test.js` file in the same way. Apply `it()` and descriptive names to every test.

<details>
<summary>Sample solution – click to expand</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  { title: "test workout 1", reps: 11, load: 101 },
  { title: "test workout 2", reps: 12, load: 102 },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

afterAll(() => {
  mongoose.connection.close();
});

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});

describe("when there are initially some workouts saved", () => {
  it("should return all workouts", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("should include a specific workout in the returned list", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });

  it("should return workouts as JSON with status 200", async () => {
    await api
      .get("/api/workouts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should add a new workout and return status 201", async () => {
    const newWorkout = { title: "test workout x", reps: 19, load: 109 };
    await api.post("/api/workouts").send(newWorkout).expect(201);
  });

  it("should persist a valid workout and include it in subsequent GET", async () => {
    const newWorkout = { title: "Situps", reps: 25, load: 10 };

    await api
      .post("/api/workouts")
      .send(newWorkout)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialWorkouts.length + 1);
    expect(contents).toContain("Situps");
  });

  it("should reject a workout missing a title with status 400", async () => {
    const newWorkout = { reps: 23 };
    await api.post("/api/workouts").send(newWorkout).expect(400);

    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });
});

describe("deletion of a workout", () => {
  it("should delete the workout and return status 204 when the id is valid", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToDelete = workoutsAtStart[0];

    await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

    const contents = workoutsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(workoutToDelete.title);
  });
});
```

</details>

---

## Part 4 – Best Practice: More Granular `describe` Blocks

The starter file uses only **two** top-level `describe` blocks. In a real project the test file grows quickly, and two blocks are not enough to keep things navigable.

**Best practice guidelines:**

- **One `describe` per HTTP verb / resource action** – `GET /api/workouts`, `POST /api/workouts`, `DELETE /api/workouts/:id` each deserve their own block.
- **Nest `describe` blocks** to model sub-scenarios – for example, within `POST /api/workouts` you can have an inner block *"when the payload is valid"* and another *"when the payload is invalid"*.
- **Keep each `it` focused on a single assertion** where possible. If a test asserts three unrelated things and one breaks, it can be hard to tell what failed.
- **Name the outer `describe` after the route or resource** so the Jest output groups failures clearly.

```
GET /api/workouts
  ✓ should return all workouts
  ✓ should return workouts as JSON with status 200
  ✓ should include a specific workout in the returned list

POST /api/workouts
  when the payload is valid
    ✓ should return status 201
    ✓ should persist the new workout in the database
  when the payload is invalid
    ✓ should return status 400 when title is missing
    ✓ should not increase the number of workouts in the database

DELETE /api/workouts/:id
  when the id is valid
    ✓ should return status 204
    ✓ should remove the workout from the database
```

<details>
<summary>Sample solution – click to expand</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  { title: "test workout 1", reps: 11, load: 101 },
  { title: "test workout 2", reps: 12, load: 102 },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

afterAll(() => {
  mongoose.connection.close();
});

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});

// ─── GET /api/workouts ────────────────────────────────────────────────────────

describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("should return workouts as JSON with status 200", async () => {
    await api
      .get("/api/workouts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should include a specific workout in the returned list", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });
});

// ─── POST /api/workouts ───────────────────────────────────────────────────────

describe("POST /api/workouts", () => {
  describe("when the payload is valid", () => {
    it("should return status 201 and JSON", async () => {
      const newWorkout = { title: "Situps", reps: 25, load: 10 };
      await api
        .post("/api/workouts")
        .send(newWorkout)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    });

    it("should persist the new workout in the database", async () => {
      const newWorkout = { title: "Situps", reps: 25, load: 10 };
      await api.post("/api/workouts").send(newWorkout).expect(201);

      const response = await api.get("/api/workouts");
      const contents = response.body.map((r) => r.title);
      expect(response.body).toHaveLength(initialWorkouts.length + 1);
      expect(contents).toContain("Situps");
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      const newWorkout = { reps: 23 };
      await api.post("/api/workouts").send(newWorkout).expect(400);
    });

    it("should not increase the number of workouts when title is missing", async () => {
      const newWorkout = { reps: 23 };
      await api.post("/api/workouts").send(newWorkout);
      const response = await api.get("/api/workouts");
      expect(response.body).toHaveLength(initialWorkouts.length);
    });
  });
});

// ─── DELETE /api/workouts/:id ─────────────────────────────────────────────────

describe("DELETE /api/workouts/:id", () => {
  describe("when the id is valid", () => {
    it("should return status 204", async () => {
      const workoutsAtStart = await workoutsInDb();
      const workoutToDelete = workoutsAtStart[0];
      await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);
    });

    it("should remove the workout from the database", async () => {
      const workoutsAtStart = await workoutsInDb();
      const workoutToDelete = workoutsAtStart[0];

      await api.delete(`/api/workouts/${workoutToDelete.id}`);

      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

      const contents = workoutsAtEnd.map((r) => r.title);
      expect(contents).not.toContain(workoutToDelete.title);
    });
  });
});
```

</details>

---

## Part 5 – Running and Skipping Tests Selectively

When writing or debugging tests you rarely want to run the entire suite every time. Jest provides several ways to focus your runs.

### `it.only` / `test.only`

Add `.only` to any test and Jest will skip everything else in that file:

```js
it.only("should return workouts as JSON with status 200", async () => {
  await api
    .get("/api/workouts")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
```

> **Warning:** Never commit `.only` to version control. It silently disables all other tests and can give a false sense of confidence ("all tests pass" is meaningless if only one test ran).

### `it.skip` / `test.skip`

Mark a test as pending without deleting it:

```js
it.skip("should do something not yet implemented", async () => {
  // ...
});
```

Jest will report it as *skipped* rather than failing.

### Running a specific file from the terminal

```bash
npm test -- tests/workout_api.test.js
```

### Running tests that match a name pattern

```bash
npm test -- --testNamePattern="should return all workouts"
```

You can also pass a partial string or describe-block label:

```bash
npm test -- --testNamePattern="GET /api/workouts"
```

**About the double `--`:**

```
npm test  --  --testNamePattern="..."
         ↑           ↑
       npm flag     passed to Jest
```

The first `--` tells npm to stop interpreting what follows and forward it directly to the underlying script (Jest). Without it, npm would try to parse `--testNamePattern` itself and throw an error.

---

## Summary

| Concept | Key takeaway |
|---|---|
| Supertest | Wraps an Express app so you can send HTTP requests in tests without starting a real server. |
| Separate test database | Prevents tests from corrupting development data; configured via `TEST_MONGODB_URI`. |
| `beforeEach` | Resets the database to a known state before every test, ensuring test independence. |
| `afterAll` | Closes the Mongoose connection so Jest exits cleanly. |
| `describe` / `it` | Group and label tests so output reads like a specification. |
| Multiple `describe` blocks | One block per action/route keeps tests navigable as the suite grows. |
| `it.only` / `it.skip` | Focus or temporarily disable individual tests during development. |
| `--testNamePattern` | Run a subset of tests from the command line without modifying code. |

---

## Links

- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Supertest on npm](https://www.npmjs.com/package/supertest)
- [Dead-Simple API Tests With SuperTest, Mocha, and Chai](https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/)
