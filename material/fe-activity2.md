# React Auth — Lab 2
## Prop Drilling, Conditional UI, and Conditional Routing

**Starter code:** https://github.com/tx00-resources-en/react-auth-starter

This lab builds on Lab 1. You now have a working signup and login flow. In this lab you will explore how authentication state is shared across the component tree using **prop drilling**, how the **Navbar** renders different UI based on that state, and how **React Router** enforces access rules through conditional routing.

> **Prerequisites:** Complete Lab 1 (signup and login working, token stored in `localStorage`).

---

## Background — The Component Tree

Before starting the tasks, read this diagram carefully. It shows where state lives and how it flows:

```
App.jsx  ← owns the isAuthenticated state
  │
  ├──▶  Navbar.jsx
  │         receives: isAuthenticated, setIsAuthenticated
  │         uses isAuthenticated  → decides what to render (Welcome/Logout vs Login/Signup links)
  │         uses setIsAuthenticated → calls it on logout to update state
  │
  ├──▶  LoginComponent.jsx    (rendered inside <Routes>)
  │         receives: setIsAuthenticated
  │         calls setIsAuthenticated(true) after a successful login
  │
  └──▶  SignupComponent.jsx   (rendered inside <Routes>)
            receives: setIsAuthenticated
            calls setIsAuthenticated(true) after a successful signup
```

This pattern — passing state or state-setters from a parent to children through props — is called **prop drilling**.

---

## Step 1 — Prop Drilling: Tracing `setIsAuthenticated`

**Files:** `frontend/src/App.jsx`, `frontend/src/pages/SignupComponent.jsx`, `frontend/src/pages/LoginComponent.jsx`

### 1a — Where the state is defined

Open `App.jsx`. The `isAuthenticated` state and its setter are defined here:

```jsx
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );

  // ...
}
```

`App` is the **single source of truth** — every component that needs to know whether the user is logged in reads from this one state variable.

### 1b — Passing the setter down

Still in `App.jsx`, find where `SignupComponent` and `LoginComponent` are rendered inside `<Routes>`. The setter is passed as a prop:

```jsx
<SignupComponent setIsAuthenticated={setIsAuthenticated} />
<LoginComponent  setIsAuthenticated={setIsAuthenticated} />
```

### 1c — Receiving and using the setter in the child

Open `SignupComponent.jsx`. The prop is received by destructuring it from the component's parameter:

```jsx
const SignupComponent = ({ setIsAuthenticated }) => {
  // ...

  const handleSignup = async () => {
    // ... after successful fetch:
    setIsAuthenticated(true);  // ← calls the setter defined in App
  };
};
```

When `setIsAuthenticated(true)` is called here — even though the function was defined in `App` — React updates the state in `App`. This triggers a re-render of `App` and **all its children** with the new `isAuthenticated` value. The router and navbar react immediately.

**Tasks:**
1. Open `SignupComponent.jsx` and `LoginComponent.jsx`. Confirm both receive `setIsAuthenticated` as a prop and call it after a successful response.
2. In `App.jsx`, add a `console.log("App re-rendered, isAuthenticated:", isAuthenticated)` just before the `return` statement. Sign up or log in and watch the console to see the re-render happen.
3. Remove the `console.log` when you are done.
4. Answer: if you did NOT pass `setIsAuthenticated` to `SignupComponent`, what would happen after a successful signup? Would the user be redirected? Would the navbar update?

---

## Step 2 — Conditional UI in the Navbar

**File:** `frontend/src/components/Navbar.jsx`

Open `Navbar.jsx`. The navbar receives both props from `App` and uses them to branch its output:

```jsx
function Navbar({ isAuthenticated, setIsAuthenticated }) {

  const handleClick = () => {
    localStorage.removeItem("user");  // 1. delete the token from storage
    setIsAuthenticated(false);         // 2. update React state → re-render
  };

  return (
    <nav>
      {/* Shown ONLY when the user is logged in */}
      {isAuthenticated && (
        <div>
          <span>Welcome</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      )}

      {/* Shown ONLY when the user is NOT logged in */}
      {!isAuthenticated && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}
```

**How `{condition && <JSX />}` works:**  
JavaScript evaluates `&&` left to right. If the left side is falsy, it short-circuits and returns nothing — React renders nothing. If the left side is truthy, it returns the right side — React renders the JSX.

**Logout flow, step by step:**
1. User clicks "Log out".
2. `localStorage.removeItem("user")` — the token is permanently deleted from storage.
3. `setIsAuthenticated(false)` — updates state in `App`.
4. `App` re-renders with `isAuthenticated = false`.
5. The navbar immediately shows the Login/Signup links.
6. The router detects the state change and redirects away from any protected route.

**Tasks:**
1. Log in and confirm the navbar shows "Welcome" and a "Log out" button.
2. Click "Log out" and confirm the navbar switches to the Login/Signup links in the same instant — no page reload.
3. Modify the `Welcome` span to display the user's email. The email is stored in `localStorage` as part of the user object. Read it like this:
    ```jsx
    const user = JSON.parse(localStorage.getItem("user"));
    // user.email
    ```
    Display it inside the navbar: `Welcome, matti@example.com`.
4. Add a "Welcome" link to `/` in the logged-in navbar, alongside the Log out button, using `<Link to="/">Home</Link>`.

---

## Step 3 — Conditional Routing in `App.jsx`

**File:** `frontend/src/App.jsx`

Open `App.jsx` and read the full `<Routes>` block:

