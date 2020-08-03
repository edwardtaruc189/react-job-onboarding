import React from 'react';
import { Typography } from '@material-ui/core';

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <div className={classes.footerSection}>
      <ul className={classes.list}>
        <li>
          <a className={classes.links} href="mailto: anthony@hiredbyreact.com" target="_blank" rel="noopener noreferrer">
            Contact Us
          </a>
        </li>
        <li>
          <a
            className={classes.links}
            href="mailto: anthony@hiredbyreact.com?subject='Feedback'"
            target="_blank"
            rel="noopener noreferrer"
          >
            Feedback
          </a>
        </li>
      </ul>
    </div>
    <div className={classes.footerSection}>
      <Typography variant="caption">Copyright &copy; {new Date().getFullYear()} HiredByReact</Typography>
    </div>
  </footer>
);

export default Footer;
