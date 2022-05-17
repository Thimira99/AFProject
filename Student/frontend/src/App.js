import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './components/pages/Home/Home';
import Group from './components/pages/Group/Group';
import MainLogin from './components/mainLogin/mainLogin';
import Login from './components/login/login';


function App() {

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path='/dashboard' component={Home} />
          <Route exact path='/group' component={Group} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/mainLogin' component={MainLogin} />
          <Redirect from='/' to='/mainLogin' />

          <Route exact path='/mainLogin' component={MainLogin} />
        </Switch>

      </Router>

    </div>
  )
}

export default App;
