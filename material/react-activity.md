# Activity: React

> Before starting this activity, ensure you have a folder named "Dev" in your Documents directory. Inside the "Dev" folder, create another folder called "week2" if it doesn't already exist.

> There are 4 parts in this activity.

## Part 1/4

### Goals:

- Create a new React project.
- Install project dependencies using npm.
- Run the development server to view the React application.

### Instructions:

#### Step 1: Project Setup

1. Navigate to the **week2** directory and open it in VS Code.
2. Open the terminal in VS Code.
3. Run the following command to create a new React project using Vite:

```bash
npx create-vite@latest intro-react-project --template react
```

This command creates a new React project in a folder named `intro-react-project`.

> If you receive error like this `npm ERR! enoent ENOENT: no such file or directory`, then one fix is to issue this command: `npm install npm -g` . 

4. Change into the project directory:

```bash
cd intro-react-project
```

#### Step 2: Install Dependencies

1. In the project directory, run the following command to install the project dependencies:

```bash
npm install
```

This installs the necessary packages listed in the `package.json` file.

#### Step 3: Run the Development Server

1. Once the installation is complete, run the following command to start the development server:

```bash
npm run dev
```

This command starts the development server, and you should see output indicating that the application is running.

2. Open your web browser and visit `http://localhost:5173/`. You should see the default welcome page.

#### Step 4: Explore the Project

1. Explore the project structure, including the `src` folder, `public` folder, and various configuration files.

2. Open the `src/App.jsx` file and make a simple modification (e.g., change the text inside the `div` element).

3. Observe that the changes are automatically reflected in the browser as you save the file.


-----------
## Part 2/4


### Objectives:

- Create two React components, `Hello` and `Bye`.
- Understand how to structure multiple components within a single file.
- Learn to render components inside the main `App` component.


### Instructions:

#### Step 0: Project Setup

Before starting Part 2:

1. Stop the development server of Part 1 by pressing **Ctrl + C** (Windows/Linux) or **Cmd + C** (Mac) in the terminal where it is running.  
2. Open a new terminal in VS Code by navigating to **View > Terminal** or using the shortcut. 
3. Run the following command to create a new React project using Vite:

```bash
npx create-vite@latest week2-fe-lab2 --template react
```

This command creates a new React project in a folder named `week2-fe-lab2`.

> If you receive error like this `npm ERR! enoent ENOENT: no such file or directory`, then one fix is to issue this command: `npm install npm -g` . 

4. Change into the project directory:

```bash
cd week2-fe-lab2
```

5. In the project directory, run the following command to install the project dependencies:

```bash
npm install
```

This installs the necessary packages listed in the `package.json` file.

6. Once the installation is complete, run the following command to start the development server:

```bash
npm run dev
```

This command starts the development server, and you should see output indicating that the application is running.

7. Open your web browser and go to `http://localhost:5173`. You should see the default welcome page.

#### Step 1: Create Components in App.jsx

1. Open `index.css` and `App.css`, delete all their content, and save the changes.  
   - *Reason*: This way, we can define our own styles if needed.  

2. Open `App.jsx` located in the `src` directory and delete all its content.  

3. Add the following code to define the `Hello` component in `App.jsx`:

   ```jsx
   function Hello() {
     return <p>Hello, React!</p>;
   }
   ```

4. Add the `Bye` component within the same file:

   ```jsx
   function Bye() {
     return <p>Goodbye, React!</p>;
   }
   ```

5. Finally, define the main `App` component to render both `Hello` and `Bye` components:

   ```jsx
   function App() {
     return (
       <div>
         <Hello />
         <Bye />
       </div>
     );
   }

   export default App;
   ```

6. Save the `App.jsx` file.
7. You should see both the "Hello, React!" and "Goodbye, React!" messages rendered on the page.


-----------
## Part 3/4

### Goals:

- Organize components in separate files and import them into the main `App` component.
- Create a `Hello` component that renders a greeting message.
- Create a `Bye` component that renders a farewell message.


### Instructions:

#### Step 0: Project Setup

Before starting Part 3:

1. Stop the development server of Part 2 by pressing **Ctrl + C** (Windows/Linux) or **Cmd + C** (Mac) in the terminal where it is running.  
2. Open a new terminal in VS Code by navigating to **View > Terminal** or using the shortcut. 
3. Run the following command to create a new React project using Vite:

```bash
npx create-vite@latest week2-fe-lab3 --template react
```

This command creates a new React project in a folder named `week2-fe-lab3`.

