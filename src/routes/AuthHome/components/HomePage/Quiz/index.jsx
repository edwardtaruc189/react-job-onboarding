import React, { useState } from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import QuizForm from './QuizPage';
import LoadingSpinner from 'components/LoadingSpinner';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  captionArea: {
    background: '#EEE',
    padding: '48px 0',
    textAlign: 'center'
  },
  captionText: {
    width: '70%',
    margin: '0 auto 16px auto'
  },
  list: {
    textAlign: 'left'
  },
  createQuiz: {
    marginTop: '20px'
  }
});

function onSubmit(answers, key, questions, handleSubmit) {
  //Write results into database
  const answeredQuestions = questions.map(question => ({
    submittedAnswer: answers[question.name] || '',
    ...question
  }));

  handleSubmit(key, {
    questions: answeredQuestions,
    incomplete: false
  });
}

const Quiz = ({ handleCreate, handleSubmit, incompleteQuiz }) => {
  const [beginQuiz, setBeginQuiz] = useState(incompleteQuiz ? true : false);
  const classes = useStyles();

  return (
    <>
      <h1>The Quiz</h1>
      {beginQuiz && incompleteQuiz && !incompleteQuiz.value.questions && (
        <LoadingSpinner />
      )}
      {!beginQuiz && (
        <Box component="div" className={classes.captionArea}>
          <Typography variant="h4">The Quiz</Typography>
          <Typography variant="body1" className={classes.captionText}>
            Below you will find the list of rules for taking this assessment
            <ul className={classes.list}>
              <li>
                No tab hopping - please remain remain in this tab as you
                complete the assessment.
              </li>
              <li>
                No Cheating - please be sure that you and only you are
                completing this assessment.
              </li>
            </ul>
          </Typography>
          <Box component="div" className={classes.createQuiz}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                if (!incompleteQuiz) handleCreate({ incomplete: true });
                setBeginQuiz(true);
              }}
            >
              Begin Quiz
            </Button>
          </Box>
        </Box>
      )}
      {beginQuiz && incompleteQuiz && incompleteQuiz.value.questions && (
        <QuizForm
          questionsObject={incompleteQuiz.value.questions}
          onSubmit={answers =>
            onSubmit(
              answers,
              incompleteQuiz.key,
              incompleteQuiz.value.questions,
              handleSubmit
            )
          }
        />
      )}
    </>
  );
};

export default Quiz;
