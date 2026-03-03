
# Custom Hooks — Lab

## Iteration 0: Project Setup

1. Clone the starter code and enter the project folder:

    ```sh
    git clone https://github.com/tx00-resources-en/react-custom-hooks-starter react-custom-hooks
    cd react-custom-hooks
    ```

2. **Backend setup** — inside the `backend/` folder:
    - Rename `.env.example` to `.env`. Open it and notice two variables:
        - `MONGO_URI` — the connection string to your MongoDB database.
        - `SECRET` — the private key used to sign JWT tokens. Keep this secret.
    - Install dependencies and start the server:
        ```sh
        cd backend
        npm install
        npm run dev          # or: npm start
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

4. **Familiarize yourself with the project**. Open the frontend source and explore:
    - `src/pages/HomePage.jsx` — fetches and displays all books.
    - `src/pages/Login.jsx` — login form.
    - `src/pages/Signup.jsx` — signup form.
    - `src/pages/AddBookPage.jsx` — form to add a new book.
    - `src/hooks/` — this folder is **empty**. You will create all hooks here.

> **Goal:** By the end of this lab you will have created five custom hooks (`useFetch`, `useLogin`, `useSignup`, `useAuth`, `useField`) and refactored the page components to use them.


----

## Iteration 1: `useFetch` Hook

In this iteration you will extract the data-fetching logic from `HomePage.jsx` into a reusable `useFetch` hook.

### 1.1 — Review the current `HomePage.jsx`

Open `src/pages/HomePage.jsx`. Notice that all the fetching logic (state variables, `useEffect`, error handling) lives directly inside the component:

```jsx
import { useEffect, useState } from "react";
import BookListings from "../components/BookListings";

const Home = () => {
  const [books, setBooks] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setBooks(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {books && <BookListings books={books} />}
    </div>
  );
};

export default Home;
```

**Problems with this approach:**
- If another page also needs to fetch data, you must copy-paste all of this code.
- The component mixes *data-fetching concerns* with *rendering concerns*.
- Testing and maintaining the fetching logic is harder when it is embedded in the UI.

### 1.2 — Create `src/hooks/useFetch.jsx`

Create a new file `src/hooks/useFetch.jsx` and move the fetching logic into a custom hook:

```jsx
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

**Key points:**
- The hook accepts a `url` parameter — this makes it reusable for *any* endpoint.
- It manages three pieces of state: `data`, `loading`, and `error`.
- The `useEffect` runs whenever `url` changes, so the data is automatically refetched if the URL updates.
- The `finally` block guarantees `loading` is set to `false` whether the request succeeds or fails.

### 1.3 — Refactor `HomePage.jsx`

Replace the inline fetching logic with a single call to `useFetch`:

```jsx
import BookListings from "../components/BookListings";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data: books, loading, error } = useFetch("/api/books");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {books && <BookListings books={books} />}
    </div>
  );
};

export default Home;
```

**What changed:**
- Removed the `useState` and `useEffect` imports — the hook handles them internally.
- Replaced ~20 lines of fetching logic with a single line: `useFetch("/api/books")`.
- Used destructuring with renaming (`data: books`) so the template code requires no other changes.

### 1.4 — Test

1. Make sure both backend and frontend servers are running.
2. Open the app in the browser and navigate to the home page.
3. You should see the list of books load exactly as before.
4. Open the browser DevTools → Network tab and confirm the GET request to `/api/books` succeeds.


----

## Iteration 2: `useLogin` Hook

In this iteration you will extract the login request logic from `Login.jsx` into a reusable `useLogin` hook.

