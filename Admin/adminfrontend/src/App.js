import React from "react";
import "App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./components/login"
import createSubmissions from './pages/createSubmissions'
import viewSubmissions from "./pages/viewSubmissions";
import editSubmissions from "./pages/editSubmissions";
import viewRoles from "./pages/viewRoles";
import createPanel from "./pages/createPannel";
import viewPanels from "./pages/viewPanels";
import createResearchTopics from "./pages/addResearchTopics";
import viewResearchTopics from "./pages/viewResearchTopics";
import editTopics from "./pages/editResearchTopics";

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


          
          <Route path='/viewRoles' exact component = {viewRoles}/>
          <Route path='/createPanels' exact component = {createPanel}/>
          <Route path='/viewPanels' exact component = {viewPanels}/>

          <Route path='/createTopics' exact component = {createResearchTopics}/>
          <Route path='/getTopics' exact component = {viewResearchTopics}/>
          <Route path='/topics/edit/:id' exact component = {editTopics}/>


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
