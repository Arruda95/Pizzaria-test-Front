import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarIcon from '@mui/icons-material/Star';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocalPizzaIcon sx={{ fontSize: 40 }} />,
      title: 'Pizzas Artesanais',
      description: 'Ingredientes frescos e receitas tradicionais',
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: 40 }} />,
      title: 'Entrega Rápida',
      description: 'Seu pedido em até 40 minutos',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: 'Qualidade Garantida',
      description: 'Satisfação dos clientes em primeiro lugar',
    },
  ];

  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" component="h1" gutterBottom>
                  Amandinha Pizzaria Cajazeiras
                </Typography>
                <Typography variant="h5" paragraph>
                  Sabor e qualidade direto na sua casa
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={() => navigate('/menu')}
                  sx={{ mt: 2 }}
                >
                  Ver Cardápio
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/pizza-hero.jpg"
                  alt="Pizza"
                  style={{
                    width: '100%',
                    borderRadius: '75px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;