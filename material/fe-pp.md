# Frontend Pair Programming Activity: 

This activity guides you and your partner through creating a frontend React application that connects to a prebuilt backend API for managing job listings. By the end, you'll have a functional fullstack application. The backend is provided and fully functional; the focus is on the frontend implementation.

---

> The logic required for each CRUD operation is similar to the code in this [tutorial](./fe-pp-summary.md).  
> After each coding step, use your preferred LLM (Language Learning Model) to evaluate the code quality and provide feedback on potential improvements and optimizations.

---

### Iteration 1: Backend Setup

1. **Clone Starter Code**
   - Clone the repository from [https://github.com/tx00-resources-en/week5-fepp-starter](https://github.com/tx00-resources-en/week5-fepp-starter).
   - Navigate to the backend folder:
     ```bash
     cd week5-fepp-starter/backend
     ```
   - Please do not forget to remove **.git**  



2. **Environment Configuration**
   - Copy the example environment file  `.env.example` to `.env`
     ```bash
     cp .env.example .env
     ```

3. **Install Dependencies**
   - Run the following command to install all backend dependencies:
     ```bash
     npm install
     ```

4. **Run Tests**
   - Verify that the backend is functioning by running tests:
     ```bash
     npm test
     ```
   - Ensure all tests pass successfully.

5. **Start the Server**
   - Start the backend server:
     ```bash
     npm run dev
     ```

6. **Seed Initial Data Using Postman**
   - Open Postman and add job data using a POST request:
     - URL: `http://localhost:4000/api/jobs`
     - Example payload:
       ```json
       {
         "title": "Job title 1",
         "type": "Job type 1",
         "description": "Job description 1",
         "company": {
           "name": "Company 1",
           "contactEmail": "email1@gmail.com",
           "contactPhone": "012345678"
         },
         "location": "Vantaa",
         "salary": 4000
       }
       ```
   - Add a few job entries for testing.

7. **Understand the Job Model Schema**
   - Familiarize yourself with the schema used for jobs in the backend:
     ```javascript
     const jobSchema = new mongoose.Schema({
       title: { type: String, required: true },
       type: { type: String, required: true },
       description: { type: String, required: true },
       company: {
         name: { type: String, required: true },
         contactEmail: { type: String, required: true },
         contactPhone: { type: String, required: true },
       },
       location: { type: String, required: true },
       salary: { type: Number, required: true },
       postedDate: { type: Date, default: Date.now },
     });
     ```
   - **Note:** You **don’t need** to provide `postedDate` when creating a job. It will be automatically set to the current date and time.  

8. **Run Seeder Script to Insert Data**  
   - Use the following commands to seed the database with sample data:     
     ```bash
     npm run data:import
     ```  
   - This will insert all job entries from `data/jobs.js` into the database. Alternatevely you can invoke the `seeder.js` script to populate the database with sample jobs: `node seeder.js` 
   - Note that it is also possible to delete all job entries from the database by invoking invoke the `seeder.js` script.

9. **Side note** 
   - You can adapt this seeder approach for your own project if you find it useful, for example, to quickly set up test data during development.


---

### Iteration 2: Frontend Setup and Initial Fetch

1. **Navigate to Frontend Folder**
   - Move to the frontend directory:
     ```bash
     cd ../frontend
     ```

2. **Install Dependencies**
   - Run the following command to install all dependencies:
     ```bash
     npm install
     ```

3. **Start the Frontend Application**
   - Launch the frontend app:
     ```bash
     npm run dev
     ```

4. **Explore the Interface**
   - Verify the app loads successfully:
     - Navigate to the *Add Job*, *Sign Up*, and *Login* pages. You should see the respective forms.
     - On the homepage, confirm it displays `<p>No jobs found</p>`.

5. **Fetch Jobs from Backend**
   - Open the file `src/pages/HomePage.jsx`.
   - Use `useEffect` to fetch all job data from the backend and ensure they are rendered on the homepage.

---

### Iteration 3: Adding a Job

1. **Enhance Add Job Page**
   - Open `src/pages/AddJobPage.jsx`.
   - Implement the logic to add a job to the backend.

2. **Verify Functionality**
   - Use the form on the *Add Job* page to create a new job.
   - Confirm the new job appears on the homepage after submission.

3. **Code Review**
   - Use your preferred LLM to validate the code quality and explore optimizations.

---

### Iteration 4: Rendering a Single Job

1. **Render Individual Job Details**
   - Open `src/pages/JobPage.jsx`.
   - Implement logic to fetch and display a specific job when selected.

2. **Review and Optimize**
   - Request feedback on your implementation from an LLM to ensure best practices.

---

### Iteration 5: Deleting a Job

2. **Add Delete Functionality**

1. **Confirm Deletion Logic**
   - Enhance the  `JobPage` component to include the ability to delete the currently viewed job. 
   - Ensure the delete logic in `src/pages/JobPage.jsx` is functional and removes the job both visually and from the backend.

2. **Verify**
   - Use the interface to delete jobs and verify changes are reflected across the app.

---

### Iteration 6: Editing a Job

1. **Enable Editing Functionality**
   - Open `src/pages/EditJobPage.jsx`.
   - Add logic to update the job details using the form.

2. **Cancel Update**
   - Add functionality to allow users to cancel the edit operation and return to the job details page.

3. **Quality Check**
   - Use an LLM to review your code for quality and optimization suggestions.

---

### Iteration 7: Backend and Proxy Insights  

1. **Understanding the Virtual Field in Backend**  
   - In the file `backend/models/jobModel.js`, explain the purpose of the following code snippet:  
     ```javascript
     jobSchema.set("toJSON", {
       virtuals: true,
       transform: (doc, ret) => {
         ret.id = ret._id;
         return ret;
       },
     });
     ```  
     **Question:** What does this code accomplish? Why is it useful in your application?  

2. **CORS Middleware**  
   - In `backend/app.js`, explain the role of this line:  
     ```javascript
     app.use(cors());
     ```  
     **Question:** What is CORS, and why is it necessary for the application to include this middleware?  

3. **Proxy Configuration in Frontend**  
   - In `frontend/vite.config.js`, describe the purpose of the following configuration:  
     ```javascript
     proxy: {
       "/api": {
         target: "http://localhost:4000",
         changeOrigin: true,
       },
     },
     ```  
     **Question:** How does this proxy setting work, and what problems does it solve in the development environment?  

---

### **Iteration 8 (Optional)**  

In this optional iteration, you will enhance the functionality of your React application by integrating it with specialized backend endpoints. These endpoints enable the app to fetch or manipulate data dynamically.  

**Available Endpoints**  
The following backend endpoints are already implemented and ready for use:
1. **Get jobs by type**  
2. **Search jobs by location**  
3. **Filter jobs by salary range**  
4. **Count jobs by type**  


> Detailed information about the backend endpoints and how to use them is available in the [supplementary file](./fe-pp-extra.md).

**ToDo**  

Your task is to implement logic in the React app to connect to one or more of these endpoints and display or interact with the data accordingly.


**Before You Begin**  
1. **Prepare the Database**  
   Use the following commands to seed the database with sample data:  

   ```bash
   # Import data
   npm run data:import
   ```
<!-- 
   To clear all existing data:  
   ```bash
   # Destroy data
   npm run data:destroy
   ```
-->

2. **Test the Endpoints**  
   Use **Postman** or any API testing tool to verify the backend endpoints:  

   - **Get Jobs by Type**:  
     ```http
     GET http://localhost:4000/api/jobs/type/Full-time
     ```
   - **Search Jobs by Location**:  
     ```http
     GET http://localhost:4000/api/jobs/location/Helsinki
     ```
   - **Filter Jobs by Salary Range**:  
     ```http
     GET http://localhost:4000/api/jobs/salary?min=5000&max=6000
     ```
   - **Count Jobs by Type**:  
     ```http
     GET http://localhost:4000/api/jobs/count/type/Part-time
     ```

