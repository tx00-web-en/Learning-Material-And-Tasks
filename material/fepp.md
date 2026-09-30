# Front-End Pair Programming Activity

## Overview

This pair programming session will be a bit different from previous ones and is designed as a **full review of the front-end concepts** used in the course.

1. First **try each iteration on your own with your pair**, and **only then** open the sample solution to compare.
2. Likely need more than 3 hours. If necessary, continue working on your own time on Tuesday.

Completing all iterations will:

- Fully prepare you for the front-end portion of the exam.
- Prepare you for the third coding marathon.
- Help you finalize any missing touches in your project.

**Pair-programming workflow (Driver/Navigator):**

- One person types (Driver), the other reviews and thinks ahead (Navigator).
- Swap roles after each iteration.
- Before checking the sample solution, explain your approach to your pair and **predict** what might be different in the sample.

### Key Learning Outcomes

- Understand how the front-end connects to both protected and non-protected backend routes.
- Deepen your understanding of the video content provided before this activity.
- Practice structuring React apps with routing, forms, and authentication.

### Activity Structure

There are 4 main parts plus a comparison section. A functional backend and starter files for the frontend will be provided. You will focus only on the frontend; normally **no backend changes are needed** except in Part 4.

1. CRUD operations on jobs via non-protected routes.
2. User authentication (registering and logging in).
3. CRUD operations on protected routes.
4. Modifying the user model.
5. Comparing your code with the video’s source code.

> **Important:** Commit your work after each iteration and push to GitHub.

---

## Part 1: Basic CRUD Operations (Non-Protected Routes)

In this part, you will connect the React app to the Express server to perform CRUD operations on jobs via **non-protected** routes.

- **Backend to use:** `backend-no-auth`

**API overview for this part (expected):**

- `GET /api/jobs` – get all jobs.
- `POST /api/jobs` – add a job.
- `GET /api/jobs/:id` – get a single job.
- `DELETE /api/jobs/:id` – delete a job.
- `PUT /api/jobs/:id` – update a job.

### Iteration 1: Setup

