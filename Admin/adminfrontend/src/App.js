import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/Home";


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Home />

        </Switch>

      </Router>

    </div>
  )
}

export default App;
