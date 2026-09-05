
# React Router

> You can find the complete code for this tutorial in the following directory: [here](./src/react-router/).

---
## Part 1: Introduction to React Router: Building a Dynamic Single-Page Application

Navigating through a modern web application should feel seamless and fast. React Router is a library that makes this possible by enabling client-side routing in React applications. With React Router, you can navigate between pages without refreshing the entire page, creating a smooth and dynamic user experience.

In this article, we'll walk you through the basics of using React Router to set up navigation in a simple React application. By the end, you'll have a working single-page application (SPA) with multiple views and a "Not Found" page to handle incorrect URLs.

### Getting Started: Setting Up Your Project

To start using React Router, we need a basic React application. If you need a fresh project to work on, follow these steps to set it up:

Open your terminal and run the following commands to create a new React app:

```bash
npx create-vite@latest react-router-example --template react
cd react-router-example
```

This will create a new project called `react-router-example` and navigate you into the project directory.

### Installing React Router

Next, we need to install the React Router library. React Router provides the components and functions needed to handle routing in your app. To add it to your project, run:

```bash
npm install react-router-dom@latest
```

This command installs the latest version of `react-router-dom`, the core package for routing in React applications.

### Creating the Components

In a React application, each page is typically represented by a component. We'll create three simple components for our example: **Home**, **About**, and **Contact**. Here’s how to do it:

1. Inside the `src` directory, create a new folder called `components`.
2. In the `components` folder, create three new files: `Home.jsx`, `About.jsx`, and `Contact.jsx`.

Let's add some basic content to each of these files:

- **Home.jsx**:

    ```jsx
    function Home() {
      return (
        <div>
          <h2>Home Page</h2>
          <p>Welcome to our website!</p>
        </div>
      );
    }

    export default Home;
    ```

- **About.jsx**:

    ```jsx
    function About() {
      return (
        <div>
          <h2>About Page</h2>
          <p>Learn more about our company.</p>
        </div>
      );
    }

    export default About;
    ```

- **Contact.jsx**:

    ```jsx
    function Contact() {
      return (
        <div>
          <h2>Contact Page</h2>
          <p>Reach out to us for inquiries.</p>
        </div>
      );
    }

    export default Contact;
    ```

Each component here is a simple function that returns some JSX, which will serve as the content for our three different pages.

### Adding Navigation with React Router

To move between these pages, we need a way to navigate. That's where React Router comes in. Let's create a `Navigation` component that will use the `Link` component from React Router to provide navigation links.

1. Inside the `components` folder, create a new file named `Navigation.jsx`:

    ```jsx
    import { Link } from 'react-router-dom';

    function Navigation() {
      return (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      );
    }

    export default Navigation;
    ```

The `Navigation` component provides a set of links using the `Link` component from `react-router-dom`. These links will allow users to navigate between the different routes in our app.

### Setting Up Routing in the App

Now that we have our components ready, it’s time to set up routing in the main `App.jsx` file. Open `App.jsx` and update it with the following code:

```jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

Here's what each part does:
- **`BrowserRouter`**: A container that enables the use of React Router throughout your application.
- **`Routes`**: A wrapper for all your route definitions.
- **`Route`**: Defines a specific route, its path, and the component to render when the path matches.

### Testing Your Application

Now, let's see everything in action! Start the development server by running:

```bash
npm run dev
```

This will open your application in the default web browser at `http://localhost:5173`. Click on the links in the navigation menu, and you should be able to see each page load without a full page refresh.

### Handling 404 Errors with a "Not Found" Page

One common requirement for most web applications is to handle unknown or incorrect URLs gracefully. Let's create a "Not Found" page that will display whenever a user navigates to a non-existent route.

1. Inside the `components` folder, create a new file named `NotFound.jsx`:

    ```jsx
    function NotFound() {
      return (
        <div>
          <h1>404 - Not Found</h1>
          <p>Oops! The page you are looking for doesn't exist.</p>
        </div>
      );
    }

    export default NotFound;
    ```

2. Update the `App.jsx` file to include the new "Not Found" route:

    ```jsx
    import React from "react";
    import { BrowserRouter, Route, Routes } from "react-router-dom";
    import Navigation from "./components/Navigation";
    import Home from "./components/Home";
    import About from "./components/About";
    import Contact from "./components/Contact";
    import NotFound from "./components/NotFound";

    function App() {
      return (
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} /> {/* This line catches all unmatched routes */}
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;
    ```

The route with `path="*"` acts as a catch-all for any routes that don't match the defined routes, displaying the "Not Found" page.

### Final Testing

