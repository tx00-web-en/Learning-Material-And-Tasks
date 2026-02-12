# Full CRUD Operations with React

In this guide, we’ll explore how to build a job management application using React to perform **Create**, **Read**, **Update**, and **Delete** (CRUD) operations. By the end, you’ll understand how to structure a React application, manage state with `useState`, fetch and interact with data using `useEffect`, and handle user interactions with event-based methods.

---

## **1. The Backend Job Model**

The backend serves as the foundation for our application. Using **Mongoose**, the following schema defines a `job` document.

```javascript
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
  },
  salary: { type: Number, required: true },
});
```

Each job has:
- A `title` and `description` (strings).
- A nested `company` object with a `name` and `contactEmail`.
- A `salary` (a numeric field).


**Why Do We Need CORS in the Backend?**

React applications run on a different server during development (e.g., `localhost:3000`) than the API (e.g., `localhost:4000`). This introduces the **same-origin policy**, which blocks requests from different origins for security.

To fix this, install **CORS (Cross-Origin Resource Sharing)** in the backend, allowing the React frontend to communicate with the API.

```bash
npm install cors
```

### **Setup Example**
```javascript
const cors = require('cors');
app.use(cors());
```

---

## **2. Frontend: Using React to Build the CRUD Application**

The frontend application is built with **React**. We use `useState` to manage form field states and `useEffect` to fetch data from the API. Let’s break down each operation.

---

### **A. Adding Jobs (Create Operation)**

---

To create a new job, we build a form. Each field in the form uses `useState` to keep track of its value.

#### **React Form with `useState`**
```javascript
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [companyName, setCompanyName] = useState("");
const [contactEmail, setContactEmail] = useState("");
const [salary, setSalary] = useState("");

const handleTitleChange = (e) => setTitle(e.target.value);
const handleDescriptionChange = (e) => setDescription(e.target.value);
const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
const handleContactEmailChange = (e) => setContactEmail(e.target.value);
const handleSalaryChange = (e) => setSalary(Number(e.target.value));
```

#### **Form Component**
```javascript
<form onSubmit={submitForm}>
  <input
    type="text"
    placeholder="Job Title"
    value={title}
    onChange={handleTitleChange}
    required
  />
  <textarea
    placeholder="Job Description"
    value={description}
    onChange={handleDescriptionChange}
    required
  ></textarea>
  <input
    type="text"
    placeholder="Company Name"
    value={companyName}
    onChange={handleCompanyNameChange}
    required
  />
  <input
    type="email"
    placeholder="Contact Email"
    value={contactEmail}
    onChange={handleContactEmailChange}
    required
  />
  <input
    type="number"
    placeholder="Salary"
    value={salary}
    onChange={handleSalaryChange}
    required
  />
  <button type="submit">Add Job</button>
</form>
```

#### **Adding Job Logic**
When the form is submitted, the `submitForm` function collects the data and sends it to the backend.

```javascript
const submitForm = (e) => {
  e.preventDefault();
  if (!title || !description || !companyName || !contactEmail || !salary) {
    console.log("Please fill in all fields");
    return;
  }

  const newJob = {
    title,
    description,
    company: { 
        name: companyName, 
        contactEmail 
    },
    salary,
  };

  addJob(newJob);
};

const addJob = async (newJob) => {
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    if (res.ok) {
      console.log("Job added successfully!");
      navigate("/");
    } else {
      console.error("Failed to add job");
    }
  } catch (error) {
    console.error("Error adding job:", error);
  }
};
```

---

### **B. Reading Jobs (Read Operation)**

---

In React, displaying a list of jobs involves fetching the data from a backend API and then rendering it dynamically. This process primarily utilizes two hooks:

- **`useState`**: To store the fetched jobs.
- **`useEffect`**: To perform the side effect of fetching jobs when the component loads.

Here’s a detailed breakdown of the code:


#### **1. Using `useState` to Store Jobs**

```javascript
const [jobs, setJobs] = useState([]);
```

- **Purpose**: The `jobs` state is initialized as an empty array. This state will hold the list of jobs fetched from the backend.
- **State Update**: The `setJobs` function updates this state once the job data is retrieved.



