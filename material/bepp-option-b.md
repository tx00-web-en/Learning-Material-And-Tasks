# Backend Testing with Jest and Supertest — Step-by-Step Lab

This lab walks you through testing backend APIs using **Jest** and **Supertest**.
You will build on a **starter repository** that includes example test files.
Your task is to write tests for the **Jobs API**, both with and without authentication.

Each iteration ends with:
- A **sample solution** you can compare your work against
- A **commit message** you should use before moving on

---

### Commit Message Format

Use one of these prefixes for every commit:

| Prefix | When to use |
|---|---|
| **feat:** | Adding a new feature or new functionality |
| **refactor:** | Changing existing code without altering behavior |
| **chore:** | Maintenance tasks — updating dependencies, config changes, renaming files |

Example: `feat: add GET tests for jobs API`

---

### Starter Resources

You are given **three example test files** in the `examples/` folder:

1. `tours-no-auth.test.js` — Tests for non-protected endpoints
2. `tours-auth.test.js` — Tests for protected endpoints (with JWT)
3. `users.test.js` — Tests for user signup and login

Study these files before you begin. Your job tests will follow the same patterns.

> **Important:** Write tests in BDD style using `describe` / `it`.
> - One `describe` block per HTTP verb + route
> - Nest `describe` blocks for sub-scenarios (valid data, invalid data, etc.)
> - Each `it` should read like a sentence: `it("should return all jobs...")`

---

### Setup

1. Clone the starter repository:
   ```
   https://github.com/tx00-resources-en/week7-bepp-starter
   ```

2. **Delete the `.git` folder** so you can create your own repo.

---

## PART 1 — Testing Non-Protected Jobs Endpoints (`backend-no-auth`)

### Iteration 1 — Setup and GET tests

**Step 1:** Navigate to the `backend-no-auth` directory.

**Step 2:** Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and fill in your MongoDB connection strings (one for development, one for testing).

**Step 3:** Install dependencies and verify the server starts:

```bash
npm install
npm run dev
```

Stop the server with `Ctrl+C` once you see it running.

**Step 4:** Verify Jest works by running the existing placeholder test:

```bash
npm test
```

You should see `mock.test.js` pass. Leave this file as-is.

**Step 5:** Create a new test file:

```
tests/jobs.test.js
```

**Step 6:** Start by adding imports, seed data, and the `beforeEach` / `afterAll` hooks.

Open `examples/tours-no-auth.test.js` and use it as your template. Replace the Tour model and tour data with Job model and job data.

The Job model has these required fields: `title`, `type`, `description`, and `company` (which is an object with `name`, `contactEmail`, `contactPhone`).

**Step 7:** Write tests for these two endpoints:

| Method | Endpoint          | Description   |
|--------|-------------------|---------------|
| GET    | `/api/jobs`       | Get all jobs  |
| GET    | `/api/jobs/:jobId`| Get job by ID |

For `GET /api/jobs` test:
- Status is `200`
- Content-Type is JSON
- Response body length matches seed data length

For `GET /api/jobs/:jobId` test:
- A valid ID returns `200` and the correct job
- A valid ObjectId that does not exist in the DB returns `404`
- A malformed ID (e.g. `"12345"`) returns `400`

**Step 8:** Run your tests:

```bash
npm test
```

All tests should pass. If not, compare with the sample solution below.

---

> **Try writing the solution on your own first**, then expand to compare your work.

<details>
<summary>Sample Solution — Part 1, Iteration 1</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");

// Seed data
const jobs = [
  {
    title: "Senior React Developer",
    type: "Full-Time",
    description: "We are seeking a talented Front-End Developer to join our team in Helsinki.",
    company: {
      name: "NewTek Solutions",
      contactEmail: "contact@nteksolutions.com",
      contactPhone: "09-123-4567",
    },
  },
  {
    title: "Junior Python Developer",
    type: "Part-Time",
    description: "Join our Python team and help build data-driven applications.",
    company: {
      name: "DataSoft",
      contactEmail: "hr@datasoft.com",
      contactPhone: "09-765-4321",
    },
  },
];

