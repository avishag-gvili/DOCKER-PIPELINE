import React from 'react';

import './MyButton.scss';

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';


const MyButton = ({className, label, onClick, size, disabled = false})=>{
    return(
        <Button 
        className={['myButton', `myButton-${className}`].join(' ')}
        onClick={onClick}
        size={size}
        disabled={disabled}
        >
        {label}
        </Button>
    );
};

MyButton.propTypes = {
    
    className: PropTypes.string,
    
    //How large should the button be?
    size: PropTypes.oneOf(['small', 'medium','large']).isRequired,
    
    //Button contents
    label: PropTypes.string.isRequired,
    
    //Click handler
    onClick: PropTypes.func.isRequired,

    //Optional is disabled
    disabled: PropTypes.bool,
  };

export default MyButton;