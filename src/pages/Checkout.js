import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { clearCart } from '../store/cartSlice';
import { checkoutValidationSchemas } from '../utils/validationSchemas';

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    paymentMethod: 'credit',
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
      setSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Pedido finalizado:', { values, items: cart.items });
      dispatch(clearCart());
      navigate('/success');
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step, formik) => {
    const { values, errors, touched, handleChange, handleBlur } = formik;

    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Nome completo"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phone"
                label="Telefone"
                value={values.phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  formik.setFieldValue('phone', formatted);
                }}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                placeholder="(99) 99999-9999"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Endereço"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="number"
                label="Número"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.number && Boolean(errors.number)}
                helperText={touched.number && errors.number}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="complement"
                label="Complemento"
                value={values.complement}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="neighborhood"
                label="Bairro"
                value={values.neighborhood}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.neighborhood && Boolean(errors.neighborhood)}
                helperText={touched.neighborhood && errors.neighborhood}
              />
            </Grid>
          </Grid>
        );

      case 2:
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

      default:
        return null;
    }
  };

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="info">
          Seu carrinho está vazio. Adicione alguns itens antes de prosseguir com o checkout.
        </Alert>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/menu')}
          >
            Voltar ao Cardápio
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Dados Pessoais</StepLabel>
          </Step>
          <Step>
            <StepLabel>Endereço</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pagamento</StepLabel>
          </Step>
        </Stepper>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutValidationSchemas[
            activeStep === 0 ? 'personalInfo' :
            activeStep === 1 ? 'address' : 'payment'
          ]}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              {renderStepContent(activeStep, formik)}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
                {activeStep > 0 && (
                  <Button
                    onClick={() => setActiveStep((prev) => prev - 1)}
                    disabled={isSubmitting}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} />
                  ) : activeStep === 2 ? (
                    'Finalizar Pedido'
                  ) : (
                    'Próximo'
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default Checkout;