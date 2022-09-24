import React from 'react';
import Button from '@mui/material/Button';


function Square(props) {
    return (
      <Button variant="outlined" sx={{ width: 20, height: 60}} className="square" onClick={props.onClick}>
        {props.value}
      </Button>
    );
  }

export default Square;