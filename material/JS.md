# Theory: JavaScript Review

## Functions are first-class citizens in JS

In JavaScript, functions are considered first-class citizens, which means they are treated as regular values and have the same capabilities as other data types like strings, numbers, or objects. This property allows functions to be passed as arguments to other functions, returned from functions, and assigned to variables. Here are some examples that illustrate the concept of functions as first-class citizens:

1. **Assigning a Function to a Variable:**

You can assign a function to a variable, just like any other value.

```javascript
const add = function(a, b) {
  return a + b;
};

console.log(add(3, 5)); // Output: 8
```

2. **Passing a Function as an Argument:**

Functions can be passed as arguments to other functions, enabling higher-order functions.

```javascript
const calculate = function(operation, a, b) {
  return operation(a, b);
};

const multiply = function(x, y) {
  return x * y;
};

console.log(calculate(multiply, 4, 6)); // Output: 24
```

3. **Returning a Function from Another Function:**

Functions can also be returned from other functions, allowing the creation of closures.

```javascript
const powerOf = function(exponent) {
  return function(base) {
    return Math.pow(base, exponent);
  };
};

const square = powerOf(2);
const cube = powerOf(3);

console.log(square(5)); // Output: 25
console.log(cube(3));   // Output: 27
```

4. **Storing Functions in Arrays:**

You can store functions in arrays just like any other values.

```javascript
const operations = [
  function(a, b) { return a + b; },
  function(a, b) { return a - b; },
  function(a, b) { return a * b; }
];

console.log(operations[0](5, 3)); // Output: 8
console.log(operations[1](8, 4)); // Output: 4
```

5. **Object Properties as Functions:**

You can define functions as properties of objects.

```javascript
const calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

console.log(calculator.add(10, 7));    // Output: 17
console.log(calculator.subtract(15, 3)); // Output: 12
```
<!-- 
6. **Creating Higher-Order Functions:**

Functions can create and return other functions, leading to more dynamic and flexible code.

```javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(4)); // Output: 8
console.log(triple(5)); // Output: 15
``` -->

JavaScript treats functions as first-class citizens, allowing them to be manipulated, passed around, and stored just like other values. This feature enhances the expressive power and flexibility of the language, enabling the creation of more dynamic and functional programming styles.

----

## Arrow functions

Arrow functions are a concise way to write JavaScript functions. They were introduced in ES6 (ECMAScript 2015) and provide a more compact syntax compared to traditional function expressions. Arrow functions are especially useful for writing short, one-line functions or for functions that do not require their own `this` context.

Here's the basic syntax of an arrow function:

```javascript
const functionName = (parameters) => {
  // function body
  return result;
};
```

And here are a few examples of arrow functions:

1. **Simple Arrow Function:**

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

console.log(greet("Alice")); // Output: Hello, Alice!
```

2. **Arrow Function with One Parameter:**

```javascript
const square = (num) => num * num;

console.log(square(5)); // Output: 25
```

3. **Arrow Function with No Parameters:**

```javascript
const getRandomNumber = () => Math.random();

console.log(getRandomNumber()); // Output: A random number between 0 and 1
```

4. **Arrow Function with Multiple Statements:**

```javascript
const calculateSum = (a, b) => {
  const sum = a + b;
  return sum;
};

console.log(calculateSum(3, 7)); // Output: 10
```


Arrow functions provide a concise and straightforward way to define functions in JavaScript. 

----


## Variables

In JavaScript, `var`, `let`, and `const` are used to declare variables, but they have different characteristics and scopes. Here's a summary of their differences and why `var` is less recommended in modern code:

### **`var`**
- **Scope**: Function-scoped or globally scoped, depending on where it is declared. This means if you declare a variable with `var` inside a function, it's available throughout that function. If declared outside any function, it becomes a global variable.
- **Hoisting**: Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`. This can lead to unexpected behavior if you're not careful.
- **Re-declaration**: You can re-declare a variable within the same scope, which can lead to unintended bugs and confusion.

  ```javascript
  function example() {
    console.log(x); // undefined (due to hoisting)
    var x = 10;
    var x = 20; // No error
    console.log(x); // 20
  }
  ```

