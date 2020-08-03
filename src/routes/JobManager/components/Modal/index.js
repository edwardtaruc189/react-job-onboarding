import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button, TextField, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const TransitionsModal = ({ children, onSubmit }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [salary, setSalary] = useState(0);
  const [equity, setEquity] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (error) return;

    const submitObj = { message, salary, equity };
    setOpen(false);
    setMessage('');
    setSalary(0);
    onSubmit(submitObj);
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>
        Next steps
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Next steps</h2>
            <p id="transition-modal-description">
              Great! It looks like you'd like to move to next steps with this candidate. Please fill out the form below to start
              the process with them.
            </p>
            <TextField
              variant="outlined"
              label="Salary"
              value={salary}
              placeholder="Example: 100000 "
              onChange={({ target: { value } }) => setSalary(value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              type="number"
              name="salary"
            />
            <TextField
              variant="outlined"
              label="Equity"
              value={equity}
              error={error}
              helperText={error ? 'Value must be in range 0-100%' : ''}
              placeholder="Up to 100%"
              onChange={({ target: { value } }) => {
                setEquity(value);
                if (value > 100 || value < 0) setError(true);
                else if (error) setError(false);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              type="number"
              name="equity"
            />
            <TextField
              rows="2"
              variant="outlined"
              label="Message to candidate"
              fullWidth
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              multiline
              name="message"
            />
            <Button disabled={error} color="primary" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
