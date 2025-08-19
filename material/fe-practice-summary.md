# Theory: React Practice

- [Using the `switch` Statement in JavaScript](#using-the-switch-statement-in-javascript)
- [Passing JSX as Children](#passing-jsx-as-children)
- [Generate random numbers within a specified range in JavaScript.](#generate-random-numbers-within-a-specified-range-in-javascript)
- [How to use images in React components](#how-to-use-images-in-react-components)
- [How to extract the last digits from a string](#how-to-extract-the-last-digits-from-a-string)
- [Understanding Inline Styles](#understanding-inline-styles)

---
## Using the `switch` Statement in JavaScript

The `switch` statement is a control flow statement that allows you to execute different code blocks based on the value of an expression. It's often used as an alternative to nested `if` statements when comparing a single value against multiple possibilities.

**Basic Syntax:**

```javascript
switch (expression) {
  case value1:
    // Code to execute if expression equals value1
    break;
  case value2:
    // Code to execute if expression equals value2
    break;
  // ... more cases
  default:
    // Code to execute if expression doesn't match any case
}
```

**How it works:**

1. The `expression` is evaluated.
2. The value of the expression is compared to each `case` value.
3. If a match is found, the corresponding code block is executed until a `break` statement is encountered.
4. If no match is found, the `default` block (if present) is executed.

**Example:**

```javascript
const dayOfWeek = 'Wednesday';

switch (dayOfWeek) {
  case 'Monday':
    console.log('It is Monday.');
    break;
  case 'Tuesday':
  case 'Wednesday':
    console.log('It is a weekday.');
    break;
  case 'Thursday':
  case 'Friday':
    console.log('Almost the weekend!');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('It is the weekend!');
    break;
  default:
    console.log('Invalid day of the week.');
}
```

**Key points:**

- The `break` statement is essential to prevent "fall-through" behavior, where the code in subsequent `case` blocks is executed even if a match is found.
- The `default` block is optional but often useful for handling unexpected values.
- You can combine multiple `case` values using fall-through behavior: if one `case` matches, the execution continues to the next `case` until a `break` is encountered.

**Additional notes:**

- The `switch` statement can also be used with strings, numbers, and other data types.
- You can use expressions within `case` statements, but they must evaluate to a constant value.
- The `switch` statement is often more readable than nested `if` statements, especially when comparing a single value against many possibilities.

---

### Passing JSX as Children

In React, components are designed to be reusable, and one powerful way to achieve this is by passing JSX as children. This allows you to nest components and create more dynamic layouts.

### **The `children` Prop**

Every React component has a special prop called `children`, which automatically contains the content between the opening and closing tags of a component.

```jsx
function Container(props) {
  return <div className="container">{props.children}</div>;
}
```

You can pass JSX elements as children when you use the `Container` component:

```jsx
function App() {
  return (
    <Container>
      <h1>Title</h1>
      <p>This is a paragraph inside the container.</p>
    </Container>
  );
}
```

In this example, the `Container` component renders everything passed between its opening and closing tags inside a `div` with a class of `"container"`.

<!-- ### **Using JSX as Children for Composition**

You can also use this concept for more advanced component compositions. For example, if you have a `Card` component that can render a title, body, and footer, you can pass those as children:

```jsx
function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}
```

Then, in your `App` component:

```jsx
function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
      <button>Click Me</button>
    </Card>
  );
}
```

This approach gives you flexibility and keeps your components reusable. -->


<!-- 
### **Default Props for Children**

You can also define default content for `children` by setting a default prop.

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children || <p>Default content</p>}
    </div>
  );
}
```

If no children are provided, the `Card` component will render the default content. -->
---
## Generate random numbers within a specified range in JavaScript.

- **`Math.random()`:** This function returns a random floating-point number between 0 (inclusive) and 1 (exclusive).
- **`Math.floor()`:** This function rounds a number down to the nearest integer.

**Steps:**

1. **Calculate the range:** Subtract the minimum value from the maximum value to get the range.
2. **Generate a random number within the range:** Multiply the random number from `Math.random()` by the range.
3. **Add the minimum value:** Add the minimum value to the result from step 2.
4. **Round down to the nearest integer:** Use `Math.floor()` to ensure the result is an integer.

**Code Example:**

```javascript
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Example usage:
const randomNumber = getRandomInt(1, 10);
console.log(randomNumber); // Output: A random integer between 1 and 10
```

**Explanation:**

- The `getRandomInt` function takes two arguments: `min` and `max`.
- `Math.ceil(min)` ensures that the minimum value is rounded up to the nearest integer, while `Math.floor(max)` ensures that the maximum value is rounded down.
- The expression `Math.random() * (max - min + 1)` generates a random number between 0 and the range (inclusive).
- Adding `min` to the result shifts the range to start at the desired minimum value.
- Finally, `Math.floor()` rounds the result down to the nearest integer, ensuring that the final value is within the specified range.

**Additional Notes:**

- If you need a floating-point number instead of an integer, you can omit the `Math.floor()` call.
- For more complex random number generation scenarios, consider using libraries like `random-number` or `rand-token`.

---

## How to use images in React components:

**1. Import the Image:**

- Place your image file (e.g., `logo.png`) in a directory within your React project.
- Import the image using the `import` statement in your React component file:

```javascript
import myImg from './logo.png';
```

- Replace `'./logo.png'` with the actual path to your image file relative to the component's location.

**2. Use the Image in JSX:**

- Within your JSX code, use the `<img>` element to display the image:

```javascript
<img className="my-img-class" src={myImg} alt="This is an image" />
```

- **`className`:** This attribute specifies the CSS class to be applied to the image element.
- **`src`:** This attribute sets the source URL of the image. Use the `myImg` variable to reference the imported image.
- **`alt`:** This attribute provides an alternative text description for the image, which is important for accessibility and search engine optimization.

**Complete Example:**

```javascript
import React from 'react';
import myImg from './logo.png';

function MyComponent() {
  return (
    <div>
      <img className="my-img" src={myImg} alt="This is an image" />
    </div>
  );
}

export default MyComponent;
```

> If you encounter issues with SVG files, consider using PNG as an alternative. Minor deviations, such as missing tags, incorrect attribute values, or invalid character encoding, can render SVG files unusable.

---

## How to extract the last digits from a string:

**Understanding the Method:**

- `slice()` is a method that can be used on strings to extract a portion of the string.

**Example:**

```javascript
const number = "0123456789016182";
const last3Digits = number.slice(-3);

console.log(last3Digits); // Output: "182"
```

**Explanation:**

- The `number` variable stores the original string.
- The `slice(-3)` method is applied to the `number` string, extracting the last 3 characters.
- The extracted substring is stored in the `last3Digits` variable.
- Finally, the `last3Digits` variable is logged to the console, displaying the result: "182".

**Additional Notes:**

- This method works for strings, not numbers. If you have a number, you can convert it to a string using the `toString()` method before applying `slice()`.
- The `slice()` method can also be used to extract other portions of a string by specifying different start and end indices.



---
## Understanding Inline Styles:

- Inline styles allow you to directly apply CSS properties to individual React elements using the `style` attribute.
- This provides a flexible way to customize the appearance of elements without creating separate CSS files.

**Using Inline Styles:**

1. **Create a JavaScript object:** Define a JavaScript object that contains the desired CSS properties and their corresponding values.
2. **Apply the object to the `style` attribute:** Pass the object as the value of the `style` attribute on the React element you want to style.

**Example:**

```javascript
function MyComponent() {
  const boxColor = {
    backgroundColor: 'rgb(255, 0, 255)',
  };

  return (
    <div style={boxColor}>
      Here's my content
    </div>
  );
}

export default MyComponent;
```

**Explanation:**

- The `boxColor` object defines the background color of the box using the `rgb()` function.
- The `style={boxColor}` attribute on the `<div>` element applies the `boxColor` object as the inline style. This sets the background color of the box to the dynamically calculated value based on the props.

**Additional Notes:**

- You can apply multiple CSS properties to an element by adding more key-value pairs to the `style` object.
- Inline styles are generally less efficient than using separate CSS files, especially for complex styling. 
- For simple styling, inline styles can be a convenient option.

**Example with Multiple Properties:**

```javascript
const boxStyle = {
  backgroundColor: 'blue',
  color: 'white',
  fontSize: '24px',
  padding: '10px',
};

<div style={boxStyle}>
  This is a styled box.
</div>
```

---
## Links

- [Passing JSX as Children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [How to use images in React components](https://hello-sunil.in/react-js-image/)
- Understanding [Inline Styles](https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx)
- Using the [switch Statement](https://javascript.info/switch) in JavaScript
- Generate [random numbers](https://www.freecodecamp.org/news/generate-random-number-within-a-range-in-javascript/) within a specified range in JavaScript.
- [Video: React CARD components (12min)](https://youtu.be/yYiwxYqQ9vg?si=smqcVFmhBSiPnMn4)







