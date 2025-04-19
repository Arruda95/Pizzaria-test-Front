import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Sobre Nós
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Oferecemos as melhores pizzas da cidade, com ingredientes frescos e
              receitas tradicionais italianas.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Horário de Funcionamento
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Segunda à Sexta: 18h - 23h
              <br />
              Sábado e Domingo: 18h - 00h
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Telefone: (11) 99999-9999
              <br />
              Email: contato@pizzaria.com
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
              Pizzaria
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;