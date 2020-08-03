export default () => ({
  flex: {
    flexGrow: 1
  },
  logo: {
    display: 'block',
    width: 115,
    height: 50,
    background:
      'url(data:image/png;base64,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) no-repeat left center',
    backgroundSize: 'cover'
  },
  button: {
    textTransform: 'capitalize',
    color: 'white',
    textDecoration: 'none',
    alignSelf: 'center'
  }
});
