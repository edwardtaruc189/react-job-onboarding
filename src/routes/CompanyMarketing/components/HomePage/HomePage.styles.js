export default theme => ({
  root: {
    maxWidth: '800px',
    margin: 'auto'
  },
  section: {
    ...theme.flexColumnLeft,
    marginBottom: 16
  },
  currentAvatar: {
    width: 30,
    height: 30,
    backgroundColor: '#333',
    display: 'inline-flex',
    marginRight: 12
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: '#ffb259',
    display: 'inline-flex',
    marginRight: 12
  },
  subHeader: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 500,
    color: '#212020'
  },
  stylishLine: {
    width: 104,
    border: 'solid 2px #558b2f',
    marginBottom: 16
  },
  step: {
    marginBottom: 12
  },
  headerDescription: {
    marginTop: 16,
    marginBottom: 19
  },
  meeting: {
    width: '100%',
    height: 850,
    border: 'none'
  }
});
