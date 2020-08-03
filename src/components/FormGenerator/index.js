/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useField } from 'react-final-form-hooks';
import { Button, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    '& > button': {
      marginLeft: 8
    }
  },
  FormContent: {
    width: '100%',
    padding: '16px 0px 8px 0px'
  }
});

const FormGenerator = ({
  onSubmit,
  fields,
  title,
  initialValues,
  validate,
  formDescription
}) => {
  const classes = useStyles();
  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit,
    validate,
    initialValues
  });

  const states = {};
  fields.forEach(({ name }) => {
    states[name] = useField(name, form);
  });

  return (
    <form className={classes.FormContainer} onSubmit={handleSubmit}>
      {title && (
        <Typography className={classes.FormTitle} variant="h4">
          {title}
        </Typography>
      )}

      <Divider />
      {formDescription && (
        <Typography variant="body1">{formDescription}</Typography>
      )}
      <div className={classes.FormContent}>
        {fields.map(({ name, Component, validate, ...others }) => {
          const { input, meta } = states[name];
          return <Component key={name} input={input} meta={meta} {...others} />;
        })}

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
            disabled={pristine || submitting}
          >
            {submitting ? 'Submiting' : 'Submit'}
          </Button>
        </span>
      </div>
    </form>
  );
};

FormGenerator.propTypes = {
  title: PropTypes.string,
  formDescription: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      Component: PropTypes.elementType.isRequired,
      validate: PropTypes.func,
      password: PropTypes.bool
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired
};

FormGenerator.defaultProps = {
  validate: () => ({})
};

export default FormGenerator;
