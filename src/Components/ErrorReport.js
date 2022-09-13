import React from 'react';
import {BrowserRouter as Redirect} from 'react-router-dom';

function ErrorReport(){
    if(true){
    return (
      <div>
        <div>Please check your Account and Password</div>
        <div>
          <button onClick={e => window.location.href = '/'}>Back</button>
        </div>
      </div>
    )} else return <Redirect to={'/'} />
  }

  export default ErrorReport;