# Frontend Pair Activity (Beginner-Friendly)

### Overview

In this paired activity, you will collaboratively implement a React application with routing and state management, transforming a single-page tour website into a multi-page application with interactive features.

---

## How you will work (paired, not strict pair programming)

Some students feel nervous about "strict" pair programming. That's totally ok. For this activity, you will work as **two problem-solvers**:

- You can both talk, think, and type.
- Your goal is to **try together first**, then reveal help only if you need it.
- Each iteration below has a hidden solution you can expand/collapse.

Example format you will see:

```html
<details>
<summary>Solution</summary>

...hidden help here...

</details>
```

### Help ladder (use in order)

When you get stuck:

1. Re-read the instruction and the code you're changing.
2. Ask your partner to explain their approach.
3. Try a tiny experiment (change one thing, test in browser).
4. Open the solution for that iteration.
5. Ask the teacher.

### Recommended rhythm

- After each iteration, the app should still run without errors.
- Test each feature in the browser before moving on.
- Commit after each iteration with a clear message.

### This is a 3-hour lab (suggested pacing)

- Step 0 (setup + verify starter works): 20 minutes
- Step 1 (basic routing): 45 minutes  
- Step 2 (Services state management): 30 minutes
- Step 3 (Services removal feature): 30 minutes
- Step 4 (Tours state management): 20 minutes
- Step 5 (Tours removal feature): 30 minutes
- Step 6 (Registration form): 45 minutes

If you're behind: keep going in order, but do the **minimum working version** for each micro-step before moving on.

### Required discussion checkpoints (helps nervous students)

After every micro-step below, pause for 60–90 seconds:

- Partner A explains: "What did we change and why?"
- Partner B points to the exact file and line area.
- Both test the feature in the browser **before** moving on.

If you can't explain it, don't move on yet.

### Commit messages (best-practice, beginner-friendly)

Use small commits that describe *what* changed.

Recommended format (Conventional Commits style):

- `feat(routing): add Home and NotFound components`
  - *feat* Short for feature. Used when you add a new feature or new functionality to the codebase.
- `refactor(components): convert Services to use useState`
  - *refactor* used when you change existing code without altering behavior. This improves structure, readability, or organization.
- `chore: install react-router-dom dependency`
  - *chore* used for maintenance tasks that don't change application behavior. Examples: updating dependencies, adding logging, renaming files, config changes.

Rule of thumb:

- One commit = one "idea" that you could explain quickly.
- If a commit breaks the app, it's too big.

---

## Instructions

### Step 0: Project Setup

**Goal:** Get a working local React app + GitHub repo so you can iterate safely.

**Setup checklist (do these once):**

1) Decide how you'll collaborate (shared keyboard or parallel build). Switch roles after each **major step**.

2) Clone the starter repo, then remove its git history so you can start a fresh repo:

```bash
git clone https://github.com/tx00-resources-en/week4-fe-pp-starter week4-fe-pp
cd week4-fe-pp
```

Windows PowerShell:
```powershell
Remove-Item -Recurse -Force .git
```

Git Bash / macOS / Linux:
```bash
rm -rf .git
```

3) Initialize a new Git repository:
```bash
git init
git add .
git commit -m "chore: initial project setup from starter template"
```

4) Install dependencies and run:
```bash
npm install
npm install react-router-dom
npm run dev
```

5) Create your new GitHub repo (example name: `week4-fe-pp`) and add your partner as collaborator.

6) Push to GitHub and ensure both partners can access the repo.

**Try it first:**

Before you add routing (Step 1), confirm you can run the project *as-is*.

- Start the development server
- Open http://localhost:5173 in your browser
- Verify you can see the tour website with all sections
- Only then start adding routing

**Browser test (do this now):**

- Navigate to `http://localhost:5173`
- Expect: A tour website with Header, Hero, About, Services, Tours, and Footer sections
- All on one page (no routing yet)

<details>
<summary>Full step solution (Step 0) — check after finishing</summary>

