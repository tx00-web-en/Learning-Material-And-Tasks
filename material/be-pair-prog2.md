# Pair Programming Session 2

In this pair programming session, we will follow similar principles used to create the [Pets API](https://github.com/tx00-resources-en/api-pets) to build a "Tour API". Follow the steps below to create, implement, and test your API.

> Once all functions are implemented and tested, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 

#### Data Model
Here's the data model for the Tour API:

```json
{
  "name": "Best of Paris in 7 Days Tour",
  "info": "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!",
  "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
  "price": "1,995"
}
```

### Instructions

1. **Set Up Your Project**
   - Create a new folder for your project.
   - Add your pair as a collaborator in your GitHub repository.

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

4. **Install Nodemon as a Dev Dependency**
   - Install `nodemon` as a development dependency by running:
     ```bash
     npm install nodemon -D
     ```

5. **Add Scripts to `package.json`**
   - In your `package.json`, add the following scripts under the `"scripts"` section:
     ```json
     "scripts": {
       "start": "node app.js",
       "dev": "nodemon app.js"
     }
     ```
   - The `start` script will run the server normally, while the `dev` script will use `nodemon` to automatically restart the server whenever changes are made.

6. **Create the `tourLib.js` File**
   - Create a file named `tourLib.js` where you will write all the functions needed for the API.
   - Ensure the functions can be tested by using:
     ```js
     if (require.main === module) {
      let result = addOne("7 Days Tour"," Join us for the Best of Helsinki!","https://www.course-api.com/images/tours/tour-x.jpeg", "1,495");
      console.log(result);
      console.log("getAll called:", getAll());
      console.log("findById called:", findById(1));
      // rest of the tests here
     }
     ```
   - This setup allows you to test functions independently.

7. **Create `tourHandlers.js` with Mock Functions**
   - Create a file named `tourHandlers.js` and add mock implementations for your API functions:
     ```js
     const Tour = require("./tourLib");

     const getAllTours = (req, res) => {
         res.json({ message: "Hello from getAllTours" });
     };

     const createTour = (req, res) => {
         res.json({ message: "Hello from createTour" });
     };

     const getTourById = (req, res) => {
         res.json({ message: "Hello from getTourById" });
     };

     const updateTour = (req, res) => {
         res.json({ message: "Hello from updateTour" });
     };

     const deleteTour = (req, res) => {
         res.json({ message: "Hello from deleteTour" });
     };

     module.exports = {
       getAllTours,
       getTourById,
       createTour,
       updateTour,
       deleteTour,
     };
     ```

8. **Create the `app.js` File**
   - Create a file named `app.js` and add the following code to set up your Express server:
     ```js
     const express = require("express");
     const app = express();

     const {
       getAllTours,
       getTourById,
       createTour,
       updateTour,
       deleteTour,
     } = require("./tourHandlers"); 

     // Middleware to parse JSON
     app.use(express.json());

     // ROUTES

     // GET /tours
     app.get("/tours", getAllTours);

     // POST /tours
     app.post("/tours", createTour);

     // GET /tours/:tourId
     app.get("/tours/:tourId", getTourById);

     // PUT /tours/:tourId
     app.put("/tours/:tourId", updateTour);

     // DELETE /tours/:tourId
     app.delete("/tours/:tourId", deleteTour);

     const port = 4000;
     // Start the server
     app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
     });
     ```

9. **Use `npm run dev` to Start the Server in Development Mode**
   - Use the command below to start the server in development mode with `nodemon`:
     ```bash
     npm run dev
     ```

10. **Test All Endpoints with Postman**
    - Use Postman to test all endpoints (`GET`, `POST`, `GET/:tourId`, `PUT/:tourId`, `DELETE/:tourId`).
    - Make sure each route is correctly responding with the mock messages.

11. **Implement Functions in `tourHandlers.js`**
    - Start implementing the functions in `tourHandlers.js` one by one.
    - After each implementation, test the corresponding endpoint with Postman to ensure it works correctly.

12. **Push Changes to GitHub**
    - Once all functions are implemented and tested, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 

### Reminder

Work closely with your partner, communicate effectively, and support each other throughout the process. Good luck, and happy coding!
---

### Step-by-Step Guide to Testing Endpoints

1. **Open Postman**
   - Launch Postman on your computer. If you don't have it installed, you can download it from the [Postman website](https://www.postman.com/downloads/).

2. **Create a New Request**
   - Click on the **"+"** button in the top left to create a new request tab.

3. **Set the Request URL and Method**
   - In the request tab, set the request type (e.g., GET, POST) using the dropdown menu next to the request URL input field.
   - Enter the appropriate URL for your local server and the desired endpoint. For example, if your server is running on port 4000, use:
     - `http://localhost:4000/tours` for all tours.
     - `http://localhost:4000/tours/{tourId}` for specific tours, where `{tourId}` should be replaced with an actual tour ID. **Note:** The curly braces `{}` are not part of the URL.

4. **Test Each Endpoint**

   - **GET /tours**  
     - **Request Type**: `GET`  
     - **URL**: `http://localhost:4000/tours`  
     - **Action**: Click the "Send" button to retrieve all tours.  
     - **Expected Response**: You should see a JSON response with a list of all tours or a message confirming the endpoint works.

   - **POST /tours**  
     - **Request Type**: `POST`  
     - **URL**: `http://localhost:4000/tours`  
     - **Body**: Select "Body" > "raw" > "JSON" and add the JSON data for a new tour:  
       ```json
       {
         "name": "Best of Paris in 7 Days Tour",
         "info": "Paris is synonymous with the finest things that culture can offer...",
         "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
         "price": "1,995"
       }
       ```
     - **Action**: Click the "Send" button to create a new tour.  
     - **Expected Response**: You should see a confirmation message that the new tour was created.

   - **GET /tours/:tourId**  
     - **Request Type**: `GET`  
     - **URL**: `http://localhost:4000/tours/{tourId}` (replace `{tourId}` with an actual tour ID). **Note:** The curly braces `{}` are not part of the URL.
     - **Action**: Click the "Send" button to retrieve a specific tour by its ID.  
     - **Expected Response**: You should see the details of the requested tour or an error message if the ID is not found.

   - **PUT /tours/:tourId**  
     - **Request Type**: `PUT`  
     - **URL**: `http://localhost:4000/tours/{tourId}` (replace `{tourId}` with an actual tour ID). **Note:** The curly braces `{}` are not part of the URL.
     - **Body**: Select "Body" > "raw" > "JSON" and provide the updated data:  
       ```json
       {
         "name": "Updated Tour Name",
         "info": "Updated tour information...",
         "image": "https://www.course-api.com/images/tours/tour-2.jpeg",
         "price": "2,095"
       }
       ```
     - **Action**: Click the "Send" button to update the tour information.  
     - **Expected Response**: You should see a confirmation message indicating the tour was updated successfully.

   - **DELETE /tours/:tourId**  
     - **Request Type**: `DELETE`  
     - **URL**: `http://localhost:4000/tours/{tourId}` (replace `{tourId}` with an actual tour ID). **Note:** The curly braces `{}` are not part of the URL.
     - **Action**: Click the "Send" button to delete a specific tour by its ID.  
     - **Expected Response**: You should see a confirmation message indicating the tour was deleted or an error message if the ID was not found.

5. **Verify Responses**
   - For each request, check the response body, status code, and message to ensure the endpoint behaves as expected.
   - The expected HTTP status codes are:
     - **200 OK** for successful `GET` and `PUT` requests.
     - **201 Created** for a successful `POST` request.
     - **204 No Content** for a successful `DELETE` request.
     - **404 Not Found** if the resource (like a specific tour ID) does not exist.
     - **400 Bad Request** if the request data is invalid.

6. **Debug and Repeat**
   - If any endpoint is not working as expected, check your code in `tourHandlers.js` and `app.js` for any issues.
   - Fix any errors, restart the server using `npm run dev`, and retest the endpoint with Postman.

7. **Complete Testing**
   - Make sure all endpoints (`GET`, `POST`, `GET/:tourId`, `PUT/:tourId`, `DELETE/:tourId`) are tested and verified to be working correctly.

