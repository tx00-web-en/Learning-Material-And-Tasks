# Creating and Merging Branches in GitHub

**Objective:** Learn how to create branches, make changes, and merge them collaboratively in a GitHub repository while minimizing conflicts.

---
## Why Use Branches?

Branches allow multiple team members to work on different features or components of a project simultaneously without interfering with each other's code. This is essential in collaborative projects to ensure a smooth workflow.

---
## Steps

#### **Step 1:**

> Initial Setup by the **First Member**

1. **Create a Git Repository**:
   - Open your terminal and create a new directory for your project:
     ```bash
     mkdir collaborative-project
     cd collaborative-project
     ```
   - Initialize a new Git repository:
     ```bash
     git init
     ```
   - Create a README file:
     ```bash
     echo "# Collaborative Project" > README.md
     git add README.md
     git commit -m "Initial commit"
     ```
   - **Explanation:** The above steps initialize a local Git repository and make the first commit with a README file.

2. **Push to GitHub**:
   - Create a new repository on GitHub (do not initialize with a README).
   - Link your local repository to the GitHub repository:
     ```bash
     git remote add origin https://github.com/your-username/collaborative-project.git
     git branch -M main
     git push -u origin main
     ```
   - **Explanation:** The commands set up the remote repository link and push the local repository’s main branch to GitHub.

3. **Add Collaborators**:
   - Go to your repository on GitHub.
   - Navigate to `Settings` > `Collaborators` and add the GitHub usernames of the other members.
   - **Explanation:** Adding collaborators allows team members to have push access to the repository.

#### **Step 2:**

> Each Member Creates a Branch and Makes Changes

1. **Clone the Repository**:
   - **Each member (including the *first student*)** clones the repository:
     ```bash
     git clone https://github.com/your-username/collaborative-project.git
     cd collaborative-project
     ```
   - **Explanation:** Cloning downloads the repository to each member's local machine.

2. **Create a New Branch**:
   - Each member creates a new branch:
     ```bash
     git switch -c member-x-branch
     ```
   - **Explanation:** `git switch -c` creates a new branch and immediately switches to it. This is the modern, clearer alternative to `git checkout -b`

3. **Create a File and Make Changes**:
   - Each member creates a file named `member-x.txt` (replace `x` with your member number):
     ```bash
     echo "This is member x's file." > member-x.txt
     git add member-x.txt
     git commit -m "Add member-x.txt"
     ```
   - **Explanation:** Adding and committing changes records them locally. Each member creates a unique file to minimize conflicts.

4. **Push to GitHub**:
   - Each member pushes their branch to GitHub:
     ```bash
     git push origin member-x-branch
     ```
   - **Explanation:** This uploads each member's branch and changes to the remote repository on GitHub.

5. **Create a Pull Request**:
   - Each member goes to the GitHub repository and creates a pull request from their branch to the `main` branch.
   - **Explanation:** Pull requests allow others to review changes before merging them into the main branch.

#### **Step 3: Merging Branches by the First Student**

1. **Review Pull Requests**:
   - The first student reviews each pull request on GitHub to ensure there are no conflicts or issues.
   - **Explanation:** Reviewing ensures that the code follows best practices and meets the team's standards.

2. **Merge Pull Requests**:
   - The first student merges each pull request into the `main` branch.
   - **Explanation:** Merging incorporates the changes from each branch into the main branch.

3. **Verify the Merge**:
   - Ensure all branches are successfully merged without conflicts.
   - **Explanation:** Verification ensures that the codebase is stable and works as expected after merging.

#### **Step 4: Handling Merge Conflicts (If Any)**

- If there are conflicts:
  - **Communicate** with your team to decide how to resolve them.
  - Use:
    ```bash
    git fetch origin
    git switch member-x-branch
    git merge main
    ```
  - **Resolve Conflicts** in your text editor, then:
    ```bash
    git add .
    git commit -m "Resolve merge conflicts"
    git push origin member-x-branch
    ```
  - Update the pull request after resolving conflicts.

