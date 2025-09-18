### Authentication Logic in Models and Controllers  

Authentication is a critical part of any web application, and how we design the authentication logic directly impacts code clarity, maintainability, and scalability. In this reading, we’ll explore two implementations of authentication, focusing on **login** and **signup** functionalities, while clarifying how static methods (`userSchema.statics`) work in the context of MongoDB and Mongoose.  

We’ll present the complete code for each approach:  
1. **Controller-Centric Design**: All authentication logic resides in the controller.  
2. **Model-Based Refactoring**: Authentication responsibilities are divided between the model and controller using static methods.  

---

## Approach 1: Controller-Centric Design  

### File: `userModel.js`


The user schema is simple and only defines the structure of the data:  

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
```

### File:  `userController.js`

In this approach, all logic for **signup** and **login** resides in the controller.  

**Initial Setup and Token Creation**  

```js
const User = require("../models/userModel-a");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
```

**Explanation:**  
1. **Imports**:  
   - **`User`**: The Mongoose model defining the structure of the user data.  
   - **`jsonwebtoken`**: Used to create JSON Web Tokens (JWTs), essential for secure, stateless authentication.  
   - **`bcryptjs`**: A library for hashing passwords and verifying password matches securely.  
   - **`validator`**: A [library for validating inputs](https://www.npmjs.com/package/validator), such as email addresses and password strength.  

2. **`createToken` Function**:  
   - This helper function generates a JWT for a given user ID (`_id`).  
   - The token includes the user's ID as the payload and is signed with a secret key (`process.env.SECRET`) for authentication.  
   - The token has an expiration time of 3 days (`{ expiresIn: "3d" }`).  



**loginUser Function** 

```js
// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

**Explanation:**  
1. **Input Validation**:  
   - The function extracts `email` and `password` from the request body.  
   - It checks whether both fields are provided. If not, an error is thrown.  

2. **Email Lookup**:  
   - **`User.findOne({ email })`**: The function queries the database to check if a user with the provided email exists.  
   - If the user doesn’t exist, an error (`"Incorrect email"`) is thrown.  

3. **Password Verification**:  
   - **`bcrypt.compare`**: The provided password is compared against the hashed password stored in the database.  
   - If the passwords don’t match, an error (`"Incorrect password"`) is thrown.  

4. **Token Creation and Response**:  
   - A JWT is generated using the `createToken` function.  
   - The response includes the user’s email and the generated token in a JSON format.  

**signupUser Function**  

```js
// Signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
```

**Explanation:**  
1. **Input Validation**:  
   - The function checks that both `email` and `password` are provided. Missing fields result in an error.  
   - **Email Validation**: The `validator.isEmail` function ensures that the provided email is in a valid format.  
   - **Password Strength**: The `validator.isStrongPassword` function checks for a secure password (e.g., includes numbers, uppercase letters, and special characters).  

2. **Duplicate Email Check**:  
   - The function queries the database to see if a user with the provided email already exists.  
   - If a match is found, an error (`"Email already in use"`) is thrown.  

3. **Password Hashing**:  
   - **`bcrypt.genSalt(10)`**: Generates a unique salt for the password hashing process to enhance security.  
   - **`bcrypt.hash(password, salt)`**: Hashes the password with the generated salt.  

4. **User Creation**:  
   - The function creates a new user in the database using `User.create`. The hashed password is stored instead of the plain text password.  

5. **Token Creation and Response**:  
   - Similar to the login process, a token is generated and included in the response alongside the user’s email.  

---
## Approach 2: Model-Based Refactoring Approach  

In this refactored version, the authentication logic is encapsulated within the model's static methods. Here’s the breakdown of each part:  

### File: `userModel.js`

