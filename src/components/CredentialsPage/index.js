import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GoogleButton from 'react-google-button';
import { Typography, Link, Divider } from '@material-ui/core';
import BackgroundPaper from 'components/BackgroundPaper';
import RecoverCredentialsPage from 'components/RecoverCredentialsPage';
import { LOGIN_PATH, SIGNUP_PATH } from 'constants/paths';
import CredentialsForm from './CredentialsForm';

function SignupPage({
  handleEmail,
  googleLogin,
  onSubmitFail,
  recoverPassword,
  classes,
  login
}) {
  const FormProps = {
    onSubmit: handleEmail,
    onSubmitFail: onSubmitFail,
    login: login
  };

  const [forgotPassword, setForgotPassword] = useState(false);

  return forgotPassword && login && recoverPassword ? (
    <RecoverCredentialsPage
      recoverPassword={recoverPassword}
      onCancel={() => setForgotPassword(false)}
    />
  ) : (
    <BackgroundPaper className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {login ? 'Login' : 'Sign up'}
      </Typography>
      <Divider />
      <CredentialsForm
        {...FormProps}
        onForgotPassword={() => setForgotPassword(true)}
      />
      {googleLogin && (
        <div className={classes.alternative}>
          or
          <GoogleButton
            className={classes.providers}
            onClick={googleLogin}
            label={login ? 'Sign in with Google' : 'Sign up using Google'}
          />
        </div>
      )}
      <div className={classNames(classes.login, classes.alternative)}>
        <span className={classes.loginLabel}>
          {login ? 'Need an account?' : 'Already have an account?'}
        </span>
        <Link
          className={classes.loginLink}
          href={login ? SIGNUP_PATH : LOGIN_PATH}
          color="textSecondary"
        >
          {login ? 'Sign Up' : 'Login'}
        </Link>
      </div>
    </BackgroundPaper>
  );
}

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  emailSignup: PropTypes.func.isRequired, // from enhancer (withHandlers)
  googleLogin: PropTypes.oneOf([PropTypes.func, null]),
  onSubmitFail: PropTypes.func.isRequired, // from enhancer (reduxForm)
  login: PropTypes.bool
};

SignupPage.defaultProps = {
  login: false,
  googleLogin: null
};

export default SignupPage;
