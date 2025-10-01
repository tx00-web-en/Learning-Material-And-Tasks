# Activity

## Introduction

In this activity, we will add **user administration** and **protect** the routes from the morning session. Additionally, we will write **API tests**. Sample reference code is available for both the API and the testing.

Approach this task **iteratively** for structured development:
  - **Step 1:** Add user authentication
  - **Step 2:** Protect Routes
  - **Step 3:** write **API tests**

You may refer to the **sample solution code from last Monday** as a reference (**branches 6-7**): [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

You may also refer to these **sample API tests** as a reference:  
  - [**`examples/tours-auth.test.js`**](./src/tours-auth.test.js): Tests for protected Tours endpoints.
  - [**`examples/users.test.js`**](./src/users.test.js): Tests for user authentication and user-related endpoints. 

---

## **Deliverables**

1. **Code** for **API V2** (*with* authentication)  
2. **Code** for **frontend V2** (*with* authentication)  
3. Backend **tests** for API V2  
4. **Self-assessment**  
5. **Self-grading** of your code

---

## Data Models

### Property Model


```javascript
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Short, descriptive name of the property
  type: { type: String, required: true }, // Property type, e.g., Apartment, House, Commercial
  description: { type: String, required: true }, // Detailed description of the property
  price: { type: Number, required: true }, // Cost of the property in relevant currency
  location: {
    address: { type: String, required: true }, // Street address of the property
    city: { type: String, required: true }, // City where the property is located
    state: { type: String, required: true }, // State or region of the property
    zipCode: { type: String, required: true } // Postal/ZIP code for the location
  },
  squareFeet: { type: Number, required: true }, // Total area of the property in square feet
  yearBuilt: { type: Number, required: true } // Year the property was constructed
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
```

### User Model


```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true }, // Full name of the user
    username: { type: String, required: true, unique: true }, // Unique username for login
    password: { type: String, required: true }, // Hashed password for authentication
    phone_number: { type: String, required: true }, // Contact phone number
    profilePicture: { type: String, required: false }, // URL of the user's profile picture
    gender: { type: String, required: true }, // Gender of the user
    date_of_birth: { type: Date, required: true }, // User's birth date
    role: { type: String, required: true, enum: ['admin', 'user', 'moderator'], default: 'user' }, // User role
    address: {
      street: { type: String, required: true }, // Street address
      city: { type: String, required: true }, // City
      state: { type: String, required: true }, // State or region
      zipCode: { type: String, required: true } // Postal/ZIP code
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
```


---

## Note

To clone a specific branch from a GitHub repository, you can use the following command in your terminal:

**General Syntax:**
```sh
git clone --branch <branch_name> <repository_url> <directory_name>
```
**Example:**
```sh
git clone --branch branch1-get-post https://github.com/tx00-resources-en/week7-fepp-en.git branch1-get-post
```
