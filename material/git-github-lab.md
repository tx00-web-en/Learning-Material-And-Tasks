# Lab: Understanding Why Nested Git Repositories Do Not Work

### **Objective:**
Some students in the class encountered issues pushing their reflection journals due to nested Git repositories. This lab is designed to clarify why this happens and how to fix it, ensuring everyone is on the same page.

---

### **Part 1: Observing the Issue with Nested Git Repositories**

#### **Step 1: Create a Main Git Repository**
1. Open a terminal and create a new directory:
   ```sh
   mkdir main_repo
   cd main_repo
   ```
2. Initialize a Git repository inside it:
   ```sh
   git init
   ```

#### **Step 2: Create Nested Git Repositories**
1. Inside `main_repo`, create two subdirectories:
   ```sh
   mkdir sub_repo1 sub_repo2
   ```
2. Add some dummy files:
   ```sh
   echo "File in sub_repo1" > sub_repo1/file1.txt
   echo "File in sub_repo2" > sub_repo2/file2.txt
   ```
3. Initialize Git repositories inside both subdirectories:
   ```sh
   cd sub_repo1 && git init && git add . && git commit -m "message 1" && cd ..
   cd sub_repo2 && git init && git add . && git commit -m "message 2" && cd ..
   ```

#### **Step 3: Commit and Push to GitHub**
1. Go back to the `main_repo` directory and add everything:
   ```sh
   git add .
   git commit -m "Add nested repositories"
   ```
2. Push to GitHub (replace `<your-repo-url>` with your actual repository URL):
   ```sh
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. **Observe the issue:**
   - Only the `.git` directories of `sub_repo1` and `sub_repo2` are tracked in `main_repo`.
   - The files inside the sub-repositories are not pushed.

---

### Fixing the Issue


 Navigate to each subdirectory and remove its `.git` folder:
   ```sh
   rm -rf sub_repo1/.git
   rm -rf sub_repo2/.git
   ```
- Now, the `sub_repo1` and `sub_repo2` directories are treated as normal folders.


---

### Key Takeaways

- A Git repository cannot track other Git repositories inside it as normal directories.
- Instead, Git treats nested repositories as **submodules**, which only store a pointer to the external repository, not its content.
- The solution is to remove the `.git` folders inside the nested repositories, making them regular directories that can be committed and pushed normally.

<!-- ---

### **Discussion Questions**
1. Why does Git treat nested repositories as submodules instead of tracking them normally?
2. What are some valid use cases for using Git submodules instead of removing `.git` folders?
3. How could you use `.gitignore` to prevent accidentally creating nested repositories?

End of Lab 🚀 -->

