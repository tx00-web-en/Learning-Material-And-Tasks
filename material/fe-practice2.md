# Activity: React Pair Programming ...

### About 

This pair programming session will be flexible and unstructured, without strict rules. 
- In this session, the roles will switch: the second member will code parts 3 and 4, push the changes to GitHub, and the first member will assist.

> Note that, when creating React components, it's recommended to focus on designing the user interface first, without worrying about styles. Once the functionality is in place, you can then add styles to the components.

----
### Setup

1. Clone the repo `react-practice` and give it a new name `fe-pp1-part2` using the following command:

    ```shell
    git clone https://github.com/tx00-resources-en/react-practice fe-pp1-part2
    ```

2. To remove the `.git` folder, cd into the cloned directory:
    ```shell
    cd fe-pp1-part2
    ```
    - **Windows Users:** Run the following command to remove the Git history: `Remove-Item -Recurse -Force .git`
    - **macOS/Linux Users:** Run the following command to remove the repository's Git history: `rm -rf .git`

3. Install packages and start the app using the following commands (in the `fe-pp1-part2` folder):

    ```shell
    npm install
    npm run dev
    ```

4. Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. Use the commit message: `Complete FE Pair Programming 1 Part 2`

----


### Part 3/4: `CreditCard`

Create a `CreditCard` component that displays a rectangle with the information coming from the props. 

The component should take 8 props:

- `type`: A string that can be `"Visa"` or `"Master Card"`
- `number`: A string that is the number of the credit card. For security reasons, you should only display the 4 last digits 😉
- `expirationMonth`: A number that represents the month, between 1 and 12
- `expirationYear`: A number that represents the year
- `bank`: A string that represents the name of the bank
- `owner`: A string that represents the name of the owner
- `bgColor`: A string for the background color of the card
- `color`: A string for the text color of the card

- Take your time to make the component look as close to the *expected output* as possible. You'll probably want to use flexbox.
- The images can be found in the `./src/images/` folder of the cloned repository.


**Example:**

```jsx
<CreditCard
  type="Visa"
  number="0123456789018875"
  expirationMonth={3}
  expirationYear={2021}
  bank="BNP"
  owner="Maxence Bouret"
  bgColor="#11aa99"
  color="white" 
/>
    
<CreditCard
  type="Master Card"
  number="0123456789010993"
  expirationMonth={3}
  expirationYear={2021}
  bank="N26"
  owner="Maxence Bouret"
  bgColor="#eeeeee"
  color="#222222"
/>
    
<CreditCard
  type="Visa"
  number="0123456789016982"
  expirationMonth={12}
  expirationYear={2019}
  bank="Name of the Bank"
  owner="Firstname Lastname"
  bgColor="#ddbb55"
  color="white" 
/>
```

**Expected Output:**

![image](https://user-images.githubusercontent.com/5306791/52975678-ac5fa000-33c6-11e9-8cbf-7d13a8a0f625.png)

- Consider:
  - [How to use images in React components](./fe-practice-summary.md#how-to-use-images-in-react-components)
  - [How to extract the last digits from a string](./fe-practice-summary.md#how-to-extract-the-last-digits-from-a-string)

----

### Part 4/4: `BoxColor`

- Create a `BoxColor` component that displays a rectangle with a background color based on props. For this, you will need to add inline styles ([documentation](./fe-practice-summary.md#understanding-inline-styles)).

The component should take 3 props:
  - `r`: A number between `0` and `255` representing the amount of red
  - `g`: A number between `0` and `255` representing the amount of green
  - `b`: A number between `0` and `255` representing the amount of blue

- Display the hex values of the color (e.g., `#ff0000` for red).

**Example:**

```jsx
<BoxColor r={255} g={0} b={0} />
<BoxColor r={128} g={255} b={0} />
```

**Expected Output:**

![image](https://user-images.githubusercontent.com/5306791/52957816-ec0c9480-3392-11e9-9e00-67094fa2b431.png)


----

### (Optional): `Greetings`

Create a `Greetings` component with 2 props:

- `lang`: A string that can have values: `"fi", "de"`, `"en"`, `"es"` or `"fr"`
- `children`: A text

The component should display a greeting text in the chosen language.

**Example:**

```jsx
<Greetings lang="de">Ludwig</Greetings>
<Greetings lang="fr">François</Greetings>
```

**Expected Output:**

![image](https://user-images.githubusercontent.com/5306791/52957158-57edfd80-3391-11e9-8726-93c1a3389016.png)


- Consider:
  - Using a [`switch`](./fe-practice-summary.md#1-using-the-switch-statement-in-javascript) statement to check for the input language.
  - When you nest content inside a JSX tag, the parent component will receive that content in a prop called [children](./fe-practice-summary.md#passing-jsx-as-children). For example, the `Greetings` component will receive a children prop set to *Ludwig*.





**Happy coding!** :rocket: :heart:


### Ref
[ironhack-labs](https://github.com/ironhack-labs/lab-react-training)
<!-- 
Complete list of github markdown emoji markup
https://gist.github.com/rxaviers/7360908 
-->