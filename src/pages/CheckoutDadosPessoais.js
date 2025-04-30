import React from 'react';
import { Grid, TextField } from '@mui/material';

// Componente para o passo de dados pessoais
export default function CheckoutDadosPessoais({ values, errors, touched, handleChange, handleBlur, setFieldValue, formatPhone }) {
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
          autoComplete="name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="phone"
          label="Telefone"
          value={values.phone}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            setFieldValue('phone', formatted);
          }}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
          placeholder="(99) 99999-9999"
          autoComplete="tel"
        />
      </Grid>
    </Grid>
  );
}