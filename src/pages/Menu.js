import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { pizzas } from '../data/pizzas';
import AnimatedCard from '../components/shared/AnimatedCard';
import { useSnackbar } from 'notistack';

function Menu() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  // Filtrando as pizzas com base no termo de busca e na categoria selecionada
  const filteredPizzas = pizzas.filter(pizza => {
    const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pizza.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === '' || pizza.category === category;
    return matchesSearch && matchesCategory;
  });

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = (pizza) => {
    dispatch(addItem(pizza));
    enqueueSnackbar(`${pizza.name} adicionada ao carrinho!`, { 
      variant: 'success' 
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cardápio
        </Typography>
        
        <Grid container spacing={4}>
          {/* Seção para selecionar a categoria das pizzas */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={category}
                label="Categoria"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="Tradicional">Tradicional</MenuItem>
                <MenuItem value="Especial">Especial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Mapeando e exibindo as pizzas filtradas */}
      <Grid container spacing={4}>
        {filteredPizzas.map((pizza) => (
          <Grid item key={pizza.id} xs={12} sm={6} md={4}>
            <AnimatedCard>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={pizza.image}
                  alt={pizza.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {pizza.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pizza.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    R$ {pizza.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="large" 
                    variant="contained" 
                    fullWidth
                    onClick={() => handleAddToCart(pizza)}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardActions>
              </Card>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Menu;