
# Activity 1: React's `useContext` hook

---
## Part 1: Understanding `useContext` with Theme Switching


### Set Up

1. **Create a new Vite project using the React template.**

   ```sh
   npx create-vite my-theme-app --template react
   cd my-theme-app
   npm install
   ```

2. **Add CSS**: Open `index.css` and replace the content with the following:

   ```css
   .button-light {
       background: #fff;
       color: #222;
   }

   .button-dark {
       background: #222;
       color: #fff;
   }

   .panel-light {
       background: #f0f0f0;
       color: #000;
   }

   .panel-dark {
       background: #333;
       color: #fff;
   }
   ```

   - **Note**: Make sure to define styles for both light and dark themes for buttons and panels.


### **Step 1: Create a Context**

> Create a file `ThemeContext.jsx` in the `/Context` folder.

The first step to using `useContext` is to **create the context**. This is done using the `createContext` function, which allows us to define a shared state (such as the theme) across different components.

#### Code Explanation:
```javascript
// Context/ThemeContext.jsx
import { createContext } from 'react';

const ThemeContext = createContext('light'); // Default value: 'light'

export default ThemeContext;
```

- **`ThemeContext`**: This context is created with a default value of `'light'`, meaning that unless otherwise specified, the theme will default to light.
- **Why create context?** Context is used to avoid passing props down through every level of the component tree.

### **Step 2: Provide the Context to Components**

> Create a file `ThemeProvider.jsx` in the `/Context` folder.

In this step, we **provide the context** to the components that need it. This is done using a context provider, which wraps the component tree and makes the context data available to all child components.

#### Code Explanation:
```javascript
// Context/ThemeProvider.jsx
import { useState } from 'react';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Manage theme state

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark')); // Switch between themes
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      {children}
    </ThemeContext.Provider>
  );
}
```

- **`useState('light')`**: A state hook is used to manage the current theme, initialized to `'light'`.
- **`toggleTheme`**: This function switches between the `'light'` and `'dark'` themes.
- **`<ThemeContext.Provider value={{ theme, toggleTheme }}>`**: The `ThemeProvider` component wraps its children and provides both the `theme` value and the `toggleTheme` function to them.

**Example Usage in the App**

Now, let's see how these components come together in the main `App.jsx` file. Replace the content of `App.jsx` with the following:

```javascript
// App.jsx
import ThemeProvider from './Context/ThemeProvider';
import Form from './Components/Form';
import Button from './Components/Button';

export default function App() {
  return (
    <ThemeProvider> {/* Provides theme context to all child components */}
      <Form />
      <Button>Toggle Theme</Button> {/* This button can toggle the theme */}
    </ThemeProvider>
  );
}
```

- **`ThemeProvider`**: This component wraps all other components, ensuring they have access to the theme context.
- **`Form` and `Button`**: Both components can now use the `theme` and `toggleTheme` values provided by the `ThemeContext`.



### **Step 3: Use the Context in Components**

> Create a file `Panel.jsx` in the `/Components` folder.

Finally, we **consume the context** in any component that needs access to the shared state (in this case, the theme). This is done using `useContext`.

```javascript
// Components/Panel.jsx
import { useContext } from 'react';
import ThemeContext from '../Context/ThemeContext';

export default function Panel({ title, children }) {
  const { theme } = useContext(ThemeContext); // Access the theme
  const className = 'panel-' + theme; // Dynamic class based on theme

  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
```

- **`useContext(ThemeContext)`**: This hook is used to access the theme value from the `ThemeContext`.
- **`const className = 'panel-' + theme`**: The class name of the panel is dynamically generated based on the current theme.

### **Step 4: Create the Form Component**

> Create a file `Form.jsx` in the `/Components` folder.

The `Form` component will use a `Panel` to wrap a couple of buttons that allow a user to either sign up or log in. Here's the complete code:

```javascript
// Components/Form.jsx
import Panel from './Panel';
import Button from './Button';

export default function Form() {
  return (
    <Panel title="Welcome to the Form"> {/* Title of the form */}
      <Button>Sign up</Button> {/* Button for sign-up */}
      <Button>Log in</Button> {/* Button for log-in */}
    </Panel>
  );
}
```

### **Step 5: Create the Button Component**

> Create a file `Button.jsx` in the `/Components` folder.

Here’s how we use `useContext` in the `Button` component to apply a theme-specific style and toggle the theme when clicked:

```javascript
// Components/Button.jsx
import { useContext } from 'react';
import ThemeContext from '../Context/ThemeContext';

export default function Button({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function
  const className = 'button-' + theme; // Dynamic class based on theme

  return (
    <button className={className} onClick={toggleTheme}>
      {children}
    </button>
  );
}
```

- **`toggleTheme`**: The button toggles the theme (light/dark) when clicked.


### **Testing the App**

Here's how your file structure should look:

```sh
/src
  /Context
    ThemeContext.jsx
    ThemeProvider.jsx
  /Components
    Button.jsx
    Form.jsx
    Panel.jsx
  App.jsx
  index.jsx
  index.css  
```

Now that everything is set up, it's time to test our app. Start the development server.

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.


### Summary of Key Steps:

