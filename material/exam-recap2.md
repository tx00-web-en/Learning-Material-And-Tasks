# Activity - Part 2: User Model Refinement & API Testing

## Overview

- **Continue from Part 1** - You will use the same **products model** and protected routes
- **Modify the user model** to include new fields (roles and additional metadata)
  - Reference the [sample solution code](https://github.com/tx00-resources-en/week7-fepp-en) from Monday, specifically:
    - [User registration and login functionality](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch6-auth)
    - [Implementing Protected Routes](https://github.com/tx00-resources-en/week7-fepp-en/tree/branch7-protect-jobs)
- **Write API tests** using Jest and Supertest to cover all protected routes of the Products API

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

### **Updated User Model**

For this part, we will introduce a new **user schema** with modified fields to include user roles and additional metadata.

```js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }, // e.g., Admin, Seller, Buyer
    address: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
```

---

## Tasks

### Phase 1: Update User Model

- **Modify your User model** from Part 1 to match the updated schema above
- Remove fields: `phone_number`, `gender`, `date_of_birth`, `membership_status`
- Add fields: `role` (string with values like Admin, Seller, Buyer), `address`, `lastLogin`
- Update both your database and any related validation/authentication code
- **Commit after completing this phase**

### Phase 2: Write Jest & Supertest API Tests

- **Create a test file** for all protected product routes (POST, GET, UPDATE, DELETE)
- **Test scenarios should include:**
  - ✓ Authenticated requests (with valid token)
  - ✓ Unauthenticated requests (no token)
  - ✓ Invalid token
  - ✓ CRUD operations with different user roles 
- **Commit after completing this phase**

<!-- ### Phase 3: Deploy Backend to Render (Optional/Extra)

- Deploy your refined backend to Render
- Test all endpoints from the deployed URL
- Document the deployment URL
- **Commit after completing this phase** -->

---

## Success Criteria

✓ **User model successfully updated** (old fields removed, new fields added)  
✓ **All protected product routes are tested** with Jest & Supertest  
✓ **Test coverage includes both success and failure scenarios** (authenticated/unauthenticated requests)  
✓ **All tests pass** (run `npm test` successfully)  
✓ **Commit after each phase** showing incremental progress  
<!-- ✓ **(Optional) Backend deployed to Render** and tested -->

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

