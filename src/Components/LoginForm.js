import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
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


    

    render(){
        const loginPage = (
            <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          ><div>
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
        </Box>)
        if (!this.state.isLoggedIn && !this.state.failedLoggedIn) {
            return loginPage
        } else if (!this.state.isLoggedIn && this.state.failedLoggedIn) {
            return <Redirect to={'/error'} />
        } else return <Redirect to={'/game'} />
    }

}

export default LoginForm;