# React Authentication

In this pair programming activity, we'll reinforce the concepts covered on Monday morning, specifically focusing on React authentication and custom hooks.

You'll receive a starter code that, while not adhering to best practices, ensures a functional frontend that integrates seamlessly with the backend. This exercise will also highlight the necessity of using `useReducer` and `useContext` hooks, which will be explored further in the upcoming week.

###  Iteration 1:

1. Clone the starter repository: [Week 6 Starter Code](https://github.com/tx00-resources-en/week6-fepp-starter)  
   - After cloning, **delete** the `.git` directory.

2. Inside the `backend` folder, copy `.env.example` to `.env`, and replace the environment variables `SECRET` and `MONGO_URI` with your own values.  
   - Generate a **strong** `SECRET`, for example:  
     ```js
     require("crypto").randomBytes(64).toString("hex")
     ```  
   - Alternatively, you can use [this online service](https://www.browserling.com/tools/random-hex).

3. From within the `backend` folder:  
   - Run `npm install`  
   - Start the server with `npm run dev`

4. From within the `frontend` folder:  
   - Run `npm install`  
   - Start the client with `npm run dev`

5. Verify the functionality of the application:  
   - Check that you can successfully **register/signup** and **log in**.  
   - Use a strong password (e.g., `4wa95=Vx#`), otherwise you will get an error.

### Iteration 2:

Create a `useSignup` hook and refactor the `SignupComponent` component to incorporate this hook. Test the application's functionality.

### Iteration 3:

Create a `useLogin` hook and refactor the `LoginComponent` component accordingly. Test the application's functionality.

### Iteration 4:

- Enhance the `SignupComponent` form by introducing a "`password2`" field. This ensures users enter the same password in both "`password`" and "`password2`" fields for password verification. 
- Do you need to make any adjustments on the backend?

### Iteration 5:

Refactor the code responsible for token storage, retrieval, and removal to use `localSession` instead of `localStorage`.


### Iteration 6: Refactoring `loginUser` Controller  

Iterations 6 and 7 are designed to complement the backend pair programming activity, addressing some confusion with the **User Model**. It’s crucial that you and your pair fully understand these aspects, as they will be essential for the coding marathon and your project.  

**Preparation Steps**

1. Stop the backend server.  
2. Navigate to the `backend-v2` folder, copy the `.env.example` file to `.env`, and update the `SECRET` and `MONGO_URI` variables with your unique database URI and secret key.  
3. Run `npm install`, then start the server using `npm run dev`.  
4. Test the server with Postman and the frontend to ensure it’s functioning correctly.  


In the `backend-v2` server, all authentication logic is handled in the controller. The **User Model** is simplified as follows:  

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
```  

The logic for **logging in** resides in the controller, particularly for verifying credentials:  

```js
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error('Incorrect password');
    }

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```  

**Tasks**  

1. Compare this version of the `loginUser` controller to the one used on Monday and in Iterations 1–5 (`backend` folder).  
2. Specifically, analyze the following:  
   - What is the purpose of `userSchema.statics.login` in `userModel.js`?  
   - Compare `User.findOne({ email })` to `this.findOne({ email })`. When and why do we use `this` instead of the model's name?  
   - Why is `bcrypt` imported in `userController.js` and not in `userModel.js`?  
3. Discuss which approach you plan to use for your project and explain why.  
4. Summarize your discussion in the `README.md` file.  

---

### Iteration 7: Refactoring `signupUser` Controller  

The logic for **registering users** is also in the controller:  

```js
const validator = require('validator');

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const exists = await User.findOne({ email });

    if (exists) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```  

**Tasks**  

1. Compare this version of the `signupUser` controller to the one used on Monday and in Iterations 1–5 (`backend` folder).  
2. Specifically, analyze the following:  
   - What is the purpose of `userSchema.statics.signup` in `userModel.js`?  
   - Compare `User.create({ email, password: hash })` to `this.create({ email, password: hash })`. When and why do we use `this` instead of the model's name?  
   - Why is `validator` imported in `userController.js` and not in `userModel.js`?  
3. Discuss which approach you plan to use for your project and explain why.  
4. Summarize your discussion in the `README.md` file.  



<!-- 
### Iteration 8:

Refactor the `SignupComponent` component to incorporate the `useField` hook covered in the frontend session. Test the application's functionality.

### Iteration 9:

Refactor the `LoginComponent` component to incorporate the `useField` hook covered in the frontend session. Test the application's functionality. 
-->

---

**Happy coding!** :rocket: :heart: 


