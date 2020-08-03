import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { compose, withHandlers } from 'recompose';
import { spinnerWhileLoading } from 'utils/components';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import styles from './HomePage.styles';
import companyBase from 'constants/companyBase';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  connect(({ firebase: { auth: { uid } } }) => ({
    uid
  })),
  spinnerWhileLoading(['uid']),
  connect(({ firebase: { profile } }) => ({
    profile
  })),
  spinnerWhileLoading(['profile']),
  firebaseConnect(({ uid }) => [
    {
      path: 'quizzes',
      queryParams: ['orderByChild=createdBy', `equalTo=${uid}`]
    }
  ]),
  connect(({ firebase: { ordered } }) => ({
    quizzes: ordered.quizzes
  })),
  firebaseConnect(() => [
    {
      path: 'candidateChallenges'
    }
  ]),
  connect(({ firebase: { ordered } }) => ({
    candidateChallenges: ordered.candidateChallenges
  })),
  // Show loading spinner while quizzes are loading
  spinnerWhileLoading(['quizzes']),
  firebaseConnect(({ uid }) => [
    {
      path: 'users'
    }
  ]),
  // Map users from state to props
  connect(({ firebase: { ordered } }) => ({
    users: ordered.users
  })),
  // Show loading spinner while quizzes are loading
  spinnerWhileLoading(['users']),
  firebaseConnect(({ uid }) => [
    {
      path: 'quizzes'
    }
  ]),
  // Map quizzes from state to props
  connect(({ firebase: { data } }) => ({
    quizList: data.quizzes
  })),
  // Show loading spinner while quizzes are loading
  spinnerWhileLoading(['quizList']),
  withNotifications,
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    companySignup: ({ firebase, showError }) => creds =>
      firebase
        .createUser(creds, {
          ...companyBase,
          email: creds.email,
          username: creds.email
        })
        .catch(err => showError(err.message)),
    approveUser: ({ firebase, showSuccess, showError }) => userId =>
      firebase
        .database()
        .ref()
        .child('/users/' + userId)
        .update({ shallPass: true })
        .then(() => {
          showSuccess('User approved successfully');
        })
        .catch(err => {
          console.error('Error:', err); // eslint-disable-line no-console
          showError(err.message || 'User approval has failed');
          return Promise.reject(err);
        })
  }),
  withStyles(styles)
);
