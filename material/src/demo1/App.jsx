import React from "react";
import Review from "./Review";

import "./App.css";

function App() {
  return (
    <main>
      <section className="container">
        <div className="title">
          <h2>our reviews</h2>
          <div className="underline"></div>
        </div>
        <Review />
        <Review />
      </section>
    </main>
  );
}

export default App;
