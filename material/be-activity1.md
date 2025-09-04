# Activity: Extending an Express API Server with Mongoose

In this lab, you will work on an Express server that uses Mongoose to interact with a MongoDB database. The provided server already supports basic CRUD operations for cars. Your task is to extend this server to include functionality for managing blogs and users.

### Objectives

- Learn how to use Mongoose to define schemas and models.
- Implement controllers and routes for new resources (`blogs` and `users`).
- Understand how to connect Mongoose models to your Express server.
- Test the new API endpoints using Postman.
- Push changes to a GitHub repository for version control.

### Steps to Complete

#### **Step 0: Install MongoDB**

1. **Install MongoDB**: Make sure you have MongoDB installed and running on your local machine. You can download it from [here](https://www.mongodb.com/try/download/community).
   - Follow the default installation process for your operating system.
   - After installation, the MongoDB server should start automatically.

2. **Verify Installation**:
   - **Windows 10/11**: Open the Services application and ensure that `MongoDB Server` is running.
   - **Linux**: Follow the [official MongoDB installation guide for Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/).
   - **macOS**: Follow the [official MongoDB installation guide for macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition).


#### **Step 1: Clone the Repository**

1. **Clone the Starter Repository:**
   - Clone the starter repository for the lab using the following command:
   ```bash
   git clone https://github.com/tx00-resources-en/be-starter-v1 week4-be-activity1
   ```
   - Remove the existing Git history to create a fresh project:
   ```bash
   rm -rf week4-be-activity1/.git
   ```
   - Navigate into the project directory and install the necessary dependencies:
   ```bash
   cd week4-be-activity1
   npm install
   ```

2. **Start the Server**: Start the Express server:
   ```bash
   npm run dev
   ```
   This should start the server on `http://localhost:4000`.

3. **Test the API**: Use Postman or a similar tool to test that the API is working. For example, use the following endpoint to create a car:
   - **POST** `http://localhost:4000/api/cars/`
   - Include the necessary body parameters for the car model:
   ```json
   {
     "model": "Toyota",
     "color": "red",
     "age": 3
   }
   ```

#### **Step 2: Add Blog Functionality**

1. **Create the Mongoose Model for Blogs**:

   Add the following `Blog` model to your project. Create a new file named `models/blogModel.js`:

   ```javascript
   const mongoose = require('mongoose');

   const Schema = mongoose.Schema;

   const blogSchema = new Schema({
     title: {
       type: String,
       required: true,
     },
     body: {
       type: String,
       required: true,
     },
     author: {
       type: String,
       required: true,
     },
   }, { timestamps: true });

   module.exports = mongoose.model('Blog', blogSchema);
   ```

2. **Create Blog Controllers**:

   Create a new file named `controllers/blogController.js` and define the necessary controller functions:
   - Refer to the car controllers for structure and code style [here](https://github.com/tx00-resources-en/be-starter-v1/blob/main/controllers/carControllers.js).

   Example function for getting all blogs:
   ```javascript
   const Blog = require("../models/blogModel");

    // GET /blogs
    const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
    };
   // Similarly, implement createBlog, getBlogById, deleteBlog
   ```

3. **Create Blog Routes**:

   Create a new file named `routes/blogRouter.js` and define routes similar to car routes.

4. **Update `app.js`**:

   Integrate the blog routes into your Express server as shown [here](https://github.com/tx00-resources-en/be-starter-v1/blob/main/app.js):
   ```javascript
   const blogRouter = require("./routes/blogRouter");
   //...
   app.use("/api/blogs", blogRouter);
   ```

5. **Test Blog Endpoints**:

   Use Postman to test all the blog API endpoints (`GET`, `POST`, `GET by ID`, `DELETE`).

#### **Step 3: Add User Functionality**

1. **Create the Mongoose Model for Users**:

   Add the following `User` model to your project. Create a new file named `models/userModel.js`:

   ```javascript
   const mongoose = require("mongoose");

   const Schema = mongoose.Schema;

   const userSchema = new Schema(
     {
       name: { type: String, required: true },
       username: { type: String, required: true },
       password: { type: String, required: true },
       address: { type: String, required: true },
       age: { type: Number, required: true },
     },
     { timestamps: true }
   );

   module.exports = mongoose.model("User", userSchema);
   ```

2. **Create User Controllers**:

   Create a new file named `controllers/userController.js` and define the necessary controller functions, following the car controller pattern.

3. **Create User Routes**:

   Create a new file named `routes/userRouter.js` and add routes similar to car routes.

4. **Update `app.js`**:

   Integrate the user routes into your Express server as shown in the car routes example.

5. **Test User Endpoints**:

   Use Postman to test all the user API endpoints (`GET`, `POST`, `GET by ID`, `DELETE`).

#### **Step 4: Push Your Code to GitHub**

> Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 


### Resources
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Express Documentation](https://expressjs.com/)
