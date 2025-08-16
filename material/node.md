# Theory: Node Modules

Node.js is an open-source, cross-platform runtime environment built on the V8 JavaScript engine. It enables developers to execute JavaScript code on the server-side, outside of a web browser, making it a versatile platform for building various types of applications, including web servers, APIs, real-time applications, and more.

Node.js allows you to create and run JavaScript files as scripts. You can create a .js file containing JavaScript code and execute it using the node command in the terminal. This is useful for automating tasks, building utilities, and creating more complex applications. 

---
## Custom Modules

Node.js supports modular programming by allowing you to create your own reusable modules. You can create a module by defining functions, classes, or variables in a separate .js file. To use a module, you use the require function and provide the path to the module file. This helps in organizing code, promoting reusability, and maintaining clean and readable codebases.

<!-- Modules are a way to organize, structure, and encapsulate code in JavaScript applications. They allow you to break down your code into smaller, manageable pieces, making it easier to maintain, collaborate, and reuse. While ES6 introduced a standardized module system, CommonJS has been traditionally used in Node.js and provides a different way to work with modules. -->

1. **Exporting Modules:**
    - In CommonJS, you use `module.exports` to export functions, variables, classes, or objects from a module.
    - Example:
      ```javascript
      // math.js
      const add = (a, b) => a + b;
      const subtract = (a, b) => a - b;

      module.exports = { add, subtract };
      ```

2. **Importing Modules:**
    - The `require` function is used to import functionalities from other modules.
    - Example:
      ```javascript
      // app.js
      const { add, subtract } = require('./math');
      console.log(add(5, 3)); // 8
      ```

3. **Default Exports:**
    - In CommonJS, you can export a single value as the default export by assigning it to `module.exports`.
    - Example:
      ```javascript
      // utility.js
      const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

      module.exports = capitalize;
      ```
      ```javascript
      // app.js
      const capitalize = require('./utility');
      console.log(capitalize('hello')); // 'Hello'
      ```

4. **Namespace Imports:**
    - You can import all exported values from a module into a single object by using `require` without destructuring.
    - Example:
      ```javascript
      // library.js
      const func1 = () => {};
      const func2 = () => {};

      module.exports = { func1, func2 };
      ```
      ```javascript
      // app.js
      const library = require('./library');
      library.func1(); // Calling Function 1
      library.func2(); 
      ```

Modules provide a clean and organized way to structure your codebase, making it easier to manage larger projects and promote code reusability. As you become more comfortable with modules, you'll find them invaluable for maintaining a well-organized and maintainable codebase.

### Export Default

The `module.exports` statement allows you to export a single value as the default export from a module. This value is typically the main or most important functionality that you want to share from the module.

Example:

```javascript
// utility.js
const greet = (name) => `Hello, ${name}!`;

module.exports = greet;
```

```javascript
// app.js
const greet = require('./utility');

console.log(greet('Alice')); // 'Hello, Alice!'
```

In this example, the `greet` function is exported as the default export from the `utility.js` module, and it's imported and used in the `app.js` file.

### Named Exports using `module.exports = { ... }`

Named exports allow you to export multiple values from a module, each with its own name. This is useful when you want to export multiple functions, variables, or classes from the same module.

Example:

```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };
```

```javascript
// app.js
const { add, subtract } = require('./math');

console.log(add(5, 3)); // 8
```

In this example, both the `add` and `subtract` functions are exported as named exports from the `math.js` module and imported into the `app.js` file.

### Combining Default and Named Exports

In CommonJS, you typically choose between exporting a single default value or exporting an object with named exports. However, you can still achieve similar functionality by exporting an object with multiple properties.

Example:

```javascript
// utilities.js
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const greet = (name) => `Hello, ${name}!`;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = { getRandomNumber, greet, capitalize };
```

```javascript
// app.js
const { getRandomNumber, greet, capitalize } = require('./utilities');

console.log(getRandomNumber(1, 100));
console.log(greet('Alice'));
console.log(capitalize('hello'));
```

In this example, `getRandomNumber`, `greet`, and `capitalize` are exported as named exports from the `utilities.js` module.

### Browser Compatibility

CommonJS modules are primarily used in Node.js and are not natively supported by web browsers. However, you can bundle your CommonJS modules for the browser using tools like Webpack or Browserify.