#### **2. Fetching Jobs with `useEffect`**

```javascript
useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data); // Update state with fetched jobs
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };
  fetchJobs();
}, []);
```

#### **Key Points:**

1. **Side Effect Execution**: 
   - `useEffect` is called after the component renders.
   - The empty dependency array `[]` ensures the fetch operation runs only once when the component is mounted.

2. **Async Function for Fetching**:
   - The `fetchJobs` function makes a GET request to the `/api/jobs` endpoint.
   - On success, the JSON response is parsed, and the state is updated using `setJobs`.

3. **Error Handling**:
   - If the fetch request fails (e.g., server is down or endpoint is unreachable), the `catch` block logs the error to the console.


#### **3. Rendering the Jobs**

```javascript
return (
  <div>
    {jobs.map((job) => (
      <div key={job.id}>
        <h2>{job.title}</h2>
        <p>Type: {job.type}</p>
        <p>Description: {job.description}</p>
        <p>Company: {job.company.name}</p>
        <Link to={`/jobs/${job.id}`}>
          <button>View Job</button>
        </Link>
      </div>
    ))}
  </div>
);
```

**Key Points:**

1. **Dynamic Rendering with `map`**:
   - The `map` function iterates over the `jobs` array, rendering a `div` for each job.
   - Each `div` displays details about a job: title, type, description, and company name.

2. **Unique Key Prop**:
   - React requires each child in a list to have a unique `key` prop for efficient re-rendering. The job’s unique `id` is used here.

3. **Navigating to Job Details**:
   - Each job includes a **View Job** button wrapped in a `Link` component from `react-router-dom`.
   - Clicking this button navigates to the detailed view of the specific job (`/jobs/:id`).


#### **4. Enhancing the Code**

**Loading State**

Before the jobs are fetched, it’s good to show a loading spinner or a message:

```javascript
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false); // Stop loading after fetch completes
    }
  };
  fetchJobs();
}, []);

if (loading) {
  return <p>Loading jobs...</p>;
}
```

**No Jobs Found**

If the `jobs` array is empty, display a message:

```javascript
return (
  <div>
    {jobs.length === 0 ? (
      <p>No jobs found</p>
    ) : (
      jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <Link to={`/jobs/${job.id}`}>
            <button>View Job</button>
          </Link>
        </div>
      ))
    )}
  </div>
);
```

#### **5. Complete Flow**

1. **Data Flow**:
   - Component mounts → `useEffect` runs → Data fetched → State updated → Component re-renders with jobs.
2. **Error Handling**:
   - Logs errors in case of network or server issues.
   - Displays user-friendly messages when data is missing.
3. **Dynamic Rendering**:
   - Uses `map` to efficiently render a dynamic number of job entries.
4. **Navigation**:
   - Integrates with React Router for seamless transitions to job detail pages.



---

### **C. Updating Jobs**

---

Similar to creating a job, updating a job involves rendering a form where users can edit the existing values of a job. Updating involves:
1. Fetching the job's existing data using `useEffect`.
2. Editing fields using `useState`.
3. Sending the updated data via `PUT`.


#### **Step 1: Fetch Existing Job Data**

Before displaying the form, we need to fetch the job's existing data using its `id`. This is done with the `useEffect` hook:

```javascript
const { id } = useParams();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [companyName, setCompanyName] = useState("");
const [contactEmail, setContactEmail] = useState("");
const [salary, setSalary] = useState(0);

useEffect(() => {
  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch job");
      }
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setCompanyName(data.company.name);
      setContactEmail(data.company.contactEmail);
      setSalary(data.salary);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };
  fetchJob();
}, [id]);
```

#### **Step 2: Handle Updates with `useState`**

Each form field uses `useState` to track its value, allowing the user to modify the job details.

```javascript
const handleTitleChange = (e) => setTitle(e.target.value);
const handleDescriptionChange = (e) => setDescription(e.target.value);
const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
const handleContactEmailChange = (e) => setContactEmail(e.target.value);
const handleSalaryChange = (e) => setSalary(Number(e.target.value));
```

#### **Step 3: Render the Form**

