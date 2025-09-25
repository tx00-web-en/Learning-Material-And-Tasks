# **Introduction to Deployment**

Deploying a MERN stack application involves two primary components: 
- **Frontend** (React): A user-facing interface that interacts with the backend.
- **Backend** (Node.js/Express): Handles application logic and communicates with the database.


---
## Part 1: General Steps to Deploy a Full-Stack Application

1. **Deploy the Database**:
   - Use **MongoDB Atlas** to host your database.
   - Test the connection using MongoDB Compass to ensure CRUD operations work.

2. **Deploy the Backend**:
   - Configure the backend to connect to MongoDB Atlas using environment variables.
   - Enable **CORS** middleware to allow API access from the frontend running on localhost during development.
   - Deploy the backend to **Render** as a web service.
   - Test the deployed backend using **Postman** to verify the API endpoints and database connectivity.

3. **Decide Frontend Deployment Strategy**:
   - Choose whether to:
     - Serve the frontend from the **same origin as the backend** by including the React build folder in the backend. [HW video](https://www.youtube.com/watch?v=ZsFwpjFmpFQ)
     - Serve the frontend from a **different origin**, which requires: 
        - Configuring **CORS** on the backend to allow requests from the frontend URL.
        - Adding a `BASE_URL` environment variable in the frontend for API routes.
        - [HW video](https://www.youtube.com/watch?v=l134cBAJCuc)

4. **Test and Finalize**:
   - Perform end-to-end testing to ensure the frontend communicates with the backend, and the backend interacts with the database.
   - Monitor logs on Render to debug any errors.

---
## Part 2: (Practical Use Case) – Deploying the Frontend with the Same-Origin Approach

### Manual Deployment

We can deploy the frontend manually or automate the process for efficiency. Below are the steps for manual deployment, followed by an automation guide.

**Step 1: Building the React Frontend**

- The development version of a React app (what you run with `npm start`) is not optimized for production.
- Running `npm run build` inside the **frontend** directory generates a **production-ready build**—minified, optimized, and smaller in size. This ensures faster load times and better performance.

Command:
```bash
npm run build
```

Output:
- A `dist` folder containing:
  - `index.html`: The entry point of your React app.
  - Bundled JavaScript files.
  - Optimized static assets like images and stylesheets.

**Step 2: Copy the `dist` folder to the Backend**

The backend serves the static files (from the frontend dist) to clients. To integrate the frontend with the backend:
- Move the `dist` folder into the backend directory.
- Optional: Rename it to `view` to highlight that we are using the model-view-controller
- **Why this step**? This ensures the backend has direct access to the frontend files, making deployment seamless.

<!-- 
- On Linux/Mac:
  ```bash
  cp -r ../frontend/dist ./view
  ```
- On Windows:
  ```bash
  Copy-Item ../frontend/dist -Recurse -Destination ./view -Force
  ``` 
-->

**Step 3: Configuring the Backend**

The backend needs to serve the React frontend as static files. This ensures that when users access the application, the backend correctly delivers the built React app along with any API endpoints.  

1. *Serve Static Files*: 

Modify the `app.js` file (or the main entry file of your backend) to serve the frontend build. Add this line at the beginning of your server configuration:  

```javascript
app.use(express.json());
app.use(express.static('view')); // Serve static files from 'view'
```

- `express.static('view')` tells Express to serve all static assets (HTML, CSS, JS) from the `view` directory.  

2. *Handle React Routing*

Since React is a **Single Page Application (SPA)**, all routes (e.g., `/about`, `/dashboard`) should return `index.html`, allowing React Router to manage navigation.  

At the **end** of `app.js`, add:  

```javascript
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});
```

- Any request **not matching an API route** (e.g., `/api/jobs`) should return `index.html`.  

3. *Ensure Middleware is in the Right Order*

Your backend has **middleware** for error handling, that's why we place `app.get('*', ...)` **after** all API routes but **before** error handling middleware.  Here's the correct structure in `app.js`:  

```javascript
app.use(express.json());  // Parse JSON requests
app.use('/api', apiRoutes);  // API routes

app.use(express.static('view'));  // Serve frontend static files

// ...
app.use("/api/users", userRouter);

// Catch-all route for React frontend
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

// Error handling middleware
app.use(unknownEndpoint);
app.use(errorHandler);
```

**Step 4: Testing Locally**

Before deploying to a platform like Render, test the integrated app locally:
1. Start the backend server:
   ```bash
   npm start
   ```
2. Open [`http://localhost:4000`](http://localhost:4000) in your browser.
3. Test:
   - Ensure the React app loads correctly.
   - Verify backend API endpoints (e.g., `/api/users`).


**Step 5: Push the backend Code to GitHub**

> For a refresher, [check these instructions](./push-to-github.md).

**Step 6: Set Up a Render Web Service**

1. **Log In**: Go to [Render](https://render.com) and sign in.
2. **Create a New Web Service**:
   - Link your backend GitHub repository.
   - Set the **Root Directory** to `backend`.
   - Choose the branch e.g. `main`
3. **Configure Build and Start Commands**:
   - Build command:
     ```bash
     npm install
     ```
   - Start command:
     ```bash
     npm start
     ```
4. Add any necessary variables (e.g., `DATABASE_URL`) in the Render dashboard.
5. Deploy Web Service

**Step 7: Test the Deployed App**
- Visit the Render-provided URL.
- Test:
  - React app functionality.
  - API endpoints.
  - Error handling (e.g., 404 or server errors).


---
<details>
<summary>Automating the Process</summary>


### Automating the Process

Manual deployment can be repetitive. Automating it ensures consistency and saves time. 

> This works with Git Bash on Windows and with Mac/Linux terminals as well.

Here’s how to automate the process:

1. **Add Scripts to `package.json`**:

   Update the backend’s `package.json` with the following scripts:
   ```json
   "scripts": {
      "build:view": "rm -rf view && cd ../frontend && npm run build && cp -r dist ../backend/view",
      "push": "git add . && git commit -m \"Update frontend build\" && git push",
      "deploy": "npm run build:view && npm run push"
   }
   ```

   **What Each Script Does:**
   - **`build:view`**: Cleans the `view` folder, builds the frontend, and copies the `dist` folder into the backend.
   - **`push`**: Stages, commits, and pushes changes to GitHub.
   - **`deploy`**: Combines building the frontend and pushing to GitHub into one command.


2. **Run Locally**:

   Test your app locally after automating the process:
   ```bash
   npm run build:view
   npm start
   ```

3. **Deploy to Render**:

   Deploy your app to Render using the following steps:

   - **Push Code to GitHub**:
     ```bash
     npm run deploy
     ```
     This ensures the latest code (frontend and backend) is committed to GitHub.

   - **Set Up a Render Web Service**:
     1. Go to [Render](https://render.com) and sign in.
     2. Create a new Web Service by linking your backend GitHub repository.
     3. Set the **Root Directory** to `backend`.
   
   - **Configure Build and Start Commands**:
     - **Build command**:
       ```bash
       npm install
       ```
     - **Start command**:
       ```bash
       npm start
       ```

   - **Environment Variables**:  
     Add any necessary variables (e.g., `DATABASE_URL`) in the Render dashboard.

4. **Test the Deployed App**:

   - Visit the Render-provided URL.
   - Test:
     - React app functionality.
     - API endpoints.
     - Error handling (e.g., 404 or server errors).

5. **Future Updates**:

   After deployment, future updates to your app (e.g., new features or bug fixes) can be managed easily:
   1. Make changes locally.
   2. Run:
      ```bash
      npm run deploy
      ```
   3. Render will automatically redeploy on each push to GitHub.


</details>