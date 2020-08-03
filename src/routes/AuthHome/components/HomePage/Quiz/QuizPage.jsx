import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Radio,
  Card,
  Button,
  Typography,
  Divider,
  LinearProgress
} from '@material-ui/core';
import useStyles from './QuizPage.styles';

const QuizForm = ({ onSubmit, questionsObject }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [error, setError] = useState(false);
  const [currentVal, setCurrentVal] = useState(null);
  const [answers, setAnswers] = useState({});
  const maxQuestions = questionsObject.length;
  const classes = useStyles();

  useEffect(() => {
    if (error) setError(false);
    setCurrentVal(null);
  }, [pageNumber]);

  useEffect(() => {
    if (Object.keys(answers).length === maxQuestions) onSubmit(answers);
  }, [answers]);

  const handleSubmit = name => {
    if (currentVal === null) {
      setError(true);
      return;
    }

    if (pageNumber + 1 < maxQuestions) setPageNumber(pageNumber + 1);
    setAnswers({ ...answers, [name]: currentVal });
  };

  const { name, title, choices } = questionsObject[pageNumber];
  return (
    <FormControl error={error} className={classes.form}>
      <Divider className={classes.divider} />
      <FormLabel>{`Question ${pageNumber + 1} of ${maxQuestions}`}</FormLabel>
      <Typography variant="h6">{title}</Typography>
      <FormGroup
        aria-label={title}
        name={name}
        value={currentVal}
        onChange={({ target: { value } }) => setCurrentVal(value)}
      >
        {choices.map(({ text, value }) => {
          const checked = currentVal === value;
          return (
            <Card
              className={classNames(classes.answer, {
                [classes.selected]: checked
              })}
              elevation={2}
              onClick={() => setCurrentVal(value)}
            >
              <FormControlLabel
                key={`answer-choice-${value}`}
                value={value}
                label={text}
                checked={checked}
                control={
                  <Radio
                    className={checked ? classes.selected : ''}
                    color="primary"
                  />
                }
              />
            </Card>
          );
        })}
      </FormGroup>
      <FormHelperText className={classes.errorText}>
        {error && 'You must select an answer before moving on'}
      </FormHelperText>
      <Button
        className={classes.submit}
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => handleSubmit(name)}
      >
        {pageNumber === maxQuestions - 1 ? 'Submit Quiz' : 'Next Question'}
      </Button>
      <LinearProgress
        value={(pageNumber / maxQuestions) * 100}
        variant="determinate"
      />
    </FormControl>
  );
};

export default QuizForm;

QuizForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  questionsObject: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired
};