**Successful setup checklist:**
- ✅ React dev server runs without errors
- ✅ Browser shows the complete tour website
- ✅ Git repository is initialized with initial commit
- ✅ Both partners can access the code
- ✅ react-router-dom is installed (check package.json)

If any of these fail, fix them before Step 1.

</details>

-----
### Step 1: Basic Routing Implementation

**Goal:** Transform the single-page application into a multi-page application with React Router.

**Try it first:**

1) Create two new components: `Home.jsx` and `NotFound.jsx`
2) Update `App.jsx` to use React Router with routes for each section
3) Update `PageLink.jsx` to use React Router's `Link` component
4) Change the data.js navigation links from hash links to route paths
5) Test navigation between pages

#### Guided micro-steps (do one component at a time)

**Step 1A — Create the Home component**

- Create `src/components/Home.jsx` with a simple welcome message.

**Discuss:** What should the Home page show to welcome visitors?

**Browser test:** Not testable yet (no routing set up).

**Commit:** `feat(components): add Home component for root route`

<details>
<summary>Solution (Step 1A)</summary>

```jsx
// src/components/Home.jsx
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

</details>

**Step 1B — Create the NotFound component**

- Create `src/components/NotFound.jsx` for invalid routes.

**Discuss:** Why do we need a 404 page in a single-page application?

**Commit:** `feat(components): add NotFound component for invalid routes`

<details>
<summary>Solution (Step 1B)</summary>

```jsx
// src/components/NotFound.jsx
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

</details>

**Step 1C — Update App.jsx with React Router (import and setup only)**

- Import React Router components: `BrowserRouter`, `Routes`, `Route`
- Import your new components: `Home`, `NotFound`
- Wrap your existing JSX in `BrowserRouter`

**Discuss:** What does `BrowserRouter` do for our app?

**Browser test:** App should still work the same way (no routes defined yet).

**Commit:** `chore(app): import React Router components and wrap app`

<details>
<summary>Solution (Step 1C)</summary>

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
      {/* existing JSX here - don't change the content yet */}
      <Header />
      <Hero />
      <About />
      <Services />
      <Tours />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
```

</details>

**Step 1D — Replace content sections with Routes**

- Replace the middle content (`<About />`, `<Services />`, `<Tours />`) with a `Routes` component
- Add one route first: the home route (`path="/"`)

**Browser test:** 
- Navigate to `http://localhost:5173/` → should show Header, Hero, Home component, Footer
- Navigate to `http://localhost:5173/about` → should show "No routes matched"

**Commit:** `feat(routing): add Routes component with home route`

<details>
<summary>Solution (Step 1D)</summary>

```jsx
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

</details>

**Step 1E — Add remaining routes one by one**

Add these routes and test each one in the browser:

1. `path="/about"` → `<About />`
2. `path="/services"` → `<Services />`
3. `path="/tours"` → `<Tours />`
4. `path="*"` → `<NotFound />` (catch-all)

**Browser test after each route:**
- `http://localhost:5173/about` → About component
- `http://localhost:5173/services` → Services component  
- `http://localhost:5173/tours` → Tours component
- `http://localhost:5173/invalid` → NotFound component

**Commit:** `feat(routing): add all page routes with catch-all 404`

