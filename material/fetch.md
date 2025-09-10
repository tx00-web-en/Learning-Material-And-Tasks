# Using the Fetch API for CRUD Operations in JavaScript


The `fetch` API in JavaScript is a built-in feature in most modern browsers that allows you to make HTTP requests to interact with servers. This API is commonly used for operations like retrieving data, submitting form data, and even sending JSON objects to APIs. It provides an easy way to handle **CRUD** (Create, Read, Update, Delete) operations when working with RESTful APIs. We will explain how to use the `fetch` API for each of these operations and handle errors using `try...catch`.


## Why Use the Fetch API?

The `fetch` API is widely preferred because of its simplicity and flexibility:
- **Promises**: `fetch` returns a promise, allowing you to handle asynchronous operations effectively with `async`/`await`.
- **Cross-Browser Support**: It's natively supported in most modern browsers, which makes it reliable for web applications.
- **Error Handling**: By leveraging `try...catch`, you can handle errors gracefully, making your code robust and user-friendly.
- **Readable and Maintanable**: The syntax is straightforward, making the code easy to read and maintain.

In the following examples, we use a mock REST API provided by [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts) to demonstrate each CRUD operation:
- **Create**: Add a new blog post.
- **Read**: Retrieve all blog posts or a specific post by its ID.
- **Update**: Modify an existing blog post.
- **Delete**: Remove a blog post by its ID.

### Setting Up the API URL

Before diving into the CRUD operations, let's define the base API URL we'll use for all our requests:

```javascript
const apiUrl = "https://jsonplaceholder.typicode.com/posts";
```

### 1. **Creating (POST) a New Blog Post**

To create a new resource, we use the `POST` method. In this case, we'll create a new blog post by sending a request to the server with the post data.

```javascript
const blog = {
  title: "New Blog",
  body: "This is the content of the new blog.",
  userId: 1,
};

const addBlog = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST", // HTTP method for creating resources
      body: JSON.stringify(blog), // Converts JavaScript object to JSON string
      headers: {
        "Content-Type": "application/json", // Specifies the content type as JSON
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add a new blog"); // Handle non-successful responses
    }

    const json = await response.json(); // Parse the response to a JavaScript object
    console.log("New Blog added:", json);
  } catch (error) {
    console.error("Error adding blog:", error.message);
  }
};

addBlog();
```

#### Explanation
- **`method: "POST"`**: Indicates the type of HTTP request. Here, `POST` is used to create new resources.
- **`body: JSON.stringify(blog)`**: Converts the JavaScript object `blog` into a JSON string so it can be sent in the HTTP request body.
- **`headers: { "Content-Type": "application/json" }`**: Informs the server that the data being sent is in JSON format.
- **`response.ok`**: A boolean property indicating whether the request was successful. If the status code is not in the 200–299 range, `response.ok` will be `false`.
- **`response.json()`**: Extracts and parses the response data from the server into a JavaScript object. It does **not** convert the server response to JSON but rather **parses** an existing JSON-formatted response.

### 2. **Reading (GET) All Blog Posts**

To retrieve data from the server, we use the `GET` method. Here’s how to fetch all the blog posts:

```javascript
const fetchBlogs = async () => {
  try {
    const response = await fetch(apiUrl); // Sends a GET request to retrieve data
    const data = await response.json(); // Parse the response body as a JavaScript object

    console.log("All Blogs:", data);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
};

fetchBlogs();
```

#### Explanation
- **`fetch(apiUrl)`**: Sends an HTTP `GET` request to the specified `apiUrl`. By default, `fetch` uses the `GET` method, so it doesn’t need to be explicitly specified.
- **`response.json()`**: Processes the response and parses it into a JavaScript object so that we can work with the data.
- **Error Handling**: The `try...catch` block captures network errors, such as an invalid URL or a network failure.

### 3. **Reading (GET) a Single Blog Post by ID**

To fetch a specific blog post, we append the post ID to the API URL and use a `GET` request:

```javascript
const fetchBlog = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`); // URL parameter to fetch a specific post
    const data = await response.json();

    console.log("Single Blog:", data);
  } catch (error) {
    console.error("Error fetching a blog:", error.message);
  }
};

const blogId = 1;
fetchBlog(blogId);
```

#### Explanation
- **`${apiUrl}/${id}`**: Constructs the URL dynamically to request a specific resource by its ID.
- This example demonstrates how to handle dynamic data retrieval by passing the `id` parameter.

### 4. **Updating (PUT) an Existing Blog Post**

Updating a resource requires sending the complete updated object to the server using the `PUT` method. Here’s an example:

```javascript
const updateBlog = async (blogId, updatedData) => {
  try {
    const response = await fetch(`${apiUrl}/${blogId}`, {
      method: "PUT", // HTTP method for updating a resource
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), // Convert the updated data to a JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to update the blog");
    }

    const updatedBlog = await response.json(); // Parse the server's response
    console.log("Blog updated:", updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error.message);
  }
};

updateBlog(blogId, {
  title: "Updated Blog",
  body: "This blog has been updated.",
});
```

#### Explanation
- **`method: "PUT"`**: Specifies the `PUT` method, which replaces the existing resource with the new data provided.
- **`body: JSON.stringify(updatedData)`**: The complete, updated resource is sent as a JSON string.

### 5. **Deleting (DELETE) a Blog Post**

To remove a blog post, we use the `DELETE` method:

```javascript
const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(`${apiUrl}/${blogId}`, {
      method: "DELETE", // HTTP method for deletion
    });

    if (!response.ok) {
      throw new Error("Failed to delete the blog");
    }

    console.log("Blog deleted successfully");
  } catch (error) {
    console.error("Error deleting blog:", error.message);
  }
};

deleteBlog(blogId);
```

#### Explanation
- **`method: "DELETE"`**: Specifies the HTTP method for removing a resource.
- No `body` or headers are required for this request since we are simply deleting a resource.
- The `if (!response.ok)` check ensures that the deletion was successful.

## Summary

The `fetch` API offers a simple and flexible way to handle HTTP requests for CRUD operations in JavaScript. Here’s a quick recap:
- **POST**: Used to add new resources to the server.
- **GET**: Retrieves resources, either all at once or a specific one using an ID.
- **PUT**: Updates an existing resource with new data. Typically, this requires sending the full updated resource.
- **DELETE**: Removes a resource from the server using its ID.

By utilizing `async`/`await` along with `try...catch` blocks, we handle asynchronous operations effectively and catch errors, enhancing the robustness and reliability of our applications. The `fetch` API, when used correctly, can become an essential tool in building dynamic and interactive web applications.

---
## Links

- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
<!-- - [Using Fetch](https://css-tricks.com/using-fetch/) -->
