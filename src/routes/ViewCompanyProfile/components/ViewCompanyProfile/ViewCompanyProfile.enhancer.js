/* eslint-disable no-console */
import { withStyles } from '@material-ui/core/styles';
import styles from './ViewCompanyProfile.styles';
import { compose, withProps } from 'recompose';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import { spinnerWhileLoading } from 'utils/components';
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers';
import { connect } from 'react-redux';

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  spinnerWhileLoading(['profile']),
  firebaseConnect(({ location: { search } }) => [
    `users/${search.replace('?uid=', '')}`
  ]),
  connect(({ firebase: { data: { users } } }) => ({
    profile: users !== undefined ? Object.values(users)[0] : {}
  })),
  withProps(({ auth }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  withStyles(styles)
);
