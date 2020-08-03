import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Box, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import style from './BackgroundPaper.styles';

const BackgroundPaper = ({
  classes,
  className,
  children,
  BoxProps,
  PaperProps
}) => (
  <Box
    className={classNames(classes.box, className)}
    component="div"
    {...BoxProps}
  >
    <Paper className={classes.paper} {...PaperProps}>
      {children}
    </Paper>
  </Box>
);

export default withStyles(style)(BackgroundPaper);

BackgroundPaper.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  BoxProps: PropTypes.shape({}),
  PaperProps: PropTypes.shape({})
};

BackgroundPaper.defaultProps = {
  className: '',
  BoxProps: {},
  PaperProps: {}
};
