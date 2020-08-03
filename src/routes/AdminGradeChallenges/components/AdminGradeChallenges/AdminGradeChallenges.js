import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider
} from '@material-ui/core';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import 'brace/theme/terminal';
import CandidateLevels from 'constants/candidateLevel';
import BackgroundPaper from 'components/BackgroundPaper';
import AcceptPopUp from 'components/AcceptPopUp';

function ViewChallenge({
  gradeChallenge,
  candidateChallenges,
  classes,
  profile,
  failChallenge
}) {
  const [challenge, setChallenge] = useState('');
  const [level, setLevel] = useState('');
  const [codeReview, setCodeReview] = useState(null);

  return (
    <BackgroundPaper className={classes.pane}>
      <div>
        <div className={classes.section}>
          <Typography variant="h2">
            {profile.firstName ? (
              <>
                {profile.firstName} {profile.lastName}
              </>
            ) : (
              profile.email
            )}
          </Typography>
          <Divider />
          <Typography variant="h5">
            Current Level: {profile.level ? profile.level : 'No Level Assigned'}
          </Typography>

          {profile.hasOwnProperty('resume') && (
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">
              View Candidate Resume
            </a>
          )}
        </div>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="candidate-challenge">
            Select candidate challenge:{' '}
          </InputLabel>
          <Select
            value={challenge}
            variant="filled"
            onChange={({ target: { value } }) => {
              setChallenge(value);

              const review = candidateChallenges.find(
                ({ key }) => key === value
              );
              setCodeReview(review ? review.value.code : null);
            }}
            name="candidate-challenge"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {candidateChallenges &&
              candidateChallenges.map(
                ({
                  key,
                  value: {
                    challenge: { name },
                    graded,
                    shallPass
                  }
                }) => (
                  <MenuItem value={key}>
                    {name}
                    {graded && (shallPass ? ' (Passed)' : ' (Failed)')}
                  </MenuItem>
                )
              )}
          </Select>
        </FormControl>
        {challenge && (
          <>
            <AceEditor
              className={classes.editor}
              value={codeReview}
              mode="jsx"
              theme="terminal"
              onChange={setCodeReview}
              name="code-review"
              editorProps={{ $blockScrolling: true }}
            />
            <FormControl className={classes.form}>
              <InputLabel htmlFor="candidate-level">
                Select level of candidate:{' '}
              </InputLabel>
              <Select
                value={level}
                variant="filled"
                onChange={({ target: { value } }) => {
                  setLevel(value);
                }}
                name="candidate-level"
              >
                {CandidateLevels.map(v => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              gradeChallenge({
                key: challenge,
                code: codeReview,
                level
              });
            }}
            disabled={!level}
          >
            Pass Candidate
          </Button>
          <AcceptPopUp
            color="secondary"
            onClose={() => failChallenge({ key: challenge })}
            buttonLabel="Fail Candidate"
            message={`Are you sure you want to fail this candidate? ${level &&
              `You currently have the ${level} level selected.`}`}
            disabled={!challenge}
          />
        </div>
      </div>
    </BackgroundPaper>
  );
}

ViewChallenge.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ViewChallenge;
