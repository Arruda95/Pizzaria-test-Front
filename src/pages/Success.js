import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Success() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CheckCircleOutline
              sx={{ fontSize: 64, color: 'success.main', mb: 2 }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="h4" gutterBottom>
              Pedido Realizado com Sucesso!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Obrigado pela sua compra. Você receberá um email com os detalhes do seu pedido em breve.
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/menu')}
              >
                Fazer Novo Pedido
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
              >
                Voltar para Home
              </Button>
            </Box>
          </motion.div>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default Success;