<details>
<summary>Solution (Step 1E)</summary>

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/services" element={<Services />} />
  <Route path="/tours" element={<Tours />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

</details>

**Step 1F — Update PageLink to use React Router Link**

- Open `src/components/PageLink.jsx`
- Import `Link` from `react-router-dom`
- Replace the `<a>` tag with `<Link>`
- Change `href` to `to`

**Discuss:** What's the difference between `<a href>` and `<Link to>`?

**Browser test:** Navigation should work, but links might still point to hash URLs.

**Commit:** `refactor(components): update PageLink to use React Router Link`

<details>
<summary>Solution (Step 1F)</summary>

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

</details>

**Step 1G — Fix data.js navigation links**

- Open `src/data.js`
- Find the `pageLinks` array
- Change hash links (`#home`, `#about`) to route paths (`/`, `/about`)

**Browser test:** All navigation should now work correctly between pages.

**Commit:** `refactor(data): update pageLinks from hash to route navigation`

<details>
<summary>Solution (Step 1G)</summary>

Find the `pageLinks` array and replace it:

```jsx
export const pageLinks = [
  { id: 1, href: "/", text: "home" },
  { id: 2, href: "/about", text: "about" },
  { id: 3, href: "/services", text: "services" },
  { id: 4, href: "/tours", text: "tours" },
];
```

</details>

**Step 1H — Final testing and verification**

Test every navigation link works:
- Home → About → Services → Tours → Home
- Test the NotFound page with a bad URL
- Verify the browser URL changes but the page doesn't refresh

**Commit:** `feat(routing): complete basic routing implementation`

<details>
<summary>Full step solution (Step 1) — check after finishing</summary>

**Successful Step 1 checklist:**
- ✅ All navigation links work correctly
- ✅ URL changes when clicking links (but no page refresh)
- ✅ Each page shows only its relevant content
- ✅ Invalid URLs show the 404 NotFound component
- ✅ Browser back/forward buttons work
- ✅ All commits have descriptive messages

If any of these fail, review the specific micro-step.

</details>

-----
### Step 2: Services State Management

**Goal:** Convert Services component from using external data to managing its own state with React hooks.

**Try it first:**

1) Import `useState` in the Services component
2) Create state for storing the services data
3) Initialize the state with the imported services array
4) Replace the direct data reference with the state variable
5) Verify the services still display correctly

#### Guided micro-steps (understand state before using it)

**Step 2A — Import useState and examine current Services component**

- Open `src/components/Services.jsx`
- Look at how it currently uses the `services` array
- Import `useState` from React

**Discuss:** What is component state? Why might we want the Services component to manage its own data?

**Browser test:** Services page should work the same as before.

**Commit:** `chore(components): import useState in Services component`

<details>
<summary>Solution (Step 2A)</summary>

```jsx
import { useState } from 'react';
import { services } from '../data';
// ... other existing imports
```

</details>

**Step 2B — Add state variable (but don't use it yet)**

- Add `useState` to create a state variable (e.g., `servicesData`)
- Initialize it with the imported `services` array
- Don't change the JSX yet

**Discuss:** What does `useState(services)` return? What are the two values in the array?

**Browser test:** Services should still work (we haven't changed the rendering yet).

**Commit:** `feat(components): add servicesData state to Services component`

<details>
<summary>Solution (Step 2B)</summary>

```jsx
function Services() {
  const [servicesData, setServicesData] = useState(services);

  return (
    <section className='section services' id='services'>
      <Title title='our' subTitle='services' />
      <div className='section-center services-center'>
        {services.map((service) => {  // Still using old 'services'
          return <Service {...service} key={service.id} />
        })}
      </div>
    </section>
  )
}
```

</details>

**Step 2C — Switch from imported data to state data**

- Replace `services` with `servicesData` in the map function
- The component should work exactly the same

**Browser test:** Navigate to /services and verify all services still display.

**Discuss:** What's the advantage of using state vs. directly importing data?

**Commit:** `refactor(components): use servicesData state instead of imported services`

<details>
<summary>Solution (Step 2C)</summary>

```jsx
function Services() {
  const [servicesData, setServicesData] = useState(services);

  return (
    <section className='section services' id='services'>
      <Title title='our' subTitle='services' />
      <div className='section-center services-center'>
        {servicesData.map((service) => {  // Now using state
          return <Service {...service} key={service.id} />
        })}
      </div>
    </section>
  )
}
```

</details>

**Step 2D — Verify and test thoroughly**

- Navigate to the Services page
- Check that all services display correctly
- Check React DevTools to see the component state (if available)

**Commit:** `test(components): verify Services component state management`

<details>
<summary>Full step solution (Step 2) — check after finishing</summary>

**Successful Step 2 checklist:**
- ✅ Services component imports and uses useState
- ✅ Services are stored in component state (servicesData)
- ✅ All services display correctly on the /services page
- ✅ Component behavior is identical to before (external observer can't tell the difference)
- ✅ Code is ready for Step 3 (adding removal functionality)

</details>

-----

### Step 3: Services Removal Feature

**Goal:** Add the ability for users to hide/remove services they're not interested in.

**Try it first:**

1) Add a "Remove" button to each service
2) Create a handler function that removes a service from state
3) Connect the button to the handler function
4) Test removing individual services

