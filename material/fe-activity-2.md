# Activity: useEffect

One of the most important things to understand about the `useEffect` hook is when it runs. Every `useEffect` hook runs after the first render of a functional component. Whether the `useEffect` function ever runs again after
that depends on different factors.

---
## Part 1/2

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
npx create-vite@latest useEffect-lab --template react
cd useEffect-lab
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
replacing `App`'s `h1` tag with the `UseEffectTest` component.

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

## Part 2/2 (Optional)

In this activity you will:

- Create a `useEffect` to change the color of the background based on an
  interval
  - Then add functionality to change the interval delay based on user input
- Create a `useEffect` to save the current [http status code][status-codes] in the browser's [`localStorage`][local-storage]


> Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 

## Setup

- Clone the starter repo
     ```bash
     git clone https://github.com/tx00-resources-en/fe-useEffect w5-fe-activity-part2
     cd w5-fe-activity-part2
     rm -rf .git
     ```

- run `npm install`. To start your app, run `npm run dev`.

## Step 1: Change background color

Your task in this part of the practice is to change the background color of your
app's `Cat Status` page every 5 seconds. The app currently sets the background
using the `colors` array imported from __data/colors.json__ along with a number
stored in the `colorNum` slice of state (see __Cat.jsx__). You simply need to
use `setInterval` to update `colorNum` every 5 seconds.

[`setInterval`][set-interval] is a good example of a [_side
effect_][side-effects]. React prefers that you place side effects inside a
[`useEffect`][use-effect] hook.

Accordingly, to change the background color, you should create a `useEffect` that takes a `setInterval` function inside the callback function. This `useEffect` should run only once. 

The interval should change the `colorNum` slice of state every 5 seconds. When setting the state, you should ensure that you have the most updated state. Also, make sure that the state loops through the colors, i.e., it should return to the first color after displaying the last color in the array.

Finally, the `Home` button at the top of the screen will, when clicked, return
the user to the home screen, effectively unmounting the `Cat` component. To
prevent a memory leak, make sure to cancel the interval in the `useEffect`
whenever the `Cat` component unmounts.

Your code should look similar to the code below:

```js
useEffect(() => {
  const colorInterval = setInterval(() => {
    setColorIdx((prevIdx) => {
      const newIdx = ++prevIdx % COLORS.length;
      return newIdx;
    });
  }, 5000);

  return () => clearInterval(colorInterval);
}, []);
```

Remember, you must always use the clean up function when utilizing intervals
in a `useEffect`. Otherwise your application can develop memory leaks!

The first two specs in __01-Cat-backgroundColor.test.jsx__ should now pass when
you run `npm test 01`.

## Change interval delay

With the current implementation the background color changes every 5 seconds.
Next you are going modify the `useEffect` you just created to have the interval
delay change based on the value of user submitted slice of state `delay`. This
slice of state is modified by the provided form and submit handler.

Take a moment to read the already provided `handleDelaySubmit` form submit
function. The function checks the value of `delay` before it sets the value
of the `delayChange` slice of state to `delay * 1000` (recall the
`setInterval` delay is looking for milliseconds). It is this slice of state
that the `setInterval` you created should take as an arg to programmatically
change the delay.

Modify the code that the `setInterval` delay should change any time the value
of `delayChange` changes. Recall you will need that slice of state added to the
dependency array to listen for updates.

Your code should now look similar to the code below:

```js
useEffect(() => {
  const colorInterval = setInterval(() => {
    setColorIdx((prevIdx) => {
      const newIdx = ++prevIdx % colors.length;
      return newIdx;
    });
  }, delayChange);

  return () => clearInterval(colorInterval);
}, [delayChange]);
```

All of the specs in __01-Cat-backgroundColor.test.jsx__ should now pass when you
run `npm test 01`.

## Step 2: Local Storage

[`localStorage`][local-storage] is another example of a side effect. It is a
part of the [Window object][window-object] in the browser. It can be used to
store trivial information that anyone is allowed to see. __NEVER store personal
or private information in `localStorage`.__

Your next goal is to persist the value of `statusChange` in your `localStorage`.
If there is a value for `statusCode` stored in `localStorage`, the component's
`statusChange` state should be initialized to the value stored in
`localStorage`. If there is no `statusCode` value stored in `localStorage`, then
you should set the initial value of the `statusChange` to `418`.

**Reminder:** To access the value of a key-value pair in `localStorage`, you can
use the following syntax:

```js
localStorage.getItem(KEY); // => value
```

The key to store the cat status in your `localStorage` can be anything you want.

Open up your browser DevTools. Choose `Application` from the top
bar. Look for `Local Storage` in the `Storage` section. You should see the
address of your browser. Right click
the address and choose `Clear`; this will clear out your app's `localStorage`.
When you reload the page, you should see a picture of a cat with the status code
`418 I'm a teapot`.

The first two specs in __02-Cat-localStorage.test.jsx__ should now pass when you
run `npm test 02`.

Next, any time the user sets a new `statusCode`, you should store that new
`statusCode` in `localStorage` to persist the `statusCode` change. Even if the
user refreshes the browser, the `Cat` component should be initialized to the
`statusCode` most recently set by the user.

`useEffect` is the perfect place to do this. Create a `useEffect` that sets the
`statusCode` in `localStorage` whenever the `statusCode` gets updated.

**Reminder:** To set the value of a key-value pair in `localStorage`, use the
following syntax:

```js
localStorage.setItem(KEY, newValue);
```

With your DevTools still open and your `localStorage` clear, reload the browser
page and notice that your `localStorage` is immediately set with a `statusCode`
of `418`.

Type an existing status in the input box. Notice that `localStorage` updates
each time you click the `Change Status` button. Also notice that, if the
`statusCode` does not exist, it shows a `404` for the image. That is how [HTTP Cats][http-cats] is built.

All of the specs in __02-Cat-localStorage.test.jsx__ should now pass when you run `npm test 02`.

## Step 3: Reset status code after no activity

As additional practice, implement a `useEffect` that resets the `statusCode`
back to the default "418" after 10 minutes of inactivity (i.e., if the user has
not submitted a new status code for 10 minutes). This should mean that the timer
resets on any changes to the status code.

(For testing you may want to use smaller durations to ensure you code is working
correctly.)

You may have encountered such functionality on real websites, such as logging
out a user after a duration of inactivity. You could implement that with a
`useEffect` similar to the one you created to solve this problem!

All of the specs in __03-BONUS-Cat-reset-statusCode.test.jsx__ should now pass
when you run `npm test 03`.

---

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