// Helper: read all jobs straight from DB
const jobsInDb = async () => {
  const allJobs = await Job.find({});
  return allJobs.map((j) => j.toJSON());
};

// Reset the jobs collection before each test
beforeEach(async () => {
  await Job.deleteMany({});
  await Job.insertMany(jobs);
});

// ────────────────── GET /api/jobs ──────────────────
describe("GET /api/jobs", () => {
  it("should return all jobs as JSON with status 200", async () => {
    const response = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(jobs.length);
  });

  it("should contain the first seed job title", async () => {
    const response = await api.get("/api/jobs");
    const titles = response.body.map((j) => j.title);
    expect(titles).toContain(jobs[0].title);
  });
});

// ────────────────── GET /api/jobs/:jobId ──────────────────
describe("GET /api/jobs/:jobId", () => {
  it("should return one job by ID", async () => {
    const job = await Job.findOne();
    const response = await api
      .get(`/api/jobs/${job._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(job.title);
  });

  it("should return 404 for a non-existing job ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/jobs/${nonExistentId}`).expect(404);
  });

  it("should return 400 for an invalid job ID format", async () => {
    const invalidId = "12345";
    await api.get(`/api/jobs/${invalidId}`).expect(400);
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
```

**Expected output:**

```
 PASS  tests/jobs.test.js
  GET /api/jobs
    ✓ should return all jobs as JSON with status 200
    ✓ should contain the first seed job title
  GET /api/jobs/:jobId
    ✓ should return one job by ID
    ✓ should return 404 for a non-existing job ID
    ✓ should return 400 for an invalid job ID format
```

</details>

#### Commit

```bash
git add .
git commit -m "feat: add GET tests for jobs API without auth"
```

---

### Iteration 2 — POST, PUT, DELETE tests

**Step 1:** In the same `tests/jobs.test.js` file, add tests for these endpoints:

| Method | Endpoint          | Description   |
|--------|-------------------|---------------|
| POST   | `/api/jobs`       | Create a job  |
| PUT    | `/api/jobs/:jobId`| Update a job  |
| DELETE | `/api/jobs/:jobId`| Delete a job  |

**Step 2:** For `POST /api/jobs`, write two nested `describe` blocks:

- `"when the payload is valid"` — send a complete job object, expect `201`, verify it was saved to DB
- `"when the payload is invalid"` — send an incomplete object (e.g. only `title`), expect `400`, verify DB count didn't change

**Step 3:** For `PUT /api/jobs/:jobId`, write two nested `describe` blocks:

- `"when the id is valid"` — get a real job from DB, send updates, expect `200`, verify DB was updated
- `"when the id is invalid"` — use `"12345"` as ID, expect `400`

**Step 4:** For `DELETE /api/jobs/:jobId`, use the **snapshot pattern**:

1. Read all jobs from DB (snapshot before)
2. Delete the first one
3. Read all jobs again (snapshot after)
4. Verify the count decreased by 1 and the deleted title is gone

Also test invalid ID format → expect `400`.

**Step 5:** Run your tests:

```bash
npm test
```

---

> **Try writing the solution on your own first**, then expand to compare your work.

<details>
<summary>Sample Solution — Part 1, Iteration 2</summary>

Add the following after the `GET /api/jobs/:jobId` describe block (before `afterAll`):

```js
// ────────────────── POST /api/jobs ──────────────────
describe("POST /api/jobs", () => {
  describe("when the payload is valid", () => {
    it("should create a new job with status 201", async () => {
      const newJob = {
        title: "DevOps Engineer",
        type: "Full-Time",
        description: "Manage CI/CD pipelines and cloud infrastructure.",
        company: {
          name: "CloudOps",
          contactEmail: "jobs@cloudops.fi",
          contactPhone: "09-111-2222",
        },
      };

      const response = await api
        .post("/api/jobs")
        .send(newJob)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(newJob.title);

      const jobsAtEnd = await jobsInDb();
      expect(jobsAtEnd).toHaveLength(jobs.length + 1);
      expect(jobsAtEnd.map((j) => j.title)).toContain(newJob.title);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return 400 if required fields are missing", async () => {
      const incompleteJob = { title: "Missing Fields" };

      await api.post("/api/jobs").send(incompleteJob).expect(400);

      const jobsAtEnd = await jobsInDb();
      expect(jobsAtEnd).toHaveLength(jobs.length);
    });
  });
});

// ────────────────── PUT /api/jobs/:jobId ──────────────────
describe("PUT /api/jobs/:jobId", () => {
  describe("when the id is valid", () => {
    it("should update the job and return the updated document", async () => {
      const job = await Job.findOne();
      const updates = { title: "Updated Title", type: "Contract" };

      const response = await api
        .put(`/api/jobs/${job._id}`)
        .send(updates)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(updates.title);

      const updatedJob = await Job.findById(job._id);
      expect(updatedJob.type).toBe(updates.type);
    });
  });

  describe("when the id is invalid", () => {
    it("should return 400 for an invalid ID format", async () => {
      const invalidId = "12345";
      await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
    });
  });
});

// ────────────────── DELETE /api/jobs/:jobId ──────────────────
describe("DELETE /api/jobs/:jobId", () => {
  describe("when the id is valid", () => {
    it("should delete the job and return status 204", async () => {
      const jobsAtStart = await jobsInDb();
      const jobToDelete = jobsAtStart[0];

      await api.delete(`/api/jobs/${jobToDelete.id}`).expect(204);

      const jobsAtEnd = await jobsInDb();
      expect(jobsAtEnd).toHaveLength(jobsAtStart.length - 1);
      expect(jobsAtEnd.map((j) => j.title)).not.toContain(jobToDelete.title);
    });
  });

  describe("when the id is invalid", () => {
    it("should return 400 for an invalid ID format", async () => {
      const invalidId = "12345";
      await api.delete(`/api/jobs/${invalidId}`).expect(400);
    });
  });
});
```

**Expected output:**

```
 PASS  tests/jobs.test.js
  GET /api/jobs
    ✓ should return all jobs as JSON with status 200
    ✓ should contain the first seed job title
  GET /api/jobs/:jobId
    ✓ should return one job by ID
    ✓ should return 404 for a non-existing job ID
    ✓ should return 400 for an invalid job ID format
  POST /api/jobs
    when the payload is valid
      ✓ should create a new job with status 201
    when the payload is invalid
      ✓ should return 400 if required fields are missing
  PUT /api/jobs/:jobId
    when the id is valid
      ✓ should update the job and return the updated document
    when the id is invalid
      ✓ should return 400 for an invalid ID format
  DELETE /api/jobs/:jobId
    when the id is valid
      ✓ should delete the job and return status 204
    when the id is invalid
      ✓ should return 400 for an invalid ID format
```

</details>

#### Commit

```bash
git add .
git commit -m "feat: add POST, PUT, DELETE tests for jobs API without auth"
```

---

## PART 2 — Testing Protected Jobs Endpoints (`backend-auth`)

### Iteration 1 — Setup and user tests

**Step 1:** Navigate to the `backend-auth` directory.

**Step 2:** Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and fill in your MongoDB connection strings and a strong `SECRET` for JWT.

**Step 3:** Install dependencies and verify the server starts:

```bash
npm install
npm run dev
```

Stop the server with `Ctrl+C`.

**Step 4:** Verify Jest works:

```bash
npm test
```

You should see `mock.test.js` pass. Leave this file as-is.

**Step 5:** Create a new test file:

```
tests/users.test.js
```

**Step 6:** Open `examples/users.test.js` and use it as your template. The User model requires: `name`, `email`, `password`, `phone_number`, `gender`, `date_of_birth`, `membership_status`.

**Step 7:** Write tests for these endpoints:

| Method | Endpoint             | Purpose                              |
|--------|----------------------|--------------------------------------|
| POST   | `/api/users/signup`  | Register user (valid + invalid data) |
| POST   | `/api/users/login`   | Login (valid + invalid credentials)  |

For **signup** tests:
- `describe("POST /api/users/signup")` with nested describes:
  - `"when the payload is valid"` → expect `201`, response has `token` and `email`, user saved in DB
  - `"when the payload is invalid"` → missing required fields → expect `400`, user NOT saved in DB
  - `"when the email is already taken"` → sign up twice with same email → expect `400`

For **login** tests:
- `describe("POST /api/users/login")` with a `beforeEach` that signs up a user first:
  - `"when the credentials are valid"` → expect `200`, response has `token`
  - `"when the credentials are invalid"` → wrong password → `400`; non-existing email → `400`

**Step 8:** Run your tests:

```bash
npm test
```

---

> **Try writing the solution on your own first**, then expand to compare your work.

<details>
<summary>Sample Solution — Part 2, Iteration 1</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// ────────────────── POST /api/users/signup ──────────────────
describe("POST /api/users/signup", () => {
  describe("when the payload is valid", () => {
    it("should signup a new user with status 201 and return a token", async () => {
      const userData = {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-123-4567",
        gender: "Female",
        date_of_birth: "1995-06-15",
        membership_status: "Active",
      };

      const result = await api
        .post("/api/users/signup")
        .send(userData)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(result.body).toHaveProperty("token");
      expect(result.body.email).toBe(userData.email);

      // Verify user was actually saved in the database
      const savedUser = await User.findOne({ email: userData.email });
      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe(userData.name);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return 400 if required fields are missing", async () => {
      const userData = {
        email: "incomplete@example.com",
        password: "R3g5T7#gh",
      };

      const result = await api
        .post("/api/users/signup")
        .send(userData)
        .expect(400);

      expect(result.body).toHaveProperty("error");

      // Verify the user was NOT created
      const savedUser = await User.findOne({ email: userData.email });
      expect(savedUser).toBeNull();
    });
  });

  describe("when the email is already taken", () => {
    it("should return 400 for duplicate email", async () => {
      const userData = {
        name: "First User",
        email: "duplicate@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-111-2222",
        gender: "Male",
        date_of_birth: "1990-01-01",
        membership_status: "Active",
      };

      // Create the first user
      await api.post("/api/users/signup").send(userData).expect(201);

      // Try to create a second user with the same email
      const result = await api
        .post("/api/users/signup")
        .send({ ...userData, name: "Second User" })
        .expect(400);

      expect(result.body).toHaveProperty("error");
    });
  });
});

// ────────────────── POST /api/users/login ──────────────────
describe("POST /api/users/login", () => {
  // Sign up a user before each login test
  beforeEach(async () => {
    await api.post("/api/users/signup").send({
      name: "Login Tester",
      email: "login@example.com",
      password: "R3g5T7#gh",
      phone_number: "09-123-4567",
      gender: "Male",
      date_of_birth: "1992-03-20",
      membership_status: "Active",
    });
  });

  describe("when the credentials are valid", () => {
    it("should login and return a token with status 200", async () => {
      const result = await api
        .post("/api/users/login")
        .send({
          email: "login@example.com",
          password: "R3g5T7#gh",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(result.body).toHaveProperty("token");
      expect(result.body.email).toBe("login@example.com");
    });
  });

  describe("when the credentials are invalid", () => {
    it("should return 400 with a wrong password", async () => {
      const result = await api
        .post("/api/users/login")
        .send({
          email: "login@example.com",
          password: "WrongPassword1!",
        })
        .expect(400);

      expect(result.body).toHaveProperty("error");
    });

    it("should return 400 with a non-existing email", async () => {
      const result = await api
        .post("/api/users/login")
        .send({
          email: "nobody@example.com",
          password: "R3g5T7#gh",
        })
        .expect(400);

      expect(result.body).toHaveProperty("error");
    });
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
```

**Expected output:**

```
 PASS  tests/users.test.js
  POST /api/users/signup
    when the payload is valid
      ✓ should signup a new user with status 201 and return a token
    when the payload is invalid
      ✓ should return 400 if required fields are missing
    when the email is already taken
      ✓ should return 400 for duplicate email
  POST /api/users/login
    when the credentials are valid
      ✓ should login and return a token with status 200
    when the credentials are invalid
      ✓ should return 400 with a wrong password
      ✓ should return 400 with a non-existing email
```

</details>

#### Commit

```bash
git add .
git commit -m "feat: add signup and login tests for users API"
```

---

### Iteration 2 — Protected jobs tests

**Step 1:** Create a new test file:

```
tests/jobs.test.js
```

**Step 2:** Open `examples/tours-auth.test.js` and study its structure. Notice how it:

- Uses `beforeAll` to sign up a user **once** and store the token
- Uses `beforeEach` to seed data **via the API** (not `insertMany`) so that `user_id` is set by the controller
- Uses `.set("Authorization", "Bearer " + token)` on protected requests

**Step 3:** Understand the key difference between the tours example and the jobs API:

> In the tours example, **all routes** are protected.
> In the Jobs API, **GET routes are public** — only POST, PUT, and DELETE require authentication.
> This means: no token needed for GET requests, and no 401 test for GET.

**Step 4:** Set up the file:

- Import `mongoose`, `supertest`, `app`, `Job`, and `User`
- Create seed data (two job objects — same as Part 1 but **without** `user_id`, the controller adds it)
- Create a `jobsInDb()` helper
- Add `beforeAll`: delete all users, signup one user, save the token
- Wrap everything in `describe("Job Routes", () => { ... })`
- Add `beforeEach` inside the describe: delete all jobs, seed via API using the token
- Add `afterAll`: close the mongoose connection

**Step 5:** Write tests for all five endpoints:

| Method | Endpoint          | Auth required? |
|--------|-------------------|----------------|
| GET    | `/api/jobs`       | No (public)    |
| GET    | `/api/jobs/:jobId`| No (public)    |
| POST   | `/api/jobs`       | Yes            |
| PUT    | `/api/jobs/:jobId`| Yes            |
| DELETE | `/api/jobs/:jobId`| Yes            |

For each protected endpoint (POST, PUT, DELETE), write nested describes:
- `"when the user is authenticated"` — include the token, expect success
- `"when the user is not authenticated"` — omit the token, expect `401`

For invalid IDs in the auth backend, the controller returns `404` (not `400` like the no-auth version).

**Step 6:** Run your tests:

```bash
npm test
```

---

> **Try writing the solution on your own first**, then expand to compare your work.

<details>
<summary>Sample Solution — Part 2, Iteration 2</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

// Seed data
const jobs = [
  {
    title: "Senior React Developer",
    type: "Full-Time",
    description: "We are seeking a talented Front-End Developer to join our team in Helsinki.",
    company: {
      name: "NewTek Solutions",
      contactEmail: "contact@nteksolutions.com",
      contactPhone: "09-123-4567",
    },
  },
  {
    title: "Junior Python Developer",
    type: "Part-Time",
    description: "Join our Python team and help build data-driven applications.",
    company: {
      name: "DataSoft",
      contactEmail: "hr@datasoft.com",
      contactPhone: "09-765-4321",
    },
  },
];

// Helper: read all jobs straight from DB
const jobsInDb = async () => {
  const allJobs = await Job.find({});
  return allJobs.map((j) => j.toJSON());
};

let token = null;

// Create a user and get a token before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "R3g5T7#gh",
    phone_number: "1234567890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    membership_status: "Active",
  });
  token = result.body.token;
});

