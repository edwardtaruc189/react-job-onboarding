export default theme => ({
  pane: {
    ...theme.flexColumnCenter,
    justifyContent: 'space-around'
  },
  settings: {
    ...theme.flexRowCenter,
    width: '100%'
  },
  avatarCurrent: {
    width: '100%',
    maxWidth: '13rem',
    marginTop: '3rem',
    height: 'auto',
    cursor: 'pointer'
  },
  meta: {
    ...theme.flexColumnCenter,
    flexBasis: '100%',
    marginTop: '1rem'
  }
});
