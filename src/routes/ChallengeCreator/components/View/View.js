import React from 'react';
import PropTypes from 'prop-types';
import BackgroundPaper from 'components/BackgroundPaper';
import Form from '../Form';
import breadcrumbsCreator from 'components/BreadCrumbs';

function View({ avatarUrl, createChallenge, profile, classes, query, history }) {
  const bcArr = [
    {
      label: 'Home',
      link: '/home'
    },
    {
      label: 'Challenge Creator'
    }
  ];

  const containerStyles = { width: 'calc(100% - 40px)', margin: '0 0 -10px 0' };

  const breadCrumbs = breadcrumbsCreator(bcArr, history, containerStyles);

  return (
    <BackgroundPaper className={classes.pane}>
      {breadCrumbs}
      <div className={classes.settings}>
        <div className={classes.meta}>
          <Form onSubmit={createChallenge} account={profile} query={query} />
        </div>
      </div>
    </BackgroundPaper>
  );
}

View.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  updateAccount: PropTypes.func.isRequired, // from enhancer (withHandlers)
  avatarUrl: PropTypes.string,
  profile: PropTypes.object
};

export default View;
