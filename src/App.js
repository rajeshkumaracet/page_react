import React, { Component } from "react";
import Header from "./components/Header/Header";
import User from "./components/Users/User";
import "./App.scss";

export class App extends Component {
  render() {
    return (
      <>
        <Header />
        <User />
      </>
    );
  }
}

export default App;
