import React from 'react';
import { Button, Box, Typography, Link } from '@material-ui/core';
import { PassedTechnical } from '../utils';
import { makeStyles } from '@material-ui/styles';
import { ACCOUNT_PATH } from 'constants/paths';

const useStyles = makeStyles({
  captionArea: {
    background: '#EEE',
    padding: '48px 0',
    textAlign: 'center'
  },
  captionText: {
    width: '70%',
    margin: '0 auto 16px auto'
  }
});

const PassedQuizAndInterview = ({
  activateSearch,
  seenTechnicalMessage,
  viewMessage,
  profile
}) => {
  const classes = useStyles();
  const isProfileReady = profile.firstName && profile.lastName && profile.email;
  return (
    <Box component="div">
      {!seenTechnicalMessage && <PassedTechnical onClose={viewMessage} />}
      <Box component="div" className={classes.captionArea}>
        <Typography variant="h4">Welcome to the platform</Typography>
        {isProfileReady ? <Typography variant="body1" className={classes.captionText}>
          Congrats on passing our assessments, you've made your way onto our
          platform! Click the button below when you're ready for your profile to
          go live!
        </Typography> :
          <Typography variant="body1" className={classes.captionText}>Please complete your&nbsp;
          <Link
              href={ACCOUNT_PATH}
              color="textSecondary"
            >profile</Link>
            &nbsp;before going live!</Typography>}
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={activateSearch}
          disabled={!isProfileReady}
        >
          Go Live
        </Button>
      </Box>
    </Box>
  );
};

export default PassedQuizAndInterview;
