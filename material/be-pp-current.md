# Pair Programming: 

In this pair, you'll be adding authentication to last week's API and protecting the CRUD operations (create, read, update, delete) for tours. 

<!-- We will work through this step by step. However, there will **not** be a detailed explanation for each step—it's up to you and your partner to apply your knowledge and problem-solve together.  -->

If a step is unclear, feel free to ask for help. If the same question arises frequently, I may call all groups to the main room for clarification.


---

## Important: 

1. Commit Format: **use this commit format**:

      ```bash
      git add .
      git commit -m "[iterX] Your commit message"
      git push
      ```
2. **DO NOT** delete the **.github** directory, from the cloned repo

---

### **Iteration 1: Set Up**

1. **Clone the starter repository**  
   [Week 6 Starter Code](https://github.com/tx00-resources-en/week6-bepp-starter)  
   - Please delete the **.git** directory, but DO NOT delete the **.github** directory.

2. **Set up environment variables**  
   Copy the example file:  
   ```
   cp .env.example .env
   ```
   > **If `.env.example` doesn't exist**, create `.env` manually with:
   > ```
   > PORT=4000
   > MONGO_URI=<your_mongodb_connection_string>
   > SECRET=<your_jwt_secret_key>
   > ```

3. **Install dependencies**  
   ```
   npm install
   ```
   - Verify installation: `npm list` (all dependencies should show without errors)

4. **Run the tests**  
   Run the following commands in your terminal:
   ```
   npm test -- users.test.js
   npm test -- todoTasks.test.js
   ```
   > **Note:** Some tests may fail initially. That's expected! You'll fix them in upcoming iterations.

5. **Commit and Push**
   - When complete, commit your setup with the proper format:
     ```bash
     git add .
     git commit -m "[iter1] Complete setup"
     git push
     ```

✓ **Checkpoint:** Your project should now be set up with all dependencies installed and environment variables configured.


> [!NOTE] 
> In the starter code:  
> - All routes in the **`todoTaskRouter`** are already protected and should be fully functional.  
> - The routes in the **`tourRouter`** are not yet protected.  
> 
> In the next iteration, you’ll secure the tour routes by following the same approach used for `todoTask` — starting with updates to the **Tour model**, **tourRouter**, and **tour controllers**.

---

### **Iteration 2: Securing Tour Routes**

1. **Update the Tour model**  
   Add a `user_id` field to `toursModel.js`:
   ```js
   user_id: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: "User",
   },
   ```
   > **Note:** You don’t need to send `user_id` from the client. The `requireAuth` middleware will automatically attach it from the token.

2. **Protect the tour routes**  
   In `tourRouter.js`, add authentication protection:
   - **Add the import** (after other require statements):
     ```js
     const requireAuth = require("../middleware/requireAuth");
     ```
   - **Apply middleware to all routes** (add this right after the router initialization, before route definitions):
     ```js
     router.use(requireAuth);
     ```

3. **Start the server**  
   Run:
   ```bash
   npm run dev
   ```
   > ✓ Verify: All tour routes should now require authentication (you'll see "Authorization token required" errors without a token)

4. **Register a user and get a token**  
   Make a `POST` request to:
   ```
   http://localhost:4000/api/users/signup
   ```
   with body:
   ```json
   {
     "name": "Pekka",
     "email": "pekka@pekka.com",
     "password": "R3g5T7#gh"
   }
   ```
   Copy the returned token.  

6. **`GET /api/tours` endpoint**  
   In `tourController.js`, modify `getAllTours` to filter by `user_id`:
   ```js
   const getAllTours = async (req, res) => {
     try {
       const user_id = req.user._id;
       const tours = await Tour.find({ user_id }).sort({ createdAt: -1 });
       res.status(200).json(tours);
     } catch (error) {
       res.status(500).json({ message: "Failed to retrieve tours" });
     }
   };
   ```
   > Hint: This is the same pattern used in `getTodoTasks()` inside `todoTaskController.js`.

   - In Postman, go to the **Authorization** tab → choose **Bearer Token** → paste the token.
   - Test in Postman — it should return tours for the logged‑in user.   


7. **Fix the `POST /api/tours` endpoint**  
   Update `createTour` to include the `user_id`:
   ```js
   const createTour = async (req, res) => {
     try {
       const user_id = req.user._id;
       const newTour = await Tour.create({ ...req.body, user_id });
       res.status(201).json(newTour);
     } catch (error) {
       res.status(400).json({ message: "Failed to create tour", error: error.message });
     }
   };
   ```


8. **Update the rest of the CRUD operations**  
   Apply the same logic (filtering by `user_id`) to:
   - `getTourById` - Check that the tour belongs to `req.user._id` before returning it
   - `updateTour` - Only allow updates to tours owned by the user
   - `deleteTour` - Only allow deletion of tours owned by the user
   
   > **Reference:** Check how it's done in `todoTaskController.js` for the exact pattern.


9. **Commit and Push**
   - When complete, commit your setup with the proper format:
     ```bash
     git add .
     git commit -m "[iter2] Secure Tour Routes"
     git push
     ```

✓ **Checkpoint:** At this point, each user should only see and manage their own tours. Try creating tours with different user accounts to verify isolation.

---

### **Iteration 3: Understanding Authentication Logic**

1. In the `middleware/requireAuth.js` file, you'll find the logic that protects routes. 
   - Find the block starting with: `const decodedToken = jwt.verify(...)`
   - Uncomment that entire block.
   - Add your own `console.log()` statements to understand what happens at each step.

2. **Answer the following question:**
   - What does this line of code do?
     ```javascript
     req.user = await User.findOne({ _id }).select("_id");
     ```
   <!-- > **Expected answer:** It fetches the User document by the decoded ID and attaches only the `_id` field to the request object, making it available in subsequent middleware/controllers via `req.user._id`. -->

3. **Verify your understanding:**
   - Start the server (`npm run dev`)
   - Make an authenticated request to any protected route
   - Check your console logs to confirm the token, user ID, and request object match your expectations

4. **Commit and Push**
   - When complete, commit your setup with the proper format:
     ```bash
     git add .
     git commit -m "[iter3] Understand Authentication Logic"
     git push
     ```

✓ **Checkpoint:** You should understand the full flow of how JWT tokens are verified and attached to requests.


---

### **Iteration 4: Expanding the User Model**

1. Modify the `userModel.js` to include additional fields, so that it looks like this:
   ```javascript
   {
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     phone_number: { 
       type: String, 
       required: true,
       match: /^\d{10,}$/ // Must be at least 10 digits
     },
     gender: { 
       type: String, 
       required: true,
       enum: ["Male", "Female", "Other"]
     },
     date_of_birth: { type: Date, required: true },
     membership_status: { 
       type: String, 
       required: true,
       enum: ["Active", "Inactive", "Suspended"]
     },
   }
   ```
2. **Update the respective controllers** in `./controllers/userController.js`:
   - **`signupUser()`**: Validate all new fields, ensure proper phone format (10+ digits), validate enum values, return errors for invalid data
   - **`loginUser()`**: Return full user object (with new fields) along with token, not just email

3. **Test Signup and Login Functionality:**  
   - Test the signup and login functionality with the new user fields. Please:
   - Use strong passwords. For example: `R3g5T7#gh`.  
   - Ensure the date of birth is in the correct format: `"YYYY-MM-DD"` (e.g., `"1999-01-01"`).
   - Phone number must be numeric, at least 10 digits.
   - Here's an example of a complete request body for registering a new user:  
   ```json
   {
      "name": "Pekka",
      "email": "pekka13@pekka.com",
      "password": "R3g5T7#gh",
      "phone_number": "1234567890",
      "gender": "Male",
      "date_of_birth": "1999-01-01",
      "membership_status": "Active"
   }
   ```
   - Test with **valid data** in Postman—should return user info + token
   - Test with **invalid data** (bad phone, wrong gender, etc.)—should return validation errors

4. **Add a protected `/me` route:**  
   In `userRouter.js`, add a route that uses the existing `getMe()` controller function:
   ```js
   const requireAuth = require("../middleware/requireAuth");
   
   // ... existing routes ...
   
   router.get("/me", requireAuth, getMe);
   ```
   - This route should return the authenticated user's information
   - Test in Postman: GET `/api/users/me` with your Bearer token—should return your user profile

5. **Commit and Push**
   - When complete, commit your setup with the proper format:
   ```bash
     git add .
     git commit -m "[iter4] Expand the User Model"
     git push
     ```

✓ **Checkpoint:** Users should now be able to register and login with full profile information, with proper validation for all fields.

---

### **Iteration 5: Final Testing**

1. **Test tour endpoints:**  
   Run the test suite:
   ```bash
   npm test -- tours.test.js
   ```
   - **Answer this question:** Did you need to make any changes to the tour-related controller functions? Why or why not?
   <!-- - **Expected answer:** No changes needed. The tour controllers work correctly because they now filter by `user_id`, which is automatically set by the `requireAuth` middleware. The tests should pass as long as tours are properly isolated per user. -->

2. Update the `userController` so that when a new user registers, the system validates their email and password using the `validator` library. Weak passwords and invalid emails should be rejected.

**Steps to complete:**
- Import the validator library at the top of your controller file:
   ```js
   const validator = require('validator');
   ```

- Inside the registration logic (i.e., `signupUser` function):
   - Check if the provided email is valid:
     ```js
     if (!validator.isEmail(email)) {
       return res.status(400).json({ error: "Invalid email format" });
     }
     ```
   - Check if the provided password is strong:
     ```js
     if (!validator.isStrongPassword(password)) {
       return res.status(400).json({ error: "Password is too weak" });
     }
     ```

3. **Commit and Push**
   - When complete, commit your setup with the proper format:
     ```bash
     git add .
     git commit -m "[iter5] Final Testing"
     git push
     ```

✓ **Checkpoint:** Your authentication system is now complete. All tour routes are protected, user profiles include expanded data, and the `/me` endpoint allows users to retrieve their own information.

---

## **Troubleshooting Guide**

- **"Authorization token required" error:** Make sure you're including the token in the Authorization tab of Postman as a Bearer token
- **"Email already in use" error:** Use a different email address for each signup test
- **Database connection issues:** Verify your `MONGO_URI` in `.env` is correct
- **Tests failing:** Run them one at a time and check the error messages for clues

---

**Happy coding!** :rocket: :heart: 