/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, TextField, Avatar } from '@material-ui/core';
import moment from 'moment';
import BackgroundPaper from 'components/BackgroundPaper';
import breadcrumbsCreator from 'components/BreadCrumbs';
import AcceptPopUp from 'components/AcceptPopUp';
import jobStatus from 'constants/jobStatus';
import hiringStages from 'constants/hiringStages';
import { CandidateView, CompanyView } from '../utils';

function View({
  addMessage,
  addInterview,
  classes,
  query,
  history,
  connectionData,
  userUid,
  userProfile,
  companyProfile,
  uid,
  updateConnection,
  closeConnection
}) {
  const bcArr = [
    {
      label: 'Home',
      link: '/home'
    },
    {
      label: 'Job Dashboard'
    }
  ];

  const containerStyles = { width: 'calc(100% - 40px)', margin: '0 0 10px 0' };
  const breadCrumbs = breadcrumbsCreator(bcArr, history, containerStyles);
  const isCompany = connectionData ? connectionData.createdBy === uid : false;
  const [message, setMessage] = useState('');

  const renderStepper = (step, i) => {
    const isCurrentStep = connectionData.status === step;
    return (
      <Button
        key={step}
        variant="link"
        className={[
          classes.progressStepper,
          isCurrentStep ? classes.currentProgress : null
        ]}
        onClick={() =>
          !isCurrentStep &&
          (i === hiringStages.length - 1
            ? closeConnection(query, uid)
            : updateConnection(query, step))
        }
      >
        {step}
      </Button>
    );
  };

  return (
    <BackgroundPaper className={classes.pane}>
      {breadCrumbs}

      {isCompany && (
        <Box component="div" className={classes.progressWrapper}>
          {hiringStages.map((step, i) => renderStepper(step, i))}
        </Box>
      )}

      {isCompany === true ? (
        <CompanyView
          addInterview={addInterview}
          query={query}
          classes={classes}
          userProfile={userProfile}
          userUid={userUid}
        />
      ) : (
        <CandidateView
          connectionData={connectionData}
          classes={classes}
          companyProfile={companyProfile}
        />
      )}
      {connectionData && connectionData.status !== jobStatus.CLOSED && (
        <Box component="div" className={classes.chatBlock}>
          <Typography variant="body2">
            Chat with{' '}
            <strong>
              {isCompany
                ? userProfile &&
                  `${userProfile.firstName} ${userProfile.lastName}`
                : companyProfile && companyProfile.companyName}
            </strong>
          </Typography>
          <TextField
            onChange={({ target: { value } }) => setMessage(value)}
            value={message}
            name="message"
            placeholder="Message"
            multiline
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setMessage('');
              return addMessage({
                jobId: query,
                messageBody: message,
                senderId: uid
              });
            }}
          >
            Send Message
          </Button>
        </Box>
      )}
      {connectionData && connectionData.status === jobStatus.CLOSED && (
        <>
          <Typography variant="body2">
            This connection has been closed
          </Typography>
        </>
      )}
      <>
        {connectionData &&
          connectionData.hasOwnProperty('messages') &&
          Object.values(connectionData.messages)
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(({ createdAt, messageBody, senderId }) => {
              const isUser = senderId === userUid;
              let name = 'Loading';
              if (isUser) {
                const { firstName, lastName } = userProfile || {
                  firstName: '',
                  lastName: ''
                };
                name = `${firstName} ${lastName}`;
              } else {
                const { companyName } = companyProfile || { companyName: '' };
                name = companyName;
              }

              var initials = name.match(/\b\w/g) || [];
              initials = (
                (initials.shift() || '') + (initials.shift() || '')
              ).toUpperCase();

              const momentObj = moment(createdAt);

              return (
                <Box
                  key={createdAt}
                  component="div"
                  className={classes.messagesOuter}
                >
                  <Avatar>{initials}</Avatar>
                  <Box component="div" className={classes.messagesInner}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body1">{messageBody}</Typography>
                  </Box>
                  <Box component="div" className={classes.date}>
                    <Typography variant="body2">
                      {momentObj.format('MMMM Do YYYY')}
                    </Typography>
                    <Typography variant="caption">
                      {momentObj.format('h:mm:ss a')}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
      </>
      {connectionData && connectionData.status !== jobStatus.CLOSED && (
        <Box component="div" className={classes.closedBlock}>
          <Box component="div" className={classes.innerCloseVerbiage}>
            <Typography variant="h6" component="div">
              Not interested in moving forward with this interview process?
              Click the button below to archive this connection.
            </Typography>
          </Box>
          <AcceptPopUp
            buttonLabel="Close Connection"
            message="Are you sure you want to close this connection? This action cannot
              be undone."
            color="secondary"
            size="large"
            fullWidth
            onClose={() => closeConnection(query, uid)}
          />
        </Box>
      )}
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
