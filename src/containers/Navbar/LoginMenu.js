import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LOGIN_PATH, SIGNUP_PATH, COMPANY_PATH } from 'constants/paths';

const useStyles = makeStyles({
  button: {
    textTransform: 'capitalize',
    color: 'white',
    textDecoration: 'none',
    alignSelf: 'center'
  },
  mobileButton: {
    fontSize: '2.5vw',
    textTransform: 'capitalize',
    color: 'white',
    textDecoration: 'none',
    alignSelf: 'center'
  }
});

function LoginMenu() {
  const classes = useStyles();
  return (
    <>
      <Hidden mdUp>
        <Button className={classes.mobileButton} component={Link} to={COMPANY_PATH}>
          For Companies
        </Button>
        <Button className={classes.mobileButton} component={Link} to={SIGNUP_PATH}>
          Sign Up
        </Button>
        <Button className={classes.mobileButton} component={Link} to={LOGIN_PATH}>
          Login
        </Button>
      </Hidden>
      <Hidden smDown>
        <Button className={classes.button} component={Link} to={COMPANY_PATH}>
          For Companies
        </Button>
        <Button className={classes.button} component={Link} to={SIGNUP_PATH}>
          Sign Up
        </Button>
        <Button className={classes.button} component={Link} to={LOGIN_PATH}>
          Login
        </Button>
      </Hidden>
    </>
  );
}

export default LoginMenu;
