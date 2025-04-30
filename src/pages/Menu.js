/**
 * Componente da página de Cardápio
 * 
 * Este componente exibe o cardápio completo da pizzaria, permitindo:
 * - Visualizar todas as pizzas disponíveis
 * - Filtrar por categorias (salgadas, doces, etc)
 * - Selecionar o tamanho da pizza
 * - Adicionar pizzas ao carrinho
 * - Suporte para funcionamento offline com cache local
 */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  Paper,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Divider,
  CircularProgress
} from '@mui/material';
// Importando tanto como objeto nomeado quanto como padrão para garantir compatibilidade
import pizzasData, { pizzas as pizzasNamed } from '../data/pizzas';
import { useSnackbar } from 'notistack';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import CakeIcon from '@mui/icons-material/Cake';
import RefreshIcon from '@mui/icons-material/Refresh';
import cacheService from '../services/cacheService';

function Menu() {
  console.log('=== Inicializando componente Menu ===');
  console.log('pizzasData:', pizzasData);
  console.log('pizzasNamed:', pizzasNamed);
  console.log('Timestamp de carregamento:', new Date().toISOString());

  // ========== ESTADOS DO COMPONENTE ==========
  const [size, setSize] = useState('M'); // Tamanho padrão: M
  const [activeCategory, setActiveCategory] = useState('all'); // Categoria ativa: 'all', 'salgadas', 'doces'
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(false); // Estado de erro
  const [retryCount, setRetryCount] = useState(0); // Contador de tentativas
  const [offlineMode, setOfflineMode] = useState(false); // Modo offline
  const [availablePizzas, setAvailablePizzas] = useState([]); // Estado para armazenar os dados das pizzas
  
  // ========== HOOKS E UTILITÁRIOS ==========
  const dispatch = useDispatch(); // Dispatch para Redux
  const { enqueueSnackbar } = useSnackbar(); // Hook para notificações
  const theme = useTheme(); // Acesso ao tema do Material UI
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verificação de tela móvel

  // Inicializar dados imediatamente - não esperar pelo useMemo
  useEffect(() => {
    console.log('=== Inicializando dados imediatamente ===');
    // Tento carregar dados diretamente
    try {
      if (pizzasNamed && Array.isArray(pizzasNamed) && pizzasNamed.length > 0) {
        console.log('Inicialização imediata: Usando pizzasNamed');
        setAvailablePizzas(pizzasNamed);
        setLoading(false);
        setError(false);
        return;
      } 
      
      if (pizzasData && Array.isArray(pizzasData) && pizzasData.length > 0) {
        console.log('Inicialização imediata: Usando pizzasData');
        setAvailablePizzas(pizzasData);
        setLoading(false);
        setError(false);
        return;
      }
      
      // Se chegou aqui, tenta carregar do cache
      const cachedData = cacheService.getCache('pizzas', { ignoreExpiry: true });
      if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
        console.log('Inicialização imediata: Usando cache');
        setAvailablePizzas(cachedData);
        setLoading(false);
        setError(false);
        return;
      }
    } catch (err) {
      console.error('Erro na inicialização imediata:', err);
    }
  }, []);

  /**
   * Garantia de dados das pizzas disponíveis
   * Tenta usar diferentes fontes de dados e salva em cache
   */
  const fetchedPizzasData = useMemo(() => {
    console.log('=== Executando o useMemo fetchedPizzasData ===');
    console.log('Valor atual de retryCount:', retryCount);
    
    // Primeiro, verificar se temos os dados importados
    try {
      let data = null;
      
      // Tentativa 1: Usar importação nomeada (pizzas)
      if (pizzasNamed && Array.isArray(pizzasNamed) && pizzasNamed.length > 0) {
        console.log('Usando importação nomeada pizzasNamed:', pizzasNamed.length);
        data = pizzasNamed;
      } 
      // Tentativa 2: Usar importação padrão (default export)
      else if (pizzasData && Array.isArray(pizzasData) && pizzasData.length > 0) {
        console.log('Usando importação padrão pizzasData:', pizzasData.length);
        data = pizzasData;
      } else {
        console.warn('Dados importados não são válidos:', { pizzasNamed, pizzasData });
      }
      
      // Se temos dados válidos, salva no cache e retorna
      if (data && Array.isArray(data) && data.length > 0) {
        console.log('Dados válidos encontrados, total de pizzas:', data.length);
        try {
          // Salvar no cache para uso futuro
          cacheService.setCache('pizzas', data, { expireInMinutes: 60 * 24 });
          console.log('Dados salvos no cache');
        } catch (cacheError) {
          console.error('Erro ao salvar no cache:', cacheError);
        }
        return data;
      }
      
      // Se chegou aqui, não temos dados das importações
      console.error('Dados das pizzas não disponíveis nas importações');
      throw new Error('Dados das pizzas não disponíveis nas importações');
    } 
    catch (error) {
      console.error('Erro ao processar dados das pizzas:', error);
      
      // Tenta recuperar do cache como último recurso
      try {
        console.log('Tentando recuperar do cache via cacheService');
        const cachedData = cacheService.getCache('pizzas', { ignoreExpiry: true });
        console.log('Dados do cache via cacheService:', cachedData);
        
        if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
          console.log('Usando dados do cache via cacheService:', cachedData.length);
          setOfflineMode(true);
          return cachedData;
        }
      } catch (cacheError) {
        console.error('Erro ao recuperar cache via cacheService:', cacheError);
      }
      
      // Última tentativa: cache mais antigo via localStorage direto
      try {
        console.log('Tentando recuperar do localStorage direto');
        const oldCachedData = JSON.parse(localStorage.getItem('pizzasCache'));
        console.log('Dados do cache via localStorage:', oldCachedData);
        
        if (oldCachedData && Array.isArray(oldCachedData) && oldCachedData.length > 0) {
          console.log('Usando cache antigo do localStorage:', oldCachedData.length);
          setOfflineMode(true);
          return oldCachedData;
        }
      } catch (localStorageError) {
        console.error('Erro ao acessar localStorage:', localStorageError);
      }
      
      // Se chegou aqui, criar um array vazio com dados mínimos para o app não quebrar
      console.warn('Nenhum dado disponível, criando dados emergenciais');
      const emergencyData = [
        {
          id: 'emergency-1',
          name: 'Pizza de Emergência',
          description: 'Disponível quando os dados não puderam ser carregados',
          price: 30.00,
          category: 'Tradicional'
        }
      ];
      
      return emergencyData;
    }
  }, []); // Removida a dependência retryCount

  // Função para forçar a recarga dos dados quando necessário
  const reloadData = useCallback(() => {
    console.log('=== Executando reloadData ===');
    // Limpar o cache antigo
    try {
      cacheService.removeCache('pizzas');
      localStorage.removeItem('pizzasCache');
    } catch (err) {
      console.error('Erro ao limpar cache:', err);
    }
    
    // Tenta importar os dados novamente
    if (pizzasNamed && Array.isArray(pizzasNamed) && pizzasNamed.length > 0) {
      console.log('Recarregando com dados de pizzasNamed');
      setAvailablePizzas(pizzasNamed);
      setError(false);
      setLoading(false);
    } else if (pizzasData && Array.isArray(pizzasData) && pizzasData.length > 0) {
      console.log('Recarregando com dados de pizzasData');
      setAvailablePizzas(pizzasData);
      setError(false);
      setLoading(false);
    } else {
      console.error('Falha ao recarregar dados');
      setError(true);
      setLoading(false);
    }
  }, [pizzasNamed, pizzasData]);

  // Atualizar o estado de availablePizzas após obter os dados
  useEffect(() => {
    console.log('=== Executando o useEffect de atualização de estado ===');
    console.log('fetchedPizzasData:', fetchedPizzasData);
    
    if (fetchedPizzasData && Array.isArray(fetchedPizzasData) && fetchedPizzasData.length > 0) {
      console.log('Atualizando estado com dados carregados:', fetchedPizzasData.length);
      setAvailablePizzas(fetchedPizzasData);
      setError(false); // Limpa qualquer erro anterior se temos dados válidos
      setLoading(false);
    } else {
      console.error('Não foi possível carregar os dados das pizzas');
      setError(true);
      setLoading(false);
    }
  }, [fetchedPizzasData]);

  /**
   * Configurações de cores para o tema da pizzaria
   * Define as cores padrão utilizadas em todo o componente
   */
  const pizzariaColors = {
    background: '#FFFFFF',  // Fundo branco
    primary: '#D73B3E',     // Vermelho tomate
    secondary: '#357A38',   // Verde manjericão
    crust: '#D4A056',       // Cor da massa/crosta
    text: '#333333',        // Texto escuro
    lightBg: '#f8f5f2',     // Bege claro para fundo
    divider: '#E0E0E0'      // Cinza claro para divisórias
  };

  /**
   * Função para tentar novamente com delay
   * Reinicia o carregamento após um pequeno atraso
   */
  const retryLoading = useCallback(() => {
    console.log('=== Executando retryLoading ===');
    setLoading(true);
    setError(false);
    
    // Usando a nova função de recarga
    setTimeout(() => {
      reloadData();
    }, 1000);
  }, [reloadData]);

  /**
   * Verificação de conexão com a internet
   * Monitora o estado da conexão e atualiza o modo offline
   */
  useEffect(() => {
    const handleOnline = () => {
      console.log('Conexão com a internet restaurada');
      setOfflineMode(false);
      if (error) {
        // Tenta carregar novamente quando a conexão for restaurada
        retryLoading();
      }
    };
    
    const handleOffline = () => {
      console.log('Conexão com a internet perdida');
      setOfflineMode(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [error, retryLoading]);

  /**
   * Dividir pizzas em salgadas e doces
   * Filtra as pizzas em dois grupos separados
   */
  const salgadas = useMemo(() => 
    availablePizzas && Array.isArray(availablePizzas) 
      ? availablePizzas.filter(p => p && p.category !== 'Doce') 
      : [], [availablePizzas]);
  
  const doces = useMemo(() => 
    availablePizzas && Array.isArray(availablePizzas) 
      ? availablePizzas.filter(p => p && p.category === 'Doce') 
      : [], [availablePizzas]);

  /**
   * Listar todas as categorias únicas de pizzas
   * Cria uma lista sem duplicatas das categorias
   */
  const allCategories = useMemo(() => {
    if (!availablePizzas || !Array.isArray(availablePizzas)) return [];
    const categories = availablePizzas.filter(p => p).map(p => p.category);
    return [...new Set(categories)].filter(c => c); // Remove undefined/null/empty
  }, [availablePizzas]);

  /**
   * Filtrar pizzas com base na categoria selecionada
   * Retorna o conjunto de pizzas apropriado com base na seleção atual
   */
  const displayedPizzas = useMemo(() => {
    try {
      if (!availablePizzas || !Array.isArray(availablePizzas) || availablePizzas.length === 0) {
        console.warn('Tentando filtrar pizzas com dados inválidos');
        return [];
      }
      
      if (activeCategory === 'all') return availablePizzas;
      if (activeCategory === 'salgadas') return salgadas;
      if (activeCategory === 'doces') return doces;
      return availablePizzas.filter(p => p && p.category === activeCategory);
    } catch (error) {
      console.error('Erro ao filtrar pizzas:', error);
      return [];
    }
  }, [activeCategory, availablePizzas, salgadas, doces]);

  /**
   * Função para adicionar ao carrinho com tamanho selecionado
   * Calcula o preço, adiciona ao Redux e mostra notificação
   */
  const handleAddToCart = (pizza) => {
    const selectedPrice = 
      size === 'P' ? pizza.price * 0.8 : 
      size === 'G' ? pizza.price * 1.2 : 
      pizza.price;
    
    const pizzaWithSize = {
      ...pizza,
      size,
      price: selectedPrice,
      name: `${pizza.name} (${size})`
    };
    
    dispatch(addItem(pizzaWithSize));
    enqueueSnackbar(`${pizza.name} (${size}) adicionada ao carrinho!`, {
      variant: 'success'
    });
  };

  /**
   * Calcular preço com base no tamanho
   * Retorna o preço ajustado conforme o tamanho selecionado
   */
  const calculatePrice = (basePrice, size) => {
    switch(size) {
      case 'P': return (basePrice * 0.8).toFixed(2);
      case 'M': return basePrice.toFixed(2);
      case 'G': return (basePrice * 1.2).toFixed(2);
      default: return basePrice.toFixed(2);
    }
  };

  /**
   * Tratar mudança de categoria
   * Atualiza a categoria ativa quando o usuário muda a seleção
   */
  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  /**
   * Função para tentar novamente manualmente
   * Recarrega a página quando o usuário clica no botão
   */
  const handleRetry = () => {
    console.log('=== Botão Tentar Novamente clicado ===');
    // Reinicia o carregamento
    setLoading(true);
    setError(false);
    // Usando a nova função de recarga em vez de incrementar retryCount
    reloadData();
  };

  /**
   * Melhoria do carregamento de imagem com preload
   * Pré-carrega a imagem principal e fornece um fallback
   */
  const pizzaImage = useMemo(() => {
    const imageSources = [
      '/exibe-cardapio.jpg',
      // Imagem embutida como fallback
      'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3e%3ccircle cx="100" cy="100" r="90" fill="%23D73B3E" /%3e%3ccircle cx="100" cy="100" r="80" fill="%23e09f3e" /%3e%3ccircle cx="70" cy="80" r="8" fill="%23fff" /%3e%3ccircle cx="120" cy="60" r="8" fill="%23fff" /%3e%3ccircle cx="80" cy="120" r="8" fill="%23fff" /%3e%3ccircle cx="130" cy="100" r="8" fill="%23fff" /%3e%3c/svg%3e'
    ];
    
    // Precarregar a imagem principal
    const img = new Image();
    img.src = imageSources[0];
    
    return {
      primary: imageSources[0],
      fallback: imageSources[1]
    };
  }, []);

  /**
   * Componente de renderização da lista de pizzas
   * Cria a UI para exibir as pizzas com seus detalhes e opções
   */
  const renderPizzaList = (pizzaList, title, isSweet = false) => {
    // Verifica se a lista está vazia
    if (!pizzaList || !Array.isArray(pizzaList) || pizzaList.length === 0) {
      return (
        <Paper 
          elevation={3} 
          sx={{
            p: 2, 
            mb: 3, 
            backgroundColor: pizzariaColors.background,
            textAlign: 'center'
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Nenhuma pizza encontrada nesta categoria.
          </Typography>
        </Paper>
      );
    }
    
    // Renderiza a lista de pizzas com detalhes
    return (
      <Paper 
        elevation={3} 
        sx={{
          p: 2, 
          mb: 3, 
          backgroundColor: pizzariaColors.background,
          color: pizzariaColors.text,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${pizzariaColors.divider}`,
          borderTop: `4px solid ${isSweet ? pizzariaColors.crust : pizzariaColors.primary}`
        }}
      >
        {/* Cabeçalho da categoria */}
        <Box 
          sx={{
            pb: 1, 
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {isSweet ? (
              <CakeIcon sx={{ color: pizzariaColors.crust, mr: 1, fontSize: 28 }} />
            ) : (
              <LocalPizzaIcon sx={{ color: pizzariaColors.primary, mr: 1, fontSize: 28 }} />
            )}
            <Typography 
              variant="h5" 
              sx={{
                fontWeight: 'bold',
                color: isSweet ? pizzariaColors.crust : pizzariaColors.primary,
                textTransform: 'uppercase',
                letterSpacing: 1
              }}
            >
              PIZZAS {title}
            </Typography>
          </Box>
          
          <Divider 
            sx={{
              width: '50%', 
              my: 1,
              borderColor: isSweet ? pizzariaColors.crust : pizzariaColors.primary,
              opacity: 0.5
            }}
          />
        </Box>

        {/* Lista de pizzas */}
        <Box>
          {Array.isArray(pizzaList) && pizzaList.map((pizza, index) => (
            <Box 
              key={pizza.id}
              sx={{
                mb: 1.5, 
                pb: 1.5,
                borderBottom: index < pizzaList.length - 1 ? `1px solid ${pizzariaColors.divider}` : 'none',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Item da pizza com número e descrição */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box 
                  sx={{ 
                    mr: 1, 
                    minWidth: '25px',
                    color: isSweet ? pizzariaColors.crust : pizzariaColors.primary,
                    fontWeight: 'bold'
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase', 
                      color: isSweet ? pizzariaColors.crust : pizzariaColors.primary 
                    }}
                  >
                    {pizza.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '0.8rem', color: pizzariaColors.text }}>
                    {pizza.description}
                  </Typography>
                  
                  {/* Preços e botão para desktop */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography sx={{ fontWeight: 'bold', color: isSweet ? pizzariaColors.crust : pizzariaColors.primary }}>
                        P <span style={{ fontSize: '1.3rem' }}>R$ {calculatePrice(pizza.price, 'P')}</span>
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold', color: isSweet ? pizzariaColors.crust : pizzariaColors.primary }}>
                        M <span style={{ fontSize: '1.3rem' }}>R$ {calculatePrice(pizza.price, 'M')}</span>
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold', color: isSweet ? pizzariaColors.crust : pizzariaColors.primary }}>
                        G <span style={{ fontSize: '1.3rem' }}>R$ {calculatePrice(pizza.price, 'G')}</span>
                      </Typography>
                    </Box>
                    {/* Controles para desktop */}
                    {!isMobile && (
                      <Box>
                        <FormControl size="small" sx={{ minWidth: 90, mr: 1 }}>
                          <Select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            sx={{ 
                              bgcolor: pizzariaColors.background,
                              '& .MuiSelect-select': { py: 0.5, px: 1 }
                            }}
                          >
                            <MenuItem value="P">P</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="G">G</MenuItem>
                          </Select>
                        </FormControl>
                        <Button 
                          variant="contained"
                          size="small"
                          onClick={() => handleAddToCart(pizza)}
                          sx={{ 
                            bgcolor: pizzariaColors.secondary,
                            '&:hover': {
                              bgcolor: '#2A6C2C'
                            }
                          }}
                        >
                          Adicionar
                        </Button>
                      </Box>
                    )}
                  </Box>
                  
                  {/* Controles para mobile */}
                  {isMobile && (
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      <FormControl size="small" sx={{ minWidth: 90, mr: 1 }}>
                        <Select
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          sx={{ 
                            bgcolor: pizzariaColors.background,
                            '& .MuiSelect-select': { py: 0.5, px: 1 }
                          }}
                        >
                          <MenuItem value="P">P</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="G">G</MenuItem>
                        </Select>
                      </FormControl>
                      <Button 
                        variant="contained"
                        size="small"
                        onClick={() => handleAddToCart(pizza)}
                        fullWidth
                        sx={{ 
                          bgcolor: pizzariaColors.secondary,
                          '&:hover': {
                            bgcolor: '#2A6C2C'
                          }
                        }}
                      >
                        Adicionar
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  // ========== RENDERIZAÇÃO CONDICIONAL ==========

  /**
   * Renderização do indicador de carregamento
   */
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 3 }} />
          <Typography variant="h6">Carregando cardápio...</Typography>
        </Box>
      </Container>
    );
  }

  /**
   * Renderização da tela de erro
   */
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <img 
              src="data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24'%3e%3cpath fill='%23f44336' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z'/%3e%3c/svg%3e"
              alt="Erro"
              style={{ width: '80px', height: '80px', margin: '0 auto' }}
            />
          </Box>
          
          <Typography variant="h5" gutterBottom sx={{ color: '#D73B3E', fontWeight: 'bold' }}>
            Não foi possível carregar o cardápio
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Verifique sua conexão com a internet e tente novamente. 
            {offlineMode && " Parece que você está offline no momento."}
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={handleRetry}
            startIcon={<RefreshIcon />}
            sx={{ 
              bgcolor: '#D73B3E',
              '&:hover': {
                bgcolor: '#b71c1c'
              }
            }}
          >
            Tentar Novamente
          </Button>
          
          {availablePizzas && availablePizzas.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setError(false)}
                sx={{ mt: 1 }}
              >
                Usar dados armazenados localmente
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Nota: Os dados podem estar desatualizados
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    );
  }

  /**
   * Renderização principal do cardápio
   */
  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: pizzariaColors.lightBg }}>
      {/* Cabeçalho do cardápio */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ color: pizzariaColors.primary, fontWeight: 'bold' }}
        >
          Cardápio
        </Typography>
        <Box 
          sx={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {/* Logo da pizza com fallback para garantir que sempre há uma imagem disponível */}
          <Box
            component="img"
            src={pizzaImage.primary}
            alt="Pizza"
            sx={{ 
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '200px',
              objectFit: 'contain',
              bgcolor: '#f5f5f5', // Fundo claro para caso a imagem falhe
              borderRadius: '50%', // Formato circular como uma pizza
              p: 2
            }}
            onError={(e) => {
              console.error('Erro ao carregar a imagem da pizza');
              // Previne o ciclo infinito de erros
              e.target.onerror = null;
              // Fallback para uma representação de pizza em SVG inline
              e.target.src = pizzaImage.fallback;
            }}
          />
        </Box>

        {/* Seção de categorias */}
        <Box sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          mt: 3,
          mb: 4
        }}>
          <Paper 
            elevation={1} 
            sx={{ 
              borderRadius: 2, 
              overflow: 'hidden',
              width: isMobile ? '100%' : 'auto'
            }}
          >
            <Tabs
              value={activeCategory}
              onChange={handleCategoryChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              centered={!isMobile}
              sx={{
                '& .MuiTab-root': {
                  color: pizzariaColors.text,
                  fontWeight: 'medium',
                  '&.Mui-selected': {
                    color: pizzariaColors.primary,
                    fontWeight: 'bold',
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: pizzariaColors.primary,
                }
              }}
            >
              <Tab 
                label="Todas" 
                value="all" 
                icon={<LocalPizzaIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Salgadas" 
                value="salgadas" 
                icon={<LocalPizzaIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Doces" 
                value="doces" 
                icon={<CakeIcon />} 
                iconPosition="start"
              />
              {/* Renderiza abas para categorias adicionais */}
              {allCategories.map(category => (
                category !== 'Doce' && category !== 'Salgada' && (
                  <Tab 
                    key={category}
                    label={category} 
                    value={category} 
                  />
                )
              ))}
            </Tabs>
          </Paper>
        </Box>
      </Box>

      {/* Renderização do conteúdo com base na categoria selecionada */}
      {activeCategory === 'all' ? (
        // Exibe salgadas e doces em colunas quando "Todas" está selecionado
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={6} lg={5}>
            {renderPizzaList(salgadas, 'SALGADAS', false)}
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            {renderPizzaList(doces, 'DOCES', true)}
          </Grid>
        </Grid>
      ) : activeCategory === 'salgadas' ? (
        // Exibe apenas as pizzas salgadas quando "Salgadas" está selecionado
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={8} lg={7}>
            {renderPizzaList(salgadas, 'SALGADAS', false)}
          </Grid>
        </Grid>
      ) : activeCategory === 'doces' ? (
        // Exibe apenas as pizzas doces quando "Doces" está selecionado
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={8} lg={7}>
            {renderPizzaList(doces, 'DOCES', true)}
          </Grid>
        </Grid>
      ) : (
        // Exibe pizzas da categoria específica selecionada
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={8} lg={7}>
            {renderPizzaList(displayedPizzas, activeCategory.toUpperCase(), false)}
          </Grid>
        </Grid>
      )}

      {/* Informações extras */}
      <Box sx={{ 
        mt: 4, 
        p: 2, 
        bgcolor: pizzariaColors.background, 
        borderRadius: 2,
        textAlign: 'center',
        border: `1px solid ${pizzariaColors.divider}`
      }}>
        <Typography variant="body2" sx={{ color: pizzariaColors.text, fontWeight: 'medium' }}>
          Entregas: Taxa de entrega R$ 5,00. Nas compras acima de R$ 50,00 taxa de entrega grátis.
        </Typography>
      </Box>
    </Container>
  );
}

export default Menu;