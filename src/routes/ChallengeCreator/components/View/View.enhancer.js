import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
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
  connect(({ firebase: { profile, auth: { uid } } }) => ({
    profile,
    avatarUrl: profile.avatarUrl,
    uid
  })),
  spinnerWhileLoading(['profile']),
  setPropTypes({
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired
    })
  }),
  withProps(({ location: { search } }) => ({ query: search.replace('?id=', '') || new Date().getTime() })),
  withHandlers({
    createChallenge: props => ({ name, body }) => {
      const { firebase, uid, showError, showSuccess } = props;
      if (!uid) {
        return showError('You must be logged in to create a challenge');
      }
      return firebase
        .push('challenges', {
          createdBy: uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          name,
          body
        })
        .then(() => {
          showSuccess('New challenge created');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'Could not add challenge');
          return Promise.reject(err);
        });
    }
  }),
  // add props.classes
  withStyles(styles)
);
