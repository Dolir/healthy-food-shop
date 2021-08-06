import React from "react";
import Home from "./components/HomePage/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
