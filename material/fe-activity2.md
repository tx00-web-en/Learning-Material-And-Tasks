
# Custom Hooks & localStorage

---

## Part 1/3: `useCounter` Custom Hook

**Objective:**  
In this part, you will create a custom hook called `useCounter` to manage counters in React. You'll progressively refactor the code to handle multiple counters and style the interface to make it visually appealing.

---

### Step 0: Setup

1. Create a new React app using the following command:

   ```bash
   npx create-vite@latest custom-hooks-counter --template react
   cd custom-hooks-counter
   ```

2. In `App.jsx`, replace the content with the following code to create a basic counter using `useState`. This will allow us to test the initial counter functionality.

```jsx
import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Plus</button>
      <button onClick={() => setCounter(counter - 1)}>Minus</button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
}

export default App;
```

3. Run the application with `npm run dev` and test the counter buttons to ensure they function correctly. This will be our starting point before we implement the custom hook.

---

### Step 1: Create the `useCounter` Custom Hook

In this step, you will create a custom hook called `useCounter` that encapsulates the logic for managing the counter state and actions (increment, decrement, reset). This will make the code more reusable and modular.

1. Inside the `src` folder, create a new file named `useCounter.jsx`.
2. In `useCounter.jsx`, define a custom hook that manages the state and provides functions to increment, decrement, and reset the counter.

```javascript
// useCounter.jsx

import { useState } from 'react';

// A reusable custom hook for handling counter logic
export const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(initialValue);

  return { counter, increment, decrement, reset };
};
```

- The hook uses `useState` to manage the `counter` value.
- `increment`, `decrement`, and `reset` functions modify the state.
- The `initialValue` is passed as an argument to `useCounter` to allow customization when initializing the counter.

---

### Step 2: Create a Single Counter Component

Now that we have the custom hook, we will use it in a component to display and control a single counter.

1. Create a new file named `SingleCounter.jsx` in the `src` folder.
2. Define a `SingleCounter` component that uses the `useCounter` custom hook.

```javascript
// SingleCounter.jsx
import { useCounter } from './useCounter';  // Import the custom hook
import './SingleCounter.css';  // Import CSS for styling

const SingleCounter = () => {
  const { counter, increment, decrement, reset } = useCounter(0);

  return (
    <div className="single-counter">
      <h2>Counter:</h2>
      <div className="counter-value">{counter}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default SingleCounter;
```

Here’s what the component does:
- `useCounter(0)` initializes the counter at 0.
- The buttons use the increment, decrement, and reset functions from the hook.
- `counter` holds the current value of the counter and is displayed on the screen.

---

### Step 3: Create CSS for the `SingleCounter` Component

1. In the `src` folder, create a file called `SingleCounter.css` to style the counter.

```css
/* SingleCounter.css */

.single-counter {
  text-align: center;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 5px;
  background-color: #f5f5f5;
  margin: 10px;
}

.counter-value {
  font-size: 24px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
```

This styling makes the counter and buttons visually appealing, with hover effects on the buttons and a border around the counter component.

---

### Step 4: Create the `App` Component with Multiple Counters

Next, you'll update the `App.jsx` file to render three separate counter components using the `SingleCounter` component.

1. Modify the `App.jsx` file as follows:

```javascript
// App.jsx
import SingleCounter from './SingleCounter';  // Import the SingleCounter component
import './App.css';  // Import styles for the app

const App = () => {
  return (
    <div className="app-container">
      <SingleCounter />
      <SingleCounter />
      <SingleCounter />
    </div>
  );
};

export default App;
```

- This component renders three `SingleCounter` instances, each operating independently.
- No additional logic is needed since each instance maintains its own state.

---

### Step 5: Style the `App` Component

1. In the `src` folder, create an `App.css` file to style the container holding the counters.

```css
/* App.css */

.app-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
}
```

This style aligns the counters horizontally and spaces them evenly.

---

### Test Your Application

1. Run your app using `npm run dev`.
2. Open the browser and verify that all three counters function independently and have proper styling.

---

## Part 2/3: `useField` Custom Hook

