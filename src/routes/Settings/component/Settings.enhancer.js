import PropTypes from 'prop-types';
import { withHandlers, setPropTypes, compose } from 'recompose';
import { connect } from 'react-redux';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import Sentry from '@sentry/browser';
import { spinnerWhileLoading } from 'utils/components';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';

export default compose(
  UserIsAuthenticated,
  withFirebase,
  withNotifications,
  connect(({ firebase: { profile } }) => ({
    profile
  })),
  spinnerWhileLoading(['profile']),
  setPropTypes({
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired
    })
  }),
  withHandlers({
    onSubmit: ({ firebase, showSuccess, showError }) => settings => {
      firebase
        .updateProfile(settings)
        .then(() => showSuccess('Settings updated'))
        .catch(err => {
          showError('Error updating settings');
          Sentry.captureMessage(`Failed to update account settings: ${err}`);
        });
    }
  })
);
