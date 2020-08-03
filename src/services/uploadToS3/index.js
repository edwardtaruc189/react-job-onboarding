/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, Typography } from '@material-ui/core';
import config from '../s3-config';
import { uploadFile } from 'react-s3';

const uploadToS3 = (file, handleSubmit, savePath) =>
  uploadFile(file, config(savePath))
    .then(({ location }) => handleSubmit(location))
    .catch(err => console.error(err));

export default uploadToS3;

const FileInput = ({
  id,
  classes,
  handleSubmit,
  accept,
  savePath,
  label,
  multiple,
  successText
}) => {
  const [didUpload, fileChange] = useState(false);
  return (
    <FormControl style={{ minWidth: 180 }}>
      <span>
        <input
          accept={accept}
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          onChange={({ target }) => {
            fileChange(true);
            uploadToS3(target['files'][0], handleSubmit, savePath);
          }}
          multiple={multiple}
          type="file"
        />
        <Button
          id={id}
          htmlFor="raised-button-file"
          variant="contained"
          color="secondary"
          component="label"
          className={classes.button}
          style={{ marginBottom: 5 }}
        >
          {label}
        </Button>
      </span>
      {didUpload && <Typography variant="caption">{successText}</Typography>}
    </FormControl>
  );
};

export { FileInput };

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
  accept: PropTypes.string,
  savePath: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  successText: PropTypes.string
};

FileInput.defaultProps = {
  accept: 'image/*',
  savePath: 'Resumes',
  label: 'Upload',
  multiple: false,
  successText: 'Successfully Uploaded Resume'
};