> If you receive error like this `npm ERR! enoent ENOENT: no such file or directory`, then one fix is to issue this command: `npm install npm -g` . 

4. Change into the project directory:

```bash
cd week2-fe-lab3
```

5. In the project directory, run the following command to install the project dependencies:

```bash
npm install
```

This installs the necessary packages listed in the `package.json` file.

6. Once the installation is complete, run the following command to start the development server:

```bash
npm run dev
```

This command starts the development server, and you should see output indicating that the application is running.

7.  Open your web browser and go to `http://localhost:5173`. You should see the default Vite welcome page.


#### Step 1: Create Component Files

1. Create a new file named `Hello.jsx`.
2. Define the `Hello` component within `Hello.jsx`:

   ```jsx
   // Hello.jsx

   function Hello() {
     return <p>Hello, React!</p>;
   }

   export default Hello;
   ```

3. Similarly, create a new file named `Bye.jsx` for the `Bye` component:

   ```jsx
   // Bye.jsx

   function Bye() {
     return <p>Goodbye, React!</p>;
   }

   export default Bye;
   ```

#### Step 2: Create the Main App Component

1. Open `index.css` and `App.css`, delete all their content, and save the changes.  
   - *Reason*: This way, we can define our own styles if needed.  

2. Open `App.jsx` located in the `src` directory and delete all its content.  

3. Import the `Hello` and `Bye` components:

   ```jsx
   // App.jsx
   import Hello from './Hello';
   import Bye from './Bye';
   ```

4. Define the main `App` component to render both `Hello` and `Bye` components:

   ```jsx
    // ...
   function App() {
     return (
       <div>
         <Hello />
         <Bye />
       </div>
     );
   }

   export default App;
   ```

5. Save all the files (`Hello.jsx`, `Bye.jsx`, and `App.jsx`).
  - You should see both the "Hello, React!" and "Goodbye, React!" messages rendered on the page.


-----------
## Part 4/4

### Goals:

- Create three basic React components: Header, MainContent, and Footer.
- Compose these components to build a simple webpage.
- Understand the concept of props for passing data between components.

### Instructions:

### Step 1: Project Setup

- Follow the same steps as in Part 1 to set up a new React project, and name the folder `week2-fe-lab4`.

- Change into the project directory and install the project dependencies:

```bash
cd week2-fe-lab4
npm install
```

- This installs the necessary packages listed in the `package.json` file.

- Once the installation is complete, run the following command to start the development server:

```bash
npm run dev
```

- You should see output indicating that the application is running.

- Open your web browser and go to `http://localhost:5173`. You should see the default welcome page.

#### Step 2: Create Basic Components

1. **Header Component:**
   - Create a new file `Header.jsx` in the `src` folder.
   - Define a functional component that returns a header (e.g., "Welcome to React Lab").

   ```jsx
   // Header.jsx
   function Header() {
     return (
       <header>
         <h1>Welcome to React Lab</h1>
       </header>
     );
   }

   export default Header;
   ```

2. **MainContent Component:**
   - Create a new file `MainContent.jsx` in the `src` folder.
   - Define a functional component that returns the main content (e.g., a paragraph about React).

   ```jsx
   // MainContent.jsx
   function MainContent() {
     return (
       <main>
         <p>
           React is a JavaScript library for building user interfaces. In this lab, we'll create and compose basic React components.
         </p>
       </main>
     );
   }

   export default MainContent;
   ```

3. **Footer Component:**
   - Create a new file `Footer.jsx` in the `src` folder.
   - Define a functional component that returns a footer (e.g., "© 2025 React Lab").

   ```jsx
   // Footer.jsx
   function Footer() {
     return (
       <footer>
         <p>&copy; 2025 React Lab</p>
       </footer>
     );
   }

   export default Footer;
   ```

4. Save all files.

#### Step 3: Compose Components in App.jsx

1. Open `index.css` and `App.css`, delete all their content, and save the changes.  
   - *Reason*: This way, we can define our own styles if needed.  

2. Open `App.jsx` located in the `src` directory and delete all its content.  

3. Import the created components:

   ```jsx
   import Header from './Header';
   import MainContent from './MainContent';
   import Footer from './Footer';
   ```

3. Use these components within the `App` component:

   ```jsx
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

4. Save `App.jsx` and check your browser to see your static components in action.

### Optional:

- Extend the lab by adding new components (e.g., Sidebar, Article).
- Pass data between components using props.
- Style the components for a more visually appealing webpage.







