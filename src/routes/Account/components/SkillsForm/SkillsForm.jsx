/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import {
  Button,
  Typography,
  Divider,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LanguageTextField, SkillToggle } from './utils';

const useStyles = makeStyles({
  FormContainer: {
    width: '100%'
  },
  FormTitle: {
    marginBottom: '16px'
  },
  FormButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
    '& > button': {
      marginLeft: 8
    }
  },
  FormContent: {
    width: '100%',
    padding: '16px 0px 8px 0px'
  }
});

const SkillsForm = ({ onSubmit, initialValues }) => {
  const classes = useStyles();

  return (
    <Form
      className={classes.FormContainer}
      onSubmit={onSubmit}
      mutators={arrayMutators}
      initialValues={initialValues}
      render={({
        handleSubmit,
        form: {
          mutators: { push }
        },
        pristine,
        form,
        submitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography className={classes.FormTitle} variant="h4">
            Programming Languages
          </Typography>
          <Divider />
          <div className={classes.FormContent}>
            <LanguageTextField
              addField={entry =>
                push('programmingLanguages', {
                  language: entry,
                  experience: 'Beginner'
                })
              }
            />
            <FieldArray name="programmingLanguages">
              {({ fields }) =>
                fields.map((name, index) => (
                  <ListItem>
                    <Field
                      name={`${name}.language`}
                      component={({ input: { value } }) => (
                        <ListItemText
                          primaryTypographyProps={{ variant: 'body1' }}
                        >
                          {value}
                        </ListItemText>
                      )}
                    />
                    <Field
                      name={`${name}.experience`}
                      component={({ input: { value, onChange } }) => (
                        <SkillToggle
                          value={value}
                          onChange={onChange}
                          onClose={() => fields.remove(index)}
                        />
                      )}
                    />
                  </ListItem>
                ))
              }
            </FieldArray>

            <span className={classes.FormButtonContainer}>
              {!pristine && (
                <Button
                  variant="contained"
                  onClick={() => form.reset(initialValues)}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting || pristine}
              >
                {submitting ? 'Submitting' : 'Submit'}
              </Button>
            </span>
          </div>
        </form>
      )}
    />
  );
};

SkillsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SkillsForm;
