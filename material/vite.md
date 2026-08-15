
# Steps to Create a React Project with Vite

### 1. Install Vite and Create a React Project

1. **Open your terminal**.
2. Run the following command to create a new Vite project with React:

   ```bash
   npx create-vite@latest react-lists-lab1 --template react
   ```

   - Replace `my-react-app` with your preferred project name.

   Another way to create a new Vite project with React:
   ```bash
   npm create vite@latest my-react-app --template react
   ```
   

3. Navigate into the project directory. For example, if your project name is `my-react-app`, run:

   ```bash
   cd my-react-app
   ```

4. Install dependencies:

   ```bash
   npm install
   ```
   
5. Run the following command to start the Vite development server on port 3000:

```bash
npm run dev
```

By default, Vite runs on port `5173`. You should see output similar to:

```bash
  VITE vX.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use `--host` to expose
```

---

### 2. (Optional) Change the Default Port to 3000 and Open Browser Automatically

By default, Vite runs on port `5173`. If you’d like to change it to port `3000` and open the browser automatically, follow these steps:

1. In the project root, open or create a file named `vite.config.js`.
2. Add or update the configuration as follows:

   ```javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,    // Set the default port to 3000
       open: true,    // Automatically opens the browser
     },
   });
   ```

   - Setting `open: true` will open the default browser when the server starts.

3. Save the `vite.config.js` file.

4. Run the following command to start the Vite development server on port 3000:

```bash
npm run dev
```

You should see output similar to:

```bash
  VITE vX.X.X  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use `--host` to expose
```

With `open: true` configured, your default browser will open automatically to [http://localhost:3000](http://localhost:3000).