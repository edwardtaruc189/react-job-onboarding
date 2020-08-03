/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  Hidden
} from '@material-ui/core';
import ProviderDataForm from '../ProviderDataForm';
import SkillsForm from '../SkillsForm';
import FormFields from './AccountForm.fields';
import FormGenerator from 'components/FormGenerator';
import { FileInput } from 'services/uploadToS3';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function AccountForm({ account, onSubmit, classes }) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Hidden smDown>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab value={0} label="My Account" {...a11yProps(0)} />
            <Tab value={1} label="About" {...a11yProps(1)} />
            {(account.role === 'candidate' || account.role === 'admin') && (
              <Tab value={2} label="Skills" {...a11yProps(2)} />
            )}
            {(account.role === 'candidate' || account.role === 'admin') && (
              <Tab value={3} label="Preferences" {...a11yProps(3)} />
            )}
          </Tabs>
        </Hidden>
        <Hidden mdUp>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="My Account" {...a11yProps(0)} />
            <Tab label="About" {...a11yProps(1)} />
            {(account.role === 'candidate' || account.role === 'admin') && (
              <Tab label="Skills" {...a11yProps(2)} />
            )}
            {(account.role === 'candidate' || account.role === 'admin') && (
              <Tab label="Preferences" {...a11yProps(3)} />
            )}
          </Tabs>
        </Hidden>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FormGenerator
          title="Account"
          fields={FormFields.AccountFields}
          onSubmit={onSubmit}
          initialValues={account}
        />
        {!!account && !!account.providerData && (
          <div>
            <h4>Linked Accounts</h4>
            <ProviderDataForm providerData={account.providerData} />
          </div>
        )}
      </TabPanel>

      {account.role === 'company' && (
        <React.Fragment>
          <TabPanel value={value} index={1}>
            <FormGenerator
              title="About"
              fields={FormFields.CompanyAboutFields}
              onSubmit={onSubmit}
              initialValues={account}
            />
            <FormControl variant="outlined" fullWidth>
              <Typography variant="caption">Company Logo</Typography>
              <FileInput
                id="companyLogo"
                classes={classes}
                accept="image/png, image/jpeg, image/jpg, image/svg"
                savePath="Company-Logos"
                successText="Uploaded Company Logo"
                handleSubmit={companyLogo => {
                  const data = { ...account, companyLogo };
                  onSubmit(data);
                }}
              />
            </FormControl>
          </TabPanel>
        </React.Fragment>
      )}

      {(account.role === 'candidate' || account.role === 'admin') && (
        <React.Fragment>
          <TabPanel value={value} index={1}>
            <FormGenerator
              title="About"
              fields={FormFields.CandidateAboutFields}
              onSubmit={onSubmit}
              initialValues={account}
            />
            <FormControl variant="outlined" fullWidth>
              <Typography variant="caption">My Resume</Typography>
              <FileInput
                id="myResume"
                classes={classes}
                accept="application/pdf,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
                handleSubmit={resume => onSubmit({ ...account, resume })}
                multiple
              />
            </FormControl>
            {account.resume && (
              <a
                target="_blank"
                href={account.resume}
                style={{ color: '#333', marginBottom: 10 }}
              >
                View Uploaded Resume
              </a>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SkillsForm onSubmit={onSubmit} initialValues={account} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <FormGenerator
              title="Preferences"
              fields={FormFields.CandidatePreferencesFields}
              onSubmit={onSubmit}
              initialValues={account}
            />
          </TabPanel>
        </React.Fragment>
      )}
    </div>
  );
}

AccountForm.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  onSubmit: PropTypes.func.isRequired // from enhancer (reduxForm)
};

export default AccountForm;
