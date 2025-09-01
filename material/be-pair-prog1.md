# Pair Programming Session 1

In this pair programming session, we will apply the same principles used to create the [Pets API](https://github.com/tx00-resources-en/api-pets) to build a "Feedback API". Follow the steps below to create and test your API.

> Once all functions are implemented and tested, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub.

#### Data Model

Here's the data model for the Feedback API:

```json
{
  "sender": "John Smith",
  "message": "Great session on React components! I found the examples very helpful.",
  "rating": 5
}
```

### Instructions

1. **Set Up Your Project**
   - Create a new folder for your project.
   - Create a GitHub repository and add your pair as a collaborator in your GitHub repository.

2. **Initialize a Node.js Project**
   - In your project folder, run the command:
     ```bash
     npm init -y
     ```
   - This will create a `package.json` file with default settings.

3. **Install Express**
   - Install the Express framework by running:
     ```bash
     npm install express
     ```

4. **Add a Start Script to package.json**
   - In your `package.json`, add a start script under the `"scripts"` section:
     ```json
     "scripts": {
       "start": "node app.js"
     }
     ```

5. **Create the `feedbackLib.js` File**
   - Create a file named `feedbackLib.js` where you will write all the functions needed for the API.
   - Ensure the functions can be tested by using:
     ```js
     if (require.main === module) {
      let result = addOne("John Smith", "Great session on React components! I found the examples very helpful.", 4);
      console.log(result);
      console.log("getAll called:", getAll());
      console.log("findById called:", findById(1));
      // rest of the tests here
     }
     ```
   - This setup allows you to test functions independently.

6. **Create `feedbackHandlers.js` with Mock Functions**
   - Create a file named `feedbackHandlers.js` and add mock implementations for your API functions:
     ```js
     const Feedback = require("./feedbackLib");

     const getAllFeedbacks = (req, res) => {
         res.json({ message: "Hello from getAllFeedbacks" });
     };

     const createFeedback = (req, res) => {
         res.json({ message: "Hello from createFeedback" });
     };

     const getFeedbackById = (req, res) => {
         res.json({ message: "Hello from getFeedbackById" });
     };

     const updateFeedback = (req, res) => {
         res.json({ message: "Hello from updateFeedback" });
     };

     const deleteFeedback = (req, res) => {
         res.json({ message: "Hello from deleteFeedback" });
     };

     module.exports = {
       getAllFeedbacks,
       getFeedbackById,
       createFeedback,
       updateFeedback,
       deleteFeedback,
     };
     ```

7. **Create the `app.js` File**
   - Create a file named `app.js` and add the following code to set up your Express server:
     ```js
     const express = require("express");
     const app = express();

     const {
       getAllFeedbacks,
       getFeedbackById,
       createFeedback,
       updateFeedback,
       deleteFeedback,
     } = require("./feedbackHandlers"); 

     // Middleware to parse JSON
     app.use(express.json());

     // ROUTES

     // GET /feedback
     app.get("/feedback", getAllFeedbacks);

     // POST /feedback
     app.post("/feedback", createFeedback);

     // GET /feedback/:feedbackId
     app.get("/feedback/:feedbackId", getFeedbackById);

     // PUT /feedback/:feedbackId
     app.put("/feedback/:feedbackId", updateFeedback);

     // DELETE /feedback/:feedbackId
     app.delete("/feedback/:feedbackId", deleteFeedback);

     const port = 4000;
     // Start the server
     app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
     });
     ```

8. **Test All Endpoints with Postman**
   - Use Postman to test all endpoints (`GET`, `POST`, `GET/:feedbackId`, `PUT/:feedbackId`, `DELETE/:feedbackId`).
   - Make sure each route is correctly responding with the mock messages.

9. **Implement Functions in `feedbackHandlers.js`**
   - Start implementing the functions in `feedbackHandlers.js` one by one.
   - After each implementation, test the corresponding endpoint with Postman to ensure it works correctly.

10. **Push Changes to GitHub**
    - Once all functions are implemented and tested, push your changes to your GitHub repository.

### Reminder

Work together closely, communicate clearly, and support each other throughout the process. Happy coding!

### Step-by-Step Guide to Testing Endpoints

1. **Open Postman**
   - Open Postman on your computer. If you haven't installed it yet, download it from the [Postman website](https://www.postman.com/downloads/).

2. **Create a New Request**
   - Click on the **"+"** button in the top left corner to open a new request tab.

3. **Set the Request URL and Method**
   - In the new request tab, set the request type (e.g., `GET`, `POST`) using the dropdown menu next to the request URL input field.
   - Enter the URL for your local server and the corresponding endpoint. If your server is running on port `4000`, use:
     - `http://localhost:4000/feedback` for general endpoints.
     - `http://localhost:4000/feedback/{feedbackId}` for specific feedback operations.  Replace `{feedbackId}` with an actual feedback ID. **Note:** The curly braces `{}` are not part of the URL.

4. **Test Each Endpoint**

   - **GET /feedback**  
     - **Request Type**: `GET`  
     - **URL**: `http://localhost:4000/feedback`  
     - **Action**: Click "Send" to retrieve all feedback entries.  
     - **Expected Response**: A JSON response with a list of all feedback entries or a message confirming the endpoint is functional.

   - **POST /feedback**  
     - **Request Type**: `POST`  
     - **URL**: `http://localhost:4000/feedback`  
     - **Body**: Select "Body" > "raw" > "JSON" and provide the following JSON data for a new feedback entry:  
       ```json
       {
         "sender": "John Smith",
         "message": "Great session on React components! I found the examples very helpful.",
         "rating": 5
       }
       ```
     - **Action**: Click "Send" to create a new feedback entry.  
     - **Expected Response**: A confirmation message indicating the new feedback was created successfully.

   - **GET /feedback/:feedbackId**  
     - **Request Type**: `GET`  
     - **URL**: `http://localhost:4000/feedback/{feedbackId}` (replace `{feedbackId}` with an actual feedback ID). **Note:** The curly braces `{}` are not part of the URL.
     - **Action**: Click "Send" to retrieve a specific feedback entry by its ID.  
     - **Expected Response**: The details of the requested feedback entry or an error message if the ID is not found.

   - **PUT /feedback/:feedbackId**  
     - **Request Type**: `PUT`  
     - **URL**: `http://localhost:4000/feedback/{feedbackId}` (replace `{feedbackId}` with an actual feedback ID). **Note:** The curly braces `{}` are not part of the URL.
     - **Body**: Select "Body" > "raw" > "JSON" and provide updated data for the feedback:  
       ```json
       {
         "sender": "Jane Doe",
         "message": "The session on React components was very insightful!",
         "rating": 4
       }
       ```
     - **Action**: Click "Send" to update the feedback entry.  
     - **Expected Response**: A confirmation message indicating that the feedback entry was updated successfully.

   - **DELETE /feedback/:feedbackId**  
     - **Request Type**: `DELETE`  
     - **URL**: `http://localhost:4000/feedback/{feedbackId}` (replace `{feedbackId}` with an actual feedback ID). **Note:** The curly braces `{}` are not part of the URL.
     - **Action**: Click "Send" to delete a specific feedback entry by its ID.  
     - **Expected Response**: A confirmation message indicating that the feedback entry was deleted or an error message if the ID was not found.

5. **Verify Responses**
   - Check the response body, status code, and message for each request to ensure that the endpoints behave as expected.
   - The expected HTTP status codes are:
     - **200 OK** for successful `GET` and `PUT` requests.
     - **201 Created** for a successful `POST` request.
     - **204 No Content** for a successful `DELETE` request.
     - **404 Not Found** if the resource (like a specific feedback ID) does not exist.
     - **400 Bad Request** if the request data is invalid.

6. **Debug and Repeat**
   - If any endpoint does not work as expected, check your code in `feedbackHandlers.js` and `app.js` for errors.
   - Fix any issues, restart the server using `npm run dev`, and retest the endpoint with Postman.

7. **Complete Testing**
   - Ensure that all endpoints (`GET`, `POST`, `GET/:feedbackId`, `PUT/:feedbackId`, `DELETE/:feedbackId`) are tested and working correctly.
