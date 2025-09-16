#  Activity: Authentication



---
## Part 1/2: Understanding How `bcrypt` Works

In this part, you will explore how the `bcrypt` algorithm works to hash passwords, including generating a salt, hashing a password, and comparing it against a stored hash. We will also cover the different prefixes used by bcrypt and an alternative synchronous hashing method.

#### **Step 1: Setting Up Your Project**

1. Create a new folder for your project.
2. Open a terminal and navigate to your project folder.
3. Initialize a new Node.js project by running the following command:
   ```sh
   npm init -y
   ```
4. Install the `bcrypt` library by running:
   ```sh
   npm install bcrypt
   ```

---

#### **Step 2: Create a JavaScript File**

Create a JavaScript file (e.g., `bcrypt_lab.js`) in your project folder.

---

#### **Step 3: Import the `bcrypt` Library**

To begin, import the `bcrypt` library in your JavaScript file:

```javascript
const bcrypt = require('bcrypt');
```

---

#### **Step 4: Generating a Salt and Hashing a Password**

###### **What is a Salt?**
A salt is a random value added to your password before hashing. It ensures that even if two users have the same password, their hashed values will differ, thus increasing security.

###### **How Does Hashing Work?**
The process consists of two main parts:
1. **Salt Generation**: bcrypt creates a random salt. This is combined with the password before the hashing process.
2. **Password Hashing**: The password is hashed using the bcrypt algorithm and the generated salt.

Let's see this in code:

```javascript
// Function to hash a password
async function hashPassword() {
  const password = 'mySecurePassword'; // Replace with your password

  try {
    // Generate a salt with 10 rounds (you can adjust this number)
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to hash the password
hashPassword();
```

###### **Explanation:**
- The salt is generated using `bcrypt.genSalt()`. The number (e.g., 10) indicates how many rounds of processing the salt will go through. More rounds provide more security but take longer.
- `bcrypt.hash()` takes the password and salt to produce the hashed password.

---

#### **Step 5: Understanding bcrypt Prefixes (2a, 2b, 2x, 2y)**

When you generate a hash using bcrypt, you'll notice a prefix like `$2a$`, `$2b$`, etc. This prefix indicates the version of the bcrypt algorithm that was used.

- **2a**: The original bcrypt algorithm. However, there was a bug in some implementations with handling characters like `null`, so newer versions emerged.
- **2b**: This is the most current version and fixes the bug present in 2a. It should be used in all modern applications.
- **2x** and **2y**: Specific versions introduced to handle different edge cases and bugs in certain implementations. These are less common but still valid.

When storing or verifying passwords, make sure you're aware of the version of bcrypt used, as using the wrong one may lead to inconsistencies or vulnerabilities.

---

#### **Step 6: Comparing a Password with a Hash**

Once a password is hashed and stored, you often need to verify it during user login. Here's how you can compare a password to a stored hash:

```javascript
const bcrypt = require('bcrypt');
// Function to compare a password with a hash
async function comparePassword() {
  const inputPassword = 'mySecurePassword'; // Replace with the password you want to compare
  const hashedPassword = 'yourStoredHashedPassword'; // Replace with the hashed password stored in your application

  try {
    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

    if (isMatch) {
      console.log('Password is correct.');
    } else {
      console.log('Password is incorrect.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to compare the password
comparePassword();
```

###### **Explanation:**
- `bcrypt.compare()` takes the plain password and the stored hash, comparing them securely.
- This ensures that the actual password is never stored or revealed, only its hash.

---

#### **Step 7: Using `bcrypt.hashSync()`**

There is an alternative method for hashing, called `hashSync()`, which performs the hashing process synchronously, meaning that it doesn’t require an `async` function.

Here's how you can use it:

```javascript
const bcrypt = require('bcrypt');

const password = 'mySecurePassword';

// Hash password synchronously with 10 salt rounds
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log('Synchronous Hashed Password:', hashedPassword);
```

###### **When to Use `hashSync`?**
- **`hashSync()`** is useful for smaller applications where the performance hit of synchronous operations isn’t noticeable. However, for larger applications or those handling many requests, it’s better to use the asynchronous version (`hash()`).

---

#### **Step 8: Running the Lab**

1. Open your terminal and navigate to your project folder.
2. Run the app by executing the JavaScript file:
   ```sh
   node bcrypt_lab.js
   ```

---

#### **Summary of Key Concepts:**

- **Salt**: A random value added to your password to ensure unique hashes.
- **Hashing**: The process of converting a password into an unreadable format using bcrypt.
- **bcrypt Prefixes (2a, 2b, 2x, 2y)**: Indicate the version of the algorithm. Always prefer the latest version (2b).
- **`bcrypt.hash()` vs `bcrypt.hashSync()`**: Use `hash()` for asynchronous operations (recommended) and `hashSync()` for simpler, synchronous operations.
- **Password Comparison**: Use `bcrypt.compare()` to securely compare a plain text password to a stored hash.

---



## **Part 2/2: Password Hashing in an Express App**

### **Objective:**  
In this part, you will learn how to enhance the security of an Express API by implementing password hashing using the `bcrypt` library. By the end, you'll understand how to securely store user passwords and authenticate users using hashed passwords. 

---

### **What is Password Hashing?**
Password hashing is a technique used to securely store passwords in databases. Instead of saving a user's plain-text password, we store a hashed version. A hash is a one-way transformation, meaning that it cannot (easily) be reversed back to the original password. By using a hashing function like `bcrypt`, even if attackers access the database, the actual password remains protected.

---

## **Step 1: Set Up the Express Project**

