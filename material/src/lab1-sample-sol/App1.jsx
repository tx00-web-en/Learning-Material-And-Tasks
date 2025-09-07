import './Counter.css';
import { useState } from 'react';

const Counter = () => {

  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0)

  const toggleTheme = () => {
      theme == 'light'
        ? setTheme('dark')
        : setTheme('light')
  };

  return (
    <div className={`state ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={() => setTheme('dark')} >
        Dark</button>
      <button onClick={() => setTheme('light')}>
        Light</button>

      <button onClick={toggleTheme}>
        Toggle Theme</button>

      <h2>{`Your count: ${count}`}</h2>
      <button onClick={() => setCount(oldValue => oldValue + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(oldValue => oldValue - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;