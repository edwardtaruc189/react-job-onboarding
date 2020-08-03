export default theme => ({
  section: {
    ...theme.flexColumnCenter
  },
  missingProfileItems: {
    marginTop: 20
  },
  body: {
    margin: '20px 0'
  },
  locationSpan: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 110
  },
  header: {
    marginBottom: 20
  },
  profileButton: {
    marginTop: 10
  },
  companyName: {
    '&:hover, &:focus': {
      color: '#0f6fff'
    }
  },
  notify: {
    padding: 20,
    margin: '0 -20px 20px -20px',
    border: 'thin solid #EEE'
  }
});
