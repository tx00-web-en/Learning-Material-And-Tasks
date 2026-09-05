import { useState } from "react";

function App() {
  const [car, setCar] = useState({
    year: 2025,
    make: "Ford",
    model: "Mustang",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCar((c) => ({
      ...c,
      [name]: value, 
    }));
  }

  function submitForm(event) {
    event.preventDefault();
    console.log("Form submitted:", car);
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <p>
          Your favorite car is: {car.year} {car.make} {car.model}
        </p>
        <input
          type="number"
          name="year"
          value={car.year}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="make"
          value={car.make}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="model"
          value={car.model}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
