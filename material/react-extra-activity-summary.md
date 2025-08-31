# Theory: React

- [Styling React Components](#styling-react-components)
- [Passing Children as Props](#passing-children-as-props)
- [Conditional Rendering in React](#conditional-rendering-in-react)
- [Links](#links)


---
### Styling React Components

Styling React components can be approached in several ways, each offering different benefits:

1. **CSS Stylesheets**: The traditional method of using `.css` files. You can import these stylesheets directly into your components.
   ```js
   import './App.css';
   ```

2. **CSS Modules**: These provide a way to scope CSS to a specific component, preventing styles from leaking into other parts of the application.
   ```js
   import styles from './App.module.css';
   ```

3. **Inline Styles**: Directly applying styles within the component using the `style` attribute. This method is useful for dynamic styling.
   ```js
   const style = { color: 'blue' };
   <div style={style}>Hello</div>
   ```

4. **Styled Components**: A popular library for writing CSS in JavaScript. It allows you to create component-level styles using tagged template literals.
   ```js
   import styled from 'styled-components';
   const Button = styled.button`
     background: blue;
     color: white;
   `;
   ```

5. **CSS-in-JS Libraries**: Besides Styled Components, there are other libraries like Emotion and JSS that enable writing CSS directly within JavaScript.

---
### Passing Children as Props

In React, the `children` prop is a special prop that allows you to pass components or elements between the opening and closing tags of a component. This is particularly useful for creating reusable and flexible components.

#### Example:

```js
const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};

// Usage
<Card>
  <h2>Title</h2>
  <p>This is a card content.</p>
</Card>
```

In this example, the `Card` component can wrap any content passed between its tags, making it highly reusable.

**Benefits:**

- **Flexibility**: Allows you to pass any type of content, including other components.
- **Reusability**: Makes components more reusable by decoupling the structure from the content.
- **Composition**: Encourages the composition of components, leading to cleaner and more maintainable code.

---
### Conditional Rendering in React

Conditional rendering in React is the process of displaying different UI elements based on certain conditions. It’s similar to the concept of conditions in regular JavaScript, where you might use `if`, `else`, or ternary operators to render different content.

#### Basic Conditional Rendering

The simplest way to implement conditional rendering is by using JavaScript’s conditional statements directly within your JSX.

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}
```

In this example, the `Greeting` component checks the value of `isLoggedIn` prop. If `isLoggedIn` is `true`, it renders a welcoming message. Otherwise, it prompts the user to sign up.


#### Using `switch` Statements

For more complex scenarios where you have multiple conditions to check, you might use a `switch` statement.

```jsx
function UserStatus(props) {
  switch (props.status) {
    case 'online':
      return <span>User is online</span>;
    case 'offline':
      return <span>User is offline</span>;
    case 'busy':
      return <span>User is busy</span>;
    default:
      return <span>Status unknown</span>;
  }
}
```



---
## Links

- [How to Style Your React Apps with CSS Like a Pro](https://www.freecodecamp.org/news/style-react-apps-with-css/)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Conditional Rendering in React](https://react.dev/learn/conditional-rendering)


<!-- 

## More on Conditional rendering

### **Rendering Null**

Sometimes, you might want to render nothing based on a condition. In React, you can return `null` to prevent any rendering.

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return <div className="warning">Warning!</div>;
}
```

When `warn` is `false`, the `WarningBanner` component doesn’t render anything. 

<!-- ### **Using Ternary Operators**

For more concise code, you can use the ternary operator. This is particularly useful for rendering short, simple conditional statements.

```jsx
function Greeting(props) {
  return (
    <div>
      {props.isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
    </div>
  );
}
``` 
-->



<!-- ### **Short-Circuit Evaluation with `&&`**

When you only want to render a component or an element based on a condition without needing an `else` clause, you can use the logical `&&` operator.

```jsx
function Notification(props) {
  return (
    <div>
      {props.hasNewMessages && <h2>You have new messages!</h2>}
    </div>
  );
}
```

In this example, the message is displayed only if `hasNewMessages` is `true`. -->

