# Theory: React

<!-- React has become one of the most popular tools for building dynamic user interfaces, especially for Single Page Applications (SPAs). Whether you're new to React or looking to refresh your knowledge, this guide will walk you through the basics, from understanding what React is to organizing components and passing data between them.

- [Introduction to React](#part-1-introduction-to-react)
- [Other Considerations](#part-5-other-considerations)
- [Extra Reading](#extra-reading) -->

----
## Part 1: Introduction to React

### What is React?
React is a powerful JavaScript library developed by Facebook. It's primarily used for building user interfaces (UIs) in web applications. React excels in creating reusable UI components that manage their own state, making development more efficient and the code easier to maintain.

### How Does React Relate to SPAs?
React is particularly well-suited for Single Page Applications (SPAs). An SPA is a type of web application that loads a single HTML page and dynamically updates content as the user interacts with it. This approach eliminates the need for full-page reloads, resulting in a faster and more seamless user experience. React manages these dynamic updates efficiently, allowing developers to build responsive and interactive UIs with ease.

### Library vs. Framework
- **Library:** React is considered a library because it provides specific tools for building UIs, focusing mainly on the view layer of your application.
- **Framework:** A framework, in contrast, offers a comprehensive set of tools, including routing, state management, and more. With React, you're free to choose how to handle these additional aspects, offering greater flexibility.

### Setting Up Your First React Project

1. **Install Node.js:**
   - Ensure that Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Create a New React Project:**
   - Open your terminal or command prompt and run:
      ```sh
      npx create-vite@latest  my-react-app --template react
      ```
   - Replace `my-react-app` with your desired project name.

3. **Run the Development Server:**
   - Navigate into your project directory:
      ```sh
      cd my-react-app
      ```
   - Install dependencies:
      ```sh
      npm install
      ```   
   - Start the development server:
      ```sh
      npm run dev
      ```
   - By default, Vite runs on port `5173`. You should see output similar to:
      ```bash
        VITE v4.5.5  ready in 471 ms

        ➜  Local:   http://localhost:5173/
        ➜  Network: use --host to expose
        ➜  press h to show help
      ```

### Vite vs create-react-app (CRA) 

Instead of using [Vite](https://vite.dev/), you can use `create-react-app`[ (*CRA*)](https://github.com/facebook/create-react-app) for your React projects. Key differences to note:

- **Entry file:** `CRA` uses `index.js`, while `vite` defaults to `main.jsx`.
- **File extension:** `CRA` typically uses `.js`, whereas `vite`  uses `.jsx`.

<!-- The key advantages of using `create-react-app` (*CRA*), especially those new to React, is that CRA provides a ready-to-use environment for React development, including bundling, linting, testing. `vite` serves a similar purpose and offers several advantages, especially in terms of build speed.  -->


## Part 2: Organizing Components and Using JSX

### Structuring Your React Components

React encourages modular design by allowing you to split your UI into small, reusable components. Let's create a couple of basic components and see how they fit into the main application.

1. **Create a `Hello` Component:**
   - Inside the `src` directory, create a file named `Hello.jsx` and add the following code:
      ```javascript
      function Hello() {
        return <h1>Hello, welcome to my React app!</h1>;
      }

      export default Hello;
      ```

2. **Create a `Bye` Component:**
   - Similarly, create a file named `Bye.jsx` in the `src` directory and add:
      ```javascript
      function Bye() {
        return <h1>Goodbye! Thanks for visiting.</h1>;
      }

      export default Bye;
      ```

### Understanding JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within your React components. JSX makes your code more intuitive and easier to write.

1. **Convert HTML to JSX:**
   - Converting basic HTML to JSX is straightforward, as JSX closely mirrors HTML syntax. For example:
     ```html
     <p>This is a paragraph.</p>
     <p>This is another paragraph.</p>
     ```
     converts directly to JSX:
     ```jsx
     <>
     <p>This is a paragraph.</p>
     <p>This is another paragraph.</p>
     </>
     ```

   - Use tools like [htmltojsx.com](https://transform.tools/html-to-jsx) to convert more complex HTML structures if needed.

2. **Apply CSS Styles:**
   - Create a `styles.css` file in the `src` directory and include your CSS styles.
   - Import the CSS file in your `App.jsx`:
      ```javascript
      import './styles.css';
      ```

## Part 3: Passing Data with Props

### Understanding Props in React

Props, short for "properties," are a way to pass data from a parent component to a child component. This is essential for creating dynamic and reusable components.

1. **Create Basic Components:**

   - **Header Component:**
     ```javascript
     function Header(props) {
       return <header><h1>{props.title}</h1></header>;
     }

     export default Header;
     ```

   - **MainContent Component:**
     ```javascript
     function MainContent(props) {
       return <main><p>{props.content}</p></main>;
     }

     export default MainContent;
     ```

   - **Footer Component:**
     ```javascript
     function Footer(props) {
       return <footer><p>{props.footerText}</p></footer>;
     }

     export default Footer;
     ```

2. **Compose Components to Build a Webpage:**
   - Now, import and use these components in your `App.jsx` to build a simple webpage:
      ```javascript
      import Header from './Header';
      import MainContent from './MainContent';
      import Footer from './Footer';

      function App() {
        return (
          <div>
            <Header title="Welcome to My React App" />
            <MainContent content="This is the main content of the page." />
            <Footer footerText="© 2025 My React App" />
          </div>
        );
      }

      export default App;
      ```

## Part 4: Advanced JSX and Props Usage

### Leveraging JSX with Props

Let's extend our example by demonstrating how props can be used to make your components more dynamic.

1. **Create a `Greeting` Component:**
   - In the `src` directory, create a file named `Greeting.jsx` with the following content:
      ```javascript
      function Greeting(props) {
        return <h2>{props.message}, {props.name}!</h2>;
      }

      export default Greeting;
      ```

2. **Update `App.jsx` to Use the `Greeting` Component:**
   - Import the `Greeting` component and pass props to it:
      ```javascript
      import Greeting from './Greeting';
      import Header from './Header';
      import MainContent from './MainContent';
      import Footer from './Footer';

      function App() {
        return (
          <div>
            <Header title="Welcome to My React App" />
            <Greeting message="Hello" name="John" />
            <MainContent content="This is the main content of the page." />
            <Greeting message="Goodbye" name="John" />
            <Footer footerText="© 2025 My React App" />
          </div>
        );
      }

      export default App;
      ```

3. **Apply CSS Styles:**
   - Make sure your components look good by updating your `styles.css` file with specific styles for each component.

4. **Organize Your Components:**
   - Ensure each component resides in its own file for better organization and maintainability. A clear folder structure in your `src` directory will make managing your growing React application easier.


----
## Part 5: Other Considerations

#### 1: Static UI vs. Interactive UI

In web development, a **Static UI** is one where the content and structure are fixed and do not change in response to user interactions. Such interfaces are simple and fast to load but can feel outdated in an era where user engagement is paramount. In contrast, an **Interactive UI** responds dynamically to user inputs, providing a more engaging and personalized experience. Modern web applications heavily rely on interactive UIs to create seamless and intuitive user experiences, making interactivity essential for maintaining user retention and satisfaction.

#### 2: Composition vs. Inheritance

React promotes **composition** over inheritance, which is a key distinction from traditional object-oriented programming. **Composition** allows developers to build complex UIs by combining smaller, reusable components. This approach leads to more maintainable and scalable code, as each component can focus on a specific functionality. **Inheritance** is less common in React and can lead to tighter coupling between components, making them harder to manage. Understanding how to effectively structure components using composition is crucial for developing reusable and maintainable React applications.

#### 3: Single-Responsibility Principle

The **Single-Responsibility Principle (SRP)** is a key tenet in software design, stating that a component or module should have only one reason to change. In the context of React, this means that each component should be focused on a specific piece of functionality or UI element. Adhering to SRP in React leads to smaller, more manageable components that are easier to debug, test, and reuse across different parts of an application. This principle helps in building a more maintainable and scalable codebase.

#### 4: Library vs. Framework

React is often described as a **library** rather than a framework, meaning it focuses specifically on the "view" layer of an application (the UI). Unlike frameworks, which provide a comprehensive structure for application development (including routing, state management, and more), React allows developers to choose how to integrate additional tools and libraries. This **flexibility** enables React to be used in a wide variety of projects, from simple static sites to complex enterprise applications, offering **scalability** without imposing a rigid structure.

#### 5: SPA (Single Page Application)

A **Single Page Application (SPA)** is a web application that loads a single HTML page and dynamically updates the content as the user interacts with it. SPAs provide a smoother user experience by reducing the need for full page reloads, which can lead to faster interactions and a more app-like feel. **React** is particularly well-suited for building SPAs because it efficiently manages updates to the DOM, ensuring that only the necessary parts of the page are re-rendered. This makes React a powerful tool for creating responsive, high-performance SPAs.

#### 6: AJAX

**Asynchronous JavaScript and XML (AJAX)** is a set of techniques used to send and retrieve data asynchronously from a server without interfering with the display and behavior of the existing page. In React, AJAX is often used to fetch data from APIs, allowing the application to update its state and re-render components without requiring a full page reload. React handles AJAX calls efficiently, often through the `fetch` API or libraries like `axios`, enabling developers to create dynamic and responsive web applications that can load data on the fly.

#### 7: Naming Conventions

When writing code, particularly in React, **naming conventions** play a crucial role in maintaining clarity and consistency. Some important conventions include:
- **PascalCase:** Used for naming React components (e.g., `MyComponent`).
- **camelCase:** Typically used for variables and function names (e.g., `myVariable`, `handleClick`).
- **kebab-case:** Commonly used in file names and CSS class names (e.g., `my-component.jsx`, `button-primary`).

Following these conventions ensures that your code is organized, readable, and adheres to best practices, making it easier to collaborate with other developers.

#### 8: Importing and Exporting Components

In React, **importing** and **exporting** components is fundamental to organizing and managing your application. You can export components using either **default exports** or **named exports**, and then import them into other files where they are needed. Understanding how to properly import and export components helps in maintaining a modular codebase, where each component is self-contained and can be easily reused across different parts of the application.

#### 9: `import` vs. `require`

The **`import`** statement, introduced in ES6, is the modern way of including modules in your JavaScript files, replacing the older **`require`** function. `import` allows for **static imports** and provides a cleaner syntax for bringing in modules, making your code easier to read and optimize. In React development, `import` is preferred because it aligns with modern JavaScript standards and facilitates tree-shaking, which helps reduce the final bundle size by eliminating unused code.

#### 10: `npx` vs. `npm`

Both **`npx`** and **`npm`** are command-line tools associated with Node.js, but they serve different purposes. **`npm`** is used to install packages and manage dependencies, while **`npx`** is a tool for executing Node.js packages without installing them globally. For example, when creating a new React project, `npx create-react-app` allows you to run `create-react-app` without needing to install it globally, ensuring you always use the latest version. Understanding when to use `npx` versus `npm` can streamline your development workflow.

#### 11: JSX (JavaScript XML)

**JSX** is a syntax extension for JavaScript that looks similar to HTML and is used within React to describe what the UI should look like. Although not required, JSX makes writing React components more intuitive by allowing developers to write HTML-like syntax directly within their JavaScript code. JSX is compiled down to regular JavaScript by tools like Babel, enabling it to work across all modern browsers. The adoption of JSX in React has made it a popular choice for building user interfaces.

#### 12: HTML to JSX

Converting **HTML to JSX** is straightforward but requires understanding some key differences. For instance, HTML attributes like `class` and `for` become `className` and `htmlFor` in JSX. Additionally, all JSX tags must be properly closed, even self-closing tags like `<img />` or `<input />`. Understanding these differences is crucial when migrating existing HTML code to a React application or when integrating new UI components into your React projects.

<!-- #### 13: CRA vs. Vite vs. Webpack

**Create React App (CRA)**, **Vite**, and **Webpack** are three popular tools for setting up React projects, each with its own strengths:
- **CRA** is an all-in-one solution that quickly scaffolds a new React project with sensible defaults, making it ideal for beginners.
- **Vite** is a modern build tool that offers faster development speeds and a lightweight configuration, making it suitable for developers looking for performance and simplicity.
- **Webpack** is a powerful and highly configurable bundler that can handle complex project requirements but comes with a steeper learning curve.

Choosing the right tool depends on your project’s needs and your familiarity with these technologies. -->

<!-- #### 13: Vite vs. CRA

When comparing **Vite** to **Create React App (CRA)**, the primary differences lie in performance and configuration flexibility:
- **Vite** is known for its lightning-fast build times and hot module replacement (HMR), making it a favorite for modern development workflows.
- **CRA** offers a more conventional setup with a larger community and more out-of-the-box features, which can be advantageous for teams looking for a tried-and-true solution. -->

#### 13: Babel - JSX to JavaScript

**Babel** is a JavaScript compiler that plays a critical role in React development by transpiling JSX into regular JavaScript. This process allows React code to run in any browser, even those that don’t natively support JSX or the latest JavaScript features. Babel also enables developers to use modern JavaScript syntax and features while maintaining compatibility with older browsers, making it an essential tool in the React ecosystem.

----
## Extra Reading

- [Your First Component]
- [Importing and Exporting Components]
- [Writing Markup with JSX]
- [JavaScript in JSX with Curly Braces]
- [Passing Props to a Component]
- [Conditional Rendering]
- Links:
  - [React Developer Tools](https://react.dev/learn/react-developer-tools)
  - [React snippets](https://github.com/rodrigovallades/vscode-es7-javascript-react-snippets)



<!-- Links -->
[Your First Component]:https://react.dev/learn/your-first-component
[Importing and Exporting Components]:https://react.dev/learn/importing-and-exporting-components
[Writing Markup with JSX]:https://react.dev/learn/writing-markup-with-jsx
[JavaScript in JSX with Curly Braces]:https://react.dev/learn/javascript-in-jsx-with-curly-braces
[Passing Props to a Component]:https://react.dev/learn/passing-props-to-a-component
[Conditional Rendering]:https://react.dev/learn/rendering-lists 
