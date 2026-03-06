# Deploying a MERN Stack Application to Render

This guide walks you through deploying a full-stack MERN application (React + Node.js/Express + MongoDB) to [Render](https://render.com) using the **same-origin** approach — where the backend serves both the API and the React frontend.

---

## A) TL;DR — Deployment at a Glance

Here is the high-level process. Each step is covered in detail in the sections that follow.

1. **Build the React client**
   1. Run `npm run build` inside the frontend directory to create a production-ready bundle.
   2. Copy the resulting `dist` folder into the backend directory (optionally rename it to `view`).
   3. Adjust `app.js` in the backend to serve static files from the `view`/`dist` folder and add a fallback route for React Router.

2. **Test locally with your local MongoDB**
   - Start the backend (`npm start`) and open `http://localhost:4000`.
   - Verify the React app loads and API endpoints work against your local database.

3. **Switch to MongoDB Atlas and test again**
   - Replace the local connection string with your MongoDB Atlas URI (use an environment variable such as `MONGO_URI_PROD`).
   - Restart the server and confirm everything still works — this proves your app is cloud-database-ready.

4. **Deploy to Render (same origin)**
   - Push your code to GitHub.
   - Create a Render Web Service linked to your repository.
   - Add environment variables (e.g. `MONGO_URI_PROD`) in the Render dashboard.
   - Deploy and verify the live URL.

> The same-origin approach means both the frontend and the API share a single URL, so there is no need for CORS configuration in production.

---

## B) Manual Deployment — Step by Step

This section explains every step in detail. Follow along the first time you deploy.

### Step 1: Build the React Frontend

The development server you run with `npm start` is not optimized for production. You need a production build.

Inside the **frontend** directory, run:

```bash
npm run build
```

This produces a `dist` folder containing:
- `index.html` — the entry point of the React app.
- Bundled and minified JavaScript files.
- Optimized static assets (images, stylesheets, etc.).

### Step 2: Copy the Build to the Backend

Move (or copy) the `dist` folder into the **backend** directory. You can optionally rename it to `view` to align with the Model-View-Controller naming convention.

- On Linux / macOS:
  ```bash
  cp -r ../frontend/dist ./view
  ```
- On Windows (PowerShell):
  ```powershell
  Copy-Item ../frontend/dist -Recurse -Destination ./view -Force
  ```

**Why?** The backend needs direct access to the frontend files so it can serve them to users.

### Step 3: Configure the Backend (`app.js`)

Three things need to happen in your Express app:

#### 3a — Serve Static Files

Add the following line so Express delivers the built React assets:

```javascript
app.use(express.static('view')); // Serve static files from 'view'
```

#### 3b — Add a Fallback Route for React Router

React is a Single Page Application (SPA). Routes like `/about` or `/dashboard` are handled client-side by React Router. The backend must return `index.html` for any request that does not match an API route:

```javascript
app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});
```

#### 3c — Get the Middleware Order Right

Place `express.static` **after** your API routes and the fallback **after** your error-handling middleware. Here is a reference structure:

```javascript
app.use(express.json());               // Parse JSON requests

// --- API routes ---
app.use("/api/users", userRouter);
// ...other API routes...

// --- Static files ---
app.use(express.static('view'));       // Serve frontend assets

// --- Error handling ---
app.use('/api', unknownEndpoint);
app.use(errorHandler);

// --- SPA fallback (must be last) ---
app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});
```

<details>
<summary>Best Practice — use the <code>path</code> module</summary>

Using Node's built-in `path` module makes your code portable across Windows, macOS, and Linux:

```javascript
const path = require('path');

app.use(express.static(path.join(__dirname, 'view')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
```

`path.join` always resolves the correct absolute path regardless of the operating system.

</details>

### Step 4: Test Locally with Local MongoDB

1. Start the backend server:
   ```bash
   npm start
   ```
2. Open [`http://localhost:4000`](http://localhost:4000) in your browser.
3. Verify:
   - The React app loads and navigation works.
   - API endpoints (e.g. `/api/users`) return correct data from your **local** MongoDB.

### Step 5: Switch to MongoDB Atlas

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) if you have not already.
2. Get your Atlas connection string and set it as an environment variable, for example in a `.env` file:
   ```
   MONGO_URI_PROD=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/<dbname>
   ```
3. Make sure your backend reads the connection string from the environment variable (e.g. `process.env.MONGO_URI_PROD`).
4. Restart the server and repeat the tests from Step 4 — this time the data comes from Atlas.

> You can test the Atlas connection independently with **MongoDB Compass** to make sure the cluster is reachable and the credentials are correct.

### Step 6: Push to GitHub

Commit the backend (including the `view` folder) and push to your GitHub repository.

> For a refresher, [check these instructions](./push-to-github.md).

### Step 7: Create a Render Web Service

1. Go to [Render](https://render.com) and sign in.
2. Click **New → Web Service** and link your GitHub repository.
3. Set the **Root Directory** to `backend` (or wherever your server lives).
4. Choose the branch (e.g. `main`).
5. Configure the commands:
   - **Build command:**
     ```bash
     npm install
     ```
   - **Start command:**
     ```bash
     npm start
     ```
6. Add environment variables in the Render dashboard (e.g. `MONGO_URI_PROD`, `SECRET`, etc.).
7. Click **Deploy Web Service**.

### Step 8: Test the Deployed App

- Visit the Render-provided URL.
- Verify:
  - The React app loads correctly.
  - API endpoints return data from Atlas.
  - Navigation, error pages, and edge cases work as expected.
- Check the **Logs** tab in Render if anything goes wrong.

---

## C) Automating the Deployment Process

Repeating the manual steps every time you update the frontend is tedious. You can automate building and pushing with npm scripts.

> These scripts use Unix-style commands and work in **Git Bash** on Windows and in macOS / Linux terminals.

### 1. Add Scripts to the Backend `package.json`

```json
"scripts": {
  "build:view": "rm -rf view && cd ../frontend && npm run build && cp -r dist ../backend/view",
  "push": "git add . && git commit -m \"Update frontend build\" && git push",
  "deploy": "npm run build:view && npm run push"
}
```

| Script | What it does |
|---|---|
| `build:view` | Deletes the old `view` folder, builds the React frontend, and copies the fresh `dist` into the backend as `view`. |
| `push` | Stages all changes, commits, and pushes to GitHub. |
| `deploy` | Runs `build:view` then `push` in sequence — one command does everything. |

### 2. Test Locally

```bash
npm run build:view
npm start
```

Open `http://localhost:4000` and confirm the app works.

### 3. Deploy to Render

```bash
npm run deploy
```

This builds the frontend, commits the result, and pushes to GitHub. If your Render service is configured with **auto-deploy**, it will automatically pick up the new commit and redeploy.

> If this is your first deployment, follow the Render setup from [Step 7](#step-7-create-a-render-web-service) in Section B above first.

### 4. Future Updates

After the initial setup, the workflow for any change is:

1. Make your code changes (frontend and/or backend).
2. Run `npm run deploy` from the backend directory.
3. Render redeploys automatically.

---

## D) Alternative: Different-Origin Deployment

It is also possible to deploy the frontend and backend as **separate services** on different URLs (different origins). This is common when the frontend is hosted on a platform like **Vercel** or **Netlify** while the backend stays on Render.

At a high level this requires:

- **CORS configuration** on the backend — use the `cors` middleware to allow requests from the frontend's URL.
- **A `BASE_URL` environment variable** in the frontend — so that API calls point to the backend's URL instead of a relative path (e.g. `https://my-api.onrender.com/api` instead of `/api`).
- **Separate deployment pipelines** — each service is deployed independently and has its own build/start configuration.

The same-origin approach covered in this guide is simpler because it avoids CORS issues entirely and only requires a single deployment. Choose the different-origin approach when you need independent scaling, different release cycles, or when your frontend platform offers features (like edge CDN) that benefit your use case.

---

## E) Recap and Final Thoughts

| Step | What you did |
|---|---|
| Build the frontend | `npm run build` → production-ready `dist` folder |
| Integrate with backend | Copy `dist` into the backend as `view`; configure Express to serve it |
| Test locally | Verify with local MongoDB, then switch to Atlas |
| Deploy | Push to GitHub → Render picks it up and runs your app |

**Key takeaways:**

- The **same-origin** approach is the simplest way to deploy a MERN app. One server, one URL, no CORS headaches.
- Always **test locally** before deploying — first with a local database, then with Atlas.
- **Automate** the build-and-push workflow with npm scripts to save time and reduce human error.
- If you need separate frontend/backend deployments, the **different-origin** approach is available but requires additional configuration.


