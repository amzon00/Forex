import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Currencies from "./components/Currencies";

function App() {
  const [state, setState] = useState("");

  useEffect(() => {
    fetch("currencies.json")
      .then((res) => res.json())
      .then((res) => {
        setState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      {state !== "" ? <Currencies rates={state.rates} /> : undefined}
    </div>
  );
}

export default App;
