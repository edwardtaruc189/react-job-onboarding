import { makeStyles } from '@material-ui/styles';
import theme from 'theme';

const useStyles = makeStyles({
  form: {
    width: '100%',
    justifyContent: 'center'
  },
  submit: {
    marginLeft: 'auto',
    marginBottom: 16
  },
  errorText: {
    margin: '32px 0px 8px 0px',
    textAlign: 'end'
  },
  answer: {
    margin: 8,
    cursor: 'pointer',
    padding: 8
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: 'white !important',
    '&> label > span': {
      color: 'white'
    }
  },
  divider: {
    marginBottom: 16
  }
});

export default useStyles;
