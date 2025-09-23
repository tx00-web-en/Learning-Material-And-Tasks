# Coding Marathon:

In this coding marathon, your task is to develop an API server with authentication using a provided React frontend as a starting point. The goal is to work collaboratively- some team members will focus on backend development, while others will work on the frontend. At the end of the task, you'll merge your work and deploy the backend to [Render.com](https://render.com/).

> **Important**: The coding marathon assumes you have watched the [React Crash Course 2024](https://youtu.be/LDB4uaJ87e0?si=aGMiwMn7zoNiGcBM). To assist you, here are [**some notes from the video tutorial**](./cm-helper.md).  

---
## Success Criteria

Your project will be evaluated based on the following criteria, totaling 100 points:

1. **Clean, readable, and well-organized code (60 points)**:
   - Backend code
   - Frontend code


2. **Self-assessment using your favorite LLM (20 points)**:
   - Frontend assessment
   - Backend assessment
   - You can use the [following template](./cm-template.md).

3. **Deploy to Render (20 points)**:
   - One API without authentication
   - One API with authentication  

> Don't worry if you can't complete every step, as this activity is worth 100 points (only) and will be graded primarily on **group collaboration** and **communication**. 

>  The second and third coding marathon are designed not only to help you complete your group project but also to prepare you for the exam.

---
### Iteration 0: Planning

The provided starter project includes a React frontend that connects to a mock server. There are two versions of the frontend: one used in the video, and another that follows the principles covered during the frontend session. The differences between these versions are explained [**here**](./cm-helper.md).  

Please choose the version that best suits your needs.  

Your objectives are:
- **Build a backend server** (initially without authentication) to replace the mock server.
- **Connect the backend to the frontend**.
- Add **login and signup** functionality on the frontend.
- **Implement authentication** for both the backend and frontend.


#### Planning Tips:
- Assign tasks: decide who will work on the **backend** and who will handle the **frontend**.
- Set up a **GitHub repository** and create branches for different features to be merged later.
- Each group is allocated **two breakout rooms** in case the backend and frontend teams want to work separately. Team members are free to check on the status of the other team at any time during the coding marathon.  

---

### Iteration 1: Initial Setup

All team members should complete this iteration together. Follow these steps to set up the project:

1. **Clone the Starter Repository**  
   Clone the provided [repository](https://github.com/tx00-resources-en/cm2-starter) locally.
   - After cloning, delete the `.git` directory to unlink it from the starter repository.
   
2. **Start the Mock Backend Server**  
   - Open a terminal window and navigate to the `backend/api-fake-server` directory.
   - Run `npm install` to install dependencies.
   - Start the mock server using `npm run dev`.
   - The mock server will run on `http://localhost:8000`.

3. **Start the React Frontend**  
   - Open Open a new terminal window and navigate to the `frontend-simplified` or `frontend` directory.
   - Run `npm install` to install dependencies.
   - Start the app with `npm run dev`.
   - The frontend will run on `http://localhost:3000`.

4. **Verify the Setup**  
   At this point, the app should be working with the mock server. Test by:
   - Adding jobs.
   - Fetching jobs.
   - Updating jobs.
   - Deleting jobs.

5. **Push the Baseline Project to GitHub**  
   Create a branch for your baseline project and push it to GitHub. This will serve as your starting point.

---

### Iteration 2: Splitting Tasks

Now that the basic setup is complete, divide your team between backend and frontend tasks.

#### Backend Team:
1. **Implement Job Controllers and Router**  
  - Copy `.env.example` to `.env` in the `bakend/api-server-starter`. This will set up environment variables for your project.
   - The model for jobs is already provided in `backend/api-server-starter/models`.
   - Write job controllers, routers to handle CRUD operations and import the router in `app.js`
   - Test your endpoints using **Postman**.

2. **Update Proxy Settings**  
   Once your backend is working, modify the proxy configuration in `frontend/vite.config.js` to point to your backend instead of the mock server.
   
   ```js
   export default defineConfig({
   plugins: [react()],
   server: {
      port: 3000,
      proxy: {
         "/api": {
         target: "http://localhost:4000",
         changeOrigin: true,
         },
      },
   },
   });
   ```

3. At this point, the app should be working with the api server. Test by:
   - Adding jobs.
   - Fetching jobs.
   - Updating jobs.
   - Deleting jobs.

4. **Push Your Work**  
   Once everything works, push your changes to a new branch with a suitable name.

#### Frontend Team:
1. **Add Signup and Login Forms**  
   Create the UI for the signup and login components. You can use `frontend/src/pages/AddJobPage` as a reference for creating the forms. **Note** that the logic *can be added later*, once the *backend team completes iteration 3*. 

2. **Update Navigation Bar**  
   Update the navigation bar in `frontend/src/components/NavBar` to include links to the signup and login components.

3. **Test with the Mock Server**  
   Before switching to the backend team's API, test the forms using the mock server. 


4. **Test with the API Server**  
   - Pull the branch developed by the backend team.  
   - Copy `.env.example` to `.env` in `backend/api-server-starter`.  
   - Run `npm install` followed by `npm run dev`.  

5. **Change Proxy Settings**  
   - Before testing the frontend with the real API, update the proxy settings.  
   - In `frontend/vite.config.js`, modify the proxy configuration to point to `http://localhost:4000/api` instead of `http://localhost:8000`.  

   ```js
   export default defineConfig({
      plugins: [react()],
      server: {
         port: 3000,
         proxy: {
            "/api": {
               target: "http://localhost:4000",
               changeOrigin: true,
            },
         },
      },
   });
   ```  

6. **Handle Empty Job List**  
   Ensure the app handles the scenario of an empty job list gracefully by displaying an appropriate message. For example:  

   ```js
   {loading ? (
      <Spinner loading={loading} />
   ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {jobs.length === 0 ? (
            <p>No jobs available at the moment.</p>
         ) : (
            jobs.map((job) => (
               <JobListing key={job.id} job={job} />
            ))
         )}
      </div>
   )}
   ```  

7. **Test Thoroughly**  
   Ensure both the backend and frontend are thoroughly tested to confirm everything is functioning as expected.  

---

### Iteration 3: Adding Authentication


#### Backend Team:
1. **Add User Registration and Authentication**  
   - **Implement user registration** in the backend *and* **protect the job-related routes** (e.g., creating, updating, and deleting jobs should require authentication). You can choose the option that best suits your team. A summary of the two options is available [**here**](./bepp-summary.md):  
     - **Controller-Centric Design**: All authentication logic resides in the controller, as shown [**here**](https://github.com/tx00-resources-en/week6-fepp-starter/tree/main/backend-v2).  
     - **Model-Based Refactoring**: Authentication responsibilities are divided between the model and controller using static methods, as shown [**here**](https://github.com/tx00-resources-en/week6-fepp-starter/tree/main/backend).  
   - Test your changes using Postman. 

2. **Push to a New Branch**  
   Once registration and authentication are working, push your changes to a new branch.

#### Frontend Team:
1. **Integrate Authentication**  
   - Pull the backend team's branch.
   - Update the login and signup components to handle authentication. This involves making requests to the backend to register and authenticate users.
   - Test your changes with the backend's authentication system.

2. **Push to a New Branch**  
   Once the frontend components are working with authentication, push your changes to a new branch.

---

### Iteration 4: Final Tweaks and Optional Enhancements

#### Backend Team:
1. **Handle Pagination with Limit**  
   Modify the `getAllJobs` function to handle queries that limit the number of returned jobs. Use the following code snippet:
   
   ```js
   const limit = parseInt(req.query._limit);
   const jobs = limit 
     ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
     : await Job.find({}).sort({ createdAt: -1 });
   ```

2. **(Optional) Schema Relations**  

   You can explore a different ways to define the `jobSchema` e.g.
    ```js
        const mongoose = require('mongoose');

        const companySchema = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String, required: true },
        contactEmail: { type: String, required: true },
        contactPhone: { type: String, required: true }
        });

        const jobSchema = new mongoose.Schema({
        title: { type: String, required: true },
        type: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        salary: { type: String, required: true },
        company: { type: companySchema, required: true }
        });

        jobSchema.set('toJSON', {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
        });

        const Job = mongoose.model('Job', jobSchema);
        module.exports = Job;  
    ```  

2. **Explain this code**
    ```js 
        jobSchema.set('toJSON', {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
        });
    ```

#### Frontend Team:

1. **Use Custom Hooks for Authentication**  
   Refactor your login and signup logic into custom hooks (e.g., `useSignup` and `useLogin`) and use them in the app.

2. **(Optional) Create a `useFetch` Hook**  
   Implement a `useFetch` hook that handles API requests and returns loading, data, and error states. Use it throughout your app to standardize data fetching.

---

### Iteration 5: Deploying the Backend to Render.com

- Deploy the backend application(s) to [Render.com](https://render.com/). 
- Before deploying, make sure to:
   1. Deploy the ["Hello World"](https://docs.render.com/deploy-node-express-app) app on Render.
   2. Complete the provided homework.
   3. Deploy **API Version 1** .
   4. Deploy **API Version 2**.
   5. For guidance, here are [some screenshots](./api2render.md) on how to deploy to [Render](https://dashboard.render.com/).
- (**Optional**) Successfully deploying the frontend as well will earn you a **bonus** of 15 points.
---

### Final Notes:

- **Communication**: Throughout this marathon, clear communication between team members is crucial, especially when merging branches and integrating backend with frontend.
- **Version Control**: Use Git branches effectively to manage your work and merge responsibly.
- **Collaboration**: This marathon focuses on **teamwork** and **problem-solving** more than just the final product. Help each other, debug together, and share solutions.


**Happy coding!** :rocket: :heart: 


### Links

- [YouTube crash course](https://youtu.be/LDB4uaJ87e0)
- [Custom hooks](./fe-summary.md)
