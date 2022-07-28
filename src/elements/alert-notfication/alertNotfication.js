import React, { useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// eslint-disable-next-line import/no-cycle
import { AlertNotificationContext } from './alertState';
import './style.css';

const AlertNotification = () => {
  const { message, type, isShown } = useContext(AlertNotificationContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      {isShown && (
        <Alert variant="filled" severity={type} className={isMobile ? 'alert__container-mobile' : 'alert__container-deskTop'}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertNotification;
