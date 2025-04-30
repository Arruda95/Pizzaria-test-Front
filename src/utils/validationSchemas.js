import * as Yup from 'yup';

export const checkoutValidationSchemas = {
  personalInfo: Yup.object({
    name: Yup.string().required('Nome obrigatório'),
    phone: Yup.string().required('Telefone obrigatório'),
  }),
  addressCepOnly: Yup.object({
    user_cep: Yup.string()
      .required('CEP obrigatório')
      .matches(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  }),
  address: Yup.object({
    user_cep: Yup.string()
      .required('CEP obrigatório')
      .matches(/^\d{5}-?\d{3}$/, 'CEP inválido'),
    user_address: Yup.string().required('Endereço obrigatório'),
    user_number: Yup.string().required('Número obrigatório'),
    user_neighborhood: Yup.string().required('Bairro obrigatório'),
  }),
  payment: Yup.object({
    paymentMethod: Yup.string().required('Selecione uma forma de pagamento'),
  }),
};