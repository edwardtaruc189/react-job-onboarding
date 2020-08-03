export default theme => ({
  root: {
    ...theme.flexRowCenter,
    width: '100%',
    height: '100%',
    paddingTop: '1.5rem',
    flexDirection: 'column',
    alignItems: 'center'
  },
  pane: {
    ...theme.flexColumnCenter,
    justifyContent: 'space-around'
  },
  paper: {
    height: 500,
    margin: '20px auto',
    width: 500,
    padding: '20px 40px',

    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  settings: {
    ...theme.flexRowCenter,
    width: 'calc(100% - 40px)'
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
    marginBottom: '3rem',
    marginTop: '1rem'
  },
  block: {},
  interviewBlock: { marginBottom: 20 },
  fieldData: {
    marginBottom: 20,
    marginRight: 8
  },
  messagesOuter: {
    width: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'flex-start'
  },
  messagesInner: {
    padding: '0 20px',
    flex: 1
  },
  date: {
    flex: 0,
    flexBasis: 150,
    width: 100,
    textAlign: 'right'
  },
  innerCloseVerbiage: {
    display: 'block',
    margin: '0 auto 20px auto',
    textAlign: 'center'
  },
  closedBlock: {
    color: '#333',
    backgroundColor: '#eee',
    padding: '20px 20px 20px 20px',
    borderRadius: 5,
    marginTop: 20
  },
  chatBlock: { padding: '20px 0 20px 0' },
  progressWrapper: {
    display: 'flex',
    backgroundColor: '#ccc',
    marginBottom: 20
  },
  progressStepper: {
    flex: 1,
    color: 'white'
  },
  currentProgress: {
    backgroundColor: '#aaa',
    cursor: 'initial'
  },
  description: {
    whiteSpace: 'pre-wrap'
  }
});
