import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { withHandlers, compose } from 'recompose';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  withNotifications,
  withHandlers({
    handleSubmit: ({ firebase, showSuccess, showError, uid, history }) => (
      id,
      newAccount
    ) => {
      return firebase
        .ref(`/users/${uid}/jobs`)
        .update({ [id]: newAccount })
        .then(() => {
          showSuccess('New Job Added!');
          history.push('/');
        })
        .catch(error => {
          showError('Error updating profile: ', error.message || error);
          console.error('Error updating profile', error.message || error); // eslint-disable-line no-console
          return Promise.reject(error);
        });
    }
  })
);
