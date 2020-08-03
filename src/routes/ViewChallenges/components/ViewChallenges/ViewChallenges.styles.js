export default theme => ({
  section: {
    ...theme.flexColumnCenter,
    marginTop: 12
  },
  pane: {
    ...theme.flexColumnCenter,
    justifyContent: 'space-around',
    flexBasis: '60%',
    padding: theme.spacing(6),
    marginTop: 20
  },
  editor: {
    width: '100% !important'
  },
  form: {
    margin: '12px 0px',
    width: '100%'
  }
});
