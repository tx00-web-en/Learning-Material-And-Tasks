# React useState Lab: Building a Counter with Theme Toggle

## Lab Overview

In this lab, you will learn how to use the [`useState`] hook in React by building a simple Counter component step by step. The final component will:

* Change the theme between **light** and **dark**
* Increment and decrement a counter value

The lab is designed to move gradually from familiar JavaScript concepts to React-specific ideas, with explanations at each step.

---

## Learning Objectives

By the end of this lab, you should be able to:

* Understand how events work in vanilla JavaScript vs React
* Attach event handlers using `onClick`
* Explain why normal variables do not update the UI in React
* Use the `useState` hook to manage component state
* Update state safely using callback functions
* Understand the difference between **imperative** and **declarative** programming

---

## Step 0: Set Up Your Project (Vite + React)

Before starting the lab steps, set up a React project so you have a place to run your `Counter` component.

1. Open **VS Code** in your working folder (for example: `week#`).
2. Create a new React project using Vite (full guide: [vite.md](./vite.md)). In brief, run:

  ```bash
  npx create-vite@latest w3-fe-lab1 --template react
  cd w3-fe-lab1
  npm install
  npm run dev
  ```

  Notes:

  - By default, Vite runs on port `5173`.
  - For files that contain JSX, prefer the `.jsx` extension.

3. Clean up the default styles so they do not interfere with the lab:

  - In `src/index.css`, remove the default CSS (you can leave it empty).
  - In `src/App.css`, remove the default CSS (you can leave it empty).

4. Create your `Counter` component files using the following starter files:

  - `src/Counter.jsx`
   ```jsx
   import './Counter.css';

   const Counter = () => {
   return (
    <div className="content">
         <h1>UseState Component</h1>
         <button>Dark</button>
         <button>Light</button>
      </div>
   );
   };

   export default Counter;
   ```

- `src/Counter.css`

   ```css
   button {
   font-size: 1.2em;
   margin: 10px 0;
   padding: 5px;
   width: 200px;
   height: 75px;
   border-radius: 5px;
   }

  .content {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
   }

   .light {
   background-color: rgb(210, 247, 189);
   color: black;
   height: 100vh;
   }

   .dark {
   background-color: rgb(88, 8, 84);
   color: white;
   height: 100vh;
   }
   ```  

5. Import and render the `Counter` component in `src/App.jsx`.

  After you create `src/Counter.jsx`, your `App.jsx` can be:

  ```jsx
  import Counter from './Counter';
  import './App.css';

  function App() {
    return <Counter />;
  }

  export default App;
  ```

6. Keep the dev server running (`npm run dev`) while you work. When you save files, the browser should refresh automatically.

---

## Step 1: Events in Vanilla JavaScript vs React

### Vanilla JavaScript Events

In vanilla JavaScript, one simple way to handle events is by adding an event attribute directly in HTML.

Example:

```html
<input value="Click me" onclick="alert('Click!')" type="button" />
```

Here:

* The event handler is written directly in HTML
* The browser runs the JavaScript when the event occurs

This approach works, but it tightly couples HTML and JavaScript together.

### React Events

In React:

* Events are written in **camelCase** (e.g. `onClick`, `onChange`)
* Event handlers are passed **functions**, not function calls


This keeps UI and behavior organized inside components.


## Clarifications (Read This Once)

- **You won’t see UI changes until state changes.** `console.log()` confirms the click happened, but it won’t change what’s rendered.
- **Where state “lives” matters.** If you use a normal variable (Step 4), React won’t re-render when it changes.
- **Using a normal variable inside the component is even trickier.** In React, the component function re-runs on re-render, so normal variables can reset to their initial value.
- **The theme works because of CSS class names.** The JSX uses ``className={`content ${theme}`}`` which relies on `.light` and `.dark` existing in `Counter.css`.
- **Hook rule (important):** `useState` must be called at the top level of the component (not inside `if`, loops, or nested functions).

---

## Step 2: Adding Event Handlers in React

Let’s start by confirming that button clicks work.

Update your `Counter.jsx`:

```jsx
const Counter = () => {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="content">
      <h1>UseState Component</h1>
      <button onClick={handleClick}>Dark</button>
      <button onClick={handleClick}>Light</button>
    </div>
  );
};
```

### Explanation

* `onClick` listens for click events
* We pass a **function reference** to `onClick`
* The function runs only when the user clicks

At this stage, we are not changing the UI—just confirming events work.



<details>
<summary>Complete Counter.jsx (After Step 2)</summary>

