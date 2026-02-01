# Theory


- [Part 1: useState](#part-1-react-usestate-concepts)
- [Part 2: Forms](#part-2-react-forms-core-concepts)
- [Part 3: Recap](#part-3-recap)

---

## Part 1: React `useState` Concepts 

This document explains the core concepts introduced in the `useState` Counter + Theme lab. The focus is on how React handles events and UI updates, and why state is the mechanism used to make the UI respond to user actions.

### Learning objectives (what you should be able to explain)

- How events work in vanilla JavaScript vs React
- How to attach event handlers using `onClick` and `onChange`
- Why normal variables do not update the UI in React
- How to use the `useState` hook to manage component state
- How to toggle state values
- How to update state safely using callback (functional) updates
- The difference between imperative and declarative programming


### 1) Events in web development

An **event** is a signal that something happened in the browser (for example, a user clicks a button, types into an input, or submits a form). You can attach code that runs when that event occurs.

##### Vanilla JavaScript events

There are multiple ways to attach events in vanilla JavaScript.

**A) HTML attributes (older style)**

```html
<input type="button" value="Click me" onclick="alert('Clicked!')" />
```

Characteristics:

- The handler is written as a string in HTML.
- HTML and JavaScript are tightly coupled.
- It becomes difficult to organize and reuse logic as the UI grows.

**B) `addEventListener` (modern and recommended)**

```html
<button id="btn">Click</button>

<script>
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {
    console.log('Clicked');
  });
</script>
```

Characteristics:

- JavaScript logic stays in JavaScript, not inside HTML.
- You explicitly select DOM elements and attach listeners.
- You often manually update the DOM after the event (for example, changing classes, text, or styles).

##### React events

In React, you still handle browser events (clicks, input changes, etc.), but you attach them through JSX props:

- Event names use **camelCase**: `onClick`, `onChange`, `onSubmit`, …
- You pass a **function**, not a string.
- In most cases you update **state**, and React updates the UI.

Example:

```jsx
<button onClick={handleClick}>Click</button>
```

React uses a consistent event system (often referred to as “synthetic events”) so the handler receives an event object in a predictable way across browsers.

### 2) Attaching event handlers with `onClick` and `onChange`

##### `onClick`

`onClick` runs when the user clicks an element (commonly a button).

```jsx
const handleClick = () => {
  console.log('Button clicked');
};

<button onClick={handleClick}>Increment</button>
```

Important rule: pass the **function reference**, do not call the function.

❌ Incorrect (runs immediately during render):

```jsx
<button onClick={handleClick()}>Click</button>
```

✅ Correct (runs only on click):

```jsx
<button onClick={handleClick}>Click</button>
```

##### `onChange`

`onChange` is commonly used with inputs. In React, `onChange` fires as the user types (for text inputs).

```jsx
const handleNameChange = event => {
  console.log('New value:', event.target.value);
};

<input type="text" onChange={handleNameChange} />
```

In practice, `onChange` is often used to store the input value in state (this is the typical “controlled input” pattern):

```jsx
const [name, setName] = useState('');

<input
  type="text"
  value={name}
  onChange={event => setName(event.target.value)}
/>
```

This makes the input’s displayed value come from React state, and changes flow through the state update.

### 3) Why normal variables do not update the UI in React

In React, a component’s UI is produced by running the component function and returning JSX. React updates the screen when it decides the component should **re-render**.

If you write:

```js
let theme = 'light';
```

and later do:

```js
theme = 'dark';
```

React does not automatically know that it should re-render. A normal variable changing does not trigger a re-render.

Two practical consequences:

- The UI will not update just because a normal variable changed.
- Even if the component re-renders for some other reason, normal variables inside the component can reset because the function runs again from the top.

React is designed around the idea that **state and props** are the values that drive rendering.

### 4) What “state” is and why it solves the problem

**State** is component-owned data that can change over time. When you update state with the provided setter function, React schedules a re-render so the UI can be recalculated.

In other words:

- **State changes → React re-renders → UI updates**

This is the central reason `useState` exists.

### 5) The `useState` hook

`useState` is a React Hook that lets a function component store and update state.

Syntax:

```jsx
const [value, setValue] = useState(initialValue);
```

Meaning:

- `value` is the current state value.
- `setValue` is the function you call to request an update.
- `initialValue` is the starting value used on the first render.

Example (theme):

```jsx
const [theme, setTheme] = useState('light');
```

When you call `setTheme('dark')`, React updates the state and re-renders the component. On the next render, `theme` will be `'dark'`, and any JSX that uses `theme` will reflect that.

### 6) Toggling state values

Toggling means switching between two states based on the current value.

Common examples:

- `'light'` ↔ `'dark'`
- `true` ↔ `false`

Theme toggle can be written in two common ways.

**A) Direct update (simple and readable)**

