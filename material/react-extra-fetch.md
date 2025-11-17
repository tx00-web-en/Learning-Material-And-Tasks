# Fetching Data via Button Click (Without `useEffect`)

If you don’t use `useEffect`, you can still fetch data from your Express.js server by attaching a **click handler** to a button in your React component.

### Example:
```jsx
import React, { useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/data");
    const result = await response.json();
    setData(result);
  };

  return (
    <div>
      <button onClick={fetchData}>Get Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;
```

- Here, the **button click** triggers `fetchData()`.
- The request goes to your Express server (`http://localhost:5000/api/data`).
- The response is stored in state and displayed.

> This works fine if you only want data **on demand** (e.g., after user interaction).

---

## Why `useEffect` is More Practical
`useEffect` is designed for **side effects** like fetching data when a component loads or when certain state/props change. It avoids requiring the user to click a button just to see data.

### Example with `useEffect`:
```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/data");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []); // runs once when component mounts

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
}

export default App;
```

---

## Why `useEffect` is More Practical
- **Automatic fetching**: Data loads as soon as the component mounts, no user action needed.
- **Better UX**: Users see data immediately instead of clicking a button.
- **Reactivity**: You can re-fetch data when dependencies change (e.g., a search term or filter).
- **Consistency**: Keeps side effects (like API calls) separate from UI event handlers, making code cleaner.

---

### Summary
- **Button + handler** → good for *on-demand* fetching (user decides when to fetch).
- **`useEffect`** → good for *automatic* fetching (data loads when component mounts or updates).  
It’s more practical when you want the app to feel responsive and not depend on user interaction for essential data.

