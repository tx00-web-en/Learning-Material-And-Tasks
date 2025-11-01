# Activity: Reflection Journal & Git Branches

There are three parts to this activity:

1. How to submitt the Reflection Journal
2. Practicing Git Branching
3. (Optional) Using Visual Studio Live Share, which may be especially useful during the pair programming session.

---

## Part 1 of 3: Reflection Journal
---

This part is to ensure that every member of the group can push their Reflection Journal.

* Create a **separate repository** for your journal.
* The repository **must be private**.
* Follow the provided instructions to set it up and add me as a collaborator. The detailed guide can be found [here](../Journal/README.md).


## Part 2/3: Git Branching
---

### **Objective:**

In this lab, you will learn how to set up a Git branching structure for a project named `demo-project`. You will create a `main` branch and three sprint branches (`sprint-1`, `sprint-2`, and `sprint-3`). You will also create different files in each branch to simulate independent work on various project features.

### **Prerequisites:**

- Ensure Git is installed on your local machine.
- You have a GitHub account or another remote Git repository platform.
- You are familiar with basic Git commands.

### **Steps:**

#### **1. Initialize the `demo-project` Repository**

1. **Create a New Directory for Your Project:**
   ```bash
   mkdir demo-project
   cd demo-project
   ```

2. **Initialize Git:**
   ```bash
   git init
   ```

3. **Create an Initial Commit on the `main` Branch:**
   - Create a `README.md` file to start with some content:
     ```bash
     echo "# demo-project" > README.md
     ```
   - Stage and commit the changes:
     ```bash
     git add README.md
     git commit -m "Initial commit on main branch"
     ```

4. **Push the `main` Branch to the Remote Repository:**
   - First, create a remote repository on GitHub named `demo-project`.
   - Link the local repository to the remote:
     ```bash
     git remote add origin https://github.com/your-username/demo-project.git
     ```
   - Push the `main` branch to the remote repository:
     ```bash
     git branch -M main
     git push -u origin main
     ```

#### **2. Create Branches for Sprints**

1. **Create and Switch to Branch:**

   - **Create and Switch to `sprint-1` Branch** (two‑step method):
     ```bash
     git branch sprint-1
     git switch sprint-1
     ```     
   - **Create a New File for Sprint 1**:
     ```bash
     echo "This is Sprint 1 feature" > sprint1-feature.txt
     ```
   - Stage and commit the changes:
     ```bash
     git add sprint1-feature.txt
     git commit -m "Add sprint 1 feature"
     ```

2. **Push `sprint-1` Branch:**
   ```bash
   git push -u origin sprint-1
   ```

3. **Create and Switch to `sprint-2` Branch:**
   - First, switch back to the `main` branch:
     ```bash
     git switch main
     ```
   - Then, create the `sprint-2` branch:
     ```bash
     git branch sprint-2
     git switch sprint-2
     ```
   - **Create a New File for Sprint 2**:
     ```bash
     echo "This is Sprint 2 feature" > sprint2-feature.txt
     ```
   - Stage and commit the changes:
     ```bash
     git add sprint2-feature.txt
     git commit -m "Add sprint 2 feature"
     ```
4. **Push `sprint-2` Branch:**
   ```bash
   git push -u origin sprint-2
   ```

5. **Create and Switch to `sprint-3` Branch:**
   - As before, switch to the `main` branch:
     ```bash
     git switch main
     ```
   - Now, create the `sprint-3` branch:
     ```bash
     git branch sprint-3
     git switch sprint-3
     ```
   - **Create a New File for Sprint 3**:
     ```bash
     echo "This is Sprint 3 feature" > sprint3-feature.txt
     ```
   - Stage and commit the changes:
     ```bash
     git add sprint3-feature.txt
     git commit -m "Add sprint 3 feature"
     ```

6. **Push `sprint-3` Branch:**
   ```bash
   git push -u origin sprint-3
   ```

#### **3. Verify Branch Structure and Files**

1. **List All Local Branches:**
   ```bash
   git branch
   ```
   You should see:
   ```
   main
   sprint-1
   sprint-2
   sprint-3
   ```

2. **List All Remote Branches:**
   ```bash
   git branch -r
   ```
   You should see:
   ```
   origin/main
   origin/sprint-1
   origin/sprint-2
   origin/sprint-3
   ```

3. **Verify Files in Each Branch:**
   - Switch to each branch and list the files to verify the presence of the sprint-specific files:
     ```bash
     git switch sprint-1
     ls
     ```
   - Repeat for `sprint-2` and `sprint-3` to check that `sprint2-feature.txt` and `sprint3-feature.txt` exist in their respective branches.

### Notes:

1. Instead of creating a branch and then switching in two steps:
   ```bash
   git branch sprint-1
   git switch sprint-1
   ```
   you can do it in one command:
   ```bash
   git switch -c sprint-1
   ```
2. In older versions of Git, the `git checkout` command was used for both switching and creating branches. For example:
   ```bash
   git checkout -b sprint-1
   ```
   Today, `git switch` is recommended because it separates branch operations more clearly.


### `git switch` vs `git checkout`

| Task                                | Modern Command (`switch`)        | Legacy Command (`checkout`)     |
|-------------------------------------|----------------------------------|---------------------------------|
| Switch to an existing branch        | `git switch branch-name`         | `git checkout branch-name`      |
| Create a new branch and switch to it| `git switch -c new-branch`       | `git checkout -b new-branch`    |
| Create a branch without switching   | `git branch new-branch`          | `git branch new-branch`         |
| Other uses (files, commits, etc.)   | ❌ Not supported (branch only)    | ✅ Used for many operations      |


