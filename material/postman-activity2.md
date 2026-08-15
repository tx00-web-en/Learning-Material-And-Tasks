# Activity: Postman ...

## Part 1/3: Setup

1. **Clone the Repository:**
   - Navigate to the `week2` directory in your terminal and run the following command to clone the Pets API repository:
   ```sh
   git clone https://github.com/tx00-resources-en/api-pets
   ```

2. **Remove the Git History:**
To remove the repository's Git history, run the following command:

   - **For macOS/Linux Users:**
     - Run the following command to remove the repository's Git history:
     ```sh
     rm -rf .git
     ```
   - **For Windows Users:**
     - Open PowerShell and run the following command to remove the Git history:
     ```powershell
     Remove-Item -Recurse -Force .git
     ```

3. **Install Dependencies:**
   - Navigate into the cloned directory (i.e. `api-pets`) and install the required dependencies by running:
   ```sh
   npm install
   ```

4. **Start the Server:**
   - Start the Pets API server by executing the following command:
   ```sh
   node app.js
   ```
   - The server should now be running on port `4000`.


----
## Part 2/3: Testing the API in Postman

1. **Create a New Collection in Postman:**
   - Open Postman.
   - Click on **Collections** in the left sidebar, then click **New Collection**.
   - Name your collection "Pets API" and save it.

2. **Add a Request to the Collection:**
   - Inside your "Pets API" collection, click **Add Request**.
   - Name your request according to the endpoint you want to test (e.g., "Get All Pets").

3. **Testing Endpoints:**

   - **GET /pets**
     - Method: **GET**
     - URL: `http://localhost:4000/pets`
     - Click **Send** to retrieve a list of all pets.
     - Save the request in the collection as "Get All Pets".

   - **POST /pets**
     - Method: **POST**
     - URL: `http://localhost:4000/pets`
     - Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
     - Enter the following data model in the body:
       ```json
       {
         "name": "Buddy",
         "species": "Dog",
         "age": 1,
         "color": "Brown",
         "weight": 2
       }
       ```
     - Click **Send** to create a new pet entry.
     - Save the request in the collection as "Create a Pet".

   - **GET /pets/:id**
     - Method: **GET**
     - URL: `http://localhost:4000/pets/id`
     - Replace `id` with the actual ID of the pet you want to retrieve (you can get this from the response of the POST request).
     - Click **Send** to retrieve the specific pet.
     - Save the request in the collection as "Get Pet by ID".

   - **PUT /pets/:id**
     - Method: **PUT**
     - URL: `http://localhost:4000/pets/id`
     - Replace `id` with the actual ID of the pet you want to update.     
     - Go to the **Body** tab, select **raw**, and choose **JSON**.
     - Enter the updated data model in the body (e.g., changing the pet's weight or other attributes):
       ```json
       {
         "age": 2,
         "weight": 3
       }
       ```
     - Click **Send** to update the pet's information.
     - Save the request in the collection as "Update Pet by ID".

   - **DELETE /pets/:id**
     - Method: **DELETE**
     - URL: `http://localhost:4000/pets/id`
     - Replace `id` with the actual ID of the pet you want to delete.
     - Click **Send** to delete the specific pet.
     - Save the request in the collection as "Delete Pet by ID".

4. **Save and Organize Your Requests:**
   - Ensure all requests are saved under the "Pets API" collection for easy access.

5. **Run the Collection:**
   - You can run the entire collection by clicking the **Run** button in the top right corner of the collection window in Postman.
   - This will execute all the saved requests sequentially.

----

## Part 3/3:  Refactoring "Api Pets" 

#### Step 1: Rename and Update Import Path
1. **Rename the File:**
   - In the `api-pets` folder, locate the file named `petLib.js`.
   - Rename the file to `utilities.js` to correct the misspelling.

2. **Update the Import Path:**
   - Open the `petHandlers.js` file located in the same folder.
   - Find the line that imports `petLib.js`.
   - Modify the import statement to reflect the corrected file name:
     ```javascript
     // Original line:
     require("./petLib.js");

     // Updated line:
     require("./utilities.js");
     ```

3. **Test Endpoints Individually:**
   - Open Postman.
   - Test each API endpoint one by one to ensure that the code is functioning correctly.

4. **Test All Endpoints Together:**
   - In Postman, click on "Run Collection" to test all endpoints in one go. This will ensure comprehensive testing of your API.

#### Step 2: Refactor Functions in `utilities.js`

1. **Refactor Functions to Arrow Functions:**
   - Open the `utilities.js` file.
   - Locate all functions declared as regular functions.
   - Refactor each function into an arrow function.

   **Example Refactor:**
   ```javascript
   // Original function:
   function updateOne(dogId, updatedName) {
     const dog = findById(dogId);
     if (dog) {
       dog.name = updatedName;
       return dog;
     } else {
       return null; // Or throw an error if update fails
     }
   }

   // Refactored to an arrow function:
   const updateOne = (dogId, updatedName) => {
     const dog = findById(dogId);
     if (dog) {
       dog.name = updatedName;
       return dog;
     } else {
       return null; // Or throw an error if update fails
     }
   };
   ```

2. **Test Endpoints Individually:**
   - After refactoring, test each API endpoint individually in Postman to verify that the functions still work as expected.

3. **Test All Endpoints Together:**
   - Again, use the "Run Collection" feature in Postman to test all endpoints simultaneously. This ensures that the refactored code works correctly across all API calls.

