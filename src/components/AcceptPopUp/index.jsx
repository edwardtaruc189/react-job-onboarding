import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fade
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 200,
    margin: 'auto',
    outline: 0,
    padding: 16
  },
  modal: {
    display: 'flex'
  },
  actions: {
    justifyContent: 'center'
  }
});

const AcceptPopUp = ({
  onClose,
  buttonLabel,
  message,
  variant,
  color,
  fullWidth,
  size,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dropOnButtonProps = {
    variant,
    color,
    ...props
  };

  return (
    <Fragment>
      <Button
        onClick={() => setOpen(true)}
        fullWidth={fullWidth}
        size={size}
        {...dropOnButtonProps}
      >
        {buttonLabel}
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onBackdropClick={() => setOpen(false)}
      >
        <Fade in={open}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body1">{message}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
                {...dropOnButtonProps}
              >
                Accept
              </Button>
              <Button variant={variant} onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default AcceptPopUp;

AcceptPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

AcceptPopUp.defaultProps = {
  onClose: () => {},
  buttonLabel: 'Close',
  message: '',
  variant: 'contained',
  color: 'primary',
  fullWidth: false,
  size: 'medium'
};
