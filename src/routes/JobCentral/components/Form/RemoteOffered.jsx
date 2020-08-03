import React from 'react';
import {
  ListItem,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  radioGroup: {
    flexDirection: 'row'
  },
  label: {
    textAlign: 'end'
  }
});

const RemoteOffered = ({ label, input: { value, onChange }, ...props }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemText className={classes.label} component="legend">
        {label}
      </ListItemText>
      <RadioGroup
        className={classes.radioGroup}
        value={value}
        aria-label={label}
        onChange={e => onChange(e.target.value)}
        {...props}
      >
        {['Yes', 'No'].map(choice => (
          <FormControlLabel
            key={`radio-${choice}`}
            control={<Radio />}
            value={choice}
            label={choice}
            labelPlacement="start"
          />
        ))}
      </RadioGroup>
    </ListItem>
  );
};

export default RemoteOffered;
