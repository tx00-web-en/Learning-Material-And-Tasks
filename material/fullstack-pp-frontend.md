# Frontend Activity — Product Store


**Part 1 (Iterations 0–5)** — Build a full CRUD front-end:
- Build a React frontend connected to an Express + MongoDB API.
- By the end of Part 1, you will have a fully functional React Frontend connected to an API.

**Part 2 (Iterations 6–7)** — Add authentication and route protection:
- **Iteration 6:** User signup & login with inline `useState` and `fetch`, JWT stored in `localStorage`.
- **Iteration 7:** Protected routes using `<Navigate>`, `Authorization: Bearer <token>` headers on POST/PUT/DELETE, and conditional rendering based on authentication state.

**Part 3 (Iteration 8)** — Refactor with custom hooks:
- **Iteration 8:** Extract reusable logic into custom hooks (`useField`, `useSignup`, `useLogin`). Replace repetitive `useState` + `onChange` pairs with `useField` and inline `fetch` calls with `useSignup` / `useLogin`.


## Part 1: Overview

In this part you will connect a **React** front-end to an **Express + MongoDB** back-end.  
By the end you will have a working app that can **Create, Read, Update and Delete** (CRUD) products — all through regular (non-protected) API routes. No authentication is involved.

> **Prerequisite:** Complete the **backend lab** first. This frontend lab uses the backend you built there. You will need **two versions** of your backend:
>
> 1. **`backend-crud/`** — Your backend after completing **Iteration 6** of the backend lab (has user signup/login but **no** route protection). Use this for **Part 1** and **Part 2 Iteration 6**.
> 2. **`backend/`** — Your backend after completing **Iteration 7** of the backend lab (has signup/login **and** `requireAuth` middleware on product routes). Use this for **Part 2 Iteration 7** and **Part 3**.
>
> If you followed the backend lab instructions, you saved a copy of your backend before adding route protection. That copy is `backend-crud/`.

**Getting started:**

1. Make sure your backend copy (`backend-crud/`) is running on `http://localhost:4000`.
2. Open a **second terminal** for the frontend, navigate to the `frontend/` folder, run `npm install`, then `npm run dev`.


### What You Will Learn

- How to send HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) from React to an Express API using `fetch`.
- How to use **controlled inputs** (form values stored in React state with `useState`).
- How to fetch data when a component mounts using `useEffect`.
- How to use React Router (`Routes`, `Route`, `Link`, `useParams`, `useNavigate`) for navigation.
- How to structure a React app with **pages** and **components**.

### Activity Structure

| Iteration | Feature | HTTP Method | Files You Will Change |
|---|---|---|---|
| 0 | Setup | — | — |
| 1 | Add a product | `POST` | `AddProductPage.jsx` |
| 2 | List all products | `GET` | `HomePage.jsx`, `ProductListings.jsx`, `ProductListing.jsx` |
| 3 | View one product | `GET` | `App.jsx`, `ProductListing.jsx`, `ProductPage.jsx` |
| 4 | Delete a product | `DELETE` | `ProductPage.jsx` |
| 5 | Edit a product | `PUT` | `App.jsx`, `ProductPage.jsx`, `EditProductPage.jsx` |

> **Important:** Commit your work after each iteration.

### Commit Messages (Best Practice)

- `feat(add-product): send POST request from AddProductPage form`
- `feat(list-products): fetch and display all products on HomePage`
- `refactor(product-listing): accept product prop and display data`
- `chore: install dependencies`


## The Backend API (Reference)

