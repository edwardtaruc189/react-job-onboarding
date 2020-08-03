export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    flexGrow: 1,
    width: '100%',
    marginTop: 24,
    fontSize: '1.4rem'
  },
  header: {
    fontSize: '1.5rem'
  },
  inputs: {
    width: '100%'
  },
  submit: {
    ...theme.flexRowCenter,
    justifyContent: 'space-between',
    textAlign: 'center',
    padding: '1rem'
  },
  forgotPassword: {
    fontSize: '14px',
    margin: 'auto',
    marginLeft: 16
  },
  field: {
    width: '100%',
    maxWidth: 500
  }
});
