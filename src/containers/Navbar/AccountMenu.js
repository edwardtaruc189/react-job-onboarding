import React from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuItem, IconButton, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  menu: {
    left: 'auto',
    maxWidth: 200
  },
  buttonRoot: {
    color: 'white'
  }
});

function AccountMenu({
  profile,
  goToAccount,
  goToAdmin,
  goToHome,
  goToAvailability,
  onLogoutClick,
  closeAccountMenu,
  anchorEl,
  handleMenu
}) {
  const classes = useStyles();

  return (
    <Box
      component="div"
      display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
    >
      <IconButton
        aria-owns={anchorEl ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={handleMenu}
        classes={{ root: classes.buttonRoot }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={closeAccountMenu}
      >
        <MenuItem onClick={goToHome}>Home</MenuItem>
        {profile.role === 'admin' && (
          <MenuItem onClick={goToAdmin}>Admin</MenuItem>
        )}
        <MenuItem onClick={goToAccount}>Profile</MenuItem>
        {profile.role !== 'company' && (
          <MenuItem onClick={goToAvailability}>Availability</MenuItem>
        )}
        <MenuItem onClick={onLogoutClick}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
}

AccountMenu.propTypes = {
  profile: PropTypes.object.isRequired, // from enhancer (withStyles)
  goToAccount: PropTypes.func.isRequired,
  goToAdmin: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  closeAccountMenu: PropTypes.func.isRequired,
  handleMenu: PropTypes.func.isRequired,
  anchorEl: PropTypes.object
};

export default AccountMenu;
