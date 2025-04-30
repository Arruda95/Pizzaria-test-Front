import React, { Component } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
    // Aqui você poderia enviar o erro para um serviço de monitoramento
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh',
              py: 5,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                width: '100%',
                maxWidth: 600,
              }}
            >
              <ErrorOutlineIcon
                color="error"
                sx={{ fontSize: 80, mb: 2 }}
              />
              <Typography variant="h4" color="error" gutterBottom fontWeight="bold">
                Ops! Algo deu errado
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Encontramos um problema ao tentar carregar esta seção. Por favor, tente novamente ou volte à página inicial.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleReload}
                  sx={{ minWidth: 150 }}
                >
                  Tentar Novamente
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.handleGoHome}
                  sx={{ minWidth: 150 }}
                >
                  Ir para Início
                </Button>
              </Box>
              {this.props.showDetails && (
                <Paper
                  variant="outlined"
                  sx={{
                    mt: 4,
                    p: 2,
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    overflow: 'auto',
                    maxHeight: 200,
                    textAlign: 'left',
                  }}
                >
                  <Typography variant="caption" component="pre" color="text.secondary">
                    {this.state.error?.toString()}
                  </Typography>
                </Paper>
              )}
            </Paper>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 