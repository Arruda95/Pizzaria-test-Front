import React from 'react';
import { Grid, TextField } from '@mui/material';

// Componente para o passo de endereço
export default function CheckoutEndereco({ values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError, buscarEnderecoPorCep }) {
  return (
    <Grid container spacing={2}>
      {/* Campo de CEP */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="user_cep"
          label="CEP"
          value={values.user_cep}
          onChange={handleChange}
          onBlur={async (e) => {
            handleBlur(e);
            await buscarEnderecoPorCep(e.target.value, setFieldValue, setFieldError);
          }}
          error={touched.user_cep && Boolean(errors.user_cep)}
          helperText={touched.user_cep && errors.user_cep}
          placeholder="00000-000"
          autoComplete="off"
        />
      </Grid>
      {/* Campo de Endereço */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="user_address"
          label="Endereço"
          value={values.user_address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.user_address && Boolean(errors.user_address)}
          helperText={touched.user_address && errors.user_address}
          autoComplete="off"
        />
      </Grid>
      {/* Campo de Número */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="user_number"
          label="Número"
          value={values.user_number}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.user_number && Boolean(errors.user_number)}
          helperText={touched.user_number && errors.user_number}
          autoComplete="off"
        />
      </Grid>
      {/* Campo de Complemento */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="user_complement"
          label="Complemento"
          value={values.user_complement}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </Grid>
      {/* Campo de Bairro */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="user_neighborhood"
          label="Bairro"
          value={values.user_neighborhood}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.user_neighborhood && Boolean(errors.user_neighborhood)}
          helperText={touched.user_neighborhood && errors.user_neighborhood}
          autoComplete="off"
        />
      </Grid>
    </Grid>
  );
}