Before we start building the authentication system, let’s set up the basic Express project.

1. **Create a New Folder for Your Project**  
   Open your terminal and create a new directory for your project:
   ```bash
   mkdir express-bcrypt-demo
   cd express-bcrypt-demo
   ```

2. **Initialize a New Node.js Project**  
   In the project directory, run the following command to create a `package.json` file:
   ```bash
   npm init -y
   ```

3. **Install Required Dependencies**  
   We'll need `express` to create the server, `bcrypt` for hashing passwords, and `mongoose` to connect to a MongoDB database.
   Install them by running:
   ```bash
   npm install express bcrypt mongoose
   ```

---

## **Step 2: Create an Express API**

Now, let's set up a simple Express server and connect it to a MongoDB database.

1. **Create an `app.js` File**  
   This file will contain the main code for your Express app. Create a file called `app.js`.

2. **Set Up a Basic Express Server**  
   Inside `app.js`, add the following snippet. The `express.json()` middleware is used to parse incoming requests with JSON payloads:
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');

   const app = express();
   app.use(express.json());
   ```

3. **Connect to MongoDB**  
   Use Mongoose to connect to your MongoDB database. If you’re running MongoDB locally, it might look like this:
   ```javascript
   mongoose
     .connect("mongodb://localhost:27017/express-bcrypt-demo")
     .then(() => console.log("Connected to MongoDB"))
     .catch((err) => console.error("Failed to connect to MongoDB", err));
   ```

4. **Define a User Model**  
   In order to store users in the database, we need to define a `User` model. The model includes `username` and `password` fields. At this point, passwords will be stored as plain text, but we will hash them in the next step.
   ```javascript
   const userSchema = new mongoose.Schema({
     username: { type: String, required: true },
     password: { type: String, required: true },
   });

   const User = mongoose.model("User", userSchema);
   ```
   
5. **Set Up a Basic Express Server**  
   Inside `app.js`, set up a basic Express server that listens on a port (3001, for example). 
   ```javascript
   // Start server
   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```

---

## **Step 3: Implement Password Hashing**

### **Why Hash Passwords?**
Saving passwords in plain text is dangerous because, if the database is compromised, all user passwords are immediately exposed. Instead, we use a hashing function like `bcrypt` to securely store a hashed version of the password, which cannot be reversed back to the original. When users log in, we compare the hash of their input password with the stored hash.

### **Using bcrypt for Hashing**

1. **Import `bcrypt`**  
   At the top of your `app.js` file, import the `bcrypt` library:
   ```javascript
   const bcrypt = require('bcrypt');
   ```

2. **Hash the Password During User Registration**  
   In the user registration route, we'll hash the user's password before saving it to the database. This way, we never store the plain-text password.

   Here’s how you can modify the registration route to hash the password:
   ```javascript
   app.post("/api/users", async (req, res) => {
     const { username, password } = req.body;

     try {
       // Generate a salt (a random value added to the hash to increase security)
       const salt = await bcrypt.genSalt(10); // 10 rounds of salt generation
       // Hash the password with the salt
       const hashedPassword = await bcrypt.hash(password, salt);

       // Create a new user with the hashed password
       const newUser = new User({ username, password: hashedPassword });
       await newUser.save();

       res.status(201).json({ message: "User registered successfully" });
     } catch (error) {
       res.status(500).json({ error: "Server error" });
     }
   });
   ```

---

## **Step 4: Create a Login Route**

To verify user credentials, we’ll compare the password provided during login with the hashed password stored in the database.

1. **Create a Login Route**  
   During login, the user provides a username and password. The login route will find the user by their username and use `bcrypt.compare()` to check if the provided password matches the stored hashed password.

   Here’s the code for the login route:
   ```javascript
   app.post("/api/users/login", async (req, res) => {
     const { username, password } = req.body;

     try {
       // Find the user by username
       const user = await User.findOne({ username });
       if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
       }

       // Compare the input password with the stored hashed password
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
       }

       res.status(200).json({ message: "Login successful" });
     } catch (error) {
       res.status(500).json({ error: "Server error" });
     }
   });
   ```

---

## **Step 5: Test the API**

Now that the API is complete, you can test the registration and login functionality.

1. **Register a New User**  
   Use Postman or Curl to send a `POST` request to `/api/users` with the following JSON body:
   ```json
   {
     "username": "testuser",
     "password": "testpassword"
   }
   ```

2. **Log In with the Registered User**  
   Send a `POST` request to `/api/users/login` with the same username and password:
   ```json
   {
     "username": "testuser",
     "password": "testpassword"
   }
   ```

3. **Verify Hashed Password Storage**  
   After registering, check the database to ensure the password is stored as a hashed string and not in plain text.

---

## **Step 6: Optional Tasks**

1. **Explore Salt Rounds**  
   Salt rounds determine the complexity of the hashing process. The higher the number, the more secure but slower the hash generation will be. Adjust the `bcrypt.genSalt(10)` line and experiment with different values (e.g., 8, 12, 14) to see the impact on performance.

2. **Reference Additional Code**  
   For a more comprehensive implementation, you can check out [this code example](https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-14/backend/models/userModel.js), which includes more advanced authentication features.

---


## **Summary**

> You can reference this [working code](./src/bcrypt-demo/app.js) to compare your solution.


- **Password Security**: You’ve learned why password hashing is essential for security and how to use bcrypt to securely store user passwords.
- **Express API**: You built an Express API with MongoDB for handling user registration and login.
- **bcrypt**: You used bcrypt to hash passwords before saving them and to compare passwords during login.