---

## Part 3/3 (Optional)

Please install **Visual Studio Live Share** and practice using it to collaborate on coding projects in real-time.

#### **1. Install the  Extension**

  - Install the Visual Studio Live Share Extension
  - Sign In to Enable Live Share

#### **2. Create a Shared Project**

One group member (Host) should:
  - Open a folder or project in Visual Studio Code.
  - Start a Live Share session by clicking on the **Live Share** button in the status bar or activity bar.
  - Share the generated session link with other group members.

#### **3. Join the Shared Session**

The other group members (Guests) should:
  - Click on the session link shared by the host.
  - Visual Studio Code will automatically join the session, allowing everyone to work on the same project simultaneously.

#### **4. Links**

- [Video: Remote collaboration in VSCode (5min)](https://youtu.be/A2ceblXTBBc?si=J2nH_nAN8165f8Hz)
- [Visual Studio Live Share](https://visualstudio.microsoft.com/services/live-share/)


<!-- 



---
#### **Objective:**
In this lab, you will learn how to set up a Git branching structure for a project named `demo-project`. You will create a `main` branch and three sprint branches (`sprint-1`, `sprint-2`, and `sprint-3`). You will also create different files in each branch to simulate independent work on various project features.

#### **Prerequisites:**
- Ensure Git is installed on your local machine.
- You have a GitHub account or another remote Git repository platform.
- You are familiar with basic Git commands.

#### **Steps:**

### **1. Initialize the `demo-project` Repository**

1. **Create a New Directory for Your Project:**
   ```bash
   mkdir demo-project
   cd demo-project
   ```

2. **Initialize Git:**
   ```bash
   git init
   ```

3. **Create an Initial Commit on the `main` Branch:**
   - Create a `README.md` file to start with some content:
     ```bash
     echo "# demo-project" > README.md
     ```
   - Stage and commit the changes:
     ```bash
     git add README.md
     git commit -m "Initial commit on main branch"
     ```

4. **Push the `main` Branch to the Remote Repository:**
   - First, create a remote repository on GitHub named `demo-project`.
   - Link the local repository to the remote:
     ```bash
     git remote add origin https://github.com/your-username/demo-project.git
     ```
   - Push the `main` branch to the remote repository:
     ```bash
     git branch -M main
     git push -u origin main
     ```

### **2. Create Branches for Sprints**

1. **Create and Switch to Branch:**

   - **Create and Switch to `sprint-1` Branch**:
     ```bash
     git checkout -b sprint-1
     ```     
   - **Create a New File for Sprint 1**:
     ```bash
     echo "This is Sprint 1 feature" > sprint1-feature.txt
     ```
   - Stage and commit the changes:
     ```bash
     git add sprint1-feature.txt
     git commit -m "Add sprint 1 feature"
     ```

2. **Push `sprint-1` Branch:**
   ```bash
   git push -u origin sprint-1
   ```

3. **Create and Switch to `sprint-2` Branch:**
   - First, switch back to the `main` branch:
     ```bash
     git checkout main
     ```
   - Then, create the `sprint-2` branch:
     ```bash
     git checkout -b sprint-2
     ```
   - **Create a New File for Sprint 2**:
     ```bash
     echo "This is Sprint 2 feature" > sprint2-feature.txt
     ```
   - Stage and commit the changes:
     ```bash
     git add sprint2-feature.txt
     git commit -m "Add sprint 2 feature"
     ```
4. **Push `sprint-2` Branch:**
   ```bash
   git push -u origin sprint-2
   ```

5. **Create and Switch to `sprint-3` Branch:**
   - As before, switch to the `main` branch:
     ```bash
     git checkout main
     ```
   - Now, create the `sprint-3` branch:
     ```bash
     git checkout -b sprint-3
     ```
   - **Create a New File for Sprint 3**:
     ```bash
     echo "This is Sprint 3 feature" > sprint3-feature.txt
     ```
   - Stage and commit the changes:
     ```bash
     git add sprint3-feature.txt
     git commit -m "Add sprint 3 feature"
     ```

6. **Push `sprint-3` Branch:**
   ```bash
   git push -u origin sprint-3
   ```

### **4. Verify Branch Structure and Files**

1. **List All Local Branches:**
   ```bash
   git branch
   ```
   You should see:
   ```
   main
   sprint-1
   sprint-2
   sprint-3
   ```

2. **List All Remote Branches:**
   ```bash
   git branch -r
   ```
   You should see:
   ```
   origin/main
   origin/sprint-1
   origin/sprint-2
   origin/sprint-3
   ```

3. **Verify Files in Each Branch:**
   - Switch to each branch and list the files to verify the presence of the sprint-specific files:
     ```bash
     git checkout sprint-1
     ls
     ```
   - Repeat for `sprint-2` and `sprint-3` to check that `sprint2-feature.txt` and `sprint3-feature.txt` exist in their respective branches.

### Notes:

1. Instead of using `git checkout -b sprint-1`, you can achieve the same result in two steps:
   ```bash
   git branch sprint-1
   git checkout sprint-1
   ```
2. In newer versions of Git, `git switch` is recommended over `git checkout` for switching branches because it separates branch operations more clearly.
>
> * To **switch to an existing branch**:
>
>   ```bash
>   git switch branch-name
>   ```
>
>   (equivalent to `git checkout branch-name`)
> * To **create a new branch and switch to it**:
>
>   ```bash
>   git switch -c new-branch
>   ```
>
>   (equivalent to `git checkout -b new-branch`)



-->