#### Guided micro-steps (one feature at a time)

**Step 3A — Examine the Service component structure**

- Open `src/components/Service.jsx` to understand how each service is rendered
- Identify where to add a remove button

**Discuss:** Where should the remove button appear in each service? What should it look like?

**Browser test:** Just looking at the existing structure.

<details>
<summary>Solution (Step 3A)</summary>

Look at the Service component structure. You'll need to add a button somewhere in the JSX, probably near the bottom of each service card.

</details>

**Step 3B — Create the remove function in Services component**

- In `Services.jsx`, create a function called `handleRemoveService`
- It should accept a service `id` parameter
- Use `setServicesData` to filter out the service with that id

**Discuss:** What does the filter method do? Why don't we modify the original array?

**Browser test:** Can't test yet (button doesn't exist).

**Commit:** `feat(components): add handleRemoveService function`

<details>
<summary>Solution (Step 3B)</summary>

```jsx
function Services() {
  const [servicesData, setServicesData] = useState(services);

  const handleRemoveService = (serviceId) => {
    setServicesData(servicesData.filter(service => service.id !== serviceId));
  };

  // ... rest of component
}
```

</details>

**Step 3C — Pass the remove function to Service components**

- Update the Service rendering to pass the `handleRemoveService` function as a prop
- Pass the service id as well

**Discuss:** Why do we need to pass the service id to the handler function?

**Browser test:** Still can't test (Service component doesn't use the prop yet).

**Commit:** `refactor(components): pass removeService handler to Service components`

<details>
<summary>Solution (Step 3C)</summary>

```jsx
{servicesData.map((service) => {
  return (
    <Service 
      {...service} 
      key={service.id}
      onRemove={handleRemoveService}
    />
  )
})}
```

</details>

**Step 3D — Add remove button to Service component**

- Open `src/components/Service.jsx`
- Add a remove button (or link) to each service
- Use the `onRemove` prop when the button is clicked
- Pass the service id to the handler

**Browser test:** Navigate to /services, click a remove button, verify the service disappears.

**Discuss:** What happens to the component state when you remove a service? Is it permanent?

**Commit:** `feat(components): add remove button to Service component`

<details>
<summary>Solution (Step 3D)</summary>

```jsx
const Service = ({ id, icon, title, text, onRemove }) => {
  return (
    <article className='service'>
      <span className={icon}></span>
      <div className='service-info'>
        <h4 className='service-title'>{title}</h4>
        <p className='service-text'>{text}</p>
      </div>
      <button 
        className='btn' 
        onClick={() => onRemove(id)}
        style={{ marginTop: '1rem' }}
      >
        Remove Service
      </button>
    </article>
  )
}
```

</details>

**Step 3E — Test the removal feature thoroughly**

- Remove several services one by one
- Navigate away and back to verify behavior
- Check if refreshing the page restores the services

**Browser test:** Complete interactive testing of the remove feature.

**Discuss:** Why do the services come back when you refresh? How could we make removals permanent?

**Commit:** `feat(components): complete Services removal functionality`

<details>
<summary>Full step solution (Step 3) — check after finishing</summary>

**Successful Step 3 checklist:**
- ✅ Each service has a visible remove button
- ✅ Clicking remove immediately hides that service
- ✅ Can remove multiple services
- ✅ Removing all services leaves an empty services section
- ✅ Page refresh restores all original services (expected behavior)
- ✅ No console errors when removing services

</details>

-----

### Step 4: Tours State Management

**Goal:** Apply the same state management pattern to the Tours component.

**Try it first:**

1) Follow the exact same pattern you used for Services
2) Import useState, create state, initialize with tours data
3) Update the component to use state instead of imported data
4) Test that tours still display correctly

#### Guided micro-steps (repeat the pattern)

**Step 4A — Import useState in Tours component**

