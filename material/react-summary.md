# Theory: React

- [Part 1: Useful JavaScript Techniques in React](#part-1-useful-javascript-techniques-in-react)
  - map()
  - Object Destructuring
  - Pure Functions and Immutability
- [Part 2: Rendering Lists in React](#part-2-rendering-lists-in-react)
- [Part 3: The spread operator](#part-3-the-spread-operator)
- [Part4: Named exports vs Default exports](#part4-named-exports-vs-default-exports)
- [Part 5: QA](#part-5-qa)
  - degit
  - WHy import images using the `import` syntax
- [Links](#links)

---
## Part 1: Useful JavaScript Techniques in React

#### 1. `map()`

The `map()` function is a powerful array method in JavaScript that is frequently used in React to transform arrays. It creates a new array populated with the results of calling a provided function on every element in the calling array.

**Example:**
```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
```

In React, `map()` is often used to render lists of components dynamically.

#### 2. Object Destructuring

Object destructuring allows you to extract properties from objects and bind them to variables. This technique simplifies the process of accessing object properties, making the code cleaner and more readable.

**Example:**
```js
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

// Without destructuring
const name = user.name;
const age = user.age;
const email = user.email;

// With destructuring
const { name, age, email } = user;
```

**Manual Extraction Difficulty:**
Without destructuring, extracting multiple fields from an object can be verbose and error-prone, especially with deeply nested objects.

#### 3. Pure Functions and Immutability

A pure function is a function that, given the same inputs, will always return the same output and does not have any side effects. Immutability means that once a data structure is created, it cannot be changed. Instead, new data structures are created with the desired changes.

**Example of Pure Function:**
```js
const add = (a, b) => a + b;
```

#### 4. How `map()` Relates to Immutability

The `map()` function is inherently immutable. It does not modify the original array but instead returns a new array with the transformed elements. This aligns perfectly with the principles of immutability in React, ensuring that state changes are predictable and easier to manage.

---
## Part 2: Rendering Lists in React

#### 1. Starting with an Array of Data

To render a list in React, you typically start with an array of data. This data can come from various sources, such as an API (`JSON data`)) or a static array.

**Example:**
```js
const tours = [
  { id: 1, name: 'Tour 1', price: 100 },
  { id: 2, name: 'Tour 2', price: 200 },
];
```

#### 2. Mapping Through the Array

You use the `map()` function to iterate over the array and return a component for each item.

**Example:**
```js
const TourList = ({ tours }) => {
  return (
    <div>
      {tours.map(tour => (
        <Tour key={tour.id} tour={tour} />
      ))}
    </div>
  );
};
```

> Here's a [more elaborate explanation](./mapping-array.md)

#### 3. Using Keys

When rendering lists, it's crucial to use a `key` prop. The `key` helps React identify which items have changed, are added, or are removed, improving the performance of the rendering process.

**Example:**
```js
const Tour = (props) => {
  const { name, price }=props.tour
  <div>
    <h2>{name}</h2>
    <p>Price: ${price}</p>
  </div>
};

const TourList = ({ tours }) => {
  return (
    <div>
      {tours.map(tour => (
        <Tour key={tour.id} tour={tour} />
      ))}
    </div>
  );
};
```

---
## Part 3: The spread operator

### Introduction

The spread operator (`...`) in JavaScript is a versatile tool introduced in ES6 that allows you to expand elements of an iterable (like an array or object) into individual elements. Here are some key points about the spread operator:

1. **Objects**: It can also be used to copy objects or merge multiple objects.
   ```javascript
   const obj1 = { a: 1, b: 2 };
   const obj2 = { c: 3, d: 4 };
   const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }
   ```


2. **Arrays**: It can be used to copy arrays, combine arrays, or insert elements into an array.
   ```javascript
   const arr1 = [1, 2, 3];
   const arr2 = [4, 5, 6];
   const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
   ```

### Example 1: Using Spread Syntax with Objects

In this example, we have an object `person` and we create two new objects, `updatedPerson1` and `updatedPerson2`.

```javascript
const person = {
  name: "John",
  age: 30,
  city: "New York"
};

const updatedPerson1 = {
  person,
  age: 31,
  country: "USA"
};

const updatedPerson2 = {
  ...person,
  age: 31,
  country: "USA"
};

console.log("updated Person w/o spread...: ", updatedPerson1);
console.log("updated Person w spread ...: ", updatedPerson2);
```

- **Without Spread Syntax**: `updatedPerson1` includes the entire `person` object as a nested object under the key `person`. The output will be:
  ```javascript
  updated Person w/o spread...:  { person: { name: 'John', age: 30, city: 'New York' }, age: 31, country: 'USA' }
  ```

- **With Spread Syntax**: `updatedPerson2` spreads the properties of `person` into the new object, effectively copying them. The output will be:
  ```javascript
  updated Person w spread ...:  { name: 'John', age: 31, city: 'New York', country: 'USA' }
  ```

### Example 2: Using Spread Syntax to Pass Props Between React Components

In this example, we pass props from a parent component to a child component using the spread syntax.

```javascript
const ChildComponent = (props) => {
  console.log(props);
  
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

const App = () => {
  const obj = {
    title: "Hello World",
    description: "This is a description passed from the parent component."
  };

  return (
    <ChildComponent {...obj} obj={obj}/>
  );
};

export default App;
```

- **Without Spread Syntax**: If we pass the `obj` directly as a prop, it will be nested under the key `obj` in the `ChildComponent`'s props. The output of `console.log(props)` will be:
  ```javascript
  { obj: { title: 'Hello World', description: 'This is a description passed from the parent component.' } }
  ```

- **With Spread Syntax**: Using the spread syntax, the properties of `obj` are spread into the `ChildComponent`'s props. The output of `console.log(props)` will be:
  ```javascript
  { title: 'Hello World', description: 'This is a description passed from the parent component.', obj: { title: 'Hello World', description: 'This is a description passed from the parent component.' } }
  ```

This demonstrates how the spread syntax can simplify the process of passing multiple props and merging objects in JavaScript and React.

### Summary of Spread Syntax

The spread syntax (`...`) in JavaScript allows an iterable (like an array or string) or an object to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) or key-value pairs (for object literals) are expected. It is a convenient way to copy and merge objects or arrays.

- For more: [Spread Operator (8min)](https://youtu.be/4Zyr5a3m0Fc?si=Cf7DYtSjbYaR2srD)

---
## Part4: Named exports vs Default exports

In JavaScript, there are two main ways to export code from a module: **named exports** and **default exports**. Here's a breakdown of each:

#### Named Exports
- **Purpose**: Used to export multiple values from a module.
- **Syntax**: Each export is given a specific name.
- **Importing**: When importing, you must use the exact names of the exports.
- **Example**:
  ```javascript
  // module.js
  export const PI = 3.14159;
  export function square(x) {
    return x * x;
  }
  export function double(x) {
    return x * 2;
  }

  // anotherModule.js
  import { PI, square, double } from './module.js';
  console.log(PI); // 3.14159
  console.log(square(5)); // 25
  console.log(double(10)); // 20
  ```

#### Default Exports
- **Purpose**: Used to export a single value or entity from a module.
- **Syntax**: The export does not need a name.
- **Importing**: You can import it with any name you choose.
- **Example**:
  ```javascript
  // module.js
  const greeting = "Hello, world!";
  export default greeting;

  // anotherModule.js
  import greet from './module.js';
  console.log(greet); // "Hello, world!"
  ```

#### Key Differences
1. **Number of Exports**:
   - Named exports allow multiple exports per module.
   - Default exports allow only one default export per module.

2. **Import Syntax**:
   - Named exports require curly braces `{}` and must match the exported names.
   - Default exports do not use curly braces and can be imported with any name.

3. **Use Cases**:
   - Use named exports when you need to export multiple values.
   - Use default exports when a module has a single primary export.

---

## Part 5: QA

#### Why import images using the `import` syntax

Instead of directly writing the image path as a string (e.g., `img: "./images/book-1.jpg"`), the code uses the following two-step process:

```js
import img1 from "./images/book-1.jpg";

export const books = [
  {
    author: "Jordan Moore",
    title: "Interesting Facts For Curious Minds",
    img: img1,
    id: 1,
  },
];
```

- **Why Use This Two-Step Process?**
  - **Webpack and Image Optimization**: When you import images using the `import` syntax, Webpack (the module bundler used by React) processes and optimizes the images. This may involve compressing them or moving them to a different directory in the build folder to improve load times and performance.
  - **Correct Image Paths in Production**: Directly using a relative string path (`"./images/book-1.jpg"`) may not work correctly in production builds or when deploying your React app because the relative path might change. By importing the image, Webpack ensures the correct path is used in all environments.
  - **Cache Busting**: Webpack assigns a unique hash to each image file when it’s imported. If the image changes, the hash changes, which helps with browser cache busting.
  - **Type Safety and Error Checking**: If there’s a typo or error in the file path when using `import`, Webpack will throw an error during the build process. Directly using a string path may not raise an error until runtime.


#### `degit`

[`degit`](https://github.com/Rich-Harris/degit) is a tool designed to simplify the process of copying a repository.
 
- **How is `degit` Different from `git clone`?**

Here are the key differences:

  - `git clone` downloads the entire repository, including all branches, history, and metadata. This can be overkill if you only need a specific folder or subdirectory.
  - `degit`, on the other hand, allows you to download just a subdirectory or a specific folder from a repository, without the entire Git history or metadata.
  - It essentially creates a "clean" copy of a specific folder, removing all the `.git` files and making it more lightweight.


- Why `degit`?

  - **Subdirectory Cloning**: `degit` allows you to download a specific subdirectory from a repository, whereas `git clone` downloads the entire repository.
  - **No `.git` Directory**: `degit` does not include the `.git` directory, making the cloned directory a clean copy without version control history.
  - **Speed**: `degit` can be faster because it skips downloading the entire history and metadata.


<!-- 


3. **Function Arguments**: The spread operator can be used to pass elements of an array as arguments to a function.
   ```javascript
   function sum(x, y, z) {
     return x + y + z;
   }
   const numbers = [1, 2, 3];
   console.log(sum(...numbers)); // 6
   ```

4. **Destructuring**: It can be used in array and object destructuring to collect the remaining elements.
   ```javascript
   const [first, ...rest] = [1, 2, 3, 4];
   console.log(rest); // [2, 3, 4]
   ```

The spread operator simplifies many operations involving arrays and objects, making your code more concise and readable. -->


---
## Links
 
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Immutability in JavaScript](https://www.freecodecamp.org/news/immutability-in-javascript-with-examples/)