1. Clone the [starter repository](https://github.com/tx00-resources-en/week7-fepp-starter) into a separate folder.
   - After cloning, **delete** the `.git` directory in the starter so you can use your own Git history.
2. Navigate to the `backend-no-auth` directory.
   - Create a new `.env` file by copying `.env.example`
   - Run `npm install`.
   - Start the backend: `npm run dev`.
3. Navigate to the `frontend` directory.
   - Run `npm install`.
   - Start the frontend: `npm run dev`.
4. In `frontend/src`, there is a `hooks` folder. These hooks **will be used later** in the activity, **not in this part**.

**You’re done with Iteration 1 when:**

- The backend runs (e.g. on `http://localhost:4000`).
- The frontend runs (e.g. on `http://localhost:3000`).
- You can open the frontend in the browser without errors.

### Iteration 2: Add and Fetch Jobs (List View)

Goal: Implement logic to **add jobs** and **fetch all jobs** from the backend. The UI structure is already provided.

- **State and data flow (suggested):**
  - Use `useState` in `HomePage.jsx` (or a parent component) to store an array of jobs.
  - Use `useEffect` in `HomePage.jsx` to fetch jobs from `GET /api/jobs` when the page loads.
- **Fetch Jobs Logic:**
  - Add the logic in `src/pages/HomePage.jsx` and the `JobListings/JobListing` components to display the jobs.
- **Add Job Logic:**
  - In `src/pages/AddJobPage.jsx`, create a `submitForm` handler and an `addJob()` function.
  - `addJob()` should send a `POST` request to `/api/jobs` with the job data from the form.
  - Use **controlled inputs** (form values stored in React state).
  - After a successful POST, either:
    - Navigate back to the home or jobs list page, **or**
    - Clear the form and update the jobs list.

> **Sample solution (after trying yourself):** [Part 1 – GET + POST](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch1-get-post/frontend/src)

**Compare your solution with the sample:**

- Where is the job list state stored?
- When and where do you call `fetch`?
- How do you handle loading or error states (if at all)?

**You’re done with Iteration 2 when:**

- You can add a job from the UI.
- The new job appears in the list **without manually refreshing the browser**.

### Iteration 3: Fetch and Delete a Single Job (Detail View)

Goal: Implement logic to **fetch and display a single job**, and to **delete** it.

- Create a new page (e.g., `src/pages/JobPage.jsx`) to display an individual job.
- Add a route to `JobPage` in `App.jsx`:
  ```jsx
  <Route path="/jobs/:id" element={<JobPage />} />
  ```
- Update the `JobListings` component to link to this page:
  ```jsx
  <Link to={`/jobs/${job.id}`}>View Job</Link>
  ```

- **Fetch single job:**
  - In `JobPage`, use `useParams` to get the `id` from the URL.
  - Use `useEffect` and `useState` (or a loader later) to fetch `GET /api/jobs/:id`.
- **Delete single job:**
  - Add a "Delete" button.
  - On click, call `DELETE /api/jobs/:id`.
  - After successful deletion, navigate back to the job list.

> **Sample solution (after trying yourself):** [Part 1 – GET one + DELETE](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch2-getone-delete/frontend/src)

**You’re done with Iteration 3 when:**

- You can click a job, open its detail page, and see all its information.
- You can delete a job from the detail page, and it disappears from the list.

**Discussion Questions (with your pair):**

- What is the difference between `<a href>` and `<Link />` in React Router?
- What is the difference between a **page** and a **component** in your app?
- Where does the data for the current job live? Is that the best place?

### Iteration 4: Update a Job (Edit View)

Goal: Implement logic to **update a job**.

- Create an `EditJobPage` component.
- Add a route for `EditJobPage` in `App.jsx`:
  ```jsx
  <Route path="/edit-job/:id" element={<EditJobPage />} />
  ```

- In `EditJobPage`:
  - Fetch the existing job data (similar to `JobPage`).
  - Pre-fill the form with the existing values.
  - Use controlled inputs.
  - On submit, send a `PUT` request to `/api/jobs/:id`.
  - After success, navigate to the job detail page or the jobs list.

> **Sample solution (after trying yourself):** [Part 1 – UPDATE + Router](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch3-update-router/frontend/src).

> In the sample solution, you'll notice that `App.jsx` in the React app uses `RouterProvider` and `createBrowserRouter` from React Router, instead of the more commonly used `BrowserRouter`.

**You’re done with Iteration 4 when:**

- You can edit an existing job.
- The updated job data is visible in both the detail page and the list.

---

## Part 2: User Authentication (Register & Log In)

This part focuses on user authentication (registering and logging in).

- **Backend to use:** `backend-auth`

### Iteration 1: Setup

1. Stop the `backend-no-auth` server.
2. Navigate to the `backend-auth` directory.
   - Create a new `.env` file by copying .env.example
   - Run `npm install`.
   - Start the backend: `npm run dev`.

### Iteration 2: Register and Log In Users

Goal: Implement user signup and login on the frontend.

- **Register:**
  - The `Signup.jsx` page already contains functional code using `useField` and `useSignup` hooks.
  - Study how `useField` and `useSignup` are used, and how errors or success are handled.
- **Log In:**
  - Create a `Login.jsx` page using `useField` and `useLogin` hooks.
  - The `email` and `password` fields are required.
  - On successful login, **decide what should happen**, for example:
    - Save auth info (e.g. token or user) via a hook/context (if provided).
    - Redirect the user to `/jobs` or `/`.
    - Update the navigation bar to show a "logged in" state (in later parts).
- Add routes for both pages in `App.jsx`:
  ```jsx
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  ```

> **Sample solution (after trying yourself):** [Part 2 – Auth](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch6-auth/frontend/src).

**You’re done with Part 2 when:**

- You can sign up a new user (no errors in the console).
- You can log in with that user.
- After logging in, there is some visible change (e.g. redirect, different nav, or message) that clearly indicates the user is logged in.

**Discussion:**

- Where is the token or auth info stored? Is it secure?
<!-- - What user feedback do you show if login fails? -->

---

## Part 3: CRUD Operations (Protected Routes)

In this part, you will perform CRUD operations on jobs using `protected` routes.

> Note that unlike the [MERN Book API](https://github.com/tx00-resources-en/mern-books-v1), not all routes in this server are protected. Only the routes for `adding`, `deleting`, and `updating` jobs are secured. The routes for retrieving jobs (`GET /jobs` and `GET /job/:id`) are *not protected*.

- **Backend to use:** `backend-protected`

### Iteration 1: Setup

1. Stop the `backend-auth` server.
2. Navigate to the `backend-protected` directory.
   - Create a new `.env` file by copying .env.example
   - Run `npm install`.
   - Start the backend: `npm run dev`.

> **Important:** In this backend, only **add**, **delete**, and **update** job routes are protected. `GET /jobs` and `GET /jobs/:id` remain **unprotected**.

### Iteration 2: Implement Protected Operations

Goal: Ensure that only **authenticated** users can add, edit, or delete jobs, both in the **frontend UI** and in the **backend calls**.

- In `App.jsx`, create an `isAuthenticated` state to manage user authentication, and pass it down to the `NavBar` component. This will allow the display of different menus based on the user's authentication status.
- In `App.jsx`, pass the `setIsAuthenticated` state setter function as a prop to the `Login` and `Signup` components, as shown below:
  ```jsx
  <Signup setIsAuthenticated={setIsAuthenticated} />
  <Login setIsAuthenticated={setIsAuthenticated} />
  ```
- In `App.jsx`, ensure that **unauthenticated** users **cannot access** the `AddJobPage.jsx` and `EditJobPage.jsx` pages. For example:
  - If `!isAuthenticated`, redirect from `/add-job` and `/edit-job/:id` to `/login`.
  - Hide the "Add Job" and "Edit/Delete" buttons in the UI when the user is not authenticated.
- Ensure that job updates and deletions are restricted to authenticated users, particularly in the `AddJobPage.jsx` and `EditJobPage.jsx` components.
  - Include the required auth headers/token in the requests if the backend expects them.
  - Handle "unauthorized" responses gracefully in the UI.

> **Sample solution (after trying yourself):** [Part 3 – Protected jobs](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch7-protect-jobs/frontend/src).

**You’re done with Part 3 when:**

- Unauthenticated users cannot add/edit/delete jobs (both because the UI hides these options and because the backend rejects unauthorized requests).
- Authenticated users can add/edit/delete jobs, and the UI updates correctly.

**Discussion:**

- What is the difference between **hiding a button in the UI** and **protecting a route on the backend**?
- Why do we need **both** in a real application?

> Refer to the [sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch7-protect-jobs/frontend/src) if needed.


---

## Part 4: Modify the User Model

1. **Backend Update**  
   Extend the user schema in the backend to include additional fields for contact and address information:

   ```js
   const userSchema = new Schema(
     {
       name: { type: String, required: true },            // Full name
       email: { type: String, required: true, unique: true }, // Unique email for login
       password: { type: String, required: true },        // Hashed password
       phone_number: { type: String, required: true },    // Contact number
       gender: { type: String, required: true },          // Gender
       address: {
         street: { type: String, required: true },        // Street address
         city: { type: String, required: true },          // City
         zipCode: { type: String, required: true }        // Postal/ZIP code
       }
     },
     { timestamps: true, versionKey: false }
   );
   ```

2. **Frontend Update**  

  Update the frontend so that the new user fields are properly handled.

  - Extend the `Signup` (and any profile-related) form(s) to include:
    - `phone_number`
    - `gender`
    - `address.street`, `address.city`, `address.zipCode`
  - Make sure all required fields are validated on the client side (e.g. not empty, basic formatting where reasonable).
  - After a successful registration, verify that the new fields are stored correctly.
  - Optionally display some of this information in a "Profile" or "User Info" area.

**You’re done with Part 4 when:**

- You can register a new user with all the new fields filled.
- You can confirm (e.g. via MongoDB / API response) that all fields are saved.

---

## Part 5: Comparing Code with the Video Tutorial

In this section, we will compare our project code with the [sample code](https://github.com/bradtraversy/react-crash-2024) provided in the [video tutorial](https://youtu.be/LDB4uaJ87e0). 

There are a few key differences between the two implementations. Below is a brief overview, followed by a detailed explanation:

- In the tutorial, many handlers (add, delete, update jobs) are located in `App.jsx` and passed as props to various components.
- It uses `RouterProvider` and `createBrowserRouter` from React Router, instead of the more commonly used `BrowserRouter`.
- Loaders are utilized in React Router for data fetching instead of `useEffect` in many places.
- The video incorporates TailwindCSS and additional UI features, such as spinners, for enhanced design.

Additionally, there is a modified version of the code in the `video-related/1-simplified/frontend/src` folder and the original version in the `video-related/2-original` folder within the cloned repository.

### Small Experiments (Recommended)

Pick **two** of the following and try them in your own project (or in a copy of it):

- Move one handler (e.g. `addJob`) into `App.jsx` and pass it down as a prop instead of defining it in the page.
- Replace `BrowserRouter` with `RouterProvider` + `createBrowserRouter` (following the video’s structure).
- Implement one simple loader (e.g. for the job list or single job) and use `useLoaderData()` instead of `useEffect`.

After each experiment, discuss with your pair:

- What changed in how you think about routing and data fetching?
- Do you prefer the original structure or the video’s approach for this specific part? Why?



---
### Detailed Explanations:

### 1. `vite.config.js`

In the video, the proxy configuration in `vite.config.js` is slightly different from our setup. The tutorial uses the `rewrite` function to remove `/api` from the API path, as the fake server runs at `http://localhost:4000/jobs`. In our case, the API runs at `http://localhost:4000/api/jobs`, so we don’t need to modify the path.

Here’s the modified proxy setup:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
```

### 2. Virtual Fields

In MongoDB, the default field for IDs is `_id`. To align with the fake server in the video, we created a virtual field `id` to match both the fake server and the actual API server without needing modifications. Here’s how we set it up in the Mongoose schema:

```js
// Ensure virtual fields are serialized
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});
```

### 3. React Router: Flexibility with `RouterProvider`

In the video, React Router is used in a more flexible manner with `RouterProvider` and `createBrowserRouter`, allowing for advanced routing options. Our code uses the simpler `BrowserRouter`. Here's an example of the advanced routing setup from `App.jsx` (in `video-related/1-simplified/frontend/src`):

```js
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
```

### 4. Loaders in React Router

Instead of using `useEffect` for fetching data, the video tutorial utilizes loaders in React Router to pre-fetch data before rendering components. This can simplify data handling in some cases.

Here’s a link to learn more about [Loaders in React Router](https://dev.to/shaancodes/a-brief-intro-about-loaders-in-react-router-54d).

### 5. Handlers in `App.jsx`

In the video, the handlers for adding, deleting, and updating jobs are written directly in `App.jsx` and passed down to child components as props. This structure provides a central location for managing all job-related actions.

Here’s how the handlers are set up:

```js
// Add New Job
const addJob = async (newJob) => {
  await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newJob),
  });
};

