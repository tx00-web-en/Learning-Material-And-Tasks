# Coding Marathon 3

Welcome to the **Third Coding Marathon**! 

In this challenge, you’ll build a fullstack application for job searching, including backend testing and deployment to the cloud.

The data models for users and jobs are quite similar to the **Job App** we worked on during *coding marathon 2* and the *FE pair programming*. Likewise, *backend testing* will closely mirror what we've done before. The only `new` task is deploying the frontend.

> This coding marathon is designed not only to help you complete your group project but also to prepare you for the exam.

---

## Deliverables

Please submit **separate** links to OMA, corresponding to the following deliverables:

1. **Code** for **API V1** (without authentication)
2. **Code** for **API V2** (with authentication and protection)
3. **Code** for the final **frontend**. Optionally, you may also include the code for Frontend V1 (the version that worked with API V1).
4. Backend **tests** for API V1
5. Backend **tests** for API V2
6. **URLs** for the deployed APIs and frontend(s)
7. **Each team membe**r must complete a self-assessment of their own code using the provided template. Submit it **in a separate file** named after yourself (e.g., `Matti.md`). you can use this [template](./cm-template.md) for this purpose

---

## Get Started Quickly

You don't need to start from scratch! Refer to the [code we used on Monday](https://github.com/tx00-resources-en/week7-fepp-en), which includes several branches: 
- Backend without authentication
- Backend with authentication and protected routes

> **Advice:** Over the weekend, consider redoing this coding marathon task from scratch in your own time. This will serve as an excellent refresher and a solid review to help you prepare for the upcoming exam.

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

---

### User Model

For this application, we’re using **username** instead of email. 


```js
const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  membership_status: { type: String, required: true },
  bio: { type: String },
  address: { type: String, required: true },
  profile_picture: { type: String, required: false }
}, { timestamps: true, versionKey: false });
```

---

## Database Setup

### Local Testing
- Start by testing your application with a **local database** to ensure everything works smoothly.

### Cloud Integration
- Once fully functional, switch to using a **cloud database** from MongoDB Atlas.  
- Test your APIs and frontend with the cloud setup.

---

## Deployment

Deploy the following components:

1. **Deploy API V1**  
   Deploy your backend API V1 (without authentication) to a platform like **Render**.
   
2. **Deploy Frontend V1**  
   Deploy the frontend that works with API V1 to a platform like **Render**.

3. **Deploy API V2**  
   Deploy your backend API V2 (with authentication) and ensure protected routes are working.

4. **Deploy Frontend V2**  
   Deploy the final frontend version integrated with API V2.

---

## Submission Checklist

Use this checklist to track your progress:

- [ ] API V1 Code (without authentication)  
- [ ] API V2 Code (with authentication)  
- [ ] Frontend Code  
- [ ] Backend tests for API V1  
- [ ] Backend tests for API V2  
- [ ] Deployed URLs  
- [ ] Self-assessment & grading  

---

## Contributions

Example Contribution Table

```plaintext
| Member Name  | Tasks Completed                             | Contribution (%) |
|--------------|---------------------------------------------|------------------|
| Matti        | Frontend authentication, Backend V2 testing | 40%              |
| Minna        | API V1 & V2 deployment, Database setup      | 35%              |
| Jussi        | Frontend V1 & UI styling                    | 25%              |
```


---

## Success Criteria

This session will be evaluated based on the following criteria (120 points total + bonus):

1. **Clean, readable, and well-organized code (40 points)**  
   - Backend code  
   - Frontend code  

2. **Deployment to the Cloud (30 points)**  
   - One API without authentication  
   - One API with authentication  
   - Frontend without authentication  
   - Frontend with authentication  

3. **Backend testing (30 points)**  

4. **Self-assessment using your favorite LLM (20 points)**  
   - Frontend assessment  
   - Backend assessment  

5. **Bonus (15 points)**  
   - Implement the `useContext` hook instead of prop‑drilling, completed before Sunday.
   <!-- - Otherwise, we’ll cover it in next Monday’s pair programming session. -->

---

**Happy coding!** :rocket: :heart:
