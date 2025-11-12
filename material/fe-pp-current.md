<!-- 
# Pair Programming: Front end

> Throughout the activity, you will switch roles: the driver (who writes code) becomes the navigator (who reviews and guides), and vice versa. Remember to switch roles after each major step, to ensure both participants contribute to coding and reviewing.


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

> - Refer to [this guide](./react-router.md#adding-navigation-with-react-router) for more details on adding navigation with React Router.  
> - For advanced routing, see Iteration 7 (Optional).



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
Open the `data.js` file and replace lines 6-11 with the following:

```jsx
export const pageLinks = [
  { id: 1, href: "/", text: "home" },
  { id: 2, href: "/about", text: "about" },
  { id: 3, href: "/services", text: "services" },
  { id: 4, href: "/tours", text: "tours" },
];
```

#### 6. Commit Your Changes
Once all changes are made, commit them with a meaningful commit message describing what was done.


---
### Iteration 2:

- Refactor the `Services` component so the tours array is stored in component state (using `useState`). At the top of the file import useState from React — for example: `import { useState } from 'react';`
- Also keep any other existing imports. Use the state variable (e.g.,`servicesData`) instead of the external tours array, and update it with the setter (e.g., `setServicesData`) when removing or restoring tours.

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

- **Commit Changes** with a meaningful message.

---
### Iteration 3:

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

- **Commit Changes** with a meaningful message.

---
### Iteration 4:

- Enhance the `Services` component to allow visitors to hide services they are not interested in. Implement a button on each tour item for removal, similar to this [`demo`](./src/demo3/).
- Enhance the `Tours` component to allow visitors to hide tours they are not interested in. Implement a button on each tour item for removal, similar to this [`demo`](./src/demo3/).
- **Commit Changes** with a meaningful message.

---
### Iteration 5:

- Write a `Registration` component and update the `Navigation`or `Nav` component to include a link to the new registration form. The `Registration` component should consist of a form with a minimum of five fields (e.g., name, email, password, etc.).
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

-->



<!-- 
#### 4. `PageLinks` Component

> This step is not needed!

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

-->


<!-- 
---
### Iteration 1.5: Data Enhancement (Documentation)

The project includes enhanced tour and service data with additional properties to provide a richer user experience. This iteration documents these enhancements.

#### Enhanced Data Structure

**Tours - New Properties**

Two additional properties have been added to each tour object:

- **difficulty**: Indicates the physical difficulty level of the tour
  - Type: `string`
  - Possible values: `"easy"`, `"moderate"`, `"hard"`
  - Purpose: Display a badge on tour cards to help visitors choose appropriate tours

- **rating**: Star rating for the tour on a 1-5 scale
  - Type: `number`
  - Example values: `4.8`, `4.5`, `4.9`
  - Purpose: Display tour quality ratings to help visitors make informed decisions

**Updated Tour Object Structure**:
```javascript
{
  id: number,
  image: string,
  date: string,
  title: string,
  info: string,
  location: string,
  duration: number,
  cost: number,
  difficulty: string,    // NEW - "easy", "moderate", or "hard"
  rating: number,        // NEW - 1-5 star rating
}
```

**Services - New Property**

One additional property has been added to each service object:

- **details**: Extended description providing more context about the service
  - Type: `string`
  - Purpose: Display additional information about the service benefit to visitors
  - Displayed conditionally if the property exists

**Updated Service Object Structure**:
```javascript
{
  id: number,
  icon: string,
  title: string,
  text: string,
  details: string,       // NEW - Extended description
}
```

#### Data Expansion

The data sets have been expanded to showcase more options:

- **Services**: Expanded from 3 to 5 items
  - Original: "saving money", "endless hiking", "amazing comfort"
  - Added: "easy travel", "local cuisine"
  
- **Tours**: Expanded from 4 to 7 items
  - Original: Tibet Adventure, Best of Java, Explore Hong Kong, Kenya Highlights
  - Added: Peru Discovery, Greek Islands Escape, Iceland Expedition

#### How These Properties Are Used

**In Tour.jsx**:
- The `difficulty` property is displayed as a badge in the top-left corner of the tour image
- The `rating` property is displayed next to the tour title with a star emoji (⭐)

**In Service.jsx**:
- The `details` property is conditionally rendered below the main service text
- Only displays if the `details` property exists

#### Example: Updated Components

**Tour Component**:
```jsx
function Tour({ image, date, title, info, location, duration, cost, difficulty, rating }) {
  return (
    <article className="tour-card">
      <div className="tour-img-container">
        <img src={image} className="tour-img" alt={title} />
        <p className="tour-date">{date}</p>
        <p className="tour-difficulty">{difficulty}</p>  {/* NEW */}
      </div>
      <div className="tour-info">
        <div className="tour-title">
          <h4>{title}</h4>
          <p className="tour-rating">⭐ {rating}</p>  {/* NEW */}
        </div>
        {/* ... rest of component ... */}
      </div>
    </article>
  );
}
```

**Service Component**:
```jsx
const Service = ({ icon, title, text, details }) => {
  return (
    <article className='service'>
      <span className='service-icon'>
        <i className={icon}></i>
      </span>
      <div className='service-info'>
        <h4 className='service-title'>{title}</h4>
        <p className='service-text'>{text}</p>
        {details && <p className='service-details'>{details}</p>}  {/* NEW */}
      </div>
    </article>
  )
}
```

#### No Action Required

This iteration documents existing enhancements. The components (`Tour.jsx` and `Service.jsx`) have already been updated to handle these new properties. Students should familiarize themselves with these enhancements before proceeding to Iteration 2. 

-->