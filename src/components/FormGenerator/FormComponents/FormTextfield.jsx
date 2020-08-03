import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function FormTextField({
  label,
  password,
  input,
  meta: { touched, invalid, error },
  ...props
}) {
  return (
    <TextField
      variant="outlined"
      type={password ? 'password' : null}
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...props}
    />
  );
}

FormTextField.propTypes = {
  formTextField: PropTypes.object
};

FormTextField.defaultProps = {
  fullWidth: true
};

export default FormTextField;
