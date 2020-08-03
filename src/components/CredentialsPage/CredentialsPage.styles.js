export default theme => ({
  root: {
    justifyContent: 'center',
    flexGrow: 1,
    fontWeight: 400,
    minWidth: '250px'
  },
  title: {
    textAlign: 'center',
    marginBottom: 16
  },
  orLabel: {
    marginTop: '1rem',
    marginBottom: '.5rem'
  },
  login: {
    marginTop: '1.5rem'
  },
  loginLabel: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  loginLink: {
    fontSize: '1.2rem'
  },
  alternative: {
    ...theme.flexColumnCenter,
    justifyContent: 'center'
  },
  providers: {
    marginTop: '1rem'
  }
});
