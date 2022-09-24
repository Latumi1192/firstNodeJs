import React from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'

//import { BrowserRouter as Redirect } from 'react-router-dom';

function ErrorReport() {

    const errorPage = (<div>
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Please check your Account and Password</strong>
        </Alert>
        <div>
            <Button variant="text" onClick={e => window.location.href = '/'}>Back</Button>
        </div>
    </div>);

    //  return login ? errorPage : <Redirect to={'/'} />;
    return errorPage;

}

export default ErrorReport;