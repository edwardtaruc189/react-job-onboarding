import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Link, TextField } from '@material-ui/core';
import { isEmailValid } from 'utils/form';

function SignupForm({ onSubmit, classes, login, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const buttonText = login ? 'Login' : 'Sign Up';

  const handleSubmit = e => {
    e.preventDefault();
    const emailValid = isEmailValid(email),
      passwordValid = password;
    if (!emailValid) setEmailError('Email is not valid');
    if (!passwordValid) setPasswordError('Password is not valid');
    if (emailValid && passwordValid) {
      setEmailError('');
      setPasswordError('');
      onSubmit({ email, password });
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        className={classes.field}
        type="email"
        value={email}
        onChange={({ target: { value } }) => {
          setEmail(value);
        }}
        error={emailError !== ''}
        helperText={emailError}
        label="Email"
        fullWidth
        variant="outlined"
        required
      />
      <TextField
        className={classes.field}
        type="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        error={passwordError}
        helperText={passwordError}
        label="Password"
        fullWidth
        variant="outlined"
        required
      />
      <div className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={!email || !password}
        >
          {buttonText}
        </Button>
        {login && (
          <Link
            color="textSecondary"
            className={classes.forgotPassword}
            onClick={onForgotPassword}
          >
            Forgot Password?
          </Link>
        )}
      </div>
    </form>
  );
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func,
  login: PropTypes.bool
};

SignupForm.defaultProps = {
  login: false,
  onForgotPassword: () => {}
};

export default SignupForm;
