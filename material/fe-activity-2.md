# Activity: useEffect

One of the most important things to understand about the `useEffect` hook is when it runs. Every `useEffect` hook runs after the first render of a functional component. Whether the `useEffect` function ever runs again after
that depends on different factors.

---
## Part 1/3

> Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 

### Learning goals

By the end of this practice, you should be able to

- Explain the purpose of the two arguments in a `useEffect` function
- Explain when a `useEffect` hook runs
- Use the optional dependency array
- Use the optional cleanup function

### Setup 

Open your terminal and run:

```sh
npx create-vite@latest w5-fe-activity-part1 --template react
cd w5-fe-activity-part1
npm install
```

### Create a UseEffectTest component

In your __src__ folder, create a file called __UseEffectTest.jsx__. Create a
functional component called `UseEffectTest` with an `h1` containing the text
"UseEffectTest Component". Make `UseEffectTest` the default export.

```js
// src/UseEffectTest.jsx

const UseEffectTest = () => {
  return (
    <div>
      <h1>UseEffectTest Component</h1>
    </div>
  );
};

export default UseEffectTest;
```

Add the `UseEffectTest` component to your __App.jsx__ by importing it and
replacing `App`'s content with the following snippet:

```js
// src/App.jsx
import UseEffectTest from './UseEffectTest';

function App() {
  return (
    <UseEffectTest />
  );
}

export default App;
```

### `useEffect` with no dependency array

With no dependency array, `useEffect` runs after the first render and every
subsequent re-render.

Replace the code in your `UseEffectTest` component file with this snippet:

```js
import { useEffect } from 'react';

const UseEffectTest = () => {
  useEffect(() => {
    console.log('UseEffect1 Ran');
  });

  return (
    <div>
      {console.log('rendered or re-rendered')}
      <h1>UseEffectTest Component</h1>
    </div>
  );
};

export default UseEffectTest;
```

Notice that the `useEffect` has been called with just one argument, the callback
function.