### 2.1 — Review the current `Login.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    console.log("success");
    setIsAuthenticated(true);
    navigate("/");
  };

  return ( /* ... form JSX ... */ );
};
```

The component is responsible for:
1. Making the POST request.
2. Parsing the response and handling errors.
3. Storing the user in `localStorage`.
4. Managing `error` state.
5. Rendering the form.

Items 1–4 are **not related to rendering** and can be extracted.

### 2.2 — Create `src/hooks/useLogin.jsx`

```jsx
import { useState } from "react";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setIsLoading(false);
        return null;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, error };
}
```

**Key points:**
- The hook accepts the API `url` as a parameter.
- `login(credentials)` sends the POST request and returns the user object on success, or `null` on failure.
- Error and loading states are managed internally — the component just reads them.
- `localStorage` persistence is handled inside the hook.

### 2.3 — Refactor `Login.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await login({ email, password });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={isLoading}>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
```

**What changed:**
- The `fetch` call, response parsing, localStorage logic, and error/loading management are gone from the component.
- `handleFormSubmit` is now just 4 lines: prevent default, call hook, check result, navigate.
- The submit button is disabled while loading (`disabled={isLoading}`), improving UX.

### 2.4 — Test

1. Open the app and navigate to `/login`.
2. Enter valid credentials and submit — you should be redirected to the home page.
3. Enter invalid credentials — you should see the error message below the form.


----

## Iteration 3: `useSignup` Hook

This iteration mirrors Iteration 2 but for the signup flow.

### 3.1 — Review the current `Signup.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    console.log("success");
    setIsAuthenticated(true);
    navigate("/");
  };

  return ( /* ... form JSX ... */ );
};
```

Notice how similar this is to `Login.jsx` — the only differences are the endpoint (`/signup` vs `/login`) and the fields sent in the body. This duplication is exactly what custom hooks help eliminate.

### 3.2 — Create `src/hooks/useSignup.jsx`

```jsx
import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setIsLoading(false);
        return null;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  return { signup, isLoading, error };
}
```

### 3.3 — Refactor `Signup.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await signup({ name, email, password });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={isLoading}>Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
```

### 3.4 — Test

1. Navigate to `/signup`.
2. Register a new user — you should be redirected to the home page.
3. Try submitting with missing fields — you should see the server validation error.

### 3.5 — Pause and reflect

Compare `useLogin` and `useSignup`. They are **almost identical** — the only difference is the function name (`login` vs `signup`). This is a clear sign that we can combine them into a single, more powerful hook. That is exactly what we will do next.


----

## Iteration 4: `useAuth` Hook

In this iteration you will create a **single hook** that handles both login and signup, eliminating the duplication between `useLogin` and `useSignup`.

### 4.1 — Identify the duplication

Place the two hooks side by side:

| `useLogin`                          | `useSignup`                          |
|-------------------------------------|--------------------------------------|
| `const login = async (creds) => …`  | `const signup = async (creds) => …`  |
| `fetch(url, { method: "POST", … })` | `fetch(url, { method: "POST", … })` |
| manages `error` + `isLoading`        | manages `error` + `isLoading`        |
| stores user in `localStorage`        | stores user in `localStorage`        |

Everything is the same except the function name and the URL. We can extract a shared `authenticate` helper and expose two public functions.

### 4.2 — Create `src/hooks/useAuth.jsx`

```jsx
import { useState } from "react";

export default function useAuth() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async (url, credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setIsLoading(false);
        return null;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  const login = (credentials) =>
    authenticate("/api/users/login", credentials);

  const signup = (credentials) =>
    authenticate("/api/users/signup", credentials);

  return { login, signup, isLoading, error };
}
```

**Key design decisions:**
- `authenticate` is a **private** helper — it is not returned to the consumer. It contains all the shared logic (fetch, error handling, localStorage).
- `login` and `signup` are **thin wrappers** that only supply the correct URL.
- The hook takes **no arguments** — the URLs are hardcoded inside because they are fixed for this application.
- Both functions share the same `error` and `isLoading` state, which makes sense because a user can only be performing one auth action at a time.

### 4.3 — Refactor `Login.jsx` to use `useAuth`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await login({ email, password });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={isLoading}>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
```

