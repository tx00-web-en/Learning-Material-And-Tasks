import './Counter.css';
import { useState } from 'react';

const Counter = () => {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  // console.log(useState('light'))

  return (
    <div className={`state ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => 
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
      }>
        Toggle Theme
      </button>
      <hr />
      <h2>Count: {count}</h2>
      {/* <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button> */}
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
