# Activity: React ...

> There are 3 parts in this activity.

----
## Part 1/3

### Objectives:

- Showcase JSX usage without props.
- Convert provided HTML sections (header, footer, section) to JSX using [html2jsx.com](https://transform.tools/html-to-jsx).
- Organize JSX components into separate files.
- Import components into the App component.
- Apply provided CSS styles to the App component.

### Instructions:

#### Step 0: Project Setup

- Create a new React project using Vite:

```bash
npx create-vite@latest week2-fe-lab5 --template react
```

This command creates a new React project in a folder named `week2-fe-lab5`.

> If you receive error like this `npm ERR! enoent ENOENT: no such file or directory`, then one fix is to issue this command: `npm install npm -g` . 

- Change into the project directory:

```bash
cd week2-fe-lab5
```

- In the project directory, run the following command to install the project dependencies:

```bash
npm install
```

- This installs the necessary packages listed in the `package.json` file.
- Once the installation is complete, run the following command to start the development server:

```bash
npm run dev
```

This command starts the development server, and you should see output indicating that the application is running.

- Open your web browser and go to `http://localhost:5173`. You should see the default Vite welcome page.


#### Step 1: Convert HTML to JSX

1. Use the [html2jsx](https://transform.tools/html-to-jsx) tool to convert the provided HTML sections to JSX format:
   - **Header HTML:**
     ```html
     <div class="header">
       <h1>My JSX App Header</h1>
       <p>My JSX App sub Header</p>
     </div>
     ```
   - **Footer HTML:**
     ```html
     <div class="footer">
       <p>Copyright © 2025 My JSX App</p>
       <p>Design</p>
     </div>       
     ```
   - **MainContent HTML:**
     ```html
     <div class="main">
       <section>
         <h2>Section 1</h2>
         <p>This is the content of section 1.</p>
       </section>
       <section>
         <h2>Section 2</h2>
         <p>This is the content of section 2.</p>
       </section>
     </div>       
     ```

2. Copy the generated JSX code for each section to use in your components.

#### Step 2: Create JSX Components

1. Create three separate component files: `Header.jsx`, `Footer.jsx`, and `MainContent.jsx` with a basic template, such as:
   ```jsx
   // Header.jsx
   import React from 'react';

   function Header() {
     return (
       <div>
         This is Header
       </div>
     );
   }

   export default Header;
   ```

2. Replace the return content in each file with the JSX generated in **Step 1**. For example, `Header.jsx` will look like this:
   ```jsx
   // Header.jsx
   import React from 'react';

   function Header() {
     return (
       <div className="header">
         <h1>My JSX App Header</h1>
         <p>My JSX App sub Header</p>
       </div>
     );
   }

   export default Header;
   ```

#### Step 3: Add CSS Styles

- Open `App.css` and add the following CSS to style your main App component:

   ```css
   /* App.css */
   body {
     font-family: 'Arial', sans-serif;
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

   .header {
     background-color: #333;
     color: white;
     padding: 1rem;
     text-align: center;
   }

   .main {
     display: flex;
     justify-content: space-around;
     padding: 2rem;
   }

   section {
     border: 1px solid #ddd;
     padding: 1rem;
     text-align: center;
   }

   .footer {
     background-color: #333;
     color: white;
     padding: 1rem;
     text-align: center;
   }
   ```


#### Step 4: Import Components in App

1. In your `App.jsx` file, import the the **CSS** file and the **three** components:

   ```jsx
   // App.jsx
   import Header from './Header';
   import Footer from './Footer';
   import MainContent from './MainContent';
   import "./App.css";

   function App() {
     return (
       <div>
         <Header />
         <MainContent />
         <Footer />
       </div>
     );
   }

   export default App;
   ```

2. Save the `App.jsx` file, and the browser should automatically refresh to show the updated output.


-----------
## Part 2/3

In this part, you'll create a React component, pass `props` to it, and `console.log()` the properties. You'll also gain an understanding of `props` as objects, use JavaScript expressions within `JSX` using curly braces, and apply CSS styles to your component.

**Step 1: Setting Up Your Environment**

Open your terminal and run:

```sh
npx create-vite@latest week2-fe-lab6 --template react
cd week2-fe-lab6
npm install
npm run dev
```

**Step 2: Creating and Using a Component with Props**

1. **Create a New Component:**
   Inside the `src` folder, create a new file named `Greeting.jsx`.

2. **Write the Component:**
   Open `Greeting.jsx` and write the following code:

   ```jsx
   function Greeting(props) {
       console.log(props); // Log the props object
       
       return (
           <div className="greeting">
               <h1>Welcome, {props.name}!</h1>
               <p>{props.message}</p>
           </div>
       );
   }

   export default Greeting;
   ```

**Step 3: Styling with CSS**

- Open `src/App.css` and add some CSS rules:

   ```css
   .greeting {
       background-color: #f0f0f0;
       padding: 20px;
       border: 1px solid #ddd;
       text-align: center;
   }
   ```

**Step 4: Using the Component and Passing Props**

- Open the `src/App.jsx` file and replace the existing code with the following:

   ```jsx
   import Greeting from './Greeting';
   import './App.css'; // Import CSS file

   function App() {
       return (
           <div className="App">
               <Greeting name="Alice" message="Welcome to the lab!" />
                <Greeting name="Bob" message="Good morning" />
           </div>
       );
   }

   export default App;
   ```

**Step 5: View in Browser**

- Save all your changes. You should see the output of the `Greeting` component, along with the CSS styles applied.


----

## Part 3/3/

### Objectives:

- Showcase JSX usage with props using JavaScript variables for dynamic content.
- Create five components to demonstrate JSX and props.
- Organize each component into separate files.
- Import components into the main App component.
- Pass props with dynamically assigned content from the App to the individual components.
- Apply provided CSS styles to the main App component.

### Instructions:

### Step 0: Project Setup

> Follow the same steps as in Part 1 and APart 2, to set up a new React project, and name the folder `week2-fe-lab7`.


#### Step 1: Create Components

Create the following React components in separate files:

1. **Component 1: Header**

   ```jsx
   // Header.jsx
   import React from 'react';

   function Header(props) {
     return <header>{props.title}</header>;
   }

   export default Header;
   ```

2. **Component 2: Section**

   ```jsx
   // Section.jsx
   import React from 'react';

   function Section(props) {
     return (
       <section>
         <h2>{props.heading}</h2>
         <p>{props.content}</p>
       </section>
     );
   }

   export default Section;
   ```

3. **Component 3: Article**

   ```jsx
   // Article.jsx
   import React from 'react';

   function Article(props) {
     return (
       <article>
         <h3>{props.title}</h3>
         <p>{props.text}</p>
       </article>
     );
   }

   export default Article;
   ```

4. **Component 4: Sidebar**

   ```jsx
   // Sidebar.jsx
   import React from 'react';

   function Sidebar(props) {
     return <aside>{props.content}</aside>;
   }

   export default Sidebar;
   ```

5. **Component 5: Footer**

   ```jsx
   // Footer.jsx
   import React from 'react';

   function Footer(props) {
     return <footer>{props.text}</footer>;
   }

   export default Footer;
   ```

#### Step 2: Add CSS file

- Open `App.css` and add the following CSS:
   ```css
   /* App.css */
   body {
     font-family: 'Arial', sans-serif;
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

   header,
   footer {
     background-color: #333;
     color: white;
     padding: 1rem;
     text-align: center;
   }

   section,
   article,
   aside {
     border: 1px solid #ddd;
     margin: 1rem;
     padding: 1rem;
     text-align: center;
   }
   ```

#### Step 3: Create Main App Component

1.  In your `App.jsx` file, import the the **CSS** file and the components:

   ```jsx
   // App.jsx
   import React from 'react';
   import Header from './Header';
   import Section from './Section';
   import Article from './Article';
   import Sidebar from './Sidebar';
   import Footer from './Footer';
   import './App.css';

   // Dynamic content using JavaScript variables
   const appTitle = 'JSX and Props Showcase';
   const section1Content = 'This is the content of section 1.';
   const article1Title = 'Article 1';
   const article1Text = 'Content of Article 1.';
   const sidebarContent = 'Sidebar content goes here.';
   const section2Content = 'This is the content of section 2.';
   const footerText = 'Copyright © 2025 JSX Props App';

   function App() {
     return (
       <div>
         <Header title={appTitle} />
         <Section heading="Section 1" content={section1Content} />
         <Article title={article1Title} text={article1Text} />
         <Sidebar content={sidebarContent} />
         <Section heading="Section 2" content={section2Content} />
         <Footer text={footerText} />
       </div>
     );
   }

   export default App;
   ```



By incorporating JavaScript variables for dynamic content, this part showcases how JSX and props can be used with greater flexibility and ease of maintenance in a React application.
