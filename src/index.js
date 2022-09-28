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
      signupaccount:'',
      signuppassword:'',
      // thisAccount: 'Honghai',
      // thisPassword: '123',
      accountArray:[{account:'Honghai',password:'123'}],
      isLoggedIn: false,
      failedLoggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin() {
    let signuped = false;
    for(let i = 0; i<this.state.accountArray.length; i++){
      if(this.state.accountArray[i].account === this.state.account && this.state.accountArray[i].password === this.state.password) signuped = true;
    }
    
    //const validInput = this.state.account === this.state.thisAccount && this.state.password === this.state.thisPassword;
    signuped ? this.setState({ isLoggedIn: true, failedLoggedIn: false }) : this.setState({ failedLoggedIn: true });
  }

  handleSignup(){
    const newAcc = {account:this.state.signupaccount, password:this.state.signuppassword};
    this.setState({signupaccount:'',signuppassword:''});
    this.state.accountArray.push(newAcc);
    console.log(newAcc)
    console.log(this.state.accountArray)
  }



  render() {
    const loginPage = (
      <div>
        <div>
          <Box
            autoComplete="off"
          >
            <form onSubmit={() => { this.handleLogin(); }}>
              <TextField placeholder='Enter your username' label="Account" variant="outlined" onChange={e => this.setState({ account: e.target.value })} />
              <TextField placeholder='Enter your password' label="Password" variant="outlined" onChange={e => this.setState({ password: e.target.value })} />
              <Button variant="contained" type='submit'>Login!</Button>
            </form>
          </Box>
        </div>
        <div>
          <Box
            autoComplete="off"
          >
            <form onSubmit={() => { this.handleSignup(); }}>
              <TextField placeholder='Enter your username' label="Account" variant="outlined" onChange={e => this.setState({ signupaccount: e.target.value })} />
              <TextField placeholder='Enter your password' label="Password" variant="outlined" onChange={e => this.setState({ signuppassword: e.target.value })} />
              <Button variant="contained" type='submit'>Signup!</Button>
            </form>
          </Box>
        </div>
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
