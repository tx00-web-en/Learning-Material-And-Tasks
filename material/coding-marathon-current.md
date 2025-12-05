# Coding Marathon 3

Welcome to the **Third Coding Marathon**! 

In this challenge, you’ll build a fullstack application for job searching, including backend testing and deployment to the cloud.

The data models for users and jobs are quite similar to the **Job App** we worked on during *coding marathon 2* and the *pair programming*. Likewise, *backend testing* will closely mirror what we've done before. The only `new` task is deploying the frontend.

> This coding marathon is designed not only to help you complete your group project but also to prepare you for the exam.

---
## Deliverables

You need to submit **separate OMA links** for each of the following items:

1. **API V1 code:** The initial backend version without authentication, together with **backend tests for API V1** (using Jest/Supertest).  
2. **Frontend V1 code:** The frontend version that works with **API V1** (no authentication required).  
3. **API V2 code:** Updated backend version with authentication and protected routes, together with **backend tests for API V2** (using Jest/Supertest).  
4. **Frontend V2 code:** The frontend version compatible with **API V2** (with authentication integration).  
5. **Deployment URLs:** Links to the deployed APPs on Render.  

---
## Project Structure & Branching Strategy

### Branching Strategy
- Create **one branch per feature** (minimum 2 branches per team member).  
- **Do NOT delete any branches** after merging—preserve all history.  
- Use clear branch naming (e.g., `feature/auth`, etc.).  
- Keep branches intact for grading and evaluation purposes.  

### Project Structure

```
project-root/
  backend/
  frontend/
  evaluation/
    contributions/
      member1.md
      member2.md
      ...
    self-assessment/
      member1.md
      member2.md
      ...
    self-grading/
      member1.md
      member2.md
      ...
```

- Each file must be named after the contributor (e.g., `Matti.md`).  

---

## Database Setup

You don't need to start from scratch! Reference [this starter code](https://github.com/tx00-resources-en/week7-fepp-en).

---

## API Endpoints

### API V1 (No Authentication)

Implement the following CRUD endpoints for the **Job** resource:
- **GET** `/api/jobs` – Retrieve all jobs
- **GET** `/api/jobs/:id` – Retrieve a specific job
- **POST** `/api/jobs` – Create a new job
- **UPDATE** `/api/jobs/:id` – Update a job
- **DELETE** `/api/jobs/:id` – Delete a job

### API V2 (With Authentication)

- Same endpoints as V1. Additionally, protect the following endpoints (require authentication token):
  - **POST** `/api/jobs` – Requires authentication
  - **UPDATE** `/api/jobs/:id` – Requires authentication
  - **DELETE** `/api/jobs/:id` – Requires authentication
  - **Note** that read operations (GET) remain publicly accessible.

- Implement the following endpoints for the **User** resource:
  - **POST** `/api/auth/signup` – Register a new user
  - **POST** `/api/auth/login` – Login user

---

## Backend Testing

Write comprehensive tests using **Jest** and **Supertest** for:
- All endpoints in **API V1**
- All endpoints in **API V2** (including authentication tests for protected routes)
- Test coverage should include success cases, error handling, and edge cases

---

## Data Models

### Job Model

The schema for jobs is as follows:

```js
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Full-time, Part-time, Contract
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    size: { type: Number }, // Number of employees
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  salary: { type: Number, required: true }, // e.g., Annual or hourly salary
  experienceLevel: { 
    type: String, 
    enum: ['Entry', 'Mid', 'Senior'], 
    default: 'Entry' 
  }, // Experience level
  postedDate: { type: Date, default: Date.now }, // Date the job was posted
  status: { 
    type: String, 
    enum: ['open', 'closed'], 
    default: 'open' 
  }, // Job status (open/closed)
  applicationDeadline: { type: Date }, // Deadline for job applications  
  requirements: [String], // List of required skills or qualifications
});
```

---

### User Model

For this application, we’re using **username** instead of email. 


```js
const userSchema = new Schema(
  {
    name: { type: String, required: true },            // Full name
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },        // Hashed password
    phone_number: { type: String, required: true },    // Contact number
    gender: { type: String, required: true },          // Gender
    date_of_birth: { type: Date, required: true },
    address: {
      street: { type: String, required: true },        // Street address
      city: { type: String, required: true },          // City
      zipCode: { type: String, required: true }        // Postal/ZIP code
    }
  },
  { timestamps: true, versionKey: false }
);
```

---

## Database Setup

### Local Testing
- Start by testing your application with a **local MongoDB database** to ensure everything works smoothly.

### Separate Databases for V1 and V2
- **API V1** uses its own MongoDB database (e.g., `job-app-v1`)
- **API V2** uses a separate MongoDB database (e.g., `job-app-v2`)
- This separation ensures clean testing and prevents data conflicts between versions