### Notes

- Ensure each member creates a unique file (`member-x.txt`) to avoid conflicts.
- Use GitHub comments on pull requests for feedback and discussions.
- Keep your branch updated with `git pull` to minimize conflicts.

### Additional Tips

- Regularly communicate with your team to avoid working on the same files.
- Use `git fetch` and `git pull` to stay updated with changes in the remote repository.

--- 
<details>
<summary>Conflict Q/A</summary>

## Conflict Q/A

### synchronize your local branch with the remote branch

To synchronize your local branch with the remote branch, you generally want to fetch the latest changes from the remote repository and then merge or rebase them onto your local branch. 

```bash
git fetch origin
git switch <branch-name>
```

Option A: Merge the changes from the remote branch into your local branch:

```bash
git merge origin/<branch-name>
```

Option B: Rebase the changes from the remote branch onto your local branch:

```bash
git rebase origin/<branch-name>
```

- If you have new commits on your local branch that you want to push to the remote branch, you can do so with:

```bash
git push origin <branch-name>
```

### Accidentally pushed changes to the `main` branch instead of `branch-x`

If you accidentally pushed changes to the `main` branch instead of `branch-x`, you need to revert those changes to restore the `main` branch to its previous state. Here’s a step-by-step guide to help you safely revert the changes:

### Step-by-Step Guide to Revert the Accidental Push

**1. Determine the Last Good Commit on the `main` Branch**

First, identify the last correct commit on the `main` branch before the accidental push. You can do this by checking the commit history:

```bash
git log
```

Look for the commit hash (a long alphanumeric string) of the commit before your accidental push.

**2. Create a New Branch to Save the Accidental Changes**

To avoid losing your accidental changes, create a new branch from the current state of `main`. This allows you to keep those changes in case you need them later.

```bash
git switch -c backup-branch
```

This command creates a new branch called `backup-branch` with all the accidental changes.

**3. Reset the `main` Branch to the Last Good Commit**

Switch back to the `main` branch:

```bash
git switch main
```

Then, reset the `main` branch to the last good commit (replace `<commit-hash>` with the hash you identified earlier):

```bash
git reset --hard <commit-hash>
```

This command moves the `main` branch back to the previous state before your accidental push.

> **Warning:** The `--hard` option will reset both the commit history and the working directory to the specified commit. Ensure you have saved any necessary changes before running this command.

**4. Force-Push the Reset `main` Branch to Remote**

To update the remote `main` branch with the reset state, you need to force-push:

```bash
git push origin main --force
```


This command overwrites the remote `main` branch with your local changes, effectively removing the accidental commits from the remote.

> **Important:** Be cautious when using `--force` as it rewrites the commit history and can impact other developers working on the same branch. Communicate with your team before force-pushing to `main`.

**5. Apply the Changes to `branch-x`**

Now that you have reverted the `main` branch, you can apply your changes to the correct branch (`branch-x`).

Switch to `branch-x`:

```bash
git switch branch-x
```

Merge or cherry-pick the changes from the `backup-branch`:

```bash
git merge backup-branch
```

Alternatively, if you only want specific commits, use:

```bash
git cherry-pick <commit-hash>
```

**6. Push the Changes to `branch-x`**

Finally, push your changes to `branch-x`:

```bash
git push origin branch-x
```

**7. Recap**

- Create a backup branch to save the accidental changes.
- Reset the `main` branch to the last good commit.
- Force-push the reset `main` branch to remote.
- Apply the saved changes to the correct branch (`branch-x`).
- Push the changes to `branch-x`.

</details>

---
## Links

- [Git merge](https://www.atlassian.com/git/tutorials/using-branches/git-merge) vs [Git rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
- [Git revert](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert)
- [Making a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [Git cherry pick](https://www.atlassian.com/git/tutorials/cherry-pick)

