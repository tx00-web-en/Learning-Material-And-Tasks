# CORS Activity

In this part of the activity, you'll explore how Cross-Origin Resource Sharing (CORS) works in an API server.

### Step 1: Clone the Repository

First, clone the repository by running the following command in your terminal:

```bash
git clone https://github.com/tx00-resources-fi/fe-useeffect-demo be-cors-demo
```

### Step 2: Set Up the Backend
1. Make sure your MongoDB server is up and running.
2. Navigate to the `backend` folder:
   ```bash
   cd be-cors-demo/backend
   ```
3. Install the necessary dependencies and start the server:
   ```bash
   npm install
   npm run dev
   ```
4. The server should now be listening on port 3001.

   **Note:** The `app.js` file uses the `cors` middleware to handle Cross-Origin Resource Sharing:
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

### Step 3: Set Up the Frontend
1. Navigate to the `client-react` folder:
   ```bash
   cd ../client-react
   ```
2. Install the dependencies and start the React application:
   ```bash
   npm install
   npm start
   ```

### Step 4: Experiment with CORS
1. Use the frontend to add and delete blogs, interacting with the backend server.
2. Now, open the `be-cors-demo/backend/app.js` file and comment out the line `app.use(cors());`.
3. Observe how the frontend behaves after this change. It should crash or fail to fetch data from the server due to CORS issues.

> For a more detailed explanation, refer to [this document](./be-cors.md).

