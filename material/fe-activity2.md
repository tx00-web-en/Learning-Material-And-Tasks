# Activity 2: Auth & Context in React  

In this guide, you'll learn how to share data between components using the **Context API** and the `useContext` hook. We'll also integrate this technique with **react-router** to protect routes and dynamically update the navigation bar based on the user's logged-in status.  

> You can find the final code [here](https://github.com/tx00-resources-en/w7-auth-context).  

## Setting Up the Project with Vite  

1. **Initialize the Project**  
   Create a new Vite project using the React template:  

   ```sh
   npx create-vite auth-context-app --template react
   cd auth-context-app
   npm install
   ```

2. **Customize the Styling**  
   Update the CSS file for a better starting point. Open `index.css` and replace its content with the following:  

   ```css
    form {
      max-width: 400px;
      margin: 0 auto;
      padding: 1em;
      background: #f9f9f9;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    label {
      margin-bottom: .5em;
      color: #333333;
      display: block;
    }

    input {
      border: 1px solid #CCCCCC;
      padding: .5em;
      font-size: 1em;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 1em;
      border-radius: 3px;
    }

    button {
      padding: 0.7em;
      color: #fff;
      background-color: #007BFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
    }

    button:hover {
      background-color: #0056b3;
    }

    br {
      display: none;
    }


    nav {
      background-color: #333;
      padding: 1em;
    }

    nav ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
    }

    nav ul li {
      margin: 0;
    }

    nav ul li a {
      color: #fff;
      text-decoration: none;
      padding: 0.5em 1em;
      border-radius: 3px;
      transition: background-color 0.3s;
    }

    nav ul li a:hover {
      background-color: #555;
    }

    main {
      padding: 2em;
      max-width: 800px;
      margin: 0 auto;
      background-color: #f9f9f9;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
   ```

Now that our project is ready, let's add the necessary components and set up our authentication context.

## Creating the Authentication Context

First, let's create a context that will manage the user's logged-in status and store their JWT token. We'll call it `AuthContext`.

**Note**

- Using Context allows us to keep track of information with `useState` or `useReducer`, then any component can access that information without having to pass it down as props.

- For more on `userContext` works, check out the <a href="https://react.dev/reference/react/useContext">official documentation</a>.


- Create a new file `src/Context/AuthContext.jsx` and add the following content:

```javascript
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = (jwtToken) => {
    setIsLoggedIn(true);
    setToken(jwtToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
  };

  const value = {
    isLoggedIn,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}
```

Here's what's happening in the code above:

1. Import `createContext` and `useState` from React.
2. Create a new context called `AuthContext`.
3. Define an `AuthProvider` function component that will wrap our entire app. This component maintains the `isLoggedIn` and `token` state.
4. Define the `login` and `logout` functions to manage the user's logged-in status and token.
5. Pass the context value as an object containing the state variables and functions.
6. Finally, export the `AuthContext` and `AuthProvider` so we can use them in other parts of our app.

Now we can make it so that any component is able to access the `isLoggedIn`,`token`,`login`, and `logout` values.

## Creating the Login Screen

We're going to create a simple login screen that mocks a network request for a JWT token. 

- Create a new file `src/pages/Login.jsx` and add the following content:

```javascript
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fake network request for JWT token
    const jwtToken = "fake-jwt-token";
    login(jwtToken);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
```

In the `Login` component above, we:

1. Import the necessary hooks and `AuthContext`.
2. Use the `useContext` hook to access the `login` function from our `AuthContext`.
3. Define local state for email and password input fields.
4. Define a `handleSubmit` function that simulates a network request for a JWT token and calls the `login` function with the fake token.
5. Render a simple form with email and password input fields and a submit button.

## Creating the Home Screen

Now let's create a basic home screen that will display the user's logged-in status and allow them to log out.

- Create a new file `src/pages/Home.jsx` and add the following content:

```javascript
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Home() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      {isLoggedIn ? (
        <>
          <p>Welcome! You are logged in.</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in to access more features.</p>
      )}
    </div>
  );
}

export default Home;
```

In the `Home` component above, we:
1. Import the necessary hooks and `AuthContext`.
2. Use the `useContext` hook to access the `isLoggedIn` and `logout` functions from our `AuthContext`.
3. Render a welcome message and a logout button if the user is logged in, otherwise, display a message prompting the user to log in.

## Setting Up Routes with react-router-dom

Before wrapping our app with `AuthProvider`, let's first install `react-router-dom` and set up routes for our `Home` and `Login` components. 

- Install React Router 6 as a dependency.

    ```sh
    npm install react-router-dom
    ```

We have a login screen and a home screen, but if you try running the app right now, it won't work. That's because we haven't wrapped our app with `AuthProvider` yet. A component must be nested inside `AuthProvider` in order to access the context values.

## Wrapping the App with AuthProvider

With our routes in place, let's wrap our entire app with the `AuthProvider`. This will make the user data available to any component nested inside it.

- Replace the content of `src/App.jsx` to include the `AuthProvider`:

```javascript
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```


## Testing the App

Now that everything is set up, it's time to test our app.

<b>Start the development server.</b>

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`. You should see the home page displaying the "Please log in to access more features." message. Click on the "**Login**" link in the navigation menu and enter any email and password to log in. After logging in, `navigate` (*manually*) back to the home page, which will now display a welcome message and a logout button.

We've successfully created an app that uses React 18's `useContext` hook to manage user authentication. 

Remember, *this tutorial uses a fake JWT token for simplicity*, but in a real-world scenario, you'd want to replace it with a proper network request to your authentication server.

## Redirect to Home After Login

After the user logs in, they should be navigated to a different page. In this case, we'll redirect them to the home page.

- Modify `src/Login.jsx` to redirect the user to the home page after logging in:

```javascript
//pages/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fake network request for JWT token
    const jwtToken = "fake-jwt-token";
    login(jwtToken);
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
```

Here we are checking if the user is logged in, and if they are, we redirect them to the home page using the `Navigate` component from `react-router-dom`. We can use a similar technique to redirect the user to the login page if when they are **not** logged in.

## Adding a Protected Route

Now that we have our `AuthProvider` and routes set up, let's add a protected route to our app. This route will only be accessible to authenticated users. We'll create a `Profile` component that will be our protected route.

### Creating the Profile Component

- Create a new file `src/pages/Profile.jsx` and add the following content:

```javascript
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Profile() {
  const { token } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
      <p>Your secret token is: {token}</p>
    </div>
  );
}

