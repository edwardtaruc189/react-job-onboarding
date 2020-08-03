/* eslint-disable no-extend-native */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Box,
  Chip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import timeslotter from 'time-slotter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import normallizeTime from './normallizeTime';
import Modal from 'components/ReusableModal';
import Stepper from 'components/Stepper';
import interviewTypes from 'constants/interviewTypes';
import interviewTimes from 'constants/interviewTimes';

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};

const getTIme = time => `${time.getHours().pad(2)}:${time.getMinutes().pad(2)}`;

const CompanyView = ({
  classes,
  userProfile,
  addInterview,
  query,
  userUid
}) => {
  const [interviewTime, setInterviewTime] = React.useState(0);
  const [interviewMethod, setInterviewMethod] = React.useState(null);
  const [interviewInfo, setInterviewInfo] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedSubIndex, setSelectedSubIndex] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState(null);

  let availableDays = {};

  function handleListItemClick(index, subIndex) {
    setSelectedIndex(index);
    setSelectedSubIndex(subIndex);
  }

  if (userProfile) {
    const { availability } = userProfile;

    if (availability) {
      for (let i = 0; i < availability.length; i++) {
        const { start, end } = availability[i];
        const startTime = new Date(start);
        const endTime = new Date(end);

        const slotDate = startTime.toLocaleDateString();

        if (!availableDays.hasOwnProperty(slotDate)) {
          availableDays[slotDate] = [];
        }

        if (interviewTime) {
          availableDays[slotDate] = [
            ...availableDays[slotDate],
            ...timeslotter(getTIme(startTime), getTIme(endTime), interviewTime)
          ];
        }
      }
    }

    const {
      currentLocation,
      firstName,
      lastName,
      programmingLanguages,
      resume,
      searchStatus,
      yearsExperience
    } = userProfile;

    return (
      <>
        <Box component="div" className={classes.block}>
          <Typography variant="h4" className={classes.fieldData}>
            {firstName} {lastName}
          </Typography>
          {resume && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.fieldData}
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.fieldData}
            href={`/ViewChallenges?uid=${userUid}`}
          >
            Candidate Challenges
          </Button>
          <Box component="div" className={classes.fieldData}>
            {searchStatus && <Chip label={searchStatus} />}
            {currentLocation && <Chip label={currentLocation} />}
            {yearsExperience && (
              <Chip
                label={`${yearsExperience} year(s) professional experience`}
              />
            )}
            {programmingLanguages &&
              programmingLanguages.map(({ experience, language }) => (
                <Chip
                  key={language}
                  label={`${language} - ${experience} level of experience`}
                />
              ))}
          </Box>
        </Box>
        <Box component="div" className={classes.interviewBlock}>
          <Modal buttonLabel="Schedule Interview">
            <Stepper
              handleSubmit={() =>
                addInterview({
                  jobId: query,
                  interviewTime,
                  interviewMethod,
                  interviewInfo,
                  start: new Date(
                    `${selectedDate} ${
                      availableDays[selectedDate][selectedSubIndex][0]
                    }`
                  ).getTime(),
                  end: new Date(
                    `${selectedDate} ${
                      availableDays[selectedDate][selectedSubIndex][1]
                    }`
                  ).getTime()
                })
              }
              stepperData={[
                {
                  label: 'How long would you like this interview to last?',
                  content: (
                    <Box component="div" className={classes.settings}>
                      <Box component="div" className={classes.block}>
                        <Typography variant="h5">
                          Time slot selection
                        </Typography>

                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                        >
                          <FormLabel component="legend">
                            Interview Length
                          </FormLabel>
                          <RadioGroup
                            aria-label="interviewTime"
                            name="interviewTime"
                            value={interviewTime}
                            onChange={({ target: { value } }) => {
                              setInterviewTime(Number(value));
                              setInterviewMethod(null);
                              setInterviewInfo(null);
                            }}
                          >
                            {interviewTimes.map(method => (
                              <FormControlLabel
                                value={method}
                                control={<Radio />}
                                label={method}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  )
                },
                {
                  label: 'Select a time slot',
                  content: (
                    <Box component="div" className={classes.settings}>
                      <Box component="div" className={classes.block}>
                        <Typography variant="h5">
                          Time slot selection
                        </Typography>

                        {Object.entries(availableDays).map(
                          ([key, value], j) => (
                            <ExpansionPanel>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography className={classes.heading}>
                                  {key}
                                </Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                <List
                                  component="nav"
                                  aria-label="main mailbox folders"
                                >
                                  {value.map(([start, end], k) => {
                                    const id = `${key}-${normallizeTime(
                                      start
                                    )}-${normallizeTime(end)}`;
                                    return (
                                      <ListItem
                                        key={id}
                                        id={id}
                                        button
                                        selected={selectedIndex === id}
                                        onClick={() => {
                                          handleListItemClick(id, k);
                                          setSelectedDate(key);
                                        }}
                                      >
                                        <ListItemText
                                          primary={`${normallizeTime(
                                            start
                                          )} - ${normallizeTime(end)}`}
                                        />
                                      </ListItem>
                                    );
                                  })}
                                </List>
                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                          )
                        )}
                      </Box>
                    </Box>
                  )
                },
                {
                  label: 'Please provide the interview method',
                  content: (
                    <Box component="div" className={classes.settings}>
                      <Box component="div" className={classes.block}>
                        <Typography variant="h5">
                          Method of interview
                        </Typography>
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                        >
                          <FormLabel component="legend">
                            Interview Method
                          </FormLabel>
                          <RadioGroup
                            aria-label="interviewMethod"
                            name="interviewMethod"
                            onChange={({ target: { value } }) => {
                              setInterviewMethod(value);
                              setInterviewInfo(null);
                            }}
                          >
                            {interviewTypes.map(method => (
                              <FormControlLabel
                                value={method}
                                control={<Radio />}
                                label={method}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                        {interviewMethod === interviewTypes[0] && (
                          <TextField
                            fullWidth
                            name="interviewInfo"
                            variant="outlined"
                            label="Coding Exercise Link"
                            type="url"
                            className={classes.textField}
                            value={interviewInfo}
                            onChange={({ target: { value } }) =>
                              setInterviewInfo(value)
                            }
                            margin="normal"
                          />
                        )}
                        {interviewMethod === interviewTypes[1] && (
                          <TextField
                            fullWidth
                            name="interviewInfo"
                            variant="outlined"
                            label="Interviewer Phone Number"
                            type="tel"
                            className={classes.textField}
                            value={interviewInfo}
                            onChange={({ target: { value } }) =>
                              setInterviewInfo(value)
                            }
                            margin="normal"
                          />
                        )}
                        {interviewMethod === interviewTypes[2] && (
                          <TextField
                            fullWidth
                            name="interviewInfo"
                            variant="outlined"
                            label="Video Interview Link"
                            type="url"
                            className={classes.textField}
                            value={interviewInfo}
                            onChange={({ target: { value } }) =>
                              setInterviewInfo(value)
                            }
                            margin="normal"
                          />
                        )}
                        {interviewMethod === interviewTypes[3] && (
                          <TextField
                            fullWidth
                            name="interviewInfo"
                            variant="outlined"
                            label="On-site interview details"
                            multiline
                            rows="2"
                            className={classes.textField}
                            value={interviewInfo}
                            onChange={({ target: { value } }) =>
                              setInterviewInfo(value)
                            }
                            margin="normal"
                          />
                        )}
                      </Box>
                    </Box>
                  )
                },
                {
                  label: 'Review',
                  content: (
                    <Box component="div" className={classes.settings}>
                      <Box component="div" className={classes.block}>
                        <Typography variant="h5">Review</Typography>
                        {interviewMethod && interviewTime && selectedDate && (
                          <>
                            <Typography>
                              {interviewMethod} Via {interviewInfo}
                            </Typography>
                            <Typography>
                              {new Date(
                                `${selectedDate} ${
                                  availableDays[selectedDate][
                                    selectedSubIndex
                                  ][0]
                                }`
                              ).toLocaleString() +
                                ' - ' +
                                new Date(
                                  `${selectedDate} ${
                                    availableDays[selectedDate][
                                      selectedSubIndex
                                    ][1]
                                  }`
                                ).toLocaleString()}
                            </Typography>
                            <Typography>
                              Duration: {interviewTime} Minutes
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  )
                }
              ]}
            />
          </Modal>
        </Box>
      </>
    );
  }
  return <Typography variant="body1">Loading...</Typography>;
};

export default CompanyView;

CompanyView.propTypes = {
  classes: PropTypes.shape({}),
  userProfile: PropTypes.shape({
    currentLocation: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    programmingLanguages: PropTypes.arrayOf(
      PropTypes.shape({
        experience: PropTypes.string,
        language: PropTypes.string
      })
    ),
    resume: PropTypes.string,
    searchStatus: PropTypes.string,
    yearsExperience: PropTypes.number
  }).isRequired
};