**Objective:**  
In this part, you will create a custom hook called `useField` to manage form input fields. You will first use `useState` for form handling, then refactor the code to use the `useField` custom hook, which abstracts the input handling logic.

---

### Step 0: Setup

1. Start by creating a new React app for this task, or you can use the same app from Part 1.
2. In `App.jsx`, add the following code to implement a basic form with fields for name, birthdate, and height using `useState`.

```jsx
import { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [height, setHeight] = useState('');

  return (
    <div>
      <form>
        <div>
          Name: 
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <br/>
        <div>
          Birthdate:
          <input
            type="date"
            value={born}
            onChange={(event) => setBorn(event.target.value)}
          />
        </div>
        <br/>
        <div>
          Height:
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </div>
      </form>
      <div>
        {name} {born} {height}
      </div>
    </div>
  );
};

export default App;
```

---

### Step 1: Create the `useField` Custom Hook

To simplify form handling, we will create a custom hook called `useField` that manages the state and change handler for form inputs.

1. Create a new file named `useField.jsx`.
2. Inside `useField.jsx`, define the `useField` custom hook:

```javascript
// useField.jsx

import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  return {
    type,
    value,
    onChange,
  };
};

export default useField;
```

- This hook encapsulates input field logic, providing `type`, `value`, and `onChange` for any input field.

---

### Step 2: Refactor to Use the `useField` Custom Hook

1. Refactor the form in `App.jsx` (or create a new file called `AppWithCustomHook.jsx`) to use the `useField` hook for each form field:

```javascript
// AppWithCustomHook.jsx
import useField from './useField';
import './App.css';  // Add CSS if needed

const AppWithCustomHook = () => {
  const nameInput = useField('text');
  const bornInput = useField('date');
  const heightInput = useField('number');

  const handleSubmit = (event) => {
   

 event.preventDefault();
    // You can handle form submission logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input {...nameInput} />
        </div>
        <br/>
        <div>
          Birthdate: <input {...bornInput} />
        </div>
        <br/>
        <div>
          Height: <input {...heightInput} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {nameInput.value} {bornInput.value} {heightInput.value}
      </div>
    </div>
  );
};

export default AppWithCustomHook;
```

- The spread operator (`...`) simplifies passing `type`, `value`, and `onChange` as props to each input field.
- This reduces code duplication and makes form handling cleaner.

---

### Test Your Application

1. Run your React app with `npm start`.
2. Open the browser and verify that the form fields work as expected. The `useField` custom hook should simplify the input field management.

---

## Part 3/3: Custom Hook for localStorage

**Objective:**  
In this part, you will create a custom hook to manage data using `localStorage`. This will allow you to store and retrieve data between browser sessions.

Follow these steps:

1. Create a new file named `useLocalStorage.jsx`.
2. Inside this file, define a custom hook that synchronizes state with `localStorage`. Here's an example implementation:

```javascript
// useLocalStorage.jsx
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
```

- This hook first checks `localStorage` for existing data. If no data exists, it uses the `initialValue`.
- When the `storedValue` changes, it updates `localStorage`.

### Usage Example:

In your `App.jsx` file (or another component), you can use `useLocalStorage` like this:

```javascript
import useLocalStorage from './useLocalStorage';

const App = () => {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Your name is stored in localStorage: {name}</p>
    </div>
  );
};

export default App;
```

---

### Test Your Application

1. Run your app and test that the value you enter in the input field is saved to `localStorage`.
2. Refresh the page to see if the value persists.


---

## (Optional) 

1. Create a custom hook for managing items in the browser's local storage.
2. You can use the [starter code] provided as your base to begin working.
3. If needed, refer to the [solution] for guidance. Note that the provided solution may not handle all scenarios (e.g., how to clear all items from local storage), so consider extending it to fit additional use cases.

---

<!-- > For a review and optional exercises on this topic, you can refer to the following link: [.]() -->


<!-- Links -->
[starter code]:https://github.com/reactpractice-dev/local-storage-hook
[solution]:https://github.com/reactpractice-dev/local-storage-hook/tree/solution