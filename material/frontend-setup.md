# Frontend Setup Guide

## 1) Setup: start with Vite

For the frontend, first create the project using Vite:

```bash
npx create-vite@latest frontend --template react --eslint
```

Vite will generate most of the basic project structure automatically.

After that, use the `src` structure provided in this project, because it keeps components and pages organized in a clear way.

## 2) Recommended frontend structure

Your frontend should follow this structure:

```text
frontend/
  index.html
  package.json
  vite.config.js
  public/
  src/
    App.jsx
    index.css
    main.jsx
    components/
      Navbar.jsx
      ProductListing.jsx
      ProductListings.jsx
    pages/
      AddProductPage.jsx
      EditProductPage.jsx
      HomePage.jsx
      NotFoundPage.jsx
      ProductPage.jsx
```

Recommended responsibility for each part:

- `main.jsx`: application entry point.
- `App.jsx`: main app layout and routes.
- `components/`: reusable UI components.
- `pages/`: page-level components used in routing.
- `index.css`: global styles.
- `vite.config.js`: Vite config, including proxy setup if needed.

## 3) Install the packages

Vite creates most of the frontend setup for you, including the main React packages, the Vite packages, and the default npm scripts.

After creating the project with Vite, you only need to install the router package used in this project:

```bash
npm install react-router-dom
```

### package.json scripts

Vite also creates these scripts for you automatically:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## 4) Important reminder after creating the Vite app

When Vite creates the project, it also generates default starter content.

Clear the default content from these files before building your frontend:

- `src/App.jsx`
- `src/index.css`
- `src/App.css`

That way they can:

- write their own CSS from scratch, or
- reuse the CSS from Monday's lab

## 5) Reusable setup files

### main.jsx

```jsx
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

### App.jsx

Most of this file can be reused from one project to another. Usually the main changes are the routes, page imports, and component names.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

### vite.config.js

This setup is useful when the frontend needs to talk to the backend during development:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    }
  },
})
```

## What usually changes from project to project

You can usually reuse the setup above, but these parts often need project-specific changes:

- page names and component names
- route paths
- CSS styling
- API endpoint usage
- proxy target in `vite.config.js`
- page structure inside `src/pages`