Save your changes and, if the development server isn't already running, start it again:

```bash
npm run dev
```

Now, try navigating to a URL that doesn’t exist (like `http://localhost:5173/nonexistent`). You should see the "404 - Not Found" page displayed.

### Recap

By integrating React Router into your application, you can transform it into a dynamic, single-page application that provides a fast and seamless user experience. With this basic setup, you now have a foundation to build more complex routing scenarios, like nested routes, dynamic parameters, or private routes.

React Router makes it easy to create navigation that feels natural and intuitive, allowing your users to move around your app effortlessly. Now, take it a step further and experiment with more advanced features of React Router to enhance your application's capabilities!

---
## Part 2: How to Handle Nested Routes in React: Building a Structured Layout


React Router is a powerful tool that helps create dynamic, client-side routing for your React applications. One of its key features is the ability to define **nested routes**, which allows you to build complex layouts and multi-level navigation. In this part, we will explore how to handle nested routes in a React application by using a layout component to wrap and manage the navigation structure.

By the end of this guide, you will understand how to set up a layout component that serves as a common structure for multiple pages and defines nested routes to display specific content.

### Step 1: Create the Layout Component

The first step in handling nested routes is to create a layout component that will wrap the main structure of your application. This layout will contain a common navigation bar and a designated area where different components will be rendered based on the current route.

1. **Create a New Layout Component**:  
   Inside the `src/components` folder, create a new file named `Layout.jsx`.

2. **Import the Required Modules**:  
   In `Layout.jsx`, start by importing the necessary modules from React Router:

   ```javascript
   import { Outlet, Link } from "react-router-dom";
   ```

3. **Define the Layout Component**:  
   Create a functional component named `Layout` that includes a navigation menu and an `<Outlet />` component. The `<Outlet />` acts as a placeholder where the nested components will be rendered based on the current route.

```javascript
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
      <>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    );
};
  
export default Layout;
```

#### What Does This Component Do?

- **Navigation Menu**: The `<nav>` element contains links (`<Link>`) to different routes. Clicking on these links will navigate to their respective routes (`/`, `/about`, and `/contact`).
- **Outlet**: The `<Outlet />` component is where the nested route components (such as `Home`, `About`, or `Contact`) will be rendered. It acts as a placeholder for the matched child routes defined in the parent route.

### Step 2: Update the App Component to Use the Layout

Now that we have created the `Layout` component, the next step is to update the `App.jsx` file to use this layout as the base structure for all routes. 

1. **Open the `App.jsx` File**:  
   Open the `App.jsx` file in the root `src` directory.

2. **Import the Layout Component**:  
   At the top of your `App.jsx`, import the `Layout` component:

```javascript
import Layout from "./components/Layout";
```

3. **Set Up the Routes with Nested Routing**:  
   Update the `App` component to define routes using the `Layout` component for nested routing.

```javascript
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the Layout Route */}
        <Route path="/" element={<Layout />}>
          {/* Nested Routes within the Layout */}
          <Route index element={<Home />} /> {/* Default Route */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

#### What Did We Change?

- **`<Layout />` Component**: We wrapped the routes inside a parent `<Route>` with the `element={<Layout />}`. This tells React Router to use the `Layout` component as the base layout.
- **Nested Routes**: The nested routes (`Home`, `About`, `Contact`, and `NotFound`) are defined as children of the layout route. The `index` route is specified for the default content (`Home` component), and the other routes (`about`, `contact`, etc.) render different components within the `<Outlet />` of the `Layout`.

### Step 3: Testing Your Nested Routes

Now that you've set up the nested routing, it's time to test if everything works as expected.

1. **Run the Development Server**:  
   Make sure your development server is running. You can start it by running:

   ```bash
   npm run dev
   ```

2. **Navigate to the Application**:  
   Open your web browser and navigate to `http://localhost:5173`.

3. **Test the Navigation**:  
   - You should see the navigation menu provided by the `Layout` component.
   - Click on the "Home," "About," and "Contact" links to test navigation between different routes.
   - The content of the `<Outlet />` will change based on the current route, displaying the respective component.

### Understanding Nested Routes in React Router

By using the `Layout` component with an `<Outlet />`, we are able to create a common layout structure that wraps multiple routes. The nested routes inherit the layout defined by the parent route, which is useful for creating consistent layouts across different parts of an application, such as a shared navigation bar, sidebar, or footer.

**Key Benefits of Using Nested Routes:**

