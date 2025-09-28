# Prompt 

**Generate a Swagger/OpenAPI JSON document** for an API where all routes are protected by authentication. the server runs at `http://localhost:4000/api`. Below are the models, routers, and controllers for the users and jobs.

**User Model:**

```javascript
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  membership_status: { type: String, required: true }
});
```

**Jobs Model:**

```javascript
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});
```

**User Routes:**

```javascript
router.post("/login", loginUser);
router.post("/signup", signupUser);
```

**Jobs Routes:**

```javascript
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);
router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
```

**User Controllers:**

- **Signup User:**

```javascript
const signupUser = async (req, res) => {
  // Generate token and return if successful
  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({ email, token });
  } else {
    res.status(400).throw(new Error("Invalid user data"));
  }
};
```

- **Login User:**

```javascript
const loginUser = async (req, res) => {
  // Validate and login user
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } else {
    res.status(400).throw(new Error("Invalid credentials"));
  }
};
```

**Jobs Controllers:**

- **Get All Jobs:**

```javascript
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
```

- **Create a Job:**

```javascript
const createJob = async (req, res) => {
  const user_id = req.user._id;
  const newJob = new Job({ ...req.body, user_id });
  await newJob.save();
  res.status(201).json(newJob);
};
```

- **Get Job by ID:**

```javascript
const getJobById = async (req, res) => {
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json(job);
};
```

- **Update Job by ID:**

```javascript
const updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate({ _id: jobId }, { ...req.body }, { new: true });
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json(job);
};
```

- **Delete Job by ID:**

```javascript
const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: jobId });
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(204).send();
};
```