### **`let`**
- **Scope**: Block-scoped, meaning the variable is only available within the block (enclosed by curly braces `{}`) where it is declared. This helps prevent variables from leaking into the surrounding code.
- **Hoisting**: Variables declared with `let` are hoisted but not initialized. Accessing them before their declaration results in a `ReferenceError`.
- **Re-declaration**: Variables declared with `let` cannot be re-declared in the same scope, which reduces the risk of accidental variable overwriting.

  ```javascript
  function example() {
    // console.log(y); // ReferenceError (Temporal Dead Zone)
    let y = 10;
    // let y = 20; // SyntaxError: Identifier 'y' has already been declared
    console.log(y); // 10
  }
  ```

### **`const`**
- **Scope**: Block-scoped, like `let`.
- **Hoisting**: `const` variables are hoisted but not initialized, similar to `let`. Accessing them before declaration will throw a `ReferenceError`.
- **Re-declaration**: `const` variables cannot be re-declared or reassigned. Once assigned, their value cannot be changed, making them ideal for constants or immutable bindings.

  ```javascript
  function example() {
    // console.log(z); // ReferenceError (Temporal Dead Zone)
    const z = 10;
    // z = 20; // TypeError: Assignment to constant variable
    console.log(z); // 10
  }
  ```

### **Why `var` is Less Recommended**
- **Scope Issues**: `var`'s function-scoping can lead to variables being accessible outside their intended scope, potentially causing bugs and making code harder to maintain.
- **Hoisting Confusion**: The hoisting behavior of `var` can lead to unexpected results if you try to access variables before they are declared.
- **Re-declaration**: Allowing re-declaration of the same variable within the same scope can lead to subtle bugs and confusion.

Because of these issues, `let` and `const` are preferred in modern JavaScript for their block-scoping and more predictable behavior, leading to clearer and more reliable code.

----

## Hoisting

In JavaScript, there is hoisting, which means variable and function declarations are moved to the top of their containing scope during the compilation phase. However, the hoisting process behaves differently for variables and function declarations.

### Function Declarations vs Variable Declarations

1. **Variable Declarations:** When a variable is declared using `var`, it is hoisted to the top of its containing function or global scope. The variable declaration is "hoisted," but the assignment (initialization) remains in its original place in the code. As a result, the variable is initialized with `undefined` at the top of the scope.

   For example:
   ```javascript
   console.log(x); // Outputs: undefined
   var x = 5;
   ```

2. **Function Declarations:** Function declarations, unlike variable declarations, are fully hoisted. The entire function is moved to the top of its containing scope, so it can be used before its actual declaration in the code.

   For example:
   ```javascript
   sayHello(); // This works
   function sayHello() {
     console.log('Hello');
   }
   ```

3. **Key Takeaways**

- Variables declared with `var` such as `x` are hoisted but initialized with `undefined`. The assignment happens where the code explicitly assigns a value.
- Function declarations such as `sayHello()`, are fully hoisted, meaning you can call the function before its declaration in the code.

By understanding these rules, you can write clearer and less error-prone code. For instance, always declare and initialize variables at the top of their scope to avoid confusion caused by hoisting.

### Function declaration vs function expression

With anonymous function expressions, only the variable declaration is hoisted, not the function itself. This means you cannot use the function before the line where it's defined.

   For example:
   ```javascript
   sayHello(); // Throws an error: "sayHello is not a function"
   var sayHello = function() {
     console.log('Hello');
   };
   ```



---------
## Links