Refresh your page in the browser and look in the DevTools console. (Don't forget to run `npm run dev` to start your project) You should see:

```text
rendered or re-rendered
UseEffect1 Ran
```

Now you have seen that the `useEffect` runs after the first render. But what
about when the `UseEffectTest` component re-renders?

Import `useState` and add a slice of state named `ToggleOne` to your
`UseEffectTest` component with an initial state boolean of `false`.

Your state should look similar to the code below:

```js
const [toggleOne, setToggleOne] = useState(false);
```

Next, below your `h1` create a Button with the child text "ToggleOne". Add an
`onClick` event handler to the button. Using the `setToggleOne` updater
function, change the value of the `toggleOne` state to the opposite value.
(I.e., if the value is true then it should change to false and vice-versa).

```js
<button onClick={() => setToggleOne(!toggleOne)}>ToggleOne</button>
```

Now test again in the browser console.

Each time you click the `ToggleOne` button you should see an additional

```text
rendered or re-rendered
UseEffect1 Ran
```

### `useEffect` with an empty dependency array

`useEffect` with an empty dependency array will run only one time, directly
after the first render.

Add an empty dependency array as a second argument to your `useEffect`:

```js
useEffect(() => {
  console.log('UseEffect1 Ran');
}, []);
```

Refresh your browser and test again. On the first render you will again see:

```text
rendered or re-rendered
UseEffect1 Ran
```

Now click the `ToggleOne` button repeatedly. Every click updates the state,
which triggers a subsequent re-render. However, because you added an empty
dependency array as the second argument to the `useEffect`, the `useEffect`
never runs again. You will instead see only:

```text
rendered or re-rendered
```

followed by a number incrementing next to that log for each click.

### Adding state to the `useEffect` dependency array

The `useEffect` dependency array can be used to listen for changes in reactive
values, including state and props.

In your `UseEffectTest` component, add a new slice of state that returns a destructured `toggleTwo` and `setToggleTwo` variable. The initial value should be set to false. 
It should look identical to the `toggleOne` slice of state except for the naming:

```js
const [toggleTwo, setToggleTwo] = useState(false);
```


In your JSX below the `ToggleOne` button, add a `ToggleTwo` button. It should also be identical to the previous button except for the name.

```js
<button onClick={() => setToggleTwo(!toggleTwo)}>toggleTwo</button>
```

Add another `useEffect` beneath the first one that looks like this:

```js
useEffect(() => {
  console.log('UseEffect2 Ran');
}, [toggleTwo]);
```

Here is the new order. When the page renders, you will see

```text
rendered or re-rendered
UseEffect1 Ran
UseEffect2 Ran
```

Now, when you click on the `ToggleTwo` button it will trigger the following
order of events:

1. You click on the `ToggleTwo` button.
2. The `toggleTwo` state will be updated.
3. The `UseEffectTest` component will re-render.
4. The `useEffect` function that has `toggleTwo` in the dependency array will
   run again.

Notice if you click the `toggleOne` button the only thing logged is

```text
rendered or re-rendered
```

### Running functionality in `useEffect` based on a condition

Sometimes you may only want the functionality of your `useEffect` to run when a
certain condition is met. You cannot stop a `useEffect` from running if a
variable in its dependency array changes, but you can block certain code from
executing by using an `if` conditional to check the value of a particular
dependency.

In your second `useEffect`, beneath the `console.log`, create an `if` conditional that checks to see if `toggleTwo` is true. If it is true, log
`toggleTwo slice of state is true so this code runs`. Your `useEffect` should
look like this now:

```js
useEffect(() => {
  console.log('UseEffect2 Ran');
  if (toggleTwo)
    console.log('toggleTwo slice of state is true so this code runs');
}, [toggleTwo]);
```

You will only see this second console log in the console when the `toggleTwo`
slice of state is true. Test in your browser with the console!

### `useEffect`'s optional cleanup function

The `useEffect` hook has an optional cleanup function that can be used to
cleanup some behavior (e.g., a running function) when a component unmounts or,
as you will see below, when that behavior needs to be stopped.

Note that the `useEffect` cleanup function will not run after the first render,
but it will run after the second render, just **BEFORE** the `useEffect`
function runs.

Order after render:

1. Component re-renders.
2. `useEffect` cleanup function runs, clearing out any specified previous
   value(s).
3. `useEffect` function body runs.

Create a `count` slice of state with an initial value of `0`.

```js
const [count, setCount] = useState(0);
```

Beneath the `setToggleTwo` button, create a button for "Count" and use the
`onClick` event listener to increment the count.

Create a third `useEffect` that listens for the `count` slice of state.

In the body of the callback function, add a `setInterval` function that looks
like the one below:

```js
useEffect(() => {
  setInterval(() => {
    console.log(`UseEffect3 with interval number ${count} is running`);
  }, 1000);
}, [count]);
```

Open your browser console again. Click on the increment button and notice what
happens. You will see that each time the count button is clicked, the
`setInterval` function is called in the `useEffect` with a new value. However,
the old `setInterval` function has not been cleared. This causes a memory leak.
You should see all of the previous `setInterval`s running along with the new one
that has been created.

To fix this problem, use the cleanup function. First, assign the `setInterval`
function to a variable called `myInterval`.

Then below the `myInterval` variable, insert the following cleanup function:

```js
return () => {
  console.log(
    `UseEffect3 cleanup ran.\nsetInterval number ${count} is being cleared out`
  );
  clearInterval(myInterval);
};
```

Test in your browser. Now you should see only one `setInterval` running at any
given time.


---
## Part 2/3

This section demonstrates how the **useEffect** hook works. We’ll continue from the code in **Activity 1, Part 3**. Previously, you learned how the **POST** and **DELETE** operations behave. Now you’ll see how the **READ** operation can run automatically, without requiring a button click.

With `useEffect`, the component fetches data as soon as it mounts (or when its dependencies change), making the process more efficient and hands‑free compared to manual triggers.

- The code in **`client-react-v2/src/pages/Home.jsx`**, demonstrates how to fetch and display all resources:
- The code in **`client-react-v2/src/pages/BlogDetails.jsx`**, demonstrates how to fetch and display a single resource:

**1. Fetching All Blogs (GET with useEffect) — `Home.jsx`**

```jsx
const [blogs, setBlogs] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  fetchData();
}, []);

return (
  <div className="home">
    {blogs && <BlogList blogs={blogs} />}
  </div>
);
```

**Explanation**

- **`useState(null)`** initializes `blogs` state as empty until data loads.
- **`useEffect(() => { ... }, [])`** runs once when the component mounts (empty dependency array).
- Inside the effect, an async function `fetchData` is defined and immediately called.
- A **GET request** fetches all blogs from `/api/blogs`.
- The response is converted to JSON and saved in state.
- The `BlogList` component only renders once `blogs` is loaded (`{blogs && ...}`).
- **Key benefit**: Data loads automatically without requiring a button click.

**2. Fetching a Single Blog (GET with useEffect) — `BlogDetails.jsx`**

```jsx
const [blog, setBlog] = useState(null);
const { id } = useParams();

useEffect(() => {
  const fetchBlog = async () => {
    const response = await fetch(`/api/blogs/${id}`);
    const json = await response.json();

    if (response.ok) {
      setBlog(json);
    }
  };

  fetchBlog();
}, [id]);

const handleClick = async () => {
  await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
  navigate("/");
};

return (
  <div className="blog-details">
    {blog && (
      <article>
        <h2>{blog.title}</h2>
        <p>Written by {blog.author}</p>
        <div>{blog.body}</div>
        <button onClick={handleClick}>delete</button>
      </article>
    )}
  </div>
);
```

**Explanation**

- **`useParams()`** extracts the blog ID from the URL (e.g., `/blogs/5`).
- **`useEffect(() => { ... }, [id])`** runs when the component mounts AND whenever the `id` changes.
- A **GET request** fetches the specific blog by ID from `/api/blogs/{id}`.
- If the response is successful (`response.ok`), the blog data is saved to state.
- **Re-running on `id` change**: If a user navigates to a different blog, the new ID triggers the effect, fetching fresh data.
- **`handleClick()`** sends a DELETE request and redirects home after deletion.

## Key Differences: useEffect vs Manual Fetching

| Aspect | Home.jsx (v1) | Home.jsx (v2) |
|--------|---------------|---------------|
| **Trigger** | Button click (manual) | Component mount (automatic) |
| **Hook Used** | Click event handler | `useEffect` hook |
| **Dependency Array** | N/A | `[]` (runs once) |
| **When Data Loads** | User initiated | Automatic on page load |

**How useEffect Works with Fetch**

1. **Define async function inside effect** - `useEffect` doesn't accept async directly, so we create an async function and call it
2. **Dependency array controls when it runs:**
   - `[]` - runs once on mount
   - `[id]` - runs on mount and whenever `id` changes
   - No array - runs after every render (usually avoid this)
3. **State updates trigger re-renders** - When `setBlog(data)` or `setBlogs(data)` is called, the component re-renders with new data
4. **Conditional rendering** - Use `{blogs && ...}` to avoid rendering before data arrives

---
## Part 3/3 (Optional)

> For a review and optional exercises on this topic, you can refer to the [following mini projects](./useeffect-extra.md).


## Ref

https://github.com/appacademy/aa34-react-hooks-useEffect-when-does-it-run

<!-- Links -->

[http-cats]: https://github.com/httpcats/http.cat
[status-codes]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
[set-interval]: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
[use-effect]: https://react.dev/reference/react/useEffect
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[side-effects]: https://react.dev/learn/keeping-components-pure#side-effects-unintended-consequences
[window-object]: https://developer.mozilla.org/en-US/docs/Web/API/Window
