# Pair Programming Implementation 


### Overview

Throughout the activity, you will switch roles: the driver (who writes code) becomes the navigator (who reviews and guides), and vice versa. Remember to switch roles after each iteration, to ensure both participants contribute to coding and reviewing.

**Commit messages: Recommended format**

- *feat* Short for feature. Used when you add a new feature or new functionality to the codebase.
- *refactor* used when you change existing code without altering behavior. This improves structure, readability, or organization.
- *chore* used for maintenance tasks that don’t change application behavior. Examples: updating dependencies, adding logging, renaming files, config changes.

---
### Iteration 0: Project Setup

1. **Decide Initial Roles**:
   - Determine who will start as the driver and who will be the navigator. Remember to switch roles after each major step.

2. **Clone the starter code**:
   - Use the following commands to get started:
     ```bash
     git clone https://github.com/tx00-resources-en/week4-fe-pp-starter week4-fe-pp
     cd week4-fe-pp
     ```
   - **Note**: Remove the `.git` directory to ensure that you start with a fresh Git history for your new repository.
   - Initialize a new Git repository:
     ```bash
     rm -rf .git
     git init
     git add .
     git commit -m "chore: initial project setup from starter template"
     ```

3. **Install Dependencies**:
   - First, install the base project dependencies:
     ```bash
     npm install
     ```
   - Install React Router DOM for client-side routing functionality:
     ```bash
     npm install react-router-dom
     ```
   - Start the development server to verify everything works:
     ```bash
     npm run dev
     ```
   - **Note**: React Router DOM enables navigation between different "pages" in your single-page application without full page refreshes.

---
### Iteration 1: Basic Routing

Follow the steps below to set up basic routing in your React application.

#### 1. Create `Home.jsx` Component
Create a new file named `Home.jsx` in the `components` folder with the following content:

```jsx
// Home.jsx
function Home() {
  return (
    <div className="temp">
      <h1>This is Home</h1>
      <p>Welcome! Glad you're here.</p>
    </div>
  );
}

export default Home;
```

#### 2. Create `NotFound.jsx` Component
Create another file named `NotFound.jsx` in the `components` folder with the following content:

```jsx
// NotFound.jsx
function NotFound() {
  return (
    <div className="temp">
      <h1>404 - Not Found</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
    </div>
  );
}

export default NotFound;
```

#### 3. Update `App.jsx` with Basic Routing

  - Open your main `App.jsx` file and update the `App` component to set up the routing. 
  - The final code should look like this:

    ```jsx
    import About from "./components/About";
    import Footer from "./components/Footer";
    import Hero from "./components/Hero";
    import Header from "./components/Header";
    import Services from "./components/Services";
    import Tours from "./components/Tours";
    import Home from "./components/Home";
    import NotFound from "./components/NotFound";
    import "./App.css";
    import { BrowserRouter, Route, Routes } from "react-router-dom";

    function App() {
      return (
        <BrowserRouter>
          <Header />
          <Hero />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      );
    }

    export default App;
    ```

> - The `BrowserRouter` component enables routing functionality for your entire app
> - `Routes` and `Route` components define which component renders for each URL path
> - The `path="*"` route catches any unmatched URLs and shows the NotFound component
> - For advanced routing with nested routes, see Iteration 7

#### 4. Update `PageLink` Component

Open the `PageLink` component file and make the following changes:

- Import the `Link` component from `react-router-dom`. 
- The final code should look like this:

```jsx
import { Link } from "react-router-dom";

const PageLink = ({ link, itemClass }) => {
  return (
    <li>
      <Link to={link.href} className={itemClass}>
        {link.text}
      </Link>
    </li>
  );
};

export default PageLink;
```

#### 5. Update `data.js`
Open the `data.js` file and replace the existing `pageLinks` array (currently using hash links like `#home`) with route paths for React Router navigation:

```jsx
export const pageLinks = [
  { id: 1, href: "/", text: "home" },
  { id: 2, href: "/about", text: "about" },
  { id: 3, href: "/services", text: "services" },
  { id: 4, href: "/tours", text: "tours" },
];
```

**Note**: This changes the navigation from hash-based scrolling to route-based navigation, which works with React Router.

