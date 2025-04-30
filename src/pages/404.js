import React from 'react';
// Importa componentes do Material UI para layout e tipografia
import { Container, Typography, Button, Box } from '@mui/material';
// Importa hook de navegação do React Router
import { useNavigate } from 'react-router-dom';
// Importa animação do Framer Motion
import { motion } from 'framer-motion';

// Componente de página não encontrada (404)
function NotFound() {
  const navigate = useNavigate(); // Hook para navegação programática

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        {/* Animação de entrada usando Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" color="primary" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Página não encontrada
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            A página que você está procurando não existe ou foi removida.
          </Typography>
          {/* Botão para voltar à home */}
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Voltar para Home
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}

export default NotFound;