```jsx
import './Counter.css';

const Counter = () => {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="content">
      <h1>UseState Component</h1>
      <button onClick={handleClick}>Dark</button>
      <button onClick={handleClick}>Light</button>
    </div>
  );
};

export default Counter;
```

</details>

---

## Step 3: Two Ways to Attach Event Handlers

### Option 1: Named Handler Function

```jsx
const handleDarkClick = () => {
  console.log('Dark clicked');
};

<button onClick={handleDarkClick}>Dark</button>
```


### Option 2: Inline Arrow Function

```jsx
<button onClick={() => console.log('Dark clicked')}>Dark</button>
```


### Important Note

❌ This is incorrect:

```jsx
<button onClick={handleDarkClick()}>Dark</button>
```

This calls the function immediately instead of waiting for a click.

<details>
<summary>Complete Counter.jsx (After Step 3 — named handlers version)</summary>

```jsx
import './Counter.css';

const Counter = () => {
  const handleDarkClick = () => {
    console.log('Dark clicked');
  };

  const handleLightClick = () => {
    console.log('Light clicked');
  };

  return (
    <div className="content">
      <h1>UseState Component</h1>
      <button onClick={handleDarkClick}>Dark</button>
      <button onClick={handleLightClick}>Light</button>
    </div>
  );
};

export default Counter;
```

</details>

---

## Step 4: Trying to Change Theme Without State

Let’s try to change the theme using a normal variable.

```jsx
let theme = 'light';

const setDarkTheme = () => {
  theme = 'dark';
  console.log(theme);
};
```

Even though `theme` changes, the UI does **not** update.

### Why This Does Not Work

* React does **not** re-render when normal variables change
* React only re-renders when **state or props** change

This is why we need `useState`.

<details>
<summary>Complete Counter.jsx (After Step 4 — using a normal variable)</summary>

```jsx
import './Counter.css';

const Counter = () => {
  let theme = 'light';

  const setDarkTheme = () => {
    theme = 'dark';
    console.log(theme);
  };

  const setLightTheme = () => {
    theme = 'light';
    console.log(theme);
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDarkTheme}>Dark</button>
      <button onClick={setLightTheme}>Light</button>
      <p>
        Current theme (logged only): <strong>{theme}</strong>
      </p>
    </div>
  );
};

export default Counter;
```

Note: The UI will usually stay on the initial theme because changing `theme` does not trigger a React re-render.

</details>

---

## Step 5: Introducing useState for Theme

Import `useState`:

```jsx
import { useState } from 'react';
```

Create theme state:

```jsx
const [theme, setTheme] = useState('light');
```

Update JSX:

```jsx
<div className={`content ${theme}`}>
```

Add handlers:

```jsx
const setDarkThemeHandler = () => setTheme('dark');
const setLightThemeHandler = () => setTheme('light');

<button onClick={setDarkThemeHandler}>Dark</button>
<button onClick={setLightThemeHandler}>Light</button>
```

### Explanation

* `theme` stores the current theme
* `setTheme` updates the state
* Updating state causes React to re-render

<details>
<summary>Complete Counter.jsx (After Step 5 — theme in state)</summary>

```jsx
import './Counter.css';
import { useState } from 'react';

const Counter = () => {
  const [theme, setTheme] = useState('light');

  const setDarkThemeHandler = () => {
    setTheme('dark');
  };

  const setLightThemeHandler = () => {
    setTheme('light');
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDarkThemeHandler}>Dark</button>
      <button onClick={setLightThemeHandler}>Light</button>
    </div>
  );
};

export default Counter;
```

</details>

---

## Step 6: Toggling Theme

```jsx
const toggleThemeHandler = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};
```

### Explanation

* This is the **direct** update form: it uses the current `theme` variable
* It is simple and works well when you only toggle once per click
* In Step 9, you will see why React sometimes prefers the callback (functional update) form when multiple updates happen close together

<details>
<summary>Complete Counter.jsx (After Step 6 — toggle theme)</summary>

```jsx
import './Counter.css';
import { useState } from 'react';

const Counter = () => {
  const [theme, setTheme] = useState('light');

  const setDarkThemeHandler = () => {
    setTheme('dark');
  };

  const setLightThemeHandler = () => {
    setTheme('light');
  };

  const toggleThemeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDarkThemeHandler}>Dark</button>
      <button onClick={setLightThemeHandler}>Light</button>
      <button onClick={toggleThemeHandler}>Toggle Theme</button>
    </div>
  );
};

export default Counter;
```

</details>

---

## Step 7: Imperative vs Declarative Programming

### Imperative (Vanilla JS)

You describe **how** to do something step by step:

* Select element
* Change background color
* Change text color

### Declarative (React)

You describe **what** you want:

* The theme is `dark`

React figures out how to update the UI.

### Metaphor

* **Imperative:** Giving turn-by-turn directions to a taxi driver
* **Declarative:** Telling the taxi driver the destination

<details>
<summary>Complete Counter.jsx (After Step 7 — no code changes)</summary>

```jsx
import './Counter.css';
import { useState } from 'react';

const Counter = () => {
  const [theme, setTheme] = useState('light');

  const setDarkThemeHandler = () => {
    setTheme('dark');
  };

  const setLightThemeHandler = () => {
    setTheme('light');
  };

  const toggleThemeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDarkThemeHandler}>Dark</button>
      <button onClick={setLightThemeHandler}>Light</button>
      <button onClick={toggleThemeHandler}>Toggle Theme</button>
    </div>
  );
};

export default Counter;
```

</details>

---

## Step 8: Adding Counter State

Create count state:

```jsx
const [count, setCount] = useState(0);
```

Display count:

```jsx
<h2>{count}</h2>
```

Add basic handlers (direct update form):

```jsx
const incrementHandler = () => {
  setCount(count + 1);
};

const decrementHandler = () => {
  setCount(count - 1);
};
```

<details>
<summary>Complete Counter.jsx (After Step 8 — added count state)</summary>

```jsx
import './Counter.css';
import { useState } from 'react';

const Counter = () => {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  const setDarkThemeHandler = () => {
    setTheme('dark');
  };

  const setLightThemeHandler = () => {
    setTheme('light');
  };

  const toggleThemeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const incrementHandler = () => {
    setCount(count + 1);
  };

  const decrementHandler = () => {
    setCount(count - 1);
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDarkThemeHandler}>Dark</button>
      <button onClick={setLightThemeHandler}>Light</button>
      <button onClick={toggleThemeHandler}>Toggle Theme</button>

      <h2>{count}</h2>

      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
    </div>
  );
};

export default Counter;
```

</details>

---

## Step 9: Updating Counter Using Callback

In Step 8 you used the direct update form:

```jsx
setCount(count + 1);
```

This is often fine for “one update per click”. However, React may batch updates. If you do multiple updates in the same handler (or multiple handlers run before React finishes rendering), direct updates can reuse the same old value.

To make updates safer when the next value depends on the previous value, use the callback (functional update) form:

```jsx
const incrementHandler = () => {
  setCount(prevCount => prevCount + 1);
};

const decrementHandler = () => {
  setCount(prevCount => prevCount - 1);
};
```

### Why Use a Callback?

* State updates may be batched, so `count` might not be the latest value when the update runs
* Using the previous value guarantees correctness when the next value depends on the old one
* Naming convention: prefer descriptive names like `prevCount` / `prevTheme` over very short names like `c` or `t` (short names work, but are harder for beginners to read)

<details>
<summary>Complete Counter.jsx (After Step 9 — increment/decrement handlers)</summary>

```jsx
import './Counter.css';
import { useState } from 'react';

const Counter = () => {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  const setDarkThemeHandler = () => {
    setTheme('dark');
  };

  const setLightThemeHandler = () => {
    setTheme('light');
  };

  const toggleThemeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const incrementHandler = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrementHandler = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDarkThemeHandler}>Dark</button>
      <button onClick={setLightThemeHandler}>Light</button>
      <button onClick={toggleThemeHandler}>Toggle Theme</button>

      <h2>{count}</h2>

      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
    </div>
  );
};

export default Counter;
```

</details>

---

## Final Working Counter.jsx

```jsx
import './Counter.css';
import { useState } from 'react';

const Counter = () => {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  const setDarkThemeHandler = () => {
    setTheme('dark');
  };

  const setLightThemeHandler = () => {
    setTheme('light');
  };

  const toggleThemeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const incrementHandler = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrementHandler = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={setDarkThemeHandler}>Dark</button>
      <button onClick={setLightThemeHandler}>Light</button>
      <button onClick={toggleThemeHandler}>Toggle Theme</button>
      <h2>{count}</h2>
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
    </div>
  );
};

export default Counter;
```

---

## Summary

* Events in React are attached using JSX attributes
* State is required to trigger UI updates
* `useState` allows React to re-render components
* Functional updates are safer when new state depends on old state
* React encourages declarative UI design
* [Reference activity from an earlier version of the course](./fe-react-activity1-old.md)

<!-- Links -->

[`useState`]: https://react.dev/reference/react/useState
[event handler]: https://react.dev/learn/responding-to-events#adding-event-handlers