#### 6. Commit Your Changes
Once all changes are made, commit them with a meaningful commit message describing what was done. e.g.
```
feat: implement basic routing with react-router-dom

- Add Home and NotFound components
- Configure BrowserRouter with Routes in App.jsx
- Update PageLink component to use react-router Link
- Modify pageLinks data for route navigation
```


---
### Iteration 2:

- Refactor the `Services` component so the services array is stored in component state (using `useState`). At the top of the file import useState from React — for example: `import { useState } from 'react';`
- Also keep any other existing imports. Use the state variable (e.g.,`servicesData`) instead of the external services array, and update it with the setter (e.g., `setServicesData`) when removing or restoring services.

```jsx
import { useState } from 'react';
import { services } from "../data";
// Rest of your  imports...

function Services() {
  const [servicesData, setServicesData] = useState(services);

  // Rest of your component logic...

  return (
    // Your JSX structure...
  );
}

export default Services;
```

- **Commit Changes** with a meaningful message. e.g.
```
refactor: convert Services to use local state

- Replace imported data arrays with useState hooks
- Maintain existing functionality with component state
- Prepare components for dynamic data manipulation
```

---
### Iteration 3:

- Enhance the `Services` component to allow visitors to hide services they are not interested in. Implement a button on each service item for removal, similar to this [`demo`](https://github.com/tx00-web-en/Learning-Material-And-Tasks/tree/week4/material/src/demo3).
- **Commit Changes** with a meaningful message. e.g.
```
feat: add removal functionality to Services

- Implement remove buttons for each service item
- Add click handlers to filter out selected items
- Enhance user interaction with dynamic content removal
```

---
### Iteration 4:

- Refactor the `Tours` component so the tours array is stored in component state (using `useState`). At the top of the file import useState from React — for example: `import { useState } from 'react';`
- Also keep any other existing imports. Use the state variable (e.g., `toursData`) instead of the external tours array, and update it with the setter (e.g., `setToursData`) when removing or restoring tours.

```jsx
import { useState } from 'react';
import { tours } from "../data";
// Rest of your  imports...

function Tours() {
  const [toursData, setToursData] = useState(tours);

  // Rest of your component logic...

  return (
    // Your JSX structure...
  );
}

export default Tours;
```

- **Commit Changes** with a meaningful message. e.g.
```
refactor: convert Tours to use local state

- Replace imported data arrays with useState hooks
- Maintain existing functionality with component state
- Prepare components for dynamic data manipulation
```


---
### Iteration 5:

- Enhance the `Tours` component to allow visitors to hide tours they are not interested in. Implement a button on each tour item for removal, similar to this [`demo`](https://github.com/tx00-web-en/Learning-Material-And-Tasks/tree/week4/material/src/demo3).
- **Commit Changes** with a meaningful message. e.g.
```
feat: add removal functionality to Tours component

- Implement remove buttons for each tour item
- Add click handlers to filter out selected items
- Enhance user interaction with dynamic content removal
```


---
### Iteration 6:

- Write a `Registration` component and update the `Navbar` component to include a link to the new registration form. The `Registration` component should consist of a form with a minimum of five fields (e.g., name, email, password, confirm password, phone number).
- Add a new route `/registration` to your App.jsx routing configuration.
- **(Optional)** Add a style sheet to enhance the visual presentation of the components. Customize the styles according to your design preferences for a more polished and appealing user interface.
- **Commit Changes** with a meaningful message. e.g.
```
feat: add Registration component with form validation

- Create registration form with 5+ input fields
- Add navigation link and route to registration page
- Include basic form styling and user interaction
```

---
### Iteration 7 (**Optional**) 

1. Create a `Layout` component that includes the common elements (Header, Hero, Footer).
2. Import and utilize `<Outlet />` from react-router-dom in the `Layout` component where the page content should render.
3. Refactor your main App component to use nested routes with the `Layout` component for improved structure and organization.
4. Move individual page routes to be children of the Layout route.
5. **Commit Changes** with a meaningful message e.g
```
refactor: implement nested routing with Layout component

- Create Layout component using Outlet for nested routes
- Restructure App.jsx to use nested route pattern
- Improve application architecture and code organization
```

**Layout Component Example Structure:**
```jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Header />
      <Hero />
      <Outlet /> {/* This renders the current page component */}
      <Footer />
    </>
  );
}

export default Layout;
```