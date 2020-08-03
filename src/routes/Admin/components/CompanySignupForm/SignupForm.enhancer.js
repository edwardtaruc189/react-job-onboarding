import { withStyles } from '@material-ui/core/styles';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { compose, withHandlers } from 'recompose';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import styles from './SignupForm.styles';
import companyBase from 'constants/companyBase';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  withNotifications,
  withHandlers({
    onSubmitFail: props => (formErrs, _, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    handleEmail: ({ firebase, showError }) => creds =>
      firebase
        .createUser(creds, {
          ...companyBase,
          email: creds.email,
          username: creds.email
        })
        .catch(err => showError(err.message))
  }),
  withStyles(styles)
);