- Open `src/components/Tours.jsx`
- Import `useState` from React
- Look at the current structure (similar to Services)

**Discuss:** Based on the Services component, what changes do you predict you'll need to make?

**Commit:** `chore(components): import useState in Tours component`

<details>
<summary>Solution (Step 4A)</summary>

```jsx
import { useState } from 'react';
import { tours } from "../data";
// ... other existing imports
```

</details>

**Step 4B — Add tours state**

- Create state for tours data (e.g., `toursData`)
- Initialize it with the imported `tours` array

**Commit:** `feat(components): add toursData state to Tours component`

<details>
<summary>Solution (Step 4B)</summary>

```jsx
function Tours() {
  const [toursData, setToursData] = useState(tours);

  // ... rest of component
}
```

</details>

**Step 4C — Switch to using state data**

- Replace `tours` with `toursData` in the map function

**Browser test:** Navigate to /tours and verify all tours display correctly.

**Commit:** `refactor(components): use toursData state instead of imported tours`

<details>
<summary>Solution (Step 4C)</summary>

```jsx
{toursData.map((tour) => {
  return <Tour {...tour} key={tour.id} />
})}
```

</details>

<details>
<summary>Full step solution (Step 4) — check after finishing</summary>

**Successful Step 4 checklist:**
- ✅ Tours component uses useState for managing tours data
- ✅ All tours display correctly on the /tours page
- ✅ Component behavior is identical to before
- ✅ Code is ready for Step 5 (adding removal functionality)

</details>

-----

### Step 5: Tours Removal Feature

**Goal:** Add removal functionality to Tours component, following the same pattern as Services.

**Try it first:**

1) Create a remove handler function in Tours component
2) Pass the handler to Tour components
3) Add a remove button to each Tour component
4) Test removing tours

#### Guided micro-steps (apply the learned pattern)

**Step 5A — Create remove function for tours**

- In `Tours.jsx`, create `handleRemoveTour` function
- Use the same pattern as Services (filter based on id)

**Commit:** `feat(components): add handleRemoveTour function`

<details>
<summary>Solution (Step 5A)</summary>

```jsx
const handleRemoveTour = (tourId) => {
  setToursData(toursData.filter(tour => tour.id !== tourId));
};
```

</details>

**Step 5B — Pass remove handler to Tour components**

- Update the Tour rendering to pass the remove handler
- Pass as `onRemove` prop

**Commit:** `refactor(components): pass removeTour handler to Tour components`

<details>
<summary>Solution (Step 5B)</summary>

```jsx
{toursData.map((tour) => {
  return (
    <Tour 
      {...tour} 
      key={tour.id}
      onRemove={handleRemoveTour}
    />
  )
})}
```

</details>

**Step 5C — Add remove button to Tour component**

- Open `src/components/Tour.jsx`
- Add a remove button that calls `onRemove` with the tour id

**Browser test:** Navigate to /tours, test removing tours.

**Commit:** `feat(components): add remove button to Tour component`

<details>
<summary>Solution (Step 5C)</summary>

Add a remove button to the Tour component, similar to how you did it in Service component:

```jsx
const Tour = ({ id, image, date, title, info, location, duration, cost, onRemove }) => {
  return (
    <article className='tour-card'>
      {/* ... existing tour content ... */}
      <button 
        className='btn' 
        onClick={() => onRemove(id)}
        style={{ marginTop: '1rem' }}
      >
        Remove Tour
      </button>
    </article>
  )
}
```

</details>

<details>
<summary>Full step solution (Step 5) — check after finishing</summary>

**Successful Step 5 checklist:**
- ✅ Each tour has a visible remove button
- ✅ Clicking remove immediately hides that tour
- ✅ Can remove multiple tours
- ✅ Removing all tours leaves an empty tours section
- ✅ Page refresh restores all original tours

</details>

-----

### Step 6: Registration Form Implementation

**Goal:** Create a new Registration component with form handling and add it to the routing system.

**Try it first:**

1) Create a Registration component with a form
2) Add at least 5 input fields
3) Add the component to your routing system
4) Add a navigation link to reach the registration page
5) Implement basic form state management

