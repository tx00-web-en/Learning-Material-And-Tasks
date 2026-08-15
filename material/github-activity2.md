# Activity: Getting Started with Git (Part2)

> Before starting this activity, ensure you have a folder named "Dev" in your Documents directory. Inside the "Dev" folder, create another folder called "week1" if it doesn't already exist.

----
## Objective: 

To familiarize beginners with the fundamental Git commands and workflow including `git init`, `git add`, `git commit`, and `git status`, `git remote`, `git push`.

----
## Part 1/2:

### Step 1: Local Git Repository

1. **Setting Up Your Workspace in Visual Studio Code:**
   - Open VSCode within the `week1` directory and launch your terminal.
   - Create a new directory for your project. You can name it whatever you like e.g. git-lab1
   - Right-click on the created directory to open the context menu.
   - Select "Open in Terminal" from the context menu to launch the integrated terminal within VSCode.
   - The terminal will open with the current directory set to the selected directory, allowing you to proceed with initializing your Git repository.

2. **Initializing a Git Repository:**
   - Once you're in the desired directory, initialize a new Git repository using the `git init` command:
     ```
     git init
     ```
   - This command creates a new Git repository in the current directory.

3. **Creating a Sample File:**
   - Create a new text file named `sample.txt`.
   - Add some content to the file.

4. **Checking the Status:**
   - Use the `git status` command to see the current status of your repository:
     ```
     git status
     ```
   - This command shows you which files are tracked, untracked, modified, or staged for commit.

5. **Staging Changes:**
   - To stage changes for commit, use the `git add` command followed by the filename. For example, to stage `sample.txt`:
     ```
     git add sample.txt
     ```
   - Alternatively, you can use `git add .` to stage all changes in the directory:
     ```
     git add .
     ```

6. **Committing Changes:**
   - Once you've staged your changes, commit them to the repository using the `git commit` command:
     ```
     git commit -m "Initial commit"
     ```
   - The `-m` flag allows you to include a commit message. Make sure your commit message is descriptive and concise.

7. **Viewing the Status Again:**
   - After committing your changes, use `git status` once more to verify that your working directory is clean:
     ```
     git status
     ```

Additional Notes:
- Remember that Git tracks changes to files, not the files themselves. This means you need to explicitly add files to the staging area using `git add` before committing them.
- Regularly using `git status` helps you keep track of the state of your repository and what changes still need to be staged or committed.


### Step 2:  Push to GitHub

1. Create a new repository on GitHub:

- Go to the GitHub website .
- Click on the plus sign icon in the top right corner of the page, and then select "New repository."
- Fill in the details for your new repository:
   - Repository name: Choose a name for your new repository.
   - Description (optional): Add a short description to explain the repository's purpose.
   - Visibility: Choose between "Public" or "Private," depending on who should have access.
   - Do not initialize the repository with a `README` file or a `.gitignore` file.
- Click the "Create repository" button to create your new repository.

2. Connect your local repository to the GitHub repository by following the steps provided by GitHub. There are three commands as shown in the screenshot below, in the green block diagram. You'll need to copy and paste the commands into your terminal, one at a time:


```bash
git remote add origin <GitHub Repository URL>
git branch -M main
git push -u origin main 
```

![](./img/github0.png)

4. Refresh the GitHub repository page to see your changes.


------
## Part 2/2: Adding Multiple Files to Your Git Repository

### Step 1: Local Git Repository

1. **Open Visual Studio Code and Integrated Terminal:**
   - If VSCode is not already open in the `week1` directory, open it and then launch your terminal.
   - Create a new directory for your project. You can name it whatever you like e.g. git-lab2
   - Right-click on the created directory to open the context menu.
   - Select "Open in Terminal" from the context menu to open the integrated terminal within VSCode.
   - Once you're in the desired directory, initialize a new Git repository using the `git init` command:
     ```
     git init
     ```
   - This command creates a new Git repository in the current directory.   

2. **Create Three Sample Files:**
   - Inside the directory, create three new text files using any text editor available in VSCode.
   - Name the files `file1.txt`, `file2.txt`, and `file3.txt`.
   - Add some content to each file.

3. **Check Repository Status:**
   - In the integrated terminal, use the `git status` command to check the status of your repository:
     ```
     git status
     ```
   - This command will display the current status of your repository, showing which files are untracked.

4. **Stage Changes:**
   - To stage all changes in the directory for commit, use the `git add .` command:
     ```
     git add .
     ```
   - This command stages all new and modified files in the current directory and its subdirectories.

5. **Verify Staging:**
   - Use the `git status` command again to verify that all changes have been staged successfully:
     ```
     git status
     ```
   - The output should indicate that the files you created (`file1.txt`, `file2.txt`, and `file3.txt`) are now staged for commit.

6. **Commit Changes:**
   - Commit the staged changes to the repository with a descriptive commit message:
     ```
     git commit -m "Added three sample files"
     ```
   - Ensure that your commit message is informative and describes the changes you've made.

7. **View Repository Status Again:**
   - Once the changes are committed, use `git status` to verify that your working directory is clean:
     ```
     git status
     ```
   - The output should indicate that there are no uncommitted changes in your repository.

### Step 2:  Push to GitHub

1. Create a new repository on GitHub:

- Go to the GitHub website .
- Click on the plus sign icon in the top right corner of the page, and then select "New repository."
- Fill in the details for your new repository:
   - Repository name: Choose a name for your new repository.
   - Description (optional): Add a short description to explain the repository's purpose.
   - Visibility: Choose between "Public" or "Private," depending on who should have access.
   - Do not initialize the repository with a `README` file or a `.gitignore` file.
- Click the "Create repository" button to create your new repository.

2. Connect your local repository to the GitHub repository by following the steps provided by GitHub. There are three commands as shown in the screenshot below, in the green block diagram. You'll need to copy and paste the commands into your terminal, one at a time:


```bash
git remote add origin <GitHub Repository URL>
git branch -M main
git push -u origin main 
```

![](./img/github0.png)

4. Refresh the GitHub repository page to see your changes.

