import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  Button,
  Divider,
  Link
} from '@material-ui/core';
import BackgroundPaper from 'components/BackgroundPaper';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RecoverCredentialsPage = ({ classes, recoverPassword, onCancel }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    if (!emailRegex.test(email)) setError(true);
    else {
      setError(false);
      recoverPassword(email);
      setEmail('');
      onCancel();
    }
  };

  return (
    <BackgroundPaper className={classes.root}>
      <Typography variant="h3" className={classes.title} align="center">
        Recover Your Password
      </Typography>
      <Divider />
      <Typography
        variant="body1"
        align="center"
        className={classes.description}
      >
        Tell us your email address and we'll get you signed in.
      </Typography>
      <form className={classes.fieldContainer} onSubmit={onSubmit}>
        <TextField
          className={classes.field}
          type="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          error={error}
          helperText={error ? 'Invalid Email' : ''}
          label="Email"
          fullWidth
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!email}
        >
          Reset Password
        </Button>
        <Link color="textSecondary" className={classes.link} onClick={onCancel}>
          Return to Login
        </Link>
      </form>
    </BackgroundPaper>
  );
};

RecoverCredentialsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  recoverPassword: PropTypes.func.isRequired
};

export default RecoverCredentialsPage;
