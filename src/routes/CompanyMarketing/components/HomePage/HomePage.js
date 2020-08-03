import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import BackgroundPaper from 'components/BackgroundPaper';

function Home({ classes, authExists, history }) {
  if (authExists) {
    history.push('/home');
  }

  return (
    <BackgroundPaper className={classes.root}>
      <div className={classes.section}>
        <span className={classes.stylishLine} />
        <Typography variant="h4">Helping Companies Find Great React Engineers</Typography>
        <div className={classes.headerDescription}>
          <Typography variant="body1">
            Finding great engineering candidates that are searching for a new role with a background in React.js is hard.
          </Typography>
        </div>
      </div>
      <div className={classes.section}>
        <Typography variant="h5" className={classes.subHeader}>
          How it works
        </Typography>

        <Typography variant="body1" className={classes.step}>
          <Avatar className={classes.currentAvatar}>1</Avatar>
          <strong>Step one: </strong>We verify the talents of an engineering candidate through a series of quizzes and video
          interviews with our experts.
        </Typography>

        <Typography variant="body1" className={classes.step}>
          <Avatar className={classes.avatar}>2</Avatar>
          <strong>Step two: </strong>You post your React.js based jobs onto our platform and tell us what you're looking for
          including secondary skills (eg: Strong experience in python). engineering team
        </Typography>

        <Typography variant="body1" className={classes.step}>
          <Avatar className={classes.avatar}>3</Avatar>
          <strong>Step three: </strong>Our systems will filter engineers based on their skills according to your requirements
          and provide you with a list of engineers ready to join your company.
        </Typography>

        <Typography variant="body1" className={classes.step}>
          <Avatar className={classes.avatar}>4</Avatar>
          <strong>Step four: </strong>You complete the final rounds of interviews with the engineers matched to your roles and
          extend an offer.
        </Typography>
      </div>
      <div className={classes.section}>
        <div>
          <Typography variant="h5">Interested in starting the process with us?</Typography>
          <Typography variant="body1">Schedule a meeting below to learn more about what we have to offer.</Typography>
        </div>
        <br />
        <iframe
          className={classes.meeting}
          title="Company meeting"
          src="https://calendly.com/hiredbyreact/company-onboarding"
          seamless
        ></iframe>
      </div>
    </BackgroundPaper>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
};

export default Home;
