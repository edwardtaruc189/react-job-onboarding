import React from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AcceptPopUp from 'components/AcceptPopUp';
import FailedQuiz from './FailedQuiz';
import { renderChallenges, allOutsideOfRange } from '../utils';

const useStyles = makeStyles({
  captionArea: {
    background: '#EEE',
    padding: '48px 0',
    textAlign: 'center'
  },
  captionText: {
    width: '70%',
    margin: '16px auto'
  },
  dontTouchMe: {
    padding: 30
  }
});

const PassedQuiz = ({ addChallenge, candidateChallenges }) => {
  const classes = useStyles();
  let codingAssignment = Object.entries(candidateChallenges || {})
    .filter(([_, v]) => v.ref === 'INITIAL')
    .map(([key, value]) => ({ key, value }));

  const [dateRange, retryAllowed] = allOutsideOfRange(codingAssignment, 30);

  if (!retryAllowed)
    return (
      <Box className={classes.dontTouchMe}>
        <FailedQuiz dateRange={dateRange} minDays={30} />
        <div>
          <h3>Challenge Attempts</h3>
          {renderChallenges(codingAssignment)}
        </div>
      </Box>
    );

  codingAssignment = codingAssignment.filter(
    ({ value: { complete, graded } }) => !complete || !graded
  );
  if (codingAssignment.length) {
    const challenge = codingAssignment[0];
    if (
      challenge.value.endAt > new Date().getTime() &&
      !challenge.value.complete
    )
      return <Redirect to={`/CodingChallenge?id=${challenge.key}`} />;
    else if (
      challenge.value.complete ||
      challenge.value.endAt < new Date().getTime()
    )
      return (
        <Box component="div" className={classes.captionArea}>
          <Typography variant="h4">
            Awaiting coding challenge results
          </Typography>
          <Typography variant="body1" className={classes.captionText}>
            Congratulations on completing the coding challenge, please stand by
            while we review your solution.
          </Typography>
        </Box>
      );
    else return <span></span>;
  }

  return (
    <Box component="div" className={classes.captionArea}>
      <Typography variant="h4">Passed Technical Quiz</Typography>
      <Typography variant="body1" className={classes.captionText}>
        Congrats, you've passed our initial test! Next, we will provide you with
        a coding assessment. For this coding assessment, you'll be provided with
        two hours of time to complete the exercise.
      </Typography>
      <AcceptPopUp
        buttonLabel="Take coding assessment"
        message="Are you sure you'd like to begin this two hour coding challenge?"
        color="primary"
        size="large"
        onClose={addChallenge}
      />
    </Box>
  );
};

PassedQuiz.defaultProps = {
  candidateChallenges: {}
};

export default PassedQuiz;
