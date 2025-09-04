const foo = ["one", "two", "three"];

const [blue, ,yellow] = foo;
console.log(blue);
console.log(yellow); // "two"

function f() {
  return [1, 2];
}

const [a, b] = f();
console.log(a); // 1
console.log(b); // 2

//

function generateFunctionAndValue(number) {
    // Define a function
    function innerFunction(parameter) {
      return `Hello, ${parameter}!`;
    }
    // Define a value
    let value = 42 + number;
    // Return an array with both the function and the value
    return [innerFunction, value];
  }

//   // Usage
  const [myFunction, myValue] = generateFunctionAndValue(5);
//   console.log(myValue);
  

//   // Call the returned function
  const result = myFunction("world");

  console.log(result); // Output: Hello, world!
  console.log(myValue); // Output: 47
