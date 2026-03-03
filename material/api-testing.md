
## Testing Protected Book Endpoints

### Iteration 1 — Setup and user tests

**Step 1:** Navigate to the `backend` directory.

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

**Step 6:** The User model requires three fields: `name`, `email`, `password`.

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

### Iteration 2 — Protected book tests

**Step 1:** Create a new test file:

```
tests/books.test.js
```

**Step 2:** Study the route protection in `routes/bookRouter.js`. Notice how it:

- Defines public GET routes **before** `router.use(requireAuth)`
- Defines protected POST, PUT, and DELETE routes **after** the middleware

This means: **no token is needed for GET requests**, and no 401 test for GET.

**Step 3:** Set up the file:

- Import `mongoose`, `supertest`, `app`, `Book`, and `User`
- Create seed data (two book objects with `title`, `author`, and `isbn`)
- Create a `booksInDb()` helper that reads all books from the database
- Add `beforeAll`: delete all users, sign up one user, save the token
- Wrap everything in `describe("Book Routes", () => { ... })`
- Add `beforeEach` inside the describe: delete all books, seed two books via the API using the token
- Add `afterAll`: close the mongoose connection

**Step 4:** Write tests for all five endpoints:

| Method | Endpoint              | Auth required? |
|--------|-----------------------|----------------|
| GET    | `/api/books`          | No (public)    |
| GET    | `/api/books/:bookId`  | No (public)    |
| POST   | `/api/books`          | Yes            |
| PUT    | `/api/books/:bookId`  | Yes            |
| DELETE | `/api/books/:bookId`  | Yes            |

For each protected endpoint (POST, PUT, DELETE), write nested describes:
- `"when the user is authenticated"` — include the token, expect success
- `"when the user is not authenticated"` — omit the token, expect `401`

For invalid IDs, the controller returns `404` (not `400`).

**Step 5:** Run your tests:

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
const Book = require("../models/bookModel");
const User = require("../models/userModel");

// Seed data
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0-13-235088-4",
  },
];

// Helper: read all books straight from DB
const booksInDb = async () => {
  const allBooks = await Book.find({});
  return allBooks.map((b) => b.toJSON());
};

let token = null;

// Create a user and get a token before all tests
beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "R3g5T7#gh",
  });
  token = result.body.token;
});

