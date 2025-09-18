#  React Authentication

- [Part 1: Implementing Authentication in React](#part-1-implementing-authentication-in-react)
- [Part 2: Refactoring React Authentication with Custom Hooks](#part-2-refactoring-react-authentication-with-custom-hooks)
- [Links](#links)

---
## Part 1: Implementing Authentication in React

Authentication is a core feature of most web applications, ensuring that users can securely access and manage their accounts. In React, authentication flows can be implemented using a combination of state management, API interactions, and client-side storage. In this reading, we will explore how to create a simple signup and login system, and handle authenticated navigation in a React app. 

We'll cover three main components:
1. **SignupComponent** for user registration.
2. **LoginComponent** for user login.
3. **NavBar** for conditional rendering of UI elements based on the authentication state.

### Signup and Login Components

#### 1. State Management for User Input

Both `SignupComponent` and `LoginComponent` use **React state** to capture user input in form fields. This is achieved through `useState` hooks, which manage the form data for `email` and `password`.

```js
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

The state is then bound to the form inputs, and updated when the user types, using the `onChange` event.

#### 2. Fetch API for API Requests

To communicate with the backend, we use the `fetch` API to make **POST** requests for both signup and login. This sends the user's credentials (email and password) to the respective endpoints (`/api/user/signup` and `/api/user/login`).

For example, the signup request is made like this:

```js
const response = await fetch("/api/user/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
```

If the server responds with a successful status code (`response.ok`), we assume that the user has been authenticated.

#### 3. Handling Authentication State

In both components, once the user is successfully authenticated (signup or login), we:
- **Store the user information in `localStorage`**: This allows us to persist authentication status across page reloads. The token or user data returned by the API is stored like this:

  ```js
  localStorage.setItem("user", JSON.stringify(user));
  ```

- **Update the authentication state**: Each component receives a `setIsAuthenticated` prop, which is used to update the app-wide authentication status. This is typically managed at a higher level in the app, such as a parent component or context provider:

  ```js
  setIsAuthenticated(true);
  ```

- **Redirect the user to the homepage**: Upon successful signup or login, the user is navigated to the homepage or dashboard using the `useNavigate` hook from React Router:

  ```js
  navigate("/");
  ```

Here’s what the complete **SignupComponent** looks like:

```js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupComponent = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;
```

#### **LoginComponent** is almost identical, except that it sends a request to the `/api/user/login` endpoint instead of the signup one:

```js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginComponent;
```

---

### **Conditional Rendering in the NavBar**

The `NavBar` component controls what the user sees based on whether they are authenticated or not. The authentication status is passed as a prop (`isAuthenticated`), and the component renders different UI based on its value.

#### **Logout Mechanism**

When the user clicks the logout button, we remove the user’s data from `localStorage` and set the `isAuthenticated` state to `false`. This effectively logs the user out:

```js
const handleClick = () => {
  localStorage.removeItem("user");
  setIsAuthenticated(false);
};
```

The UI is conditionally rendered based on the `isAuthenticated` prop. If the user is authenticated, the NavBar shows a welcome message and a logout button. Otherwise, it shows links to the login and signup pages.

```js
import { Link } from "react-router-dom";

function Navbar({ setIsAuthenticated, isAuthenticated }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <nav>
      {isAuthenticated ? (
        <div>
          <span>Welcome</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
```

---

### **Summary of Part 1**

In Part 1, we implemented a basic authentication flow in React using three key components:
1. **SignupComponent**: Handles user registration and updates the app’s authentication state on success.
2. **LoginComponent**: Authenticates the user and updates the state upon successful login.
3. **NavBar**: Dynamically renders content based on whether the user is logged in or not.

The core ideas we covered include:
- Using `localStorage` to persist user sessions.
- Sending API requests with the `fetch` API to sign up or log in users.
- Managing component state for user input using `useState`.
- Conditionally rendering the UI in the navigation bar based on authentication status.

In **Part 2**, we will refactor this code to make it more modular and reusable by introducing **custom hooks** for authentication management. This will allow us to separate business logic from UI components, improving maintainability and scalability.

---
## Part 2: Refactoring React Authentication with Custom Hooks

In Part 1, we implemented a basic authentication flow in a React application using state and API requests to handle user signup, login, and logout. While this implementation works, it has some drawbacks, including repeated code across components, making the codebase harder to maintain and scale as the application grows.

In **Part 2**, we will refactor the authentication logic to use **custom hooks**, which offer a more efficient and reusable way to manage state and logic across components.


### **Why Use Custom Hooks?**

React introduced **hooks** in version 16.8 to simplify and modularize logic across function components. The benefit of hooks is that they allow you to extract stateful logic into reusable functions, making your code more organized and maintainable.

For authentication, using custom hooks provides several advantages:
- **Code Reusability**: Instead of duplicating logic (e.g., handling form state and API requests) in both the signup and login components, we can move that logic into a single hook and reuse it across components.
- **Separation of Concerns**: Custom hooks allow you to separate your component’s view (UI) from its business logic (e.g., handling API requests), making the components cleaner and more focused.
- **Better State Management**: With custom hooks, we can manage authentication states in a centralized way, reducing complexity.


### **Refactoring Authentication with Custom Hooks**

#### **1. Custom Signup Hook: `useSignup`**

The custom `useSignup` hook encapsulates all the logic required for user signup. It manages:
- **State**: For form fields (email and password).
- **API Requests**: Handles the signup request to the backend and saves the user to `localStorage`.
- **Navigation**: Redirects the user to the homepage or a different page after successful signup.

Here’s the code for `useSignup`:

```js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = function (setIsAuthenticated) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User signed up successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
  };
};

export default useSignup;
```

#### **2. Refactored Signup Component**

The `SignupComponent` is now much simpler. It leverages the `useSignup` hook to handle all the signup logic, reducing code duplication and complexity. The component is responsible solely for rendering the form and interacting with the hook to manage the signup process.

```js
import useSignup from "../hooks/useSignup";

const SignupComponent = ({ setIsAuthenticated }) => {
  const { email, setEmail, password, setPassword, handleSignup } =
    useSignup(setIsAuthenticated);

  return (
    <div>
      <h2>Signup</h2>
      <label>
        email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;
```

The benefit of this refactoring is clear: the `SignupComponent` is now focused on the UI, while the `useSignup` hook takes care of the signup logic. This makes the code cleaner, easier to maintain, and reduces duplication.


#### **3. Custom Login Hook: `useLogin`**

Similar to `useSignup`, the `useLogin` hook encapsulates the login logic, managing the form state and making the API request to the backend. This hook can now be reused anywhere in the app where login functionality is required.

Here’s the code for `useLogin`:

```js
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useLogin = (setIsAuthenticated) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User logged in successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};

export default useLogin;
```


#### **4. Refactored Login Component**

Just like the signup component, the `LoginComponent` has been refactored to use the `useLogin` hook. This simplifies the component, making it more focused on rendering the form and handling user input while the hook handles the login logic.

```js
import useLogin from "../hooks/useLogin";

const LoginComponent = ({ setIsAuthenticated }) => {
  const { email, setEmail, password, setPassword, handleLogin } =
    useLogin(setIsAuthenticated);

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginComponent;
```

### **The Benefits of Using Custom Hooks in Authentication**

#### **1. Code Reusability**
By extracting the signup and login logic into hooks (`useSignup` and `useLogin`), we eliminate code duplication between components. Now, we can reuse these hooks in different parts of the application, making the logic easy to maintain and extend. 

For instance, if we ever need to add another form for login in a different place, we can simply call the `useLogin` hook, rather than duplicating the login logic.

#### **2. Separation of Concerns**
Custom hooks allow us to keep components focused on UI rendering while abstracting away business logic (e.g., making API requests, managing state). This improves the readability and organization of the code. For example, the signup and login components are now simply forms that interact with the custom hooks.

#### **3. Scalability**
As the app grows, handling additional logic like error handling, form validation, or token expiration becomes easier with hooks. We can modify the hooks without affecting the components that use them.

#### **4. Maintainability**
When you isolate logic in hooks, the code becomes easier to maintain and debug. For example, if there’s an issue with login or signup, you can quickly track down the problem in a centralized place (i.e., the custom hook), rather than searching through multiple components.

### **Conclusion**

By refactoring the signup and login logic into **custom hooks**, we significantly improve the organization, reusability, and maintainability of the code. These hooks encapsulate the state management, API requests, and form handling logic, allowing us to build cleaner, more focused components.

In React applications, authentication is a critical feature that can quickly become complex. Using custom hooks to handle authentication processes not only reduces code duplication but also makes your app more scalable and easier to maintain. This approach sets the foundation for extending authentication features in the future, such as handling user roles, token refresh, or even integrating third-party authentication providers.

With the use of hooks, we can ensure that our React app remains clean, modular, and easy to manage as it grows in complexity.

---
## Links

- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) vs [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [Custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
  - [Example: useFetch.js](https://www.w3schools.com/react/react_customhooks.asp)
  - [Rules of hooks](https://react.dev/warnings/invalid-hook-call-warning)
  - [Another Example](https://swr.vercel.app/) from [NextJS](https://nextjs.org/)
- Add Login Authentication to React Applications
  - [Mern Auth](https://github.com/iamshaunjp/MERN-Auth-Tutorial/tree/lesson-17) 
  - [How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)
- other:
  - [localStorage/sessionStorage vs Cookies](https://blog.logrocket.com/localstorage-javascript-complete-guide/#localstorage-vs-cookies)
  - [localStorage in JavaScript](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
  - [Window localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
  - [Hooks behind the scene](https://medium.com/flatiron-labs/breaking-the-rules-of-react-hooks-9e892636641e)
  - Book: [Designing React Hooks the Right Way](https://metropolia.finna.fi/Record/nelli15.5500000000157994?sid=3444690400)  