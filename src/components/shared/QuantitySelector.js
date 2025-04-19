import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={onDecrease} size="small" disabled={quantity <= 1}>
        <RemoveIcon />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton onClick={onIncrease} size="small">
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default QuantitySelector;