### Cloud Deployment
- Once fully functional locally, switch to **MongoDB Atlas** cloud databases
- Create two separate Atlas databases: one for V1 deployment, one for V2 deployment
- Update environment variables for each deployment to point to the correct database

---

## Development Workflow

**Phase 1: API V1 & Frontend V1 (No Authentication)**
1. Build backend API V1 with all CRUD endpoints
2. Write comprehensive backend tests for API V1 using Jest/Supertest
3. Build frontend V1 to consume API V1 endpoints
4. Deploy API V1 and Frontend V1 to Render using the first database
5. **Only proceed to Phase 2 after V1 is complete and working**

**Phase 2: API V2 & Frontend V2 (With Authentication)**
1. Create a new branch for API V2 based on API V1 code
2. Add authentication (signup/login) to API V2
3. Protect POST, UPDATE, DELETE endpoints requiring authentication tokens
4. Write comprehensive backend tests for API V2 including auth tests
5. Update frontend V2 to handle authentication flow
6. Deploy API V2 and Frontend V2 to Render using the second database

---

## Deployment

Deploy the following components to **Render**:

1. **Job APP V1** (No Authentication)  
   - Backend API V1 (using `job-app-v1` database) and the corresponding frontend V1
   - Provide URL in submission

2. **Job APP V2** (With Authentication)  
   - Deploy backend API V2 (using `job-app-v2` database) and the  corresponding frontend V2
   - Provide URL in submission

---

## Evaluation & Grading

**Scoring:**
- Group grade: 40 points  
- Individual grade: 80 points  

**Individual Evaluation Requirements:**
Each team member must create separate documentation files under the `evaluation/` folder:

1. **Contributions** (`evaluation/contributions/YourName.md`)
   - Describe the features/branches you created
   - List the commits and pull requests you authored
   - Explain your role in the group project

2. **Self-Assessment** (`evaluation/self-assessment/YourName.md`)
   - Evaluate the quality and functionality of your code
   - Discuss challenges faced and how you overcame them
   - Reflect on what you learned

3. **Self-Grading** (`evaluation/self-grading/YourName.md`)
   - Grade yourself out of 80 points
   - Justify your grade based on:
     - Code quality and organization
     - Completion of assigned features

---

## Submission Checklist

Use this checklist to track your progress:

**Phase 1: Version 1 (API V1 – No Authentication)**
- [ ] API V1 code repository with all CRUD endpoints
- [ ] Backend tests for API V1 (Jest/Supertest) for all endpoints
- [ ] Frontend V1 code (working with API V1)
- [ ] Deployed APP V1 URL to Render: (backend+frontend).
- [ ] Links to OMA 

**Phase 2: Version 2 (API V2 – With Authentication)**
- [ ] API V2 code repository with protected endpoints
- [ ] Backend tests for API V2 (Jest/Supertest), including authentication tests
- [ ] Frontend V2 code (with authentication integration)
- [ ] Deployed APP V2 URL to Render: (backend+frontend).
- [ ] Links to OMA 

**Documentation & Evaluation**
- [ ] Feature branches created and preserved (minimum 2 per team member, none deleted)
- [ ] `evaluation/contributions/YourName.md` for each member
- [ ] `evaluation/self-assessment/YourName.md` for each member
- [ ] `evaluation/self-grading/YourName.md` for each member (max 80 points each)

---

## Deadline

**Submission Deadline: December 5, 2025 at 23:45**

Ensure all OMA links are submitted before the deadline.

---

## Success Criteria

This session will be evaluated based on the following criteria:

1. **Clean, readable, and well-organized code** – Consistent style, clear naming, proper structure  
2. **Complete CRUD functionality** – All endpoints working for V1 and V2  
3. **Comprehensive backend testing** – Jest/Supertest for all endpoints (V1 and V2), including authentication tests for protected routes  
4. **Successful cloud deployment** – Both APIs and frontends deployed on Render with separate databases  
5. **Proper Git workflow** – Feature branches preserved, clear commit messages  
6. **Individual contributions** – Clear evaluation of each member

---

**Happy coding!** :rocket: :heart:





<!--
- **Bonus (15 points)**  
   - Implement the `useContext` hook instead of prop‑drilling, completed before Sunday.
    - Otherwise, we’ll cover it in next Monday’s pair programming session. -
- AI component    
- Example Contribution Table

```plaintext
| Member Name  | Tasks Completed                             | Contribution (%) |
|--------------|---------------------------------------------|------------------|
| Matti        | Frontend authentication, Backend V2 testing | 40%              |
| Minna        | API V1 & V2 deployment, Database setup      | 35%              |
| Jussi        | Frontend V1 & UI styling                    | 25%              |
```
->



