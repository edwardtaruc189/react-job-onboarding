import React from 'react';
import PropTypes from 'prop-types';
import BackgroundPaper from 'components/BackgroundPaper';
import defaultUserImageUrl from 'static/User.png';
import Form from '../Form';
import breadcrumbsCreator from 'components/BreadCrumbs';

function View({ avatarUrl, uid, profile, classes, query, history }) {
  const bcArr = [
    {
      label: 'Home',
      link: '/home'
    },
    {
      label: 'Job Creator'
    }
  ];

  const containerStyles = { width: 'calc(100% - 40px)', margin: '0 0 -10px 0' };
  const breadCrumbs = breadcrumbsCreator(bcArr, history, containerStyles);

  return (
    <BackgroundPaper className={classes.pane}>
      {breadCrumbs}
      <div className={classes.settings}>
        <div className={classes.meta}>
          <Form
            userImg={
              <img
                className={classes.avatarCurrent}
                src={avatarUrl || defaultUserImageUrl}
                alt=""
              />
            }
            account={profile}
            query={query}
            uid={uid}
            history={history}
          />
        </div>
      </div>
    </BackgroundPaper>
  );
}

View.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  avatarUrl: PropTypes.string,
  profile: PropTypes.object
};

export default View;
