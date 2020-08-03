export default theme => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 0 24px 0',
    color: '#9e9e9e',
    marginTop: 'auto'
  },
  footerSection: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    color: '#fff',
    lineHeight: '36px',
    textAlign: 'center'
  },
  list: {
    display: 'flex',
    flexFlow: 'row nowrap',
    listStyle: 'none',
    padding: 0,
    margin: '0 0 0 -15px',
    lineHeight: '36px'
  },
  links: {
    color: 'inherit',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    margin: '0px 0px 0px 12px'
  }
});
