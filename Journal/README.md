# Reflection Journal

1. [Setup](#setup)
2. [Add Collaborator](#add-collaborator)
3. [Update the Journals](#update-the-journals)
4. [Submission Deadlines](#journal-submission-deadlines)

---

### Setup

1. Clone the `reflection-journals` repository into the directory reserved for web courses (e.g., `web-dev`):

    ```shell
    git clone https://github.com/tx00-resources-en/reflection-journals
    ```

2. Remove the `.git` folder:
    - **Windows Users:** Run the following command to remove the Git history: `Remove-Item -Recurse -Force .git`
    - **macOS/Linux Users:** Run the following command to remove the repository's Git history: `rm -rf .git`
	
	
3. Make the project directory a Git repository by running:

```bash
git init
```


4. Stage all the changes:

```bash
git add .
```

5. Commit the changes:

```bash
git commit -m  "Add message here"

```

6. Create a new repository on GitHub:

> Make sure to set the visibility to **private**

- Go to the GitHub website .
- Click on the plus sign icon in the top right corner of the page, and then select "New repository."
- Fill in the details for your new repository:
   - Repository name: Choose a name for your new repository.
   - Description (optional): Add a short description to explain the repository's purpose.
   - Visibility: "**Private**".
   - Do not initialize the repository with a `README` file or a `.gitignore` file.
- Click the "Create repository" button to create your new repository.

7. Connect your local repository to the GitHub repository by following the steps provided by GitHub. There are three commands as shown in the screenshot below, in the green block diagram. You'll need to copy and paste the commands into your terminal, one at a time:


```bash
git remote add origin <GitHub Repository URL>
git branch -M main
git push -u origin main 
```

---

### Add Collaborator

1. **Go to the Repository Settings**:
   - On the repository page, click on the `Settings` tab. It's usually located near the top-right of the page.

2. **Access the Collaborators Section**:
   - In the left-hand menu, click on `Collaborators` (or `Manage access` in some cases).

3. **Add a New Collaborator**:
   - Click on the `Add people` button.
   - In the search bar that appears, type **my** username: `55d41251`.
   - Select the correct user from the dropdown list.

4. **Send the Invitation**:
   - After selecting the user, click the `Add` button or `Invite` button to send the invitation.
   - I will receive an invitation to join the repository.

5. **Confirmation**:
   - Once the invitation is accepted, I will have access to your repository.


---

### Update the Journals


You will write the reflection journal in markdown. Here's a quick intro:

### Header
To create a header, use the `#` symbol followed by a space and the header text. The number of `#` symbols indicates the level of the header. For example:
```markdown
### Header
```

### Lists
To create a list, use `-` or `*` followed by a space and the list item text. For nested lists, indent the nested items with two spaces:
```markdown
- Some text
  - Nested
```

### Bold Text
To make text bold, wrap it in double asterisks `**`:
```markdown
**text**
```

### Horizontal Rule
To create a horizontal rule, use three or more hyphens `---` on a new line:
```markdown
----
```

---

### Deadlines

Please ensure that you update this repository by the weekend of each week. **The deadlines are strict** and must be adhered to.

Each week, update the corresponding journal file (e.g., for this week, write your reflection in `week2.md`, for week 3, write your reflection in `week3.md` etc.). Use the following commands:

```bash
git add .
git commit -m "Add your commit message here"
git push
```

---

### Journal Submission Deadlines

Below are the specific deadlines for each week's journal entry. **Each** reflection journal is worth **20 points**. To earn these points, the journal **must be submitted before the deadline**.

- **Week 1 and Week 2 Deadline**: [31/08 @ 17:00](./week2.md)
- **Week 3 Deadline**: [07/09 @ 17:00](./week3.md)
- **Week 4 Deadline**: [14/09 @ 17:00](./week4.md)
- **Week 5 Deadline**: [21/09 @ 17:00](./week5.md)
- **Week 6 Deadline**: [28/10 @ 17:00](./week6.md)
- **Week 7 Deadline**: [05/10 @ 17:00](./week7.md)


> **Important:** Please make sure to commit and push your updates before the deadlines.

---

### Link(s)

- [Markdown Cheatsheet](https://github.com/im-luka/markdown-cheatsheet)