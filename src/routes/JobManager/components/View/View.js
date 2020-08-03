/* eslint-disable react/jsx-no-target-blank */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  AppBar,
  Tabs,
  Typography,
  Tab,
  Box,
  Hidden,
  Chip
} from '@material-ui/core';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import BackgroundPaper from 'components/BackgroundPaper';
import Modal from '../Modal';

import matchWeights from 'constants/matchWeights';
import hiringStages from 'constants/hiringStages';
import breadcrumbsCreator from 'components/BreadCrumbs';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const panelStyles = {
    width: '100%'
  };
  return (
    <Typography
      style={panelStyles}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function View({ profile, affiliatedConnections, addConnection, classes, jobID, history, users, uid, goToRoute }) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const bcArr = [
    {
      label: 'Home',
      link: '/home'
    },
    {
      label: 'Job Manager'
    }
  ];

  const containerStyles = { width: 'calc(100% - 30px)', margin: '0' };

  const breadCrumbs = breadcrumbsCreator(bcArr, history, containerStyles);
  const mappedUsers = users
    ? Object.keys(users).map(key => {
        const profileData = users[key];
        const { experience, salary, resume } = matchWeights;
        const candidateExperience =
          profileData && !isNaN(profileData.yearsExperience) ? Number(profileData.yearsExperience) : 0;
        const reqExperience = profile && profile.jobs[jobID] ? Number(profile.jobs[jobID].yearsExperience) : 0;

        let match =
          candidateExperience >= reqExperience ? experience : Number(candidateExperience / reqExperience) * experience;

        const candidateSalary = profileData && !isNaN(profileData.desiredSalary) ? Number(profileData.desiredSalary) : 0;
        const reqMaxSalary = profile && profile.jobs[jobID] ? Number(profile.jobs[jobID].maximumSalary) : 0;

        match += candidateSalary <= reqMaxSalary ? salary : Number(reqMaxSalary / candidateSalary) * salary;

        const candidateResume = profileData && profileData.resume ? resume : 0;
        match += candidateResume;

        return { ...users[key], key, match };
      })
    : [];
  const usersInProcess = affiliatedConnections ? affiliatedConnections.map(({ key }) => key.split('_')[1]) : [];
  const candidatesNotInProcess = mappedUsers
    .filter(({ key }) => usersInProcess.indexOf(key) === -1)
    .filter(({ shallPass }) => shallPass)
    .filter(({ role }) => role !== 'company')
    .filter(({ firstName }) => firstName);

  const renderCandidateTableData = (
    { key, firstName, lastName, yearsExperience, currentLocation, desiredSalary, resume, match },
    inProcess
  ) => ({
    name: `${firstName} ${lastName}`,
    experience: yearsExperience || 0,
    location: currentLocation || 'Not specified',
    salary: desiredSalary || null,
    match,
    resume: resume ? (
      <a href={resume} target="_blank">
        <Button variant="text" size="small">
          View Resume
        </Button>
      </a>
    ) : (
      'Not Specified'
    ),
    action: inProcess ? (
      <Button variant="contained" color="primary" size="small" onClick={() => goToRoute(`JobDashboard?id=${key}`)}>
        View Connection
      </Button>
    ) : (
      <Modal onSubmit={data => addConnection(jobID, key, uid, data)} />
    )
  });

  const renderCandidate = (
    { key, firstName, lastName, yearsExperience, currentLocation, desiredSalary, resume },
    inProcess
  ) => (
    <TableRow key={key}>
      <TableCell component="th" scope="row">
        <a href={value === 0 ? `/viewprofile?uid=${key}` : `JobDashboard?id=${key}`}>
          {firstName} {lastName}
        </a>
      </TableCell>
      <TableCell align="right">{yearsExperience || 'Not specified'}</TableCell>
      <TableCell align="right">{currentLocation || 'Not specified'}</TableCell>
      <TableCell align="right">{desiredSalary ? '$' + desiredSalary : 'Not specified'}</TableCell>
      <TableCell align="right">
        {resume ? (
          <a href={resume} target="_blank">
            <Button variant="text">View Resume</Button>
          </a>
        ) : (
          'Not Specified'
        )}
      </TableCell>
      <TableCell>
        {inProcess ? (
          <Button variant="contained" color="primary" size="small" onClick={() => goToRoute(`JobDashboard?id=${key}`)}>
            View Connection
          </Button>
        ) : (
          <Modal onSubmit={data => addConnection(jobID, key, uid, data)} />
        )}
      </TableCell>
    </TableRow>
  );

  const renderCandidateForMobile = (
    { match, key, firstName, lastName, yearsExperience, currentLocation, desiredSalary, resume },
    inProcess
  ) => (
    <div key={key} className={classes.outerCandidateContainer}>
      <Typography variant="h5">
        {firstName} {lastName} <Chip color="primary" label={`${match}% match`} />
      </Typography>
      <Typography>Experience (Years): {yearsExperience || 'Not specified'}</Typography>
      <Typography>Location: {currentLocation || 'Not specified'}</Typography>
      <Typography>Desired salary ($): {desiredSalary ? '$' + desiredSalary : 'Not specified'}</Typography>
      <Box component="p">
        <Typography>Resume: </Typography>
        {resume ? (
          <a href={resume} target="_blank">
            <Button variant="text">View Resume</Button>
          </a>
        ) : (
          'Not Specified'
        )}
      </Box>
      {inProcess ? (
        <Button variant="contained" color="primary" size="large" onClick={() => goToRoute(`JobDashboard?id=${key}`)}>
          View Connection
        </Button>
      ) : (
        <Modal onSubmit={data => addConnection(jobID, key, uid, data)} />
      )}
    </div>
  );

  const noCandidatesInStep = (
    <TableRow>
      <TableCell align="center" colSpan="6">
        No candidates currently in this phase.
      </TableCell>
    </TableRow>
  );

  const noCandidatesInStepWithTable = (
    <Table>
      <TableBody>{noCandidatesInStep}</TableBody>
    </Table>
  );

  return (
    <BackgroundPaper>
      {breadCrumbs}
      <div className={classes.settings}>
        <div className={classes.meta}>
          <AppBar position="static">
            <Hidden mdUp>
              <Tabs value={value} onChange={handleChange} orientation="vertical">
                <Tab className={classes.mobileTabHeader} label={'CANDIDATES'} {...a11yProps(0)} />
                {hiringStages.map((stage, index) => (
                  <Tab className={classes.mobileTabHeader} label={stage} {...a11yProps(index + 1)} />
                ))}
              </Tabs>
            </Hidden>
            <Hidden smDown>
              <Tabs value={value} onChange={handleChange}>
                <Tab className={classes.tabHeader} label={'CANDIDATES'} {...a11yProps(0)} />
                {hiringStages.map((stage, index) => (
                  <Tab className={classes.tabHeader} label={stage} {...a11yProps(index + 1)} />
                ))}
              </Tabs>
            </Hidden>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Hidden mdUp>
              {candidatesNotInProcess.length > 0
                ? candidatesNotInProcess.map(candidateProfile => renderCandidateForMobile(candidateProfile, false))
                : noCandidatesInStepWithTable}
            </Hidden>
            <Hidden smDown>
              <MaterialTable
                icons={tableIcons}
                title="Potential Candidates"
                columns={[
                  { title: 'Name', field: 'name' },
                  { title: 'Experience', field: 'experience' },
                  { title: 'Location', field: 'location' },
                  {
                    title: 'Desired Salary ($)',
                    field: 'salary',
                    type: 'currency'
                  },
                  {
                    title: 'Match %',
                    field: 'match',
                    type: 'numeric'
                  },
                  {
                    title: 'Resume',
                    field: 'resume'
                  },
                  {
                    title: 'Action',
                    field: 'action'
                  }
                ]}
                data={
                  candidatesNotInProcess.length > 0
                    ? candidatesNotInProcess.map(candidateProfile => renderCandidateTableData(candidateProfile, false))
                    : noCandidatesInStep
                }
              />
            </Hidden>
          </TabPanel>
          {hiringStages.map((stage, index) => {
            const phaseUsers = affiliatedConnections
              .map(({ key, value }) => ({
                ...value,
                key,
                user: mappedUsers.find(user => user.key === key.split('_')[1])
              }))
              .filter(({ status }) => status === stage);
            return (
              <>
                <TabPanel key={stage} value={value} index={index + 1} className={classes.panel}>
                  <Typography variant="h5" className={classes.stageHeader}>
                    Stage: {stage.replace('_', ' ')}
                  </Typography>
                  <Hidden mdUp>
                    {phaseUsers.length
                      ? phaseUsers.map(({ salary, key, user }) =>
                          renderCandidateForMobile({ ...user, key, desiredSalary: salary }, true)
                        )
                      : noCandidatesInStepWithTable}
                  </Hidden>
                  <Hidden smDown>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Candidate</TableCell>
                          <TableCell align="right">Experience</TableCell>
                          <TableCell align="right">Location</TableCell>
                          <TableCell align="right">Salary Offered</TableCell>
                          <TableCell align="right">Resume</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {phaseUsers.length
                          ? phaseUsers.map(({ salary, key, user }) =>
                              renderCandidate({ ...user, key, desiredSalary: salary }, true)
                            )
                          : noCandidatesInStep}
                      </TableBody>
                    </Table>
                  </Hidden>
                </TabPanel>
              </>
            );
          })}
        </div>
      </div>
    </BackgroundPaper>
  );
}

View.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  updateAccount: PropTypes.func.isRequired, // from enhancer (withHandlers)
  avatarUrl: PropTypes.string,
  profile: PropTypes.object
};

export default View;
