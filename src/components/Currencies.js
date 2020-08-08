import React, { useState, useEffect } from "react";
import "../styles/currenciesStyle.css";

export default function Currencies({ rates }) {
  let min = 1;
  let counter = 0;

  // Change background color of the rates
  function changeBackground() {
    let rateBackground = document.getElementsByClassName("rates");
    Array.from(rateBackground).forEach((el) => {
      min % 2 !== 0
        ? el.setAttribute("style", "background-color:	#37a08b")
        : el.setAttribute("style", "background-color: #e85456");
    });
  }

  for (const rate in rates) {
    rates[rate] = parseFloat(rates[rate].toFixed(4));
  }

  let [, setState] = useState(rates);

  // Change rates depending on the minute
  function changeRates() {
    for (const rate in rates) {
      min % 2 === 0 ? (rates[rate] -= 0.0001) : (rates[rate] += 0.0001);
      rates[rate] = parseFloat(rates[rate].toFixed(4));
      if (counter === 12) {
        min++;
        counter = 0;
      }
    }

    if (min === 5) {
      clearInterval(window.interval);
    }
    setState({ rates });
    changeBackground();
  }

  useEffect(() => {
    window.interval = setInterval(() => {
      changeRates();
      counter++;
    }, 5000);
  }, []);

  return (
    <div>
      <div className="currencies">
        <span className="currency EURUSD">
          <h4>EURUSD</h4>
          <p>EURO / U.S. DOLLAR</p>
          <div className="rates">{rates.USD}</div>
        </span>
        <span className="currency EURAUD">
          <h4>EURAUD</h4>
          <p>EURO / AUSTRALIAN DOLLAR</p>
          <div className="rates">{rates.AUD}</div>
        </span>
        <span className="currency EURCAD">
          <h4>EURCAD</h4>
          <p>EURO / CANADIAN DOLLAR </p>
          <div className="rates">{rates.CAD}</div>
        </span>
        <span className="currency EURBGN">
          <h4>EURBGN</h4>
          <p>EURO / BULGARIAN LEV</p>
          <div className="rates">{rates.BGN}</div>
        </span>
      </div>
    </div>
  );
}
