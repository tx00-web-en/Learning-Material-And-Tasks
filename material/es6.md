# ES6 module syntax vs CommonJS

To convert this [API](https://github.com/tx00-resources-en/starter-api-cars-mvc), to use ES6 module syntax instead of CommonJS (`require` and `module.exports`), we’ll make the following changes:

1. Replace `require` with `import`.
2. Replace `module.exports` with `export` or `export default`.
3. Update `package.json` to include `"type": "module"` to enable ES6 module syntax.


Here’s the updated codebase:

---

### **Updated `package.json`**
```json
{
  "name": "be-pp",
  "version": "1.0.0",
  "main": "app.js",
  "type": "module",
  "scripts": {
    "test": "node feedbackLib.js",
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

---

### **Updated `app.js`**
```javascript
import express from "express";
import carRouter from "./routes/carRouter.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the carRouter for all /cars routes
app.use("/cars", carRouter);

const port = 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

---

### **Updated `carControllers.js`**
```javascript
import Car from "../models/carModel.js";

// GET /cars
export const getAllCars = (req, res) => {
  const cars = Car.getAll();
  res.json(cars);
};

// POST /cars
export const createCar = (req, res) => {
  const newCar = Car.addOne({ ...req.body });

  if (newCar) {
    res.json(newCar);
  } else {
    res.status(500).json({ message: "Failed to create car" });
  }
};

// GET /cars/:carId
export const getCarById = (req, res) => {
  const carId = req.params.carId;
  const car = Car.findById(carId);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};

// PUT /cars/:carId
export const updateCar = (req, res) => {
  const carId = req.params.carId;
  const updatedCar = Car.updateOneById(carId, { ...req.body });

  if (updatedCar) {
    res.json(updatedCar);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};

// DELETE /cars/:carId
export const deleteCar = (req, res) => {
  const carId = req.params.carId;
  const isDeleted = Car.deleteOneById(carId);

  if (isDeleted) {
    res.json({ message: "Car deleted successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};
```

---

### **Updated `carModel.js`**
```javascript
let carArray = [];
let nextId = 1;

function getAll() {
  return carArray;
}

function addOne(carData) {
  const { model, color, age } = carData;
  if (!model || !color || !age) {
    return false;
  }

  const newItem = {
    id: nextId++,
    ...carData,
  };

  carArray.push(newItem);
  return newItem;
}

function findById(id) {
  const numericId = Number(id);
  const item = carArray.find((item) => item.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const car = findById(id);
  if (car) {
    Object.assign(car, updatedData);
    return car;
  }
  return false;
}

function deleteOneById(id) {
  const item = findById(id);
  if (item) {
    const initialLength = carArray.length;
    carArray = carArray.filter((item) => item.id !== Number(id));
    return carArray.length < initialLength;
  }
  return false;
}

const Car = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

export default Car;
```

---

### **Updated `routes/carRouter.js`**
```javascript
import express from "express";
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/carControllers.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:carId", getCarById);
router.post("/", createCar);
router.put("/:carId", updateCar);
router.delete("/:carId", deleteCar);

export default router;
```

---

### Key Changes Summary
1. **`import` and `export`:**
   - Replace `require` with `import` for dependencies and modules.
   - Used `export` and `export default` to export functions and objects.

2. **`package.json` update:**
   - Add `"type": "module"` to enable ES6 modules.

3. **Filename extension for imports:**
   - Add `.js` to module imports since Node.js requires explicit file extensions in ES6 modules.

---
This updated codebase now uses modern ES6 module syntax while maintaining the same functionality.

The final source code [can be found here](https://github.com/tx00-resources-en/api-cars-es6)

---

## **Introduction to ES6 Module Syntax and CommonJS**

JavaScript has two primary module systems: **CommonJS** and **ES6 Modules**. Each serves the purpose of modularizing code, allowing developers to split functionality into reusable files.

#### **CommonJS**
- **Origin**: CommonJS was the default module system for Node.js since its inception. It predates ES6 modules.
- **Syntax**:
  - `require()` is used to import dependencies.
  - `module.exports` or `exports` is used to export functionalities.
  - Example:
    ```javascript
    const myModule = require('./myModule');
    myModule.doSomething();
    module.exports = { doSomething };
    ```
- **Advantages**:
  - Widespread support in the Node.js ecosystem.
  - Easy to understand and implement for small projects.
- **Limitations**:
  - It is specific to Node.js and not natively supported by browsers.

#### **ES6 Module Syntax**
- **Origin**: ES6 modules were introduced in the ECMAScript 2015 (ES6) standard, bringing a unified module syntax to both Node.js and the browser.
- **Syntax**:
  - `import` is used to bring in dependencies.
  - `export` or `export default` is used to share functionalities.
  - Example:
    ```javascript
    import { doSomething } from './myModule.js';
    doSomething();
    export function doSomething() {}
    ```
- **Advantages**:
  - Built-in support in modern JavaScript engines and browsers.
  - Tree-shaking capabilities for bundlers like Webpack or Rollup, allowing better optimization.
  - Aligns with standards and promotes cross-environment compatibility.
- **Limitations**:
  - Requires `"type": "module"` in `package.json` or `.mjs` file extensions in Node.js.
  - Older tools and libraries may lack support for ES6 modules.


#### **Transition to ES6 Modules**

As modern JavaScript projects grow in complexity, the industry is shifting toward ES6 modules. This transition is evident in:
1. **Node.js Updates**:
   - Since Node.js 12, ES6 modules are supported natively (with `"type": "module"`).
2. **New APIs**:
   - Many libraries and frameworks now publish their modules in ES6 format, ensuring compatibility with modern tooling.
3. **Browser Compatibility**:
   - ES6 modules work natively in all modern browsers, making it easier to share code between server and client.

Despite the shift, knowing both CommonJS and ES6 is important:
- **Legacy Code**: Many existing projects and libraries still use CommonJS.
- **Interoperability**: Some projects may require a mix of both systems, especially during migration.

---
## **The Future of Deno**

**Deno**, created by Ryan Dahl (the original creator of Node.js), is a runtime designed to address many shortcomings of Node.js. It natively supports ES6 modules and introduces a fresh perspective on how JavaScript applications are built.

#### **Key Features of Deno**
1. **Native ES6 Module Support**:
   - Deno uses ES6 modules as the default, eliminating the need for compatibility flags or configurations.
2. **Secure by Default**:
   - Unlike Node.js, Deno does not allow access to the file system, network, or environment variables without explicit permissions.
3. **TypeScript Built-In**:
   - Deno runs TypeScript out of the box without requiring additional transpilation steps.
4. **URL-Based Imports**:
   - Dependencies are loaded directly from URLs, removing the need for a centralized `node_modules` directory.
   - Example:
     ```javascript
     import { serve } from "https://deno.land/std@0.91.0/http/server.ts";
     ```

#### **Potential Impact on the Industry**
- **Simplicity**: By simplifying dependency management and embracing modern standards, Deno aims to attract developers frustrated by Node.js's legacy quirks.
- **Adoption**: While Deno is promising, Node.js remains dominant. Deno adoption may take time as libraries, tooling, and community support grow.
- **Complementary Ecosystem**: Deno might coexist with Node.js, appealing to projects requiring stricter security and modern module usage.


---
## **Conclusion**

The transition from CommonJS to ES6 modules reflects the natural evolution of JavaScript toward more modern, efficient, and standardized practices. While ES6 modules are the future, understanding CommonJS remains crucial for maintaining legacy systems and working with older libraries. Meanwhile, Deno pushes the boundaries further by fully embracing modern standards and challenging the status quo. For developers, staying familiar with all three—CommonJS, ES6 modules, and Deno—is key to navigating the future of JavaScript development.