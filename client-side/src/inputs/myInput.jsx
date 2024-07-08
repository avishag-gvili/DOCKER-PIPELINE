import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Person';
import '../style/myInput.scss';

const MyInput = ({ label, type, value, onChange, size, startIcon, validation, ...rest }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let error = false;
  let helperText = '';

  if (validation && typeof validation === 'function') {
    const validationResult = validation(value);
    if (validationResult && validationResult.error) {
      error = true;
      helperText = validationResult.helperText || 'Invalid input';
    }
  }//עד כאן זה ולידציה לא קשור אלייך

  return (
    <div className='my-input'>
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={handleChange}
        size={size}
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment: startIcon && <LockIcon />,
          ...rest.InputProps,
        }}
        {...rest}
      />
    </div>
  );
};

MyInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.bool,
  validation: PropTypes.func,
};

export default MyInput;
