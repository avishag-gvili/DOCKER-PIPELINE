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
    /**
     * Is this the principal call to action on the page?
     */
    className: PropTypes.string,
    /**
    /**
     * How large should the button be?
     */
    size: PropTypes.oneOf(['small', 'medium','large']).isRequired,
    /**
     * Button contents
     */
    label: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    onClick: PropTypes.func,

    // OPtional is disabled
    disabled: PropTypes.bool,
  };

export default MyButton;