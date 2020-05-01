import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  async function callApi() {
    fetch("/api/hello")
      .then((res) => console.log("Success!"))
      .catch((err) => console.log("failed!"));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h3 onClick={() => callApi()}> Click to call backend</h3>
    </div>
  );
}

export default App;
