# Activity: Node Modules

> Before starting this activity, ensure you have a folder named "Dev" in your Documents directory. Inside the "Dev" folder, create another folder called "week1" if it doesn't already exist.

----

## Part 1/2: Custom Node module 

### Step 1: Create a JavaScript File

Create a JavaScript file (e.g., `custom-functions.js`) in the project directory

### Step 2: Write the Functions in the JavaScript File

1. In `custom-functions.js`, define these  functions:

   ```javascript
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
     var total = 0;
     for (let i = 0; i < numbers.length; i++) {
       total = total + cube(numbers[i]);
     }
     return total;
   }

   module.exports = {
     cube,
     fullName,
     power,
     sumCubes,
   };
   ```

In this file, we've defined the four functions and used `module.exports` to export them as an object with named properties.

### Step 3: Use the Module in Another File

1. To test your module, you can create another JavaScript file (e.g., `test.js`) in the project directory

2. In `test.js`, import your custom module and use the exported functions:

   ```javascript
   const customFunctions = require('./custom-functions');

   console.log(customFunctions.cube(3)); // Test the cube function
   console.log(customFunctions.fullName('John', 'Doe')); // Test the fullName function
   console.log(customFunctions.power(2, 3)); // Test the power function
   console.log(customFunctions.sumCubes([1, 2, 3])); // Test the sumCubes function
   ```

### Step 4: Run the Test File

In your terminal, run the test file to check if your custom module is working as expected:

```bash
node test.js
```

You've now created a custom Node module that exports the specified functions. You can use this module in other Node.js projects by importing it using `require`.

----

## Part 2/2:  Built-in Core modules

In this part, you will explore the Node.js `fs` (File System) and `os` (Operating System) modules to better understand how system calls and file operations work. Additionally, we will discuss the security implications of these operations, emphasizing the importance of proper error handling and security practices.

> For a comprehensive list of built-in modules along with examples, check out this guide on [W3Schools](https://www.w3schools.com/nodejs/ref_modules.asp).   

### Objectives

1. Understand the `fs` and `os` modules in Node.js.
2. Execute system calls and file operations using Node.js.
3. Recognize security implications related to file and system access.


### Step 1: File System Operations

1. In your project directory, create a JavaScript file (e.g., `sys-calls.js`) where you'll perform the tasks in this lab.

2. Import the `fs` module and perform the following file system operations:
- Create a  `sample.txt` file and add some text to it.
- Read the contents of  `sample.txt` file using `fs.readFile()`. Handle errors appropriately and log the content to the console.

    <details>
    <summary>How to</summary>

    ```javascript
    const fs = require('fs');
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
        console.error('Error reading file:', err);
        } else {
        console.log('File contents:', data);
        }
    });
    ```

    </details>

- Write data to a new file (e.g., `output.txt`) using `fs.writeFile()`. Handle errors and confirm the data has been written.

    <details>
    <summary>How to</summary>

    ```javascript
    const fs = require('fs');
    fs.writeFile('output.txt', 'This is some sample data.', (err) => {
    if (err) {
    console.error('Error writing file:', err);
    } else {
    console.log('Data written to output.txt');
    }
    });
    ```

- Run your program and observe the results. Discuss the potential security risks involved when reading or writing files and the importance of error handling in these operations.

### Step 2: Operating System Information

1. Import the `os` module and access various pieces of information about the operating system.

    <details>
    <summary>How to</summary>

    ```javascript
    const os = require('os');
    ```
    </details>

   a. Print the hostname using `os.hostname()` e.g `console.log('Hostname:', os.hostname());`
   b. Display the OS platform with `os.platform()`.
   c. Determine the available CPU cores with `os.cpus()`.


    <details>
    <summary>How to</summary>

    ```javascript
    const os = require('os');
    console.log("Platform: " + os.platform());
    console.log("Hostname: " + os.hostname());
    console.log("Architecture: " + os.arch());
    ```
    </details>

2. Run your program and discuss the types of information that can be accessed through the `os` module. Consider the potential security implications of disclosing such information.

----
## Optional Task

> If you finish early, you can consider doing the following OPTIONAL task.

### Step 1:

In step 3 above, use `fs.writeFile()` to log `os.hostname()`, `os.platform()` and  `os.cpus()`

### Step 2: asynchronous operations

In your script, you invoked `fs.readFile()` and `fs.writeFile()`  prior to logging the OS information like `os.platform()`. Explain why the observed output may look as follows:

```sh
Hostname: DESKTOP-DAB97SL
OS Platform: win32
Data written to output.txt
File contents: This is some text
```

<details>
<summary>Explanation</summary>

- **fs.readFile()** and **fs.writeFile()** are asynchronous functions: These file system operations are designed to work asynchronously, which means they don't block the execution of the rest of your code. They initiate file read and write operations in the background and continue with the execution of the subsequent code without waiting for them to complete.

- **Logging with os.platform()**: When you call `os.platform()` to log the information about the operating system, it typically executes immediately since it's a synchronous operation. It provides the OS information in your output.

- **Execution Flow**: Here's the order of execution with the described sequence:

   - The script starts.
   - `fs.readFile()` and `fs.writeFile()` are called. They initiate their respective file operations but don't block the script's execution.
   - Immediately after, `os.platform()` is called, logging the OS information.

- **Potential Output Issues**: The output could have a couple of issues due to the asynchronous nature of file operations:

   - The OS information might be logged before the `fs.readFile()` and `fs.writeFile()` operations complete. This is because these file operations are running concurrently in the background, and there's no guarantee that they will finish before `os.platform()` executes.

   - If your script relies on the data read from a file by `fs.readFile()` or the data being written by `fs.writeFile()`, it may not be available or complete at the point when `os.platform()` executes.

</details>



### Step 3

One way to solve part 4 is to use promises. This topic will be dealt with later in the course.

<details>
<summary>Sample solution</summary>

 ```js
const fs = require('fs').promises;
const os = require('os');

async function readFileAndLogOSInfo() {
  try {
    const data = await fs.readFile('output.txt', 'utf8');
    console.log('Data from file:', data);

    const platform = os.platform();
    console.log('OS Platform:', platform);
  } catch (error) {
    console.error('Error:', error);
  }
}

readFileAndLogOSInfo();
```

</details>  
