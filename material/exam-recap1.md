# Activity

## Introduction

In this activity, we will build a full-stack application using a **user model** similar to the one implemented on **Monday morning**. However, instead of dealing with jobs, we will focus on **products**, which will follow the same structure and field count as the jobs model.

To assist you, you can refer to the sample solution code from Monday as a reference: [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

Approach this task **iteratively** and use **Git branching** for structured development:

<!-- 
1. **Basic CRUD Operations (Without Authentication)**
   - Step 1: Adding and Fetching Products
   - Step 2: Reading and Deleting a Single Product
   - Step 3: Updating a Product
2. **User Authentication & Managing Users**
3. **Implementing Protected Routes**
-->

1. **Basic CRUD Operations (Without Authentication)**
   - Step 1: **Adding** and **Fetching Products**. This corresponds to the **GET all jobs** and **POST (add one job)** operations shown in [Monday's sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch1-get-post).
   - Step 2: **Reading** and **Deleting a Single Product**. This corresponds to the Adds **GET one job** and **DELETE one job** operations shown in [Monday's sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch1-get-post).
   - Step 3: **Updating a Product**. This corresponds to the **UPDATE one job** operation shown in [Monday's sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch3-update-router).
2. **User Authentication & Managing Users**. This corresponds to the **user registration and login** functionality shown in [Monday's sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch6-auth). 
3. **Implementing Protected Routes**. This corresponds to **route protection** shown in [Monday's sample solution](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch7-protect-jobs).

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
    username: { type: String, required: true, unique: true },
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

