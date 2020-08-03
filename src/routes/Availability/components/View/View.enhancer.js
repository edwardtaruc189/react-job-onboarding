import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { compose, withHandlers } from 'recompose';
import { spinnerWhileLoading } from 'utils/components';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import styles from './View.styles';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  connect(({ firebase: { auth: { uid } } }) => ({
    uid
  })),
  spinnerWhileLoading(['uid']),
  firebaseConnect(({ uid }) => [{ path: `calendar/${uid}/availability` }]),
  connect(({ firebase: { data: { calendar }, auth: { uid } } }) => ({
    availability:
      calendar && calendar[uid] && calendar[uid].availability
        ? calendar[uid].availability
        : []
  })),
  spinnerWhileLoading(['availability']),
  withNotifications,
  withHandlers({
    updateAvailability: ({ firebase, showError, uid }) => timeObj => {
      firebase
        .ref(`/calendar/${uid}/availability/`)
        .set(timeObj)
        .catch(error => {
          showError('Error updating profile: ', error.message || error);
          return Promise.reject(error);
        });
    }
  }),
  withStyles(styles)
);