**Initial Setup** 

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
```

- **`mongoose`**: Manages the database connection and schema definitions for MongoDB.  
- **`bcryptjs`**: Used for securely hashing passwords during signup and validating them during login.  
- **`validator`**: A library for validating email formats and checking password strength.  


**Schema Definition**

```js
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
```

- **Schema Definition**:  
  - `email`: A required and unique string to store the user’s email.  
  - `password`: A required string to store the user’s hashed password.  
- The schema defines the structure of documents stored in the "users" collection.  


**Static Signup Method** 

```js
// Static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};
```

1. **Input Validation**:  
   - Ensures both `email` and `password` are provided.  
   - Checks the validity of the email using `validator.isEmail`.  
   - Verifies the password strength using `validator.isStrongPassword`.  

2. **Duplicate Email Check**:  
   - **`this.findOne({ email })`**: Searches for an existing user with the same email.  

3. **Password Hashing**:  
   - **`bcrypt.genSalt`**: Generates a salt to enhance password hashing.  
   - **`bcrypt.hash`**: Hashes the password with the generated salt.  

4. **User Creation**:  
   - Static methods in Mongoose allow us to define reusable logic that operates at the **model level** rather than the **instance level**. 
   - **`this.create`**: Creates and stores a new user document in the database with the hashed password. 
   - In Mongoose, when you define **static methods** inside your schema (like `userSchema.statics.signup`), the **`this`** keyword refers to the **model** itself. So when you use `this.create`, it's like you're telling Mongoose to search for a user using the model that the schema is attached to. You don’t need to reference the model by name (like `User.create`) because `this` already knows which model to use. 

5. **Return Value**:  
   - The created user object is returned, ready to be used by the controller.  

**Static Login Method** 

```js
// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};
```

1. **Input Validation**:  
   - Ensures that both `email` and `password` are provided.  

2. **Email Lookup**:  
   - Static methods in Mongoose allow us to define reusable logic that operates at the **model level** rather than the **instance level**. 
   - **`this.findOne({ email })`**: Searches the database for a user with the provided email.  
   - If no user is found, an error (`"Incorrect email"`) is thrown.  
   - In Mongoose, when you define **static methods** inside your schema (like `userSchema.statics.login`), the **`this`** keyword refers to the **model** itself. So when you use `this.findOne`, it's like you're telling Mongoose to search for a user using the model that the schema is attached to. You don’t need to reference the model by name (like `User.findOne`) because `this` already knows which model to use.

3. **Password Verification**:  
   - **`bcrypt.compare`**: Compares the provided password with the hashed password stored in the database.  
   - If the passwords don’t match, an error (`"Incorrect password"`) is thrown.  

4. **Return Value**:  
   - The authenticated user object is returned, ready for token generation.  


### File:  `userController.js`

**Token Helper Function** 

```js
const User = require("../models/userModel2");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
```

- **`createToken`**:  
  - Generates a JSON Web Token for a given user ID (`_id`).  
  - Uses a secret key (`process.env.SECRET`) to sign the token and sets an expiration of 3 days.  


**Login Controller**

```js
// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

1. **Delegate to Model**:  
   - The function calls `User.login(email, password)` to authenticate the user.  
   - This method encapsulates all validation and authentication logic.  

2. **Token Generation**:  
   - On successful login, a JWT is created using the authenticated user’s ID.  

3. **Response**:  
   - The response includes the user’s email and the JWT.  
   - Any errors are returned with a status code of 400 and an error message.  


**Signup Controller**

```js
// Signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
```

1. **Delegate to Model**:  
   - The function calls `User.signup(email, password)` to handle all signup logic.  

2. **Token Generation**:  
   - A JWT is created using the new user’s ID.  

3. **Response**:  
   - The response includes the user’s email and the JWT.  
   - Errors are handled similarly to the login controller.  

---

## Comparing the Two Approaches  

| **Aspect**               | **Controller-Centric Design** | **Model-Based Refactoring**        |
|--------------------------|-------------------------------|-------------------------------------|
| **Complexity**           | Higher in controllers         | Balanced between model and controller |
| **Readability**          | Bulky, harder to follow       | Cleaner, focused controllers        |
| **Maintainability**      | Harder to refactor            | Easier to update authentication logic |
| **Reusability**          | Limited                      | Highly reusable logic              |

---

## Conclusion  

While both approaches achieve the same functionality, using static methods provides a cleaner, modular, and maintainable structure. By encapsulating authentication logic within the model, you adhere to best practices like the Single Responsibility Principle (SRP), making the codebase more scalable and easier to debug.  
