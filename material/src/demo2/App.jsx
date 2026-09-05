import React, { useState } from "react";
import data from "./data";
import List from "./List";
import "./App.css";

function App() {
  const [people, setPeople] = useState(data);

  function handleClick() {
    setPeople(data);
  }

  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        <List people={people} />
        <button onClick={() => setPeople([])}>clear all</button>
        <button onClick={handleClick}>Set all</button>
        <button onClick={() => setPeople([data[0], data[1]])}>
          Set 2 items
        </button>
      </section>
    </main>
  );
}

export default App;
