/**
 * Componente da Página Inicial (Home)
 * 
 * Este componente exibe a landing page principal da Pizzaria Amandinha Cajazeiras.
 * Características:
 * - Layout responsivo para dispositivos móveis e desktop
 * - Animações usando Framer Motion
 * - Seção hero com destaque para a marca
 * - Seção de features destacando diferenciais da pizzaria
 * - Call-to-action para direcionar aos pedidos
 */
import React from 'react';
// Importa componentes do Material UI para layout e tipografia
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Paper, 
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  useTheme
} from '@mui/material';
// Hook de navegação do React Router
import { useNavigate } from 'react-router-dom';
// Importa animação do Framer Motion
import { motion } from 'framer-motion';
// Ícones do Material UI
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarIcon from '@mui/icons-material/Star';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Componente da página inicial
function Home() {
  const navigate = useNavigate(); // Hook para navegação
  const theme = useTheme(); // Acessa o tema do Material UI
  const isMobile = useMediaQuery('(max-width:600px)'); // Verifica se a tela é pequena

  /**
   * Lista de features da pizzaria para exibir na home
   * Cada feature inclui:
   * - Ícone representativo
   * - Título da feature
   * - Descrição curta
   */
  const features = [
    {
      icon: <LocalPizzaIcon sx={{ fontSize: isMobile ? 30 : 40, color: theme.palette.primary.main }} />,
      title: 'Pizzas Artesanais',
      description: 'Ingredientes frescos e receitas tradicionais',
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: isMobile ? 30 : 40, color: theme.palette.primary.main }} />,
      title: 'Entrega Rápida',
      description: 'Seu pedido em até 40 minutos',
    },
    {
      icon: <StarIcon sx={{ fontSize: isMobile ? 30 : 40, color: theme.palette.primary.main }} />,
      title: 'Qualidade Garantida',
      description: 'Satisfação dos clientes em primeiro lugar',
    },
  ];

  /**
   * Layout para dispositivos móveis
   * Renderização condicional baseada no tamanho da tela
   */
  if (isMobile) {
    return (
      <>
        {/* Header com imagem em destaque para mobile */}
        <Box
          sx={{
            position: 'relative',
            height: '70vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Container da imagem de fundo com overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }
            }}
          >
            <img
              src="/pizza-hero.jpg"
              alt="Pizza"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
          
          {/* Container do conteúdo sobre a imagem */}
          <Container>
            {/* Animação de fade in para o título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h3" 
                component="h1" 
                align="center"
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                  fontSize: '2rem'
                }}
              >
                {/* Nome da pizzaria dividido em duas linhas */}
                <Box 
                  component="div" 
                  sx={{ 
                    color: 'red',
                    display: 'block',
                    mb: 1
                  }}
                >
                  Amandinha
                </Box>
                <Box 
                  component="div" 
                  sx={{ 
                    color: theme.palette.secondary.main,
                    display: 'block'
                  }}
                >
                  Pizzaria Cajazeiras
                </Box>
              </Typography>
              
              <Typography 
                variant="body1" 
                align="center"
                sx={{ 
                  color: 'white',
                  mb: 4,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                }}
              >
                Sabor e qualidade direto na sua casa
              </Typography>
            </motion.div>
            
            {/* Botão de call-to-action com animação */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/menu')}
                  sx={{ 
                    px: 4,
                    py: 1,
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  Ver Cardápio
                </Button>
              </motion.div>
            </Box>
            
            {/* Indicador de scroll com animação */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 6 
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5 
                }}
              >
                <ArrowDownwardIcon 
                  sx={{ 
                    fontSize: 40, 
                    color: 'white' 
                  }} 
                />
              </motion.div>
            </Box>
          </Container>
        </Box>
        
        {/* Seção de features simplificada para mobile */}
        <Box sx={{ py: 5, bgcolor: theme.palette.background.default }}>
          <Container>
            <Typography 
              variant="h5" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ mb: 4, fontWeight: 'medium', color: theme.palette.primary.main }}
            >
              Por que escolher nossa pizzaria?
            </Typography>
            
            {/* Lista de features em cards verticais */}
            <Stack spacing={2}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card 
                    elevation={2}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      bgcolor: theme.palette.background.paper
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        bgcolor: theme.palette.primary.main,
                        p: 2,
                        minWidth: '60px',
                        height: '100%'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <CardContent>
                      <Typography variant="subtitle1" component="h3" fontWeight="bold" color={theme.palette.primary.main}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color={theme.palette.text.secondary}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
            
            {/* Botão secundário */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/sobre')}
              >
                Conheça mais sobre nós
              </Button>
            </Box>
          </Container>
        </Box>
        
        {/* Seção de chamada para ação */}
        <Box sx={{ bgcolor: theme.palette.warning.main, color: 'white', py: 4, textAlign: 'center' }}>
          <Container>
            <Typography variant="h6" component="p" gutterBottom color={theme.palette.primary.contrastText}>
              Faça seu pedido agora!
            </Typography>
            <Typography variant="body2" paragraph color={theme.palette.primary.contrastText}>
              Entregamos em toda Cajazeiras e região
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ maxWidth: '300px', borderRadius: '25px' }}
              onClick={() => navigate('/contato')}
            >
              Peça sua Pizza
            </Button>
          </Container>
        </Box>
      </>
    );
  }

  /**
   * Layout para desktop
   * Interface mais completa para telas maiores
   */
  return (
    <>
      {/* Seção hero com destaque e imagem */}
      <Box
        sx={{
          bgcolor: 'white',
          color: 'black',
          py: 8,
          mb: 6,
          width: '70%',
          mx: 'auto',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Grid 
            container 
            spacing={4} 
            alignItems="center"
            justifyContent="center"
          >
            {/* Texto e botão */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'center' }
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  align="center"
                >
                  <Box 
                    component="div" 
                    sx={{ 
                      color: 'red',
                      display: 'block',
                      mb: 1
                    }}
                  >
                    Amandinha
                  </Box>
                  <Box 
                    component="div" 
                    sx={{ 
                      color: theme.palette.secondary.light,
                      display: 'block'
                    }}
                  >
                    Pizzaria Cajazeiras
                  </Box>
                </Typography>
                <Typography 
                  variant="h5" 
                  paragraph
                  sx={{ color: 'white' }}
                  align="center"
                >
                  Sabor e qualidade direto na sua casa
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/menu')}
                  sx={{ mt: 2 }}
                >
                  Ver Cardápio
                </Button>
              </motion.div>
            </Grid>
            {/* Imagem da pizza */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  maxWidth: '90%'
                }}
              >
                <img
                  src="/pizza-hero.jpg"
                  alt="Pizza"
                  style={{
                    width: '100%',
                    borderRadius: '75px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Seção de features */}
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Grid 
          container 
          spacing={4}
          justifyContent="center"
        >
          {/* Cards de features em grid */}
          {features.map((feature, index) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={index}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, color: theme.palette.primary.main }}>
                    {feature.title}
                  </Typography>
                  <Typography color={theme.palette.text.secondary}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;