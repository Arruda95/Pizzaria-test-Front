import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress
} from '@mui/material';
import { CheckCircleOutline, LocalShipping } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Success() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Recuperar detalhes do pedido do localStorage
    try {
      const storedOrderDetails = localStorage.getItem('lastOrder');
      if (storedOrderDetails) {
        // Pequeno atraso para garantir que os dados sejam processados corretamente
        setTimeout(() => {
          setOrderDetails(JSON.parse(storedOrderDetails));
          setLoading(false);
        }, 500);
      } else {
        // Se não houver detalhes do pedido, redirecionar para home após mostrar erro
        setError(true);
        setLoading(false);
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      console.error('Erro ao carregar detalhes do pedido:', err);
      setError(true);
      setLoading(false);
      setTimeout(() => navigate('/'), 3000);
    }
  }, [navigate]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6">Carregando detalhes do pedido...</Typography>
        </Box>
      </Container>
    );
  }

  if (error || !orderDetails) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            Houve um problema ao carregar os detalhes do pedido.
          </Alert>
          <Typography variant="body1" gutterBottom>
            Redirecionando para a página inicial...
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Ir para Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: isMobile ? 4 : 8 }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Paper sx={{ p: isMobile ? 2 : 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CheckCircleOutline
                sx={{ fontSize: isMobile ? 48 : 64, color: 'success.main', mb: 2 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                Pedido Realizado com Sucesso!
              </Typography>
            </motion.div>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ my: 3 }}>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalShipping sx={{ mr: 1 }} /> 
              Detalhes do Pedido
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Itens Comprados:
              </Typography>
              {orderDetails.items && orderDetails.items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">
                    {item.quantity}x {item.name}
                  </Typography>
                  <Typography variant="body1">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontWeight: 'bold', borderTop: '1px solid #e0e0e0', pt: 2 }}>
                <Typography variant="h6">
                  Total:
                </Typography>
                <Typography variant="h6">
                  R$ {orderDetails.total && orderDetails.total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mt: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Endereço de Entrega:
            </Typography>
            {orderDetails.address && (
              <>
                <Typography variant="body1">
                  {orderDetails.address.street || ""}, {orderDetails.address.number || ""}
                </Typography>
                {orderDetails.address.complement && (
                  <Typography variant="body1">
                    Complemento: {orderDetails.address.complement}
                  </Typography>
                )}
                <Typography variant="body1">
                  Bairro: {orderDetails.address.neighborhood || ""}
                </Typography>
                <Typography variant="body1">
                  CEP: {orderDetails.address.cep || ""}
                </Typography>
              </>
            )}
          </Box>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Box sx={{ mt: 4, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/menu')}
                fullWidth={isMobile}
              >
                Fazer Novo Pedido
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                fullWidth={isMobile}
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