### Node.js Compatibility

Node.js is built on the CommonJS module system, making `require` and `module.exports` the standard way to manage modules in Node.js applications. While Node.js also supports ES6 modules, CommonJS remains widely used, especially in existing codebases.

---
## Built-in Core Modules

Node.js comes with a set of built-in modules known as core modules. These modules provide essential functionalities for various tasks such as file I/O, networking, working with URLs, and more. Examples of core modules include fs (file system), http (HTTP server), url (URL handling), path (file path manipulation), and util (utility functions).

----
## Node.js Architecture:

Node.js is built on a single-threaded, event-driven, and non-blocking architecture. The core of Node.js uses an event loop to handle asynchronous operations efficiently. It uses the V8 JavaScript engine (also used in Google Chrome) to execute JavaScript code. Node.js's event-driven architecture allows it to handle a large number of concurrent connections without blocking the execution of other code. Node.js also provides the EventEmitter class, which is used for creating and handling custom events.

### Key Features and Advantages:

- Non-blocking I/O: Node.js uses an event-driven, non-blocking I/O model, which makes it well-suited for handling a large number of concurrent connections and asynchronous operations without blocking the execution of other code.

- Fast Execution: Node.js is built on the V8 JavaScript engine developed by Google. V8 compiles JavaScript into machine code before executing it, resulting in fast execution speeds.

- Single-threaded Event Loop: Node.js follows a single-threaded event loop architecture, which efficiently manages asynchronous operations and callbacks. This architecture simplifies the development of scalable and responsive applications.

- NPM (Node Package Manager): Node.js comes with npm, a powerful package manager that allows developers to easily install, manage, and share packages (libraries and modules) needed for their projects.

- Rich Ecosystem: The Node.js ecosystem has a vast collection of libraries and frameworks that simplify various development tasks, including Express.js for building web applications, Socket.IO for real-time communication, and more.

Universal Language: Using JavaScript for both client-side and server-side development allows developers to use a single language across the entire application stack, streamlining development and facilitating code sharing.

- Scalability: Node.js's event-driven architecture and non-blocking I/O make it well-suited for building scalable applications that can handle many simultaneous connections efficiently.


### Use Cases:

Node.js is used in a wide range of applications, including:

- Web Servers: Node.js is commonly used to build fast, lightweight web servers. Libraries like Express.js simplify the process of creating RESTful APIs and web applications.

- Real-time Applications: Applications requiring real-time updates and interactions, such as chat applications, online gaming platforms, and collaborative tools, benefit from Node.js's ability to handle concurrent connections effectively.

