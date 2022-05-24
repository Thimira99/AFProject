import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './components/pages/Home/Home';
import Group from './components/pages/Group/Group';
import MainLogin from './components/mainLogin/mainLogin';
import Login from './components/login/login';

import Profile from "./components/Profile/profile";
import UpdateStudent from "./components/UpdateStudent/updateStudent";

import staffRegister from './components/Staff/staffRegister'
import staffHome from "./components/Staff/StaffHome/staffHome";
import viewSubmissions from "./components/pages/viewSubmissions";
import addSubmissions from "./components/pages/addSubmissions";
import Submissions from "./components/pages/uploadSubmissions";




function App() {

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path='/dashboard' component={Home} />
          <Route exact path='/group' component={Group} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/mainLogin' component={MainLogin} />

          <Route exact path='/profile' component={Profile} />
          <Route exact path='/update' component={UpdateStudent} />

        
           {/* Staff */}
           <Route exact path='/Staffdashboard' component={staffHome} />
           <Route exact path='/loginRegister' component={staffRegister} />
           

         

          <Route exact path='/mainLogin' component={MainLogin} />

         
          {/*submissions */}

          <Route exact path='/submissions' component={viewSubmissions} />
          <Route exact path='/addSubmissions' component={addSubmissions} />
          <Route exact path='/uploadSubmissions' component={Submissions} />
          
        </Switch>

      </Router>

    </div>
  )
}

export default App;