**Base URL:** `http://localhost:4000`  
(The Vite proxy in `vite.config.js` forwards any request starting with `/api` to this URL, so in your React code you only write `/api/products`.)

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/products` | Create a new product | JSON (see below) |
| `GET` | `/api/products` | Get all products | — |
| `GET` | `/api/products/:productId` | Get a single product by ID | — |
| `PUT` | `/api/products/:productId` | Update a product by ID | JSON (see below) |
| `DELETE` | `/api/products/:productId` | Delete a product by ID | — |

**Product JSON shape:**

```json
{
  "productName": "Wireless Headphones",
  "category": "Electronics",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 149.99,
  "inventoryCount": 50,
  "supplier": {
    "name": "TechSupplies Inc.",
    "contactEmail": "sales@techsupplies.com",
    "contactPhone": "555-123-4567",
    "isVerified": true
  }
}
```


## Instructions

### Iteration 0: Setup

- Instructions are [here](./frontend-setup.md)

### Iteration 1: Add a Product (`POST`)

**Goal:** Make the "Add Product" form save a new product to the database.

**File to change:** `src/pages/AddProductPage.jsx`

The form already exists in the file but nothing happens on submit and the inputs are not connected to state.

**Tasks:**

1. Create a `useState` variable for each form field (product name, category, description, price, inventory count, and all supplier fields).
2. Connect each `<input>` and `<select>` to its corresponding state variable so the form uses controlled inputs.
3. Write an async function that sends a `POST` request to the products endpoint with all form data as JSON. Set the `Content-Type` header to `application/json`.
4. In the `submitForm` handler, build a product object from all the state values (matching the Product JSON shape above), call your POST function, and navigate to the home page on success.

**You are done with Iteration 1 when:**
- You fill in the form and click "Add Product".
- The page navigates back to Home.
- The new product exists in MongoDB.

---

### Iteration 2: Fetch and Display All Products (`GET`)

**Goal:** Fetch all products when the Home page loads and display them as a list.

**Files to change:** `HomePage.jsx`, `ProductListings.jsx`, `ProductListing.jsx`

**Tasks:**

- **Step A — `HomePage.jsx`:** Store the fetched products in state using `useState`. Use `useEffect` to fetch all products from the API when the component mounts. Pass the products array down to `ProductListings` as a prop.

- **Step B — `ProductListings.jsx`:** Receive the products array as a prop. Map over the array and render a `ProductListing` component for each product. Pass each product as a prop and use the product's `_id` as the `key`.

- **Step C — `ProductListing.jsx`:** Receive a single product as a prop. Display the product's name, category, price, and description.

**You are done with Iteration 2 when:**
- Home page shows all products from the database.
- Newest products appear first.

---

### Iteration 3: View a Single Product (`GET` one)

**Goal:** Click a product to open a detail page showing all its information.

**Files to change:** `App.jsx`, `ProductListing.jsx`, `ProductPage.jsx`

**Tasks:**

- **Step A — `App.jsx`:** Add a new route with a dynamic segment (`:id`) that renders `ProductPage`.

- **Step B — `ProductListing.jsx`:** Wrap the product title in a `Link` that navigates to the product's detail route using its `_id`.

- **Step C — `ProductPage.jsx`:** Use `useParams` to read the product ID from the URL. Fetch the single product from the API on mount using `useEffect`. Display all product fields including supplier information.

**You are done with Iteration 3 when:**
- Clicking a product title on the home page navigates to its detail page.
- All product details (including supplier info) are displayed.
- The Back button works.

---

### Iteration 4: Delete a Product (`DELETE`)

**Goal:** Add a Delete button to the product detail page.

**File to change:** `ProductPage.jsx`

**Tasks:**

1. Write an async function that sends a `DELETE` request to the single-product endpoint using the product's ID.
2. Add a Delete button to the page. When clicked, show a confirmation dialog. If the user confirms, call the delete function and navigate to the home page.

**You are done with Iteration 4 when:**
- Clicking Delete shows a confirmation dialog.
- Confirming removes the product from the database and navigates home.

---

### Iteration 5: Edit a Product (`PUT`)

**Goal:** Add an Edit button that opens a pre-filled form; submitting it updates the product.

**Files to change:** `App.jsx`, `ProductPage.jsx`, `EditProductPage.jsx`

**Tasks:**

- **Step A — `App.jsx`:** Add a new route with a dynamic segment for the edit page (e.g., `/edit/:id`) that renders `EditProductPage`.

- **Step B — `ProductPage.jsx`:** Add an Edit button (or link) that navigates to the edit route for the current product.

- **Step C — `EditProductPage.jsx`:** Use `useParams` to get the product ID. Fetch the current product data on mount and pre-fill all form fields using `useState`. Write a submit handler that sends a `PUT` request with the updated data. On success, navigate to the product's detail page.

**You are done with Iteration 5 when:**
- Clicking Edit opens the edit form with all fields pre-filled with current values.
- After submitting, you are redirected to the detail page showing the updated data.

--------

## Part 2: Authentication & Route Protection

**Backend versions you will use:**

| Version | Description | Used In |
|---|---|---|
| `backend-crud/` | Backend with user signup/login but **no** route protection. | Iteration 6 |
| `backend/` | Backend with signup/login **and** `requireAuth` middleware. | Iteration 7 |

### What You Will Learn
- Form state with `useState` and `fetch` submissions.
- JWT storage in `localStorage`.
- `Authorization: Bearer <token>` headers.
- Conditional rendering based on auth state.
- Client-side route protection with `<Navigate>`.

### Activity Structure

| Iteration | Feature | Backend Used | New / Changed Files |
|---|---|---|---|
| 6 | User signup & login | `backend-crud/` | `Signup.jsx`, `Login.jsx`, `Navbar.jsx`, `App.jsx` |
| 7 | Route protection & token headers | `backend/` | `App.jsx`, `Navbar.jsx`, `Signup.jsx`, `Login.jsx`, `ProductPage.jsx`, `AddProductPage.jsx`, `EditProductPage.jsx` |


## The Backend APIs (Reference)

### `backend-crud/` — Authentication Endpoints (Iteration 6)

Has user routes but all product routes remain unprotected.

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/users/signup` | Register a new user | JSON |
| `POST` | `/api/users/login` | Log in | JSON |
| (plus all product CRUD endpoints — unprotected) |