describe("Book Routes", () => {
  // Seed books via the API (so the controller handles creation)
  beforeEach(async () => {
    await Book.deleteMany({});
    await api
      .post("/api/books")
      .set("Authorization", "Bearer " + token)
      .send(books[0]);

    await api
      .post("/api/books")
      .set("Authorization", "Bearer " + token)
      .send(books[1]);
  });

  // ────────────────── GET /api/books (public) ──────────────────
  describe("GET /api/books", () => {
    it("should return all books as JSON with status 200", async () => {
      const response = await api
        .get("/api/books")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(books.length);
    });
  });

  // ────────────────── GET /api/books/:bookId (public) ──────────────────
  describe("GET /api/books/:bookId", () => {
    it("should return one book by ID", async () => {
      const book = await Book.findOne();
      const response = await api
        .get(`/api/books/${book._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(book.title);
    });

    it("should return 404 for a non-existing book ID", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await api.get(`/api/books/${nonExistentId}`).expect(404);
    });

    it("should return 404 for an invalid book ID format", async () => {
      const invalidId = "12345";
      await api.get(`/api/books/${invalidId}`).expect(404);
    });
  });

  // ────────────────── POST /api/books (protected) ──────────────────
  describe("POST /api/books", () => {
    describe("when the user is authenticated", () => {
      it("should create a new book with status 201", async () => {
        const newBook = {
          title: "Design Patterns",
          author: "Erich Gamma",
          isbn: "978-0-201-63361-0",
        };

        const response = await api
          .post("/api/books")
          .set("Authorization", "Bearer " + token)
          .send(newBook)
          .expect(201);

        expect(response.body.title).toBe(newBook.title);

        const booksAtEnd = await booksInDb();
        expect(booksAtEnd).toHaveLength(books.length + 1);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const newBook = {
          title: "Ghost Book",
          author: "Nobody",
          isbn: "000-0-000-0000-0",
        };

        await api.post("/api/books").send(newBook).expect(401);

        const booksAtEnd = await booksInDb();
        expect(booksAtEnd).toHaveLength(books.length);
      });
    });
  });

  // ────────────────── PUT /api/books/:bookId (protected) ──────────────────
  describe("PUT /api/books/:bookId", () => {
    describe("when the user is authenticated", () => {
      it("should update the book and return the updated document", async () => {
        const book = await Book.findOne();
        const updates = { title: "Updated Title", author: "Updated Author" };

        const response = await api
          .put(`/api/books/${book._id}`)
          .set("Authorization", "Bearer " + token)
          .send(updates)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(response.body.title).toBe(updates.title);

        const updatedBook = await Book.findById(book._id);
        expect(updatedBook.author).toBe(updates.author);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const book = await Book.findOne();
        await api
          .put(`/api/books/${book._id}`)
          .send({ title: "Nope" })
          .expect(401);
      });
    });

    describe("when the id is invalid", () => {
      it("should return 404 for an invalid ID format", async () => {
        const invalidId = "12345";
        await api
          .put(`/api/books/${invalidId}`)
          .set("Authorization", "Bearer " + token)
          .send({})
          .expect(404);
      });
    });
  });

  // ────────────────── DELETE /api/books/:bookId (protected) ──────────────────
  describe("DELETE /api/books/:bookId", () => {
    describe("when the user is authenticated", () => {
      it("should delete the book and return status 204", async () => {
        const booksAtStart = await booksInDb();
        const bookToDelete = booksAtStart[0];

        await api
          .delete(`/api/books/${bookToDelete.id}`)
          .set("Authorization", "Bearer " + token)
          .expect(204);

        const booksAtEnd = await booksInDb();
        expect(booksAtEnd).toHaveLength(booksAtStart.length - 1);
        expect(booksAtEnd.map((b) => b.title)).not.toContain(
          bookToDelete.title
        );
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const book = await Book.findOne();
        await api.delete(`/api/books/${book._id}`).expect(401);
      });
    });

    describe("when the id is invalid", () => {
      it("should return 404 for an invalid ID format", async () => {
        const invalidId = "12345";
        await api
          .delete(`/api/books/${invalidId}`)
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
 PASS  tests/books.test.js
  Book Routes
    GET /api/books
      ✓ should return all books as JSON with status 200
    GET /api/books/:bookId
      ✓ should return one book by ID
      ✓ should return 404 for a non-existing book ID
      ✓ should return 404 for an invalid book ID format
    POST /api/books
      when the user is authenticated
        ✓ should create a new book with status 201
      when the user is not authenticated
        ✓ should return 401 if no token is provided
    PUT /api/books/:bookId
      when the user is authenticated
        ✓ should update the book and return the updated document
      when the user is not authenticated
        ✓ should return 401 if no token is provided
      when the id is invalid
        ✓ should return 404 for an invalid ID format
    DELETE /api/books/:bookId
      when the user is authenticated
        ✓ should delete the book and return status 204
      when the user is not authenticated
        ✓ should return 401 if no token is provided
      when the id is invalid
        ✓ should return 404 for an invalid ID format
```

</details>

#### Commit

```bash
git add .
git commit -m "feat: add protected books API tests with auth"
```

---

### Full Solution

<details>
<summary>Full Solution — tests/users.test.js</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/users/signup", () => {
  describe("when the payload is valid", () => {
    it("should signup a new user with status 201 and return a token", async () => {
      const userData = {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "R3g5T7#gh",
      };

      const result = await api
        .post("/api/users/signup")
        .send(userData)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(result.body).toHaveProperty("token");
      expect(result.body.email).toBe(userData.email);

      const savedUser = await User.findOne({ email: userData.email });
      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe(userData.name);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return 400 if required fields are missing", async () => {
      const userData = {
        email: "incomplete@example.com",
      };

      const result = await api
        .post("/api/users/signup")
        .send(userData)
        .expect(400);

      expect(result.body).toHaveProperty("error");

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
      };

      await api.post("/api/users/signup").send(userData).expect(201);

      const result = await api
        .post("/api/users/signup")
        .send({ ...userData, name: "Second User" })
        .expect(400);

      expect(result.body).toHaveProperty("error");
    });
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await api.post("/api/users/signup").send({
      name: "Login Tester",
      email: "login@example.com",
      password: "R3g5T7#gh",
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

afterAll(async () => {
  await mongoose.connection.close();
});
```

</details>

<details>
<summary>Full Solution — tests/books.test.js</summary>

```js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0-13-235088-4",
  },
];

const booksInDb = async () => {
  const allBooks = await Book.find({});
  return allBooks.map((b) => b.toJSON());
};

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "R3g5T7#gh",
  });
  token = result.body.token;
});

describe("Book Routes", () => {
  beforeEach(async () => {
    await Book.deleteMany({});
    await api
      .post("/api/books")
      .set("Authorization", "Bearer " + token)
      .send(books[0]);

    await api
      .post("/api/books")
      .set("Authorization", "Bearer " + token)
      .send(books[1]);
  });

  describe("GET /api/books", () => {
    it("should return all books as JSON with status 200", async () => {
      const response = await api
        .get("/api/books")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(books.length);
    });
  });

  describe("GET /api/books/:bookId", () => {
    it("should return one book by ID", async () => {
      const book = await Book.findOne();
      const response = await api
        .get(`/api/books/${book._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(book.title);
    });

    it("should return 404 for a non-existing book ID", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      await api.get(`/api/books/${nonExistentId}`).expect(404);
    });

    it("should return 404 for an invalid book ID format", async () => {
      const invalidId = "12345";
      await api.get(`/api/books/${invalidId}`).expect(404);
    });
  });

  describe("POST /api/books", () => {
    describe("when the user is authenticated", () => {
      it("should create a new book with status 201", async () => {
        const newBook = {
          title: "Design Patterns",
          author: "Erich Gamma",
          isbn: "978-0-201-63361-0",
        };

        const response = await api
          .post("/api/books")
          .set("Authorization", "Bearer " + token)
          .send(newBook)
          .expect(201);

        expect(response.body.title).toBe(newBook.title);

        const booksAtEnd = await booksInDb();
        expect(booksAtEnd).toHaveLength(books.length + 1);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const newBook = {
          title: "Ghost Book",
          author: "Nobody",
          isbn: "000-0-000-0000-0",
        };

        await api.post("/api/books").send(newBook).expect(401);

        const booksAtEnd = await booksInDb();
        expect(booksAtEnd).toHaveLength(books.length);
      });
    });
  });

  describe("PUT /api/books/:bookId", () => {
    describe("when the user is authenticated", () => {
      it("should update the book and return the updated document", async () => {
        const book = await Book.findOne();
        const updates = { title: "Updated Title", author: "Updated Author" };

        const response = await api
          .put(`/api/books/${book._id}`)
          .set("Authorization", "Bearer " + token)
          .send(updates)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(response.body.title).toBe(updates.title);

        const updatedBook = await Book.findById(book._id);
        expect(updatedBook.author).toBe(updates.author);
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const book = await Book.findOne();
        await api
          .put(`/api/books/${book._id}`)
          .send({ title: "Nope" })
          .expect(401);
      });
    });

    describe("when the id is invalid", () => {
      it("should return 404 for an invalid ID format", async () => {
        const invalidId = "12345";
        await api
          .put(`/api/books/${invalidId}`)
          .set("Authorization", "Bearer " + token)
          .send({})
          .expect(404);
      });
    });
  });

  describe("DELETE /api/books/:bookId", () => {
    describe("when the user is authenticated", () => {
      it("should delete the book and return status 204", async () => {
        const booksAtStart = await booksInDb();
        const bookToDelete = booksAtStart[0];

        await api
          .delete(`/api/books/${bookToDelete.id}`)
          .set("Authorization", "Bearer " + token)
          .expect(204);

        const booksAtEnd = await booksInDb();
        expect(booksAtEnd).toHaveLength(booksAtStart.length - 1);
        expect(booksAtEnd.map((b) => b.title)).not.toContain(
          bookToDelete.title
        );
      });
    });

    describe("when the user is not authenticated", () => {
      it("should return 401 if no token is provided", async () => {
        const book = await Book.findOne();
        await api.delete(`/api/books/${book._id}`).expect(401);
      });
    });

    describe("when the id is invalid", () => {
      it("should return 404 for an invalid ID format", async () => {
        const invalidId = "12345";
        await api
          .delete(`/api/books/${invalidId}`)
          .set("Authorization", "Bearer " + token)
          .expect(404);
      });
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
```

</details>