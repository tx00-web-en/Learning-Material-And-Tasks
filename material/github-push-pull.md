# Workflow


## Workflow for Collaboration with Git

In this pair programming task, one member (Member 1) will create a repository on GitHub and add the other member (Member 2) as a collaborator.

Member 1 will start working on the task in a local repository and then push the changes to GitHub. Member 2 will then clone the repository, make further changes, and push those changes back to GitHub. After that, Member 1 can pull the latest changes to synchronize their local repository with the remote.

Here's an example workflow that you can follow before starting the pair programming task:

### Example Workflow

1. **Member 1: Initial Commit and Push to GitHub**
   - **Step 1**: Member 1 initializes a new Git repository locally:
     ```bash
     git init
     ```
   - **Step 2**: Member 1 creates a file (e.g., `part1`) and adds content to it, then stages and commits the changes:
     ```bash
     echo "Initial content for part1" > part1.txt
     git add part1.txt
     git commit -m "Initial commit for part1"
     ```
   - **Step 3**: Member 1 pushes the repository to GitHub:
     ```bash
     git remote add origin https://github.com/username/repo-name.git
     branch -M main
     git push -u origin main
     ```

2. **Member 2: Clone the Repository and Make Changes**
   - **Step 4**: Member 2 clones the repository from GitHub:
     ```bash
     git clone https://github.com/username/repo-name.git
     cd repo-name
     ```
   - **Step 5**: Member 2 makes changes to `part1` or adds new features, then stages and commits the changes:
     ```bash
     echo "Additional features added by Member 2" >> part1.txt
     git add part1.txt
     git commit -m "Added new features to part1"
     ```
   - **Step 6**: Member 2 pushes the changes back to the shared repository on GitHub:
     ```bash
     git push origin main
     ```

3. **Member 1: Pull the Latest Changes**
   - **Step 7**: Before making any further changes, Member 1 pulls the latest changes from GitHub to ensure they have the most recent version:
     ```bash
     git pull origin main
     ```

### Possible Scenarios and Conflict Resolution

- **No Conflicts**: If Member 2’s changes do not overlap with any local changes made by Member 1, Git will successfully merge the changes, and Member 1 will now have the latest version with Member 2’s additions.

- **Conflicts Occur**: If Member 1 has made local changes to the same parts of `part1` that Member 2 modified, Git will produce a **merge conflict** that Member 1 will need to resolve manually:
  - Git will indicate which files have conflicts.
  - Member 1 should open each file with conflicts, review the changes, and decide how to merge them.
  - After resolving conflicts, Member 1 stages the resolved files and commits the merge:
    ```bash
    git add part1.txt
    git commit -m "Resolved merge conflict between Member 1 and Member 2 changes"
    ```

### Important Commands and Steps in Workflow

1. **Clone the repository** - `git clone URL`: Copies the repository from GitHub to the local machine.
2. **Pull changes** - `git pull origin branch_name`: Fetches and merges changes from the remote repository.
3. **Push changes** - `git push origin branch_name`: Sends local commits to the remote repository.
4. **Resolve conflicts** - When conflicts occur, open the conflicting files, manually resolve the differences, and then commit.

---

## Commit Messages

Here are a few examples and guidelines for writing effective commit messages using imperative verbs:

1. **Start with an Imperative Verb**: Begin with a verb like "Add," "Fix," "Update," "Remove," "Refactor," or "Complete." This makes the commit message easy to read and understand as a description of what the commit does.

2. **Examples of Imperative Verbs for Commit Messages**:
   - **"Add** Navbar component and convert HTML to JSX."
   - **"Remove** unused CSS files."
   - **"Update** README with new installation instructions."
   - **"Fix** bug in user authentication flow."
   - **"Refactor** code for improved performance."

3. **Why Use Imperative Mood?**
   - **Clarity**: The imperative style clearly states the intent of the commit. For example, "Fix bug" is clearer and more direct than "Fixed a bug" or "Fixes a bug."
   - **Consistency**: When all commit messages follow the same pattern, it's easier to scan through them and understand what changes were made.
   - **Convention**: Many version control systems and tools (like Git) display commit messages as if they are giving commands. Using the imperative mood aligns with this convention.
