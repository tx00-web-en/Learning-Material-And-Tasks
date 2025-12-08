# Activity

## Introduction

- In the morning session, we will build a full-stack application **without authentication**. Additionally, we will write **API Tests**. 

- Approach this task **iteratively** for structured development:  
  - **Iteration 1:** Adding and Fetching properties  
  - **Iteration 2:** Reading and Deleting a Single property  
  - **Iteration 3:** Updating a property
  - **Iteration 4:** write **API Tests**

> Later, during the afternoon session, we will add **user administration** and **protect** the routes. 

---

## Important

1. Commit Format: **use this commit format**:

   ```bash
   git add .
   git commit -m "[iterX] Your commit message"
   git push
   ```

2. Please do not use AI. If you need assistance, you may refer to **sample solution code from last Monday** as a reference (**branches 1-3**): [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

3. We will use only one branch and alternate the driver/navigator role after each iteration.

---

## Deliverables

1. **Code** for **API V1** (*without* authentication)  
2. **Code** for **frontend V1**  (*without* authentication) 
3. Backend **tests** for API V1  


---

## Data Model

Here's the property schema:  

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

---

## Activity Checklist

### Iterations
- [ ] **Iteration 1:** Added and fetched properties  
- [ ] **Iteration 2:** Read and deleted a single property  
- [ ] **Iteration 3:** Updated a property  
- [ ] **Iteration 4:** Wrote API tests  


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
- [ ] Code for **API V1** (*without authentication*)  
- [ ] Code for **Frontend V1** (*without authentication*)  
- [ ] Backend **tests** for API V1  

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
``` 

> DL 20:00 + Strict pair programming
> Sample reference code is available for both the API and the testing. 
> You may also refer to this **sample API tests** as a reference: [tours-no-auth.test.js](./src/tours-no-auth.test.js): Tests for endpoints. 
> It is recommended that you complete all the steps independently. However, you may ask for help from members of your breakout room if needed.  
> Please ensure that you make at least **three commits during the morning session** and **three commits during the afternoon session.** 

-->
