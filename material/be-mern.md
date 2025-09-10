# Optional Session 16:30 - 19:30

- [Creating and Referencing Mongoose Schemas](#creating-and-referencing-mongoose-schemas)
- [Links](#about-the-app)

##  Creating and Referencing Mongoose Schemas

In this section, we will explore how to define a Mongoose schema and reference another schema using `mongoose.Schema.Types.ObjectId`. We will walk through the `Goal` model, which references a `User` schema, and then discuss how to implement authentication middleware to associate goals with authenticated users.

### Setup

Please clone the repository:
```sh
git clone https://github.com/tx00-resources-en/week5-be-mern
```

Rename the `.envexample` to `.env` and add your MONGO_URI
1. Install dependencies

```sh
npm install
```

2.  Run Server

```sh
npm run dev
```

### The `Goal` Model

Let's start by defining the `Goal` schema where each goal is associated with a user.

```javascript
const mongoose = require('mongoose');

// Defining the Goal schema with user field referencing the User schema
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Referencing the User model
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Goal', goalSchema);
```

---

### Code Explanation

1. **Importing Mongoose**:
   ```javascript
   const mongoose = require('mongoose');
   ```
   - We import Mongoose to interact with MongoDB using schemas and models, making it easier to work with data in a structured way.

2. **Defining the Goal Schema**:
   ```javascript
   const goalSchema = mongoose.Schema(
     {
       user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
       },
       text: {
         type: String,
         required: [true, 'Please add a text value'],
       },
     },
     {
       timestamps: true,
     }
   );
   ```
   - **user**: This field references another schema, specifically the `User` schema. It uses `mongoose.Schema.Types.ObjectId` to store the ID of a `User` document. The `ref: 'User'` part tells Mongoose that this field is a reference to the `User` model, allowing us to retrieve the associated user when querying.
   - **text**: This is a simple string field required for each goal. The custom error message `'Please add a text value'` will be shown if this field is missing.
   - **timestamps**: Automatically adds `createdAt` and `updatedAt` fields, so we know when a goal was created or updated.

3. **Exporting the Model**:
   ```javascript
   module.exports = mongoose.model('Goal', goalSchema);
   ```
   - This line creates and exports a Mongoose model named `Goal` based on the `goalSchema`. This model can be used throughout your application to create, read, update, and delete goals in the MongoDB database.

---
## Referencing One Schema from Another

In Mongoose, referencing one schema from another is done using the `ref` option. Here's how it works in the `Goal` schema:

```javascript
user: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'User',
}
```

- **`type: mongoose.Schema.Types.ObjectId`**: This specifies that the `user` field will store an ObjectId, which uniquely identifies documents in MongoDB.
- **`ref: 'User'`**: This tells Mongoose that the ObjectId stored in this field corresponds to a document from the `User` collection. When querying, we can use Mongoose's `populate()` method to retrieve the full user document.



### Populating the `User` Field

To retrieve the full `User` document (instead of just the `user` ObjectId), we can use the `populate()` method. This method replaces the ObjectId with the actual document it refers to.

**Example:**

```javascript
const goals = await Goal.find().populate('user');
```

In this example, the `user` field in each goal will be populated with the full `User` document, instead of just the ObjectId.


### Example Usage of Middleware

To ensure that only authenticated users can create or update goals, we use middleware to extract the user from a JWT token. This middleware will attach the user’s data to the `req` object, allowing us to reference the authenticated user in our route handlers.

Here’s an example of middleware for user authentication:

```javascript
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
```

In this example, middleware is used to authenticate users and associate the logged-in user's identity with actions they perform, like creating or updating goals. Here's an in-depth breakdown of how it works, especially in relation to adding the user ID to the `Goal` model.

### Key Steps in Middleware

1. **Extracting the JWT Token:**
   The middleware checks if the request contains an `Authorization` header, specifically one that starts with "Bearer." This is how JWT tokens are typically sent in API requests. If such a token exists, the middleware extracts it from the header:
   
   ```javascript
   token = req.headers.authorization.split(' ')[1];
   ```

2. **Verifying the Token:**
   Once the token is extracted, the middleware uses `jsonwebtoken` (`jwt.verify`) to decode it. Decoding the token verifies the user's authenticity, ensuring that the token is valid and not expired. The `JWT_SECRET` stored in environment variables is used to verify the integrity of the token:
   
   ```javascript
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   ```

3. **Fetching User Information:**
   After the token is successfully decoded, it contains the user's ID, which was encoded when the token was first created during user login or registration. The middleware uses this ID to fetch the user’s information from the database (excluding the password) and attaches it to the `req.user` object:
   
   ```javascript
   req.user = await User.findById(decoded.id).select('-password');
   ```

   This step is crucial because by attaching the user information to the request object, this `req.user` becomes available to any route handler or controller that the request passes through. It allows these routes to know which user is making the request.

4. **Handling Unauthorized Access:**
   If the token is invalid or missing, the middleware throws an error and returns a `401 Unauthorized` status code, preventing any further execution of the route handler.

### Adding the User ID to the `Goal` Model

Now that the middleware attaches the authenticated user’s information to the `req.user` object, we can easily associate this user with any resource they create, such as a `Goal`. Here’s how this could look in practice:

In the route handler for creating or updating goals, we can reference the `req.user` object to set the `user` field in the `Goal` model.

For example:

```javascript
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
})
```

### Explanation:

1. **Creating a Goal:**
   When a user submits a request to create a goal, the route handler can access the `req.user.id` (set by the middleware) to associate the goal with the logged-in user. In this case, the `Goal` model will have a `user` field (typically an ObjectId that references the `User` model), which stores the user’s ID.
   
   ```javascript
   const goal = await Goal.create({
     text: req.body.text,
     user: req.user.id,  // This associates the new goal with the authenticated user
   });
   ```

2. **Updating a Goal:**
   Before updating a goal, we first check whether the goal belongs to the authenticated user. The `goal.user.toString()` checks if the user ID associated with the goal matches the current user's ID (`req.user.id`). If they match, the user is authorized to update the goal; otherwise, an error is thrown.

   ```javascript
   if (goal.user.toString() !== req.user.id) {
     res.status(401)
     throw new Error('User not authorized');
   }
   ```

### Benefits of Using Middleware for Authentication:
- **Centralized Authentication:** The `protect` middleware ensures that authentication logic is written once and applied consistently across multiple routes.
- **User Context:** By attaching the user’s details to the `req` object, all route handlers can easily reference the authenticated user without needing to repeat token verification logic.
- **Security:** Middleware ensures that only authenticated users can access specific routes, safeguarding protected resources like goals.




---
## About the App

This is the goalsetter app from the Learn the MERN Stack series on YouTube:
- [Part 1:  Express & MongoDB Rest API ](https://youtu.be/-0exw-9YJBo?si=Zx3Ukk35G0N2Ne5-)
- [Part 2: JWT Authentication](https://youtu.be/enopDSs3DRw?si=y-9Tza1uHE7r7png)

---

## Links

- [Mongoose: Reference a schema in another schema (with examples)](https://www.slingacademy.com/article/mongoose-reference-a-schema-in-another-schema-with-examples/)