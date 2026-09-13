# Creating and Running a React Project with Vite

## 1. Create a React Project with Vite

### What is Vite?

**Vite** is a modern development tool used to build and run web applications. It provides a development server, a fast development experience, and tools for building production applications.

**Create Vite** is the command-line tool used to quickly create a new Vite project with a selected framework, such as React.

### Create a React project

Open a terminal and run:

```bash
npx create-vite@latest intro-react-project --template react --eslint
```

This command:

* uses the latest version of `create-vite`
* creates a new project named `intro-react-project`
* selects the React template
* configures the project to use ESLint

The `--eslint` option selects ESLint automatically, so you will not be asked which linter to use.

Recent versions of Create Vite may ask whether to install the project dependencies immediately.

> When prompted about installing dependencies, choose **No**.

This is intentional. The dependencies will be installed manually in a later step so that the basic npm workflow can be learned explicitly.

---

## 2. What is a Linter?

A **linter** is a development tool that examines source code and reports potential problems, mistakes, or code that does not follow established rules.

For example, a linter can detect:

* unused variables
* problematic or suspicious code
* inconsistent coding patterns
* certain common programming mistakes
* code that does not follow the project's rules

A linter does not run the application. It is a development tool that helps identify potential problems while writing code.

### ESLint and Oxlint

Recent versions of Vite's React templates offer two main linting choices: **ESLint** and **Oxlint**.

**ESLint** is a mature and widely used JavaScript linter. It has a large ecosystem, extensive documentation, and broad compatibility with existing JavaScript and React projects.

**Oxlint** is a newer linter from the Oxc project. It is designed with performance in mind and can be significantly faster than ESLint. Recent versions of Create Vite use Oxlint as the default option for new React projects.

The fact that Oxlint is faster does not make ESLint a bad choice. ESLint remains a mature, widely used, and appropriate tool for React development.

For the initial part of this course, **ESLint will be used as the default linter**. This provides familiarity with a widely used tool and its ecosystem. Oxlint can be explored later as an alternative, and either linter can be used according to the requirements or preferences of a particular project.

---

## 3. Enter the Project Directory

After Create Vite finishes creating the project, move into the new project directory:

```bash
cd intro-react-project
```

The `cd` command changes the terminal's current directory. The following commands will then be executed inside the React project.

---

## 4. Install the Dependencies

Run:

```bash
npm install
```

This reads the project's `package.json` file and installs the packages required by the project.

The installed packages are placed in the `node_modules` directory.

Because dependencies were not installed automatically during project creation, this step is performed manually.

---

## 5. Start the Development Server

Run:

```bash
npm run dev
```

This starts the Vite development server.

By default, Vite runs on port `5173`. The terminal will display output similar to:

```text
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use `--host` to expose
```

Open the displayed local address in a browser to view the React application.

The basic workflow is therefore:

1. Create the project:

   ```bash
   npx create-vite@latest intro-react-project --template react --eslint
   ```

2. When prompted about installing dependencies, choose **No**.

3. Enter the project directory:

   ```bash
   cd intro-react-project
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

---

## 6. Optional: Use Port 3000 and Open the Browser Automatically

Vite uses port `5173` by default. If you want to use port `3000` instead and open the browser automatically when the development server starts, configure the Vite server.

In the project root, open `vite.config.js` and update it as follows:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

The `port` option changes the development server from `5173` to `3000`.

The `open: true` option tells Vite to automatically open the default browser when the development server starts.

After saving the file, run:

```bash
npm run dev
```

The terminal should now show an address similar to:

```text
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use `--host` to expose
```

The browser should also open automatically at:

```text
http://localhost:3000
```
