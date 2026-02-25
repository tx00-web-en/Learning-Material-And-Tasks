# Custom React Hooks


- [Part 1: Create `useRegister` Hook](#part-1-custom-react-hooks-creating-a-useregister-hook-for-signup-and-login)
- [Part 2: Create `useFetch`  Hook](#part-2-custom-react-hook-a-detailed-guide-to-usefetch) 

<!-- 
- [useSignup](./src/hooks/useSignup.jsx)
- [useLogin](./src/hooks/useLogin.jsx) 
-->

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

---
## Part 2: Custom React Hooks: Creating a `useRegister` Hook for Signup and Login

Custom hooks in React provide a way to encapsulate and reuse logic across multiple components. In this part, we'll explore the creation of a custom hook called `useRegister`, which handles both signup and login functionalities. We'll demonstrate how to implement this hook, use it in an `AuthForm` component, and integrate it within a main `App` component. By the end of this, you'll have a reusable, efficient way to handle user authentication in your React application.

### 1. Creating the `useRegister` Hook

The `useRegister` hook simplifies authentication by encapsulating both signup and login logic in a single function. Here's how it works:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = (setIsAuthenticated, isSignup = true) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const endpoint = isSignup ? "/api/user/signup" : "/api/user/login";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log(`User ${isSignup ? "signed up" : "logged in"} successfully!`);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error(`${isSignup ? "Signup" : "Login"} failed`);
      }
    } catch (error) {
      console.error(`Error during ${isSignup ? "signup" : "login"}:`, error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
  };
};

export default useRegister;
```

#### How it works:
- **State Management**: The hook uses `useState` to manage `email` and `password` fields.
- **Dynamic Endpoint**: It determines whether the user is signing up or logging in based on the `isSignup` parameter, dynamically setting the appropriate API endpoint (`/api/user/signup` or `/api/user/login`).
- **Authentication Flow**: After a successful API response, the user data is saved in `localStorage`, the `setIsAuthenticated` state is updated, and the user is redirected to the homepage.
- **Error Handling**: It handles both failed responses from the server and potential network errors.

By abstracting this logic into a custom hook, you make it reusable for any authentication form component.

### 2. Building the `AuthForm` Component

The `AuthForm` component is where users will either log in or sign up, depending on the passed `isSignup` prop. This form integrates the `useRegister` hook to handle input fields and form submission.

```jsx
import React, { useState } from "react";
import useRegister from "./useRegister";

const AuthForm = ({ isSignup }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { email, setEmail, password, setPassword, handleRegister } = useRegister(setIsAuthenticated, isSignup);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div>
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
```

#### Key Features:
- **Dynamic Title**: The form's title and submit button dynamically change based on the `isSignup` prop.
- **Form State**: The `email` and `password` values are controlled inputs tied to the state managed by `useRegister`.
- **Submit Handler**: When the form is submitted, it calls `handleRegister`, which invokes the custom hook's logic for either signup or login.

This makes the component clean, reusable, and fully decoupled from specific authentication logic.

### 3. Integrating with the Main `App` Component

Finally, we'll integrate the `AuthForm` component into a main `App` component. You can decide whether to render the form as a signup or login by simply passing the appropriate `isSignup` prop.

```jsx
import React from "react";
import AuthForm from "./AuthForm";

const App = () => {
  return (
    <div>
      <AuthForm isSignup={true} /> {/* Signup Form */}
      <AuthForm isSignup={false} /> {/* Login Form */}
    </div>
  );
};

export default App;
```

In this example, we render both the signup and login forms. However, in a real-world application, you might conditionally display either the signup or login form based on user interaction or routing.

### Benefits of Using `useRegister`:
- **Reusability**: The hook can be used across different forms or pages where authentication is required, without duplicating logic.
- **Code Separation**: It abstracts complex logic like API calls and error handling away from the form component, keeping your components clean and focused.
- **Flexibility**: The same hook handles both signup and login by changing a simple boolean parameter, reducing code duplication and making maintenance easier.

### Conclusion

Custom hooks in React offer a powerful way to encapsulate functionality in a reusable and declarative manner. We built a `useRegister` hook to handle both signup and login, demonstrated how to use it within an `AuthForm` component, and integrated it into a simple `App`. With this approach, you can easily extend and adapt the authentication logic for future use cases while keeping your components clean and focused on UI concerns.

---
## Links

- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) vs [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- other:
  - [localStorage/sessionStorage vs Cookies](https://blog.logrocket.com/localstorage-javascript-complete-guide/#localstorage-vs-cookies)
  - [localStorage in JavaScript](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
  - [Window localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
- [Custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
  - [Example: useFetch](https://www.w3schools.com/react/react_customhooks.asp)
  - [Rules of hooks](https://react.dev/warnings/invalid-hook-call-warning)
- Other: 
  - [Hooks behind the scene](https://medium.com/flatiron-labs/breaking-the-rules-of-react-hooks-9e892636641e)
  - Book: [Designing React Hooks the Right Way](https://metropolia.finna.fi/Record/nelli15.5500000000157994?sid=3444690400)
  - [Another Example](https://swr.vercel.app/) from [NextJS](https://nextjs.org/)
- [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
- Add Login Authentication to React Applications
  - [Mern Auth](https://github.com/iamshaunjp/MERN-Auth-Tutorial/tree/lesson-17) 
  - [How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)