import React, { useState, useEffect } from "react";
import "../styles/currenciesStyle.css";

export default function Currencies({ rates }) {
  let min = 1;
  let counter = 0;

  for (const rate in rates) {
    rates[rate] = rates[rate].toFixed(4);
    rates[rate] = Number(rates[rate]);
  }

  let [state, setState] = useState(rates);

  function changeRates() {
    for (const rate in rates) {
      min % 2 === 0 ? (rates[rate] -= 0.0001) : (rates[rate] += 0.0001);
      rates[rate] = rates[rate].toFixed(4);
      rates[rate] = Number(rates[rate]);
      if (counter === 12) {
        min++;
        counter = 0;
      }
    }

    if (min === 5) {
      clearInterval(window.interval);
    }
    setState((state = rates)); // <--------- It shouldn't be done this way. It works in the console. Trying to find a solution...
  }

  useEffect(() => {
    window.interval = setInterval(() => {
      changeRates();
      counter++;
      console.log(state);
      console.log(min);
      console.log(counter);
    }, 1000);
  }, []);

  return (
    <div>
      <div className="currencies">
        <span className="currency EURUSD">
          <h4>EURUSD</h4>
          <p>EURO / U.S. DOLLAR</p>
          <div
            className="rates"
            style={
              min % 2 === 0 ? { background: "red" } : { background: "green" }
            }
          >
            {state.USD}
          </div>
        </span>
        <span className="currency EURAUD">
          <h4>EURAUD</h4>
          <p>EURO / AUSTRALIAN DOLLAR</p>
          <div
            className="rates"
            style={
              min % 2 === 0 ? { background: "red" } : { background: "green" }
            }
          >
            {state.AUD}
          </div>
        </span>
        <span className="currency EURCAD">
          <h4>EURCAD</h4>
          <p>EURO / CANADIAN DOLLAR </p>
          <div
            className="rates"
            style={
              min % 2 === 0 ? { background: "red" } : { background: "green" }
            }
          >
            {state.CAD}
          </div>
        </span>
        <span className="currency EURBGN">
          <h4>EURBGN</h4>
          <p>EURO / BULGARIAN LEV</p>
          <div
            className="rates"
            style={
              min % 2 === 0 ? { background: "red" } : { background: "green" }
            }
          >
            {state.BGN}
          </div>
        </span>
      </div>
    </div>
  );
}
