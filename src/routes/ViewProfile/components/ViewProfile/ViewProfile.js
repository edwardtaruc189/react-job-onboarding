/* eslint-disable react/jsx-no-target-blank */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import BackgroundPaper from 'components/BackgroundPaper';
import defaultUserImageUrl from 'static/User.png';

function Home({
  classes,
  authExists,
  history,
  profile,
  connectedUserWithCompany
}) {
  const [showInfo, displayUserInfo] = useState(false);

  const showCandidateContactInfo = () => {
    displayUserInfo(true);
  };

  return (
    <BackgroundPaper className={classes.pane}>
      <div className={'flex-row-center'}>
        <div className={classes.section}>
          <img
            className={classes.avatarCurrent}
            src={profile.avatarUrl ? profile.avatarUrl : defaultUserImageUrl}
            alt=""
          />
        </div>
        <div className={classes.section} />
        <div className={classes.section}>
          {profile.firstName && (
            <Typography variant="h2">
              {profile.firstName} {profile.lastName}
            </Typography>
          )}

          {profile.hasOwnProperty('resume') && (
            <a href={profile.resume} target="_blank">
              View Candidate Resume
            </a>
          )}
        </div>
        <div className={classes.section}>
          <div>
            <h4>Interested in pursuing this candidate?</h4>
            <span>
              Click on the button below in order to proceed with this candidate.
            </span>
          </div>
          {showInfo ? (
            <div className={classes.info}>
              <Typography variant="h3">Contact Info</Typography>
              {profile.phoneNumber && (
                <Typography>Phone: {profile.phoneNumber}</Typography>
              )}
              {profile.email && <Typography>Email: {profile.email}</Typography>}
            </div>
          ) : (
            <Button
              className={classes.contactBtn}
              variant="contained"
              color="primary"
              onClick={() => showCandidateContactInfo(true)}
            >
              Connect with candidate
            </Button>
          )}
        </div>
      </div>
    </BackgroundPaper>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
};

export default Home;
