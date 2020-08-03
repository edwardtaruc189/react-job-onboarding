import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  notify: {
    padding: 20,
    margin: '0 -20px 20px -20px',
    border: 'thin solid #EEE'
  },
  waitingDays: {
    fontWeight: 'bold'
  }
});

const FailedQuiz = ({ dateRange, minDays }) => {
  const classes = useStyles();
  return (
    <Box className={classes.notify}>
      <Typography variant="caption">
        Please wait{' '}
        <span className={classes.waitingDays}>
          {Math.floor(dateRange) + minDays} days
        </span>{' '}
        before trying the test again
      </Typography>
    </Box>
  );
};

export default FailedQuiz;