### 4.4 — Refactor `Signup.jsx` to use `useAuth`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await signup({ name, email, password });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={isLoading}>Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
```

**What changed compared to Iteration 2 & 3:**
- The import changed from `useLogin`/`useSignup` to `useAuth`.
- `useAuth()` is called **without a URL argument** — the URLs are managed inside the hook.
- Everything else in the components remains the same.

### 4.5 — Test

1. Test login with valid and invalid credentials.
2. Log out, then test signup with a new user.
3. Verify that error messages still display correctly on failure.

> **Takeaway:** When two hooks share the same structure, consider merging them into one. This reduces the number of files to maintain and ensures consistent behavior across related features.


----

## Iteration 5: `useField` Custom Hook

In this iteration you will create a hook that manages a single form input's state — its `type`, `value`, and `onChange` handler — so that forms become much more concise.

### 5.1 — Review the current `AddBookPage.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  // ... addBook and submitForm logic ...

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>ISBN:</label>
        <input
          type="text"
          required
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};
```

Every field follows the exact same pattern:
1. Declare a `useState` for the value.
2. Set `type`, `value`, and `onChange` on the `<input>`.

With three fields this is manageable, but as forms grow, the boilerplate adds up quickly.

### 5.2 — Create `src/hooks/useField.jsx`

```jsx
import { useState } from "react";

export default function useField(type) {
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    };


    return { type, value, onChange, };
}
```

**Key points:**
- The hook takes the input `type` (e.g. `"text"`, `"email"`, `"password"`) as a parameter.
- It returns an object with `type`, `value`, and `onChange` — these are exactly the props that an `<input>` element expects.
- Because the returned object's keys match `<input>` props, you can **spread** the object directly onto the element: `<input {...title} />`.

### 5.3 — Refactor `AddBookPage.jsx`

```jsx
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const AddBookPage = () => {
  const title = useField("text");
  const author = useField("text");
  const isbn = useField("text");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const addBook = async (newBook) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) {
        throw new Error("Failed to add book");
      }
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newBook = {
      title: title.value,
      author: author.value,
      isbn: isbn.value,
    };

    const success = await addBook(newBook);
    if (success) {
      console.log("Book Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the book");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input {...title} required />
        <label>Author:</label>
        <input {...author} required />
        <label>ISBN:</label>
        <input {...isbn} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
```

**What changed:**
- Removed the `useState` import — no longer needed in this component.
- Replaced three `useState` calls with three `useField("text")` calls.
- Each `<input>` now receives its props via the spread operator (`{...title}`), which passes `type`, `value`, and `onChange` in one shot.
- When building the `newBook` object, values are accessed as `title.value`, `author.value`, `isbn.value`.

> **Tip:** The spread syntax `{...title}` is equivalent to writing `type={title.type} value={title.value} onChange={title.onChange}`. It saves keystrokes and reduces the chance of wiring mistakes.

### 5.4 — Test

1. Navigate to Add Book (you must be logged in).
2. Fill in the form and submit — the book should be added and you should be redirected home.
3. Verify the new book appears in the listing.


----

## Summary

| Hook | Purpose | Used in |
|------|---------|---------|
| `useFetch` | GET data from any URL with loading/error states | `HomePage.jsx` |
| `useLogin` | POST login credentials, store token | `Login.jsx` |
| `useSignup` | POST signup data, store token | `Signup.jsx` |
| `useAuth` | Combined login + signup (replaces both above) | `Login.jsx`, `Signup.jsx` |
| `useField` | Manage a single form input's state | `AddBookPage.jsx` |

**Benefits of custom hooks:**
- **Reusability** — Write the logic once, use it in many components.
- **Separation of concerns** — Components focus on rendering; hooks handle data and side effects.
- **Readability** — Components become shorter and easier to understand.
- **Testability** — Hooks can be tested independently of any UI.
- **Composability** — Hooks can call other hooks, enabling powerful abstractions.

