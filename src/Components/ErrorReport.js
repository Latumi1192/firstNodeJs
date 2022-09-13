import React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';

function ErrorReport() {

    const errorPage = (<div>
        <div>Please check your Account and Password</div>
        <div>
            <button onClick={e => window.location.href = '/'}>Back</button>
        </div>
    </div>);

    return true ? errorPage : <Redirect to={'/'} />;

}

export default ErrorReport;