import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { compose, withHandlers } from 'recompose';
import { spinnerWhileLoading } from 'utils/components';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import styles from './HomePage.styles';
import searchStatus from 'constants/searchStatus';
import { JOB_CENTRAL_PATH } from 'constants/paths';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  connect(({ firebase: { auth: { uid } } }) => ({
    uid
  })),
  spinnerWhileLoading(['uid']),
  connect(({ firebase: { profile } }) => ({
    profile
  })),
  spinnerWhileLoading(['profile']),
  firebaseConnect(({ uid }) => [
    {
      path: 'quizzes',
      queryParams: ['orderByChild=createdBy', `equalTo=${uid}`]
    }
  ]),
  // Map projects from state to props
  connect(({ firebase: { ordered } }) => ({
    quizzes: ordered.quizzes
  })),
  firebaseConnect(({ uid }) => [
    {
      path: 'candidateChallenges',
      queryParams: ['orderByChild=createdBy', `equalTo=${uid}`]
    }
  ]),
  // Map projects from state to props
  connect(({ firebase: { data } }) => ({
    candidateChallenges: data.candidateChallenges
  })),
  // Show loading spinner while quizzes are loading
  spinnerWhileLoading(['quizzes']),
  firebaseConnect(({ uid }) => [
    {
      path: 'users'
    }
  ]),
  // Map projects from state to props
  connect(({ firebase: { data: { users } } }) => ({
    users
  })),
  // Show loading spinner while quizzes are loading
  spinnerWhileLoading(['users']),
  firebaseConnect(({ uid, location: { search } }) => [
    {
      path: 'connections'
    }
  ]),
  connect(({ firebase: { auth: { uid }, data: { connections } } }) => ({
    connections: connections
      ? Object.keys(connections)
          .filter(key => key.indexOf(uid) !== -1)
          .map(key => ({ ...connections[key], key }))
      : []
  })),
  withNotifications,
  withHandlers({
    goToJobCentral: props => () => {
      props.history.push(JOB_CENTRAL_PATH);
    },
    activateSearch: ({ firebase, showSuccess, showError }) => newAccount =>
      firebase
        .updateProfile({ ...newAccount, searchStatus: searchStatus.active })
        .then(() => showSuccess('Profile updated successfully'))

        .catch(error => {
          showError('Error updating profile: ', error.message || error);
          console.error('Error updating profile', error.message || error); // eslint-disable-line no-console
          return Promise.reject(error);
        }),
    deactivateSearch: ({ firebase, showSuccess, showError }) => newAccount =>
      firebase
        .updateProfile({ ...newAccount, searchStatus: searchStatus.inactive })
        .then(() => showSuccess('Profile updated successfully'))

        .catch(error => {
          showError('Error updating profile: ', error.message || error);
          console.error('Error updating profile', error.message || error); // eslint-disable-line no-console
          return Promise.reject(error);
        }),
    goToRoute: props => route => {
      props.history.push(route);
    },
    showInterestInJob: ({
      firebase,
      showSuccess,
      showError
    }) => connectionKey =>
      firebase
        .database()
        .ref()
        .child('connections')
        .child(`${connectionKey}`)
        .update({
          agreedToInterview: true,
          status: 'ACTIVELY_INTERVIEWING',
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          showSuccess('Connectionn added successfully');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not add connection');
          return Promise.reject(err);
        }),
    rejectConnection: ({
      firebase,
      showSuccess,
      showError,
      uid
    }) => connectionKey => {
      firebase
        .database()
        .ref(`/connections/${connectionKey}`)
        .update({
          agreedToInterview: false,
          status: 'CLOSED',
          closedBy: uid,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          showSuccess('Connectionn closed');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not close connection');
          return Promise.reject(err);
        });
    },
    addQuiz: props => () => {
      const { firebase, uid, showError, showSuccess } = props;
      if (!uid) {
        return showError('You must be logged in to create a quiz');
      }
      return firebase
        .push('quizzes', {
          createdBy: uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          incomplete: true,
          graded: false
        })
        .then(() => {
          showSuccess('New Quiz created');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not add quiz');
          return Promise.reject(err);
        });
    },
    addChallenge: props => () => {
      const { firebase, uid, showError, showSuccess } = props;
      if (!uid) {
        return showError('You must be logged in to create a quiz');
      }
      return firebase
        .push('candidateChallenges', {
          ref: 'INITIAL',
          createdBy: uid,
          complete: false
        })
        .then(() => {
          showSuccess('New challenge created');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not create challenge');
          return Promise.reject(err);
        });
    },
    updateQuiz: props => (quizId, newInstance) => {
      const { firebase, uid, showError, showSuccess } = props;
      if (!uid) {
        return showError('You must be logged in to submit a quiz');
      }

      return firebase
        .update(`quizzes/${quizId}`, {
          ...newInstance
        })
        .then(() => {
          showSuccess('Quiz submitted successfully');
        })
        .catch(err => {
          showError(err.message || 'Could not submit quiz');
          return Promise.reject(err);
        });
    },
    viewPassedTechnicalMessage: ({ firebase, uid }) => () => {
      return firebase
        .update(`users/${uid}`, {
          seenTechnicalMessage: true
        })
        .catch(err => Promise.reject(err));
    }
  }),
  withStyles(styles)
);
