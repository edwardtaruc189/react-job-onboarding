export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    margin: '.2rem',
    fontSize: '1.4rem'
  },
  title: {
    marginBottom: 16
  },
  description: {
    margin: '16px 0px'
  },
  field: {
    maxWidth: 500
  },
  fieldContainer: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    margin: '.2rem',
    fontSize: '1.4rem'
  },
  link: {
    fontSize: '14px',
    marginTop: 8
  }
});
