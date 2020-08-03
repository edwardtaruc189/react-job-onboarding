/* eslint-disable no-console */
import { withStyles } from '@material-ui/core/styles';
import { compose, withProps } from 'recompose';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers';
import { connect } from 'react-redux';
import { UserIsAuthAndHasRole } from 'utils/router';
import { spinnerWhileLoading } from 'utils/components';
import styles from './ViewChallenges.styles';

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  spinnerWhileLoading(['profile']),
  UserIsAuthAndHasRole(['company', 'admin']),
  firebaseConnect(({ location: { search } }) => [
    `users/${search.replace('?uid=', '')}`
  ]),
  connect(({ firebase: { data: { users } } }) => ({
    profile: users !== undefined ? Object.values(users)[0] : {}
  })),
  firebaseConnect(({ location: { search } }) => [
    {
      path: '/candidateChallenges',
      queryParams: [
        'orderByChild=createdBy',
        `equalTo=${search.replace('?uid=', '')}`
      ]
    }
  ]),
  connect(({ firebase: { ordered } }) => ({
    candidateChallenges: ordered.candidateChallenges
  })),
  withProps(({ auth, location: { search } }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth),
    uid: search.replace('?uid=', '')
  })),
  withStyles(styles)
);
