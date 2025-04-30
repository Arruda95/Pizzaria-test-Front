import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography
} from '@mui/material';

// Componente para o passo de pagamento
export default function CheckoutPagamento({ values, handleChange, cart }) {
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Forma de Pagamento</FormLabel>
        <RadioGroup
          name="paymentMethod"
          value={values.paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label="Cartão de Crédito"
          />
          <FormControlLabel
            value="debit"
            control={<Radio />}
            label="Cartão de Débito"
          />
          <FormControlLabel
            value="pix"
            control={<Radio />}
            label="PIX"
          />
          <FormControlLabel
            value="money"
            control={<Radio />}
            label="Dinheiro"
          />
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Resumo do Pedido
        </Typography>
        {cart.items.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Typography>
              {item.name} x {item.quantity} - R$ {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: R$ {cart.total.toFixed(2)}
        </Typography>
      </Box>
    </>
  );
}
