# Mastering Front-End and Back-End Integration: A Complete Pair Programming Journey

In this front-end pair programming activity, you’ll take a hands-on, iterative approach to building and connecting a React app with a Node.js backend. This activity simulates real-world development and guides you step-by-step through essential front-end and back-end integration concepts. By the end, you will have strengthened your React and API interaction skills and gained a solid understanding of how front-end applications handle authentication and protected routes.

This journey is divided into four parts, with each iteration building upon the previous one. The final outcome will be a fully functional React application capable of interacting with various backends, managing CRUD operations, handling user authentication, and accessing protected routes.

Here’s the big picture of the activity:

---

## Part 1: Basic CRUD Operations with Non-Protected Routes

In the first part, you’ll set the foundation by connecting a React app with a Node.js backend to manage CRUD (Create, Read, Update, Delete) operations without requiring authentication.

**Iteration 1: Setup**  
You start by cloning the project and setting up both the backend and frontend environments. You’ll work with a basic backend (`backend-no-auth`) that doesn’t require user authentication. By the end of this iteration, you’ll have both the backend server and the React development server up and running.

**Iteration 2: Adding and Fetching Jobs**  
Next, you’ll implement the logic to read and add job listings via the front end. You’ll write two key functions: one for fetching jobs and one for adding jobs using React’s `useEffect` and event handlers. This introduces the core workflow of sending GET and POST requests from the React app to the backend API.

**Iteration 3: Reading and Deleting a Single Job**  
You’ll then extend the app to fetch details of a specific job and delete it. This involves creating a new page to display job details and linking it to the homepage. In this iteration, you’ll also review routing in React using `react-router-dom` and the differences between regular HTML `<a>` tags and React’s `<Link>` components.

**Iteration 4: Updating a Job**  
Finally, you’ll implement the logic to update a job. You’ll create an `EditJobPage` component and connect it to the application. This step solidifies your understanding of how React components interact with backend services through HTTP requests, particularly using PUT requests. By the end of Part 1, you’ll have a fully functional job listing app using non-protected routes.

---

## Part 2: User Authentication and Administering Users

In Part 2, you’ll focus on user authentication, learning how to register and log in users—a critical component of modern web applications.

**Iteration 1: Setup**  
You’ll switch to the `backend-auth`, which supports user authentication. This requires stopping the previous backend server and setting up a new one. You’ll also review custom hooks (`useField`, `useSignup`, and `useLogin`) that simplify managing form inputs and sending authentication requests.

**Iteration 2: Registering and Logging in Users**  
In this step, you’ll implement two essential features: user registration and login. Using the custom hooks, you’ll handle form submissions and manage authentication state. This iteration will highlight the importance of tokens, which are key to protecting routes in the next part of the activity.

---

## Part 3: CRUD Operations with Protected Routes

Now that users can log in, Part 3 focuses on protected routes—areas of the application that only authenticated users can access.

**Iteration 1: Setup**  
With authentication in place, you’ll switch to `backend-protected`, which restricts access to certain routes unless the user is authenticated. This iteration emphasizes securing the React app and ensuring authentication tokens are passed with every request.

**Iteration 2: Implementing Protected Operations**  
You’ll now add functionality to handle CRUD operations on job listings, but only for logged-in users. You’ll implement state management for authentication in the React app, pass authentication status through the `NavBar`, and restrict access to actions like updating or deleting jobs.

In this step, you’ll be introduced to **prop drilling**, where data is passed down through multiple layers of components to enforce these restrictions. Later, you’ll refactor the code using the Context API, which makes global state management more efficient and cleaner. By the end of this part, you’ll have a job listing app where only authenticated users can manage job listings.

---

## Part 4: Code Review and Comparison with Video Tutorial

The final part of the activity involves reflection and comparison. After building the app, you’ll review your implementation alongside the source code from the provided video tutorial.

This process encourages:
1. **Code Review Skills:** You’ll analyze code structure, naming conventions, and logic flows critically.
2. **Understanding Differences:** You’ll identify gaps or differences between your code and the tutorial’s, learning new techniques and best practices in the process.
3. **Final Tweaks:** You can consider making adjustments to your implementation, fine-tuning your app based on the insights gained during the comparison.

---

## The Bigger Picture

This pair programming activity is designed to give you much more than just coding experience. It mirrors real-world software development practices in several ways:

### 1. **Collaborative Programming**  
Working with a partner allows you to experience pair programming, a practice used by many development teams to improve code quality and problem-solving skills.

### 2. **Iterative Development**  
The activity’s iterative approach simulates how features are built gradually in real projects. Each iteration introduces new functionality that builds upon the previous one.

### 3. **Frontend-Backend Integration**  
By working with both non-protected and protected backends, you’ll gain a complete understanding of how front-end applications interact with RESTful APIs. This will prepare you for full-stack development challenges in the future.

### 4. **Authentication and Security**  
User authentication and route protection are essential for modern web development. This activity covers them comprehensively, from setting up login systems to securing access to resources—key skills for building secure applications.

### 5. **Refactoring and Best Practices**  
Beyond just writing functional code, you’ll learn how to refactor for maintainability. Part 3, where you start with prop drilling and later transition to the Context API, highlights the importance of clean, efficient code.


