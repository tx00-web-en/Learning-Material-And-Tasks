#  Environment Variables adn cross-env package



## Part 1/3: Setting and Getting Environment Variables in PowerShell, Bash, and Command Prompt

Environment variables are key-value pairs used to configure system and application settings. Here's a guide to set and get environment variables in PowerShell, Bash, and Command Prompt.

---

## **1. PowerShell**

### **Setting Environment Variables**
- **Temporarily (for the session):**
  ```powershell
  $env:VAR_NAME = "value"
  ```
  Example:
  ```powershell
  $env:API_KEY = "my_secret_key"
  ```

- **Permanently (system-wide):**
  Use `setx` command:
  ```powershell
  setx VAR_NAME "value"
  ```
  Example:
  ```powershell
  setx API_KEY "my_persistent_key"
  ```
  ⚠️ Note: This doesn’t affect the current session. Restart the terminal to see the changes.



### **Getting Environment Variables**
- To get the value of an environment variable:
  ```powershell
  $env:VAR_NAME
  ```
  Example:
  ```powershell
  $env:API_KEY
  ```

- To list all environment variables:
  ```powershell
  Get-ChildItem Env:
  ```


## **2. Bash (Linux/MacOS/Git Bash on Windows)**

### **Setting Environment Variables**
- **Temporarily (for the session):**
  ```bash
  export VAR_NAME="value"
  ```
  Example:
  ```bash
  export API_KEY="my_secret_key"
  ```

- **Permanently (in configuration file):**
  Add the variable to your shell configuration file (`~/.bashrc` or `~/.bash_profile`):
  ```bash
  echo 'export VAR_NAME="value"' >> ~/.bashrc
  source ~/.bashrc
  ```
  Example:
  ```bash
  echo 'export API_KEY="my_persistent_key"' >> ~/.bashrc
  source ~/.bashrc
  ```


### **Getting Environment Variables**
- To get the value of an environment variable:
  ```bash
  echo $VAR_NAME
  ```
  Example:
  ```bash
  echo $API_KEY
  ```

- To list all environment variables:
  ```bash
  printenv
  ```


## **3. Command Prompt (CMD)**

### **Setting Environment Variables**
- **Temporarily (for the session):**
  ```cmd
  set VAR_NAME=value
  ```
  Example:
  ```cmd
  set API_KEY=my_secret_key
  ```

- **Permanently (system-wide):**
  Use `setx` command:
  ```cmd
  setx VAR_NAME "value"
  ```
  Example:
  ```cmd
  setx API_KEY "my_persistent_key"
  ```
  ⚠️ Note: Like PowerShell, this doesn’t affect the current session. Restart the terminal to see the changes.


### **Getting Environment Variables**
- To get the value of an environment variable:
  ```cmd
  echo %VAR_NAME%
  ```
  Example:
  ```cmd
  echo %API_KEY%
  ```

- To list all environment variables:
  ```cmd
  set
  ```


## **4. Differences Between Shells**
- **Syntax Variations:**
  - PowerShell uses `$env:VAR_NAME`.
  - Bash uses `VAR_NAME=value` with `export` for global scope.
  - CMD uses `set VAR_NAME=value`.

- **Session Scope:**
  - Variables set without `setx` in CMD and PowerShell, or `~/.bashrc` in Bash, last only for the current session.


## **5. Quick Comparison Table**

| **Action**         | **PowerShell**                   | **Bash**                            | **Command Prompt**          |
|---------------------|----------------------------------|--------------------------------------|-----------------------------|
| Set Temp Variable   | `$env:VAR_NAME = "value"`       | `export VAR_NAME="value"`           | `set VAR_NAME=value`        |
| Set Persistent Var  | `setx VAR_NAME "value"`         | `echo 'export VAR_NAME="value"' >> ~/.bashrc && source ~/.bashrc` | `setx VAR_NAME "value"`     |
| Get Variable        | `$env:VAR_NAME`                | `echo $VAR_NAME`                    | `echo %VAR_NAME%`           |
| List Variables      | `Get-ChildItem Env:`           | `printenv` or `env`                 | `set`                      |

---

## Part 2/3: `cross-env`

Using environment variables in a Node.js/Express app can quickly become tricky if you need to support different operating systems or shell environments, especially during development and deployment. Without tools like `cross-env`, you might need to write OS-specific configurations, which is not practical or scalable.

### Why It's Not Practical to Manually Handle Different Environments
1. **OS-Specific Syntax**: 
   - Setting environment variables differs between Linux/Mac (Unix-based systems) and Windows.
   - Unix-like systems use `export VAR=value` while Windows Command Prompt uses `set VAR=value`.
2. **Team Collaboration**: 
   - In a team, different developers may use different operating systems. Writing OS-specific scripts or commands increases complexity and potential for errors.
3. **CI/CD Pipelines**: 
   - Automated pipelines often use Unix-based systems, so ensuring cross-compatibility is essential for seamless deployment.

### Example Without `cross-env`

#### Setting Environment Variables
Let's say you want to run your `Node.js` app with a specific environment variable, like setting `NODE_ENV=development`.

**1. On Linux/Mac (Bash):**
```bash
NODE_ENV=development node app.js
```

**2. On Windows Command Prompt:**
```cmd
set NODE_ENV=development && node app.js
```

**3. On Windows PowerShell:**
```powershell
$env:NODE_ENV="development"; node app.js
```

#### Issues:
- This syntax difference requires you to account for all three formats.
- You'd need separate scripts or instructions for each environment in `package.json`, for example:

```json
"scripts": {
  "start:unix": "NODE_ENV=production node app.js",
  "start:windows": "set NODE_ENV=production && node app.js"
}
```
This approach quickly becomes unmanageable.

### Using `cross-env`