export default Profile;
```

In the `Profile` component above, we:

1. Import the necessary hooks and `AuthContext`.
2. Use the `useContext` hook to access the `token` from our `AuthContext`.
3. Render the user's secret token as part of their profile information.

### Creating a Route Guard

To protect the `Profile` route, we'll create a higher-order component called `RouteGuard` that will check if the user is logged in before rendering the protected component.

- Create a new file `src/pages/RouteGuard.jsx` and add the following content:

```javascript
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function RouteGuard({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default RouteGuard;
```

In the `RouteGuard` component above, we:
1. Import the necessary hooks, `Navigate` from `react-router-dom`, and `AuthContext`.
2. Use the `useContext` hook to access the `isLoggedIn` value from our `AuthContext`.
3. Check if the user is logged in, and if so, render the protected component. Otherwise, redirect the user to the `/login` page.

### Adding the Protected Route

Finally, let's add the `Profile` component as a protected route in our `App` component.

- Modify `src/App.jsx` to include the `Profile` route and wrap it with the `RouteGuard`:

```javascript
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RouteGuard from "./pages/RouteGuard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

Now, the `Profile` route is protected by the `RouteGuard` component. Users who aren't logged in will be redirected to the `/login` page when trying to access the `/profile` route.

With this setup, you've successfully implemented a protected route in your React app using `AuthProvider` and `react-router-dom`. Not only can you share data between pages with ease, but you can also create a more secure user experience by protecting sensitive routes.

## Enhancing the User Experience with a Dynamic Navigation Bar

To make our app even more user-friendly, let's create a dynamic navigation bar that updates its content based on the user's logged-in status.

- Modify the `src/App.jsx` file to include a separate `Navigation` component:

```javascript
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RouteGuard from "./pages/RouteGuard";

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

In the `Navigation` component above, we:
1. Import the necessary hooks and `AuthContext`.
2. Use the `useContext` hook to access the `isLoggedIn` value from our `AuthContext`.
3. Conditionally render the "Profile" or "Login" link based on the user's logged-in status.

Now, the navigation bar will display the "Profile" link only when the user is logged in. Otherwise, it will show the "Login" link.


## Storing and Loading JWT Token from Local Storage

In this section, we'll enhance our app by storing the JWT token in the browser's local storage. This way, the user's logged-in status will persist across sessions, and they won't have to log in again every time they visit the site.

First, let's update our `AuthContext` to store the JWT token in local storage when the user logs in and load the token from local storage when the context is initialized.

- Modify `src/Context/AuthContext.jsx` to include local storage handling.

```javascript
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt) {
      setIsLoggedIn(true);
      setToken(storedJwt);
    }
    setIsLoading(false);
  }, []);

  function login(token) {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("jwt", token);
  }

  function logout() {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("jwt");
  }

  const authValue = {
    isLoggedIn,
    isLoading,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}
