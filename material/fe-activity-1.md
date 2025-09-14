# Activity 1


---
## Part 1/2

### Goals

1. Gain familiarity with the Fetch API in Node.js, a powerful tool for making HTTP requests.
2. Practice the fundamental CRUD (Create, Read, Update, Delete) operations using the Fetch API.
3. Work with asynchronous JavaScript through the use of `async/await` in handling HTTP requests.
4. Interact with a mock API (jsonplaceholder.typicode.com) to simulate real-world scenarios without affecting actual data.

> **Note:** You do not need to push your code to GitHub for this activity.

### Part 1

**Step 1: Add a Blog**

1. Save the code in your `app.js` file.

```javascript
// app.js

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const blog = {
  title: 'New Blog',
  body: 'This is the content of the new blog.',
  userId: 1,
};

const addBlog = async () => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(blog),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  console.log('New Blog added:', json);
};

// Example Usage
addBlog();
```

2. Run the application using the following command:

```bash
node app.js
```

3. Observe the terminal for the result. It should print "New Blog added:" followed by the details of the newly added blog.

**Step 2: Fetch All Blogs**

1. Comment out or remove the `addBlog` function.
2. Save the code in your `app.js` file.

```javascript
// app.js
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const fetchBlogs = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('All Blogs:', data);
};

// Example Usage
fetchBlogs();
```

3. Run the application using the following command:

```bash
node app.js
```

4. Observe the terminal for the result. It should print "All Blogs:" followed by an array of blog entries.

**Step 3: Fetch a Single Blog**

1. Comment out or remove the `fetchBlogs` function.
2. Save the code in your `app.js` file.
3. Replace `blogId` with the desired blog ID for testing.

```javascript
// app.js
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const blogId = 1; // Replace with the desired blog ID for testing

const fetchBlog = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  const data = await response.json();
  console.log('Single Blog:', data);
};

// Example Usage
fetchBlog(blogId);
```

4. Run the application using the following command:

```bash
node app.js
```

5. Observe the terminal for the result. It should print "Single Blog:" followed by the details of the specified blog.

**Step 4: Update a Blog**

1. Comment out or remove the `fetchBlog` function.
2. Save the code in your `app.js` file.
3. Replace `blogIdToUpdate` with the desired blog ID for testing.


```javascript
// app.js
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const blogIdToUpdate = 1; // Replace with the desired blog ID for testing
const updatedData = { title: 'Updated Blog', body: 'This blog has been updated.' };

const updateBlog = async (blogId, updatedData) => {
  const response = await fetch(`${apiUrl}/${blogId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  const updatedBlog = await response.json();
  console.log('Blog updated:', updatedBlog);
};

// Example Usage
updateBlog(blogIdToUpdate, updatedData);
```

4. Run the application using the following command:

```bash
node app.js
```

5. Observe the terminal for the result. It should print "Blog updated:" followed by the details of the updated blog.

**Step 5: Delete a Blog**

1. Comment out or remove the `updateBlog` function.
2. Save the code in your `app.js` file.
3. Replace `blogIdToDelete` with the desired blog ID for testing.
4. What happens if we remove the comment from this line in the code snippet below? `const fetch = require('node-fetch');`

```javascript
// app.js
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const blogIdToDelete = 1; // Replace with the desired blog ID for testing

const deleteBlog = async (blogId) => {
  await fetch(`${apiUrl}/${blogId}`, {
    method: 'DELETE',
  });

  console.log('Blog deleted successfully');
};

// Example Usage
deleteBlog(blogIdToDelete);
```

4. Run the application using the following command:

```bash
node app.js
```

5. Observe the terminal for the result. It should print "Blog deleted successfully."

You have now tested each CRUD operation individually using the Fetch API in Node.js. 

> [!NOTE]  
> - You can explore and enhance error handling within each function to create more robust and reliable applications. Compare your solution with the [following](./src/test-all.js).

---

## Part 2/2

In this part of the activity, you'll explore the code in the provided repository and set up both the backend and frontend components.

### Step 1: Clone the Repository

First, clone the repository by running the following command in your terminal:
```bash
git clone https://github.com/tx00-resources-en/fe-useeffect-demo
```

### Step 2: Set Up the Backend

1. Ensure that your MongoDB server is up and running.
2. Navigate to the `backend` folder:
   ```bash
   cd fe-useeffect-demo/backend
   ```
3. Install the necessary dependencies and start the server:
   ```bash
   npm install
   npm run dev
   ```
4. The server should now be listening on port 3001.  
   
   **Note:** The `app.js` file uses `cors` middleware to handle Cross-Origin Resource Sharing:
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```


### Step 3: Using `fetch` to communicate with the back-end server

Navigate to the `client-node` folder, for example:

```bash
cd ../client-node
```

Inside this folder, you will find different modules that demonstrate the CRUD operations using the command line:

* **`fetch-post.js`** → Adds a new blog.
* **`fetch-get-all.js`** → Reads all blogs.
* **`fetch-get-one.js`** → Reads a single blog by ID.
* **`fetch-update-one.js`** → Updates a blog by ID.
* **`fetch-delete-one.js`** → Deletes a blog by ID.


### Step 4: Set Up the Frontend

1. Navigate to the `client-react` folder:
   ```bash
   cd ../client-react
   ```
2. Install the dependencies and start the React application:
   ```bash
   npm install
   npm run dev
   ```

### Step 5: Explore the Code

Two files demonstrate how to interact with an API from a React frontend:

* **`client-react/src/pages/Create.jsx`** → shows how to **POST** (create) a new blog.
* **`client-react/src/pages/BlogDetails.jsx`** → shows how to **DELETE** a blog by its ID.


1. Creating a Blog Post (POST) — `Create.jsx`

```jsx
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [author, setAuthor] = useState("mario");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page reload

  // Prepare blog data
  const blog = { title, body, author };

  // Send POST request
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(blog),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  // Handle errors
  if (!response.ok) {
    console.log("Error");
  }

  // If successful
  if (response.ok) {
    setTitle("");
    setBody("");
    setAuthor("");
    console.log("new blog added:", json);
    navigate("/"); // redirect to homepage
  }
};
```

**Explanation**

1. **State hooks** (`title`, `body`, `author`) hold the form inputs.
2. **`handleSubmit`** prevents the default form submission and creates a blog object.
3. A **POST request** is sent to `apiUrl` with JSON in the body.
4. If successful, state is reset and the app navigates back to `/`.



2. Deleting a Blog Post (DELETE) — `BlogDetails.jsx`

```jsx
const { id } = useParams(); // get blog ID from route params
const [blog, setBlog] = useState(null);
const navigate = useNavigate();

const handleClick = async () => {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    navigate("/"); // redirect to homepage after deletion
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};
```

**Explanation**

1. **`useParams`** extracts the blog ID from the URL (e.g., `/blogs/123`).
2. **`handleClick`** sends a DELETE request to the API.
3. If successful, the user is redirected back to the homepage.
4. If there’s an error (e.g., network issue), it’s caught and logged.




**Key Takeaways**

* **POST (Create)** → `fetch(url, { method: "POST", body, headers })` adds a new resource.
* **DELETE (Remove)** → `fetch(url, { method: "DELETE" })` removes a resource by ID.
* `useNavigate` helps redirect after successful operations.
* `useParams` is useful when working with dynamic routes (like blog IDs).



