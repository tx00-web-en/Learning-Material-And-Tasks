# Pair Programming: 

In this pair, you'll be adding authentication to last week's API and protecting the CRUD operations (create, read, update, delete) for tours. 

<!-- We will work through this step by step. However, there will **not** be a detailed explanation for each step—it's up to you and your partner to apply your knowledge and problem-solve together.  -->

If a step is unclear, feel free to ask for help. If the same question arises frequently, I may call all groups to the main room for clarification.

---

### **Iteration 1: Set Up**

1. **Clone the starter repository**  
   [Week 6 Starter Code](https://github.com/tx00-resources-en/week6-bepp-starter)  
   - After cloning, **delete** the `.git` directory so you can initialize your own repository later.

2. **Set up environment variables**  
   Copy the example file:  
   ```
   cp .env.example .env
   ```

3. **Install dependencies**  
   ```
   npm install
   ```

4. **Run the tests**  
   Run the following commands in your terminal. All tests should pass without errors:  
   ```
   npm test users.test.js
   npm test todoTasks.test.js
   ```

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
   In `tourRouter.js`, import and apply the authentication middleware:
   ```js
   const requireAuth = require("../middleware/requireAuth");
   router.use(requireAuth);
   ```


3. **Start the server**  
   Run:
   ```bash
   npm run dev
   ```

4. **Test unauthorized access**  
   In Postman, send a `GET` request to:  
   ```
   http://localhost:4000/api/tours/
   ```
   You should see:
   ```json
   { "error": "Authorization token required" }
   ```

5. **Register a user and get a token**  
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
   In Postman, go to the **Authorization** tab → choose **Bearer Token** → paste the token.

6. **Fix the `GET /api/tours` endpoint**  
   Even with a token, you’ll still see “Unauthorized” until you update the controller.  
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

   Test again in Postman — it should now return tours for the logged‑in user.


7. **Fix the `POST /api/tours` endpoint**  
   If you try to add a tour, you’ll see:
   ```json
   { "error": "Authorization token required" }
   ```
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
   - `getTourById`
   - `updateTour`
   - `deleteTour`  

   > For reference, check how it’s done in `todoTaskController.js`.

At this point, all tour routes should be secured so that each user only sees and manages their own tours.

---

### **Iteration 3: Understanding Authentication Logic**

1. In the `middleware/requireAuth.js` file, you'll find the logic that protects routes. 
   - Uncomment **lines 12-15**.
   - Add your own console logs to understand the logic.
2. Answer the following question:
   - What does this line of code do?
     ```javascript
     req.user = await User.findOne({ _id }).select("_id");
     ```

---

### **Iteration 4: Expanding the User Model**

1. Modify the `userModel.js` to include additional fields, so that it looks like this:
   ```javascript
   {
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     phone_number: { type: String, required: true },
     gender: { type: String, required: true },
     date_of_birth: { type: Date, required: true },
     membership_status: { type: String, required: true },
   }
   ```
2. Update the methods in the model:
   - `userSchema.statics.signup()`
   - `userSchema.statics.login()`
   
3. Discuss and document:
   - What are these functions (`userSchema.statics.signup()` and `userSchema.statics.login()`)?
   - Why are they used?
   - What are the **pros** and **cons** of using this approach?
   - What **alternative approaches** are available?


4. **Test Signup and Login Functionality:**  
   - Test the signup and login functionality with the new user fields. Please:
   - Use strong passwords. For example: `R3g5T7#gh`.  
   - Ensure the date of birth is in the correct format: `"YYYY-MM-DD"` (e.g., `"1999-01-01"`).  
   - Here’s an example of a complete request body for registering a new user:  
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
5. Commit your changes.

---

### **Iteration 5: Final Testing**

1. Test all the tour-related endpoints to ensure they are still functional after the modifications.
   ```
   npm test tours.test.js
   ```
2. Reflect:
   - Did you need to make any changes to the tour-related functions? Why or why not?

3. Push your changes to the repository.

---
**Happy coding!** :rocket: :heart: 