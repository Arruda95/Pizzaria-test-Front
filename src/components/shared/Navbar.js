import React from 'react';
import { AppBar, Toolbar, Button, Box, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';

function Navbar() {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/menu')}>
            Cardápio
          </Button>
        </Box>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Badge badgeContent={itemCount} color="secondary">
            <Button
              color="inherit"
              onClick={() => navigate('/cart')}
              startIcon={<ShoppingCartIcon />}
            >
              Carrinho
            </Button>
          </Badge>
        </motion.div>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;