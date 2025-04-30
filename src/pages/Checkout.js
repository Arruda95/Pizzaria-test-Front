import React, { useState } from 'react';
// Importa hooks do Redux para acessar o estado global e despachar ações
import { useSelector, useDispatch } from 'react-redux';
// Importa hook para navegação entre páginas
import { useNavigate } from 'react-router-dom';
// Importa Formik para gerenciamento de formulários
import { Formik, Form } from 'formik';
// Importa os componentes dos passos do checkout
import CheckoutDadosPessoais from './CheckoutDadosPessoais';
import CheckoutEndereco from './CheckoutEndereco';
import CheckoutPagamento from './CheckoutPagamento';
// Importa ação para limpar o carrinho
import { clearCart } from '../store/cartSlice';
// Importa os schemas de validação
import { checkoutValidationSchemas } from '../utils/validationSchemas';
// Importa axios para requisições HTTP
import axios from 'axios';
// Importa componentes do Material UI
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';

function Checkout() {
  // Estado para controlar o passo atual do formulário
  const [activeStep, setActiveStep] = useState(0);
  // Estado para controlar se está enviando o formulário
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Estado para saber se o CEP foi preenchido corretamente
  const [cepPreenchido, setCepPreenchido] = useState(false);

  // Obtém o carrinho do Redux
  const cart = useSelector((state) => state.cart);
  // Função para despachar ações do Redux
  const dispatch = useDispatch();
  // Função para navegação
  const navigate = useNavigate();

  // Valores iniciais do formulário
  const initialValues = {
    name: '',
    phone: '',
    user_cep: '',
    user_address: '',
    user_number: '',
    user_complement: '',
    user_neighborhood: '',
    paymentMethod: 'credit',
  };

  // Função para formatar o telefone
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  // Função para buscar endereço pelo CEP usando a API ViaCEP
  const buscarEnderecoPorCep = async (cep, setFieldValue, setFieldError) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      setCepPreenchido(false);
      return;
    }
    
    try {
      // Faz a requisição para a API do ViaCEP com timeout de 5 segundos
      const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`, {
        timeout: 5000 // 5 segundos de timeout
      });
      
      // Verifica se a resposta existe e não tem erro
      if (!response || !response.data || response.data.erro) {
        // Se o CEP não for encontrado, limpa os campos e mostra erro
        setFieldError('user_cep', 'CEP não encontrado');
        setFieldValue('user_address', '');
        setFieldValue('user_neighborhood', '');
        setCepPreenchido(false);
        return;
      }
      
      // Preenche automaticamente os campos de endereço e bairro
      setFieldValue('user_address', response.data.logradouro || '');
      setFieldValue('user_neighborhood', response.data.bairro || '');
      setCepPreenchido(true);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      // Em caso de erro na requisição, limpa os campos e mostra erro amigável
      setFieldError('user_cep', 'Erro ao buscar CEP. Preencha o endereço manualmente.');
      setCepPreenchido(true); // Permite prosseguir mesmo com erro de CEP
    }
  };

  // Função chamada ao enviar o formulário
  const handleSubmit = async (values, { setSubmitting }) => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
      setSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Pedido finalizado:', { values, items: cart.items });
      
      // Salvar detalhes do pedido no localStorage para ser recuperado na página de sucesso
      const orderDetails = {
        items: cart.items,
        total: cart.total,
        address: {
          street: values.user_address,
          number: values.user_number,
          complement: values.user_complement,
          neighborhood: values.user_neighborhood,
          cep: values.user_cep
        }
      };
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      
      // Limpar o carrinho e navegar para a página de sucesso
      dispatch(clearCart());
      navigate('/success');
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função que renderiza os campos de cada passo do formulário
  const renderStepContent = (step, formik) => {
    // Desestruturação dos métodos e valores do Formik
    const { values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError } = formik;

    switch (step) {
      case 0: // Passo 1: Dados pessoais
        return (
          <CheckoutDadosPessoais
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            formatPhone={formatPhone}
          />
        );
      case 1: // Passo 2: Endereço
        return (
          <CheckoutEndereco
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            buscarEnderecoPorCep={buscarEnderecoPorCep}
          />
        );
      case 2: // Passo 3: Pagamento
        return (
          <CheckoutPagamento
            values={values}
            handleChange={handleChange}
            cart={cart}
          />
        );
      default:
        return null;
    }
  };

  // Se o carrinho estiver vazio, mostra alerta
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

  // Renderização principal do componente
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        {/* Título da página */}
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        {/* Stepper para mostrar o progresso do formulário */}
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

        {/* Formulário com Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={
            activeStep === 0
              ? checkoutValidationSchemas.personalInfo
              : activeStep === 1
                ? (cepPreenchido
                    ? checkoutValidationSchemas.address
                    : checkoutValidationSchemas.addressCepOnly)
                : checkoutValidationSchemas.payment
          }
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => (
            // autoComplete="off" para evitar autofill de nome/telefone em campos de endereço
            <Form autoComplete="off">
              {renderStepContent(activeStep, formik)}

              {/* Botões de navegação entre os passos */}
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