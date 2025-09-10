# 1. Special Endpoints

### 1. Intro

It is possible to create specialized endpoints, and from the React app, you can connect to these endpoints to fetch or manipulate data. Here are some examples:  
- **Get jobs by type**  
- **Search jobs by location**  
- **Filter jobs by salary range**  
- **Get jobs by company name**  
- **Delete all jobs provided by a company**  
- **Count jobs by type**  

---

### 2. Controllers (`jobControllers.js`)

```javascript


// Get jobs by type
getJobsByType = async (req, res) => {
  try {
    const jobs = await Job.find({ type: req.params.type });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search jobs by location
getJobsByLocation = async (req, res) => {
  try {
    const jobs = await Job.find({ location: req.params.location });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter jobs by salary range
filterJobsBySalary = async (req, res) => {
  const minSalary = Number(req.query.min) || 0;
  const maxSalary = Number(req.query.max) || Infinity;

  try {
    const jobs = await Job.find({
      salary: { $gte: minSalary, $lte: maxSalary },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get jobs by company name
getJobsByCompany = async (req, res) => {
  try {
    const jobs = await Job.find({ 'company.name': req.params.companyName });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete all jobs provided by a company
deleteJobsByCompany = async (req, res) => {
  try {
    const result = await Job.deleteMany({ 'company.name': req.params.companyName });
    res.status(200).json({ message: `${result.deletedCount} job(s) deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Count jobs by type
countJobsByType = async (req, res) => {
  try {
    const count = await Job.countDocuments({ type: req.params.type });
    res.status(200).json({ type: req.params.type, count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  //...
  getJobsByType,
  getJobsByLocation,
  filterJobsBySalary,
  //...
  
};
```
---

### 3. Routes (`jobRoutes.js`)

```javascript

const {
  //...
  getJobsByType,
  getJobsByLocation,
  filterJobsBySalary,
  getJobsByCompany,
  deleteJobsByCompany,
  countJobsByType,
} = require('../controllers/jobControllers');


router.get('/type/:type', getJobsByType);
router.get('/location/:location', getJobsByLocation);
router.get('/salary', filterJobsBySalary);
router.get('/company/:companyName', getJobsByCompany);
router.patch('/:id/company/contact', updateCompanyContact);
router.delete('/company/:companyName', deleteJobsByCompany);
router.get('/count/type/:type', countJobsByType);
//...

```

---

### 4. Testing the Endpoints

Use **Postman** to test the endpoints:

- GET `http://localhost:4000/api/jobs/type/Full-time`
- GET `http://localhost:4000/api/jobs/location/Helsinki`
- GET `http://localhost:4000/api/jobs/salary?min=5000&max=6000`
- GET `http://localhost:4000/api/jobs/company/google`
- DELETE `http://localhost:4000/api/jobs/company/google`
- GET `http://localhost:4000/api/jobs/count/type/Part-time`

---
### About Routing 

Express evaluates routes in the order they are registered. If a dynamic route like `/api/jobs/:id` is defined **before**  `/api/jobs/salary` route, the latter will never be reached because `salary` matches the `:id` parameter.


### Solution: Reorder the Routes
Make sure the `/salary` route is defined **before** the dynamic `/:id` route in your `jobRoutes.js` file.

```javascript
// Define specific routes first
router.get('/salary', filterJobsBySalary); // This must come before '/:id'

// Dynamic route for job ID
router.get('/:id', getJobById);

// Other routes
router.get('/', getAllJobs);
router.get('/location/:location', getJobsByLocation);
```


### Explanation:
1. **Order Matters**:
   - When `/api/jobs/salary` is requested, Express first checks the `/salary` route. 
   - If `/salary` is defined after a dynamic `/:id` route, the string `salary` will be treated as the `:id` parameter, causing your controller for `/:id` to execute instead.

2. **Dynamic Routes Should Come Last**:
   - Always place more specific routes (e.g., `/salary`, `/location/:location`) **before** dynamic catch-all routes (e.g., `/:id`).

