import React, { Fragment } from 'react';
import { Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import BackgroundPaper from 'components/BackgroundPaper';
import jobStatus from 'constants/jobStatus';
import JobRow from './JobRow';

const companyDashboard = ({ classes, activeConnections, profile, goToJobCentral, goToRoute, users, closeJob }) => {
  const jobs = profile.jobs ? Object.values(profile.jobs).filter(({ status }) => status !== jobStatus.CLOSED) : [];

  return (
    <BackgroundPaper className="flex-row-center" square={false}>
      <Box>
        {jobs.length > 0 ? (
          <Fragment>
            <Typography variant="h4">Dashboard</Typography>
            <Box className={classes.body}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Position name</TableCell>
                    <TableCell align="right">Potential Matches</TableCell>
                    <TableCell align="right">Actively Interviewing</TableCell>
                    <TableCell align="right" />
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(profile.jobs)
                    .filter(([_, { status }]) => status && status !== 'CLOSED')
                    .map(([key, { name, minimumSalary, maximumSalary, yearsExperience }]) => {
                      const potentialMatches = users
                        ? Object.entries(users).filter(([key, user]) => {
                            const { desiredSalary, shallPass } = user;

                            if (!shallPass) {
                              return false;
                            }

                            const minSalary = minimumSalary ? parseInt(minimumSalary) < parseInt(desiredSalary) : true;
                            const maxSalary = maximumSalary ? parseInt(maximumSalary) > parseInt(desiredSalary) : true;
                            const salaryInRange = minSalary && maxSalary;

                            const yearsMatch = yearsExperience ? yearsExperience <= user.yearsExperience : true;

                            return salaryInRange && yearsMatch;
                          }).length
                        : 0;

                      const activeMatches =
                        activeConnections && Array.isArray(activeConnections)
                          ? activeConnections.filter(connection => connection.key.indexOf(key) !== -1).length
                          : 0;
                      return (
                        <JobRow
                          jobId={key}
                          onJobClick={() => goToRoute(`/JobManager?id=${key}`)}
                          onEditClick={() => goToRoute(`/JobCentral?id=${key}`)}
                          onCloseClick={closeJob}
                          positionName={name}
                          potentialMatches={potentialMatches}
                          activeInterviews={activeMatches}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
            {profile.companyName ? (
              <Button variant="contained" size="large" color="primary" onClick={goToJobCentral}>
                Visit Job Central
              </Button>
            ) : (
              <Box component="div" className={classes.captionArea}>
                <Typography variant="body1" className={classes.captionText}>
                  Oops... it looks like we're missing some info about your company. Please fill out your company's profile in
                  order to create job postings.
                </Typography>
                <Button variant="contained" size="large" color="primary" onClick={() => goToRoute('/account')}>
                  Complete company profile
                </Button>
              </Box>
            )}
          </Fragment>
        ) : profile.companyName ? (
          <Fragment>
            <Typography variant="h4">Dashboard</Typography>
            <Box component="div" className={classes.captionArea}>
              <Typography variant="body1" className={classes.captionText}>
                Hmm, it looks like you haven't posted any jobs yet. Please click the button below to add your first job.
              </Typography>
              <Button variant="contained" size="large" color="primary" onClick={goToJobCentral}>
                Visit Job Central
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Typography variant="h4">Dashboard</Typography>
            <Box component="div" className={classes.captionArea}>
              <Typography variant="body1" className={classes.captionText}>
                Oops, it looks like you need to fill out your company's profile before you can post a job.
              </Typography>
              <Button variant="contained" size="large" color="primary" onClick={() => goToRoute('/account')}>
                Visit Profile
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>
    </BackgroundPaper>
  );
};

export default companyDashboard;
