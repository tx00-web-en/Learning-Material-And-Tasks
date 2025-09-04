# Install Tailwind CSS with Vite

Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. In this tutorial, you’ll learn how to set up a new Vite project with Tailwind CSS.

### Step 1: Create Your Project

Start by creating a new Vite project if you don’t have one set up already. Run the following command to create a new Vite project with React:

```bash
npx create-vite@latest tailwind-demo --template react
cd tailwind-demo
```

### Step 2: Install Tailwind CSS

1. Install `tailwindcss` and its peer dependencies, then generate your `tailwind.config.js` and `postcss.config.js` files.

```bash
npm install -D tailwindcss@3.4.13 autoprefixer postcss

```

2. Next, generate your `tailwind.config.js` and `postcss.config.js` files:

```bash
npx tailwindcss init -p
```

### Step 3: Configure Your Template Paths

Add the paths to all of your template files in your `tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 4: Add the Tailwind Directives to Your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css`. 

1. First, delete the existing content of `./src/index.css`.
2. Now add the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 5: Update Your App Component

Replace the content of `App.jsx` with the following code:

```jsx
import React from "react";

function App() {
  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center sticky top-0 z-10 py-4 bg-blue-900">
        <div className="flex-shrink-0 ml-6 cursor-pointer">
          <i className="fas fa-wind fa-2x text-yellow-500"></i>
          <span className="text-3xl font-semibold text-blue-200">
            Tailwind School
          </span>
        </div>
        <ul className="flex mr-10 font-semibold">
          <li className="mr-6 p-1 border-b-2 border-yellow-500">
            <a className="cursor-default text-blue-200" href="#">
              Home
            </a>
          </li>
          <li className="mr-6 p-1">
            <a className="text-white hover:text-blue-300" href="#">
              News
            </a>
          </li>
          <li className="mr-6 p-1">
            <a className="text-white hover:text-blue-300" href="#">
              Tutorials
            </a>
          </li>
          <li className="mr-6 p-1">
            <a className="text-white hover:text-blue-300" href="#">
              Videos
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default App;
```

### Step 6: Start Your Development Server

Start your app by running the following command in your terminal:

```bash
npm run dev
```

### Step 7: Start Using Tailwind in Your Project

Now you can start using Tailwind’s utility classes to style your components!

### Troubleshooting Tips

- If you encounter any issues with class names not applying, ensure that your `tailwind.config.js` file is correctly set up with the paths to your template files.
- Make sure that you have installed all dependencies correctly.

### Additional Resources

- [Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
- [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides)
- [Core Concepts](https://tailwindcss.com/docs)
