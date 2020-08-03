import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Link } from '@material-ui/core';
import AcceptPopUp from 'components/AcceptPopUp';

const JobRow = ({
  jobId,
  onJobClick,
  onEditClick,
  onCloseClick,
  positionName,
  potentialMatches,
  activeInterviews,
  onSites
}) => (
  <TableRow key={positionName}>
    <TableCell component="th" scope="row">
      <Link onClick={onJobClick}>{positionName}</Link>
    </TableCell>
    <TableCell align="right">{potentialMatches}</TableCell>
    <TableCell align="right">{activeInterviews}</TableCell>
    <TableCell align="right">
      <Link onClick={onEditClick}>Edit</Link>
    </TableCell>
    <TableCell>
      <AcceptPopUp
        size="small"
        color="secondary"
        buttonLabel="Close Job"
        message="Are you sure you want to close this job? This action cannot
              be undone."
        onClose={() => onCloseClick(jobId)}
      />
    </TableCell>
  </TableRow>
);

export default JobRow;

JobRow.propTypes = {
  jobId: PropTypes.string.isRequired,
  onJobClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  positionName: PropTypes.string.isRequired,
  potentialMatches: PropTypes.string.isRequired,
  phoneInterviews: PropTypes.string.isRequired,
  onSites: PropTypes.string.isRequired
};
