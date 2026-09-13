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
4. The server should now be listening on port 4000.  
   
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

1. Navigate to the `client-react-v1` folder:
   ```bash
   cd ../client-react-v1
   ```
2. Install the dependencies and start the React application:
   ```bash
   npm install
   npm run dev
   ```

### Step 5: Explore the Code

Three files demonstrate how to interact with an API from a React frontend:

* **`client-react-v1/src/pages/Home.jsx`** → shows how to **GET** (read) all blogs with a button click (not using `useEffect()`)
* **`client-react-v1/src/pages/Create.jsx`** → shows how to **POST** (create) a new blog via a form
* **`client-react-v1/src/pages/BlogDetails.jsx`** → shows how to **GET** a single blog and **DELETE** it by ID using `useEffect()`


**1. Fetching All Blogs (GET) — `Home.jsx`**

```jsx
const [blogs, setBlogs] = useState(null);

const fetchData = async () => {
  const res = await fetch("/api/blogs");
  const data = await res.json();
  setBlogs(data);
  console.log(data);
};

return (
  <div className="home">
    <button onClick={fetchData}>Load Blogs</button>
    {blogs && <BlogList blogs={blogs} />}
  </div>
);
```

**Explanation**

- **State hook** `blogs` stores the fetched blog data (initially `null`).
- **`fetchData`** is called when the user clicks the "Load Blogs" button.
- A **GET request** is sent to `/api/blogs` to fetch all blogs.
- The response is converted to JSON and stored in state.
- The `BlogList` component is only rendered after blogs are loaded.
- This approach is **event-driven**, not automatic like `useEffect()`.


**2. Creating a Blog Post (POST) — `Create.jsx`**

```jsx
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [author, setAuthor] = useState("mario");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const blog = { title, body, author };

  const response = await fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blog),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  if (!response.ok) {
    console.log("Error");
  }
  if (response.ok) {
    setTitle("");
    setBody("");
    setAuthor("");
    console.log("new blog added:", json);
    navigate("/");
  }
};
```

**Explanation**

- **State hooks** (`title`, `body`, `author`) track form input values.
- **`handleSubmit`** prevents the default form submission with `e.preventDefault()`.
- A **POST request** sends the blog data to `/api/blogs` as JSON.
- The `Content-Type: application/json` header tells the server to expect JSON.
- If the request fails (`!response.ok`), an error is logged.
- If successful, form fields are cleared and the user is redirected to the home page with `navigate("/")`.


**3. Deleting a Blog (DELETE) — `BlogDetails.jsx`**

```jsx
const [blog, setBlog] = useState(null);
const navigate = useNavigate();
const { id } = useParams();

useEffect(() => {
  const fetchBlog = async () => {
    const response = await fetch(`/api/blogs/${id}`);
    const json = await response.json();

    if (response.ok) {
      setBlog(json);
    }
  };

  fetchBlog();
}, [id]);

const handleClick = async () => {
  await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
  navigate("/");
};
```

**Explanation**

- **`useParams()`** extracts the blog ID from the URL (e.g., `/blogs/123`).
- **`useEffect()`** automatically fetches the blog when the component mounts or the ID changes.
- A **GET request** retrieves the blog by ID from `/api/blogs/{id}`.
- Blog data is stored in state and displayed in the JSX.
- **`handleClick()`** sends a **DELETE request** to `/api/blogs/{id}` to remove the blog.
- After deletion, the user is redirected home with `navigate("/")`.


## Key Takeaways

* **GET (Read)** → `fetch(url)` retrieves data; can be event-driven or automatic with `useEffect()`.
* **POST (Create)** → `fetch(url, { method: "POST", body, headers })` sends new data to the server.
* **DELETE (Remove)** → `fetch(url, { method: "DELETE" })` removes a resource by ID.
* **`useNavigate()`** enables programmatic navigation after successful operations.
* **`useParams()`** extracts route parameters for dynamic URLs.
* **`useEffect()`** can automatically trigger data fetching when dependencies change.



