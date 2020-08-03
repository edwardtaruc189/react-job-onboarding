import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'containers/Navbar';
import Footer from 'containers/Footer';
import NoticeController from 'containers/NotificationController';
import { Notifications } from 'modules/notification';

function CoreLayout({ children, classes }) {
  return (
    <div className={classes.container}>
      <Navbar />
      <NoticeController />
      <div className={classes.children}>
        {children}
        <Footer />
      </div>
      <Notifications />
    </div>
  );
}

CoreLayout.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  children: PropTypes.element.isRequired
};

export default CoreLayout;
