# End-to-end example: Add “jobs by type” in backend and frontend

Below is a step-by-step guide to implement a GET endpoint for jobs by type in the backend, export it, and wire up a React component that fetches using fetch.

---

## Backend setup for jobs by type

### 1) Controller function

Add the controller function in your jobs controller file (controllers/jobControllers.js):

```js
// controllers/jobControllers.js

// Get jobs by type
const getJobsByType = async (req, res) => {
  try {
    const type = req.params.type;
    const jobs = await Job.find({ type });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  // other exports...
  getJobsByType,
};
```

### 2) Route definition

Wire the controller into your jobs route file (e.g., routes/jobRoutes.js):

```js
// routes/jobRouter.js

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByType//new
} = require("../controllers/jobControllers");

// other routes
// router.get('/', getAllJobs);

// GET /api/jobs/type/:type
router.get('/type/:type', getJobsByType);

module.exports = router;
```

---

## **Frontend components**

### **1) `src/components/JobListing.jsx`**
```jsx
// src/components/JobListing.jsx
const JobListing = ({ title, company, location, salary, type, description }) => {
  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p><strong>Company:</strong> {company?.name || company}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Salary:</strong> {salary ? `$${salary}` : "Not specified"}</p>
      {description && <p>{description}</p>}
    </div>
  );
};

export default JobListing;
```
**Notes:**
- Uses optional chaining (`company?.name`) in case `company` is an object.
- You can style `.job-card` with CSS or Tailwind.



### **2) `src/pages/JobsByType.jsx`**
```jsx
// src/pages/JobsByType.jsx
import { useEffect, useState } from "react";
import JobListing from "../components/JobListing";

const JobsByType = () => {
  const [jobs, setJobs] = useState([]);
  const [type, setType] = useState("Full-time");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobsByType = async () => {
      if (!type) return;
      setLoading(true);
      setError("");
      try {
        // Encode for safety in case type has spaces (“Part-time”)
        const res = await fetch(`/api/jobs/type/${encodeURIComponent(type)}`);
        if (!res.ok) throw new Error("Failed to fetch jobs by type");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsByType();
  }, [type]);

  return (
    <div className="jobs-by-type">
      <h2>Jobs by Type</h2>

      <label>
        <span style={{ marginRight: 8 }}>Select job type:</span>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </label>

      <div className="job-list" style={{ marginTop: 16 }}>
        {loading && <p>Loading...</p>}
        {!loading && error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && jobs.length === 0 && <p>No jobs found</p>}
        {!loading &&
          !error &&
          jobs.length > 0 &&
          jobs.map((job) => (
            <JobListing key={job._id || job.id} {...job} />
          ))}
      </div>
    </div>
  );
};

export default JobsByType;
```


### **Key points**
- **`JobListing`** is reusable — you can use it in `JobsByType.jsx`, and future pages like `JobsByLocation.jsx`.
- **`encodeURIComponent`** ensures safe URLs when types have spaces or special characters.
- Use **`job._id`** if you’re returning Mongoose documents; switch to `job.id` if your API maps IDs.

---

## Wiring into your app

```jsx
// src/App.jsx
//Other imports
//...
import JobsByType from "./pages/JobsByType";
 
const App = () => {
  return (

      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-job" element={<AddJobPage />} />
              <Route path="/jobs/:id" element={<JobPage />} />
              <Route path="/jobs/type" element={<JobsByType />} />{/* new */}
              <Route path="/edit-job/:id" element={<EditJobPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>

  );
};

export default App;
```

Add a simple nav link to Navbar:

```jsx

<nav>
  <h1><Link to="/">Home</Link></h1>
   {/*  */}
  <Link to="/jobs/type">Jobs by Type</Link>
</nav>
```
