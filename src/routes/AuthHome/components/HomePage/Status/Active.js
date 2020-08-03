import React from 'react';
import { Typography, Box, Button, Chip, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { parseSalary, PassedTechnical } from '../utils';

const useStyles = makeStyles({
  captionArea: {
    background: '#EEE',
    padding: '48px 0',
    textAlign: 'center'
  },
  captionText: {
    width: '70%',
    margin: '16px auto'
  },
  whiteArea: {
    background: '#fff',
    padding: '100px 0',
    textAlign: 'center'
  },
  jobOffer: {
    padding: '20px 20px 0 20px',
    border: 'thin solid #EEE'
  },
  closedJobs: {
    background: '#EEE',
    padding: '20px 20px 10px 20px',
    border: 'thin solid #EEE',
    textAlign: 'center'
  },
  positionInfoContainer: {
    margin: '20px 0'
  },
  closedPositionInfoContainer: {
    margin: '10px 0'
  },
  positionInfo: {
    '& > button': {
      margin: '0px 16px 0px 0px'
    }
  },
  positionLineItem: {
    marginBottom: 5
  },
  closedPositionLineItem: {
    marginBottom: 4
  },
  icon: {
    margin: '0px 8px 0px 0px',
    fontSize: 'inherit'
  },
  chip: {
    maxWidth: 164,
    '& > span > span': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: 140
    }
  }
});

const Active = ({
  deactivateSearch,
  connections,
  users,
  onSubmit,
  onReject,
  goToRoute,
  seenTechnicalMessage,
  viewMessage
}) => {
  const mappedConnections = connections ? connections : [];
  const openJobs = mappedConnections.filter(
    ({ status }) => status !== 'CLOSED'
  );
  const closedJobs = mappedConnections.filter(
    ({ status }) => status === 'CLOSED'
  );

  const classes = useStyles();

  return (
    <Box component="div">
      {!seenTechnicalMessage && <PassedTechnical onClose={viewMessage} />}
      <Box component="div" className={classes.captionArea}>
        <Typography variant="h4">Welcome to our platform</Typography>
        <Typography variant="body1" className={classes.captionText}>
          Your interview progress with companies will be auto-magically appear
          below
        </Typography>
      </Box>
      {!mappedConnections.length && (
        <Box component="div" className={classes.whiteArea}>
          <FontAwesomeIcon
            style={{ fontSize: 100 }}
            icon={faExclamationTriangle}
          />
          <Typography variant="h6" className={classes.captionText}>
            Sit tight. Company connections are incoming!
          </Typography>
        </Box>
      )}
      {mappedConnections && (
        <Box>
          {users &&
            openJobs.map(
              ({ key, agreedToInterview, salary, position, createdBy }) => {
                const {
                  companyName,
                  companySize,
                  companyStage,
                  industry,
                  location,
                  jobs
                } = users[createdBy];
                const { name, remote } = jobs[position];

                return (
                  <Box key={key} component="div" className={classes.jobOffer}>
                    <Box component="div" className={classes.companyInfo}>
                      <Box component="div" className={classes.jobLineItem}>
                        <Link
                          variant="h6"
                          color="textPrimary"
                          href={`/viewCompanyProfile?uid=${createdBy}`}
                          className={classes.companyName}
                        >
                          {companyName}
                        </Link>
                      </Box>
                      <Typography variant="body1">
                        <b>{name}</b> · ${parseSalary(salary)}
                      </Typography>
                      <Box component="div" className={classes.jobLineItem}>
                        <Chip className={classes.chip} label={companySize} />
                        <Chip className={classes.chip} label={companyStage} />
                        <Chip className={classes.chip} label={industry} />
                        <Chip
                          className={classes.chip}
                          label={
                            <span className={classes.locationSpan}>
                              <FontAwesomeIcon
                                className={classes.icon}
                                icon={faMapMarkerAlt}
                              />
                              {remote ? 'Remote offered' : location}
                            </span>
                          }
                        />
                      </Box>
                    </Box>
                    <Box
                      component="div"
                      className={classes.positionInfoContainer}
                    >
                      <Box component="div" className={classes.positionInfo}>
                        {agreedToInterview ? (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => goToRoute(`JobDashboard?id=${key}`)}
                          >
                            Visit Job Dashboard
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => onReject(key)}
                            >
                              Not Interested
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => onSubmit(key)}
                            >
                              I'm Interested
                            </Button>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              }
            )}
        </Box>
      )}
      {closedJobs && closedJobs.length > 0 && (
        <Box component="center" className={classes.closedJobs}>
          <Typography variant="h4">Closed positions</Typography>
          {users &&
            closedJobs.map(({ position, createdBy }) => {
              const { companyName, jobs } = users[createdBy];
              const { name } = jobs[position];

              return (
                <Box
                  component="center"
                  className={classes.closedPositionInfoContainer}
                >
                  <Typography
                    variant="body1"
                    className={classes.closedPositionLineItem}
                  >
                    {companyName} - {name}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      )}

      <Box component="div" className={classes.whiteArea}>
        <Typography variant="h4">Found an opportunity already?</Typography>
        <Typography variant="body1" className={classes.captionText}>
          Click the button below to deactivate your search
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={deactivateSearch}
        >
          Deactivate Search
        </Button>
      </Box>
    </Box>
  );
};

export default Active;
