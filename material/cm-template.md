# Self-Assessment (Template)

### Example 1: Improving Code Quality

Initially, our `filterJobsBySalary` endpoint was functional but lacked robustness to handle edge cases. Here's the original implementation:  

```javascript
// Filter jobs by salary range
filterJobsBySalary = async (req, res) => {
  try {
    const jobs = await Job.find({
      salary: { $gte: req.query.min, $lte: req.query.max },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

The endpoint worked for requests like:  
`GET http://localhost:4000/api/jobs/salary?min=5000&max=6000`  

However, it failed when:
1. `min` was non-numeric (e.g., `abc`).  
2. `max` was missing from the query.  

To address these issues, we refactored the code to handle edge cases effectively:  

```javascript
// Optimized filterJobsBySalary
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
```

### Key Improvements:
- **Default Handling:** Used `Number()` with default values (`0` for `minSalary`, `Infinity` for `maxSalary`) to handle missing or invalid inputs.
- **Resilience:** Ensured the endpoint works for various scenarios, making it more user-friendly and robust.

---

### Example 2: Debugging Route Order in Express

We encountered an issue with routing in our `jobRoutes.js` file. Here's the problematic setup:  

```javascript
// Problematic route order
router.get('/:id', getJobById);
router.get('/salary', filterJobsBySalary);
```

Requests to `/api/jobs/salary` returned "Invalid ID" errors because Express evaluated the dynamic `/:id` route before `/salary`. This happened because Express matches routes in the order they are defined.  

### Solution:
We reordered the routes to prioritize specific routes before dynamic ones:  

```javascript
// Corrected route order
router.get('/salary', filterJobsBySalary); // Specific route comes first
router.get('/:id', getJobById); // Dynamic route follows
router.get('/', getAllJobs);
router.get('/location/:location', getJobsByLocation);
```

**Lessons Learned:**

1. **Route Evaluation in Express:** Routes are matched sequentially. Specific routes (e.g., `/salary`) must be defined before dynamic ones (e.g., `/:id`).  
2. **Testing Matters:** Thorough testing revealed this subtle issue, which could have led to unpredictable behavior in production.  



```js
// File name or function
// Your code part A
```

```js
// File name or function
// Your code part B
```

```js
// File name or function
// Your code part A
```

```js
// File name or function
// Your code part B
```