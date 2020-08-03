import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
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
import BackgroundPaper from 'components/BackgroundPaper';

function ViewChallenge({ candidateChallenges, classes, profile }) {
  const [challenge, setChallenge] = useState('');
  const [code, setCode] = useState(null);

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

              const targetChallenge = candidateChallenges
                ? candidateChallenges.find(({ key }) => key === value)
                : null;
              setCode(targetChallenge ? targetChallenge.value.code : null);
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
                    challenge: { name }
                  }
                }) => <MenuItem value={key}>{name}</MenuItem>
              )}
          </Select>
        </FormControl>
        {challenge && (
          <AceEditor
            className={classes.editor}
            value={code}
            mode="jsx"
            theme="terminal"
            name="code-view"
            editorProps={{ $blockScrolling: true }}
          />
        )}
      </div>
    </BackgroundPaper>
  );
}

ViewChallenge.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ViewChallenge;
