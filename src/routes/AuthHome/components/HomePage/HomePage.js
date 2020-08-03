/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Chip,
  Box,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import BackgroundPaper from 'components/BackgroundPaper';
import profileItems from 'constants/profileItems';
import searchStatus from 'constants/searchStatus';
import Quiz from './Quiz';
import { allOutsideOfRange, renderQuizzes } from './utils';
import {
  FailedQuiz,
  PassedQuiz,
  PassedQuizAndInterview,
  Active
} from './Status';
import CompanyDashboard from '../Company';

const minDays = 30;

function Home({
  classes,
  profile,
  connections,
  addQuiz,
  updateQuiz,
  quizzes,
  candidateChallenges,
  users,
  activateSearch,
  addChallenge,
  showInterestInJob,
  rejectConnection,
  deactivateSearch,
  goToJobCentral,
  goToRoute,
  history,
  viewPassedTechnicalMessage
}) {
  if (profile.role === 'company') {
    const propsToPass = {
      connections,
      classes,
      profile,
      goToJobCentral,
      goToRoute,
      users
    };
    return <CompanyDashboard {...propsToPass} />;
  }
  if (!quizzes || !Array.isArray(quizzes))
    return (
      <BackgroundPaper>
        <Quiz handleCreate={addQuiz} handleSubmit={updateQuiz} />
      </BackgroundPaper>
    );

  const { shallPass } = profile;
  let ungradedExists = false;
  let incompleteExists = false;
  let incompleteQuiz = null;

  quizzes.forEach(({ key, value }) => {
    if (value.incomplete) {
      incompleteExists = true;
      incompleteQuiz = { key, value };
    } else if (!value.graded) ungradedExists = true;
  });
  const quizScores = quizzes.map(({ value: { score } }) => score || 0);
  const pass = Math.max(...quizScores) >= 0.7 ? true : false;

  const [dateRange, thirtyDaysPassed] = allOutsideOfRange(quizzes, minDays);

  let itemsInProfile = 0;
  let notInProfile = [];
  Object.keys(profileItems).forEach(item => {
    if (profile.hasOwnProperty(item)) itemsInProfile++;
    else notInProfile.push(profileItems[item]);
  });

  const profilePercentCompleted = (
    (itemsInProfile / Object.keys(profileItems).length) *
    100
  ).toFixed(2);

  return (
    <BackgroundPaper square={false}>
      {(incompleteExists || (!pass && thirtyDaysPassed)) && (
        <Quiz
          handleCreate={addQuiz}
          handleSubmit={updateQuiz}
          incompleteQuiz={incompleteQuiz}
        />
      )}
      {pass && shallPass && profilePercentCompleted <= 80 && (
        <Box className={classes.notify}>
          <Typography variant="body1">
            Your profile is {Math.ceil(profilePercentCompleted)}% complete, you
            are currently missing the following items:
          </Typography>
          <Box className={classes.missingProfileItems}>
            {notInProfile.map(item => (
              <Chip key={item} label={item} />
            ))}
          </Box>
          <Button
            className={classes.profileButton}
            onClick={() => goToRoute('/account')}
            color="primary"
            variant="contained"
            size="small"
          >
            Visit Profile
          </Button>
        </Box>
      )}

      {pass && shallPass && profile.searchStatus !== searchStatus.active && (
        <PassedQuizAndInterview
          activateSearch={() => activateSearch(profile)}
          seenTechnicalMessage={profile.seenTechnicalMessage}
          viewMessage={viewPassedTechnicalMessage}
          profile={profile}
        />
      )}
      {pass && shallPass && profile.searchStatus === searchStatus.active && (
        <Active
          goToRoute={goToRoute}
          onSubmit={showInterestInJob}
          onReject={rejectConnection}
          users={users}
          connections={connections}
          deactivateSearch={() => deactivateSearch(profile)}
          seenTechnicalMessage={profile.seenTechnicalMessage}
          viewMessage={viewPassedTechnicalMessage}
        />
      )}
      {pass && !shallPass && (
        <PassedQuiz
          candidateChallenges={candidateChallenges}
          addChallenge={addChallenge}
        />
      )}
      {!pass && ungradedExists && !incompleteExists && (
        <Box component="div">
          <h3>Your quiz is being graded</h3>
          <CircularProgress />
        </Box>
      )}
      {!pass && !thirtyDaysPassed && !incompleteExists && !ungradedExists && (
        <Box className={classes.dontTouchMe}>
          <FailedQuiz history={history} {...{ dateRange, minDays, classes }} />
          <div>
            <h3>Quiz Attempts</h3>
            {renderQuizzes(quizzes)}
          </div>
        </Box>
      )}
    </BackgroundPaper>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;
