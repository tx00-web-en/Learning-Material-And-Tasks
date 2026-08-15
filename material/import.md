
# How to use Import in JavaScript

In modern JavaScript (ES Modules), you can use either `import Book from './Book';` or `import Book from './Book.jsx';`.

Both of these import statements function the same way if the module resolution is set to recognize `.jsx` files. However, the choice depends on convention and compatibility:

### 1. **Using `import Book from './Book';` (Recommended)**
   - This is preferred because it’s cleaner and shorter.
   - JavaScript module resolution typically locates `.js`, `.jsx`, `.ts`, and `.tsx` files automatically, so the extension is not needed.
   - This approach is standard in React and JavaScript, enhancing consistency across codebases.

### 2. **Using `import Book from './Book.jsx';` (Sometimes Necessary)**
   - Explicitly including `.jsx` is rarely necessary, but it may be required in specific cases, such as:
     - **Bundler or resolver limitations** where `.jsx` files aren’t automatically detected.
     - **Ambiguity with mixed file types**, e.g., if both `Book.js` and `Book.jsx` exist in the same directory.
   - Certain team preferences or project guidelines might call for explicitly defined extensions for clarity.

### **Recommendation**

Unless your setup specifically requires extensions or you have files with duplicate names but different extensions, use:

```javascript
import Book from './Book';
```

This convention keeps imports clean and works well with most modern bundlers and IDEs.

---

### Importing in CommonJS (Backend Node.js)

If you’re working in a CommonJS environment (e.g., Node.js), use `require()` instead of `import`. Here’s how to handle imports in CommonJS:

```javascript
const Pet = require("./petLib"); // Omit the extension; 
```

