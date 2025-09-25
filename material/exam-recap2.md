# Activity

We will continue from the first activity and use the same **products model**, but this time, we will **modify the user model** to include additional details. 

Additionally, we will **deploy** the backend to **Render**.

To assist you, you can refer to the sample solution code from Monday as a reference: [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

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
    lastLogin: { type: Date, default: Date.now },
    bio: { type: String, required: true }, 
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
```

By the end of this activity, you will have a **more refined full-stack application** with an enhanced user model and a successfully deployed backend on **Render**.

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