```jsx
const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};
```

This is often fine when:

- you only do one toggle per event handler, and
- you are not scheduling multiple updates that depend on the same value.

**B) Functional update (safer when the next value depends on the previous)**

```jsx
const toggleTheme = () => {
  setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
};
```

The functional update form becomes important when multiple updates can happen close together (React may batch updates), because it always calculates from the most recent previous value.

### 7) Updating state safely with callback (functional) updates

When the next state depends on the previous state, the safest pattern is the **functional update** form.

First, here is the direct form (often works, but can be fragile in some cases):

```jsx
setCount(count + 1);
```

Then, here is the functional update form (recommended when the next value depends on the previous value):

```jsx
setCount(prevCount => prevCount + 1);
```

Why this matters:

- React may batch multiple state updates together.
- If you read `count` directly in your handler, you might read a value that is not the final “latest” value at the time React applies updates.

Example of where functional updates help:

```jsx
const addThree = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

This reliably adds 3 because each update is computed from the latest previous value.

Naming convention:

- Prefer descriptive names like `prevCount` / `prevTheme` for clarity.
- Very short names like `c` or `t` are valid, but they reduce readability (especially for beginners).

### 8) Imperative vs declarative programming

##### Imperative (describe how)

In an imperative style, you describe step-by-step DOM instructions.

Example (vanilla JavaScript theme toggle):

```js
const root = document.querySelector('.content');
root.classList.remove('light');
root.classList.add('dark');
```

This approach can work, but as the UI grows it becomes easier to miss an update or create inconsistent UI state.

##### Declarative (describe what)

In React, you describe what the UI should look like for a given state:

```jsx
<div className={`content ${theme}`}></div>
```

Then you update state:

```jsx
setTheme('dark');
```

React determines how to update the DOM to match the new UI description.

### Key takeaways

- React events use JSX props like `onClick` and `onChange` and expect function values.
- Normal variables do not trigger re-renders, so they do not reliably update the UI.
- `useState` stores values that should drive rendering; calling the setter triggers re-render.
- When computing next state from previous state, prefer functional updates like `setCount(prev => prev + 1)`.
- React is primarily declarative: describe UI from state instead of manually manipulating the DOM.

### Final mental model

In React, the most reliable workflow is:

1. User triggers an event (`onClick`, `onChange`, …)
2. Event handler updates state (`setTheme(...)`, `setCount(...)`)
3. React re-renders the component
4. The UI updates to match the new state

---

## Part 2: React Forms: Core Concepts

This document explains the core React concepts of **React Forms - Intro** (Activity 2). The goal is not to memorize code, but to understand the patterns so you can build and debug forms confidently.

### Learning goals (what you should be able to do)

By the end of the forms activity, you should be able to:

- Create a React **function component** that renders a form.
- Track each form field with React state using the **`useState`** hook.
- Build **controlled inputs** using `value` + `onChange`.
- Handle form submission with **`onSubmit`** and **`event.preventDefault()`**.
- Gather state into a single object (the “submission object”).
- Reset form state after submission.

### 1) React function components: forms are just UI

In React, a form is just JSX returned from a component.

```jsx
function ContactUs() {
	return (
		<form>
			<label htmlFor='name'>Name:</label>
			<input id='name' type='text' />
			<button>Submit</button>
		</form>
	);
}
```

At this point the browser can show the form and you can type, but the component itself does not “know” the values.

### 2) `useState`: storing form values in React

To make the component aware of what the user typed, you store values in React state.

```jsx
import { useState } from 'react';

function ContactUs() {
	const [name, setName] = useState('');

	// later: use name and setName
}
```

Key idea:

- `name` is the current value.
- `setName(newValue)` updates the value and causes React to re-render the component.

Most forms have multiple fields, so you typically have multiple state variables:

- `name`, `email`, `phone`, `phoneType`, `comments`, etc.

### 3) Controlled inputs: `value` + `onChange`

##### What “controlled” means

A **controlled input** is an input whose displayed value is controlled by React state.

- The UI displays `value={name}`
- The UI updates state with `onChange={...}`

Example:

```jsx
<input
	id='name'
	type='text'
	value={name}
	onChange={e => setName(e.target.value)}
