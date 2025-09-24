# Proof of concept: Using Fetch with Jest for Backend Tests

In the past, testing backend APIs with **Jest** usually meant pairing it with **Supertest**, since Supertest can hook directly into an Express app without needing to start a server. However, with modern Node.js (v18+), `fetch` is now built in, which makes it possible to use **Jest + Fetch** for backend integration tests with only a little extra setup.

Here’s what that looks like in practice:

```js
// With Fetch
let server;

beforeAll(() => {
  server = app.listen(3005);   // Start the server before tests
});

afterAll(() => {
  server.close();              // Stop the server after tests
});

test("GET /api/users returns 200", async () => {
  const res = await fetch("http://localhost:3000/api/users");
  expect(res.status).toBe(200);  // Use Jest's built-in assertion
});
```

- **Setup required:** Unlike Supertest, you must manually start and stop the server in the test lifecycle (`beforeAll` / `afterAll`).  
- **Test flow:** Once the server is running, you can call endpoints with `fetch("http://localhost:3000/...")` and assert on the response using Jest’s `expect(...)`.  
- **Extra effort:** Compared to Supertest, the only additional work is managing the server lifecycle and writing the full URL. This is not a huge overhead, especially now that `fetch` is native in Node.  
- **Performance:** Supertest is usually a bit faster because it hooks directly into the app without opening a network socket, while Fetch makes real HTTP calls over `localhost`. For most projects, this difference is minor.  
- **When to use:**  
  - **Supertest** remains more convenient for backend testing because it plugs directly into the app.  
  - **Fetch + Jest** is a viable alternative if you prefer sticking to built‑in APIs or want consistency between frontend and backend tests.  



**In short:** With Node 18+, it’s entirely feasible to use **Fetch with Jest** for backend API testing. The extra effort is minimal — just starting and stopping the server — and while Supertest may be slightly faster and more convenient, Fetch is now a practical option alongside the traditional Jest + Supertest approach.  


---

## Sample Use Case

Let’s refactor a test suite to uses **Jest + Fetch** instead of **Supertest**. The main changes are:

1. **Remove Supertest** (`supertest(app)` and `api` go away).  
2. **Start/stop the server manually** in `beforeAll` / `afterAll`.  
3. **Use `fetch`** to hit `http://localhost:PORT/...` endpoints.  
4. **Use Jest’s assertions** (`expect(...)`) instead of Supertest’s `.expect(...)`.  

Here’s a sample version:

```js
// tests/workout_api.test.js
const mongoose = require("mongoose");
const app = require("../app");
const Workout = require("../models/workoutModel");

const PORT = 3005; // pick a test port
let server;

const initialWorkouts = [
  { title: "test workout 1", reps: 11, load: 101 },
  { title: "test workout 2", reps: 12, load: 102 },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeAll((done) => {
  server = app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    done(); // tells Jest "setup is complete, start the tests"
  });
});

//  Alternative solution to beforeAll()
// beforeAll(async () => {
//   await new Promise((resolve) => {
//     server = app.listen(PORT, () => {
//       console.log(`Test server running on port ${PORT}`);
//       resolve();
//     });
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

describe("when there are initially some workouts saved", () => {
  test("all workouts are returned", async () => {
    const res = await fetch(`http://localhost:${PORT}/api/workouts`);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toHaveLength(initialWorkouts.length);
  });

  test("a specific workout is within the returned workouts", async () => {
    const res = await fetch(`http://localhost:${PORT}/api/workouts`);
    const body = await res.json();

    const titles = body.map((w) => w.title);
    expect(titles).toContain("test workout 2");
  });

  test("workouts are returned as JSON", async () => {
    const res = await fetch(`http://localhost:${PORT}/api/workouts`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/application\/json/);
  });

  test("new workout added successfully", async () => {
    const newWorkout = { title: "test workout x", reps: 19, load: 109 };

    const res = await fetch(`http://localhost:${PORT}/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });

    expect(res.status).toBe(201);
  });

  test("a valid workout can be added", async () => {
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

  test("workout without title is not added", async () => {
    const newWorkout = { reps: 23 };

    const res = await fetch(`http://localhost:${PORT}/api/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });

    expect(res.status).toBe(400);

    const getRes = await fetch(`http://localhost:${PORT}/api/workouts`);
    const body = await getRes.json();

    expect(body).toHaveLength(initialWorkouts.length);
  });
});

describe("deletion of a workout", () => {
  test("succeeds with status code 204 if id is valid", async () => {
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

### 🔑 Key changes explained
- **Server lifecycle**:  
  - `beforeAll` starts the app on a test port.  
  - `afterAll` closes both the server and the Mongoose connection.  

- **Requests**:  
  - Replaced `api.get(...)` with `fetch("http://localhost:PORT/...")`.  
  - For POST/DELETE, added `method`, `headers`, and `body` where needed.  

- **Assertions**:  
  - Used Jest’s `expect(...)` for status codes, headers, and body checks.  
  - Checked `res.headers.get("content-type")` instead of Supertest’s `.expect("Content-Type", /json/)`.  
