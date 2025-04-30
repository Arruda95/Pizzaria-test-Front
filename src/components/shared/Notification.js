import React from 'react';
import { SnackbarProvider } from 'notistack';
import { useMediaQuery, useTheme } from '@mui/material';

function NotificationProvider({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <SnackbarProvider
      maxSnack={isMobile ? 2 : 3}
      anchorOrigin={{
        vertical: isMobile ? 'bottom' : 'top',
        horizontal: isMobile ? 'center' : 'center',
      }}
      autoHideDuration={2000}
      style={{
        fontSize: isMobile ? '0.8rem' : '1rem',
      }}
      sx={{
        '& .SnackbarItem-contentRoot': {
          maxWidth: isMobile ? '90%' : '400px',
          fontSize: isMobile ? '0.8rem' : '1rem',
          padding: isMobile ? theme.spacing(1) : theme.spacing(1.5)
        },
        '& .SnackbarItem-variantSuccess, & .SnackbarItem-variantError, & .SnackbarItem-variantWarning, & .SnackbarItem-variantInfo': {
          borderRadius: isMobile ? '4px' : '8px',
          minWidth: 'auto',
          marginTop: isMobile ? '0' : theme.spacing(1),
        },
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default NotificationProvider;