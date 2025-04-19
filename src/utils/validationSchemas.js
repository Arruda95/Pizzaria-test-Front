import * as Yup from 'yup';

export const checkoutValidationSchemas = {
  personalInfo: Yup.object().shape({
    name: Yup.string()
      .required('Nome é obrigatório')
      .min(3, 'Nome muito curto'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    phone: Yup.string()
      .required('Telefone é obrigatório')
      .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato: (99) 99999-9999'),
  }),
  
  address: Yup.object().shape({
    address: Yup.string()
      .required('Endereço é obrigatório')
      .min(5, 'Endereço muito curto'),
    number: Yup.string()
      .required('Número é obrigatório'),
    neighborhood: Yup.string()
      .required('Bairro é obrigatório'),
    complement: Yup.string(),
  }),
  
  payment: Yup.object().shape({
    paymentMethod: Yup.string()
      .required('Selecione uma forma de pagamento'),
  }),
};