```

In the updated `AuthProvider` component, we've made the following changes:
1. Added a `useEffect` hook that runs when the component is mounted. This hook checks if there's a JWT token stored in local storage, and if so, it sets the `isLoggedIn` state to `true` and updates the `jwt` state with the stored token.
2. Modified the `login` function to store the JWT token in local storage when the user logs in.
3. Modified the `logout` function to remove the JWT token from local storage when the user logs out.

When the user logs in, the JWT token will be stored in local storage, and their logged-in status will persist across browser sessions. When they visit the site again, their logged-in status will be automatically restored using the stored token.

Since `useEffect` runs after the component is mounted, we won't know if the user is logged in until components have already been loaded. So we need to include an `isLoading` state to indicate that the user's logged-in status is still being determined.

- Modify `src/pages/RouteGuard.jsx` to use `isLoading`.

```javascript
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function RouteGuard({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children; 
}

export default RouteGuard;
```

1. If the localStorage hasn't been checked yet, `isLoading` will be true and we'll return an empty fragment to "do nothing".
2. If the user is not logged in, we'll redirect them to the login page.
3. Otherwise, the user is logged in and we'll render the child components.

## Summary

In this tutorial, we've built a React 18 app using Vite that can handle user authentication using the useContext hook. We've created an AuthContext to manage the logged-in status and JWT token, a Login component to handle user logins, and a Home component to display user status. We also added a protected route and a secret page to demonstrate how to restrict access based on the user's logged-in status.

As you can see, the useContext hook is a powerful tool for managing and sharing state across your app. While this tutorial focused on user authentication, the concepts can be applied to many other use cases as well.


### Summary of Key Steps:

In the [React documentation](https://react.dev/learn/passing-data-deeply-with-context), the three steps listed are:

1. **Create a context** using `React.createContext()`.
2. **Use the context** with `useContext()` or `Context.Consumer` in the component that needs it.
3. **Provide the context** by using `Context.Provider`.

Note that the last: step "Provide the context" implies wrapping a parent component with the `Context.Provider`. The documentation groups this into the broader "Provide the context" step rather than splitting it into two separate ones. This simplifies the explanation and focuses more on the logical flow of using context rather than detailing every technical action as a separate step.

However, remember that "wrapping the parent with `Context.Provider`" is a critical part of using context, and it could arguably be considered its own distinct step. The documentation keeps it concise, but breaking it out might help some learners.

So, while React documentation condenses it into three steps for simplicity, you could consider it an additional "4th" step if that helps clarify the process for you.


## Reference

- [Tutorial: `useContext`](https://www.sammeechward.com/use-context-auth)
- [Tutorial: `react-router-dom`](https://www.sammeechward.com/react-router-6).