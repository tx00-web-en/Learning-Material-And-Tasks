# Optional Extra Task: Build a Fullstack Application

If you'd like extra practice building a fullstack application from scratch, you can use the **Event** and **User** models provided below. This activity is entirely optional and will not be graded.

- Approach this task **iteratively** for structured development:  
  - **Step 1:** Adding and Fetching properties  
  - **Step 2:** Reading and Deleting a Single property  
  - **Step 3:** Updating a property
  - **Step 4:** write **API tests**
  - **Step 5:** Add user authentication
  - **Step 6:** Protect Routes
  - **Step 7:** write **API tests**

You may refer to the **sample solution code from last Monday** as a reference (**branches 1-3 & 6-7**):  
- [GitHub Repository](https://github.com/tx00-resources-en/week7-fepp-en).

#### Course Model

Here’s the course schema:

```javascript
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});
```

#### User Model

Here’s the user schema:

```js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  occupation: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
}, { timestamps: true, versionKey: false });

module.exports = model('User', userSchema);
```


<!-- 
```js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  date_of_birth: { type: Date, required: true },
  address: { 
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  occupation: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
}, { timestamps: true, versionKey: false });

module.exports = model('User', userSchema);
``` 
-->