#### Guided micro-steps (build a complete feature)

**Step 6A — Create basic Registration component structure**

- Create `src/components/Registration.jsx`
- Start with a basic functional component and form structure

**Discuss:** What fields should a registration form have? Think about user experience.

**Commit:** `feat(components): create Registration component scaffold`

<details>
<summary>Solution (Step 6A)</summary>

```jsx
// src/components/Registration.jsx
function Registration() {
  return (
    <section className="section">
      <div className="section-center">
        <h2>Registration Form</h2>
        <form>
          {/* Form fields will go here */}
        </form>
      </div>
    </section>
  );
}

export default Registration;
```

</details>

**Step 6B — Add form fields (5+ required fields)**

- Add input fields for: name, email, password, confirm password, phone number
- Include appropriate input types and labels

**Browser test:** Not accessible yet (no route).

**Commit:** `feat(components): add form fields to Registration component`

<details>
<summary>Solution (Step 6B)</summary>

```jsx
function Registration() {
  return (
    <section className="section">
      <div className="section-center">
        <h2>Registration Form</h2>
        <form>
          <div>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
          
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
}
```

</details>

**Step 6C — Add Registration route**

- Import Registration component in `App.jsx`
- Add a new route for `/registration`

**Browser test:** Navigate to `http://localhost:5173/registration` manually.

**Commit:** `feat(routing): add registration route`

<details>
<summary>Solution (Step 6C)</summary>

In `App.jsx`:

```jsx
import Registration from "./components/Registration";

// ... in the Routes:
<Route path="/registration" element={<Registration />} />
```

</details>

**Step 6D — Add registration link to navigation**

- Open `src/data.js`
- Add registration to the `pageLinks` array

**Browser test:** Registration link should appear in navigation and work.

**Commit:** `feat(navigation): add registration link to navigation`

<details>
<summary>Solution (Step 6D)</summary>

In `data.js`, update the pageLinks array:

```jsx
export const pageLinks = [
  { id: 1, href: "/", text: "home" },
  { id: 2, href: "/about", text: "about" },
  { id: 3, href: "/services", text: "services" },
  { id: 4, href: "/tours", text: "tours" },
  { id: 5, href: "/registration", text: "registration" },
];
```

</details>

**Step 6E — Add form state management**

- Import `useState` in Registration component
- Create state for form data
- Add `onChange` handlers to inputs
- Add `onSubmit` handler to form

**Browser test:** Test typing in the form and submitting (should prevent default).

**Commit:** `feat(components): add form state management to Registration`

<details>
<summary>Solution (Step 6E)</summary>

```jsx
import { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });
  };

  return (
    <section className="section">
      <div className="section-center">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          {/* Repeat for other fields with value and onChange */}
          
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
}
```

</details>

**Step 6F — Final testing and polish**

- Test the complete registration flow
- Verify form data logs to console when submitted
- Check that form resets after submission
- Style the form (optional)

**Commit:** `feat(components): complete Registration form with state management`

<details>
<summary>Full step solution (Step 6) — check after finishing</summary>

**Successful Step 6 checklist:**
- ✅ Registration component has 5+ form fields
- ✅ Registration page is accessible via navigation link
- ✅ Form has proper labels and input types
- ✅ Form state is managed with React hooks
- ✅ Form submission logs data and resets form
- ✅ No console errors during form interaction

</details>

-----

### Final Verification

Test your complete application:

1. **Navigation**: All links work correctly
2. **Services**: Can remove individual services
3. **Tours**: Can remove individual tours  
4. **Registration**: Form works and resets properly
5. **404 handling**: Invalid URLs show NotFound component

**Final commit:** `feat: complete pair programming lab implementation`

---

## Summary

Congratulations! You've successfully:

- ✅ Implemented client-side routing with React Router
- ✅ Converted components to use React state management
- ✅ Added interactive features (removal functionality)
- ✅ Created a complete form with state handling
- ✅ Practiced collaborative development with meaningful commits

The application is now a fully functional multi-page React app with interactive features!