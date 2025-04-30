import React, { Suspense, useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorBoundary from './ErrorBoundary';

// Componente de fallback memoizado para o Suspense
const LoadingFallback = React.memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        width: '100%',
        gap: 2,
        px: 2,
      }}
    >
      <CircularProgress 
        color="secondary" 
        size={isMobile ? 40 : 60}
        thickness={4} 
        sx={{
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          borderRadius: '50%',
          p: 0.5,
          bgcolor: 'background.paper'
        }}
      />
      <Typography 
        variant={isMobile ? "body1" : "h6"} 
        color="text.secondary"
        align="center"
        sx={{ 
          maxWidth: 300,
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 }
          }
        }}
      >
        Carregando...
      </Typography>
    </Box>
  );
});

// Componente para lidar com erros de rede ou timeout
const TimeoutError = React.memo(({ onRetry }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        width: '100%',
        gap: 3,
        px: 2,
      }}
    >
      <ErrorOutlineIcon 
        color="error" 
        sx={{ fontSize: isMobile ? 50 : 70 }} 
      />
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        color="error.main"
        align="center"
        fontWeight="bold"
      >
        Erro ao carregar
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        align="center"
        sx={{ maxWidth: 400, mb: 2 }}
      >
        Não foi possível carregar o conteúdo. Verifique sua conexão com a internet e tente novamente.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onRetry}
        sx={{ minWidth: 150 }}
      >
        Tentar Novamente
      </Button>
    </Box>
  );
});

function LazyLoad({ children }) {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Configurar timeout para casos onde o carregamento do componente demore muito
  useEffect(() => {
    // Definir um timeout para mostrar mensagem de erro se o carregamento demorar muito
    const id = setTimeout(() => {
      setHasTimedOut(true);
    }, 30000); // 30 segundos de timeout
    
    setTimeoutId(id);
    
    return () => {
      // Limpar o timeout se o componente desmontar ou carregar com sucesso
      clearTimeout(id);
    };
  }, []); // Sem dependência, executa apenas na montagem

  const handleRetry = () => {
    // Resetar o timeout e tentar carregar novamente
    setHasTimedOut(false);
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const id = setTimeout(() => {
      setHasTimedOut(true);
    }, 30000);
    
    setTimeoutId(id);
    
    // Forçar um recarregamento da página
    window.location.reload();
  };

  return (
    <ErrorBoundary>
      {hasTimedOut ? (
        <TimeoutError onRetry={handleRetry} />
      ) : (
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

export default React.memo(LazyLoad);