```jsx
<Routes>

  {/* ── Protected: only authenticated users ───────── */}
  <Route
    path="/"
    element={isAuthenticated ? <Home /> : <Navigate to="/signup" />}
  />
  {/*
    ✅ authenticated   → renders <Home />
    🔀 NOT authenticated → redirects to /signup
  */}

  {/* ── Guest-only: only unauthenticated users ─────── */}
  <Route
    path="/login"
    element={
      !isAuthenticated
        ? <LoginComponent setIsAuthenticated={setIsAuthenticated} />
        : <Navigate to="/" />
    }
  />
  {/*
    ✅ NOT authenticated → renders login form
    🔀 authenticated     → redirects to / (already logged in)
  */}

  <Route
    path="/signup"
    element={
      !isAuthenticated
        ? <SignupComponent setIsAuthenticated={setIsAuthenticated} />
        : <Navigate to="/" />
    }
  />

</Routes>
```

**Route access summary:**

| Route | Authenticated user | Unauthenticated user |
|---|---|---|
| `/` | ✅ sees `<Home />` | 🔀 redirected to `/signup` |
| `/login` | 🔀 redirected to `/` | ✅ sees login form |
| `/signup` | 🔀 redirected to `/` | ✅ sees signup form |

**`<Navigate>` vs `navigate()`:**

| | `<Navigate to="..." />` | `navigate("/")` |
|---|---|---|
| Type | JSX component | Function |
| Used in | `element={}` prop (declarative) | Event handlers and `async` functions (imperative) |
| When it runs | When the route renders | When the function is called |

**Tasks:**
1. While logged in, try navigating directly to `http://localhost:5173/login` in the browser address bar. What happens?
2. While logged out, try navigating directly to `http://localhost:5173/`. What happens?
3. Modify `App.jsx` so that when the user is NOT authenticated, the `/` route redirects to `/login` instead of `/signup`.
4. Add a new route `/profile` that is also protected — it should render a simple `<Profile />` component (you can create a minimal one that just displays the text "Profile Page") and redirect to `/login` when the user is not authenticated.

---

## Step 4 — Initializing `isAuthenticated` from `localStorage`

**File:** `frontend/src/App.jsx`

When the page loads (or refreshes), React needs to know immediately whether the user is already authenticated. We check `localStorage` for a stored user object inside `useState`.

### Current approach — direct expression

```jsx
const [isAuthenticated, setIsAuthenticated] = useState(
  JSON.parse(localStorage.getItem("user")) || false
);
```

**How it works, line by line:**
1. `localStorage.getItem("user")` → returns the stored JSON string, or `null` if the key does not exist.
2. `JSON.parse(null)` → returns `null` (falsy).
3. `null || false` → resolves to `false` → initial state is `false`.
4. If a user object is stored, `JSON.parse(...)` returns a non-null object (truthy) → initial state is that object.

**Issues with this approach:**
- The expression `JSON.parse(localStorage.getItem("user"))` runs **on every render** of `App`. React only uses the result on the very first render and discards it afterwards — but the computation still happens every time.
- It trusts any stored value. If `localStorage` holds `{}` or `{ email: "x" }` (no `token`), it is still truthy and the user would be incorrectly considered authenticated.

### Better approach — lazy initializer

Instead of passing a value to `useState`, pass a **function**. React calls this function **only once** on the initial mount:

```jsx
const [isAuthenticated, setIsAuthenticated] = useState(() => {
  // This runs ONCE on mount, never again
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? true : false;
});
```

**Step-by-step breakdown:**
1. `localStorage.getItem("user")` → JSON string or `null`.
2. `JSON.parse(...)` → object like `{ email: "...", token: "eyJ..." }`, or `null`.
3. `user && user.token` → truthy only if BOTH: `user` is not null AND `user.token` is a non-empty string.
4. Returns a clean `true` or `false` boolean — not an object.

| | Direct expression | Lazy initializer |
|---|---|---|
| When does it run? | Every render of `App` | Only on initial mount |
| Checks for actual token? | ❌ any truthy object passes | ✅ explicitly checks `user.token` |
| Empty object `{}` treated as authenticated? | ✅ (bug) | ❌ correctly returns `false` |
| Returns a clean boolean? | ❌ returns the object or `false` | ✅ always `true` or `false` |

**Tasks:**
1. Open `App.jsx` and replace the direct expression with the lazy initializer shown above.
2. Log in. Then open DevTools → Application → Local Storage and manually edit the stored `user` value to remove the `token` field (change `{"email":"x","token":"eyJ..."}` to `{"email":"x"}`). Refresh the page. Are you still authenticated?
    - With the **old approach**: yes (the object is truthy).
    - With the **lazy initializer**: no (`user.token` is `undefined` → `false`).
3. Clear `localStorage` entirely (DevTools → Application → Local Storage → right-click → Clear). Refresh. Confirm you are redirected to the login/signup page.
4. Answer: why is it important to return a plain `true`/`false` from the initializer instead of returning the user object itself?

---

## Summary

At the end of this lab you should be able to explain:

- What **prop drilling** is and why `setIsAuthenticated` needs to be passed from `App` to child components.
- How calling `setIsAuthenticated` in a child component triggers a re-render in `App` and updates the whole tree.
- How `{condition && <JSX />}` works for conditional rendering in the navbar.
- The logout sequence: remove from `localStorage` → update state → re-render.
- The difference between `<Navigate>` (declarative, in JSX) and `navigate()` (imperative, in handlers).
- What a **protected route** and a **guest-only route** are and how to implement them with React Router.
- Why the lazy initializer for `useState` is safer and more efficient than a direct expression when reading from `localStorage`.