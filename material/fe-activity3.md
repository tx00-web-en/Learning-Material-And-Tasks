# Managing User Data with a Reducer in Native JavaScript

**Objective:** In this activity, you will learn how to create a reducer-like function in native JavaScript, using Node.js to simulate state management.

## Part 1

**Step 1:**

1. Create a JavaScript file named `reducer.js` in the project directory.

**Step 2: Define the Reducer-Like Function**

In `reducer.js`, define a reducer-like function and an initial state.

```javascript
// Define an initial state
const initialState = { count: 0 };

// Define a reducer-like function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Example usage
let currentState = initialState;
console.log(currentState); // { count: 0 }

currentState = reducer(currentState, { type: 'INCREMENT' });
console.log(currentState); // { count: 1 }

currentState = reducer(currentState, { type: 'DECREMENT' });
console.log(currentState); // { count: 0 }
```

**Step 3: Run the Node.js Application**

In your terminal, run the Node.js application to see the state updates in action.

```bash
node reducer.js
```

You should observe the state changes and the console output indicating the state transitions.

-------
## Part 2

**Step 1**

1. Create a JavaScript file named `person-reducer .js` in the project directory.

**Step 2: Define the `personReducer ` Function and Initial State**

In `person-reducer .js`, define the `personReducer ` function, an initial state for the user, and actions to change the user's name, email, and age.

```javascript
// Define an initial state for the user
const initialState = {
  name: "Mark",
  email: "mark@gmail.com",
  age: 30,
};

// Define a reducer-like function for managing user data
function personReducer(state, action) {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, name: action.payload.name };
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload.email };
    case "CHANGE_AGE":
      return { ...state, age: action.payload.age };
    default:
      return state;
  }
}

// Create actions to change the user's email and age
const changeEmailAction = {
  type: "CHANGE_EMAIL",
  payload: { email: "mark@compuserve.com" },
};

const changeAgeAction = {
  type: "CHANGE_AGE",
  payload: { age: 35 },
};

// Apply the actions to the user state using the reducer
const updatedUserState = personReducer (initialState, changeEmailAction);
const updatedUserState2 = personReducer (updatedUserState, changeAgeAction);

console.log("Updated User State (after changing email and age):");
console.log(updatedUserState2);
```

**Step 3: Run the Node.js Application**

In your terminal, run the Node.js application to see how the user state is updated based on the actions.

```bash
node person-reducer .js
```

You should observe the state changes and the console output reflecting the updated user data, including changes to the email and age.

-------
## Part 3


**Step 1: Set Up Your Node.js Project**

1. Create a JavaScript file named `todo-reducer.js` in the project directory.

**Step 2: Define the Todo Reducer and Initial State**

In `todo-reducer.js`, define the `todoReducer` function and initial state for managing the todo list.

```javascript
// Define an initial state for the todo list
const initialState = [
  {
    id: 1,
    task: 'Learn JavaScript',
    complete: false,
  },
  {
    id: 2,
    task: 'Build a project',
    complete: false,
  },
  {
    id: 3,
    task: 'Test the application',
    complete: true,
  },
];

// Define a reducer function for managing the todo list
function todoReducer(state, action) {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
}

// Example usage
let currentTodoList = initialState;

console.log('Initial Todo List:');
console.log(currentTodoList);

// Action: Mark the first task as complete
currentTodoList = todoReducer(currentTodoList, { type: 'DO_TODO', id: 1 });
console.log('Todo List after marking task as complete:');
console.log(currentTodoList);
```

**Step 3: Run the Node.js Application**

In your terminal, run the Node.js application to see how the todo list state is updated based on the actions.

```bash
node todo-reducer.js
```

You should observe the state changes and the console output reflecting the updated todo list.

**Step 4: Extend the `todoReducer`**

In the `todo-reducer.js` file, extend the code to include the "UNDO_TODO" action and demonstrate how to undo a completed task.

```javascript
// ... (Previous code)

// Action: Mark the first task as complete
currentTodoList = todoReducer(currentTodoList, { type: 'DO_TODO', id: 1 });
console.log('Todo List after marking task as complete:');
console.log(currentTodoList);

// Action: Undo the completion of the first task
currentTodoList = todoReducer(currentTodoList, { type: 'UNDO_TODO', id: 1 });
console.log('Todo List after undoing task completion:');
console.log(currentTodoList);
```

**Step 5: Run the Node.js Application**

In your terminal, run the Node.js application to see how the todo list state is updated with both "DO_TODO" and "UNDO_TODO" actions.

```bash
node todo-reducer.js
```

You should observe the state changes and the console output reflecting the actions of marking a task as complete and then undoing the completion.

### Useful Links

- [JavaScript Reducer](https://www.robinwieruch.de/javascript-reducer/)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

