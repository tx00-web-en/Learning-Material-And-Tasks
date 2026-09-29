# Product API: Part 1 - Backend activity 

- [Part 1 — CRUD API (Iterations 0–5)](#part-1--product-api-expert)
- [Part 2 — Authentication & Route Protection (Iterations 6–7)](#part-2-authentication--route-protection)

------------

# Part 1:  Product API (Expert)

## Overview

In this part you will build an **Express + MongoDB** back-end API from scratch.  
By the end you will have a working REST API that can **Create, Read, Update and Delete** (CRUD) products — a simple inventory management system.

### Activity Structure

There are **5 iterations** (plus a setup step) In this part. Each iteration implements one CRUD operation:

| Iteration | Feature | HTTP Method | File You Will Change |
|---|---|---|---|
| 0 | Setup | — | — |
| 1 | Create a product | `POST` | `controllers/productControllers.js` |
| 2 | Get all products | `GET` | `controllers/productControllers.js` |
| 3 | Delete a product | `DELETE` | `controllers/productControllers.js` |
| 4 | Get a single product | `GET` | `controllers/productControllers.js` |
| 5 | Update a product | `PUT` | `controllers/productControllers.js` |

> **Important:** Commit your work after each iteration.

### Commit Messages (Best Practice)

Use small commits that describe *what* changed. Recommended format:

- `feat(products): implement POST /products to create a new product`
- `feat(products): implement GET /products to fetch all products`
- `feat(products): implement DELETE /products/:productId`
- `chore: install dependencies`

Rule of thumb: one commit = one idea you can explain in one sentence.

## The Product API (Reference)

Here is the API you are building.

**Base URL:** `http://localhost:4000`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/products` | Create a new product | JSON (see below) |
| `GET` | `/api/products` | Get all products | — |
| `GET` | `/api/products/:productId` | Get a single product by ID | — |
| `PUT` | `/api/products/:productId` | Update a product by ID | JSON (see below) |
| `DELETE` | `/api/products/:productId` | Delete a product by ID | — |

**Product JSON shape** (what the API expects and returns):

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

> **Tip:** Test each endpoint with Postman as you build it.

## Instructions

### Iteration 0: Setup 

### Iteration 1: Create a Product (`POST`)

**Goal:** Implement the `createProduct` controller function so that `POST /api/products` saves a new product to the database.

**File to change:** `controllers/productControllers.js`

Replace the placeholder response with a real implementation. The controller should extract the product fields from the request body, save the product to MongoDB using the `Product` model, and return the created document. Use appropriate HTTP status codes for success and validation errors.

**Test your implementation:**

```http
POST http://localhost:4000/api/products
Content-Type: application/json

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

**You are done with Iteration 1 when:**

- `POST /api/products` returns status `201` with the created product (including `_id`).
- The product is saved in MongoDB (check with MongoDB Compass or a GET request later).
- Sending invalid data (e.g., missing `productName`) returns status `400`.


### Iteration 2: Get All Products (`GET`)

**Goal:** Implement the `getAllProducts` controller function so that `GET /api/products` returns all products from the database.

**File to change:** `controllers/productControllers.js`

Replace the placeholder response with a real implementation. The controller should query all products from the database, sort them so the newest products appear first, and return the array. Handle server errors appropriately.

**Test your implementation:**

```http
GET http://localhost:4000/api/products
```

**You are done with Iteration 2 when:**

- `GET /api/products` returns an array of all products in the database.
- Products created in Iteration 1 appear in the response.
- If you create multiple products, the newest appears first.

**Discussion Questions:**

- What does the empty object `{}` in `Product.find({})` mean?
- What would happen if you used `.sort({ createdAt: 1 })` instead?


### Iteration 3: Delete a Product (`DELETE`)

**Goal:** Implement the `deleteProduct` controller function so that `DELETE /api/products/:productId` removes a product from the database.

**File to change:** `controllers/productControllers.js`

Replace the placeholder response with a real implementation. The controller should extract the product ID from the URL parameters, validate that it is a properly formatted MongoDB ID, find and delete the matching product, and return the appropriate status code. Handle the case where no product is found with that ID.

**Test your implementation:**

First, get a product ID from `GET /api/products`, then:

```http
DELETE http://localhost:4000/api/products/YOUR_PRODUCT_ID_HERE
```

**You are done with Iteration 3 when:**

- `DELETE /api/products/:productId` returns status `204` when successful.
- The product is actually removed from the database (verify with GET /api/products).
- Deleting a non-existent ID returns status `404`.
- Using an invalid ID format returns status `404`.

### Iteration 4: Get a Single Product (`GET`)

**Goal:** Implement the `getProductById` controller function so that `GET /api/products/:productId` returns one specific product.

**File to change:** `controllers/productControllers.js`

Replace the placeholder response with a real implementation. The controller should extract the product ID from the URL parameters, validate the ID format, look up the product in the database, and return it. Handle the case where no product is found.

**Test your implementation:**

```http
GET http://localhost:4000/api/products/YOUR_PRODUCT_ID_HERE
```

**You are done with Iteration 4 when:**

- `GET /api/products/:productId` returns the product with status `200`.
- Using a non-existent ID returns status `404`.
- Using an invalid ID format returns status `404`.

**Discussion Questions:**

- What's the difference between `findById()` and `findOne({ _id: id })`?
- Why do we validate the ObjectId before querying?


### Iteration 5: Update a Product (`PUT`)

**Goal:** Implement the `updateProduct` controller function so that `PUT /api/products/:productId` updates an existing product.

**File to change:** `controllers/productControllers.js`

Replace the placeholder response with a real implementation. The controller should extract the product ID from the URL parameters, validate the ID format, find the product and apply the updates from the request body, and return the updated document. Make sure you return the document in its state *after* the update, not before. Handle the case where no product is found.

**Test your implementation:**

```http
PUT http://localhost:4000/api/products/YOUR_PRODUCT_ID_HERE
Content-Type: application/json

{
  "productName": "Updated Headphones",
  "category": "Electronics",
  "description": "Updated description",
  "price": 199.99,
  "inventoryCount": 100,
  "supplier": {
    "name": "NewSupplier Inc.",
    "contactEmail": "new@supplier.com",
    "contactPhone": "555-000-0000",
    "isVerified": true
  }
}
```

**You are done with Iteration 5 when:**

- `PUT /api/products/:productId` returns the updated product with status `200`.
- The changes persist in the database (verify with GET).
- Using a non-existent ID returns status `404`.
- Using an invalid ID format returns status `404`.

-----------

# Part 2 (Authentication & Route Protection)

## Overview

In Part 1 you built a complete CRUD API for product listings. In Part 2 you will add **user authentication** (sign up and log in) and then **protect certain routes** so that only logged-in users can create, update, or delete products.

### What You Will Learn

- How to create a **User model** with Mongoose.
- How to **hash passwords** with `bcryptjs` so they are never stored in plain text.
- How to **generate and verify JSON Web Tokens (JWT)** for stateless authentication.
- How to write an **authentication middleware** that protects routes.
- How to **associate resources with users** (each product belongs to the user who created it).
- How to selectively protect only the routes that need authentication.

### Activity Structure

| Iteration | Feature | Files You Will Change / Create |
|---|---|---|
| 6 | User registration & login | `models/userModel.js`, `controllers/userControllers.js`, `routes/userRouter.js`, `app.js`, `package.json`, `.env` |
| 7 | Protect product routes | `models/productModel.js`, `controllers/productControllers.js`, `routes/productRouter.js` |

> **Important:** Commit your work after each iteration.

### Commit Messages (Best Practice)

- `feat(users): add User model with hashed password`
- `feat(users): implement POST /users/signup and /users/login`
- `feat(users): register user routes in app.js`
- `feat(products): protect POST, PUT, DELETE routes with auth middleware`
- `feat(products): associate products with the authenticated user`

## Background: How JWT Authentication Works

Before you start coding, here is a brief overview of the authentication flow you are about to implement:

1. **Sign up** — The client sends `fullName`, `email`, `password`, etc. The server hashes the password, saves the user, and returns a **JWT token**.
2. **Log in** — The client sends `email` and `password`. The server verifies the credentials and returns a **JWT token**.
3. **Authenticated requests** — The client includes the token in the `Authorization` header (`Bearer <token>`). A middleware verifies the token and attaches the user to `req.user`.
4. **Protected routes** — Any route placed *after* the auth middleware can only be accessed with a valid token.

```
Client                          Server
  |                               |
  |  POST /api/users/signup       |
  |  { email, password, ... }     |
  | ----------------------------> |
  |                               |  hash password, save user
  |  { email, token }             |
  | <---------------------------- |
  |                               |
  |  POST /api/products           |
  |  Authorization: Bearer <token>|
  | ----------------------------> |
  |                               |  verify token → req.user
  |                               |  create product with user_id
  |  { product }                  |
  | <---------------------------- |
```


## The User API (Reference)

Here are the new endpoints you are adding.

**Base URL:** `http://localhost:4000`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/users/signup` | Register a new user | JSON (see below) |
| `POST` | `/api/users/login` | Log in an existing user | JSON (see below) |

**Signup JSON shape:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "phoneNumber": "555-123-4567",
  "gender": "Male",
  "date_of_birth": "1990-01-15",
  "accountType": "Active"
}
```

**Login JSON shape:**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Successful response (both signup and login):**

```json
{
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Instructions

### Iteration 6: User Registration & Login

**Goal:** Add user signup and login so that clients can create accounts and receive JWT tokens.

This iteration involves **installing new dependencies**, creating **three new files**, and updating **two existing files**:

| Step | File | Action |
|---|---|---|
| 6a | `package.json` | Install `bcryptjs` and `jsonwebtoken` |
| 6b | `.env` | Add a `SECRET` variable for signing tokens |
| 6c | `models/userModel.js` | **Create** — Define the User schema |
| 6d | `controllers/userControllers.js` | **Create** — Implement signup, login, and token generation |
| 6e | `routes/userRouter.js` | **Create** — Wire up signup and login routes |
| 6f | `app.js` | **Update** — Register the new user routes |

#### Step 6a: Install New Dependencies

Install the two authentication libraries your backend needs:

```bash
npm install bcryptjs jsonwebtoken
```

- **`bcryptjs`** — For hashing and comparing passwords.
- **`jsonwebtoken`** — For creating and verifying JWT tokens.


#### Step 6b: Add `SECRET` to `.env`

**File to change:** `.env`

Add a `SECRET` variable that will be used as the signing key for JWT tokens. You can generate a random hex string at [browserling.com/tools/random-hex](https://www.browserling.com/tools/random-hex) or use any long random string.

**Add this line to your `.env` file:**

```dotenv
SECRET=f9d1e69365fa3f662ffd4b4132ef8f94077d496ed6508760371495a7debf1cbc
```

> **Important:** Never commit your `.env` file. The `.env.example` file shows what variables are needed without revealing real values.


#### Step 6c: Create the User Model

**File to create:** `models/userModel.js`

Define a Mongoose schema for the user. The schema should include the following fields, all required: `fullName`, `email`, `password`, `phoneNumber`, `gender`, `date_of_birth`, and `accountType`. The `email` field should be marked as `unique` to prevent duplicate accounts. Enable timestamps and disable the version key.

Note that the password field stores the **hashed** password — the hashing itself happens in the controller, not in the model.


#### Step 6d: Create the User Controller

**File to create:** `controllers/userControllers.js`

This file should contain three functions:

- **`generateToken`** — A helper function that creates a JWT containing the user's ID, signed with the secret from your environment variables, with an expiration time.
- **`signupUser`** — Validates that all required fields are present, checks whether a user with the given email already exists, hashes the password before storing it, creates the user in the database, and returns the email and a JWT token. Use appropriate status codes for success (`201`) and errors (`400`).
- **`loginUser`** — Finds the user by email, compares the submitted password against the stored hash, and returns the email and a JWT token on success. Use appropriate status codes for success (`200`) and errors (`400`).

The response for both signup and login should be `{ email, token }`. Never return the password in any response.


#### Step 6e: Create the User Router

**File to create:** `routes/userRouter.js`

Create an Express router that maps `POST /login` to the login controller and `POST /signup` to the signup controller. Both routes are public — no authentication is required.


#### Step 6f: Register User Routes in `app.js`

**File to change:** `app.js`

Import the user router and mount it at `/api/users`. Make sure the user routes are registered **before** any error-handling middleware.


#### Test Your Implementation

**1. Sign up a new user:**

```http
POST http://localhost:4000/api/users/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "phoneNumber": "555-123-4567",
  "gender": "Male",
  "date_of_birth": "1990-01-15",
  "accountType": "Active"
}
```

Expected response (status `201`):
```json
{
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiI..."
}
```

**2. Try signing up with the same email again:**

You should get status `400` with `"User already exists"`.

**3. Try signing up with missing fields:**

```http
POST http://localhost:4000/api/users/signup
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "email": "jane@example.com"
}
```

You should get status `400` with `"Please add all fields"`.

**4. Log in with valid credentials:**

```http
POST http://localhost:4000/api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

