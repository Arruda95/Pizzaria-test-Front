import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeItem, updateQuantity } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import QuantitySelector from '../components/shared/QuantitySelector';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Seu carrinho está vazio
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/menu')}
          >
            Ver Cardápio
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrinho de Compras
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pizza</TableCell>
              <TableCell align="right">Preço Unit.</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  R$ {item.price.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    onDecrease={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  />
                </TableCell>
                <TableCell align="right">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell align="right" colSpan={2}>
                <Typography variant="h6">
                  R$ {cart.total.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/menu')}
        >
          Continuar Comprando
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/checkout')}
        >
          Finalizar Pedido
        </Button>
      </Box>
    </Container>
  );
}

export default Cart;