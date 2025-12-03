# Activity

## Introduction

In this activity, we will build a full-stack application using a **user model** similar to the one implemented on **Monday morning**. However, instead of dealing with jobs, we will focus on **products**, which will follow the same structure and field count as the jobs model.

To assist you, you can refer to the sample solution code from Monday as a reference: [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

Approach this task **iteratively** and use **Git branching** for structured development. **After completing each operation, commit your changes to Git.**

### Phase 1: Basic CRUD Operations (Without Authentication)

1. **Step 1: Adding and Fetching Products**
   - Implement **GET all products** and **POST (add one product)** endpoints
   - Reference: [Monday's sample solution - branch1-get-post](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch1-get-post)
   - **Commit after completing this step**

2. **Step 2: Reading and Deleting a Single Product**
   - Implement **GET one product** and **DELETE one product** endpoints
   - Reference: [Monday's sample solution -branch2-getone-delete](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch2-getone-delete)
   - **Commit after completing this step**

3. **Step 3: Updating a Product**
   - Implement **UPDATE one product** endpoint
   - Reference: [Monday's sample solution - branch3-update-router](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch3-update-router)
   - **Commit after completing this step**

### Phase 2: User Authentication & Managing Users

- Implement **user registration** and **login** functionality
- Reference: [Monday's sample solution - branch6-auth](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch6-auth)
- **Commit after completing this phase**

### Phase 3: Implementing Protected Routes

- Implement **route protection** for product operations (only authenticated users can manage products)
- Reference: [Monday's sample solution - branch7-protect-jobs](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch7-protect-jobs)
- **Commit after completing this phase**

---

## Data Models

### **Product Schema**
```js
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Electronics, Clothing, Furniture
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  supplier: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
```

### **User Model**
For this application, we will use **username** instead of email.

```js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    membership_status: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
```

By the end of this activity, you will have a **functional full-stack application** capable of managing products while incorporating **user authentication** and **secure routes**.

---

## Success Criteria

✓ **Complete all three phases** (Basic CRUD, Authentication, Protected Routes)  
✓ **Commit to Git after each operation/step** (you should have multiple commits showing incremental progress)  
✓ **Frontend and backend both functional** (follow the sample solution for both)  
✓ **All endpoints tested and working** (manually test via Postman and your frontend)

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


-------

<!-- 
1. **Basic CRUD Operations (Without Authentication)**
   - Step 1: Adding and Fetching Products
   - Step 2: Reading and Deleting a Single Product
   - Step 3: Updating a Product
2. **User Authentication & Managing Users**
3. **Implementing Protected Routes**
-->