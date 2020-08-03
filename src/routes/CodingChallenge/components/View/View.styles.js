export default theme => ({
  section: {
    ...theme.flexColumnCenter,
    marginTop: 10
  },
  pane: {
    ...theme.flexColumnCenter,
    justifyContent: 'space-around',
    flexBasis: '60%',
    padding: theme.spacing(6),
    marginTop: 20
  },
  settings: {
    ...theme.flexRowCenter
  },
  info: {
    border: 'thin solid lightblue',
    padding: 20,
    marginTop: 10,
    width: '100%'
  },
  contactBtn: {
    marginTop: 10
  }
});
