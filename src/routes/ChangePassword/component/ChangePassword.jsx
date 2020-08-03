import React from 'react';
import PropTypes from 'prop-types';
import BackgroundPaper from 'components/BackgroundPaper';
import FormGenerator from 'components/FormGenerator';
import Fields from './ChangePassword.fields';
import breadcrumbsCreator from 'components/BreadCrumbs';

const ChangePassword = ({ onSubmit, history }) => {
  const bcArr = [
    {
      label: 'Settings',
      link: '/settings'
    },
    {
      label: 'Change Password'
    }
  ];

  const containerStyles = { width: 'calc(100% - 10px)', margin: '0 0 10px 0' };

  const breadCrumbs = breadcrumbsCreator(bcArr, history, containerStyles);

  return (
    <BackgroundPaper>
      {breadCrumbs}
      <FormGenerator
        title="Change Password"
        onSubmit={onSubmit}
        fields={Fields}
      />
    </BackgroundPaper>
  );
};

ChangePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ChangePassword;
