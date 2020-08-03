import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PhoneIcon from '@material-ui/icons/Phone';
import CodeIcon from '@material-ui/icons/Code';
import VideocamIcon from '@material-ui/icons/Videocam';
import CardTravelIcon from '@material-ui/icons/CardTravel';

const CandidateView = ({ classes, companyProfile, connectionData }) => {
  if (companyProfile) {
    const { interviews } = connectionData;
    const {
      companyDescription,
      companyName,
      companySize,
      companyStage,
      industry,
      location,
      website
    } = companyProfile;
    const myInterviews = interviews ? Object.entries(interviews) : [];
    return (
      <>
        <Box component="div" className={classes.block}>
          <Typography variant="h4" className={classes.fieldData}>
            {companyName}
          </Typography>
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.fieldData}
              >
                Visit Website
              </Button>
            </a>
          )}
          <Box component="div" className={classes.fieldData}>
            {companySize && <Chip label={companySize} />}
            {companyStage && <Chip label={companyStage} />}
            {industry && <Chip label={industry} />}
            {location && <Chip label={location} />}
          </Box>
          <Box component="div">
            <Typography
              variant="body2"
              className={classNames(classes.fieldData, classes.description)}
            >
              {companyDescription}
            </Typography>
          </Box>
        </Box>
        <Box component="div" className={classes.settings}>
          <Box component="div" className={classes.block}>
            <List className={classes.root}>
              {myInterviews.length > 0 && (
                <Box component="div">
                  <Typography variant="h6">Interviews</Typography>
                  {myInterviews.map(([key, value]) => {
                    const {
                      start,
                      end,
                      interviewMethod,
                      interviewTime
                    } = value;
                    const getString = dt => new Date(dt).toLocaleString();
                    let Icon = PhoneIcon;
                    switch (interviewMethod) {
                      case 'Coding Exercise':
                        Icon = CodeIcon;
                        break;
                      case 'Video':
                        Icon = VideocamIcon;
                        break;
                      case 'On-site':
                        Icon = CardTravelIcon;
                        break;
                      default:
                        Icon = PhoneIcon;
                        break;
                    }
                    return (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Icon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={interviewMethod}
                          secondary={
                            <>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                              >
                                {getString(start)} - {getString(end)}
                              </Typography>
                              <Typography
                                component="p"
                                variant="caption"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                Duration: {interviewTime} minutes
                              </Typography>
                              <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => key}
                              >
                                Accept
                              </Button>
                            </>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </Box>
              )}
            </List>
          </Box>
        </Box>
      </>
    );
  }
  return <Typography variant="body1">Loading...</Typography>;
};

export default CandidateView;

CandidateView.propTypes = {
  classes: PropTypes.shape({}),
  companyProfile: PropTypes.shape({
    companyDescription: PropTypes.string,
    companyName: PropTypes.string,
    companySize: PropTypes.string,
    companyStage: PropTypes.string,
    industry: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string
  }).isRequired
};
