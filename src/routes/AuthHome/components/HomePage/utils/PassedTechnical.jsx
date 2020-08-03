import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Collapse
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  modal: { display: 'flex' },
  card: {
    maxWidth: 600,
    margin: 'auto',
    overflow: 'auto'
  },
  paragraph: {
    marginBottom: 12
  },
  button: {
    '&:hover,&:focus': {
      color: '#0f6fff'
    }
  }
});

const PassedTechnical = ({ onClose }) => {
  const [open, setOpen] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();
  const close = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onBackdropClick={close}
      onEscapeKeyDown={close}
    >
      <Card className={classes.card}>
        <CardHeader
          title="Ready to be hired?"
          action={
            <IconButton onClick={close}>
              <Close />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body1" className={classes.paragraph}>
            Congratulations, you passed the technical assessment! Your profile
            will be advertised to companies on the platform and interested
            parties will begin sending you interview requests!
          </Typography>
          <Typography variant="body1">
            Help us match you with your future job by filling out your profile.
            We try our best to only send you companies that you would be
            interested in.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            href="/account"
            size="small"
            onClick={close}
          >
            Go to Profile
          </Button>
          <Button
            className={classes.button}
            size="small"
            color="seconday"
            onClick={() => setShowMore(true)}
          >
            Interested in working with us?
          </Button>
        </CardActions>
        <Collapse in={showMore}>
          <CardContent>
            <Typography variant="body1">
              In the future we may have openings for full time or part time work
              to help make our platform better. Keep an eye out!
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Modal>
  );
};

PassedTechnical.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default PassedTechnical;
