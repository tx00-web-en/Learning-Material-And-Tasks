# Activity

## Introduction

In this activity, we will add **user administration** and **protect** the routes from the morning session. Additionally, we will write **API Tests**.

Approach this task **iteratively** for structured development:
  - **Iteration 5:** Add user authentication
  - **Iteration 6:** Protect Routes
  - **Iteration 7:** write **API Tests**

---

## Important

1. Commit Format: **use this commit format**:

   ```bash
   git add .
   git commit -m "[iterX] Your commit message"
   git push
   ```

2. Please do not use AI. If you need assistance, you may refer to **sample solution code from last Monday** as a reference (**branches 6-7**): [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

3. We will use only one branch and alternate the driver/navigator role after each iteration.

---

## **Deliverables**

1. **Code** for **API V2** (*with* authentication)  
2. **Code** for **frontend V2** (*with* authentication)  
3. Backend **tests** for API V2, explicitly covering **authentication** and **protected routes**

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
  },
  squareFeet: { type: Number, required: true }, // Total area of the property in square feet
  yearBuilt: { type: Number, required: true }, // Year the property was constructed
  bedrooms: { type: Number, required: true } // Number of bedrooms in the property
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
    email: { type: String, required: true, unique: true }, // User email for login
    password: { type: String, required: true }, // Hashed password for authentication
    phoneNumber: { type: String, required: true }, // Contact phone number
    profilePicture: { type: String, required: false }, // URL of the user's profile picture
    gender: { type: String, required: false }, // Gender of the user
    dateOfBirth: { type: Date, required: true }, // User's birth date
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

## Deliverables

### Iterations
- [ ] **Iteration 5:** Added user authentication  
- [ ] **Iteration 6:** Protected routes  
- [ ] **Iteration 7:** Wrote API tests (covering authentication and protected routes)  


### Commit Format
- [ ] Used the correct commit format:  
  ```bash
  git add .
  git commit -m "[iterX] Your commit message"
  git push
  ```

### Collaboration
- [ ] Worked on **one branch only**  
- [ ] Alternated **driver/navigator roles** after each iteration  

### Deliverables
- [ ] **Code** for **API V2** (*with authentication*)  
- [ ] **Code** for **Frontend V2** (*with authentication*)  
- [ ] Backend **tests** for API V2 (explicitly covering authentication and protected routes)  


---

<!-- 

## Note

To clone a specific branch from a GitHub repository, you can use the following command in your terminal:

**General Syntax:**
```sh
git clone --branch <branch_name> <repository_url> <directory_name>
```
**Example:**
```sh
git clone --branch branch1-get-post https://github.com/tx00-resources-en/week7-fepp-en.git branch1-get-post

> You may also refer to these **sample API tests** as a reference:  
  - [**`examples/tours-auth.test.js`**](./src/tours-auth.test.js): Tests for protected Tours endpoints.
  - [**`examples/users.test.js`**](./src/users.test.js): Tests for user authentication and user-related endpoints. 


> Sample reference code is available for both the API and the testing.
``` 
-->
