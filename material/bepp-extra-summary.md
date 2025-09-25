#  Environment Variables adn cross-env package


----
## Part 1/2: Setting and Getting Environment Variables in PowerShell, Bash, and Command Prompt

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

---

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

---

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

---

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

---

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

---

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

---

## **4. Differences Between Shells**
- **Syntax Variations:**
  - PowerShell uses `$env:VAR_NAME`.
  - Bash uses `VAR_NAME=value` with `export` for global scope.
  - CMD uses `set VAR_NAME=value`.

- **Session Scope:**
  - Variables set without `setx` in CMD and PowerShell, or `~/.bashrc` in Bash, last only for the current session.

---

## **5. Quick Comparison Table**

| **Action**         | **PowerShell**                   | **Bash**                            | **Command Prompt**          |
|---------------------|----------------------------------|--------------------------------------|-----------------------------|
| Set Temp Variable   | `$env:VAR_NAME = "value"`       | `export VAR_NAME="value"`           | `set VAR_NAME=value`        |
| Set Persistent Var  | `setx VAR_NAME "value"`         | `echo 'export VAR_NAME="value"' >> ~/.bashrc && source ~/.bashrc` | `setx VAR_NAME "value"`     |
| Get Variable        | `$env:VAR_NAME`                | `echo $VAR_NAME`                    | `echo %VAR_NAME%`           |
| List Variables      | `Get-ChildItem Env:`           | `printenv` or `env`                 | `set`                      |

---

## Part 2: `cross-env`

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

