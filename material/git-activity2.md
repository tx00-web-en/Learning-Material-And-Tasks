# Git Merging Activity

This activity focuses on merging branches.

<!-- You are welcome to participate individually, collaboratively with your peers, or both.

**Note:**  
If you are not able to attend the afternoon session at 16:00, please write in the reflection journal, whether you encountered any issues with this activity. We can revisit these topics next week if needed. -->


### Objective

During this activity, we will:

- Provide step-by-step instructions for creating branches.
- Make modifications to the branch(es) and push them to GitHub.
- Create a pull request.
- Merge the newly created branches with the main branch.

Additionally, we will cover these two questions:

1. Whether to use  `git merge` or  `git rebase`.
2. What to do if someone accidentally pushes directly to the main branch instead of making a pull request, including how to use `git revert` to handle this situation.

---
## Instructions

### **Step 1: Initial Setup**

1. **Clone the Starter Repository:**
   - **Explanation:** Cloning a repository means creating a local copy of a project hosted on GitHub. This is essential for modifying and adding new features to the codebase.
   - **Command:**
     ```bash
     git clone https://github.com/tx00-resources-en/collaborative-project-starter collaborative-project
     cd collaborative-project
     ```
   - **Remove the Existing Git History:**
     - This step clears the current repository’s history, allowing you to start fresh and avoid conflicts related to past commits.
     ```bash
     rm -rf .git
     ```
   - **Initialize a New Git Repository:**
     - This command initializes a new Git repository in the current directory, setting it up for version control.
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     ```

2. **Push to GitHub:**
   - **Explanation:** After initializing the repository locally, you need to create a corresponding repository on GitHub and link them together to push your changes online.
   - **Create a New Repository on GitHub:** 
     - Do this from your GitHub account. Do not initialize it with a README, `.gitignore`, or license.
   - **Link and Push** your local repository to the GitHub repository (Replace `your-username` with your GitHub username ):
     ```bash
     git remote add origin https://github.com/your-username/collaborative-project.git
     git branch -M main
     git push -u origin main
     ```
   - **Verification:**
     - Go to your GitHub repository page and ensure all files are present in the `main` branch.

### **Step 2: Create Branches**

1. **Create and Work on the First Branch:**

   - **Create a New Branch:**
     - **Explanation:** Creating a new branch (`branch-about-component`) allows you to work on the "About" component independently of the `main` branch. This branch is isolated, so changes won't affect the main codebase until merged.
     ```bash
     git checkout -b branch-about-component
     ```

   - **Modify the About Component:**
     - **Explanation:** Here, you modify the `About` component in `src/components/About.jsx` to demonstrate a typical workflow in a project.
     ```jsx
     function About() {
       return (
         <>
           <h1>About Us</h1>
           <p>Added some text</p>
           <p>Added more text here</p>
           <p>Discover more about our team and values.</p>
         </>
       );
     }

     export default About;
     ```

   - **Commit and Push Changes:**
     - **Explanation:** Staging (`git add .`) means marking the changes for the next commit, and committing (`git commit`) means saving those changes to the branch's history. Pushing (`git push`) uploads these changes to the corresponding branch on GitHub.
     ```bash
     git add .
     git commit -m "Update About component"
     git push origin branch-about-component
     ```

   - **Create a Pull Request:**
     - **Explanation:** A pull request (PR) is a request to merge changes from one branch into another. This is a key part of the collaborative process, allowing others to review your changes before they are merged.
     - On GitHub, navigate to your repository and click "Compare & pull request" next to the branch you pushed.

2. **Create and Work on the Second Branch:**

   - **Create Another Branch:**
     ```bash
	 git checkout main
     git checkout -b branch-contact-component
     ```
   - **Modify the Contact Component:**
     - **Explanation:** Similar to the first branch, you modify another component (`Contact`) in the codebase. This demonstrates how different team members might work on different features simultaneously.
     ```jsx
     function Contact() {
       return (
         <div>
           <h1>Contact Page</h1>
           <p>Updated Contacts.</p>
         </div>
       );
     }

     export default Contact;
     ```

   - **Commit and Push Changes:**
     ```bash
     git add .
     git commit -m "Update Contact component"
     git push origin branch-contact-component
     ```

   - **Create a Pull Request:**
     - Same process as above to propose merging this new branch into `main`.

### **Step 3: Merging Branches**

1. **Review Pull Requests:**
   - **Explanation:** Before merging, it is crucial to review the pull requests to ensure that the code follows the project's standards, contains no errors, and does not conflict with other changes.
   - In GitHub, click on the "Pull Requests" tab, and review the proposed changes.

2. **Merge Pull Requests:**
   - **Explanation:** Merging incorporates the changes from the branches into the `main` branch, making them part of the main codebase. This step is usually done after the code has been reviewed and approved.
   - Click "Merge pull request" on GitHub.

3. **Verify the Merge:**
   - **Explanation:** After merging, verify that all changes are correctly incorporated into the `main` branch and that the application still runs as expected. This helps ensure stability.


--- 
<details>
<summary>Conflict Q/A</summary>

### Synchronize Your Local Branch with the Remote Branch

To ensure that your local branch has the latest updates from the remote branch, you must fetch the changes and then either merge or rebase:

1. **Fetch Changes:**
   - **Explanation:** Fetching gets the latest updates from the remote repository without merging them into your local branch.
   ```bash
   git fetch origin
   ```

2. **Merge or Rebase:**
   - **Merge:** Combines the changes fetched from the remote into your local branch. This creates a new commit.
     ```bash
     git merge origin/<branch-name>
     ```
   - **Rebase:** Moves your local commits on top of the fetched commits, resulting in a linear history.
     ```bash
     git rebase origin/<branch-name>
     ```
   - **Explanation:** Both methods have their use cases; merging is simpler but creates extra merge commits, while rebasing keeps a cleaner commit history.

### Undo an Accidental Push to the `main` Branch

If you accidentally pushed changes directly to the `main` branch instead of a feature branch, follow these steps to revert:

1. **Find the Last Correct Commit:**
   - Use `git log` to find the commit hash before the accidental push.
   ```bash
   git log
   ```

2. **Create a Backup Branch:**
   - **Explanation:** Creating a backup branch saves the accidental changes so that they aren't lost.
   ```bash
   git checkout -b backup-branch
   ```

3. **Reset the `main` Branch:**
   - **Explanation:** Resetting the branch removes the accidental commits from the branch history.
   ```bash
   git checkout main
   git reset --hard <commit-hash>
   ```

4. **Force-Push the Reset Branch:**
   - **Explanation:** A force-push is necessary to update the remote repository to match the reset local branch. **Use this carefully!**
   ```bash
   git push origin main --force
   ```

5. **Apply Changes to the Correct Branch:**
   - **Explanation:** Switch to the intended branch (`branch-x`) and merge the changes from the backup branch.
   ```bash
   git checkout branch-x
   git merge backup-branch
   ```

6. **Push Changes to the Correct Branch:**
   - Push the changes to the remote repository.
   ```bash
   git push origin branch-x
   ```
</details>

---
## Links

- [Git merge](https://www.atlassian.com/git/tutorials/using-branches/git-merge) vs [Git rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
- [Git revert](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert)
- [Making a Pull Request](https://www.atlassian.com/git/tutorials/making-a-pull-request)
- [Git cherry pick](https://www.atlassian.com/git/tutorials/cherry-pick)