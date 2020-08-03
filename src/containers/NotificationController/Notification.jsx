import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    width: '100%',
    padding: 16,
    background: '#558b2f',
    bottom: 0,
    zIndex: 2,
    position: 'fixed'
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    maxWidth: 760,
    margin: 'auto'
  },
  message: {}
});

const Notification = ({ notificationId, message, buttonText, onClose }) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
    onClose(notificationId);
  };

  return (
    <Fade in={open}>
      <Box className={classes.container}>
        <div className={classes.innerContainer}>
          <Typography
            className={classes.message}
            variant="body1"
            color="inherit"
          >
            {message}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            {buttonText}
          </Button>
        </div>
      </Box>
    </Fade>
  );
};

Notification.propTypes = {
  notificationId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

Notification.defaultProps = {
  variant: 'info'
};

export default Notification;
