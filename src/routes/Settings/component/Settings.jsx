import React from 'react';
import PropTypes from 'prop-types';
import { Link, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CHANGE_PASSWORD_PATH } from 'constants/paths';
import BackgroundPaper from 'components/BackgroundPaper';
import FormGenerator from 'components/FormGenerator';
import Fields from './Settings.fields';

const useStyles = makeStyles({
  divider: {
    margin: '16px 0'
  }
});

const Settings = ({
  onSubmit,
  profile: { disableTextNotifications, disableEmailNotifications }
}) => {
  const classes = useStyles();
  return (
    <BackgroundPaper>
      <FormGenerator
        title="Settings"
        onSubmit={onSubmit}
        fields={Fields}
        initialValues={{
          disableEmailNotifications: disableEmailNotifications || false,
          disableTextNotifications: disableTextNotifications || false
        }}
      />
      <Divider className={classes.divider} />
      <Link href={CHANGE_PASSWORD_PATH} color="textSecondary">
        Change Password
      </Link>
    </BackgroundPaper>
  );
};
Settings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  profile: PropTypes.shape({})
};

export default Settings;