In the [React documentation](https://react.dev/learn/passing-data-deeply-with-context), the three steps listed are:

1. **Create a context** using `React.createContext()`.
2. **Provide the context** by using `Context.Provider`.
2. **Use the context** with `useContext()` or `Context.Consumer` in the component that needs it.

Note that the step "Provide the context" implies wrapping a parent component with the `Context.Provider`. The documentation groups this into the broader "Provide the context" step rather than splitting it into two separate ones. This simplifies the explanation and focuses more on the logical flow of using context rather than detailing every technical action as a separate step.

However, remember that "wrapping the parent with `Context.Provider`" is a critical part of using context, and it could arguably be considered its own distinct step. The documentation keeps it concise, but breaking it out might help some learners.

So, while React documentation condenses it into three steps for simplicity, you could consider it an additional "4th" step if that helps clarify the process for you.



---
## Part 2: Building a Mock Authentication System with `useContext` 

### Objective

In this part, you will learn how to create a simple user authentication system in React using the `useContext` and `useState` hooks. This example will be organized across multiple files to maintain clean and manageable code.


### 1. Setup

**Create a new Vite project using the React template.**

 ```sh
    npx create-vite my-auth-app --template react
    cd my-auth-app
    npm install
 ```
 

- In the `src` folder create two directories: `Context` and `pages`. The main files we will create include:
  - `src/Context/AuthContext.jsx`: Defines the context.
  - `src/Context/AuthProvider.jsx`: Manages the authentication state.
  - `src/pages/Home.jsx`: Displays a welcome message or a login prompt.
  - `src/pages/Login.jsx`: Provides a form for user login.
  - `src/App.jsx`: The main application component.

### 2. Create the Authentication Context

> **Create `Context/AuthContext.jsx`:**

This file will create and export the authentication context using `createContext`.

```javascript
// Context/AuthContext.jsx
import { createContext } from 'react';

const AuthContext = createContext(null); // Create a context with a default value of null

export default AuthContext; // Export the AuthContext
```

### 3. Create the Authentication Provider

>  **Create `Context/AuthProvider.jsx`:**
This component will manage the authentication state, provide the login and logout functions, and supply this data to child components through context.

```javascript
// Context/AuthProvider.jsx
import { useState } from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Initial state is null (no user logged in)

  const login = (username) => {
    setUser({ username }); // Set the user state when logging in
  };

  const logout = () => {
    setUser(null); // Reset the user state when logging out
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Provide the auth context value to children */}
    </AuthContext.Provider>
  );
}
```

### 4. Set Up the Main Application

**Update `App.jsx`:**
In this file, you'll wrap your application with the `AuthProvider` to provide authentication context to your components. We'll also set up React Router to manage different routes for the app.

First, ensure that you have React Router installed:

```bash
npm install react-router-dom
```

Now, update the `App.jsx` file as follows:

```javascript
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/login" element={<Login />} /> {/* Login route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### 5. Create the Home Component

> **Create `pages/Home.jsx`:**
This component will display a welcome message if the user is logged in or prompt them to log in if they are not.

```javascript
// pages/Home.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate
import AuthContext from '../Context/AuthContext';

export default function Home() {
  const { user, logout } = useContext(AuthContext); // Access the auth context

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />; // Redirect to the login route
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
}
```

### 6. Create the Login Component

> **Create `pages/Login.jsx`:**
This component contains a form that allows users to input their username to log in.

```javascript
// pages/Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate
import AuthContext from "../Context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState(""); // Local state for username
  const { login, user } = useContext(AuthContext); // Access the login function from context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    login(username); // Call the login function with the username
    return navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        placeholder="Username"
        required // Ensure input is not empty
      />
      <button type="submit">Login</button> {/* Submit button */}
    </form>
  );
}
```


**Add CSS**: Open `index.css` and replace the content with the following:

```css
/* index.css */

/* Basic Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0; /* Light background color */
  color: #333; /* Dark text color */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height */
}

h1 {
  margin-bottom: 20px;
}

/* Form styling */
form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
}

/* Input styling */
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* Button styling */
button {
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s; /* Smooth transition */
}

button:hover {
  background-color: #0056b3; /* Darker shade for hover effect */
}

/* Home page styling */
.home {
  text-align: center; /* Center-align text */
}

.logout-button {
  background-color: #dc3545; /* Bootstrap danger color */
}

.logout-button:hover {
  background-color: #c82333; /* Darker shade for logout button hover */
}
```

### 7. Testing the App

- Now that everything is set up, it's time to test our app. Start the development server.

```bash
npm run dev
```

- Open your browser and navigate to `http://localhost:5173`.

### Summary of Key Steps:

In the [React documentation](https://react.dev/learn/passing-data-deeply-with-context), the three steps listed are:

1. **Create a context** using `React.createContext()`.
2. **Provide the context** by using `Context.Provider`.
3. **Use the context** with `useContext()` or `Context.Consumer` in the component that needs it.

Note that the step "Provide the context" implies wrapping a parent component with the `Context.Provider`. The documentation groups this into the broader "Provide the context" step rather than splitting it into two separate ones. This simplifies the explanation and focuses more on the logical flow of using context rather than detailing every technical action as a separate step.

However, remember that "wrapping the parent with `Context.Provider`" is a critical part of using context, and it could arguably be considered its own distinct step. The documentation keeps it concise, but breaking it out might help some learners.

So, while React documentation condenses it into three steps for simplicity, you could consider it an additional "4th" step if that helps clarify the process for you.

### Links

- [React `useContext` Reference](https://react.dev/reference/react/useContext)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
<!-- [ How to manage user authentication With React JS](https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5) -->