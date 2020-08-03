/* eslint-disable no-console */
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './View.styles';
import { compose, withProps, withHandlers, setPropTypes } from 'recompose';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { withNotifications } from 'modules/notification';
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';
import { spinnerWhileLoading } from 'utils/components';
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers';
import { connect } from 'react-redux';

export default compose(
  connect(({ firebase: { profile, auth: { uid } } }) => ({
    profile,
    avatarUrl: profile.avatarUrl,
    uid
  })),
  withFirebase,
  withNotifications,
  spinnerWhileLoading(['profile']),
  firebaseConnect(({ location: { search } }) => [
    {
      path: `candidateChallenges/${search.replace('?id=', '')}`
    }
  ]),
  connect(({ firebase: { data: { candidateChallenges } } }) => ({
    challenges: candidateChallenges
      ? Object.entries(candidateChallenges).map(([key, value]) => ({
          key,
          ...value
        }))
      : []
  })),
  setPropTypes({
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired
    })
  }),
  withProps(({ challenges, auth, location: { search } }) => {
    const challengeId = search.replace('?id=', '');
    return {
      authExists: isLoaded(auth) && !isEmpty(auth),
      challenge: challenges.filter(({ key }) => key === challengeId)[0]
    };
  }),
  withStyles(styles),
  withHandlers({
    submitChallenge: props => ({ key, code }) => {
      const { firebase, uid, showError, showSuccess } = props;
      if (!uid) {
        return showError('You must be logged in to submit your solution');
      }
      return firebase
        .ref(`/candidateChallenges/${key}`)
        .update({
          code,
          complete: true
        })
        .then(() => {
          showSuccess('Your solution was successfully submitted');
        })
        .catch(err => {
          showError(err.message || 'Could not submit solution');
          return Promise.reject(err);
        });
    }
  })
);
