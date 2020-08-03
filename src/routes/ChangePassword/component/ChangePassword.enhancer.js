import PropTypes from 'prop-types';
import { withHandlers, setPropTypes, compose } from 'recompose';
import { connect } from 'react-redux';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
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
      signInWithEmailAndPassword: PropTypes.func,
      updatePassword: PropTypes.func
    })
  }),
  withHandlers({
    onSubmit: ({
      profile: { email },
      firebase,
      showSuccess,
      showError,
      history: { push }
    }) => ({ currentPassword, newPassword, confirmPassword }) => {
      return newPassword === currentPassword
        ? showError('Current password cannot be the same as the new password')
        : newPassword === confirmPassword
        ? firebase
            .auth()
            .signInWithEmailAndPassword(email, currentPassword)
            .then(({ user }) =>
              user
                .updatePassword(newPassword)
                .then(() => {
                  push('/settings');
                  showSuccess('Password has been updated successfully');
                })
                .catch(r =>
                  showError(
                    'Your new password must be at least 6 characters in length'
                  )
                )
            )
            .catch(r => showError('Current password is incorrect'))
        : showError('New password and confirmation password do not match');
    }
  })
);
