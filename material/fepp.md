# Front-End Pair Programming Activity

## Overview

This pair programming session will be a bit different from previous ones. Here’s what to expect:

1. You will work with members of your assigned group (not randomly).
2. Sample solutions for each iteration will be provided so you can compare your work.
3. The session may take longer than 3 hours, so if necessary, continue working on your own time on Tuesday. The benefits of completing all iterations are significant:
   - It will fully prepare you for the front-end portion of the exam.
   - It will prepare you for the third coding marathon.
   - It will help you finalize any missing touches in your project.

### Key Learning Outcomes:
- You will understand how the front-end connects to both protected and non-protected backend routes.
- You will gain a deep understanding of the video content provided before this activity.

### Activity Structure:
There are 4 parts. A functional backend and starter files for the frontend will be provided. You will focus only on the frontend, with no changes needed on the backend.

1. CRUD operations on jobs via non-protected routes.
2. User authentication (registering and logging in).
3. Accessing protected routes.
4. Comparing your code with the video’s source code.

> **Important:** Commit your work after each iteration and push to GitHub.

---

## Part 1: Basic CRUD Operations (Non-Protected Routes)

In this part, you will connect the React app to the Express server to perform CRUD operations on jobs via non-protected routes.

- **Backend to use:** `backend-no-auth`

### Iteration 1: Setup
1. Clone the starter files.
2. Clone the [starter repository](https://github.com/tx00-resources-en/week7-fepp-starter)
   - After cloning, **delete** the `.git` directory.
3. Navigate to the `backend-no-auth` directory. Rename the `.env` file, run `npm install`, and then `npm run dev`.
4. Navigate to the `frontend` directory. Run `npm install`, and then `npm run dev`.
5. In the `frontend/src` directory, there is a `hooks` folder. These hooks **will be used later** in the activity, **not in this part**.

### Iteration 2: Add and Fetch Jobs
- Implement logic to add jobs and fetch jobs from the backend. The UI is already provided.
- **Add Job Logic:** Add the logic to the `src/pages/AddJobPage.jsx`. Create a `submitForm` handler and an `addJob()` function to handle the POST request.
- **Fetch Jobs Logic:** Add logic in the `src/pages/HomePage.jsx` and `JobListings/JobListing` components.

> If you face any difficulties, check the [sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch1-get-post/frontend/src).

### Iteration 3: Fetch and Delete a Single Job
- Add logic to fetch and delete a single job. Create a new page (e.g., `pages/JobPage.jsx`) for displaying individual jobs.
- Add a route to `JobPage` in `App.jsx`:
  ```jsx
  <Route path="/jobs/:id" element={<JobPage />} />
  ```
- Update the `JobListings` component to link to this page:
  ```jsx
  <Link to={`/jobs/${job.id}`}>View Job</Link>
  ```

> If you encounter difficulties, refer to the [sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch2-getone-delete/frontend/src).

**Discussion Questions:**
- What is the difference between `<a href>` and `<Link />`?
- What is the difference between a page and a component?

### Iteration 4: Update a Job
- Implement logic to update a job. Create an `EditJobPage` component.
- Add a route for `EditJobPage` in `App.jsx`:
  ```jsx
  <Route path="/edit-job/:id" element={<EditJobPage />} />
  ```

> For help, see the [sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch3-update-router/frontend/src).

> In the sample solution, you'll notice that `App.jsx` in the React app uses `RouterProvider` and `createBrowserRouter` from React Router, instead of the more commonly used `BrowserRouter`.

---

## Part 2: User Authentication (Register & Log In)

This part focuses on user authentication (registering and logging in).

- **Backend to use:** `backend-auth`

### Iteration 1: Setup
1. Stop the `backend-no-auth` server and navigate to the `backend-auth` directory. Rename `.env`, run `npm install`, and `npm run dev`.

### Iteration 2: Register and Log In Users
- **Register:** The `Signup.jsx` page already contains functional code using `useField` and `useSignup` hooks.
- **Log In:** Create a `Login.jsx` page using `useField` and `useLogin` hooks. The `email` and `password` fields are required.
- Add routes for both pages in `App.jsx`:
  ```jsx
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  ```

> For reference, see the [sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch6-auth/frontend/src).

---

## Part 3: CRUD Operations (Protected Routes)

In this part, you will perform CRUD operations on jobs using `protected` routes.

> Note that unlike the [MERN Book API](https://github.com/tx00-resources-en/mern-books-v1), not all routes in this server are protected. Only the routes for `adding`, `deleting`, and `updating` jobs are secured. The routes for retrieving jobs (`GET /jobs` and `GET /job/:id`) are *not protected*.

- **Backend to use:** `backend-protected`

### Iteration 1: Setup
1. Stop the `backend-auth` server and navigate to the `backend-protected` directory. Rename `.env`, run `npm install`, and `npm run dev`.

### Iteration 2: Implement Protected Operations

- In `App.jsx`, create an `isAuthenticated` state to manage user authentication, and pass it down to the `NavBar` component. This will allow the display of different menus based on the user's authentication status.
- In `App.jsx`, pass the `setIsAuthenticated` state setter function as a prop to the `Login` and `Signup` components, as shown below:
  ```jsx
  <Signup setIsAuthenticated={setIsAuthenticated} />
  <Login setIsAuthenticated={setIsAuthenticated} />
  ```
- In `App.jsx`, ensure that *unauthenticated* users cannot access the `AddJobPage.jsx` and `EditJobPage.jsx` pages. Similarly, *authenticated* users should be prevented from accessing the `Login` and `Signup` pages.
- Ensure that job updates and deletions are restricted to authenticated users, particularly in the `AddJobPage.jsx` and `EditJobPage.jsx` components.

> Refer to the [sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch7-protect-jobs/frontend/src) if needed.

---

## Part 4: Comparing Code with the Video Tutorial

In this section, we will compare our project code with the [sample code](https://github.com/bradtraversy/react-crash-2024) provided in the [video tutorial](https://youtu.be/LDB4uaJ87e0). 

There are a few key differences between the two implementations. Below is a brief overview, followed by a detailed explanation:

- In the tutorial, the handlers are located in `App.jsx` and passed as props to various components.
- It uses `RouterProvider` and `createBrowserRouter` from React Router, instead of the more commonly used `BrowserRouter`.
- Loaders are utilized in React Router for data fetching.
- The video incorporates TailwindCSS and additional UI features, such as spinners, for enhanced design.

Additionally, there is a modified version of the code in the `video-related/1-simplified/frontend/src` folder and the original version in the `video-related/2-original` folder within the cloned repository.



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
