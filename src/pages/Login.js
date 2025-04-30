import React, { useState } from 'react';
// Importa componentes do Material UI para layout, formulário e tipografia
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

// Componente de login
function Login() {
  // Estados para email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função chamada ao submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recarregar a página
    console.log('Login:', { email, password }); // Apenas loga no console (substitua por autenticação real)
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>
          {/* Formulário de login */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3 }}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;