- Microservices: Node.js is well-suited for building microservices architectures due to its lightweight nature and support for asynchronous programming. Here’s a beginner-friendly [tutorial](https://www.turing.com/kb/how-to-build-microservices-with-node-js).

- Command-line Tools: Developers can create powerful command-line tools using Node.js, thanks to its access to the file system and extensive libraries.

- Internet of Things (IoT): Node.js's lightweight nature makes it suitable for running on resource-constrained devices, making it popular for building IoT applications.

### Node.js REPL (Read-Eval-Print Loop):

Node.js provides a REPL environment, which stands for Read-Eval-Print Loop. It allows you to interactively execute JavaScript code in the terminal or command prompt. In the REPL, you can type JavaScript expressions, statements, and even multiline code, and see the immediate results. It's a useful tool for testing code snippets, exploring language features, and debugging.

--------
## Supplementary material

- https://www.w3schools.com/nodejs/
- https://www.geeksforgeeks.org/nodejs/

----


----
<details>

<summary>(Optional) Browser engines vs JavaScript engines </summary>


Browser engines and JavaScript engines are both crucial components of web development, each with its own specific tasks and responsibilities. Browser engines handle rendering, layout, and user interactions, while JavaScript engines are responsible for executing JavaScript code efficiently. Both types of engines collaborate to create a seamless and interactive web browsing experience.



### Browser engines

Browser engines, also known as rendering engines, are critical components of web browsers that interpret and render web content, such as HTML, CSS, and JavaScript, into visually rendered pages that users can interact with. These engines play a crucial role in rendering web pages consistently across different browsers and devices. Here's an overview of how browser engines work and some of the most well-known ones:

#### Components of Browser Engines:
Browser engines consist of several components that work together to process and render web content:

- HTML Parser: The engine's HTML parser reads the HTML markup of a web page and constructs a Document Object Model (DOM) tree, which represents the structure of the page's elements.

- CSS Parser: The CSS parser reads the CSS stylesheets associated with the page and constructs a CSS Object Model (CSSOM) tree, which represents the styles applied to the DOM elements.

- Render Tree Construction: The render tree is a combination of the DOM and CSSOM trees. It represents the final structure of elements to be displayed on the screen, taking into account styles, layout, and visual properties.

- Layout (Reflow): The layout engine calculates the positioning and dimensions of elements in the render tree. This process is also known as reflow or layout. It determines how elements are displayed on the screen, including their size, position, and alignment.

- Painting: The painting phase involves rendering the content on the screen by filling in pixels with the appropriate colors, gradients, and patterns.

- JavaScript Engine Integration: Browser engines also integrate with JavaScript engines (like V8 in Chrome, SpiderMonkey in Firefox) to execute JavaScript code and update the DOM dynamically.

#### Common Browser Engines:

Several popular web browsers use their own rendering engines, which contribute to differences in how web content is displayed and rendered:
- Blink (Used in Chrome and Chromium-based Browsers): Blink is a rendering engine developed by Google, forked from the WebKit engine. It powers Google Chrome, Microsoft Edge (Chromium version), and other Chromium-based browsers.

- Gecko (Used in Firefox): Gecko is the rendering engine developed by Mozilla Foundation. It powers the Firefox browser and focuses on standards compliance, performance, and security.

- WebKit (Used in Safari): WebKit is the engine used by Apple's Safari browser. It was originally developed by Apple and later became an open-source project. It also serves as the foundation for Blink (used in Chrome).

- Trident and EdgeHTML (Used in Internet Explorer and Old Edge): Trident was the rendering engine used in older versions of Internet Explorer. Microsoft introduced EdgeHTML as the rendering engine for the original Microsoft Edge browser.

- Servo (Experimental): Servo is an experimental rendering engine developed by Mozilla, aimed at achieving better performance and concurrency through parallelism.

#### Browser Engine Impact on Web Development:

Developers need to consider the behavior and compatibility of different browser engines when building websites and web applications. Rendering inconsistencies and performance variations can occur across different engines, requiring testing and adjustments to ensure consistent user experiences.

Cross-browser testing and adhering to web standards are essential practices to address the challenges posed by various browser engines. Many tools and frameworks exist to help developers mitigate these challenges and ensure their web content works well across different browsers and devices.

### JavaScript engines 

JavaScript engines are software components responsible for interpreting and executing JavaScript code in web browsers, server-side environments, and other applications. These engines play a vital role in enabling the execution of JavaScript, a high-level programming language primarily used for web development. Here's an overview of how JavaScript engines work and some well-known implementations:

####  Key Functions of JavaScript Engines:

- Parsing: The JavaScript engine parses the source code to create an Abstract Syntax Tree (AST), which represents the code's structure and syntax.
- Compilation: The engine converts the AST into an intermediate representation, often called bytecode or machine code, which is easier to execute efficiently.

- Optimization: Many modern JavaScript engines include Just-In-Time (JIT) compilers that analyze the code's execution patterns and apply various optimizations to improve performance.

- Execution: The engine executes the optimized bytecode or machine code line by line, producing the expected behavior specified by the JavaScript code.

#### Common JavaScript Engines:

- V8 (Used in Google Chrome and Node.js): V8 is one of the most well-known JavaScript engines, developed by Google. It powers Google Chrome and has also been used as the engine for Node.js. V8 introduced the concept of JIT compilation to JavaScript engines, which significantly improved JavaScript execution speed.

- SpiderMonkey (Used in Firefox): SpiderMonkey is the JavaScript engine used in Mozilla Firefox. It was the first JavaScript engine to be created and has evolved over the years to incorporate modern optimization techniques.

- JavaScriptCore (Used in Safari): JavaScriptCore, also known as Nitro, is the engine that powers Apple's Safari browser. It was initially based on the KJS engine and later incorporated WebKit's JavaScriptCore engine.

- Chakra (Used in Microsoft Edge Legacy): Chakra was the JavaScript engine used in **Microsoft Edge Legacy** before Microsoft transitioned to a Chromium-based Edge. Chakra was known for its efficient memory management and optimization techniques, but it was eventually replaced by the **V8** JavaScript engine when Edge adopted the **Blink** engine from Chromium.

- JerryScript: JerryScript is a lightweight JavaScript engine developed by Samsung for resource-constrained devices such as IoT devices.

#### Impact on Performance:

JavaScript engines play a crucial role in determining the performance of JavaScript code execution. Modern engines use techniques like JIT compilation, inline caching, speculative optimizations, and more to make JavaScript execution faster and more efficient. These optimizations enable developers to build complex and responsive web applications.

#### Browser Compatibility and ECMAScript Standards:

The behavior of JavaScript engines directly affects how JavaScript code behaves across different browsers. As new versions of the ECMAScript (ES) standard (the specification that defines JavaScript) are released, JavaScript engines must be updated to support new language features and improvements.

Developers often need to consider the features and compatibility of JavaScript engines to ensure their code works across different browsers and environments. Tools like Babel are used to transpile modern JavaScript code into an older version that is compatible with a wide range of engines.

JavaScript engines are critical components that enable the execution of JavaScript code in various environments. They have evolved significantly over the years, incorporating advanced optimization techniques to provide efficient and high-performance JavaScript execution, contributing to the growth of web and software development.

### Recap

#### Browser Engines:

- Purpose: Browser engines, also known as rendering engines, are responsible for rendering web content (HTML, CSS, and JavaScript) on a user's device.

- Functionality: Browser engines parse HTML and CSS, construct the Document Object Model (DOM) and CSS Object Model (CSSOM), calculate layout and rendering, and handle user interactions.

- Components: Browser engines consist of several components, including the HTML parser, CSS parser, layout engine, rendering engine, and JavaScript engine (for executing JavaScript code).

- Examples: Some well-known browser engines include Blink (used in Chrome), Gecko (used in Firefox), WebKit (used in Safari), and Trident (used in old versions of Internet Explorer).

- Scope: Browser engines encompass a wide range of tasks beyond just executing JavaScript, such as rendering content, managing layout, and handling interactions. They are responsible for rendering the entire web page.

#### JavaScript Engines:

- Purpose: JavaScript engines are responsible for interpreting and executing JavaScript code within a browser or other environments.

- Functionality: JavaScript engines parse JavaScript source code, optimize it, and execute it by translating it into machine code or bytecode that the computer's hardware can understand.

- Optimization: Many modern JavaScript engines include Just-In-Time (JIT) compilers that apply various optimizations to improve execution speed, such as inline caching and speculative optimizations.

- Examples: Well-known JavaScript engines include V8 (used in Chrome and Node.js), SpiderMonkey (used in Firefox), and JavaScriptCore (used in Safari).

- Scope: JavaScript engines focus exclusively on executing JavaScript code. They don't handle rendering or layout, which are tasks performed by browser engines.

#### Interrelationship:

While browser engines and JavaScript engines are separate entities, they work together to provide a complete web experience. When a web page is loaded, the browser engine handles rendering tasks and interacts with the JavaScript engine to execute any JavaScript code present on the page. JavaScript engines play a crucial role in making web applications interactive and dynamic, while browser engines ensure that the visual representation of the web page is accurate and responsive.

### Supplementary material

- [javascript.info](https://javascript.info/)
- [Browser Engines](https://en.wikipedia.org/wiki/Browser_engine)
- [Blink](https://en.wikipedia.org/wiki/Blink_(browser_engine))
- [Gecko](https://en.wikipedia.org/wiki/Gecko_(software))
- [WebKit](https://en.wikipedia.org/wiki/WebKit)
- [JavaScript Engines](https://en.wikipedia.org/wiki/JavaScript_engine)
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine))
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey)
- [interpret](https://nodejs.dev/en/learn/the-v8-javascript-engine/)
- [Node.js](https://nodejs.dev/en/learn/)
- [JS Engines](https://github.com/tx00-web-en/material/Backend-related/JS-engines.md)

</details>