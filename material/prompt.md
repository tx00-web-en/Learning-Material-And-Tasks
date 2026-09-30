# Prompt 

**Generate a Swagger/OpenAPI JSON document** for an API where all routes are protected, except for the GET method. the server runs at `http://localhost:4000/api`. Below are the models, routers, and controllers for the users and jobs.

**User Model:**

```javascript
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    membership_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false  }
);
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
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

 
//add  virtual field id
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});
```

**User Routes:**

```javascript
// login route
router.post("/login", loginUser);
  
// signup route
router.post("/signup", signupUser);
```

**Jobs Routes:**

```javascript
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

router.use(requireAuth);

router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
```

**User Controllers:**

- **Signup User:**

```javascript
const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
  } = req.body;
  try {
    if (
      !name ||
      !email ||
      !password ||
      !phone_number ||
      !gender ||
      !date_of_birth ||
      !membership_status
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
    });

    if (user) {
      // console.log(user._id);
     const token = generateToken(user._id);
      res.status(201).json({ email, token });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

- **Login User:**

```javascript
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.status(200).json({ email, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
```

- **Create a Job:**

```javascript
const createJob = async (req, res) => {

  try {
    const user_id = req.user._id;
    const newJob = new Job({
      ...req.body,
      user_id,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
```

- **Get Job by ID:**

```javascript
const getJobById = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      console.log("Job not found");
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
```

- **Update Job by ID:**

```javascript
const updateJob = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndUpdate(
      { _id: jobId },
      { ...req.body },
      // { new: true } //this option is now deprecated.     
      { returnDocument: 'after' }, //This is the new, preferred option 
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
```

- **Delete Job by ID:**

```javascript
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndDelete({ _id: jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
```
