import { useDispatch } from 'react-redux'; // Importa o hook useDispatch do Redux para obter a função de despacho de ações
import { addItem } from '../store/cartSlice'; // Importa a ação addItem do slice do carrinho
import React, { useState } from 'react'; // Importa o hook useState do React
import {
  Container, // Componente de contêiner do Material-UI
  Grid, // Componente de grade do Material-UI
  Card, // Componente de cartão do Material-UI
  CardMedia, // Componente de mídia do cartão do Material-UI
  CardContent, // Componente de conteúdo do cartão do Material-UI
  Typography, // Componente de tipografia do Material-UI
  Box, // Componente de caixa do Material-UI
  Button, // Componente de botão do Material-UI
  CardActions, // Componente de ações do cartão do Material-UI
  MenuItem, // Componente de item de menu do Material-UI
  Select, // Componente de seleção do Material-UI
  FormControl, // Componente de controle de formulário do Material-UI
  InputLabel, // Componente de rótulo de entrada do Material-UI
} from '@mui/material';
import { pizzas } from '../data/pizzas'; // Importa os dados das pizzas
import AnimatedCard from '../components/shared/AnimatedCard'; // Importa o componente de cartão animado
import { useSnackbar } from 'notistack'; // Importa o hook useSnackbar do Notistack

function Menu() {
  const [searchTerm, setSearchTerm] = useState(''); // Cria o estado de termo de pesquisa e sua função de atualização
  const [category, setCategory] = useState('Todas'); // Cria o estado de categoria selecionada e sua função de atualização

  // Filtrando as pizzas com base no termo de busca e na categoria selecionada
  const filteredPizzas = pizzas.filter(pizza => {
    const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Verifica se o nome da pizza corresponde ao termo de pesquisa
                         pizza.description.toLowerCase().includes(searchTerm.toLowerCase()); // Verifica se a descrição da pizza corresponde ao termo de pesquisa
    const matchesCategory = category === 'Todas' || pizza.category === category; // Verifica se a categoria da pizza corresponde à categoria selecionada, ou se a categoria selecionada é "Todas"
    return matchesSearch && matchesCategory; // Retorna true se a pizza corresponde aos filtros de pesquisa e categoria
  });

  const dispatch = useDispatch(); // Obtém a função de despacho de ações do Redux
  const { enqueueSnackbar } = useSnackbar(); // Obtém a função de exibição de notificações do Notistack



  const handleAddToCart = (pizza) => {
    dispatch(addItem(pizza)); // Despacha a ação de adicionar a pizza ao carrinho
    enqueueSnackbar(`${pizza.name} adicionada ao carrinho!`, { // Exibe uma notificação de sucesso
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
                <MenuItem value="Todas">Todas</MenuItem>
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
          <Grid item key={pizza.id} xs={5} sm={3} md={3} lg={2}>
            <AnimatedCard>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={pizza.image}
                  alt={pizza.name}
                  sx={{ objectFit: 'Cover' }}
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