**Signup body:**

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123",
  "phoneNumber": "040-1234567",
  "gender": "Female",
  "date_of_birth": "1995-06-15",
  "accountType": "Active"
}
```

**Login body:**

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Response:**

```json
{ "email": "...", "token": "..." }
```

### `backend/` — Protected Product Routes (Iteration 7)

| Method | Endpoint | Protected? | Required Header |
|---|---|---|---|
| `GET` | `/api/products` | No | — |
| `GET` | `/api/products/:productId` | No | — |
| `POST` | `/api/products` | **Yes** | `Authorization: Bearer <token>` |
| `PUT` | `/api/products/:productId` | **Yes** | `Authorization: Bearer <token>` |
| `DELETE` | `/api/products/:productId` | **Yes** | `Authorization: Bearer <token>` |
| `POST` | `/api/users/signup` | No | — |
| `POST` | `/api/users/login` | No | — |

Without valid token: `{ "error": "Authorization token required" }`


## Instructions

### Iteration 6: User Signup & Login (`POST`)

**Goal:** Add signup, login, and logout functionality. Store the JWT in `localStorage`. The Navbar should show Login/Signup links when logged out and the user's email plus a Log out button when logged in.

**Backend to use:** `backend-crud/`

**New files:** `src/pages/Signup.jsx`, `src/pages/Login.jsx`  
**Changed files:** `App.jsx`, `Navbar.jsx`

**Tasks:**

- **Step A — `Signup.jsx`:** Create a signup page with form fields for all user fields (full name, email, password, phone number, gender, date of birth, account type). On submit, POST to the signup endpoint. If successful, save the response (email and token) to `localStorage` and navigate to the home page. If the API returns an error, display it on the page.

- **Step B — `Login.jsx`:** Create a login page with email and password fields. On submit, POST to the login endpoint. Handle success (save to `localStorage`, navigate home) and errors the same way as Signup.

- **Step C — `App.jsx`:** Import the new page components and add routes for `/signup` and `/login`.

- **Step D — `Navbar.jsx`:** Read the user object from `localStorage` to determine auth state. If logged in, show the user's email and a Log out button. If logged out, show Login and Signup links. The Log out button should remove the user from `localStorage` and update the Navbar.

**You are done with Iteration 6 when:**
- Signup creates a new user and redirects to Home.
- Token is visible in DevTools → Application → Local Storage.
- Login works with valid credentials.
- Log out removes user data from Local Storage and updates the Navbar.
- All CRUD operations still work (routes are unprotected).

---

### Iteration 7: Protect Routes

**Goal:** Only logged-in users can add, edit, or delete products. The Navbar adapts to auth state. Protected pages redirect unauthenticated users to the Signup page.

**Backend to use:** `backend/`

Make sure to stop `backend-crud/` and start `backend/` instead:

```bash
cd backend
npm run dev
```

**Files to change:** `App.jsx`, `Navbar.jsx`, `Signup.jsx`, `Login.jsx`, `ProductPage.jsx`, `AddProductPage.jsx`, `EditProductPage.jsx`

**Tasks:**

- **Step A — `App.jsx`:** Add an `isAuthenticated` state variable (initialize by checking `localStorage`). Wrap protected routes (Add Product, Edit Product) with a check: if not authenticated, render `<Navigate to="/signup" />` instead. Pass `isAuthenticated` and `setIsAuthenticated` as props to components that need them.

- **Step B — `Navbar.jsx`:** Accept `isAuthenticated` and `setIsAuthenticated` as props. Conditionally render Navbar content: show Add Product link, user email, and Log out button when authenticated; show Login and Signup links when not. Log out should clear `localStorage` and call `setIsAuthenticated(false)`.

- **Step C — `Signup.jsx`:** Accept `setIsAuthenticated` as a prop. After successful signup, call `setIsAuthenticated(true)` in addition to saving to `localStorage`.

- **Step D — `Login.jsx`:** Accept `setIsAuthenticated` as a prop. After successful login, call `setIsAuthenticated(true)` in addition to saving to `localStorage`.

- **Step E — `AddProductPage.jsx`:** Retrieve the token from `localStorage` and include it in the `Authorization: Bearer <token>` header of the POST request.

- **Step F — `ProductPage.jsx`:** Retrieve the token from `localStorage` and include it in the DELETE request header. Accept `isAuthenticated` as a prop and conditionally render the Edit and Delete buttons only when the user is authenticated.

- **Step G — `EditProductPage.jsx`:** Retrieve the token from `localStorage` and include it in the PUT request header.

**You are done with Iteration 7 when:**
- **Logged out:** Navbar shows only Login and Signup links. Navigating to `/add-product` or `/edit/:id` redirects to `/signup`. Product detail page does not show Edit or Delete buttons.
- **Logged in:** Navbar shows Add Product link, user email, and Log out button. Can add, edit, and delete products (token sent in headers).
- GET requests for products still work without a token.

------

## Part 3: Refactoring with Custom Hooks

**Backend to use:** Keep using `backend/` from Part 2.

| Iteration | Feature | Backend Used | New / Changed Files |
|---|---|---|---|
| 8 | Custom hooks | `backend/` | `useField.jsx`, `useSignup.jsx`, `useLogin.jsx`, `Signup.jsx`, `Login.jsx` |

### What You Will Learn
- What custom hooks are and how they differ from regular functions (custom hooks can use other hooks like `useState`; regular functions cannot).
- How to create a `useField` hook that eliminates repetitive `useState` + `onChange` pairs for form inputs.
- How to create `useSignup` and `useLogin` hooks that encapsulate API call logic and error handling.
- How to use the spread operator to pass input bindings from a hook directly to an `<input>` element.


## Iteration 8: Refactor with Custom Hooks

**Goal:** Extract repeated logic from `Signup.jsx` and `Login.jsx` into three custom hooks. The app's behaviour must stay exactly the same — this is a pure refactor.

**New files:** `src/hooks/useField.jsx`, `src/hooks/useSignup.jsx`, `src/hooks/useLogin.jsx`  
**Updated files:** `src/pages/Signup.jsx`, `src/pages/Login.jsx`

**Tasks:**

- **Step A — `useField` hook:** Create a custom hook that accepts an input type (e.g., `"email"`, `"text"`, `"password"`). It should manage a single form field's value internally using `useState` and return an object containing `type`, `value`, and an `onChange` handler. This object can then be spread directly onto an `<input>` element.

- **Step B — `useSignup` hook:** Create a custom hook that accepts the signup API URL. It should provide a `signup` function that takes a user object, POSTs it to the API, and returns the response data. It should also manage an `error` state internally and return it alongside the `signup` function.

- **Step C — `useLogin` hook:** Create a custom hook similar to `useSignup` but for the login endpoint. It should provide a `login` function and an `error` state.

- **Step D — Refactor `Signup.jsx`:** Replace all individual `useState` + `onChange` pairs with calls to `useField`. Replace the inline `fetch` call with the `useSignup` hook. Use spread syntax to bind fields to inputs.

- **Step E — Refactor `Login.jsx`:** Replace `useState` + `onChange` pairs with `useField`. Replace the inline `fetch` call with the `useLogin` hook. Use spread syntax to bind fields to inputs.

### Before & After Comparison

| Iteration 7 (before hooks) | Iteration 8 (after hooks) |
|---|---|
| `const [email, setEmail] = useState("")` | `const email = useField("email")` |
| `<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />` | `<input {...email} />` |
| Inline `fetch("/api/users/signup", ...)` | `const { signup, error } = useSignup("/api/users/signup")` then `await signup({...})` |
| `const [error, setError] = useState(null)` | `error` comes from the hook |

**You are done with Iteration 8 when:**
- The app works exactly the same as after Iteration 7 — no visible changes.
- Three new files exist in `src/hooks/`.
- `Signup.jsx` and `Login.jsx` contain no `useState` calls and no inline `fetch` calls.
- All form inputs use spread syntax: `<input {...fieldName} />`.

---

### Discussion Questions

1. Why must custom hooks start with the word `use`?
2. What happens if you call `useState` inside a regular (non-hook) function?
3. How does the spread operator (`{...email}`) work when applied to an `<input>` element?
4. What are the advantages of extracting `fetch` logic into `useSignup` / `useLogin` hooks instead of keeping it inline?
5. Could you reuse `useField` in components other than Signup and Login? Where might it be useful?
