/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { withHandlers, compose, setPropTypes, withProps } from 'recompose';
import { spinnerWhileLoading } from 'utils/components';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import styles from './View.styles';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  withNotifications,
  connect(({ firebase: { profile } }) => ({
    profile,
    avatarUrl: profile.avatarUrl
  })),
  spinnerWhileLoading(['profile']),
  firebaseConnect(() => [
    {
      path: 'users'
    }
  ]),
  connect(({ firebase: { auth: { uid } } }) => ({
    uid
  })),
  // Map projects from state to props
  connect(({ firebase: { auth: { uid }, data: { users } } }) => ({
    users,
    uid
  })),
  // Show loading spinner while quizzes are loading
  spinnerWhileLoading(['users']),
  firebaseConnect(({ firebase: { auth: { uid } } }) => [
    {
      path: 'connections',
      queryParams: ['orderByChild=createdBy', `equalTo == ${uid}`]
    }
  ]),
  connect(({ firebase: { ordered: { connections } } }) => ({
    connections: connections ? connections : []
  })),
  setPropTypes({
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired
    })
  }),
  withProps(({ location: { search }, connections }) => ({
    jobID: search.replace('?id=', '').split('&')[0] || new Date().getTime(),
    affiliatedConnections: connections.filter(
      ({ value: { position } }) =>
        position ===
        (search.replace('?id=', '').split('&')[0] || new Date().getTime())
    )
  })),
  withHandlers({
    goToRoute: props => route => {
      props.history.push(route);
    },
    updateAccount: ({ firebase, showSuccess, showError }) => newAccount => {
      return firebase
        .updateProfile(newAccount)
        .then(() => showSuccess('Profile updated successfully'))
        .catch(error => {
          showError('Error updating profile: ', error.message || error);
          console.error('Error updating profile', error.message || error); // eslint-disable-line no-console
          return Promise.reject(error);
        });
    },
    addConnection: ({ firebase, uid, showError, showSuccess }) => (
      jobUid,
      personUid,
      uid,
      { salary, equity, message }
    ) => {
      if (!personUid) {
        return showError(
          "You need to specify the person you'd like to start a connection with."
        );
      }
      if (!jobUid) {
        return showError(
          "You must specify the job that you'd like to connect about."
        );
      }

      const messageSet = [];
      if (message)
        messageSet.push({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          senderId: uid,
          messageBody: message
        });

      return firebase
        .database()
        .ref()
        .child('connections')
        .child(`${jobUid}_${personUid}`)
        .update({
          salary,
          equity,
          createdBy: uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          status: 'INTERVIEW_REQUEST',
          position: jobUid,
          messages: messageSet
        })
        .then(() => {
          showSuccess('Connection added successfully');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not add connection');
          return Promise.reject(err);
        });
    }
  }),
  // add props.classes
  withStyles(styles)
);
