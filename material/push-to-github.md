# Push a Project to GitHub

### 1. Open the project directory

In your terminal, navigate to the directory containing your project:

```bash
cd path/to/your/project
```

### 2. Initialize Git

If the project is not already a Git repository, run:

```bash
git init
```

### 3. Create or check `.gitignore`

Make sure your project has a `.gitignore` file. For a typical Node.js project, it should at least contain:

```gitignore
node_modules/
.env
.env.*
```

Do not commit passwords, API keys, or other secrets to GitHub.

### 4. Check what Git will track

Run:

```bash
git status
```

Make sure there are no files you don't want to upload.

### 5. Stage the files

```bash
git add .
```

### 6. Commit the files

```bash
git commit -m "Initial commit"
```

### 7. Create a new repository on GitHub

Go to GitHub and:

* Click the **+** icon in the top-right corner.
* Select **New repository**.
* Choose a repository name.
* Add a description if desired.
* Choose **Public** or **Private**.
* **Do not** initialize the repository with a README or `.gitignore`.
* Click **Create repository**.

### 8. Connect the local repository to GitHub

GitHub will provide commands for connecting your local repository. Typically, they will look like:

```bash
git remote add origin <GitHub Repository URL>
git branch -M main
git push -u origin main
```

Replace `<GitHub Repository URL>` with the URL of your new GitHub repository.

### 9. Verify the upload

Refresh the GitHub repository page. Your project files should now appear there.