- **Reusable Layouts**: Easily create a shared layout (such as a header or navigation menu) that is consistent across multiple routes.
- **Improved Structure**: Organize your routes in a more hierarchical and structured way.
- **Dynamic Content Rendering**: Allows for dynamic content rendering within a common structure without reloading the entire page.

### Recap

Handling nested routes in React Router enables you to build more sophisticated and organized applications by defining hierarchical routing structures. With the `Layout` component, you can provide a consistent look and feel across different pages while keeping your routing logic clear and maintainable. Now that you have a basic understanding of nested routes, try experimenting with more complex nesting scenarios or adding additional layouts to enhance your application further. 

---
## Part 3: Add Basic Styles to the Layout Component

To make your application visually appealing, we will add some basic styles to the layout component. This will include styling the navigation bar and the page content area.

#### Step 1: Add Styles

1. **Create a New CSS File**:  
   Inside the `components` directory, create a new file named `Layout.css`.

2. **Define the CSS Styles**:  
   Open `Layout.css` and add the following styles:

   ```css
   /* Layout Styles */
   nav {
     background-color: #333;
     color: #fff;
     padding: 1rem;
   }

   ul {
     list-style: none;
     padding: 0;
   }

   li {
     display: inline;
     margin-right: 1rem;
   }

   a {
     text-decoration: none;
     color: #fff;
   }

   /* Page Content Styles */
   main {
     padding: 2rem;
   }
   ```

   These styles will create a dark-themed navigation bar, with horizontal menu items and whitespace padding around the page content to improve readability.

#### Step 2: Link the Stylesheet to the Layout Component

1. **Import the CSS File**:  
   Open your `Layout.jsx` file.

2. **Import the CSS at the Top of `Layout.jsx`**:  
   Add the following import statement at the top of the file:

   ```javascript
   import "./Layout.css";
   ```

   This import will ensure that the styles defined in `Layout.css` are applied to the layout component.

#### Step 3: Applying Styles to Layout

1. **Add a `className` to the `nav` Element**:  
   In your `Layout` component (`Layout.jsx`), add a `className` attribute to the `nav` element:

   ```javascript
   <nav className="navbar">
     {/* ... */}
   </nav>
   ```

2. **Wrap the `Outlet` in a `main` Element**:  
   Similarly, wrap the `<Outlet />` component in a `main` element with a `className` to style the page content:

   ```javascript
   <main className="page-content">
     <Outlet />
   </main>
   ```

   This approach ensures that the styles are correctly applied to the navigation bar and the main content area.

#### Updated Layout Component

After applying the above changes, your `Layout.jsx` file should look like this:

```javascript
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
      <>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
  
        <main className="page-content">
          <Outlet />
        </main>
      </>
    );
  };

export default Layout;
```

#### Step 4: Testing Your Styled Layout

1. **Run the Development Server**:  
   Make sure your development server is running by executing `npm run dev`  in the terminal.

2. **Open the Application in a Browser**:  
   Navigate to `http://localhost:5173` in your web browser. You should now see your app with a styled navigation bar and page content.


---
## Part 4: `Link` vs `NavLink`

In React Router, both `Link` and `NavLink` are used to create navigation links, but they serve slightly different purposes and offer different features:

### `Link`
- **Purpose**: Used for basic navigation between different routes in a React application without reloading the page.
- **Usage**: Ideal for simple navigation where no specific styling is required for active links.
- **Example**:
  ```jsx
  import { Link } from 'react-router-dom';

  function Navbar() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    );
  }
  ```

### `NavLink`
- **Purpose**: A special version of `Link` that adds styling attributes to the rendered element when it matches the current URL.
- **Usage**: Useful for navigation menus where you want to highlight the currently active route.
- **Additional Props**:
  - `isActive`: A function to determine if the link is active.
- **Example**:
  ```jsx
  import { NavLink } from 'react-router-dom';

  function Navbar() {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined}>Contact</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
  ```

  ```css
  a.active {
    color: #fff;
    background: #007bff;
  }
  ```

### Key Differences
- **Styling Active Links**: `NavLink` provides built-in support for styling active links, making it easier to highlight the current route.
- **Props**: `NavLink` includes additional props like `activeClassName` and `activeStyle` for customizing the appearance of active links, which `Link` does not offer.

These differences help you choose the right component based on your navigation needs. If you need to highlight active links, `NavLink` is the way to go. For simple navigation without active link styling, `Link` is sufficient.


---

## Links

- [React Router - w3schools](https://www.w3schools.com/react/react_router.asp)
- [ React Router in Depth](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf)
- [Learn React Router In 45 Minutes](https://youtu.be/Ul3y1LXxzdU?si=_A3UouGRhMzPowbr)


