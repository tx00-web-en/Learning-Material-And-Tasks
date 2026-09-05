# Building an Express API Server with Mongoose

When building a backend for a web application, you'll often need to work with a database to store and retrieve data. For JavaScript developers, **MongoDB**, a NoSQL database, is a popular choice due to its flexible schema and ease of use. However, working directly with MongoDB can be cumbersome and prone to errors, especially when dealing with complex data structures. This is where **Mongoose**, an Object Data Modeling (ODM) library for MongoDB and Node.js, comes into play.

In this guide, we'll explore how to use Mongoose with an Express API server to simplify database operations, ensure data consistency, and make your development process more efficient.

## Table of Contents

1. [Understanding MongoDB: Collections vs. SQL Tables](#understanding-mongodb-collections-vs-sql-tables)
2. [Why Use Mongoose?](#why-use-mongoose)
3. [Defining Schemas and Models](#defining-schemas-and-models)
4. [Connecting to a MongoDB Database](#connecting-to-a-mongodb-database)
5. [CRUD Operations with Mongoose](#crud-operations-with-mongoose)
6. [Asynchronous Operations with `async/await`](#asynchronous-operations-with-asyncawait)
7. [Using Environment Variables for Configuration](#using-environment-variables-for-configuration)
8. [Using MongoDB Compass as a GUI Tool](#using-mongodb-compass-as-a-gui-tool)
9. [Schema Types and Validation](#schema-types-and-validation)
10. [Extra Material](#extra-material)

---

## Understanding MongoDB: Collections vs. SQL Tables

Before diving into Mongoose, let's briefly understand how MongoDB structures its data. MongoDB stores data in **collections**, which are somewhat similar to **tables** in a traditional SQL database. However, there are key differences:

- **Flexibility**: Unlike SQL tables, which enforce a strict schema for each row, MongoDB collections can store documents with varying structures. For example, a `users` collection in MongoDB could store documents with different fields, while an SQL table would require each row to have the same fields.

- **Schema-less Nature**: MongoDB’s flexibility allows rapid development and iteration without worrying about migrations or schema changes, but this can lead to inconsistencies in data if not managed properly.

### Why Use Mongoose?

While MongoDB's flexibility is an advantage, it can make managing and validating data challenging. This is where **Mongoose** shines. Mongoose provides a schema-based solution to model your application data, which brings several benefits:

- **Schema-Based Modeling**: Mongoose schemas define the structure of the data at the application level, enforcing consistency and making it easier to manage and validate data.
- **Abstraction and Convenience**: Mongoose provides a higher level of abstraction, so you don't need to write low-level code for database operations. It simplifies complex MongoDB operations into straightforward JavaScript methods.
- **Built-in Validation**: Mongoose schemas allow you to enforce data validation, ensuring the data stored in your MongoDB is accurate and follows the desired structure.

### Defining Schemas and Models

Mongoose allows you to define a schema, which represents the structure of documents within a collection.

#### Example: Blog Schema

**Without Mongoose Schema:**

If you don't use Mongoose, you might end up storing data like this:

```json
{
  "title": "some blog3",
  "body": "here is ...",
  "author": "Sami"
}
```

This approach does not enforce any structure, so you might end up with inconsistent data. For instance, some documents might lack the `author` field or have incorrect data types.

**With Mongoose Schema:**

Mongoose allows you to define a schema that specifies the fields, their data types, and validation rules:

```javascript
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
```

- **Schema**: Defines the shape and validation rules of documents in the collection.
- **Model**: A compiled representation of the schema that provides an interface to interact with the MongoDB collection.

---
## Connecting to a MongoDB Database

To connect to a MongoDB database, you can use the following code:

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to database`);
};

module.exports = connectDB;
```

- **a) How to Connect**: This code uses `mongoose.connect` to connect to a MongoDB instance. The connection string (`MONGO_URI`) is stored in an environment variable for security.
- **b) Optimization**: Hardcoding the connection string or database credentials is not secure. Using environment variables (`process.env`) allows you to keep sensitive information out of your source code.
- **c) Local vs. Production**: In development, you can use a local MongoDB server (`mongodb://localhost:27017/web-dev`). In production, it's better to use a managed cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas) for scalability, security, and reliability.


---
## CRUD Operations with Mongoose

Mongoose provides several methods to perform CRUD operations on the data:

- **Create**: `Blog.create({ title, body, author });`
- **Read**: `Blog.find({})`, `await Blog.findById(id)`
- **Update**: `Blog.findOneAndUpdate(filter, updateData, options)`
- **Delete**: `Blog.findOneAndDelete(filter)`

#### Difference Between `PUT` and `PATCH`

- **`PUT`**: Replaces the entire document. Use this when you want to completely overwrite an existing resource.
- **`PATCH`**: Updates only the specified fields. Use this when you want to modify a part of an existing resource without affecting other fields.

---
## Asynchronous Operations with `async/await`

Mongoose methods are asynchronous because database operations can take time to complete. JavaScript uses the **event loop** to manage asynchronous operations, preventing the program from blocking while waiting for a response from the database.

The `async` and `await` keywords make it easier to work with asynchronous code:

```javascript
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

- **`async`**: Marks the function as asynchronous.
- **`await`**: Pauses the function execution until the promise resolves, making the code easier to read and maintain.

---
## Using Environment Variables for Configuration

To keep your code secure and flexible, store sensitive information like the database URI in a `.env` file:

1. Create a `.env` file in the root of your project:

   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/web-dev
   ```

2. Use these variables in your application:

   ```javascript
   const port = process.env.PORT || 4000;
   ```

This allows you to use different configurations for development and production environments.

---
## Using MongoDB Compass as a GUI Tool

[**MongoDB Compass**](https://www.mongodb.com/products/compass) is a graphical interface that makes it easier to visualize, manage, and debug your MongoDB data. You can use it to:

- View collections and documents
- Perform queries and aggregations
- Manage indexes
- Monitor performance

Compass is an excellent tool for both beginners and experienced developers to interact with MongoDB without writing queries directly.

---
## Schema Types and Validation

Mongoose supports various schema types to define the structure of your documents:

- **String**: Represents text data.
- **Number**: Represents numeric data.
- **Date**: Represents dates.
- **Array**: Represents a list of items.
- **Boolean**: Represents true/false values.
- **ObjectId**: Represents MongoDB object identifiers.

You can also add validation rules to ensure data integrity:

```javascript
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

- **`required: true`**: Ensures that a field must be present when creating or updating documents.


---
## FAQ:

### 1. **Mongoose Schema: `{ timestamps: true }`**

```javascript
const carSchema = new mongoose.Schema({
  model: String,
  color: String,
  age: Number,
  // other fields
}, { timestamps: true });
```

**Explanation:**

- **`{ timestamps: true }`**: This option automatically adds two fields to the schema: `createdAt` and `updatedAt`. 
  - **`createdAt`**: This field will store the date and time when the document was first created.
  - **`updatedAt`**: This field will store the date and time of the last update to the document.
  
These fields are automatically managed by Mongoose; you don't need to set or update them manually.

### 2. **Understanding Mongoose Document Fields**

#### a) **Type of `_id`**

- The type of `_id` is **`ObjectId`**. This is a special type in MongoDB used as the default primary key for all documents. The `ObjectId` is a 12-byte identifier that is unique across all documents in a MongoDB collection.

#### b) **How to Change `_id` to `id`**

To change `_id` to `id`, you can use the Mongoose `toJSON` or `toObject` method with a custom transformation. This can be done at the schema level:

```javascript
carSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;  // create a new field 'id' with the value of '_id'
    delete ret._id;    // remove the '_id' field
    return ret;
  }
});
```

This transformation will create an `id` field with the same value as `_id` and remove `_id` from the response.



#### c) **What is `__v`?**

- **`__v`** is a special field in Mongoose documents that indicates the version of the document. Mongoose uses this internally for versioning control when performing updates to prevent concurrent writes from overwriting each other (optimistic concurrency control). The `__v` field is automatically incremented by Mongoose every time you update a document.

- The `__v` field is added by default. You can disable it if you don’t want versioning (not recommended for concurrent updates).

  ```javascript
  const userSchema = new Schema({
    // schema definition
  }, { timestamps: true, versionKey: false  }
  ```

  - **Timestamps:** If you need to track when documents are updated, use the `timestamps` option.

- To ignore `__v` so it is not returned in the response, you can also use the `toJSON` or `toObject` method with a custom transformation, as shown below:

```javascript
carSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;     // create a new field 'id' with the value of '_id'
    delete ret._id;       // remove the '_id' field
    delete ret.__v;       // remove the '__v' field
    return ret;
  }
});
```

By setting the `toJSON` transformation, Mongoose will apply these changes every time the document is serialized to JSON, such as when sending a response from an API.


> [!TIP]
> `__v` increments **only when you use `.save()`** on a document (or when optimistic concurrency is enabled).  If you’re using direct update queries (`updateOne`, `findByIdAndUpdate`, etc.), Mongoose does **not** increment `__v` by default. More details [here](./incrementing_v.md)


### Full Example of Mongoose Schema with Modifications

Here's a full example incorporating all these adjustments:

```javascript
const carSchema = new mongoose.Schema({
  model: String,
  color: String,
  age: Number,
}, { timestamps: true });

// Customize the output for JSON serialization
carSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;     // Rename '_id' to 'id'
    delete ret._id;       // Remove the '_id' field
    delete ret.__v;       // Remove the '__v' field
    return ret;
  }
});

const Car = mongoose.model('Car', carSchema);
```

With this schema, whenever a `Car` document is converted to JSON (like when sending it as an API response), it will include an `id` field instead of `_id` and exclude the `__v` field.

--
## Extra Material

- Chapter 7: Express.js Request Object: `Pro Express.js, Azat Mardan`
- Chapter 5. Building a data model with MongoDB and Mongoose: `Getting MEAN with Mongo, Express, Angular, and Node, Second Edition, Simon Holmes, clive harber`
- Chapter 8. Persisting your data with MongoDB: `Express in Action, Evan Hahn`
- [ObjectIds in Mongoose](https://masteringjs.io/tutorials/mongoose/objectid)
- [Understanding ObjectId data type in MongoDB](https://www.slingacademy.com/article/understanding-objectid-data-type-in-mongodb-with-examples/)
- [Mongoose: Reference a schema in another schema (with examples)](https://www.slingacademy.com/article/mongoose-reference-a-schema-in-another-schema-with-examples/)
