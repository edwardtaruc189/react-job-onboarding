import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, Button, Box, AppBar, Typography } from '@material-ui/core';
import AccountMenu from './AccountMenu';
import LoginMenu from './LoginMenu';
import { SETTINGS_PAGE_PATH, AUTH_PATH } from 'constants/paths';

function Navbar({
  profile,
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  goToHome,
  goToAdmin,
  goToAvailability,
  goToRoute,
  handleLogout,
  closeAccountMenu,
  anchorEl,
  handleMenu,
  classes
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.flex}
          component={Link}
          to={authExists ? AUTH_PATH : '/'}
        >
          <span className={classes.logo} />
        </Typography>
        {authExists && (
          <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => goToRoute('/home')}
            >
              Home
            </Button>

            {profile.role === 'admin' && (
              <Button
                className={classes.button}
                color="inherit"
                onClick={goToAdmin}
              >
                Admin
              </Button>
            )}
            <Button
              className={classes.button}
              color="inherit"
              onClick={goToAccount}
            >
              Profile
            </Button>
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => goToRoute(SETTINGS_PAGE_PATH)}
            >
              Settings
            </Button>
            {profile.role === 'candidate' && (
              <Button
                className={classes.button}
                color="inherit"
                onClick={goToAvailability}
              >
                Availability
              </Button>
            )}
            <Button
              className={classes.button}
              color="inherit"
              onClick={handleLogout}
            >
              Sign out
            </Button>
          </Box>
        )}

        {authExists ? (
          <AccountMenu
            profile={profile}
            goToAdmin={goToAdmin}
            goToAvailability={goToAvailability}
            goToHome={goToHome}
            avatarUrl={avatarUrl}
            displayName={displayName}
            onLogoutClick={handleLogout}
            goToAccount={goToAccount}
            closeAccountMenu={closeAccountMenu}
            handleMenu={handleMenu}
            anchorEl={anchorEl}
          />
        ) : (
          <LoginMenu />
        )}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  goToAdmin: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  closeAccountMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  handleMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  anchorEl: PropTypes.object // from enhancer (withStateHandlers - handleMenu)
};

export default Navbar;
