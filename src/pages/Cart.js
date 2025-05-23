import React from 'react';
// Importa hooks do Redux para acessar e modificar o estado do carrinho
import { useSelector, useDispatch } from 'react-redux';
// Importa componentes do Material UI para layout, tabela e botões
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
// Ícone de lixeira para remover item
import DeleteIcon from '@mui/icons-material/Delete';
// Importa ações do slice do carrinho
import { removeItem, updateQuantity } from '../store/cartSlice';
// Hook de navegação do React Router
import { useNavigate } from 'react-router-dom';
// Componente para selecionar quantidade
import QuantitySelector from '../components/shared/QuantitySelector';

// Componente da página do carrinho
function Cart() {
  const cart = useSelector((state) => state.cart); // Obtém o carrinho do Redux
  const dispatch = useDispatch(); // Para despachar ações
  const navigate = useNavigate(); // Para navegação programática

  // Atualiza a quantidade de um item
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  // Remove um item do carrinho
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  // Se o carrinho estiver vazio, mostra mensagem e botão para cardápio
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

  // Renderiza a tabela do carrinho
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
            {/* Renderiza cada item do carrinho */}
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
            {/* Linha do total */}
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

      {/* Botões para continuar comprando ou finalizar pedido */}
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