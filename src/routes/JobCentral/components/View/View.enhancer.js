import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { compose, setPropTypes, withProps } from 'recompose';
import { spinnerWhileLoading } from 'utils/components';
import { withNotifications } from 'modules/notification';
import { UserIsAuthenticated } from 'utils/router';
import styles from './View.styles';

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  withNotifications,
  connect(({ firebase: { profile, auth: { uid } } }) => ({
    profile,
    avatarUrl: profile.avatarUrl,
    uid: uid
  })),
  spinnerWhileLoading(['profile']),
  setPropTypes({
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired
    })
  }),
  withProps(({ location: { search } }) => ({
    query: search.replace('?id=', '') || new Date().getTime()
  })),
  // add props.classes
  withStyles(styles)
);
