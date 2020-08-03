/* eslint-disable no-console */
import { withStyles } from '@material-ui/core/styles';
import { compose, withProps, withHandlers } from 'recompose';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers';
import { connect } from 'react-redux';
import Sentry from '@sentry/browser';
import { withNotifications } from 'modules/notification';
import { UserIsAuthAndHasRole } from 'utils/router';
import { spinnerWhileLoading } from 'utils/components';
import styles from './AdminGradeChallenges.styles';

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  spinnerWhileLoading(['profile']),
  UserIsAuthAndHasRole(['admin']),
  firebaseConnect(({ location: { search } }) => [
    `users/${search.replace('?uid=', '')}`
  ]),
  // // Map projects from state to props
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
  // Map projects from state to props
  connect(({ firebase: { ordered } }) => ({
    candidateChallenges: ordered.candidateChallenges
  })),
  withProps(({ auth, location: { search } }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth),
    uid: search.replace('?uid=', '')
  })),
  withNotifications,
  withStyles(styles),
  withHandlers({
    gradeChallenge: ({ firebase, uid }) => ({ key, code, level }) => {
      return firebase
        .ref(`/candidateChallenges/${key}`)
        .update({
          codeReview: code,
          graded: true,
          shallPass: true
        })
        .then(() => {
          firebase
            .database()
            .ref()
            .child('/users/' + uid)
            .update({ shallPass: true, level })
            .then(() => {})
            .catch(err => {
              Sentry.captureException(err);
              return Promise.reject(err);
            });
        })
        .catch(err => {
          Sentry.captureException(err);
          return Promise.reject(err);
        });
    },
    failChallenge: ({ firebase, uid, showSuccess }) => ({ key }) => {
      firebase
        .ref(`/candidateChallenges/${key}`)
        .update({
          graded: true,
          shallPass: false
        })
        .then(() => {
          firebase
            .database()
            .ref(`/users/${uid}`)
            .update({ shallPass: false })
            .then(() => showSuccess('Candidate has been marked as failed'))
            .catch(err => {
              Sentry.captureException(err);
              return Promise.reject(err);
            });
        })
        .catch(err => {
          Sentry.captureException(err);
          return Promise.reject(err);
        });
    }
  })
);
