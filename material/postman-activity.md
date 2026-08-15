# Activity: Postman


### Part 1/2: Setup

1. **Clone the Repository:**
   - Navigate to the `week2` directory in your terminal and run the following command to clone the Dog API repository:
   ```sh
   git clone https://github.com/tx00-resources-en/api-dogs
   ```

2. **Remove the Git History:**

To remove the repository's Git history, run the following command:

   - **For Windows Users:**
     - Open PowerShell and run the following command to remove the Git history:
     ```powershell
     Remove-Item -Recurse -Force .git
     ```
   - **For macOS/Linux Users:**
     - Run the following command to remove the repository's Git history:
     ```sh
     rm -rf .git
     ```

3. **Install Dependencies:**
   - Navigate into the cloned directory (i.e. `api-dogs`) and install the required dependencies by running:
   ```sh
   npm install
   ```

4. **Start the Server:**
   - Start the Dog API server by executing the following command:
   ```sh
   node app.js
   ```
   - The server should now be running on port `4000`.

### Part 2/2: Testing the API in Postman

1. **Create a New Collection in Postman:**
   - Open Postman.
   - Click on **Collections** in the left sidebar, then click **New Collection**.
   - Name your collection "Dog API" and save it.

2. **Add a Request to the Collection:**
   - Inside your "Dog API" collection, click **Add Request**.
   - Name your request according to the endpoint you want to test (e.g., "Get All Dogs").

3. **Testing Endpoints:**

   - **GET /dogs**
     - Method: **GET**
     - URL: `http://localhost:4000/dogs`
     - Click **Send** to retrieve a list of all dogs.
     - Save the request in the collection as "Get All Dogs".

   - **POST /dogs**
     - Method: **POST**
     - URL: `http://localhost:4000/dogs`
     - Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
     - Enter the following data model in the body:
       ```json
       {
        "name": "Buddy",
        "weight": 20
        }
       ```
     - Click **Send** to create a new dog entry.
     - Save the request in the collection as "Create a Dog".

   - **GET /dogs/:id**
     - Method: **GET**
     - URL: `http://localhost:4000/dogs/id`
     - Replace `id` with the actual ID of the dog you want to retrieve (you can get this from the response of the POST request).
     - Click **Send** to retrieve the specific dog.
     - Save the request in the collection as "Get Dog by ID".

   - **PUT /dogs/:id**
     - Method: **PUT**
     - URL: `http://localhost:4000/dogs/id`
     - Replace `id` with the actual ID of the dog you want to update.
     - Go to the **Body** tab, select **raw**, and choose **JSON**.
     - Enter the updated data model in the body (e.g., changing the dog's name):
       ```json
       {
         "weight": 14
       }
       ```
     - Click **Send** to update the dog's information.
     - Save the request in the collection as "Update Dog by ID".

   - **DELETE /dogs/:id**
     - Method: **DELETE**
     - URL: `http://localhost:4000/dogs/id`
     - Replace `id` with the actual ID of the dog you want to delete.
     - Click **Send** to delete the specific dog.
     - Save the request in the collection as "Delete Dog by ID".

4. **Save and Organize Your Requests:**
   - Ensure all requests are saved under the "Dog API" collection for easy access.

5. **Run the Collection:**
   - You can run the entire collection by clicking the **Run** button in the top right corner of the collection window in Postman.
   - This will execute all the saved requests sequentially.
