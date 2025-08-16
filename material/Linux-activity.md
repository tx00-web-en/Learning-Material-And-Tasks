# Activity: Linux Commands

This is a quick overview of `some` Linux commands and basic file system navigation. Windows users will use `Git Bash`, a lightweight Linux emulator, while Mac and Linux users can simply open the `Terminal`. Keep in mind that some commands may work in Windows PowerShell, but not all of them.

> Before starting this activity, `ensure` you have a folder named `"Dev"` in your `Documents directory`. **Inside the "Dev" folder**, create another folder called `"week1"` *if it doesn't already exist*.

----

## Part 1 

Open the terminal inside the `week1` folder.

1. **Create Directories:**
   - Create a directory named `linux-lab1` using the `mkdir` command:
     ```
     mkdir linux-lab1
     ```
   - Confirm that the `linux-lab1` directory is created by listing the contents of the current directory:
     ```
     ls
     ```

2. **Create Files in the `linux-lab1` Directory:**
   - Create two directories named `linux-exercises` and `js-exercises`:
     ```
     mkdir linux-exercises js-exercises
     ```
   - Confirm that the directories are created:
     ```
     ls
     ```
   - Navigate to the `linux-exercises` directory:
     ```
     cd linux-exercises
     ```
   - Create three files named `file.txt`, `file2.html`, and `file3` using the `touch` command:
     ```
     touch file.txt file2.html file3
     ```
   - Confirm that the files are created:
     ```
     ls
     ```

3. **Clear the Terminal:**
   - Use the `clear` command to clear the terminal screen:
     ```
     clear
     ```

4. **Add Text to Files:**
   - Use the `echo` command to add dummy text to `file.txt`, `file2.html`, and `file3`:
     ```
     echo "This is file.txt" > file.txt
     echo "This is file2.html" > file2.html
     echo "This is file3" > file3
     ```

5. **Read the Contents of Files:**
   - Use the `cat` command to read the contents of `file.txt`, `file2.html`, and `file3`:
     ```
     cat file.txt
     cat file2.html
     cat file3
     ```

6. **Creating and Deleting Directories:**
    - To create a directory, use the `mkdir` command followed by the directory name.
    - To delete a directory, use the `rmdir` command followed by the directory name.
      ```
      mkdir test destination_directory new_location
      rmdir test
      ```

7. **Copying and Moving Files:**
    - To copy files, use the `cp` command followed by the source file and destination directory.
    - To move files, use the `mv` command followed by the source file and destination directory.
      ```
      cp file.txt destination_directory
      mv file.txt new_location
      ```

----
##  Part 2

Open the terminal inside the `week1` folder.

1. **Navigate to Your Home Directory:**
   - Use the `cd` command to navigate to your home directory:
     ```
     cd ~
     ```

2. **Return to the Last Used Directory:**
   - To navigate back to the previous directory, use the `cd` command with the `-` option:
     ```
     cd -
     ```
3. **List Directory Contents:**
   - Use the `ls` command to list the contents of the  directory:
     ```
     ls
     ```

4. **Print Working Directory:**
   - Use the `pwd` command to print the current working directory:
     ```
     pwd
     ```

5. **Create a New Directory:**
   - Use the `mkdir` command to create a new directory named "linux-lab2":
     ```
     mkdir linux-lab2
     ```

6. **Change Directory:**
   - Use the `cd` command to change into the newly created "linux-lab2" directory:
     ```
     cd linux-lab2
     ```

7. **Verify Current Directory:**
   - Once again, use the `pwd` command to verify that you are in the correct directory:
     ```
     pwd
     ```

8. **Create Files:**
   - Create a few sample text files using the `echo` command:
     ```
     echo "This is file1 content." > file1.txt
     echo "This is file2 content." > file2.txt
     echo "This is file3 content." > file3.txt
     ```

9. **List Contents:**
   - Use the `ls` command to list the contents of the current directory and verify that the new files were created:
     ```
     ls
     ```

10. **Display File Contents:**
    - Use the `cat` command to display the contents of one of the newly created files (e.g., "file1.txt"):
      ```
      cat file1.txt
      ```

11. **Clear the Terminal Screen:**
    - Use the `clear` command to clear the terminal screen:
      ```
      clear
      ```

12. **Remove Files:**
    - Use the `rm` command to remove one of the files (e.g., "file2.txt"):
      ```
      rm file2.txt
      ```

13. **List Contents Again:**
    - Use the `ls` command to verify that the specified file has been removed:
      ```
      ls
      ```

14. **Display Current Username:**
    - Use the `whoami` command to display the current username:
      ```
      whoami
      ```

15. **Navigate Back to Home Directory:**
    - Finally, navigate back to your home directory using the `cd` command:
      ```
      cd ~
      ```



