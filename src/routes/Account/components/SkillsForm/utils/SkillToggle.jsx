import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import experienceLevel from 'constants/experienceLevel';

const SkillToggle = ({ value, onChange, onClose }) => {
  return (
    <ButtonGroup variant="outlined">
      {experienceLevel.map(entry => (
        <Button
          color={entry === value ? 'primary' : 'default'}
          variant={entry === value ? 'contained' : 'outlined'}
          onClick={() => onChange(entry)}
        >
          {entry}
        </Button>
      ))}
      <Button onClick={onClose}>
        <Close />
      </Button>
    </ButtonGroup>
  );
};

SkillToggle.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SkillToggle;