`cross-env` standardizes how environment variables are set across platforms, removing the need to worry about OS-specific commands.

#### Installation:
```bash
npm install cross-env
```

#### Example with `cross-env`:
In your `package.json`:
```json
"scripts": {
  "start": "cross-env NODE_ENV=production node app.js"
}
```

Now you can use the same command on **any OS or shell**:
```bash
npm start
```


### Benefits of `cross-env`
1. **Consistency**: Write environment variable scripts once, no matter the operating system.
2. **Ease of Use**: Developers on Windows, Mac, or Linux can run the same commands.
3. **Scalability**: Makes CI/CD scripts and team workflows easier to manage.



## Part 3/3: Managing Different Environments in Node.js

When developing an API server in Node.js, it's important to manage different environments—such as **production**, **development**, and **test**—effectively. These environments often require different configurations, such as database connections or API keys, making environment variables crucial for separating these settings.

In this section, we'll cover why different environments are necessary, how to manage them using `.env` files, and how to use tools like `cross-env` to streamline environment switching.



#### Why Do We Need Different Environments in an API Server?

1. **Production**: This is the live environment where the application is used by real users. The production environment often requires the use of optimized code, stable databases, and security measures like encrypted credentials.
   
2. **Development**: This environment is where the app is actively built and tested by developers. Here, it's common to use debugging tools and databases that are specific to development.

3. **Testing**: The test environment is used for running automated tests. It needs its own isolated configuration to avoid impacting development or production systems, especially when testing features like database operations.

Different environments require different settings, such as:
- Databases (e.g., production uses live data, while development uses mock data).
- API keys (test keys in development, real keys in production).
- Logging levels (detailed logs in development, minimal logs in production).

#### How to Manage Environments Using `.env` Files

Node.js supports environment variables through `process.env`. The most common way to store environment variables is by using a `.env` file. This file holds environment-specific configuration that can be loaded into the application when needed.

#### Setting Up Environment Variables

1. **Install Dependencies**: Start by creating a new Node.js project and install the required packages:
   ```bash
   mkdir env-variable-lab
   cd env-variable-lab
   npm init -y
   npm install dotenv cross-env
   ```

2. **Create `.env` File**: In your project root, create a `.env` file to store different configurations:
   ```bash
   PORT=3001
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/w7-bepp
   TEST_MONGO_URI=mongodb://localhost:27017/TEST-w7-bepp
   JWT_SECRET=abc123
   ```

   This file defines different settings for development, such as the database URI and a secret key for JWT authentication.

#### Using Environment Variables in the Code

3. **Load Variables with `dotenv`**: In your configuration file (e.g., `config.js`), use the `dotenv` package to load the variables from `.env`, and use `process.env` to access them:
   
   ```js
   // config.js
   require("dotenv").config();
   
   const NODE_ENV = process.env.NODE_ENV || 'development';
   const PORT = process.env.PORT;
   const MONGO_URI = NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
   
   module.exports = {
     NODE_ENV,
     MONGO_URI,
     PORT,
   };
   ```

4. **Main Application File (`index.js`)**: Require the configuration file in your main application file to access the environment-specific settings:
   
   ```js
   // index.js
   const config = require('./config');
   
   console.log("Database URI: ", config.MONGO_URI);
   console.log("Environment: ", config.NODE_ENV);
   console.log("Running on port: ", config.PORT);
   ```

#### Switching Between Environments with `cross-env`

When running a Node.js application, you need to switch between environments like **development**, **test**, and **production**. `cross-env` is a popular package that helps manage environment variables across different operating systems.

#### Why Use `cross-env`?

Without `cross-env`, environment variables can be tricky to manage on different platforms. For example, setting variables works differently on Linux/macOS than it does on Windows. `cross-env` makes this consistent across all operating systems.

#### Setting Up `cross-env` in `package.json`

To streamline the switching between environments, use `cross-env` in your `package.json` file's scripts section:
   
```json
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development node index.js",
    "test": "cross-env NODE_ENV=test node index.js"
  }
```

Now, you can run your app in different environments by executing the following commands:
- **Production**: `npm start`
- **Development**: `npm run dev`
- **Testing**: `npm test`

Each script sets the `NODE_ENV` variable to the corresponding environment using `cross-env`, ensuring consistency across platforms.

#### Example Commands

1. **Start in Development**: This will run the app in development mode.
   ```bash
   npm run dev
   ```

2. **Start in Production**: This command switches the environment to production mode.
   ```bash
   npm start
   ```

3. **Start in Test**: Running your tests will use the test environment configuration.
   ```bash
   npm test
   ```

#### Summary: Key Steps to Manage Environments in Node.js

1. **Create a `.env` file** for storing environment-specific variables (e.g., database URIs, ports).
2. **Use `dotenv`** in your configuration file to load environment variables into `process.env`.
3. **Implement `cross-env`** in your `package.json` to easily switch between `production`, `development`, and `test` environments.
4. **Use `process.env.NODE_ENV`** to dynamically switch between environments in your code (e.g., connecting to different databases).

By using environment variables effectively, you can make your Node.js application more flexible, secure, and easier to manage across different environments like production, development, and testing.

---
## Links

- [Supertest: How to Test APIs Like a Pro](https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/)
- [Dead-Simple API Tests With SuperTest, Mocha, and Chai](https://dev-tester.com/dead-simple-api-tests-with-supertest-mocha-and-chai/)
- [Development and Production](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production)
- [Testing: Need for different databases](https://dev.to/kristianroopnarine/how-to-separate-your-test-development-and-production-databases-using-nodeenv-anl)
- [cross-env: ](https://www.npmjs.com/package/cross-env) `"start": "cross-env  NODE_ENV=production node index.js"`

<!-- - [Environment variables](./env-var.md) -->