- [javascript.info](https://javascript.info/)
- [Arrow functions](https://javascript.info/arrow-functions-basics)
- [w3schools](https://www.w3schools.com/js/default.asp)
- [Function declaration vs function expressions](https://www.freecodecamp.org/news/when-to-use-a-function-declarations-vs-a-function-expression-70f15152a0a0/)
- [An open source book series on JavaScript](https://github.com/getify/You-Dont-Know-JS)


<!-- 
----
## Arrow Functions

Arrow functions were introduced in ECMAScript 6 (ES6) and provide a more concise syntax for creating functions. They offer a cleaner and often more readable way to write functions, especially for short, one-line operations. Here's what you need to know about arrow functions:

1. **Introduction and Syntax:**
   - Arrow functions are defined using the `() => {}` syntax.
   - They consist of parameter list (enclosed in parentheses), followed by the arrow `=>`, and then the function body (enclosed in curly braces).

2. **Differences from Regular Functions:**
   - Unlike regular functions, arrow functions do not have their own [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) context. Instead, they inherit the `this` value from the surrounding code.
   - Arrow functions cannot be used as constructors, meaning they cannot be instantiated using the `new` keyword.

3. **Lexical Scoping and 'this' Context:**
   - The lack of their own `this` context in arrow functions can be advantageous. They use lexical scoping, meaning they inherit the `this` value from the enclosing function or context.
   - This can help avoid common pitfalls when dealing with nested functions or callbacks.

4. **Use Cases and Benefits:**
   - Arrow functions are particularly useful for concise, single-expression functions, such as mapping or filtering arrays.
   - They reduce boilerplate code and make the intention of the function clearer.
   - Example use cases: `array.map()`, `array.filter()`, and other cases where a concise function is required.

5. **Examples:**
   ```javascript
   // Regular function
   function multiply(a, b) {
       return a * b;
   }

   // Equivalent arrow function
   const multiply = (a, b) => a * b;

   // Using arrow function with array.map()
   const numbers = [1, 2, 3, 4, 5];
   const squared = numbers.map(num => num ** 2);
   ```

6. **Considerations:**
   - While arrow functions provide concise syntax, they might not always be suitable for more complex functions that require a dedicated `this` context or more than one statement.

### Parentheses rules

In arrow functions, parentheses play a crucial role in defining parameters and in certain cases, the function body. Here are the key rules to keep in mind:

1. **Parameter List:**
    - When the arrow function has a single parameter, you can omit the parentheses around the parameter list. For example: `(x) => x * 2` can be simplified to `x => x * 2`.
    - When there are no parameters or more than one parameter, you must enclose the parameter list in parentheses. For example: `(x, y) => x + y`.

2. **Function Body:**
    - If the function body consists of a single expression (an expression that results in a value), you can omit the curly braces `{}` around the function body. The return value of the expression will be automatically returned.
    - If the function body requires multiple statements or if you want to include explicit `return` statements, you must enclose the function body in curly braces `{}`.

3. **Examples:**
    - Single parameter, single expression:
      ```javascript
      const double = x => x * 2;
      ```
    - Multiple parameters, single expression:
      ```javascript
      const sum = (x, y) => x + y;
      ```
    - Multiple parameters, multiple statements:
      ```javascript
      const multiplyAndLog = (x, y) => {
        const result = x * y;
        console.log(result);
        return result;
      };
      ```

4. **Returning Objects:**
    - When you want to return an object literal directly from an arrow function, you need to enclose the object in parentheses. This is to avoid confusion with the function body being mistaken for a block.
    - Example:
      ```javascript
      const createPerson = (name, age) => ({ name, age });
      ```

5. **Implicit Return:**
    - As mentioned earlier, arrow functions with a single expression have an implicit return. This means that the result of the expression is automatically returned without needing the `return` keyword.
    - Example:
      ```javascript
      const double = x => x * 2; // Implicit return of x * 2
      ```

Remember that the choice of parentheses depends on the context and the structure of your arrow function. Following these rules will help you create arrow functions that are both concise and clear in their intent. -->


