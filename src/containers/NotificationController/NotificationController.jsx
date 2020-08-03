import React from 'react';
import Notice from './Notification.messages';
import Notification from './Notification';

const NotificationController = ({ uid }) => {
  const { noticeId, message, buttonText } = Notice;

  if (!noticeId || !uid) return null;
  const viewedMessage = window.localStorage.getItem(noticeId);

  return viewedMessage ? null : (
    <Notification
      notificationId={noticeId}
      message={message}
      buttonText={buttonText}
      onClose={() => {
        window.localStorage.setItem(noticeId, true);
      }}
    />
  );
};

export default NotificationController;
