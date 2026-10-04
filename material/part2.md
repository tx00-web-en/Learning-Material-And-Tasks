# Activity - Part 2 (With Authentication)

Continue from the completed Part 1 workout application.

- Iteration 5 adds signup/login while workout CRUD remains public.
- Iteration 6 protects workout create, update, and delete.
- Iteration 7 tests authentication and protected routes.

## Deliverables

- Working signup/login API and frontend with username authentication.
- Public workout reads and protected workout writes.
- Passing API tests.
- One commit per iteration, such as `[iter6] feat(workouts): protect workout write routes`.

## Setup

Create a new repository for Part 2 using the application you completed in Part 1 as the starting code. Copy the completed backend and frontend into the new repository without copying the old `.git` folder. Keep `.env`, `node_modules`, and `dist` out of version control, and include `.env.example`.

Commit your completed Part 1 application as the starting point in the new repository. Confirm that it runs, then start Part 2 with Iteration 5.

Use one branch and alternate driver/navigator roles after each iteration.

## Iteration 5: Add User Signup and Login

From `backend`, install:

```bash
npm install bcryptjs jsonwebtoken
```

Vitest, Supertest, and cross-env were installed in Part 1. Keep the existing test script and minimal Vitest configuration.

Add a long random `SECRET` to the backend `.env` for JWT signing. Export it from `utils/config.js`. Never commit real credentials.


### User Model

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
```

Use `username`, not email, throughout signup, login, forms, and tests. Store the bcrypt password hash. For this lab, signup includes a role selector with `user` and `admin`; the backend validates and saves the selected role, defaulting to `user` when omitted. Display the role beside the username. Both roles have the same workout permissions in this exercise.

The workout model remains:

```js
const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
```

### Endpoints and Frontend

Implement:

- `POST /api/users/signup`: require username, password, phoneNumber, and name; reject duplicate usernames; hash the password; return status `201` with a JWT.
- `POST /api/users/login`: check username/password; return status `200` with a JWT.
- Return `400` for missing fields, duplicate usernames, or invalid login credentials.
- Return username, name, phoneNumber, role, and token; never return the password hash.
- Sign a token with the user ID and an expiry. Redact passwords from request logs.

Add signup and login pages, store the returned user/token, display the username, and provide logout. Confirm the session survives refresh.

Workout CRUD is still public at this stage. Use [api-testing-v2.md](https://github.com/tx00-resources-en/API-testing-products/blob/main/products-api2-auth/api-testing.md) as a reference for `tests/users.test.js`; keep the public workout tests from V1. Adapt all fields to the schemas above.

Test signup, duplicate username, missing fields, hashed password storage, successful login, and invalid credentials. In the browser, sign up, log out, log in, and refresh.

The sample solution for the backend and frontend for this step is available here: [Iteration 5 sample solution](https://github.com/tx00-resources-en/w8-fullstack-sample-solutions/tree/main/part2/iter5/).


## Iteration 6: Protect Workout Routes

Keep these public:

- `GET /api/workouts`
- `GET /api/workouts/:workoutId`

Require a valid `Authorization: Bearer <token>` header for:

- `POST /api/workouts`
- `PUT /api/workouts/:workoutId`
- `DELETE /api/workouts/:workoutId`

Place the public read routes before `router.use(requireAuth)`, then register the write routes afterward.

The authentication middleware verifies the JWT with `SECRET` and confirms that the user still exists. Return `401` for missing, invalid, expired tokens, or a deleted user.

On the frontend, attach the token to every write request. Keep public listings and details available to visitors. Show login links in place of write controls when logged out, and redirect direct visits to add/edit pages to login.

Verify public reads and rejected unauthenticated writes, then log in and check add, edit, and delete in the browser. Logging out must remove write controls.

The sample solution for the backend and frontend for this step is available here: [Iteration 6 sample solution](https://github.com/tx00-resources-en/w8-fullstack-sample-solutions/tree/main/part2/iter6/).

## Iteration 7: Add Authentication and Protected-Route API Tests

Use [api-testing-v3.md](https://github.com/tx00-resources-en/API-testing-products/blob/main/products-api3-protect/api-testing.md) as a reference. Keep the user tests and update the workout tests to the protected version.

In `tests/workout.test.js`:

- Keep a workout seed array and a `workoutsInDb()` helper.
- In `beforeAll`, connect to the test database, reset test users, sign up a real test user, and save the returned token.
- In `beforeEach`, reset workouts and seed through authenticated POST requests.
- Keep both GET endpoints public in the tests.
- Test authenticated POST, PUT, and DELETE with a Bearer token.
- Test missing, malformed, expired tokens, and tokens for deleted users.
- Verify rejected writes do not create, change, or delete database records.
- Close the Mongoose connection in `afterAll`.

Adapt the product guide's fields and statuses: workouts have no `user_id`; malformed workout IDs return `400`, missing workouts return `404`, and successful DELETE returns `204`.

Run from `backend`:

```bash
npm test
```

Use only the separate disposable `TEST_MONGO_URI` database. Keep `fileParallelism: false` because the suites reset test collections.

The sample solution for the backend and frontend for this step is available here: [Iteration 7 sample solution](https://github.com/tx00-resources-en/w8-fullstack-sample-solutions/tree/main/part2/iter7/). This step updates backend tests; keep the frontend from Iteration 6.

## Iteration 8:

Change the backend to run on port `5001`, then update the frontend Vite proxy so frontend requests to `/api` still reach the backend.

Set the backend environment port, update the proxy target, and restart both development servers.

Verify:

- The backend logs `Server running on port 5001`.
- `frontend/vite.config.js` proxies `/api` to `http://localhost:5001`.
- Frontend requests to `/api/workouts` still work.


