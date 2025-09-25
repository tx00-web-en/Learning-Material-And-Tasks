# Optional Extra Task: Build a Fullstack Application

If you'd like extra practice building a fullstack application from scratch (e.g., over the weekend), you can use the **Course** and **User** models provided below. This activity is entirely optional and will not be graded.

#### Course Model

Here’s the course schema:

```javascript
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  fee: { type: Number, required: true },
  instructor: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});
```

#### User Model

Here’s the user schema:

```js
const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true }
}, { timestamps: true, versionKey: false });
```
