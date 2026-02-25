# Frontend Activity — Book Library (Parts 1 & 2)

- [Part 1 — CRUD Front-End (Iterations 0–5)](#part-1--crud-front-end)
- [Part 2 — Authentication & Route Protection (Iterations 6–7)](#part-2--authentication--route-protection)

---

# Part 1 — CRUD Front-End

## Overview

Connect a **React** front-end to the provided **Express + MongoDB** back-end. By the end you will have a working app that can **Create, Read, Update and Delete** (CRUD) books through the API.

| Folder | Purpose |
|---|---|
| `backend/` | The fully working Express API. Do not modify it. |
| `frontend/` | Your starting point. |

---

## The Backend API (Reference)

**Base URL:** `http://localhost:4000`  
The Vite proxy in `vite.config.js` forwards any request starting with `/api` to this URL — use `/api/books` in your React code.

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/books` | Create a book | JSON |
| `GET` | `/api/books` | Get all books | — |
| `GET` | `/api/books/:bookId` | Get one book | — |
| `PUT` | `/api/books/:bookId` | Update a book | JSON |
| `DELETE` | `/api/books/:bookId` | Delete a book | — |

**Book JSON shape:**

```json
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "publisher": "string",
  "genre": "string",
  "availability": {
    "isAvailable": true,
    "dueDate": "YYYY-MM-DD",
    "borrower": "string"
  }
}
```

---

## Iterations

### Iteration 0: Setup

Start the backend (`cd backend`, install dependencies, create `.env` from `.env.example`, run the dev server). Start the frontend (`cd frontend`, install dependencies, run the dev server).

**Done when:** backend is on `http://localhost:4000`, frontend on `http://localhost:5173`, and the basic UI is visible.

**Commit:** `chore: install dependencies and set up project`

---

### Iteration 1: Add a Book (`POST`)

**File:** `src/pages/AddBookPage.jsx`

The form exists but is not wired up. Make it work: use controlled inputs with `useState` for all fields (including `publisher`, `genre`, `dueDate`, `borrower`, and `isAvailable`), send a `POST` request on submit, and navigate to the Home page on success.

**Done when:** filling in the form and submitting saves the book to the database.

**Commit:** `feat(add-book): send POST request from AddBookPage form`

---

### Iteration 2: List All Books (`GET`)

**Files:** `src/pages/HomePage.jsx`, `src/components/BookListings.jsx`, `src/components/BookListing.jsx`

Fetch all books from the API when the Home page mounts and display them. Handle loading and error states. Each `BookListing` should show at minimum the book's title, author, `publisher`, and `genre`.

**Done when:** the Home page shows all books from the database, including the new fields.

**Commit:** `feat(list-books): fetch and display all books on HomePage`

---

### Iteration 3: View a Single Book (`GET`)

**Files:** `src/App.jsx`, `src/components/BookListing.jsx`, `src/pages/BookPage.jsx`

Add a route for `/books/:id`. Link each book title in the list to its detail page. On `BookPage`, fetch the book by ID (from the URL) and display all its fields. Add a "Back" button.

**Done when:** clicking a book title opens a detail page with all its data.

**Commit:** `feat(book-page): add route and fetch single book by id`

---

### Iteration 4: Delete a Book (`DELETE`)

**File:** `src/pages/BookPage.jsx`

Add a "Delete" button to the detail page. Ask the user to confirm before sending the `DELETE` request. Navigate to the Home page on success.

**Done when:** confirming deletion removes the book and returns to the Home page.

**Commit:** `feat(book-page): add delete button with confirmation dialog`

---

### Iteration 5: Edit a Book (`PUT`)

**Files:** `src/App.jsx`, `src/pages/BookPage.jsx`, `src/pages/EditBookPage.jsx`

Add a route for `/edit-book/:id`. Add an "Edit" button on the detail page that navigates to this route. On `EditBookPage`, fetch the current book data, pre-fill the form, and send a `PUT` request on submit. Include all fields (`publisher`, `genre`, `dueDate`). Navigate to the detail page on success.

**Done when:** the edit form opens pre-filled, and submitting it updates the book in the database.

**Commit:** `feat(edit-book): add route and pre-filled edit form with PUT request`

---

## Part 1 Summary

| Operation | HTTP Method | Files |
|---|---|---|
| Create | `POST` | `AddBookPage.jsx` |
| Read all | `GET` | `HomePage.jsx`, `BookListings.jsx`, `BookListing.jsx` |
| Read one | `GET` | `BookPage.jsx` |
| Update | `PUT` | `EditBookPage.jsx` |
| Delete | `DELETE` | `BookPage.jsx` |

Commit after each iteration.

---

# Part 2 — Authentication & Route Protection

## Overview

Extend the app with user registration, login, and route protection so that only authenticated users can create, edit, or delete books.

| Folder | Purpose |
|---|---|
| `backend-auth/` | API with signup/login endpoints; book routes are unprotected. |
| `backend-protect/` | API with signup/login **and** `requireAuth` middleware on POST/PUT/DELETE book routes. |

---

## The Backend APIs (Reference)

**Base URL:** `http://localhost:4000`

### Authentication endpoints (both backends)

| Method | Endpoint | Request Body |
|---|---|---|
| `POST` | `/api/users/signup` | `{ name, email, password, phone_number, address, membership_status }` |
| `POST` | `/api/users/login` | `{ email, password }` |

Both return `{ email, token }` on success. The `token` is a JWT — store it in `localStorage` and send it as `Authorization: Bearer <token>` on protected requests.

### Protected routes (`backend-protect/` only)

`POST /api/books`, `PUT /api/books/:bookId`, and `DELETE /api/books/:bookId` require the `Authorization: Bearer <token>` header. Without it the API returns `{ "error": "Authorization token required" }`.

---

## Iterations

### Iteration 6: User Signup & Login

**Switch backend:** stop the current backend and start `backend-auth/`.

**New files:** `src/pages/Signup.jsx`, `src/pages/Login.jsx`  
**Changed files:** `src/App.jsx`, `src/components/Navbar.jsx`

Build Signup and Login pages with controlled forms that `POST` to the respective endpoints. On success, save `{ email, token }` to `localStorage`. Add routes for `/signup` and `/login` in `App.jsx`. Update `Navbar.jsx` to show Login/Signup links and a Log out button (which clears `localStorage`).

**Done when:** you can sign up, log in, and log out; the JWT is visible in the browser's Local Storage; all CRUD operations still work.

**Commit:** `feat(auth): add Signup and Login pages with localStorage and Navbar links`

---

### Iteration 7: Route Protection & Token Headers

**Switch backend:** stop `backend-auth/` and start `backend-protect/`.

**Changed files:** `src/App.jsx`, `src/components/Navbar.jsx`, `src/pages/Signup.jsx`, `src/pages/Login.jsx`, `src/pages/BookPage.jsx`, `src/pages/AddBookPage.jsx`, `src/pages/EditBookPage.jsx`

Add `isAuthenticated` state to `App.jsx` (initialised from `localStorage` so it survives page refreshes). Pass it down as needed. Implement the following behaviour:

- **Navbar:** shows "Add Book", the user's email, and "Log out" when authenticated; shows "Login" and "Signup" otherwise.
- **`/books/add-book` and `/edit-book/:id`:** redirect unauthenticated users to `/signup`.
- **`/signup` and `/login`:** redirect already-authenticated users to `/`.
- **`BookPage`:** shows Edit and Delete buttons only when authenticated.
- **`AddBookPage`, `EditBookPage`, `BookPage` (delete):** read the token from `localStorage` and include it in the `Authorization: Bearer <token>` header on `POST`, `PUT`, and `DELETE` requests.

**Done when:**
- Unauthenticated users cannot reach add/edit pages and do not see Edit/Delete buttons.
- Authenticated users can perform all CRUD operations successfully.
- Logging out clears state, updates the Navbar, and re-applies route protection.

**Commit:** `feat(auth): add route protection, token headers, and conditional rendering`

---

## Part 2 Summary

| Feature | Logged Out | Logged In |
|---|---|---|
| View book list / detail | ✅ | ✅ |
| Add / Edit a book | ❌ → `/signup` | ✅ |
| Delete a book | ❌ button hidden | ✅ |
| Signup / Login pages | ✅ | ❌ → `/` |

Commit after each iteration.