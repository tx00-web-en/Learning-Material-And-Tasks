# Activity: Refactoring and Enhancing the Express API Server

In this activity, you will refactor the code you wrote in the first activity to improve error handling, add validation, and gain a deeper understanding of key concepts in Mongoose and Express.

### Objectives
1. Add `try..catch` blocks for better error handling.
2. Validate that IDs are of type `mongoose.Types.ObjectId`.
3. Explain some key concepts and their importance in your code.
4. Understand the differences between HTTP methods (e.g., `PUT` vs `PATCH`).
5. Identify suboptimal code in `db.js` and suggest improvements.

### Steps to Complete

#### **Step 1: Clone the Repository**

1. **Clone the Starter Repository:**
   - Clone the starter repository for the lab using the following command:
   ```bash
   git clone https://github.com/tx00-resources-en/be-starter-v2 week4-be-activity2
   ```
   - Remove the existing Git history to create a fresh project:
   ```bash
   rm -rf week4-be-activity2/.git
   ```
   - Navigate into the project directory and install the necessary dependencies:
   ```bash
   cd week4-be-activity2
   npm install
   ```

#### **Step 2: Add Error Handling with `try..catch`**

1. **Add `try..catch` to Blog and User Controllers**:

   Refactor your Blog and User controllers to include `try..catch` blocks for better error handling, just like the example given for the [Car API](https://github.com/tx00-resources-en/be-starter-v2/blob/main/controllers/carControllers.js):

   - **Before Refactoring**:
     ```javascript
     // Old GET /cars
     const getAllCars = async (req, res) => {
       const cars = await Car.find({}).sort({ createdAt: -1 });
       res.status(200).json(cars);
     };
     ```

   - **After Refactoring**:
     ```javascript
     // New GET /cars with try..catch
     const getAllCars = async (req, res) => {
       try {
         const cars = await Car.find({}).sort({ createdAt: -1 });
         res.status(200).json(cars);
       } catch (error) {
         res.status(500).json({ message: "Failed to retrieve cars" });
       }
     };
     ```

   - Follow this pattern and add `try..catch` to all methods in your Blog and User controllers.

#### **Step 2: Validate IDs Using Mongoose**

1. **Add ID Validation to Controllers**:

   Ensure that any ID used in requests (e.g., `get`, `update`, `delete`) is a valid `mongoose.Types.ObjectId`. This will prevent errors related to invalid IDs.

   - Example for the [Car controller](https://github.com/tx00-resources-en/be-starter-v2/blob/main/controllers/carControllers.js) (`getCarById`, `updateCar`, `deleteCar`):
     ```javascript
     if (!mongoose.Types.ObjectId.isValid(carId)) {
       return res.status(400).json({ message: "Invalid car ID" });
     }
     ```

   - Implement similar validation for Blog and User controllers wherever IDs are being used.

#### **Step 3: Explain Key Concepts**

1. **Explanations for some Concepts**:

   - **`await Car.find({}).sort({ createdAt: -1 })`:**
     - This line queries all cars and sorts them in descending order by the `createdAt` timestamp. The `await` keyword ensures that the code waits for the query to complete before moving on.

   - **`await Car.findOneAndUpdate(...)`:**
     - This method finds a single car document by its ID and updates it with the new data provided. The `{ new: true }` option ensures that the updated document is returned. 
     <!-- The `{ overwrite: true }` *deprecated* option, used to replace the entire document with the new data. -->

   - **`Car.findOneAndDelete({ _id: carId })`:**
     - This method finds a single car document by its ID and deletes it from the database.

   - **PUT vs PATCH**:
     - **PUT**: Replaces the entire resource with new data.
     - **PATCH**: Partially updates the resource with the new data provided.

   - **Refactor PUT**:
     - The current `PUT` endpoint is functioning like a `PATCH`. Modify it so that the new data completely replaces the existing data.
     - Does `findOneAndReplace` help achieving this?

     <!-- 
     ```javascript
     // PATCH /cars/:carId - Refactored to act as PATCH
     const patchCar = async (req, res) => {
       const { carId } = req.params;

       if (!mongoose.Types.ObjectId.isValid(carId)) {
         return res.status(400).json({ message: "Invalid car ID" });
       }

       try {
         const updatedCar = await Car.findOneAndUpdate(
           { _id: carId },
           { ...req.body },
           { new: true } 
         );
         if (updatedCar) {
           res.status(200).json(updatedCar);
         } else {
           res.status(404).json({ message: "Car not found" });
         }
       } catch (error) {
         res.status(500).json({ message: "Failed to update car" });
       }
     };
     ``` 
     -->

   - **Mongoose Schema and Model Definition**:
     - The `Schema` is a blueprint for the data, defining the structure and data types for the documents in a collection.
     - `mongoose.model('Car', carSchema)` compiles the schema into a model, providing an interface to interact with the collection of documents in the MongoDB database.

#### **Step 4: Optimize Code in `db.js`**

Look at the code in `db.js` and think about why it might not be optimal. After reviewing, suggest improvements.

#### **Step 5: Push to GitHub

> Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 

### Note

In the `createCar` function, a `400` status code (Bad Request) is returned for any error that occurs, as shown below:

```javascript
const createCar = async (req, res) => {
  try {
    const newCar = await Car.create({ ...req.body });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: "Failed to create car", error: error.message });
  }
};
```

While this is appropriate for errors related to invalid input (such as missing fields or malformed data), you might want to handle different types of errors more specifically. For example, if the error is due to a validation issue, a `400` status code is indeed correct. However, if the error results from a server issue, such as a database failure, a `500` status code (Internal Server Error) would be more suitable.

To improve error handling, you can differentiate between these types of errors by checking the error type, like this:

```javascript
} catch (error) {
  if (error.name === 'ValidationError') {
    res.status(400).json({ message: "Invalid input", error: error.message });
  } else {
    res.status(500).json({ message: "Failed to create car", error: error.message });
  }
}
```

By distinguishing between validation errors and other server-side errors, you provide more accurate feedback to the client, which can help with debugging and improving user experience.

