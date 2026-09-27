# Theory: Testing Express APIs with Vitest and Supertest

This writing explains the ideas behind the Product API testing labs. The labs can be completed without reading this entire article first, but this file gives more background about the tools and choices used in the exercises.

## Why test an API?

An API test checks how the backend behaves when a client sends real HTTP requests to it. In these labs, the tests send requests such as:

- `GET /api/products`
- `POST /api/products`
- `POST /api/users/signup`
- `POST /api/users/login`
- `PUT /api/products/:productId`
- `DELETE /api/products/:productId`

A good API test checks the response and, when needed, the database state after the request. For example, a `POST` test should not only check that the response status is `201`; it should also check that the new document was actually saved in MongoDB.

## Unit tests and integration tests

A unit test checks a small piece of code in isolation. For example, it may test one helper function.

An integration test checks how several parts of the application work together. The tests in these labs are integration tests because they involve:

- Express routes
- Controllers
- Middleware
- Mongoose models
- MongoDB
- Authentication in the protected backend

These tests are useful because many backend bugs happen between layers. A controller may work by itself, but the route may be wrong. A route may exist, but the request body may not match the model. An authentication middleware may work, but the test must prove that protected routes reject requests without a token.

## Why Vitest?

Vitest is the test runner used in these labs. A test runner finds test files, runs them, and reports whether the tests passed or failed.

Vitest provides familiar testing functions:

```js
describe("GET /api/products", () => {
  it("should return all products", async () => {
    expect(1 + 1).toBe(2);
  });
});
```

The common functions are:

| Function | Purpose |
|----------|---------|
| `describe` | Groups related tests. In these labs, each endpoint gets its own `describe` block. |
| `it` | Defines one test case. The sentence should describe one expected behavior. |
| `expect` | Makes an assertion about the result. |
| `beforeAll` | Runs once before all tests in a file. Useful for connecting to the database or creating a test user. |
| `beforeEach` | Runs before each test. Useful for resetting collections and adding seed data. |
| `afterAll` | Runs once after all tests in a file. Useful for closing the database connection. |

Vitest is compatible with many Jest-style testing ideas. If you have used Jest before, the structure will feel familiar.

Useful documentation:

- [Vitest guide](https://vitest.dev/guide/)
- [Jest getting started](https://jestjs.io/docs/getting-started)

## Why Supertest?

Supertest lets tests send HTTP requests to an Express app without starting the server on a real port.

In the application, `app.js` exports the Express app:

```js
module.exports = app;
```

The test wraps that app with Supertest:

```js
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
```

Then the test can make requests:

```js
await api
  .get("/api/products")
  .expect(200)
  .expect("Content-Type", /application\/json/);
```

This is useful because the test can exercise the real route and middleware stack while keeping the test simple. There is no need to run `npm run dev` in another terminal during the tests.

## Why the app and server are separated

A common backend structure is:

- `app.js` creates and exports the Express app.
- `index.js` connects the app to a port with `app.listen(...)`.

This separation helps testing. Supertest needs the Express app object. It does not need a running server process.

A good structure is:

```js
// app.js
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/products", productRouter);

module.exports = app;
```

```js
// index.js
const app = require("./app");

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
```

The tests import `app.js`, not `index.js`.

## Why tests use a separate database

Tests create, update, and delete data. If tests use the same database as development, they can damage useful development data.

For that reason, the labs use a separate test database:

```text
MONGO_URI=mongodb://localhost:27017/products-api
TEST_MONGO_URI=mongodb://localhost:27017/products-api-test
```

The config file chooses the database based on `NODE_ENV`:

```js
const MONGO_URI = process.env.NODE_ENV === "test"
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI;
```

When `NODE_ENV=test`, the app uses `TEST_MONGO_URI`.

This makes the test workflow safer. The tests can clear collections with `deleteMany({})` without deleting development data.

## Why setup hooks are used

Tests should be repeatable. A test should pass whether it runs first, last, or by itself.

The labs use setup hooks to make that possible.

### `beforeAll`

Use `beforeAll` for work that only needs to happen once before the test file runs.

Examples:

```js
beforeAll(async () => {
  await connectDB();
});
```

In protected route tests, `beforeAll` can also create one user and store the token:

```js
let token = null;

beforeAll(async () => {
  const response = await api.post("/api/users/signup").send(userData);
  token = response.body.token;
});
```

### `beforeEach`

Use `beforeEach` to reset the database before every test.

Example:

```js
beforeEach(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
});
```

This makes every test start from the same known state.

### `afterAll`

Use `afterAll` to close the database connection after the tests finish.

```js
afterAll(async () => {
  await mongoose.connection.close();
});
```

Without this, the test process may stay open because Mongoose still has an active connection.

## Why tests are grouped by endpoint

The labs organize tests like this:

```js
describe("GET /api/products", () => {
  it("should return all products", async () => {});
});

describe("POST /api/products", () => {
  describe("when the payload is valid", () => {
    it("should return status 201", async () => {});
  });
});
```

This structure makes the output read like a story:

```text
GET /api/products
  should return all products
  should return products as JSON with status 200

POST /api/products
  when the payload is valid
    should return status 201
```

That makes failures easier to understand. If a test fails, the output points to the route and behavior that failed.

## Testing public routes

A public route does not require a logged-in user.

Examples:

```js
await api.get("/api/products").expect(200);
```

For a public `GET` endpoint, useful checks include:

- Status code is `200`.
- Response content type is JSON.
- Response body has the expected number of items.
- Response body contains an expected item.

## Testing create routes

A create route usually uses `POST`.

A useful `POST` test checks two things:

1. The API response.
2. The database state after the request.

Example:

```js
await api.post("/api/products").send(newProduct).expect(201);

const productsAfterPost = await Product.find({});
expect(productsAfterPost).toHaveLength(products.length + 1);
```

For invalid input, the test should also check that the database did not change:

```js
await api.post("/api/products").send(invalidProduct).expect(400);

const productsAtEnd = await Product.find({});
expect(productsAtEnd).toHaveLength(products.length);
```

## Testing update routes

An update route usually uses `PUT` or `PATCH`.

A useful update test sends new values, expects a success status, and reads the document again from the database:

```js
await api
  .put(`/api/products/${product._id}`)
  .send({ stockQuantity: 42 })
  .expect(200);

const updatedProduct = await Product.findById(product._id);
expect(updatedProduct.stockQuantity).toBe(42);
```

This proves that the update was persisted, not only returned in the response.

## Testing delete routes

A delete route usually returns `204 No Content` when deletion succeeds.

A useful delete test checks the status and then checks that the document is gone:

```js
await api.delete(`/api/products/${product._id}`).expect(204);

const deletedProduct = await Product.findById(product._id);
expect(deletedProduct).toBeNull();
```

## Testing invalid IDs

MongoDB document IDs use the ObjectId format. A route should handle bad IDs without crashing.

Example:

```js
await api.get("/api/products/12345").expect(404);
```

Some APIs return `400` for malformed IDs and some return `404`. The important point is that the test should match the behavior of the API being tested.

## Testing user signup and login

Signup and login tests check authentication endpoints.

For signup, useful checks include:

- A valid payload returns `201`.
- The response contains an email and token.
- The user is saved in the database.
- Missing required fields return `400`.
- Duplicate email returns `400`.

For login, useful checks include:

- Valid credentials return `200`.
- The response contains an email and token.
- Wrong password returns `400`.
- Unknown email returns `400`.

The tests do not need to inspect the password hash directly. It is enough to prove that signup stores the user and login works with the original password.

## Testing protected routes

A protected route requires a valid token.

The protected backend uses this route pattern:

```js
router.get("/", getAllProducts);
router.get("/:productId", getProductById);

router.use(requireAuth);

router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
```

This means:

- `GET /api/products` is public.
- `GET /api/products/:productId` is public.
- `POST /api/products` is protected.
- `PUT /api/products/:productId` is protected.
- `DELETE /api/products/:productId` is protected.

Protected route tests need a token. The clean way to get one is to sign up a user in the test:

```js
const response = await api.post("/api/users/signup").send(userData);
token = response.body.token;
```

Then send the token in the `Authorization` header:

```js
await api
  .post("/api/products")
  .set("Authorization", `Bearer ${token}`)
  .send(newProduct)
  .expect(201);
```

The test should also verify the route rejects unauthenticated requests:

```js
await api.post("/api/products").send(newProduct).expect(401);
```

## Why protected tests should not invent `user_id`

In the protected backend, the product schema has `user_id`. This field should come from the authenticated user.

A test should not add a fake `user_id` to the request body just to satisfy the schema. That would skip the real behavior of the API.

Instead, the test should:

1. Sign up a user.
2. Get the token.
3. Send the token with the product request.
4. Let the middleware and controller set `user_id`.

Then the test can check that the response includes `user_id`.

## Why `cross-env` is used

Different operating systems set environment variables differently.

This works on macOS and Linux:

```bash
NODE_ENV=test vitest run
```

This does not work the same way in Windows Command Prompt.

`cross-env` solves that problem. It lets one script work on Windows, macOS, and Linux:

```json
"test": "cross-env NODE_ENV=test vitest run"
```

In the protected backend, the final scripts are:

```json
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "dev": "cross-env NODE_ENV=development nodemon index.js",
  "test": "cross-env NODE_ENV=test vitest run",
  "test:coverage": "cross-env NODE_ENV=test vitest run --coverage",
  "test:watch": "cross-env NODE_ENV=test vitest"
}
```

These scripts make the environment explicit:

| Script | Environment | Purpose |
|--------|-------------|---------|
| `start` | `production` | Run the app as a production process. |
| `dev` | `development` | Run the app with `nodemon` during development. |
| `test` | `test` | Run tests once. |
| `test:coverage` | `test` | Run tests and produce a coverage report. |
| `test:watch` | `test` | Run tests in watch mode while developing. |

## Why software uses different environments

A backend often behaves slightly differently depending on where it runs.

Common environments are:

| Environment | Purpose |
|-------------|---------|
| `development` | Used while building the app locally. It may use a development database and verbose logging. |
| `test` | Used by automated tests. It should use a separate test database. |
| `production` | Used for the deployed app. It should use production settings and production data. |

The main reason to separate environments is safety. Tests should never delete production or development data.

## What to put in `.gitignore`

Generated files and secret files should not be committed.

For these labs, `.gitignore` should include:

```text
.env
node_modules/
.vitest/
coverage/
```

Why each one is ignored:

| Entry | Reason |
|-------|--------|
| `.env` | Contains local connection strings and secrets. |
| `node_modules/` | Installed dependencies can be recreated with `npm install`. |
| `.vitest/` | Vitest cache files are generated automatically. |
| `coverage/` | Coverage reports are generated output. |

`.env.example` should be committed because it shows other developers which variables they need to define.

Example `.env.example`:

```text
PORT=4000
MONGO_URI=mongodb://localhost:27017/products-api
TEST_MONGO_URI=mongodb://localhost:27017/products-api-test
SECRET=replace_this_with_a_real_secret
```

## What coverage means

Coverage measures how much of the source code was executed while tests ran.

Vitest can generate coverage with the V8 coverage provider:

```bash
npm install @vitest/coverage-v8 -D
npm run test:coverage
```

A coverage report usually includes:

| Metric | Meaning |
|--------|---------|
| Statements | How many executable statements ran. |
| Branches | How many branches ran, such as `if` and `else` paths. |
| Functions | How many functions were called. |
| Lines | How many source lines ran. |

Coverage is useful because it can reveal code paths that tests never reached. It does not prove that the tests are good by itself. A test can execute a line without making a meaningful assertion. Use coverage as a guide, then write tests that check real behavior.

## A practical testing workflow

A useful workflow is:

1. Add the test tools.
2. Add a simple mock test.
3. Run the mock test to verify the test runner works.
4. Connect tests to a test database.
5. Test public read endpoints.
6. Test create, update, and delete endpoints.
7. Add user signup and login tests.
8. Add protected route tests with real tokens.
9. Add coverage and watch mode.
10. Keep generated files and secrets out of Git.

The three backends in this lab follow that progression so each new idea is introduced after the previous one is working.
