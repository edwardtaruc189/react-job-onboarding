import PropTypes from 'prop-types';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import {
  withProps,
  withHandlers,
  compose,
  setPropTypes,
  setDisplayName
} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { UserIsNotAuthenticated } from 'utils/router';
import { withNotifications } from 'modules/notification';
import styles from 'components/CredentialsPage/CredentialsPage.styles';

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedLoginPage'),
  // redirect to /projects if user is already authed
  UserIsNotAuthenticated,
  // add props.showError
  withNotifications,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Set proptypes used in HOCs
  setPropTypes({
    showError: PropTypes.func.isRequired, // used in handlers
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired // used in handlers
    })
  }),
  // Toggle login page
  withProps({ login: true }),
  // Add handlers as props
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError }) => () =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(() =>
          showError('Unexpected error occurred, please try again later')
        ),
    handleEmail: ({ firebase, showError }) => creds =>
      firebase.login(creds).catch(err => showError(err.message)),
    recoverPassword: ({ firebase, showError, showSuccess }) => email => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          showSuccess('Recovery Email is on the way');
        })
        .catch(err => showError('Failed to send recovery email', err));
    }
  }),
  // Add styles as props.classes
  withStyles(styles, { withTheme: true })
);
