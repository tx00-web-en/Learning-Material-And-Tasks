# Pair Programming: Front end

> Throughout the activity, you will switch roles: the driver (who writes code) becomes the navigator (who reviews and guides), and vice versa. Remember to switch roles regularly, preferably after each major step, to ensure both participants contribute to coding and reviewing.


### Iteration 0: Project Setup

1. **Decide Initial Roles**:
   - Determine who will start as the driver and who will be the navigator. Remember to switch roles after each major step.

2. **Clone the Sample Solution**:
   Instead of starting from scratch, `please use this starter code`:

   - Clone the tours API repository:
     ```bash
     git clone https://github.com/tx00-resources-en/week3-fe-pp-sample-sol week4-fe-pp
     cd week4-fe-pp
     rm -rf .git
     ```
   - **Explanation**: Removing the `.git` directory ensures that you start with a fresh Git history for your new repository.

3. **Install Dependencies**:
   - Install the required dependencies and start the development server:
     ```bash
     npm install react-router-dom
     npm run dev
     ```

---
### Iteration 1: Basic Routing

Follow the steps below to set up basic routing in your React application.

#### 1. Create `Home.jsx` Component
Create a new file named `Home.jsx` in the `components` folder with the following content:

```jsx
import React from "react";

function Home() {
  return <div>This is Home</div>;
}

export default Home;
```

#### 2. Create `NotFound.jsx` Component
Create another file named `NotFound.jsx` in the `components` folder with the following content:

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

#### 3. Update `App.jsx` with Basic Routing
Open your main `App.jsx` file and follow these steps:

- Import `BrowserRouter`, `Route`, and `Routes` from `react-router-dom`:

    ```jsx
    import { BrowserRouter, Route, Routes } from 'react-router-dom';
    ```

- Update the `App` component to set up the routing. The final code should look like this:

    ```jsx
    import About from "./components/About";
    import Footer from "./components/Footer";
    import Hero from "./components/Hero";
    import Navbar from "./components/Navbar";
    import Services from "./components/Services";
    import Tours from "./components/Tours";
    import Home from "./components/Home";
    import NotFound from "./components/NotFound";
    import "./App.css";
    import { BrowserRouter, Route, Routes } from "react-router-dom";

    function App() {
      return (
        <BrowserRouter>
          <Navbar />
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

> Refer to [this guide](./react-router.md#adding-navigation-with-react-router) for more details on adding navigation with React Router. For advanced routing, see Iteration 7 (Optional).

#### 4. Update `PageLinks` Component

> This step is not necessary!

Open the `PageLinks` component file and replace its code with the following:

```jsx
import { pageLinks } from '../data';
import PageLink from './PageLink';

const PageLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass} id='nav-links'>
      {pageLinks.map((link) => {
        return <PageLink key={link.id} link={link} itemClass={itemClass} />;
      })}
    </ul>
  );
};

export default PageLinks;
```

#### 5. Update `PageLink` Component
Open the `PageLink` component file and make the following changes:

- Import the `Link` component from `react-router-dom`:

    ```jsx
    import { Link } from "react-router-dom";
    ```

- Remove the `<li key={link.id}>` from the original code (the `key` is now handled in the `PageLinks` component).

The final code should look like this:

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

#### 6. Update `data.js`
Open the `data.js` file and replace lines 6-11 with the following:

```jsx
export const pageLinks = [
  { id: 1, href: "/", text: "home" },
  { id: 2, href: "/about", text: "about" },
  { id: 3, href: "/services", text: "services" },
  { id: 4, href: "/tours", text: "tours" },
];
```

#### 7. Commit Your Changes
Once all changes are made, commit them with a meaningful commit message describing what was done.

---
### Iteration 2:

Refactor the `Services` component to incorporate services data into the component's state. Remember to import `useState` at the beginning of the file: `{ useState } from 'react';` and import `services` from the data file.

```jsx
import { useState } from 'react';
import { services } from "../data";

function Services() {
  const [servicesData, setServicesData] = useState(services);

  // Rest of your component logic...

  return (
    // Your JSX structure...
  );
}

export default Services;
```

- **Commit Changes** with a meaningful message.

---
### Iteration 3:

Refactor the `Tours` component to include tours data as part of the component's state. Remember to import `useState` at the beginning of the file: `{ useState } from 'react';` and import `tours` from the data file.

```jsx
import { useState } from 'react';
import { tours } from "../data";

function Tours() {
  const [toursData, setToursData] = useState(tours);

  // Rest of your component logic...

  return (
    // Your JSX structure...
  );
}

export default Tours;
```

- **Commit Changes** with a meaningful message.

---
### Iteration 4:

- Enhance the `Services` component to allow visitors to hide services they are not interested in. Implement a button on each tour item for removal, similar to the [`demo` of Monday morning](./src/demo3/).
- Enhance the `Tours` component to allow visitors to hide tours they are not interested in. Implement a button on each tour item for removal, similar to the [`demo` of Monday morning](./src/demo3/).
- **Commit Changes** with a meaningful message.

---
### Iteration 5:

- Write a `Registration` component and update the `Navigation`or `Nav` component to include a link to the new registration form. The `Registration` component should consist of a form with a minimum of three fields (e.g., name, email, password).
- **Commit Changes** with a meaningful message.

---
### (Optional) Iteration 6

- Add a style sheet to enhance the visual presentation of the components. Customize the styles according to your design preferences for a more polished and appealing user interface.
- **Commit Changes** with a meaningful message.

---
### (Optional): Iteration 7 

1. Create a `Layout` component.
2. Utilize `<Outlet />` in the `Layout` component.
3. Refactor your main App component to use the `Layout` component for improved structure and organization as explained [here](./react-router.md#part-2-how-to-handle-nested-routes-in-react-building-a-structured-layout).
4. **Commit Changes** with a meaningful message.