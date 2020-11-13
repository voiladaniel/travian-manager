import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {MyLayout} from'./Layout/MyLayout.js'
import { PrivateRoute } from './Layout/PrivateRoute.js'
import { Home } from './Pages/Home.js'
import { Defense } from './Pages/Defense.js'
import { EditDefenseTemplate } from './Pages/Defense/EditDefenseTemplate.js'
import { EditAttackPlan} from './Pages/Attack/EditAttackPlan.js'
import { Attack } from './Pages/Attack.js'
import { Accounts } from './Pages/Accounts.js'
import { Login } from './Pages/Login.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment'

function App() {

  try{
    if(moment(localStorage.getItem('expireDate')).isBefore(moment())){
      localStorage.clear();
    }
  }
  catch{
      localStorage.clear();
  }
  
  return (
      <Router>
        <MyLayout>
          <Switch>
            <PrivateRoute exact path={'/Home'} component={ Home }/>
            <PrivateRoute exact path={'/Defense'} component={ Defense }/>
            <PrivateRoute exact path={'/Attack'} component={ Attack }/>
            <PrivateRoute exact path={'/Accounts'} component={ Accounts }/>
            <PrivateRoute exact path="/Defense/:id" component={ EditDefenseTemplate }/>
            <PrivateRoute exact path="/Attack/:id" component={ EditAttackPlan }/>
            <Route path={'/login'} component={ Login } />
            <PrivateRoute path={'*'} component={ Home } />
          </Switch>
        </MyLayout>
      </Router>
  );
}

export default App;