Expected response (status `200`):
```json
{
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiI..."
}
```

**5. Log in with wrong password:**

```http
POST http://localhost:4000/api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```

You should get status `400` with `"Invalid credentials"`.

> **Tip:** Save the `token` from a successful signup or login — you will need it in Iteration 7 to test protected routes.

**You are done with Iteration 6 when:**

- `POST /api/users/signup` creates a new user and returns status `201` with `{ email, token }`.
- Duplicate emails are rejected with status `400`.
- Missing fields are rejected with status `400`.
- `POST /api/users/login` returns status `200` with `{ email, token }` for valid credentials.
- Invalid credentials return status `400`.
- The password is **hashed** in the database (check with MongoDB Compass — you should see a long string, not the plain password).

**Discussion Questions:**

- Why do we hash the password instead of storing it directly?
- What information is stored inside the JWT token? (Hint: try pasting your token at [jwt.io](https://jwt.io))
- Why does `generateToken` only include `_id` in the payload and not the email or password?

> **Important — save a copy of your backend before continuing.**
>
> Before you add route protection in Iteration 7, **make a copy of your entire `backend/` folder** (for example, name the copy `backend-crud/`). You will need this version — which has user signup/login but **no** protected product routes — when you start the **frontend lab**. The frontend lab's Part 1 and Part 2 Iteration 6 both require a backend without route protection.

### Iteration 7: Protect Product Routes with Authentication

**Goal:** Require authentication for creating, updating, and deleting products. Keep reading all products and reading a single product as public endpoints. Associate each new product with the user who created it.

This iteration involves changes to **three existing files** and creating **one new file**:

| Step | File | Action |
|---|---|---|
| 7a | `middleware/requireAuth.js` | **Create** — Authentication middleware |
| 7b | `models/productModel.js` | **Update** — Add a `user_id` field |
| 7c | `controllers/productControllers.js` | **Update** — Save the authenticated user's ID when creating a product |
| 7d | `routes/productRouter.js` | **Update** — Apply the auth middleware to protected routes |

---

#### Step 7a: Create the `requireAuth` Middleware

**File to create:** `middleware/requireAuth.js`

Create an Express middleware that reads the JWT from the `Authorization` header (expected format: `Bearer <token>`), verifies it using the secret from your environment variables, looks up the corresponding user in the database, and attaches the user to `req.user`. If the token is missing or invalid, respond with status `401`. If everything is valid, call `next()` to pass control to the route handler.


#### Step 7b: Add `user_id` to the Product Model

**File to change:** `models/productModel.js`

Add a `user_id` field to the product schema. This field should store a MongoDB ObjectId that references the User model, and it should be required. This creates a relationship between products and the users who created them.


#### Step 7c: Update `createProduct` to Save the User ID

**File to change:** `controllers/productControllers.js`

Update the `createProduct` controller so that when a product is created, the authenticated user's ID (available from `req.user._id`, set by the `requireAuth` middleware) is stored in the product's `user_id` field. The user ID should come from the verified token, not from the request body.


#### Step 7d: Protect Routes in the Product Router

**File to change:** `routes/productRouter.js`

Import the `requireAuth` middleware and apply it so that:

- `GET /api/products` — **Public** (anyone can browse products)
- `GET /api/products/:productId` — **Public** (anyone can view a product)
- `POST /api/products` — **Protected** (only logged-in users can create products)
- `PUT /api/products/:productId` — **Protected** (only logged-in users can update products)
- `DELETE /api/products/:productId` — **Protected** (only logged-in users can delete products)

Consider how you can apply the middleware once so that all routes defined after it are protected, rather than adding it to each route individually.


#### Test Your Implementation

**1. Try creating a product without a token (should fail):**

```http
POST http://localhost:4000/api/products
Content-Type: application/json

{
  "productName": "Wireless Mouse",
  "category": "Electronics",
  "description": "Ergonomic wireless mouse with USB receiver",
  "price": 29.99,
  "inventoryCount": 150,
  "supplier": {
    "name": "TechSupply Co.",
    "contactEmail": "sales@techsupply.com",
    "contactPhone": "555-100-2000",
    "isVerified": true
  }
}
```

Expected response (status `401`):
```json
{
  "error": "Authorization token required"
}
```

**2. Log in to get a token:**

```http
POST http://localhost:4000/api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

Copy the `token` from the response.

**3. Create a product with the token (should succeed):**

```http
POST http://localhost:4000/api/products
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "productName": "Wireless Mouse",
  "category": "Electronics",
  "description": "Ergonomic wireless mouse with USB receiver",
  "price": 29.99,
  "inventoryCount": 150,
  "supplier": {
    "name": "TechSupply Co.",
    "contactEmail": "sales@techsupply.com",
    "contactPhone": "555-100-2000",
    "isVerified": true
  }
}
```

Expected response (status `201`): The created product, including a `user_id` field matching the logged-in user.

**4. Verify GET routes are still public (no token needed):**

```http
GET http://localhost:4000/api/products
```

Expected: status `200` with the array of products — no authentication required.

**5. Try deleting a product without a token (should fail):**

```http
DELETE http://localhost:4000/api/products/YOUR_PRODUCT_ID_HERE
```

Expected response (status `401`):
```json
{
  "error": "Authorization token required"
}
```

**6. Delete a product with the token (should succeed):**

```http
DELETE http://localhost:4000/api/products/YOUR_PRODUCT_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

Expected response: status `204` (No Content).

**You are done with Iteration 7 when:**

- `POST /api/products` without a token returns `401`.
- `PUT /api/products/:productId` without a token returns `401`.
- `DELETE /api/products/:productId` without a token returns `401`.
- `GET /api/products` and `GET /api/products/:productId` work **without** a token.
- Creating a product **with** a valid token returns `201` and the product includes a `user_id` field.
- The `user_id` in the created product matches the authenticated user's ID.

**Discussion Questions:**

- What happens if you send an expired token? How would you test that?
- Why do we put public routes *above* `router.use(requireAuth)` instead of adding `requireAuth` individually to each protected route?
- Why do we take the `user_id` from `req.user._id` (the verified token) instead of allowing the client to send it in the request body?
- What would you need to change so that users can only update and delete **their own** products?


## Summary

You have extended the Product API with authentication and route protection:

| Operation | HTTP Method | Endpoint | Auth Required | Status Codes |
|---|---|---|---|---|
| Sign up | `POST` | `/api/users/signup` | No | 201, 400 |
| Log in | `POST` | `/api/users/login` | No | 200, 400 |
| Create product | `POST` | `/api/products` | **Yes** | 201, 401, 500 |
| Read all products | `GET` | `/api/products` | No | 200, 500 |
| Read one product | `GET` | `/api/products/:productId` | No | 200, 404, 500 |
| Update product | `PUT` | `/api/products/:productId` | **Yes** | 200, 401, 404, 500 |
| Delete product | `DELETE` | `/api/products/:productId` | **Yes** | 204, 401, 404, 500 |

**What changed from Part 1:**

| File | Change |
|---|---|
| `package.json` | **Updated** — Added `bcryptjs` and `jsonwebtoken` dependencies |
| `.env` | **Updated** — Added `SECRET` variable |
| `models/userModel.js` | **New** — User schema with hashed password |
| `controllers/userControllers.js` | **New** — Signup, login, token generation |
| `routes/userRouter.js` | **New** — `/api/users/signup` and `/api/users/login` |
| `app.js` | **Updated** — Registered user routes |
| `middleware/requireAuth.js` | **New** — Verifies JWT and attaches `req.user` |
| `models/productModel.js` | **Updated** — Added `user_id` field referencing User |
| `controllers/productControllers.js` | **Updated** — `createProduct` saves `user_id` from authenticated user |
| `routes/productRouter.js` | **Updated** — Applied `requireAuth` middleware to POST, PUT, DELETE |
