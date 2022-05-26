import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./components/login"
import createSubmissions from './pages/createSubmissions'
import viewSubmissions from "./pages/viewSubmissions";
import editSubmissions from "./pages/editSubmissions";

import ViewMarkings from "./pages/ViewMarkings";
import AddMarking from "./pages/AddMarking";
import EditMarking from "./pages/EditMarking";

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/createSubmission' exact component = {createSubmissions}/>
          <Route path='/viewSubmissions' exact component = {viewSubmissions}/>
          <Route path='/edit/submissions/:id' exact component = {editSubmissions}/>
          <Route path='/viewMarkings' exact component = {ViewMarkings}/>
          <Route path='/addMarking' exact component = {AddMarking}/>
          <Route path='/edit/markings/:id' exact component = {EditMarking}/>
          <Redirect to='/login'/>
        </Switch>

      </Router>

    </div>
  )
}

export default App;
