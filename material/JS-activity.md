# Activity: JavaScript Review

> Before starting this activity, ensure you have a folder named "Dev" in your Documents directory. Inside the "Dev" folder, create another folder called "week1" if it doesn't already exist.

----

## Part 1: Refactoring Regular Functions to Arrow Functions

### Introduction:

In this part, you will explore various scenarios where you can **refactor** regular functions into arrow functions in JavaScript. 
<!-- Arrow functions provide a concise syntax and lexically scoped this, making them a valuable tool for enhancing code readability and maintainability. -->


### step 1

Create a JavaScript file (e.g., `arrow-functions.js`) in the project directory

### Step 2: Refactor Regular Functions to Arrow Functions:

**Scenario 1**: Basic Function:
Refactor a simple function with no parameters and a single-line return statement:

```js
// Regular function
function sayHello() {
    return "Hello, world!";
}
```

<details>
  <summary>Solution</summary>

`const sayHelloArrow = () => "Hello, world!";`

</details>


**Scenario 2**: Single Parameter:
Refactor a function with a single parameter:

```js
// Regular function
function double(x) {
    return x * 2;
}
```

<details>
  <summary>Solution</summary>

`const doubleArrow = x => x * 2;`

</details>


**Scenario 3**: Multiple Parameters:
Refactor a function with multiple parameters:

```js
// Regular function
function add(x, y) {
    return x + y;
}
```

<details>
  <summary>Solution</summary>

`const addArrow = (x, y) => x + y;`

</details>

**Scenario 4**: Function Inside an Object:
Refactor a function defined inside an object:

```js
// Regular function
const person = {
    name: "Alice",
    sayHi: function() {
        return "Hi, " + this.name + "!";
    }
};
```

<details>
  <summary>Solution</summary>

```js
const personArrow = {
    name: "Alice",
    sayHi: () => "Hi, " + this.name + "!" // 'this' will not work as expected here
};
```

</details> 


**Scenario 5**: Callback Functions:

> Call back functions and map() will be discussed later in the course

Refactor a callback function passed to the map method:

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = [];
numbers.forEach(function(num) {
  doubled.push(num * 2);
});

```

<details>
  <summary>Solution</summary>

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = [];

numbers.forEach(num =>  doubled.push(num * 2)});
```
</details>


### Step 3: Run the Script:

In your terminal or command prompt, execute the script using the Node.js runtime:

```shell
node arrow-functions.js
```

----

## Part 2: Hoisting

### Step 0

- What is the difference between function declaration and function expression

```js
// function declaration
function square(x) {
  return x * x;
}

// function expression
const square = function(x) {
  return x * x;
};
```



### Step 1: Refactoring

- Create a JavaScript file (e.g., `hoisting.js`) in the project directory
- Rewrite the following *function declarations* using a *function expression*:

 ```js
 // 1.
 function cube(x) {
   return x * x * x;
 }

 // 2.
 function fullName(first, last) {
   return first + " " + last;
 }

 // 3.
 function power(base, exp) {
   if (exp === 0) {
     return 1;
   }
   return base * power(base, exp - 1);
 }

 // 4.
 function sumCubes(numbers) {
   let total = 0;
   for (let i = 0; i < numbers.length; i++) {
     total = total + cube(numbers[i]);
   }
   return total;
 }
 ```

### Step 2: Mechanics of Hoisting

Type out your best answers to the following questions:

1. Why does JavaScript output `undefined` instead of throwing an error in the following code?

  ```js
  console.log(message);

  var message = 'Hi there!';
  ```

2. Why does JavaScript throw an error instead of logging `undefined` in the following code?

    ```js
    console.log(message);

    let message = 'Hi there!';
    ```

3. Explain precisely what happens when the following code is executed.

    ```js
    console.log(showMessage());

    const showMessage = function(){
      return 'Hi there!';
    };
    ```

4. Why does JavaScript *not* throw any errors when the following code is executed?

  ```js
  console.log(showMessage());

  function showMessage(){
    return 'Hi there!';
  }
  ```

### Step 3: Code Restructuring

Restructure the following instances of code to work correctly:

 ```js
 // 1.
 for(let i = 0; i < values.length; i++){
   console.log(values[i]);
 }

 let values = [10, 20, 30];
 ```

 ```js
 // 2.
 console.log(welcome('Charlie', 'Munger'));

 function welcome(first, last) {
   return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
 };

 let lastLogin = '1/1/1970';
 ```

 ### Ref
 - [hackreactor](https://github.com/hackreactor/javascript_401)
 - [Function declarations vs function expressions](https://www.freecodecamp.org/news/when-to-use-a-function-declarations-vs-a-function-expression-70f15152a0a0/)
 