// Delete Job
const deleteJob = async (id) => {
  await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
  });
};

// Update Job
const updateJob = async (job) => {
  await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
};
```

These handlers are passed as props to components like `AddJobPage` and `EditJobPage`.

### 6. JobPage Component: Using Loaders Instead of `useEffect`

In the `JobPage` component, the video tutorial uses `useLoaderData()` to fetch job data, rather than relying on `useEffect`. The data fetching logic is located in the `jobLoader` function, as shown here:

```js
const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
```

By using loaders, the data is fetched before rendering the component, which can improve performance and make the code more declarative. Here's the complete code:


```js
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useLoaderData();

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?'
    );

    if (!confirm) return;

    deleteJob(jobId);

    toast.success('Job deleted successfully');

    navigate('/jobs');
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/jobs'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <FaMapMarker className='text-orange-700 mr-1' />
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Job Description
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                  Salary
                </h3>

                <p className='mb-4'>{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                <h2 className='text-2xl'>{job.company.name}</h2>

                <p className='my-2'>{job.company.description}</p>

                <hr className='my-4' />

                <h3 className='text-xl'>Contact Email:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.contactEmail}
                </p>

                <h3 className='text-xl'>Contact Phone:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {' '}
                  {job.company.contactPhone}
                </p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
```


---

## Next Steps

- The data model for CM3

```js
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Full-time, Part-time, Contract
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    website: { type: String }, // Optional: Company's website URL
    size: { type: Number }, // Number of employees
  },
  location: { type: String, required: true }, // e.g., City, State, or Remote
  salary: { type: Number, required: true }, // e.g., Annual or hourly salary
  experienceLevel: { type: String, enum: ['Entry', 'Mid', 'Senior'], default: 'Entry' }, // Experience level
  postedDate: { type: Date, default: Date.now }, // Date the job was posted
  status: { type: String, enum: ['open', 'closed'], default: 'open' }, // Job status (open/closed)
  applicationDeadline: { type: Date }, // Deadline for job applications  
  requirements: [String], // List of required skills or qualifications
});

module.exports = mongoose.model('Job', jobSchema);
```
