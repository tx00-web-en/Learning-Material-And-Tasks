# React Authentication

In this pair programming activity, we'll reinforce the concepts covered on Monday morning, specifically focusing on React authentication and custom hooks.

You'll receive a starter code that, while not adhering to best practices, ensures a functional frontend that integrates seamlessly with the backend. This exercise will also highlight the necessity of using `useReducer` and `useContext` hooks, which will be explored further in the upcoming week. As you centralise authentication and field logic in this exercise, think about how it could later move into a global auth context.

---

## Important

1. Commit Format: **use this commit format**:

   ```bash
   git add .
   git commit -m "[iterX] Your commit message"
   git push
   ```

2. **DO NOT** delete the **.github** directory from the cloned repo.

3. There are **some hidden tests included**. The purpose of these is to avoid triggering false positives and to ensure that your solutions are evaluated accurately.

---

### Iteration 1

1. Clone the starter repository: [Week 6 Starter Code](https://github.com/tx00-resources-en/week6-fepp-starter).  
   - After cloning, **delete** the .git directory.

2. Inside the backend folder, copy `.env.example` to `.env`, and replace the environment variables `SECRET` and `MONGO_URI` with your own values.  
   - Generate a **strong** `SECRET`, for example:

     ```js
     require("crypto").randomBytes(64).toString("hex")
     ```

   - Alternatively, you can use [this online service](https://www.browserling.com/tools/random-hex).

3. From within the backend folder:

   ```bash
   npm install
   npm run dev
   ```

4. From within the frontend folder:

   ```bash
   npm install
   npm run dev
   ```

5. Verify the functionality of the application:  
   - Check that you can successfully **register/signup** and **log in**.  
   - Use a strong password (e.g., `4wa95=Vx#`), otherwise you will get an error.

<!-- 6. (Optional) From within the frontend folder, run the tests to make sure everything is still passing:

   ```bash
   npm test -- iteration1.test.jsx
   ``` -->

6. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter1] Complete setup"
   git push
   ```

✓ **Checkpoint:** Your project should now be set up with all dependencies installed and environment variables configured.

---

### Iteration 2

1. Create a `useSignup` hook and refactor the `SignupComponent` component to incorporate this hook.

   - Create `frontend/src/hooks/useSignup.js` (or `.jsx`), following the pattern from the session.
   - Refactor `SignupComponent` to use this hook instead of handling the signup logic directly.

<!-- 2. Test the application's functionality and run the frontend tests:

   ```bash
   npm run dev
   npm test -- iteration2.test.jsx

   ``` -->

2. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter2] Implement useSignup hook"
   git push
   ```

---

### Iteration 3

1. Create a `useLogin` hook and refactor the `LoginComponent` component accordingly.

   - Create `frontend/src/hooks/useLogin.js`.
   - Refactor `LoginComponent` to use this hook instead of handling the login logic directly.

<!-- 2. Test the application's functionality and run the frontend tests:

   ```bash
   npm run dev
   npm test -- iteration3.test.jsx
   ``` -->

2. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter3] Implement useLogin hook"
   git push
   ```

---

### Iteration 4

1. Enhance the `SignupComponent` form by introducing a `password2` field. This ensures users enter the same password in both `password` and `password2` fields for password verification.

2. Decide how to handle the `password` / `password2` check:
   - At minimum, validate in the frontend so users see an immediate error if the passwords do not match.
   - Consider whether you also want the backend to validate this (e.g., in the signup controller). Briefly justify your decision in a short note (for example, in `README.md` or as a comment in the code).

<!-- 3. Test the application's functionality and run the frontend tests:

   ```bash
   npm run dev
   npm test -- iteration4.test.jsx
   ``` -->

3. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter4] Add password confirmation"
   git push
   ```

---

### Iteration 5

1. Refactor the code responsible for token storage, retrieval, and removal to use `sessionStorage` instead of `localStorage`.

   - Look for auth-related logic in the frontend (e.g., in hooks, context, or utility files under src).
   - After refactoring, the user **should be logged out when the browser tab or window is closed** (because `sessionStorage` is cleared).

<!-- 2. Test login/logout flows and run the frontend tests:

   ```bash
   npm run dev
   npm test -- iteration5.test.jsx
   ``` -->

2. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter5] Use sessionStorage for tokens"
   git push
   ```

---

### Iteration 6: Analyze login approaches

From this iteration onward, use the backend-v2 folder for backend work (instead of backend), unless otherwise specified.

**Preparation Steps**

1. Stop the backend server if it is running.

2. Navigate to the backend-v2 folder, copy `.env.example` to `.env`, and update the `SECRET` and `MONGO_URI` variables with your unique database URI and secret key.

3. From within backend-v2:

   ```bash
   npm install
   npm run dev
   ```

4. Test the server with Postman and the frontend to ensure it’s functioning correctly.

In the backend-v2 server, all authentication logic is handled in the controller. The **User Model** is simplified as follows:

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

1. Compare this version of the `loginUser` controller to the one used in Iterations 1–5 (in the backend folder).

2. Specifically, analyze the following:
   - What is the purpose of `userSchema.statics.login` in `userModel.js`?
   - Compare `User.findOne({ email })` to `this.findOne({ email })`. When and why do we use `this` instead of the model's name?
   - Why is `bcrypt` imported in `userController.js` and not in `userModel.js` in this version?

3. Discuss which approach you plan to use for your project and explain why.

4. Summarize your discussion in a `README.md` file (for example `backend-v2/README.md`, or reuse the main project `README.md` – just be consistent about where you write it).

5. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter6] Analyze login approaches"
   git push
   ```

---

### Iteration 7: Analyze signup approaches

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

1. Compare this version of the `signupUser` controller to the one used in Iterations 1–5 (in the backend folder).

2. Specifically, analyze the following:
   - What is the purpose of `userSchema.statics.signup` in `userModel.js`?
   - Compare `User.create({ email, password: hash })` to `this.create({ email, password: hash })`. When and why do we use `this` instead of the model's name?
   - Why is `validator` imported in `userController.js` and not in `userModel.js` in this version?

3. Discuss which approach you plan to use for your project and explain why.

4. Summarize your discussion in the same `README.md` file you used in Iteration 6 (for example, `backend-v2/README.md`).

5. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter7] Analyze signup approaches"
   git push
   ```

---

### Iteration 8: useField in Signup

For Iterations 8 and 9, you continue using the same frontend and whichever backend (backend or backend-v2) you prefer for testing, as long as it is correctly configured.

1. Refactor the `SignupComponent` component to incorporate the `useField` hook covered in the frontend session.

   - Create `frontend/src/hooks/useField.jsx` if it doesn’t already exist, or reuse the implementation from the session.
   - Replace manual input state/handlers in `SignupComponent` with the `useField` hook, while still using `useSignup` for the actual signup request.

<!-- 2. Test the application's functionality and run the frontend tests:

   ```bash
   npm run dev
   npm test -- iteration8.test.jsx
   ``` -->

2. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter8] Use useField in Signup"
   git push
   ```

---

### Iteration 9: useField in Login

1. Refactor the `LoginComponent` component to incorporate the `useField` hook covered in the frontend session.

   - Use `useField` for managing the email/password fields, combined with the `useLogin` hook for the login request.

<!-- 2. Test the application's functionality and run the frontend tests:

   ```bash
   npm run dev
   git commit -m "[iter8] Use useField in Login"
   ``` -->

2. **Commit and Push**

   ```bash
   git add .
   git commit -m "[iter9] Use useField in Login"
   git push
   ```

---

**Happy coding!** 🚀 ❤️

