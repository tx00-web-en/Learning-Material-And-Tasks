# Theory: Linux Commands

This is a quick overview of `some` Linux commands and basic file system navigation. Windows users will use `Git Bash`, a lightweight Linux emulator, while Mac and Linux users can simply open the `Terminal`. Keep in mind that some commands may work in Windows PowerShell, but not all of them.


## Navigating the Linux File System

Navigating the Linux file system requires understanding how to move between directories using both relative and absolute paths. In this summary, we'll focus on relative paths, specifically highlighting the difference between `./` and `../`.

- **`./`** refers to the current directory. When you use `./` before a command or file name, it indicates that the action should be performed in the current directory. For example, `./script.sh` runs a script located in the current directory.
  
- **`../`** refers to the parent directory, or one level up from the current directory. Using `../` allows you to navigate to a directory above your current location. For instance, `cd ../` moves you up one directory level.

Understanding the difference between `./` and `../` is key to efficiently navigating and managing files within the Linux file system.

## Linux commands

Here's a summary of the most commonly used Linux commands that we'll be using in our course. For more detailed information, you can refer to **The Linux Command Handbook**: [Text](https://www.freecodecamp.org/news/the-linux-commands-handbook/) or [Video](https://www.youtube.com/watch?v=ZtqBQ68cfJc).

1. **`ls`**: Lists the contents of a directory.
   - **Example**: `ls /home/user/Documents`
   - **Use Case**: View all files and folders within the "Documents" directory.

2. **`cd`**: Changes the current directory.
   - **Example**: `cd /var/log`
   - **Use Case**: Navigate to the "log" directory within the "var" directory.

3. **`clear`**: Clears the terminal screen.
   - **Example**: `clear`
   - **Use Case**: Clear the terminal to remove clutter from previous commands.

4. **`pwd`**: Prints the current working directory.
   - **Example**: `pwd`
   - **Use Case**: Determine the full path of your current location in the directory structure.

5. **`rm`**: Removes files or directories.
   - **Example**: `rm file.txt` or `rm -r /path/to/directory`
   - **Use Case**: Delete a file named "file.txt" or remove a directory and its contents.
   - Using the `-rf` switch with the `rm` command (`rm -rf /path/to/directory`) is a powerful and potentially dangerous operation in Unix-like systems. Here’s why:
     - **`-r` (Recursive)**: This option tells the `rm` command to delete the specified directory and all of its contents, including subdirectories and files. Essentially, it removes everything within the directory tree.
     - **`-f` (Force)**: This option forces the removal of files and directories without prompting for confirmation. It also ignores any errors that might occur, such as trying to remove a non-existent file.

6. **`whoami`**: Displays the current username.
   - **Example**: `whoami`
   - **Use Case**: Verify the username under which you are currently logged in.

7. **`mkdir`**: Creates a new directory.
   - **Example**: `mkdir new_folder`
   - **Use Case**: Create a directory named "new_folder" in the current location.

8. **`cat`**: Displays the content of a file.
   - **Example**: `cat file.txt`
   - **Use Case**: View the entire contents of "file.txt" in the terminal.

9. **`touch`**: Creates an empty file or updates the timestamp of an existing file.
   - **Example**: `touch newfile.txt`
   - **Use Case**: Create an empty file named "newfile.txt" or update its timestamp.

10. **`clear`**: Clears the terminal screen.
    - **Example**: `clear`
    - **Use Case**: Reset the terminal screen for a fresh workspace (repeated for emphasis).

11. **`echo`**: Prints text or variables to the terminal.
    - **Example**: `echo "Hello, World!"` or `echo $HOME`
    - **Use Case**: Display the text "Hello, World!" or show the current user's home directory path.

12. **`rmdir`**: Removes empty directories.
    - **Example**: `rmdir empty_folder`
    - **Use Case**: Delete a directory named "empty_folder" if it contains no files.

13. **`cp`**: Copies files or directories.
    - **Example**: `cp file.txt /home/user/backup/`
    - **Use Case**: Copy "file.txt" to the "backup" directory.

14. **`mv`**: Moves or renames files or directories.
    - **Example**: `mv oldname.txt newname.txt` or `mv /path/to/file /new/path/`
    - **Use Case**: Rename "oldname.txt" to "newname.txt" or move a file to a new location.

These examples illustrate common uses of each command in managing files, directories, and terminal operations in a Linux environment.