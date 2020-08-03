/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography, Link } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import People from '@material-ui/icons/People';
import BackgroundPaper from 'components/BackgroundPaper';

function ViewCompanyProfile({ classes, profile }) {
  const {
    companyName,
    companyDescription,
    companySize,
    companyStage,
    companyLogo,
    industry,
    location,
    website
  } = profile;

  return (
    <BackgroundPaper>
      {companyLogo && (
        <div className={classes.companyLogo}>
          <img src={companyLogo} alt="Company logo" />
        </div>
      )}
      {companyName && <Typography variant="h2">{companyName}</Typography>}
      <div className={classes.section}>
        {location && (
          <Typography className={classes.detail} variant="subtitle1">
            <LocationOn />
            {location}
          </Typography>
        )}
        {companySize && (
          <Typography className={classes.detail} variant="subtitle1">
            <People /> {companySize} employees
          </Typography>
        )}
      </div>
      {website && (
        <Link
          className={classes.detail}
          variant="subtitle1"
          href={website}
          target="_blank"
          rel="noopener"
        >
          {website}
        </Link>
      )}
      {industry && (
        <Typography className={classes.detail} variant="subtitle1">
          {industry}
        </Typography>
      )}
      {companyStage && (
        <Typography className={classes.detail} variant="subtitle1">
          Funding: {companyStage}
        </Typography>
      )}
      <Divider />
      {companyDescription && (
        <p className={classes.textArea}>{companyDescription}</p>
      )}
    </BackgroundPaper>
  );
}

ViewCompanyProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ViewCompanyProfile;
