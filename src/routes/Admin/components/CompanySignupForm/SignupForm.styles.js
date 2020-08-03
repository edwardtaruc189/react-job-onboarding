export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    minWidth: '500px',
    margin: '.2rem',
    fontSize: '1.4rem'
  },
  header: {
    fontSize: '1.5rem'
  },
  inputs: {
    minWidth: '400px'
  },
  submit: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    textAlign: 'center',
    padding: '1.25rem',
    minWidth: '192px',
    marginTop: '1.5rem'
  }
})
