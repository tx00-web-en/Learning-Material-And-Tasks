# Activity: Array Manipulation

In this lab, you'll practice array manipulation by building functions to perform operations on arrays of objects. 

The lab is divided into two parts:

**Part 1**: You'll start with basic step-by-step instructions to build functions that perform array operations on a `carArray`.

**Part 2**: You'll apply the knowledge from Part 1 to create a similar library for a `todosArray`.

**Extra guidance**: You can refer to the example files [`petLib.js`](./src/petLib.js) and [`dogLib.js`](./src/dogLib.js) located in the `src` folder. These files contain complete solutions with different data models

---
## Part 1: Working with `carArray`

### Data Model
Each car object will follow this structure:
```javascript
{
    "model": "Corolla",
    "color": "Red",
    "age": 3
}
```

### Instructions

1. **Setup:**
   - Create a file named `carLib.js`.
   - Initialize the following variables:
     ```javascript
     let carArray = [];
     let nextId = 1;
     ```

2. **Add an Element:**
   - Write a function to add a car to the array:
     ```javascript
     function addOne(model, color, age) {
         // Check if any parameter is empty or undefined
         if (!model || !color || !age) {
             return false;
         }

         const newCar = {
             id: nextId++,  // Assigns a unique id and increments it
             model,
             color,
             age
         };

         carArray.push(newCar); // Adds the new car to the array
         return newCar; // Returns the added car object
     }
     ```

3. **Read All Elements:**
   - Write a function to retrieve all cars:
     ```javascript
     function getAll() {
         return carArray;
     }
     ```

4. **Read an Element by ID:**
   - Write a function to find a car by its ID:
     ```javascript
     function findById(id) {
         const numericId = Number(id); // Converts the ID to a number
         const car = carArray.find(item => item.id === numericId); // Finds the car with the matching ID
         return car || false; // Returns the car or false if not found
     }
     ```

5. **Update an Element by ID:**
   - Write a function to update a car by its ID:
     ```javascript
     function updateOneById(id, updatedData) {
         const car = findById(id);
         if (car) {
             // Update properties only if they are provided in updatedData
             if (updatedData.model) car.model = updatedData.model;
             if (updatedData.color) car.color = updatedData.color;
             if (updatedData.age) car.age = updatedData.age;
             return car; // Returns the updated car object
         }
         return false; // Returns false if the car with the provided ID is not found
     }
     ```

6. **Delete an Element by ID:**
   - Write a function to delete a car by its ID:
     ```javascript
     function deleteOneById(id) {
         const car = findById(id);
         if (car) {
             const initialLength = carArray.length;
             carArray = carArray.filter(car => car.id !== Number(id)); // Filters out the car with the matching ID
             return carArray.length < initialLength; // Returns true if the array length decreased, indicating successful deletion
         }
         return false; // Returns false if the car was not found
     }
     ```

7. **Testing the Module:**
   - Use the following code snippet to test the functions when the module is run directly:
     ```javascript
     if (require.main === module) {
         // Add cars
         let result = addOne("Corolla", "Red", 3);
         console.log(result);
         result = addOne("Civic", "Blue", 2);
         console.log(result);

         console.log("getAll called:", getAll());

         console.log("findById called:", findById(1));

         console.log("updateOneById called:", updateOneById(1, { age: 4, color: "Black" }));
         console.log("findById called after item updated:", findById(1));

         console.log("deleteOneById called:", deleteOneById(1));
         console.log("findById called after item deleted:", findById(1));
     }
     ```
   - **Explanation:** The line `if (require.main === module) {}` checks if the script is being run directly (not imported as a module). This allows for testing directly within the script.

8. **Exporting the Module:**
   - Export the `Car` object to make the functions available in other modules:
     ```javascript
     const Car = {
         getAll,
         addOne,
         findById,
         updateOneById,
         deleteOneById
     };

     module.exports = Car;
     ```

Here's an in-depth explanation of the key functions and concepts used in the lab, including `push`, `filter`, `find`, and the purpose of `if (require.main === module)`.

### Explanation of Key Concepts and Functions

#### 1. `push` Method:
- **Purpose:** The `push` method adds one or more elements to the end of an array and returns the new length of the array.
- **Usage in the Lab:**
    ```javascript
    carArray.push(newCar);
    ```
    - This line adds the newly created car object (`newCar`) to the end of the `carArray`.
    - By using `push`, the array grows dynamically, allowing you to keep adding new car objects without specifying the array size beforehand.

#### 2. `filter` Method:
- **Purpose:** The `filter` method creates a new array with all elements that pass the test implemented by the provided function. It does not modify the original array but returns a new array that meets the criteria.
- **Usage in the Lab:**
    ```javascript
    carArray = carArray.filter(car => car.id !== Number(id));
    ```
    - This line removes the car with the specified ID from the `carArray`.
    - `filter` iterates through each element in `carArray` and keeps only those elements for which the provided condition (`car.id !== Number(id)`) is `true`.
    - Here, `Number(id)` ensures the ID is treated as a number, and `car.id !== Number(id)` excludes the car that matches the ID to be deleted.
    - After filtering, the new array is assigned back to `carArray`, effectively updating it without the removed item.

#### 3. `find` Method:
- **Purpose:** The `find` method returns the value of the first element in the array that satisfies the provided testing function. If no elements satisfy the condition, it returns `undefined`.
- **Usage in the Lab:**
    ```javascript
    const car = carArray.find(item => item.id === numericId);
    ```
    - This line searches `carArray` for a car object whose `id` matches `numericId`.
    - The `find` method iterates over the array and returns the first car object with the matching ID. If no car with that ID is found, it returns `undefined`.
    - The use of `Number(id)` ensures that the comparison is between numbers, which avoids potential mismatches due to type differences (e.g., comparing a string to a number).

#### 4. `if (require.main === module) {}` Block:
- **Purpose:** This line checks if the script is being run directly rather than being imported as a module in another script.
- **Explanation:**
    ```javascript
    if (require.main === module) {
        // Test code here
    }
    ```
    - `require.main` is a Node.js property that refers to the module that started the application.
    - `module` is a reference to the current module (the script being executed).
    - When you run a script directly using `node script.js`, `require.main` points to the current script’s module. Thus, `require.main === module` evaluates to `true`, and the code inside the block runs.
    - When the script is imported as a module in another script, `require.main` points to the main module (the script that started the application), so `require.main === module` evaluates to `false`, and the test code inside the block does not run.
    - **Usage in the Lab:**
        - This block is used to include test cases for the functions so that when the script is run directly, it automatically tests the functions and logs the results.
        - This setup allows for easy testing without affecting the module’s functionality when it’s imported elsewhere.


---
## Part 2: Working with `todosArray`

1. **Setup:**
   - Create a file named `todosLib.js`.
   - The data model for each todo will follow this structure:
     ```javascript
     {
         "task": "Buy groceries",
         "completed": false,
         "dueDate": "2025-08-30"
     }
     ```

2. **Instructions:**
   - Write similar functions (`addOne`, `getAll`, `findById`, `updateOneById`, `deleteOneById`) for the `todosArray` as you did for the `carArray`.
   - Test each function thoroughly before moving to the next.

   Example for `getAll`:
   ```javascript
   function getAll() {
       return todosArray;
   }

   if (require.main === module) {
       console.log("getAll called:", getAll());
   }
   ```

3. **Exporting the Module:**
   - Export the `ToDos` object so that the functions can be used in other modules:
     ```javascript
     const ToDos = {
         getAll,
         addOne,
         findById,
         updateOneById,
         deleteOneById
     };

     module.exports = ToDos;
     ```



