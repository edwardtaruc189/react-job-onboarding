import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { connect } from 'react-redux';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import { spinnerWhileLoading } from 'utils/components';
import { compose, withHandlers } from 'recompose';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import jobStatus from 'constants/jobStatus';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  firebaseConnect(({ firebase: { auth: { uid } } }) => [
    {
      path: 'connections',
      queryParams: ['orderByChild=createdBy', `equalTo == ${uid}`]
    }
  ]),
  connect(({ firebase: { ordered: { connections } } }) => ({
    activeConnections: connections ? connections : []
  })),
  connect(({ firebase: { auth: { uid } } }) => ({
    uid
  })),
  spinnerWhileLoading(['uid']),
  withNotifications,
  withHandlers({
    closeJob: props => jobID => {
      const { firebase, uid, showSuccess, showError } = props;
      if (!uid) {
        return showError('You must be logged in to view the company dashboard');
      }

      return firebase
        .update(`users/${uid}/jobs/${jobID}`, {
          status: jobStatus.CLOSED
        })
        .then(() => {
          showSuccess('Job has been closed');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Unable to close job');
          return Promise.reject(err);
        });
    }
  })
);
