export default theme => ({
  pane: {
    width: '100%'
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
  stageHeader: {
    textAlign: 'center',
    margin: 20
  },
  meta: {
    ...theme.flexColumnCenter,
    marginTop: '1rem',
    width: '100%'
  },
  mobileTabs: {
    flexDirection: 'column'
  },
  mobileTabHeader: {},
  tabHeader: {
    // fontSize: '0.6vw'
  },
  outerCandidateContainer: {
    padding: 20,
    marginBottom: 5,
    backgroundColor: '#EEE',
    textAlign: 'center',
    width: '100%',
    '&:hover': {
      backgroundColor: '#DDD'
    }
  }
});
