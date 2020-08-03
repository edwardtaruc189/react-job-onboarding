import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  Switch,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  formRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    textAlign: 'end',
    width: '37.5%',
    marginRight: '16px'
  }
});

const FormSwitch = ({
  label,
  input: { name, onChange, value, ...inputProps },
  meta: { touched, invalid },
  labelPlacement,
  color,
  evaluate,
  ...props
}) => {
  const classes = useStyles();
  const validatedValue = evaluate(name, value);

  return (
    <FormControl
      className={classes.formRow}
      fullWidth
      error={touched && invalid}
    >
      <Typography className={classes.description} variant="body1">
        {label}
      </Typography>
      <FormControlLabel
        htmlFor={name}
        label={validatedValue ? 'On' : 'Off'}
        control={
          <Switch
            name={name}
            checked={validatedValue || false}
            inputProps={inputProps}
            onChange={onChange}
          />
        }
        color={color}
        labelPlacement={labelPlacement}
        {...props}
      />
    </FormControl>
  );
};

export default FormSwitch;

FormSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool
  }).isRequired,
  color: PropTypes.string,
  labelPlacement: PropTypes.string,
  /** evaluate(name, value) => validated value | Takes the name and value to compute and return a new values */
  evaluate: PropTypes.func
};

FormSwitch.defaultProps = {
  color: 'Primary',
  labelPlacement: 'end',
  evaluate: (_, value) => value
};
