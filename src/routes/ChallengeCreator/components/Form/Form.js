/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Typography, TextField } from '@material-ui/core';

import CKEditor from 'react-ckeditor-component';

function Form({ account, onSubmit, profile, pristine, classes, query }) {
  const [name, setName] = useState();
  const [body, setBody] = useState();

  let mode = 'Create';

  if (account.hasOwnProperty('jobs') && account.jobs.hasOwnProperty(query)) {
    mode = 'Edit';
  }

  if (!account.hasOwnProperty('jobs')) {
    account.jobs = { [query]: {} };
  }

  // function updateContent(newContent) {
  //   setBody(newContent);
  // }

  function onChange(evt) {
    const newContent = evt.editor.getData();

    setBody(newContent);
  }

  function onBlur(evt) {
    const newContent = evt.editor.getData();

    setBody(newContent);
  }

  function afterPaste(evt) {
    const newContent = evt.editor.getData();

    setBody(newContent);
  }

  return (
    <form
      className={classes.root}
      onSubmit={e => {
        e.preventDefault();
        const data = {
          name,
          body
        };
        // console.log('Values: ', data);
        onSubmit(data);
      }}
    >
      <Typography variant="h4" className={classes.subHeader}>
        {mode} Challenge
      </Typography>
      <Box component="div" className={classes.fields}>
        <TextField
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          required
          name="name"
          fullWidth
          label="Challenge Name"
        />
        <CKEditor
          activeClass="p10"
          content={body}
          events={{
            blur: onBlur,
            afterPaste: afterPaste,
            change: onChange
          }}
        />
      </Box>

      <Button variant="contained" color="primary" type="submit" size="large">
        Save
      </Button>
    </form>
  );
}

Form.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired // from enhancer (reduxForm)
};

export default Form;
