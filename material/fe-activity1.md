# React Auth — Lab 1
## `fetch`, `localStorage`, and React Forms

**Starter code:** https://github.com/tx00-resources-en/react-auth-starter

In this lab you will explore how JWT-based authentication works from the ground up — first with plain JavaScript, then inside React. By the end you will have a working signup and login flow that persists the user's token in the browser.

---

## Step 0 — Project Setup

1. Clone the starter code and enter the project folder:

    ```sh
    git clone https://github.com/tx00-resources-en/react-auth-starter react-auth
    cd react-auth
    ```

2. **Backend setup** — inside the `backend/` folder:
    - Rename `.env.example` to `.env`. Open it and notice two variables:
        - `MONGO_URI` — the connection string to your MongoDB database.
        - `SECRET` — the private key used to sign JWT tokens. Keep this secret.
    - Install dependencies and start the server:
        ```sh
        cd backend
        npm install
        npm start          # or: npm run dev  (requires nodemon)
        ```
    - The API will be available at `http://localhost:4000`.

3. **Frontend setup** — inside the `frontend/` folder:
    - Install dependencies and start Vite:
        ```sh
        cd frontend
        npm install
        npm run dev
        ```
    - The app will be available at `http://localhost:5173`.

> **Note on the Vite proxy:** Vite is configured to forward any request starting with `/api` to `http://localhost:4000`. This means inside React components you can write `fetch("/api/user/signup")` instead of the full URL — no CORS issues during development.

---

## Step 1 — Signup with `fetch` (no React)

**File to read:** `demo2.js`

Before looking at any React code, open `demo2.js` and read through it. This script makes a raw `POST` request to the signup endpoint using only the browser's built-in `fetch` API.

```js
const apiUrl = "http://localhost:4000/api/user/signup";

const user = {
  email: "matti@example.com",
  password: "R3g5T7#gh",
};

const register = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(user),        // JS object → JSON string
      headers: {
        "Content-Type": "application/json",  // tell the server the body format
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add a new user");
    }

    const json = await response.json();  // parse the response body
    console.log("New user added:", json);
    // Server response looks like: { email: "matti@example.com", token: "eyJhbGci..." }
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
};

register();
```

**What the server does:**
1. Receives `{ email, password }`.
2. Hashes the password with `bcrypt` and saves the user to MongoDB.
3. Signs a JWT with the `SECRET` from `.env` and returns `{ email, token }`.

**Tasks:**
1. Identify the three things that make the request a valid JSON API call (`method`, `body`, `Content-Type` header).
2. What does `response.ok` check? What HTTP status codes does it cover?
3. Why do we need two `await` expressions — one for `fetch(...)` and one for `.json()`?
4. What does the returned `token` (JWT) look like? Open the browser console or use a tool like Postman to see it.

---

## Step 2 — Login with `fetch` (no React)

**File to read:** `demo3.js`

Open `demo3.js`. Compare it with `demo2.js`. Notice how login and signup are almost identical — only the endpoint URL changes.

```js
const apiUrl = "http://localhost:4000/api/user/login";   // ← only this line differs

const login = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ email: "matti@example.com", password: "R3g5T7#gh" }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to login");

    const json = await response.json();
    console.log("Login successful:", json);
    // Server response: { email: "matti@example.com", token: "eyJhbGci..." }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

login();
```

**What the server does differently from signup:**  
Instead of creating a new user, the server finds the existing user, compares the submitted password against the stored `bcrypt` hash, and — if they match — signs and returns a fresh JWT token.

**Tasks:**
1. What is the only difference between `demo2.js` and `demo3.js`?
2. Both endpoints return a token. What should the client do with that token after receiving it? (Hint: think about the next page load.)

---

## Step 3 — `localStorage`: Persisting Data in the Browser

**File to read:** `demo1.js`

`localStorage` is a key-value store built into the browser. It persists across page refreshes and even after the browser is closed. One key constraint: **it only stores strings**. To store a JS object or array, you must convert it first with `JSON.stringify`, and convert it back with `JSON.parse` when reading.

```js
// ── Strings: simple get/set/remove ──────────────────────────────
localStorage.setItem("username", "Rami");
localStorage.getItem("username");           // → "Rami"
localStorage.removeItem("username");

// ── Objects / Arrays: must serialize ────────────────────────────
const userArray = ["Rami", 25];
localStorage.setItem("user", JSON.stringify(userArray));  // stores '["Rami",25]'

const userData = JSON.parse(localStorage.getItem("user")); // → ["Rami", 25]
console.log(userData);

localStorage.removeItem("user");
localStorage.clear();   // wipe everything

// ── sessionStorage: same API, cleared when the tab closes ───────
sessionStorage.setItem("username", "Rami");
sessionStorage.getItem("username");
sessionStorage.removeItem("username");
```

| | `localStorage` | `sessionStorage` |
|---|---|---|
| Survives page refresh | ✅ | ✅ |
| Survives closing the tab | ✅ | ❌ |
| Survives closing the browser | ✅ | ❌ |
| Shared across browser tabs | ✅ | ❌ |

