import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./components/login"

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/login' exact component={Login} />

          <Redirect to='/login'/>
        </Switch>

      </Router>

    </div>
  )
}

export default App;
