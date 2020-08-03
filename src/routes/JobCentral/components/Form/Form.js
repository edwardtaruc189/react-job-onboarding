/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import FormGenerator from 'components/FormGenerator';
import fields from './Form.fields';

function Form({ account, handleSubmit, query }) {
  const onSubmit = entry => handleSubmit(query, entry);
  let mode = 'Create';

  if (account.hasOwnProperty('jobs') && account.jobs.hasOwnProperty(query)) {
    mode = 'Edit';
  }

  if (!account.hasOwnProperty('jobs')) {
    account.jobs = { [query]: {} };
  }

  return (
    <FormGenerator
      title={`${mode} Job`}
      fields={fields}
      onSubmit={onSubmit}
      initialValues={{ remotePosition: 'Yes' }}
    />
  );
}

Form.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
};

export default Form;
