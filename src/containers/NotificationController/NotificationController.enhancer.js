import { compose } from 'recompose';
import withFirebase from 'react-redux-firebase/lib/withFirebase';
import { connect } from 'react-redux';

export default compose(
  withFirebase,
  connect(({ firebase: { auth: { uid } } }) => ({
    uid
  }))
);
