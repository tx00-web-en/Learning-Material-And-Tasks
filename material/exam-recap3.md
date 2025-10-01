# Activity

> **This activity is designed to help you prepare for the exam.** It is recommended that you complete all the steps independently. However, you may ask for help from members of your breakout room if needed.  

> Please ensure that you make at least **three commits during the morning session** and **three commits during the afternoon session.**  


## Introduction

In the morning session, we will build a full-stack application **without authentication**. Additionally, we will write **API tests**. Sample reference code is available for both the API and the testing. 

Later, during the afternoon session, we will add **user administration** and **protect** the routes.

- Approach this task **iteratively** for structured development:  
  - **Step 1:** Adding and Fetching properties  
  - **Step 2:** Reading and Deleting a Single property  
  - **Step 3:** Updating a property
  - **Step 4:** write **API tests**

You may refer to the **sample solution code from last Monday** as a reference (**branches 1-3**): [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

You may also refer to this **sample API tests** as a reference: [tours-no-auth.test.js](./src/tours-no-auth.test.js): Tests for endpoints. 
---

## Deliverables

1. **Code** for **API V1** (*without* authentication)  
2. **Code** for **frontend V1**  (*without* authentication) 
3. Backend **tests** for API V1  
4. **Self-assessment**  
5. **Self-grading** of your code  



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
    zipCode: { type: String, required: true } // Postal/ZIP code for the location
  },
  squareFeet: { type: Number, required: true }, // Total area of the property in square feet
  yearBuilt: { type: Number, required: true } // Year the property was constructed
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
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
