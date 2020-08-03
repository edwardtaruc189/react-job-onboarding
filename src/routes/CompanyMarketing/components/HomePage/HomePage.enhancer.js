import { withStyles } from '@material-ui/core/styles'
import styles from './HomePage.styles'
import { compose, withProps } from 'recompose'
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers'
import { connect } from 'react-redux'

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  withProps(({ auth }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  withStyles(styles)
)
