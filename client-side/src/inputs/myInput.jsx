import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import '../style/myInput.scss';

const MyInput = ({ label, type='text', value, onChange, size='medium',  icon: Icon,validation, ...rest }) => {
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
  }

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
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
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
  size: PropTypes.oneOf(['small', 'medium']),
  icon: PropTypes.elementType,
  validation: PropTypes.func,
};

export default MyInput;
