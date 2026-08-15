# Setting up your computer

> Note: Even if you have some of the software already installed, it is still necessary to read through all of the instructions. You may need to upgrade to a new software version, or change some configurations.

Install all of these:

1. Git / Git Bash
2. Node.JS
3. Visual Studio Code
4. Google Chrome (or/and Firefox)
5. Homebrew (For Mac Only)
6. Configuring Git 
7. Configuring GitHub


---
## Git

### Windows

You can easily install `Git` in Windows by using the installer found [here](https://git-scm.com/download/win).

Once you've downloaded one of the "Git for Windows Setup" distributions (either
32-bit or more likely 64-bit) you can launch the installer and accept all the
defaults.

### Mac

Mac comes with some tools by default. Git is one that you want to make sure is up
to date so you can run the following in your terminal.

```shell
xcode-select --install
```


---
## NodeJS

Node.JS is Javascript Runtime Environment for running JavaScript files directly on a computer. JavaScript is built into every web browser, but if you want to run JavaScript directly without a browser, you need to install Node.JS.


### Windows

Please download the installation file found [here](https://nodejs.org/en/download/). The installer will walk you through the rest.

> To [upgrade npm] use ` npm install -g npm@latest ` 

### MacOS

Installing Node.js on macOS follows almost the same procedure as Windows. All you have to do is to download the installation file found [here](https://nodejs.org/en/download/). The installer will walk you through the rest.

NPM configuration:

1. Older MacOS (bash terminal)

```bash
            mkdir ~/.npm-packages
            npm config set prefix ~/.npm-packages
            echo NPM_PACKAGES="${HOME}/.npm-packages" >> ${HOME}/.bashrc
            echo prefix=${HOME}/.npm-packages >> ${HOME}/.npmrc
            echo NODE_PATH=\"\$NPM_PACKAGES/lib/node_modules:\$NODE_PATH\" >> ${HOME}/.bashrc
            echo PATH=\"\$NPM_PACKAGES/bin:\$PATH\" >> ${HOME}/.bashrc
            echo source "~/.bashrc" >> ${HOME}/.bash_profile
            source ~/.bashrc
```

2. Newer MacOS (zsh terminal)

```bash
            mkdir ~/.npm-packages
            npm config set prefix ~/.npm-packages
            echo NPM_PACKAGES="${HOME}/.npm-packages" >> ${HOME}/.zshrc
            echo prefix=${HOME}/.npm-packages >> ${HOME}/.npmrc
            echo NODE_PATH=\"\$NPM_PACKAGES/lib/node_modules:\$NODE_PATH\" >> ${HOME}/.zshrc
            echo PATH=\"\$NPM_PACKAGES/bin:\$PATH\" >> ${HOME}/.zshrc
            echo source "~/.zshrc" >> ${HOME}/.zsh_profile
            source ~/.zshrc
```

> When installing Node, be sure not to select the red-highlighted option as shown in the screenshot below:

![Node](./img/node.png)


---
## Visual Studio Code

Our code editor of choice in this course is Microsoft's Visual Studio Code.

This is an open source cross-platform code editor built with Javascript.
Don't confuse this with Microsoft's other product _Visual Studio_ which is designed to only program for the Windows platform. Visual Studio Code (or VSCode) is a multi-language editor that can handle almost any programming language for any platform.

Go to website for [Visual Studio Code](https://code.visualstudio.com/), then download and install VS Code.

### Windows

Windows users should run the downloaded installer application, and follow the instructions.

Make sure you download the Stable release. When installing VSCode, ensure you add VSCode to the context menu as demonstrated in the screenshot below:

![VSCode](./img/vscode.png)

### macOS

Download the DMG (Disk Image) file for VSCode and open it up. This will mount as virtual 'disk' on your desktop. Drag the VSCode icon to your Applications folder and then eject the virtual disk on the Desktop by dragging it to the Trash.

In macOS, the command line utility `code` isn't installed by default when you install VSCode.

Open the VS Code editor, open the Command Palette (`Cmd+Shift+P`) and type `shell command` to find the `Shell Command: Install 'code' command in PATH`
command.

This will now allow you to easily open files in VS Code from the terminal using the `code` command followed by a file or directory.


### Ubuntu

To install VSCode in Ubuntu Linux, download the 64-bit .deb file to your Downloads folder, then open that folder in your File Manager and double click on it to install it.

---
## Installing Google Chrome

To install Google Chrome, download the necessary files and follow the instructions on the [Google Chrome website](https://www.google.com/chrome/browser/desktop/index.html).

### macOS

macOS users should just download the Google Chrome DMG (Disk image) file and double click on it to mount it as a drive. Then drag the Chrome icon to your Applications Folder, then you can eject the Google Chrome Disk Image by dragging it to the Trash.

### Windows

Windows users should run the downloaded Chrome installer application, and follow the instructions.

### Ubuntu

Ubuntu users should download the .deb version of Google Chrome and double click on it from the Downloads folder in the file manager.

---
## Homebrew (For Mac Only)

Homebrew is a piece of software for macOS that lets you install extra unix
software on your Mac.

Head to the [homebrew](http://brew.sh) website and follow the instructions on
the main page.

You will see instructions to run a command like this, so open a Terminal and run this:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After some output it should print out that homebrew is installed successfully.

You can always check homebrew for possible problems by typing this:

```shell
brew doctor
```

---
## Configuring git

Once you have installed git, configure the information that gets logged for each
of your commits by updating the default (global) credentials that git uses. (You
could overwrite these credentials temporarily per local repo. While that
shouldn't be necessary, it is helpful to know that it is an option.) You will also want to set the default branch to `main`.

In your terminal, run

```shell
git config --global user.name "Your Name"
git config --global user.email "Your Email"
git config --global init.defaultBranch main
```

Check that your name and email have been set up correctly by using the following commands:

```shell
git config user.name
git config user.email
```

You should see your name and email address returned. Repeat this step if there
are any errors.

## Configuring GitHub

GitHub provides a mechanism to share code with other
developers. Because of the nature of code, there needs to be a way to
authenticate to make sure that someone is authorized to fetch or contribute new
code.

<!-- Thankfully, git handles this authentication flow automatically. But for GitHub,
you can't use your GitHub account password. Instead, you can use a Personal
Access Token (PAT) or an SSH key as a password to authenticate to Github and
save it in a password manager of sorts so you don't have to use the token with
every command that requires authentication. -->


<!--  -->
[upgrade npm]:https://docs.npmjs.com/try-the-latest-stable-version-of-npm


<!-- 

## Links:

- [git-win](https://git-scm.com/download/win)
- [node](https://nodejs.org/en/download/)
- [vs-code](https://code.visualstudio.com/)
- [chrome-dl](https://www.google.com/chrome/browser/desktop/index.html)
- [homebrew](http://brew.sh)

- [PAT](https://github.com/settings/tokens)
- [SSH article](https://hackmd.io/@AgDXdHgSSPKsJIhCxlaTuA/BJtNu88fF) 

-->