/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { withHandlers, compose, setPropTypes, withProps } from 'recompose';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import jobStatus from 'constants/jobStatus';
import styles from './View.styles';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  withNotifications,
  connect(({ firebase: { profile } }) => ({
    profile,
    avatarUrl: profile.avatarUrl
  })),
  firebaseConnect(({ location: { search } }) => [
    {
      path: `connections/${search.replace('?id=', '')}`
    }
  ]),
  connect(({ firebase: { listeners: { allIds }, data: { connections } } }) => ({
    connections: connections
      ? connections[allIds[0].replace('value:/connections/', '')]
      : {},
    connectionData: connections
      ? connections[allIds[0].replace('value:/connections/', '')]
      : {},
    userUid: connections
      ? allIds[0].replace('value:/connections/', '').split('_')[1]
      : null
  })),
  // spinnerWhileLoading(['connectionData']),
  firebaseConnect(({ userUid }) => [
    {
      path: `users/${userUid}`
    }
  ]),
  connect(({ firebase: { listeners: { allIds }, data: { users } } }) => ({
    userProfile: users
      ? users[allIds[0].replace('value:/connections/', '').split('_')[1]]
      : null
  })),
  firebaseConnect(({ connectionData }) => [
    {
      path: connectionData ? `users/${connectionData.createdBy}` : 'users/'
    }
  ]),
  connect(
    ({
      firebase: {
        listeners: { allIds },
        data: { connections, users }
      }
    }) => ({
      companyProfile: users
        ? users[
            connections &&
            connections[allIds[0].replace('value:/connections/', '')]
              ? connections[allIds[0].replace('value:/connections/', '')]
                  .createdBy
              : null
          ]
        : null
    })
  ),
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),

  setPropTypes({
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired
    })
  }),
  withProps(({ location: { search } }) => ({
    query: search.replace('?id=', '') || new Date().getTime()
  })),
  withHandlers({
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
    updateConnection: ({ firebase, showError, showSuccess }) => (
      jobId,
      step
    ) => {
      return firebase
        .database()
        .ref(`/connections/${jobId}/`)
        .update({
          status: step,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          showSuccess('Connection has been updated');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not update connection');
          return Promise.reject(err);
        });
    },
    closeConnection: ({ firebase, showError, showSuccess }) => (
      jobId,
      closedId
    ) => {
      return firebase
        .database()
        .ref(`/connections/${jobId}/`)
        .update({
          status: jobStatus.CLOSED,
          closedBy: closedId,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          showSuccess('Connection has been closed');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not close connection');
          return Promise.reject(err);
        });
    },
    addMessage: ({ firebase, showError, showSuccess }) => ({
      jobId,
      messageBody,
      senderId
    }) => {
      const createdAt = new Date().getTime();
      const obj = { createdAt, messageBody, senderId };

      return firebase
        .database()
        .ref()
        .child(`connections/${jobId}/messages`)
        .push(obj)
        .then(() => {
          showSuccess('Connection added successfully');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not add connection');
          return Promise.reject(err);
        });
    },
    addInterview: ({ firebase, showError, showSuccess }) => ({
      jobId,
      interviewTime,
      interviewMethod,
      interviewInfo,
      start,
      end
    }) => {
      const createdAt = new Date().getTime();
      const obj = {
        createdAt,
        interviewTime,
        interviewMethod,
        interviewInfo,
        start,
        end
      };

      return firebase
        .database()
        .ref()
        .child(`connections/${jobId}/interviews`)
        .push(obj)
        .then(() => {
          showSuccess('Connection added successfully');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not add connection');
          return Promise.reject(err);
        });
    },
    addConnection: ({ firebase, uid, showError, showSuccess }) => (
      jobUid,
      personUid,
      uid,
      { salary, message }
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
      return firebase
        .database()
        .ref()
        .child('connections')
        .child(`${jobUid}_${personUid}`)
        .update({
          salary,
          createdBy: uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          status: 'INTERVIEW_REQUEST',
          position: jobUid,
          messages: [
            {
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              senderId: uid,
              messageBody: message
            }
          ],
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
          candidateId: personUid,
          companyId: uid
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