**Why this matters for auth:** after a successful login, the server returns `{ email, token }`. We store this object in `localStorage` so that when the user refreshes the page, the app can read it back and know the user is still authenticated — without asking them to log in again.

**Tasks:**
1. Open `demo1.js` and run it in the browser console (or in a JS scratch file). Open the **Application → Local Storage** tab in Chrome DevTools and watch the values appear and disappear.
2. What happens if you call `JSON.parse(null)`? Try it in the console. This is what you get if `localStorage.getItem("user")` returns `null` (key doesn't exist).
3. What is the difference between `localStorage.removeItem("user")` and `localStorage.clear()`? When would you use each?

---

## Step 4 — Signup in React: `fetch` + `localStorage` + State

**File:** `frontend/src/pages/SignupComponent.jsx`

Open `SignupComponent.jsx`. This component puts together everything from the previous steps inside a React form. After a successful signup it performs three actions:

| Step | Code | Purpose |
|---|---|---|
| 1 | `localStorage.setItem("user", JSON.stringify(user))` | Persist the token — survives a page refresh |
| 2 | `setIsAuthenticated(true)` | Update React state — triggers a re-render of the whole app |
| 3 | `navigate("/")` | Redirect the user to the protected home page |

```jsx
const handleSignup = async () => {
  try {
    const response = await fetch("/api/user/signup", {  // relative URL — Vite proxies to :4000
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      // user = { email: "...", token: "eyJhbGci..." }

      localStorage.setItem("user", JSON.stringify(user));  // Step 1
      setIsAuthenticated(true);                            // Step 2
      navigate("/");                                       // Step 3
    } else {
      console.error("Signup failed");
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
};
```

**Tasks:**
1. Run the app and sign up with a strong password (e.g. `4wa95=Vx#`). Open DevTools → **Application → Local Storage** and confirm that the `user` key is stored with both `email` and `token`.
2. Click "Log out". Verify that the `user` key is removed from `localStorage`.
3. Trace the `setIsAuthenticated` prop: where does this function come from? (Hint: it is not defined in this file — find where it is passed in.) You will explore this in detail in Lab 2.

---

## Step 5 — Login in React: Implement `handleLogin`

**File:** `frontend/src/pages/LoginComponent.jsx`

Open `LoginComponent.jsx`. The component structure and JSX are already written — the `handleLogin` function body is intentionally left empty for you to complete:

```jsx
const handleLogin = async () => {
  try {
    // endpoint: POST /api/user/login
    // TODO: implement this
  } catch (error) {
    console.error("Error during login:", error);
  }
};
```

**Your task:** implement `handleLogin` following the exact same three-step pattern used in `handleSignup`:
1. `fetch` `POST /api/user/login` with `{ email, password }` in the body.
2. If `response.ok`, parse the JSON and save `user` to `localStorage`.
3. Call `setIsAuthenticated(true)` and `navigate("/")`.

Once implemented:
- Log in with the account you created in Step 4.
- Confirm the `user` token appears in `localStorage`.
- Confirm you are redirected to the home page.

---

## Step 6 — Change the Default Unauthenticated Route

**File:** `frontend/src/App.jsx`

Right now, when a user is not authenticated and visits `/`, they are redirected to `/signup`. Modify `App.jsx` so they are redirected to `/login` instead.

Find this line inside `<Routes>`:

```jsx
<Route
  path="/"
  element={isAuthenticated ? <Home /> : <Navigate to="/signup" />}
/>
```

Change it to:

```jsx
<Route
  path="/"
  element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
/>
```

**Tasks:**
1. Make the change above and verify: when you open `http://localhost:5173` while logged out, you land on the login page instead of the signup page.
2. Confirm the signup page is still reachable by navigating directly to `http://localhost:5173/signup`.
3. Think about UX: in a real app, which should be the default page for unauthenticated users — login or signup? Why?

---

## Step 7 — Refactor to `sessionStorage`

Refactor the code responsible for token storage, retrieval, and removal in both `SignupComponent.jsx` and `LoginComponent.jsx` (and in `Navbar.jsx` for the logout). Replace every `localStorage` call with `sessionStorage`.

| Old | New |
|---|---|
| `localStorage.setItem(...)` | `sessionStorage.setItem(...)` |
| `localStorage.getItem(...)` | `sessionStorage.getItem(...)` |
| `localStorage.removeItem(...)` | `sessionStorage.removeItem(...)` |

**Tasks:**
1. Make the changes and log in. Confirm the token appears under **Application → Session Storage** in DevTools (not Local Storage).
2. Close the browser tab and reopen the app. Are you still logged in? Why or why not?
3. Revert to `localStorage` when done — the rest of the labs depend on it persisting across tab closes.

---

## Summary

At the end of this lab you should be able to explain:

- Why `Content-Type: application/json` is required when sending a JSON body with `fetch`.
- Why `response.json()` needs its own `await`.
- Why `JSON.stringify` / `JSON.parse` are needed when working with `localStorage`.
- The three actions that happen after a successful login/signup (persist → update state → navigate).
- The difference between `localStorage` and `sessionStorage`.

---

### Helpful Links:

- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)