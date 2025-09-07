import "./Counter.css";
import { useState } from "react";

const Counter = () => {
  const [theme, setTheme] = useState("light");
  const handleClick = () => setTheme("dark");
  const handleClick1 = () => setTheme("light");
  const [count, setCount] = useState(0);
  const incrementHandler = () => setCount((prevCount) => prevCount + 1);
  const decrementHandler = () => setCount((prevCount) => prevCount - 1);
  const toggleThemeHandler = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`state ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={handleClick}> Dark</button>
      <button onClick={handleClick1}>Light</button>
      <button onClick={toggleThemeHandler}>Toggle Theme</button>
      <div className={`count ${count}`}></div>
      <h2> {count} </h2>
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
    </div>
  );
};

export default Counter;
