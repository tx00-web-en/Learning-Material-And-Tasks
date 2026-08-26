# Activity: React

There are two parts in this activity.

> Before starting this activity, ensure you have a root folder e.g. "Dev" or "Web-Dev" in your Documents directory. Inside the root folder, create another folder called "week3" if it doesn't already exist.

---
## Part 1:

In this part, we'll guide you through two fundamental JavaScript concepts: the `map()` method and `object destructuring`. 

**Step 1: Understanding the `map()` Method**

In this step, we'll explore the `map()` method, a powerful tool for transforming array elements by applying a custom function.

1. **Create a Directory and Files**:

- Start by creating a new directory for your lab e.g `javascript-concepts-lab `
- Create a new file named `map.js` in the `javascript-concepts-lab` directory.


2. **Write and Execute Code**:

Open the `map.js` file and add the following code:

```javascript
const numbers = [2, 4, 6, 8, 10];

const doubledNumbers = numbers.map((num) => num * 2);

console.log('Original Numbers:', numbers);
console.log('Doubled Numbers:', doubledNumbers);
```

Save the file and run it using Node.js:

```bash
node map.js
```

3. **Explanation**:

In the provided code, we declare an array called `numbers` containing numeric values. Using the `map()` method, we double each number in the array by applying a custom function `(num) => num * 2`. The transformed array is stored in `doubledNumbers`. By logging both the original and transformed arrays, we observe how the `map()` method can efficiently modify array elements.

4. **Optional: Example 1 - Converting Temperatures to Kelvin**:

```javascript
const temperaturesCelsius = [0, 15, 30, 45];

const temperaturesKelvin = temperaturesCelsius.map((celsius) => celsius + 273.15);

console.log('Celsius Temperatures:', temperaturesCelsius);
console.log('Kelvin Temperatures:', temperaturesKelvin);
```

5. **Optional: Example 2 - Capitalizing Names**:

```javascript
const names = ['alice', 'bob', 'carol'];

const capitalizedNames = names.map((name) => name.charAt(0).toUpperCase() + name.slice(1));

console.log('Original Names:', names);
console.log('Capitalized Names:', capitalizedNames);
```


**Step 2: Object Destructuring**

This step introduces `object destructuring`, a technique for extracting specific values from objects.

1. **Create a File**:

Create a new file named `destructuring.js` in the same directory.

2. **Write and Execute Code**:

Open `destructuring.js` and add the following code:

```javascript
const person = { name: 'Alice', age: 30, city: 'New York' };

const { name, age } = person;

console.log('Name:', name);
console.log('Age:', age);
```

Run the file using Node.js:

```bash
node destructuring.js
```

3. **Explanation**:

In this code snippet, we define an object called `person` with properties like `name`, `age`, and `city`. By employing object destructuring, we directly extract the `name` and `age` properties into separate variables. Logging these variables demonstrates the power of object destructuring in simplifying access to specific values within objects.


4. **Optional: Example 1 - Extracting Nested Properties**:

```javascript
const person = { name: 'Alice', info: { age: 30, occupation: 'Engineer' } };

const { name, info: { age, occupation } } = person;

console.log('Name:', name);
console.log('Age:', age);
console.log('Occupation:', occupation);
```

5. **Optional: Example 2 - Extracting Function Parameters from an Object**:

```javascript
function greetUser({ name, age }) {
  console.log(`Hello, ${name}! You're ${age} years old.`);
}

greetUser({ name: 'Bob', age: 25 });
```

---
## Part 2: Rendering a List of Books in React

#### Objective:

In this part, you will learn how to work with lists in React by importing a list of books from a file and rendering them using the `map()` function.

#### Instructions:

**Step 1: Set Up Your Project**

1. Open your `VS Code` editor in the `week3` directory.
2. Create a new React project and start the development server. For full steps on creating a React project with `Vite`, refer to [these instructions](./vite.md). In brief, run:

   ```bash
   npx create-vite@latest react-lists-lab1 --template react
   cd react-lists-lab1
   npm install
   npm run dev
   ```

   - This will create a new React project named `react-lists-lab1` and start it.
   - **Note**: By default, Vite runs on port `5173`.  
   - When using Vite with React, it’s recommended to use the `.jsx` extension for files containing JSX syntax. If a file contains only standard JavaScript, the `.js` extension is fine.


**Step 2: Create a Data File**

1. Create a new JavaScript file named `booksData.js` in the `src` directory.
2. Define an array of book objects in the `booksData.js` file. For example:

```js
const booksData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
  },
];

export default booksData;
```

**Step 3: Create a Book Component**

1. Create a new file named `Book.jsx` in in the `src` directory.
2. In the `Book.jsx` file, create a functional React component to display a single book. You can use the following template:

```jsx
import React from 'react';

function Book({ book }) {
  return (
    <div className="book">
      <h2 className="book-title">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
    </div>
  );
}

export default Book;
```

**Step 4: Style Your Books**

Add CSS to style your `Book` component and the list of books to make it visually appealing.
- Create a new CSS file named `Book.css` in the same directory as your `Book.jsx` file.
- Add CSS styles to the `Book.css` file to style the book components as desired. For example:

```css
.book {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
}

.book-title {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}
```


**Step 5: Import and Display Books in App Component**

1. Open `App.jsx` file, located in the `src` directory and delete al the content.
2. Import the `Book` component at the top of the `App.js` file.

```jsx
import Book from './Book';
```

3. In `App.jsx`, import the `booksData.js` file to access the list of books.

```jsx
import booksData from './booksData';
```

4. In `App.jsx`, import the `Book.css` file 

```jsx
import './Book.css';
```

5. Inside the `App` component, use the `map()` function to render each book from the imported data. Here's the final code:

```jsx
function App() {
  return (
    <div className="App">
      <h1>Book List</h1>
      <div className="book-list">
  {booksData.map(book => <Book key={book.id}  book={book} name="Matti"/>)} 
      </div>
    </div>
  );
}

export default App;
```

**Step 6: Test Your Application**

1. Save your files and make sure your React development server is still running.
2. Open your web browser and visit the URL specified by your React project e.g `http://localhost:5173`. It is possible to change the default port e.g `3000`, here's a [guideline](./vite.md#2-optional-change-the-default-port-to-3000-and-open-browser-automatically).
3. You should see a list of books rendered on the page.
4. To stop the server, use `ctr+c` (win users)

> **Note:** The components are centered in the browser because Vite initializes `index.css` with default styles. You can either comment out all the content in `index.css` or delete it. After doing this, you should see that the components are now styled correctly.


**Step 7: Observe the Result Without the key Prop**

Replace the code in the App.js file with the following:

```jsx
import Book from './Book';
import booksData from './booksData';
import './Book.css';

function App() {
  return (
    <div className="App">
      <h1>Book List</h1>
      <div className="book-list">
        {
        booksData.map(
          (book) => (
          <Book book={book} />))
        }
      </div>
    </div>
  );
}

export default App;
```

- Save your files and make sure your React development server is still running.
- Observe the result and take note of any warnings or issues in the browser console related to the missing key prop.
- Open your App.js file again and add the key prop back to the Book component when rendering the list of books.

```jsx
{booksData.map((book) => (
  <Book key={book.id} book={book} />
)}
```




