# Activity: React Pair Programming

### About 

**This** pair programming session will be flexible and unstructured, without strict rules. 
- In the first coding session, one member will code parts 1 and 2 and push the changes to GitHub, while the other member provides assistance. 
- In the second session, the roles will switch: the second member will code parts 3 and 4, push the changes to GitHub, and the first member will assist.

> Note that, when creating React components, it's recommended to focus on designing the user interface first, without worrying about styles. Once the functionality is in place, you can then add styles to the components.

----
### Setup

1. Clone the repo `react-practice` and give it a new name `fe-pp1-part1` using the following command:

    ```shell
    git clone https://github.com/tx00-resources-en/react-practice fe-pp1-part1
    ```

2. To remove the `.git` folder, cd into the cloned directory:
    ```shell
    cd fe-pp1-part1
    ```    
    - **Windows Users:** Run the following command to remove the Git history: `Remove-Item -Recurse -Force .git`
    - **macOS/Linux Users:** Run the following command to remove the repository's Git history: `rm -rf .git`

3. Install packages and start the app using the following commands (in the `fe-pp1-part1` folder):

    ```shell
    npm install
    npm run dev
    ```

4. Upon completion, follow the steps in this [guideline](push-to-github.md) to push your code to GitHub. Use the commit message: `Complete FE Pair Programming 1 Part 1`

----

### Part 1/4: `IdCard`

Create and render an `IdCard` component with 6 props:

- `lastName`: A string
- `firstName`: A string
- `gender`: A string, `'male'` or `'female'`
- `height`: A number
- `birth`: A date
- `picture`: A string

**Example:**

```jsx
<IdCard
  lastName='Doe'
  firstName='John'
  gender='male'
  height={176}
  birth={new Date("1992-07-14")}
  picture="https://randomuser.me/api/portraits/men/44.jpg"
/>

<IdCard
  lastName='Delores '
  firstName='Obrien'
  gender='female'
  height={174}
  birth={new Date("1988-05-11")}
  picture="https://randomuser.me/api/portraits/women/44.jpg"
/>
```

**Expected Output:**

![image](https://user-images.githubusercontent.com/5306791/52976030-22b0d200-33c8-11e9-91fe-e3ce0fa14078.png)

 
 > In this activity, when passing a date object as a prop from parent to child components (e.g., `birth={new Date('1988-05-11')}`), ensure you convert it to a string within the child component. For example, instead of directly accessing `props.birth` as a Date object, convert it to a string using methods like `toDateString()` (e.g., `props.birth.toDateString()`).
 

----

### Part 2/4: `Random`

Create a `Random` component with 2 props:

- `min`: A number
- `max`: A number

The component should display a random integer in the range between the `min` and the `max` number.

**Example:**

```jsx
<Random min={1} max={6}/>
<Random min={1} max={100}/>
```

**Expected Output:**

![image](https://user-images.githubusercontent.com/5306791/52957202-718f4500-3391-11e9-9b45-d1172067e877.png)

> Consider using [Math.random()](./fe-practice-summary.md#2-generate-random-numbers-within-a-specified-range-in-javascript) and [`Math.floor()`](./fe-practice-summary.md#2-generate-random-numbers-within-a-specified-range-in-javascript) to generate random numbers within a specified range in JavaScript.


**Happy coding!** :rocket: :heart:


### Ref
[ironhack-labs](https://github.com/ironhack-labs/lab-react-training)
<!-- 
Complete list of github markdown emoji markup
https://gist.github.com/rxaviers/7360908 
-->