import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Game from './Components/Game';
import ErrorReport from './Components/ErrorReport';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';




class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      thisAccount: 'Honghai',
      thisPassword: '123',
      isLoggedIn: false,
      failedLoggedIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const validInput = this.state.account === this.state.thisAccount && this.state.password === this.state.thisPassword;
    validInput ? this.setState({ isLoggedIn: true, failedLoggedIn: false }) : this.setState({ failedLoggedIn: true });
  }

  render() {
    const loginPage = (
      <div>
        
        <Box
            autoComplete="off"
          >
            <form onSubmit={() => { this.handleSubmit(); }}>
            <TextField placeholder='Enter your username' label="Account" variant="outlined" onChange={e => this.setState({ account: e.target.value })} />
            <TextField placeholder='Enter your password' label="Password" variant="outlined" onChange={e => this.setState({ password: e.target.value })} />
            <Button variant="contained" type='submit'>Submit!</Button>
            </form>
          </Box>
          
      </div>
    )
    if (!this.state.isLoggedIn && !this.state.failedLoggedIn) {
      return loginPage
    } else if (!this.state.isLoggedIn && this.state.failedLoggedIn) {
      return <Redirect to={'/error'} />
    } else return <Redirect to={'/game'} />
  }

}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Route exact path="/game"> <Game /> </Route>
      <Route exact path="/error"><ErrorReport /></Route>
      <Route exact path="/"><LoginForm /> </Route>
    </Switch>
  </Router>
);
