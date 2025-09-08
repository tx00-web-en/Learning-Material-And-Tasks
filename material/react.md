# Theory: React

Creating dynamic, interactive web applications is a core strength of React. We will introduce some fundamental React concepts, including **list rendering**, the **`useState` hook**, and **controlled forms**, by building a simple but powerful single-page application: a To-Do List.

---
### Objective

The To-Do List application will allow users to:
- Add tasks
- View tasks
- Delete tasks

We'll explore key React concepts used in the app, such as state management with the `useState` hook, controlled components, and list rendering using the `.map()` method.

---
## Key Concepts and React Fundamentals

#### 1. State Management with the `useState` Hook

State is an essential concept in React, representing data that can change over time. The `useState` hook is used to manage state in functional components. For our To-Do List application, we will use `useState` to manage two pieces of state:
- `tasks`: An array of tasks added by the user.
- `newTask`: A string representing the current input value from the user.

#### 2. Controlled Forms

A controlled component in React is an input element whose value is controlled by React's state. This approach allows us to manage form elements more effectively and handle user input with greater flexibility.

In our app, the task input field is a controlled component where its value is tied to the `newTask` state. When the user types in the input field, an event handler updates the state, ensuring the displayed value is always in sync with the state.

#### 3. List Rendering

React allows us to dynamically render lists of elements using the `.map()` method. This method is crucial when dealing with collections of data that need to be displayed dynamically based on the state. In our To-Do List application, we use `.map()` to render each task in the list.

---
## The To-Do List Application Code

Here’s the complete code for the To-Do List component:

```jsx
import React, { useState } from "react";

function ToDoList() {
  // State for the list of tasks and the new task input
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Handle input change and update newTask state
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Add a new task to the list
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]); // Append new task to the tasks array
      setNewTask(""); // Clear the input field
    }
  }

  // Delete a task from the list
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks); // Update the state with the new list
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
```

---
## Breakdown of the Code

#### Step-by-Step Explanation:

1. **State Management with `useState`**:
   - The `useState` hook initializes two states: `tasks` (an array to store the list of tasks) and `newTask` (a string to capture the input value).
   ```jsx
   const [tasks, setTasks] = useState([]);
   const [newTask, setNewTask] = useState("");
   ```
   - `tasks` holds the list of tasks, while `newTask` is updated every time a user types in the input field.

2. **Controlled Form with Input Element**:
   - The `<input>` element is a controlled component. Its `value` attribute is tied to the `newTask` state, and the `onChange` event calls `handleInputChange` to update this state.
   ```jsx
   <input
     type="text"
     placeholder="Enter a task..."
     value={newTask}
     onChange={handleInputChange}
   />
   ```
   - `handleInputChange` updates the `newTask` state based on user input:
   ```jsx
   function handleInputChange(event) {
     setNewTask(event.target.value);
   }
   ```

3. **Adding Tasks**:
   - When the "Add" button is clicked, the `addTask` function checks if the `newTask` is not empty, and if so, adds it to the `tasks` array using the spread operator `...` to create a new array with the added task.
   ```jsx
   function addTask() {
     if (newTask.trim() !== "") {
       setTasks((t) => [...t, newTask]);
       setNewTask("");
     }
   }
   ```
   - After adding a task, the `newTask` state is reset to an empty string, clearing the input field.

4. **Rendering the List of Tasks**:
   - The tasks are rendered dynamically using the `.map()` method, which iterates over each task in the `tasks` array and creates a `<li>` element.
   ```jsx
   {tasks.map((task, index) => (
     <li key={index}>
       <span className="text">{task}</span>
       <button className="delete-button" onClick={() => deleteTask(index)}>
         Delete
       </button>
     </li>
   ))}
   ```
   - Each task has a "Delete" button that calls the `deleteTask` function with the task's index.

5. **Deleting Tasks**:
   - The `deleteTask` function uses the `filter` method to create a new array without the task that matches the given index.
   ```jsx
   function deleteTask(index) {
     const updatedTasks = tasks.filter((_, i) => i !== index);
     setTasks(updatedTasks);
   }
   ```

## How This Code Illustrates React Fundamentals

1. **`useState` Hook**: Manages dynamic data (the task list and input value), enabling real-time updates and re-rendering of the component.
   
2. **Controlled Components**: Ensures the form input is in sync with the component state, providing controlled and predictable behavior for user interactions.
   
3. **List Rendering**: Utilizes the `.map()` method to dynamically create and update the list of tasks in response to user actions.

---
## Conclusion

By following this example, you will have a fundamental understanding of how to build dynamic, interactive applications using React components. The To-Do List app demonstrates key concepts like state management with the `useState` hook, controlled forms, and list rendering — all essential skills for building modern web applications. Experiment with these concepts to expand your understanding and apply them to more complex React applications in the future.

---
## Links

- [Introduction to Events](https://javascript.info/introduction-browser-events)
- [Responding to Events](https://react.dev/learn/responding-to-events)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Render and Commit](https://react.dev/learn/render-and-commit)
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)

