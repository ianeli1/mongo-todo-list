import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { List } from "./components/list";
import { Create } from "./components/create";

function App() {
  return (
    <div className="App">
      <Create />
      <List />
    </div>
  );
}

export default App;
