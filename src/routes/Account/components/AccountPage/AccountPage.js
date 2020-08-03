import React from 'react';
import PropTypes from 'prop-types';
import defaultUserImageUrl from 'static/User.png';
import BackgroundPaper from 'components/BackgroundPaper';
import AccountForm from '../AccountForm';
import breadcrumbsCreator from 'components/BreadCrumbs';

function AccountPage({ avatarUrl, updateAccount, profile, classes, history }) {
  const bcArr = [
    {
      label: 'Home',
      link: '/home'
    },
    {
      label: 'Profile'
    }
  ];

  const containerStyles = { width: 'calc(100% - 10px)', margin: '0 0 10px 0' };

  const breadCrumbs = breadcrumbsCreator(bcArr, history, containerStyles);

  return (
    <BackgroundPaper className={classes.pane}>
      <div className={classes.settings}>
        <div className={classes.meta}>
          {breadCrumbs}
          <AccountForm
            userImg={
              <img
                className={classes.avatarCurrent}
                src={avatarUrl || defaultUserImageUrl}
                alt=""
              />
            }
            onSubmit={updateAccount}
            account={profile}
          />
        </div>
      </div>
    </BackgroundPaper>
  );
}

AccountPage.propTypes = {
  classes: PropTypes.object.isRequired,
  updateAccount: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  profile: PropTypes.object
};

export default AccountPage;
