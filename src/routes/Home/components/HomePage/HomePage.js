import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Avatar } from '@material-ui/core';
import BackgroundPaper from 'components/BackgroundPaper';
import { Link } from 'react-router-dom';
import { SIGNUP_PATH } from 'constants/paths';

function Home({ classes, authExists, history }) {
  if (authExists) {
    history.push('/home');
  }

  return (
    <BackgroundPaper className={classes.root}>
      <div className={classes.section}>
        <span className={classes.stylishLine} />
        <Typography variant="h4">Helping Engineers Find Their Dream Job</Typography>
        <div className={classes.headerDescription}>
          <Typography variant="body1">
            Get offers from companies looking to hire engineers that specialize in the Javascript library - React.js
          </Typography>
        </div>
      </div>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.subHeader}>
          How it works
        </Typography>

        <Typography variant="body1" className={classes.step}>
          <Avatar className={classes.currentAvatar}>1</Avatar>
          <strong>Step one: </strong>you'll complete a quiz that covers the basics of programming and general
          Javascript/React.js based topics
        </Typography>

        <Typography variant="body1" className={classes.step}>
          <Avatar className={classes.avatar}>2</Avatar>
          <strong>Step two: </strong>you'll complete a two-hour timed coding assessment so we can assess your skills and better
          match you with our companies.
        </Typography>

        <Typography variant="body1" className={classes.step}>
          <Avatar className={classes.avatar}>3</Avatar>
          <strong>Step three: </strong>We'll begin matching you with companies that are looking to hire within your location and
          the locations that you're interested with. In most cases, you'd skip straight to a final onsite.
        </Typography>
      </div>
      <div className={classes.section}>
        <div>
          <Typography variant="h5">Interested in starting the process with us?</Typography>

          <Typography variant="body1">Click on the link below to signup for an account and take our quiz!</Typography>
        </div>
        <br />
        <Link to={SIGNUP_PATH}>
          <Button color="primary" variant="contained">
            Start the process
          </Button>
        </Link>
      </div>
    </BackgroundPaper>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
};

export default Home;
