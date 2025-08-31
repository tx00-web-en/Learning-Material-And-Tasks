# Activity: React ...

There are two parts in this activity.

- Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. 

---
## Part 1:

#### Step 0: Setting Up Your React Environment

1. **Step 1: Set Up Your Project**

1. Open your `VS Code` editor in the `week3` directory.
2. Create a new React project and start the development server. In brief, run:

   ```bash
   npx create-vite@latest react-lists-lab2 --template react
   cd react-lists-lab2
   npm install
   npm run dev
   ```

   - This will create a new React project named `react-lists-lab2` and start it.
   - **Note**: By default, Vite runs on port `5173`.  
   - When using Vite with React, it’s recommended to use the `.jsx` extension for files containing JSX syntax. If a file contains only standard JavaScript, the `.js` extension is fine.
   - For full steps on creating a React project with `Vite`, refer to [these instructions](./vite.md).

2. **Download Book Images:**
   - To download the images needed for the books, use the [`degit`](https://github.com/Rich-Harris/degit) tool. From within the `react-lists-lab2/src/assets` directory, run the following command:

   ```sh
   npx degit tx00-web-en/Learning-Material-And-Tasks/material/resources/books/images#week3 images
   ```

  > [`degit`](https://github.com/Rich-Harris/degit) is a tool created by Rich Harris, which simplifies the process of downloading a specific subdirectory from a Git repository, rather than cloning the entire repository.

---

#### Step 1: Create a Data File

- Create a new file named `books.js` in the `src` directory.
- This file will contain the data for your books:

```js
// src/books.js
import img1 from "./assets/images/book-1.jpg";
import img2 from "./assets/images/book-2.jpg";
import img3 from "./assets/images/book-3.jpg";

export const books = [
  {
    author: "Jordan Moore",
    title: "Interesting Facts For Curious Minds",
    img: img1,
    id: 1,
  },
  {
    author: "James Clear",
    title: "Atomic Habits",
    img: img2,
    id: 2,
  },
  {
    author: "Stephen King",
    title: "Fairy Tale",
    img: img3,
    id: 3,
  },
];
```

- This file exports an array of book objects. Each object contains `author`, `title`, `img`, and `id` properties.

---

#### Step 2: Create a Book Component

- Create a new file named `Book.jsx` in the `src` directory.
- This file will contain a functional component that represents a single book:

```js
// src/Book.jsx
const Book = (props) => {
  const { img, title, author } = props.book;

  return (
    <article className='book'>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <h4>{author}</h4>
    </article>
  );
};

export default Book;
```

- The `Book` component takes `props` as an argument, which contains book. It returns an article element that displays the book's image, title, and author.
- `{ img, title, author } = props.book;`, is an example of *Destructuring assignment* in JavaScript. It allows you to extract properties from an object and assign them to variables. If you have a `book` object like this:

    ```javascript
    const book = {
    img: "image_url",
    title: "Book Title",
    author: "Author Name"
    };
    ```

    You can destructure it as follows:

    ```javascript
    const { img, title, author } = book;
    ```

    This is equivalent to:

    ```javascript
    const img = book.img;
    const title = book.title;
    const author = book.author;
    ```

---

#### Step 3: Import Books in BookList

- Create a new file named `BookList.jsx` in the `src` directory.
- This file will import the `books` array from `books.js` and use the `Book` component to display each book:

```js
// src/BookList.jsx
import { books } from "./books";
import Book from "./Book";

function BookList() {
  return (
    <>
      <h1>Amazon Best Sellers</h1>
      <section className="booklist">
        {books.map((book) => {
          return <Book key={book.id} book={book}/>;
        })}
      </section>
    </>
  );
}

export default BookList;
```

- Here, we use the `map` method to iterate over the `books` array and create a `Book` component for each book.
- **Why `map` is Good for Pure Functions:**
  - The `map` method creates a new array without mutating the original array, making it a pure function. This is ideal in React because it ensures that state changes are predictable and components re-render efficiently.
- **Why We Need `key={book.id}`:**
  - Each child in a list should have a unique key to help React identify which items have changed, been added, or removed. This improves performance and avoids unnecessary re-renders.

---

#### Step 4: Import BookList in App Component

- Open `App.jsx` file, located in the `src` directory, delete al the content, import the `BookList` component and render it:

```js
// src/App.jsx
import BookList from './BookList';
import './App.css';

function App() {
  return <BookList />;
}

export default App;
```

---

#### Step 5: Style Your Books

- Delete the content of the file `index.css` in the `src` directory 
- Delete the content of the file `App.css` in the `src` directory and add these styles to improve the appearance of your book list:

```css
/* src/App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: #f1f5f8;
  color: #222;
}

.booklist {
  width: 90vw;
  max-width: 1170px;
  margin: 5rem auto;
  display: grid;
  gap: 2rem;
}

@media screen and (min-width: 768px) {
  .booklist {
    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: 1fr 1fr 1fr;
    align-items: start;
  }
}
.book {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
}
.book img {
  width: 100%;
  object-fit: cover;
}
.book h2 {
  margin-top: 1rem;
  font-size: 1rem;
}

.book h4 {
  color: #617d98;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  letter-spacing: 2px;
}
.book p {
  margin: 1rem 0 0.5rem;
}
h1 {
  text-align: center;
  margin-top: 4rem;
  text-transform: capitalize;
}
```

- These styles will make the book list visually appealing, with improved layout.

---

#### Step 6: Test Your Application

- Save all files and ensure your development server is running.
- Open your web browser and visit the URL specified by your React project e.g `http://localhost:5173` or `http://localhost:3000`
- You should see a list of books displayed with their images, titles, and authors.
- To stop the server, use `ctr+c` (win users)

---

#### `map()`

- **Immutability**
  - The `map` method creates a new array by applying a function to each element of the original array without modifying the original array. This immutability ensures that the original data remains unchanged, which is crucial for maintaining predictable state changes in React applications.
- **Importance of Using Unique Keys (`key={book.id}`):**
  - React uses the `key` prop to track and manage elements in the virtual DOM. Providing a unique `key` helps React efficiently update and re-render only the changed components, thereby optimizing performance.

---

## Part 2: Rendering a List of Tours in React

> In this part, you will follow step-by-step instructions to complete the Tours App, **except for the file** `ToursList.jsx`. You **need to write the missing code**.

#### Objective:

In this part, you will learn how to work with lists in React by importing a list of tours from a file and rendering them using the `map()` function.

#### Instructions:

**Step 1: Set Up Your Project**

1. Open your `VS Code` editor in the `week3` directory.
2. Create a new React project and start the development server. In brief, run:

   ```bash
   npx create-vite@latest react-lists-lab3 --template react
   cd react-lists-lab3
   npm install
   npm run dev
   ```

   - This will create a new React project named `react-lists-lab3` and start it.
   - **Note**: By default, Vite runs on port `5173`.  
   - When using Vite with React, it’s recommended to use the `.jsx` extension for files containing JSX syntax. If a file contains only standard JavaScript, the `.js` extension is fine.
   - For full steps on creating a React project with `Vite`, refer to [these instructions](./vite.md).

**Step 2: Create a Data File**

1. Create a new JavaScript file named `toursData.js` in the the `src` directory.
2. Define an array of tour objects in the `toursData.js` file. For example:

```jsx
// src/toursData.js
//https://www.course-api.com/images/tours/tour-5.jpeg
export const tours = [
    {
      id: "rec6d6T3q5EBIdCfD",
      name: "Best of Paris in 7 Days Tour",
      info: "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-1.jpeg",
      price: "1,995",
    },
    {
      id: "recIwxrvU9HfJR3B4",
      name: "Best of Ireland in 14 Days Tour",
      info: "Rick Steves' Best of Ireland tour kicks off with the best of Dublin, followed by Ireland's must-see historical sites, charming towns, music-filled pubs, and seaside getaways — including Kinsale, the Dingle Peninsula, the Cliffs of Moher, the Aran Islands, Galway, Connemara, Giant's Causeway, and the compelling city of Belfast. All along the way, Rick's guides will share their stories to draw you in to the Emerald Isle, and the friendliness of the people will surely steal your heart. Join us for the Best of Ireland in 14 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-2.jpeg",
      price: "3,895",
    },
    {
      id: "recJLWcHScdUtI3ny",
      name: "Best of Salzburg & Vienna in 8 Days Tour",
      info: "Let's go where classical music, towering castles, and the-hills-are-alive scenery welcome you to the gemütlichkeit of Bavaria and opulence of Austria's Golden Age. Your Rick Steves guide will bring this region's rich history and culture to life in festive Munich, Baroque Salzburg, sparkling Lake Hallstatt, monastic Melk, the blue Danube, and royal Vienna — with cozy villages and alpine vistas all along the way. Join us for the Best of Munich, Salzburg & Vienna in 8 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-3.jpeg",
      price: "2,695",
    },
    {
      id: "recK2AOoVhIHPLUwn",
      name: "Best of Rome in 7 Days Tour",
      info: "Our Rome tour serves up Europe's most intoxicating brew of dazzling art, earth-shaking history, and city life with style. On this Rome vacation, your tour guide will resurrect the grandeur of ancient Rome's Colosseum, Forum, Pantheon, and nearby Ostia Antica. From the Renaissance and Baroque eras, you'll marvel at St. Peter's Basilica, the Vatican Museums, Sistine Chapel, and Borghese Gallery. You'll also enjoy today's Rome, with neighborhood walking tours, memorable restaurants, and time to explore on your own. Join us for the Best of Rome in 7 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-4.jpeg",
      price: "2,095",
    },
    {
      id: "receAEzz86KzW2gvH",
      name: "Best of Poland in 10 Days Tour",
      info: "Starting in the colorful port city of Gdańsk, you'll escape the crowds and embrace the understated elegance of ready-for-prime-time Poland for 10 days. With an expert Rick Steves guide at your side, you'll experience mighty Malbork castle, the cobbly-cute village of Toruń, Poland's contemporary capital of Warsaw, the spiritual Jasna Góra Monastery, and charming Kraków — Poland's finest city. In this land of surprises — so trendy and hip, yet steeped in history — there's so much to discover. Join us for the Best of Poland in 10 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-5.jpeg",
      price: "2,595",
    },
  ];
```

**Step 3: Create a Tour Component**

1. Create a new file named `Tour.jsx` in the  `src` directory.
2. In the `Tour.jsx` file, create a functional React component to display a single tour. You can use the following code:

```jsx
// src/Tour.jsx
const Tour = (props) => {
    const { image, info, name, price } = props.tour;

  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">€{price}</h4>
        </div>
        <p>
          {`${info.substring(0, 200)}...`}
          <button>read more</button>
        </p>
        <button className="delete-btn">not interested</button>
      </footer>
    </article>
  );
};

export default Tour;
```

#### Step 4: Import Tours in TourList

- Create a new file named `TourList.jsx` in the `src` directory.
- This file will import the `tours` array from `tours.js` and use the `Tour` component to display each book. 
- **Write the missing code** to render each tour from the imported data.


```js
// src/TourList.jsx
import Tour from "./Tour";

const TourList = (props) => {
  const { tours } = props;
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {/*Write the missing code here  */}
      </div>
    </section>
  );
};

export default TourList;
```

---

#### Step 5: Import TourList in App Component

- Open `App.jsx` file, located in the `src` directory, delete al the content, import the `TourList` component and render it:

```js
// src/App.jsx
import TourList from "./TourList";
import { tours } from "./toursData";
import "./App.css";

function App() {
  return (
    <main>
      <TourList tours={tours} />
    </main>
  );
}

export default App;
```

---


#### Step 6: Style Your Tours

- Delete the content of the file `index.css` in the `src` directory 
- Delete the content of the file `App.css` in the `src` directory and add these styles to improve the appearance of your tour list:


```css
/* 
//src/App.css 
=============== 
Variables
===============
*/

:root {
    /* dark shades of primary color*/
    --clr-primary-1: hsl(205, 86%, 17%);
    --clr-primary-2: hsl(205, 77%, 27%);
    --clr-primary-3: hsl(205, 72%, 37%);
    --clr-primary-4: hsl(205, 63%, 48%);
    /* primary/main color */
    --clr-primary-5: hsl(205, 78%, 60%);
    /* lighter shades of primary color */
    --clr-primary-6: hsl(205, 89%, 70%);
    --clr-primary-7: hsl(205, 90%, 76%);
    --clr-primary-8: hsl(205, 86%, 81%);
    --clr-primary-9: hsl(205, 90%, 88%);
    --clr-primary-10: hsl(205, 100%, 96%);
    /* darkest grey - used for headings */
    --clr-grey-1: hsl(209, 61%, 16%);
    --clr-grey-2: hsl(211, 39%, 23%);
    --clr-grey-3: hsl(209, 34%, 30%);
    --clr-grey-4: hsl(209, 28%, 39%);
    /* grey used for paragraphs */
    --clr-grey-5: hsl(210, 22%, 49%);
    --clr-grey-6: hsl(209, 23%, 60%);
    --clr-grey-7: hsl(211, 27%, 70%);
    --clr-grey-8: hsl(210, 31%, 80%);
    --clr-grey-9: hsl(212, 33%, 89%);
    --clr-grey-10: hsl(210, 36%, 96%);
    --clr-white: #fff;
    --clr-red-dark: hsl(360, 67%, 44%);
    --clr-red-light: hsl(360, 71%, 66%);
    --clr-green-dark: hsl(125, 67%, 44%);
    --clr-green-light: hsl(125, 71%, 66%);
    --clr-black: #222;
    --transition: all 0.3s linear;
    --spacing: 0.1rem;
    --radius: 0.25rem;
    --light-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    --dark-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    --max-width: 1170px;
    --fixed-width: 620px;
  }
  /*
  =============== 
  Global Styles
  ===============
  */
  
  *,
  ::after,
  ::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: var(--clr-grey-10);
    color: var(--clr-grey-1);
    line-height: 1.5;
    font-size: 0.875rem;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
  }
  h1,
  h2,
  h3,
  h4 {
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    line-height: 1.25;
    margin-bottom: 0.75rem;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.25rem;
  }
  h4 {
    font-size: 0.875rem;
  }
  p {
    margin-bottom: 1.25rem;
    color: var(--clr-grey-5);
  }
  @media screen and (min-width: 800px) {
    h1 {
      font-size: 4rem;
    }
    h2 {
      font-size: 2.5rem;
    }
    h3 {
      font-size: 1.75rem;
    }
    h4 {
      font-size: 1rem;
    }
    body {
      font-size: 1rem;
    }
    h1,
    h2,
    h3,
    h4 {
      line-height: 1;
    }
  }
  /*  global classes */
  
  /* section */
  .section {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  
  @media screen and (min-width: 992px) {
    .section {
      width: 95vw;
    }
  }
  .btn {
    background: var(--clr-primary-5);
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    text-transform: capitalize;
    color: var(--clr-white);
    letter-spacing: var(--spacing);
    border-color: transparent;
    cursor: pointer;
    margin-top: 2rem;
    font-size: 1.2rem;
  }
  /*
  =============== 
  Tours
  ===============
  */
  main {
    width: 90vw;
    max-width: var(--fixed-width);
    margin: 5rem auto;
  }
  .loading {
    text-align: center;
  }
  .title {
    text-align: center;
    margin-bottom: 4rem;
  }
  .underline {
    width: 6rem;
    height: 0.25rem;
    background: var(--clr-primary-5);
    margin-left: auto;
    margin-right: auto;
  }
  
  .single-tour {
    background: var(--clr-white);
    border-radius: var(--radius);
    margin: 2rem 0;
    box-shadow: var(--light-shadow);
    transition: var(--transition);
  }
  .single-tour:hover {
    box-shadow: var(--dark-shadow);
  }
  .single-tour img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
  }
  .tour-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .tour-info h4 {
    margin-bottom: 0;
  }
  .single-tour button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--clr-primary-5);
    font-size: 1rem;
    cursor: pointer;
    padding-left: 0.25rem;
  }
  .tour-price {
    color: var(--clr-primary-5);
    background: var(--clr-primary-10);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  .single-tour footer {
    padding: 1.5rem 2rem;
  }
  .single-tour .delete-btn {
    display: block;
    width: 200px;
    margin: 1rem auto 0 auto;
    color: var(--clr-red-dark);
    letter-spacing: var(--spacing);
    background: transparent;
    border: 1px solid var(--clr-red-dark);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
```

- In `App.jsx`, we have **already** imported `App.css` 

```jsx
import './App.css';
```

**Step 7: Test Your Application**

1. Save your files and make sure your React development server is still running.
2. Open your web browser and visit the URL specified by your React project e.g `http://localhost:5173` or `http://localhost:3000`
3. You should see a list of tours rendered on the page.
4. To stop the server, use `ctr+c` (win users)


---

> For a review and optional exercises on this topic, you can refer to the following link: [Rendering Lists in React](https://react.dev/learn/rendering-lists).