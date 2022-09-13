import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Game from './Components/Game';
import ErrorReport from './Components/ErrorReport';
import LoginForm from './Components/LoginForm';

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Route exact path="/game"> <Game /> </Route>
      <Route exact path="/error"><ErrorReport/></Route>
      <Route exact path="/"><LoginForm /> </Route>
    </Switch>
  </Router>
);