The form allows users to edit the job fields.

```javascript
<form onSubmit={submitForm}>
  <input
    type="text"
    placeholder="Job Title"
    value={title}
    onChange={handleTitleChange}
    required
  />
  <textarea
    placeholder="Job Description"
    value={description}
    onChange={handleDescriptionChange}
    required
  ></textarea>
  <input
    type="text"
    placeholder="Company Name"
    value={companyName}
    onChange={handleCompanyNameChange}
    required
  />
  <input
    type="email"
    placeholder="Contact Email"
    value={contactEmail}
    onChange={handleContactEmailChange}
    required
  />
  <input
    type="number"
    placeholder="Salary"
    value={salary}
    onChange={handleSalaryChange}
    required
  />
  <button type="submit">Update Job</button>
  <button type="button" onClick={cancelEdit}>Cancel</button>
</form>
```

#### **Step 4: Submit Updated Job**

When the form is submitted, the updated data is sent to the backend via a `PUT` request.

```javascript
const updateJob = async (updatedJob) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    });
    if (res.ok) {
      console.log("Job updated successfully!");
      navigate(`/jobs/${id}`);
    } else {
      console.error("Failed to update job");
    }
  } catch (error) {
    console.error("Error updating job:", error);
  }
};

const submitForm = (e) => {
  e.preventDefault();
  if (!title || !description || !companyName || !contactEmail || !salary) {
    alert("Please fill in all fields");
    return;
  }

  const updatedJob = {
    title,
    description,
    company: { name: companyName, contactEmail },
    salary,
  };

  updateJob(updatedJob);
};

const cancelEdit = () => navigate(`/jobs/${id}`);
```

#### **What Happens in the Update Process?**

1. **Existing Data Load:** When the component mounts, `useEffect` fetches the current job data and populates the state with it.
2. **Editable Form:** The form renders the fetched data, allowing the user to edit the fields.
3. **Form Submission:** On submission, the updated job data is sent to the backend, and the user is redirected to the job's detail page.

---

### **D. Fetching and Deleting Jobs**

---

The **delete operation** involves displaying the job details fetched from the backend, allowing the user to confirm and delete the job via a `DELETE` request. Here's an implementation combining fetching job details and the delete operation.

#### **Step 1: Fetch Job Details**

Using `useEffect` and `useState`, we fetch the job's details when the component loads. This allows us to show the user what they’re about to delete.

```javascript
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJob();
  }, [id]);
```

#### **Step 2: Implement Delete Job Logic**

When the user clicks the delete button, the job is removed from the backend by sending a `DELETE` request. After the job is successfully deleted, the user is redirected to the home page.

```javascript
  const deleteJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
      console.log("Job deleted successfully");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
```

#### **Step 3: Display Job Details and Delete Button**

If the job is not loaded yet, show a loading message. Otherwise, render the job details along with an **Edit** button and a **Delete** button.

```javascript
  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Salary: {job.salary}</p>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={deleteJob}>Delete Job</button>
    </div>
  );
};

export default JobPage;
```


#### **Key Concepts**

1. **Fetching the Job:**
   - Use `useEffect` to fetch job details when the component loads.
   - Use `useState` to store the job’s data for display.

2. **Deleting the Job:**
   - Send a `DELETE` request to the backend when the delete button is clicked.
   - Redirect the user to a different page (e.g., home page) after successful deletion.

#### **Enhancements**

- **Confirmation Dialog:**
  Before deleting, you can ask the user for confirmation using a `confirm` dialog.

  ```javascript
  const confirmAndDelete = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob();
    }
  };
  ```

  Replace the delete button logic with:

  ```javascript
  <button onClick={confirmAndDelete}>Delete Job</button>
  ```

- **Error Handling:**
  Display an error message on the screen if the job fails to load or delete.

- **Loading Indicator:**
  Improve the UX by showing a loading spinner while fetching or deleting the job.

---

### **Conclusion**

---

In this guide, we:
1. Built a backend model for jobs.
2. Used `useState` to manage form inputs and application state.
3. Used `useEffect` for side effects like fetching data.
4. Implemented CRUD operations using React's hooks and event handling.
