# Custom React Hooks


Custom hooks are one of the most powerful patterns in React. They let you extract component logic into reusable functions that can be shared across your application. Any function whose name starts with `use` and that calls other hooks is a custom hook.

**Table of Contents**

- [Part 1: `useFetch` — Data Fetching](#part-1-custom-react-hook-a-detailed-guide-to-usefetch)
- [Part 2: `useLogin` — Login Authentication](#part-2-uselogin-hook)
- [Part 3: `useSignup` — User Registration](#part-3-usesignup-hook)
- [Part 4: `useAuth` — Unified Authentication](#part-4-useauth-hook)
- [Part 5: `useField` — Form Input Management](#part-5-usefield-custom-hook)

**Why custom hooks?**

| Benefit | Description |
|---------|-------------|
| **Reusability** | Write logic once, use it in many components |
| **Separation of concerns** | Components render UI; hooks manage data and side effects |
| **Readability** | Components become shorter and easier to scan |
| **Testability** | Hooks can be unit-tested independently of any UI |
| **Composability** | Hooks can call other hooks, enabling layered abstractions |

---
## Part 1: Custom React Hook: A Detailed Guide to `useFetch`

Fetching data from an API is a common task in web development, especially in modern applications that rely on external services for content. React’s declarative approach makes it easy to manage the data fetching process with hooks. In this part, we'll explore how to create a custom hook called `useFetch` to encapsulate the logic of fetching data from an API. We’ll break down its functionality, look at error handling, and show how to use it in a component.

### Why Use a Custom Hook for Fetching Data?

When developing React applications, you often need to fetch data from an API. This process involves managing loading states, handling errors, and updating the UI based on the fetched data. If you write this logic repeatedly in multiple components, your code becomes harder to maintain. A custom hook like `useFetch` allows you to encapsulate this behavior in a reusable, maintainable way.

### The `useFetch` Hook

Here’s the `useFetch` hook that simplifies the process of fetching data from a given URL:

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

#### Detailed Breakdown of the Hook

1. **State Management**:
   - `data`: Stores the response data from the API. Initially, it's set to `null`.
   - `loading`: Indicates whether the data is being fetched. It's initialized to `true` because the fetch operation starts immediately after the component mounts.
   - `error`: Holds any error messages encountered during the fetch process.

2. **`useEffect`**:
   - React’s `useEffect` hook is used to run the `fetchData` function whenever the component mounts or the `url` changes. Since `url` is included in the dependency array, the hook will refetch data if the URL is updated.
   
   - **Important Note**: The effect will run once when the component is first rendered, and again any time the `url` prop changes, ensuring that the hook is always working with the latest URL.

3. **`fetchData` Function**:
   - **Loading State**: Before starting the fetch request, the `loading` state is set to `true`, so the UI can display a loading indicator.
   - **Fetch API**: The `fetch` method is used to make the HTTP request to the provided `url`. This function is asynchronous, and it awaits the response.
   
   - **Error Handling**: If the `response.ok` flag is `false` (indicating the request failed, e.g., with a 404 or 500 status), an error is thrown, triggering the `catch` block. The error message is then stored in the `error` state.
   
   - **Data Processing**: If the request is successful, the response is converted to JSON using `response.json()`, and the result is stored in the `data` state. If an error occurs during the fetch, the `catch` block will handle it, ensuring that the `data` state remains `null`.
   
   - **Finally Block**: Whether the fetch is successful or fails, the `finally` block ensures that `loading` is set to `false` once the fetch is complete.

4. **Returning State**:
   - The `useFetch` hook returns an object containing the `data`, `loading`, and `error` states. This allows any component using the hook to easily access and display the fetched data, show a loading spinner, or display error messages.

#### Advantages of `useFetch`

- **Reusability**: By encapsulating the data fetching logic in a hook, you can reuse it across multiple components without duplicating code.
- **Separation of Concerns**: Components can focus on rendering the UI, while the hook handles the data fetching logic.
- **Simplicity**: The hook abstracts away the complexities of asynchronous requests, error handling, and state management, providing a clean API for your components.


### How to Use `useFetch` in a Component

Let’s see how the `useFetch` hook can be used in a component to fetch data from an API and display it. Here’s an example:

```jsx
import React from "react";
import useFetch from "./useFetch";

const MyComponent = () => {
  const { data, loading, error } = useFetch("https://api.example.com/data");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data && data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default MyComponent;
```

### Explanation of the Component:

1. **Calling `useFetch`**:
   - The `useFetch` hook is called with a URL, in this case, `https://api.example.com/data`. This URL points to the API that we want to retrieve data from.
   - The returned object contains `data`, `loading`, and `error`, which are destructured for easier access.

2. **Conditional Rendering**:
   - The component first checks if `loading` is `true`. If so, it displays a "Loading..." message to the user.
   - If there’s an `error`, the component displays the error message.
   - Once the data is fetched and `loading` is `false` with no errors, the component renders the data. In this case, the `data` is an array, so we map over it and display each item’s `name`.

3. **Handling Different States**:
   - **Loading State**: Users will see the "Loading..." message while the data is being fetched.
   - **Error State**: If the fetch request fails, users will be notified of the error with a message like "Error: Network response was not ok".
   - **Data Display**: When the data is successfully fetched, it is rendered as a list of items.

#### Example Scenario:

Suppose you have an API that provides a list of users from `https://api.example.com/users`. Using the `useFetch` hook, you can easily fetch and display the list of users in your component.

```jsx
const UserList = () => {
  const { data, loading, error } = useFetch("https://api.example.com/users");

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data && data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

This `UserList` component fetches data from the API and handles loading, error, and success states. The hook makes the data fetching process smooth and removes the need to manually manage these states inside the component itself.


### Conclusion

The `useFetch` custom hook is a powerful and reusable solution for handling API requests in React. It abstracts away the complexity of fetching data, managing loading and error states, and allows components to focus on rendering the UI. By using this hook, you can keep your components clean and reduce repetitive code in your application.

By encapsulating this logic into a hook, you're also making your code more testable, maintainable, and reusable. Whether you’re working with multiple APIs or a single endpoint, `useFetch` will streamline the data-fetching process, making your React development more efficient.



----

## Part 2: `useLogin` Hook

Authentication is another area where custom hooks shine. Login forms typically need to POST credentials to an API, handle errors, manage a loading indicator, and persist the returned token. All of that is **non-UI logic** that belongs in a hook.

### The Problem

Look at a typical `Login.jsx` component:

```jsx
const Login = ({ setIsAuthenticated }) => {
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
    setIsAuthenticated(true);
    navigate("/");
  };
  // ...
};
```

The `handleFormSubmit` function is doing too much: making the request, parsing the response, handling errors, and storing the token. If you need login functionality elsewhere (e.g. auto-login after signup), you would have to duplicate all of this.

### The `useLogin` Hook

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

#### Detailed Breakdown

1. **Parameters**:
   - `url` — the API endpoint (e.g. `"/api/users/login"`). Passing it as a parameter makes the hook flexible.

2. **State**:
   - `error` — stores the error message from the server or a network error. Starts as `null`.
   - `isLoading` — `true` while the request is in flight. Starts as `false` (unlike `useFetch`, there is no automatic request on mount).

3. **The `login` function**:
   - Accepts a `credentials` object (e.g. `{ email, password }`). The hook does not care about which fields are in the object — it simply serializes and sends it.
   - Returns the **user object** on success so the caller can react to it (e.g. navigate). Returns `null` on failure.
   - Handles the full request lifecycle: sets loading → fetches → parses → stores token or sets error → clears loading.

4. **Return value**: `{ login, isLoading, error }` — the component gets a function to trigger the action and two state values to reflect the result.

### Using `useLogin` in a Component

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
```

The form handler is now just four lines. The component focuses entirely on rendering and user interaction.



----

## Part 3: `useSignup` Hook

The `useSignup` hook follows the exact same pattern as `useLogin`. This is intentional — it demonstrates how naturally hooks emerge when you spot repeated patterns.

### The `useSignup` Hook

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

#### Comparison with `useLogin`

| Aspect | `useLogin` | `useSignup` |
|--------|-----------|------------|
| Function name | `login` | `signup` |
| Internal logic | identical | identical |
| State variables | `error`, `isLoading` | `error`, `isLoading` |
| localStorage | `setItem("user", …)` | `setItem("user", …)` |

The two hooks are **structurally identical**. The only semantic difference is the function name exposed to the consumer. This observation leads directly to the next part.

### Using `useSignup` in a Component

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
```


----

## Part 4: `useAuth` Hook

### From Two Hooks to One

In Parts 2 and 3 we created `useLogin` and `useSignup`. They work perfectly, but they share **100% of their internal logic**. When you spot this kind of duplication, the next step is to **merge them into a single, more powerful hook**.

### Design Approach

Instead of accepting a URL parameter, `useAuth` hardcodes both endpoints internally and exposes two thin wrapper functions:

```
useAuth()
  ├── authenticate(url, credentials)   ← private helper (shared logic)
  ├── login(credentials)               ← calls authenticate with "/api/users/login"
  └── signup(credentials)              ← calls authenticate with "/api/users/signup"
```

### The `useAuth` Hook

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

#### Detailed Breakdown

1. **No parameters**: Unlike `useLogin`/`useSignup`, the hook takes no arguments. The API URLs are implementation details hidden inside the hook.

2. **`authenticate` — the private helper**:
   - This function is **not** included in the return object, so consumers cannot call it directly.
   - It contains all the shared logic: setting loading state, making the POST request, parsing the response, handling errors, and persisting the token.
   - It returns the user data on success or `null` on failure, just like the individual hooks did.

3. **`login` and `signup` — thin wrappers**:
   - Each is a one-liner that calls `authenticate` with the appropriate URL.
   - This pattern is sometimes called the **facade pattern** — a simple interface hiding more complex internal logic.

4. **Shared state**:
   - `error` and `isLoading` are shared between `login` and `signup`. This is safe because a user will only ever perform one auth action at a time.

#### When to Use `useAuth` vs Separate Hooks

| Use `useAuth` when… | Use separate hooks when… |
|----------------------|---------------------------|
| Login and signup share the same error/loading UI | Each form needs independent loading/error states |
| You want fewer files to maintain | The two operations have significantly different logic |
| The API endpoints are fixed | Different parts of the app need different auth endpoints |

### Using `useAuth` in Components

**Login.jsx:**
```jsx
const { login, isLoading, error } = useAuth();

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const user = await login({ email, password });
  if (user) {
    setIsAuthenticated(true);
    navigate("/");
  }
};
```

**Signup.jsx:**
```jsx
const { signup, isLoading, error } = useAuth();

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const user = await signup({ name, email, password });
  if (user) {
    setIsAuthenticated(true);
    navigate("/");
  }
};
```

The two components now import the **same hook** and destructure only the function they need. The error/loading UI code is identical in both, which is consistent and predictable for users.



----

## Part 5: `useField` Custom Hook

### The Problem: Form Boilerplate

Every controlled input in React requires the same three things:

1. A `useState` call for the value
2. A `value` prop on the `<input>`
3. An `onChange` handler

For a form with three fields, that means three `useState` calls, three `value` props, and three `onChange` handlers. As forms grow, this boilerplate multiplies.

### The `useField` Hook

```jsx
import { useState } from "react";

export default function useField(type) {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { type, value, onChange, reset };
}
```

#### Detailed Breakdown

1. **Parameter — `type`**:
   - The HTML input type (e.g. `"text"`, `"email"`, `"password"`, `"number"`).
   - It is stored and returned as-is, so it can be spread directly onto an `<input>` element.

2. **State — `value`**:
   - A standard `useState` string that tracks the current input value.

3. **`onChange` handler**:
   - Reads `e.target.value` and updates state. This is the exact handler you would normally write inline.

4. **`reset` function**:
   - Resets the field to an empty string. Useful for clearing a form after successful submission.

5. **Return object — `{ type, value, onChange, reset }`**:
   - The first three keys (`type`, `value`, `onChange`) match exactly what an `<input>` element expects as props.
   - This means you can use the **spread operator** to pass them all at once: `<input {...field} />`.
   - `reset` is a bonus utility that doesn't interfere with spreading (HTML inputs ignore unknown props during rendering, and `reset` is a function, not rendered as an attribute).

### The Spread Technique

This is the key insight of `useField`. Instead of:

```jsx
<input
  type={title.type}
  value={title.value}
  onChange={title.onChange}
/>
```

You write:

```jsx
<input {...title} />
```

The spread operator `{...title}` expands the object into individual props. Since the object keys match the expected prop names, it just works.

> **Note:** When you need additional props like `required` or `placeholder`, add them after the spread: `<input {...title} required placeholder="Enter title" />`. Props listed after the spread will override any conflicting spread values.

### Using `useField` in a Component

**Before (with `useState`):**
```jsx
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [isbn, setIsbn] = useState("");

// In JSX:
<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
<input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
<input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
```

**After (with `useField`):**
```jsx
const title = useField("text");
const author = useField("text");
const isbn = useField("text");

// In JSX:
<input {...title} required />
<input {...author} required />
<input {...isbn} required />
```

To access the current values (e.g. when building the request body):
```jsx
const newBook = {
  title: title.value,
  author: author.value,
  isbn: isbn.value,
};
```

### Full Refactored `AddBookPage.jsx`

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
      if (!res.ok) throw new Error("Failed to add book");
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


----

## Final Summary

### All Hooks at a Glance

| Hook | Input | Returns | Purpose |
|------|-------|---------|---------|
| `useFetch(url)` | API URL | `{ data, loading, error }` | GET request with full lifecycle |
| `useLogin(url)` | API URL | `{ login, isLoading, error }` | POST login credentials |
| `useSignup(url)` | API URL | `{ signup, isLoading, error }` | POST signup data |
| `useAuth()` | — | `{ login, signup, isLoading, error }` | Unified auth (replaces above two) |
| `useField(type)` | Input type | `{ type, value, onChange, reset }` | Single form field state |

### The Refactoring Journey

```
Inline code in components
    ↓  Extract repeated logic
useFetch  ← data fetching
useLogin  ← login logic
useSignup ← signup logic  ← nearly identical to useLogin
    ↓  Merge duplicates
useAuth   ← combines login + signup
    ↓  Reduce form boilerplate
useField  ← one hook per input field
```

Each step made the components simpler, the logic more reusable, and the codebase easier to maintain. That is the power of custom hooks.


---
## Links

- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
- [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
- Add Login Authentication to React Applications
  - [Mern Auth](https://github.com/iamshaunjp/MERN-Auth-Tutorial/tree/lesson-17) 
  - [How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)