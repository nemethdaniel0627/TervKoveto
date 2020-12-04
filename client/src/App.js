import React from 'react';
import Customers from './components/Customers';
import About from "./components/About";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Tervek from "./components/Tervek";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/main.css";
import "./css/loading.css";
import "./css/popup.css";


function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/customer" component={Customers} />
        <Route path="/about" component={About} />
        <Route path="/files/:fileID" component={Tervek} />
      </Switch>

    </Router>
  );
}

export default App;
