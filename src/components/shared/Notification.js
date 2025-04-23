import React from 'react';
import { SnackbarProvider } from 'notistack';

function NotificationProvider({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={2000}
    >
      {children}
    </SnackbarProvider>
  );
}

export default NotificationProvider;