/>
```

This creates a feedback loop:

1. User types → `onChange` fires.
2. Handler reads the new value from `e.target.value`.
3. `setName(...)` updates state.
4. React re-renders.
5. The `<input>` receives the updated `value` prop.

##### Common warning: `value` without `onChange`

If you add `value={name}` but forget `onChange`, React will warn that the field is read-only. That’s React protecting you from an input that can never update.

##### Why use controlled inputs?

Controlled inputs make it easy to:

- validate input as the user types
- disable/enable submit
- show errors
- reset the form
- submit values without querying the DOM

### 4) The event object: `e.target.value`

React passes an event object to your handler:

```jsx
onChange={e => {
	console.log(e.target.value);
}}
```

Important pieces:

- `e` is the event
- `e.target` is the element that fired the event (`<input>`, `<select>`, `<textarea>`, etc.)
- `e.target.value` is the current text/selection

### 5) Labels in React: `htmlFor` instead of `for`

In HTML, labels use `for="id"`.

In React JSX, you must write `htmlFor`:

```jsx
<label htmlFor='email'>Email:</label>
<input id='email' type='text' />
```

Reason: `for` is a reserved word in JavaScript.

### 6) Controlled `<select>` (dropdown)

In plain HTML, a `<select>` is controlled by the DOM. In React, you control it the same way as inputs:

```jsx
const [phoneType, setPhoneType] = useState('');

<select
	name='phoneType'
	value={phoneType}
	onChange={e => setPhoneType(e.target.value)}
>
	<option value='' disabled>
		Select a phone type...
	</option>
	<option>Home</option>
	<option>Work</option>
	<option>Mobile</option>
</select>
```

Notes:

- The `value` prop selects the option that matches state.
- The “placeholder” option uses `value=''` and `disabled` so the user must pick a real option.

### 7) Controlled `<textarea>`

In HTML, a `<textarea>` uses inner text for its value:

```html
<textarea>hello</textarea>
```

In React, a controlled `<textarea>` uses `value` (like `<input>`):

```jsx
const [comments, setComments] = useState('');

<textarea
	id='comments'
	value={comments}
	onChange={e => setComments(e.target.value)}
/>
```

### 8) Submitting a form: `onSubmit` + `preventDefault`

By default, HTML form submission triggers a page load (or navigation). In a Single Page App (SPA), you usually *don’t* want that.

Attach an `onSubmit` handler to the form and call `preventDefault()`:

```jsx
const onSubmit = e => {
	e.preventDefault();
	// handle submission in JavaScript
};

<form onSubmit={onSubmit}>
	{/* fields */}
</form>
```

This keeps your React app running and lets you decide what happens on submit.

### 9) Building a “submission object”

Once the form values are stored in state, you can build an object from them. This mirrors what you’d typically send to an API.

```js
const contactUsInformation = {
	name,
	email,
	phone,
	phoneType,
	comments,
	submittedOn: new Date()
};

console.log(contactUsInformation);
```

Why this matters:

- It’s a clean bridge from “UI values” → “data to send to backend”.
- It keeps the submit logic independent from the JSX.

### 10) Resetting the form after submit

With controlled inputs, resetting is easy: set the state back to empty strings (or initial values).

```js
setName('');
setEmail('');
setPhone('');
setPhoneType('');
setComments('');
```

Because the inputs read from state, the UI clears immediately after the state reset.

### 11) Debugging tips (practical)

- If you can’t type in a field: check for `value={...}` without `onChange`.
- If the value isn’t updating: verify you used `e.target.value`.
- Use React DevTools to watch state change as you type.
- If submit reloads the page: you forgot `e.preventDefault()` or attached `onSubmit` to the wrong element.

### 12) Controlled components (the core idea)

HTML inputs naturally keep their own state.

React components can also keep state.

In a **controlled component**, you decide that React state is the “source of truth”, and the form elements simply display that state and report changes through events.

This is one of the most important patterns in React—especially for real apps where you need validation, conditional UI, and predictable behavior.

---
## Part 3: Recap

We will introduce some fundamental React concepts, including **list rendering**, the **`useState` hook**, and **controlled forms**, by building a simple but powerful single-page application: a To-Do List application will allow users to:
- Add tasks
- View tasks
- Delete tasks

We'll explore key React concepts used in the app, such as state management with the `useState` hook, controlled components, and list rendering using the `.map()` method.

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