describe("Job Routes", () => {
  // Seed jobs via the API (so user_id is set by the controller)
  beforeEach(async () => {
    await Job.deleteMany({});
    await Promise.all(
      jobs.map((job) =>
        api
          .post("/api/jobs")
          .set("Authorization", "Bearer " + token)
          .send(job)
      )
    );
  });

  // ────────────────── GET /api/jobs (public) ──────────────────
  describe("GET /api/jobs", () => {
    it("should return all jobs as JSON with status 200", async () => {
      const response = await api
        .get("/api/jobs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(jobs.length);
    });
  });

  // ────────────────── GET /api/jobs/:jobId (public) ──────────────────
  describe("GET /api/jobs/:jobId", () => {
    it("should return one job by ID", async () => {
      const job = await Job.findOne();
      const response = await api
        .get(`/api/jobs/${job._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(job.title);
    });

    it("should return 404 for a non-existing job ID", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await api.get(`/api/jobs/${nonExistentId}`).expect(404);
    });

    it("should return 404 for an invalid job ID format", async () => {
      const invalidId = "12345";
      await api.get(`/api/jobs/${invalidId}`).expect(404);
    });
  });

  // ────────────────── POST /api/jobs (protected) ──────────────────
  describe("POST /api/jobs", () => {
    describe("when the user is authenticated", () => {
      it("should create a new job with status 201", async () => {
        const newJob = {
          title: "DevOps Engineer",
          type: "Full-Time",
          description: "Manage CI/CD pipelines and cloud infrastructure.",
          company: {
            name: "CloudOps",
            contactEmail: "jobs@cloudops.fi",
            contactPhone: "09-111-2222",
          },
        };

        const response = await api
          .post("/api/jobs")
          .set("Authorization", "Bearer " + token)
          .send(newJob)
          .expect(201);

        expect(response.body.title).toBe(newJob.title);

        const jobsAtEnd = await jobsInDb();
        expect(jobsAtEnd).toHaveLength(jobs.length + 1);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const newJob = {
          title: "Ghost Job",
          type: "Full-Time",
          description: "This should not be created.",
          company: {
            name: "NoCo",
            contactEmail: "no@no.com",
            contactPhone: "000",
          },
        };

        await api.post("/api/jobs").send(newJob).expect(401);

        const jobsAtEnd = await jobsInDb();
        expect(jobsAtEnd).toHaveLength(jobs.length);
      });
    });
  });

  // ────────────────── PUT /api/jobs/:jobId (protected) ──────────────────
  describe("PUT /api/jobs/:jobId", () => {
    describe("when the user is authenticated", () => {
      it("should update the job and return the updated document", async () => {
        const job = await Job.findOne();
        const updates = { title: "Updated Title", type: "Contract" };

        const response = await api
          .put(`/api/jobs/${job._id}`)
          .set("Authorization", "Bearer " + token)
          .send(updates)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(response.body.title).toBe(updates.title);

        const updatedJob = await Job.findById(job._id);
        expect(updatedJob.type).toBe(updates.type);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const job = await Job.findOne();
        await api.put(`/api/jobs/${job._id}`).send({ title: "Nope" }).expect(401);
      });
    });

    describe("when the id is invalid", () => {
      it("should return 404 for an invalid ID format", async () => {
        const invalidId = "12345";
        await api
          .put(`/api/jobs/${invalidId}`)
          .set("Authorization", "Bearer " + token)
          .send({})
          .expect(404);
      });
    });
  });

  // ────────────────── DELETE /api/jobs/:jobId (protected) ──────────────────
  describe("DELETE /api/jobs/:jobId", () => {
    describe("when the user is authenticated", () => {
      it("should delete the job and return status 204", async () => {
        const jobsAtStart = await jobsInDb();
        const jobToDelete = jobsAtStart[0];

        await api
          .delete(`/api/jobs/${jobToDelete.id}`)
          .set("Authorization", "Bearer " + token)
          .expect(204);

        const jobsAtEnd = await jobsInDb();
        expect(jobsAtEnd).toHaveLength(jobsAtStart.length - 1);
        expect(jobsAtEnd.map((j) => j.title)).not.toContain(jobToDelete.title);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const job = await Job.findOne();
        await api.delete(`/api/jobs/${job._id}`).expect(401);
      });
    });

    describe("when the id is invalid", () => {
      it("should return 404 for an invalid ID format", async () => {
        const invalidId = "12345";
        await api
          .delete(`/api/jobs/${invalidId}`)
          .set("Authorization", "Bearer " + token)
          .expect(404);
      });
    });
  });
});

// Close DB connection once after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
```

**Expected output:**

```
 PASS  tests/jobs.test.js
  Job Routes
    GET /api/jobs
      ✓ should return all jobs as JSON with status 200
    GET /api/jobs/:jobId
      ✓ should return one job by ID
      ✓ should return 404 for a non-existing job ID
      ✓ should return 404 for an invalid job ID format
    POST /api/jobs
      when the user is authenticated
        ✓ should create a new job with status 201
      when the user is not authenticated
        ✓ should return 401 if no token is provided
    PUT /api/jobs/:jobId
      when the user is authenticated
        ✓ should update the job and return the updated document
      when the user is not authenticated
        ✓ should return 401 if no token is provided
      when the id is invalid
        ✓ should return 404 for an invalid ID format
    DELETE /api/jobs/:jobId
      when the user is authenticated
        ✓ should delete the job and return status 204
      when the user is not authenticated
        ✓ should return 401 if no token is provided
      when the id is invalid
        ✓ should return 404 for an invalid ID format
```

</details>

#### Commit

```bash
git add .
git commit -m "feat: add protected jobs API tests with auth"
```

---

## PART 3 — Backend Testing Best Practices

These practices are **already applied in the starter repo**. Review them here so you can apply the same setup to **your group project**.

---

#### 1. Separate `app.js` from `index.js`

`app.js` exports the Express app **without** calling `app.listen()`. `index.js` imports it and starts the server. This lets Supertest use the app without port conflicts.

```js
// app.js
// ... middleware, routes, etc.
module.exports = app;
```

```js
// index.js
const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
```

---

#### 2. Install `cross-env`

Install as a **regular dependency** (not dev):

```bash
npm install cross-env
```

It ensures `NODE_ENV` is set correctly on Windows, macOS, and Linux.

---

#### 3. Install test dependencies

```bash
npm install jest supertest -D
```

---

#### 4. Use a strong JWT secret

Use at least 64 bytes of randomness. Generate one at [Browserling's Random Hex Generator](https://www.browserling.com/tools/random-hex):

```
fd20f5055aa4ddae6e76493a39e4481f87810080c7ac9587e49339ed61cd22f7
```

---

#### 5. Add Jest teardown

Create `tests/teardown.js`:

```js
module.exports = () => {
  process.exit(0);
};
```

In `package.json`:

```json
"jest": {
  "testEnvironment": "node",
  "globalTeardown": "./tests/teardown.js"
}
```

---

#### 6. Recommended test script

```json
"test": "cross-env NODE_ENV=test jest --verbose --runInBand"
```

- `NODE_ENV=test` — uses the test database
- `--verbose` — shows each test name in the output
- `--runInBand` — runs tests sequentially (avoids DB race conditions)

---

#### 7. `glob` package override

Add to `package.json` if you see deprecation warnings:

```json
"overrides": {
  "glob": "^13.0.0"
}
```

---

#### 8. Run a single test by name

```bash
npm test -- --testNamePattern="should return 400 for invalid job ID"
```

The `--` tells npm to forward everything after it to Jest.

---

## Common Pitfalls to Avoid

1. **Forgetting `async`/`await`** — All test callbacks that use async operations must be `async`, and promises must be awaited
2. **Shared test data** — Reset or create fresh test data for each test to avoid tests affecting each other
3. **Hardcoding IDs** — Never hardcode a MongoDB `_id`. Always read a real ID from the database first
4. **Token expiration** — Generate a fresh token in `beforeAll` and store it in a variable accessible to all tests
5. **Not cleaning up** — Use `beforeEach` to reset data and `afterAll` to close the DB connection
6. **Testing implementation details** — Focus on behavior (what the API does) not implementation (how it does it)

---

## Helpful Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [HTTP Status Codes Reference](https://httpwg.org/specs/rfc7231.html#status.codes)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
