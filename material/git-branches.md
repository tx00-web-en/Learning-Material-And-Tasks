# Theory: Git Branches

Git branches are a fundamental concept in version control that allow developers to work on different features or bug fixes independently without affecting the main codebase. Think of them as parallel universes where you can experiment and make changes without risking the stability of the main branch.

**Why Use Branches?**

* **Isolation:** Branches provide a safe space to work on new features or fix bugs without affecting the main codebase.
* **Collaboration:** Multiple developers can work on different branches simultaneously, reducing conflicts and improving efficiency.
* **Experimentation:** You can try out new ideas or approaches on a branch without worrying about breaking the main code.
* **Rollback:** If a change goes wrong, you can easily revert to a previous state by switching back to a stable branch.

**Common Branch Types:**

1. **Main (or Master):** The primary branch representing the production-ready code.
2. **Develop:** A branch used for active development and integration of features.
3. **Feature:** Branches created for specific features or enhancements.
4. **Bugfix:** Branches created to address specific bugs.
5. **Release:** Branches created to prepare for a release, often based on the develop branch.
6. **Hotfix:** Branches created to quickly address critical issues in the production environment.

**Branching Workflow:**

1. **Create a new branch:** Use the `git branch <branch-name>` command to create a new branch.
2. **Switch to the new branch:** Use the `git checkout <branch-name>` command to start working on the new branch.
3. **Make changes:** Make your changes to the codebase.
4. **Commit changes:** Use the `git commit -m "Commit message"` command to commit your changes.
<!-- 5. **Merge or rebase:** Once you're satisfied with your changes, you can merge or rebase the branch back into the main branch. -->

<!-- **Merging and Rebasing:**

* **Merging:** Combines the changes from one branch into another, creating a new commit.
* **Rebasing:** Replays the commits from one branch onto another, creating a cleaner commit history. -->

**Best Practices:**

<!-- * Keep branches up-to-date with the main branch to avoid merge conflicts. -->
* Use descriptive branch names that reflect their purpose.
* Delete branches once they are no longer needed.
* Use a consistent branching strategy that suits your team's workflow.

By understanding and effectively using Git branches, you can streamline your development process, improve collaboration, and deliver high-quality software.

---

## Links

- [Git Branch](https://www.atlassian.com/git/tutorials/using-branches)
- Git how-to: 
  - [www](https://githowto.com)
  - [src](https://github.com/GitHowTo/githowto-content)
- [visualizing-git](https://git-school.github.io/visualizing-git/)
- [Part 1: Git (Duration **36 min**)](https://www.youtube.com/watch?v=hrTQipWp6co)
- [Part 2: GitHub (Duration **56 min**)](https://www.youtube.com/watch?v=1ibmWyt8hfw)
