import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
  root: { marginBottom: 20 },
  fullWidth: { width: '100%' }
});

function FormSelect({
  label,
  input,
  meta: { touched, invalid },
  options,
  defaultOption,
  fullWidth,
  ...props
}) {
  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabel = useRef(null);
  const classes = useStyles();

  useEffect(() => setLabelWidth(inputLabel.current.offsetWidth), []);

  return (
    <FormControl
      className={classNames(classes.root, { [classes.fullWidth]: fullWidth })}
      variant="outlined"
      error={touched && invalid}
    >
      <InputLabel ref={inputLabel} htmlFor={input.name}>
        {label}
      </InputLabel>
      <Select
        id={input.name}
        labelWidth={labelWidth}
        displayEmpty
        {...input}
        input={<OutlinedInput />}
        {...props}
      >
        {defaultOption && (
          <MenuItem value="">
            <em>{defaultOption}</em>
          </MenuItem>
        )}
        {options &&
          options.map(({ value, label }) => (
            <MenuItem key={`menu-item-${label}`} value={value}>
              {label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

FormSelect.propTypes = {
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  meta: PropTypes.shape({ touched: PropTypes.bool, invalid: PropTypes.bool })
};

FormSelect.defaultProps = {
  defaultOption: 'None',
  fullWidth: true
};

export default FormSelect;
