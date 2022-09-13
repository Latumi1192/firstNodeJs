import React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';


function LoginForm ()  {
//   constructor(props) {
//     super(props);
//     this.state = {
//       account: '',
//       password: '',
//       thisAccount: 'Honghai',
//       thisPassword: '123',
//       isLoggedIn: false,
//       failedLoggedIn: false
//     };

//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

  const handleSubmit = () => {
    if (this.state.account === this.state.thisAccount && this.state.password === this.state.thisPassword) {
      this.setState({
        isLoggedIn: true,
        failedLoggedIn: false
      });
    } else {
      this.setState({ failedLoggedIn: true });
    }
  }

  
    if (!this.state.isLoggedIn && !this.state.failedLoggedIn) {
      return (
        <div>
          <form onSubmit={() => { this.handleSubmit(); }}>
            <div>
              <input placeholder='Account' onChange={e => this.setState({ account: e.target.value })}></input>
            </div>
            <div>
              <input placeholder='Password' onChange={e => this.setState({ password: e.target.value })}></input>
            </div>
            <div>
              <button type='submit'>Submit!</button>
            </div>
          </form>
        </div>
      )
    } else if (!this.state.isLoggedIn && this.state.failedLoggedIn) {
      return <Redirect to={'/error'} />
    } else return <Redirect to={'/game'} />
  
}

export default LoginForm;