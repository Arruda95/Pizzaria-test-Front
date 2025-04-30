import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Container, 
  SwipeableDrawer,
  List, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  useMediaQuery, 
  useTheme, 
  Tooltip,
  Avatar,
  Fade,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

// Logo path apontando para a pasta public
const LOGO_PATH = '/logo-pizza.jpg';

// Estilo para o badge de items no carrinho
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 0,
    padding: '0 6px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transition: 'transform 0.2s ease-in-out',
    transform: 'scale(1)',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(215, 59, 62, 0.3)',
    '&.MuiBadge-invisible': {
      transform: 'scale(0)',
    },
  },
}));

// Estilo customizado para os links do menu
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  padding: '10px 20px',
  margin: '0 5px',
  borderRadius: '16px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&.active': {
    color: 'white',
    background: 'linear-gradient(135deg, #D73B3E 0%, #FF5C61 100%)',
    boxShadow: '0 5px 15px rgba(215, 59, 62, 0.3)',
    transform: 'translateY(-2px)',
  },
  '&:hover': {
    backgroundColor: 'rgba(215, 59, 62, 0.08)',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
  }
}));

// Estilo para links móveis 
const StyledMobileLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: '12px',
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease',
  '&.active': {
    color: 'white',
    background: 'linear-gradient(135deg, #D73B3E 0%, #FF5C61 100%)',
    boxShadow: '0 4px 10px rgba(215, 59, 62, 0.2)',
  },
  '&:hover': {
    backgroundColor: 'rgba(215, 59, 62, 0.05)',
  }
}));

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const cartItems = useSelector((state) => state?.cart?.items || []);
  
  // Detectar scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Memoização do contador de itens para evitar cálculos desnecessários
  const cartItemsCount = useMemo(() => {
    return cartItems?.reduce((total, item) => total + (item?.quantity || 0), 0) || 0;
  }, [cartItems]);

  // Memoização dos itens de navegação
  const navItems = useMemo(() => [
    { title: 'Início', path: '/', icon: <HomeIcon /> },
    { title: 'Cardápio', path: '/menu', icon: <RestaurantMenuIcon /> },
  ], []);

  // Convert para useCallback para melhorar performance
  const toggleDrawer = useCallback((open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  }, []);

  // Função para fechar drawer ao clicar em um link
  const handleLinkClick = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  // Otimizado com dependências corretas
  useEffect(() => {
    // Fechar o drawer quando mudar de página em telas pequenas
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  }, [location.pathname, drawerOpen]);

  // Componente de navegação memoizado
  const renderNavigation = useCallback(() => {
    if (isMobile || isTablet) {
      return (
        <>
          <IconButton 
            color="inherit" 
            aria-label="menu" 
            edge="start" 
            onClick={toggleDrawer(true)}
            sx={{ 
              mr: 2,
              color: 'text.primary',
              transition: 'transform 0.2s',
              background: 'rgba(255,255,255,0.7)',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableBackdropTransition={false}
            disableDiscovery={false}
            SwipeAreaProps={{
              sx: { width: 30 }
            }}
            PaperProps={{
              sx: {
                width: isMobile ? '80%' : '300px',
                borderRadius: '0 20px 20px 0',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                background: 'linear-gradient(180deg, #fff 0%, #f9f9f9 100%)',
              },
            }}
          >
            <Box sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, #D73B3E 0%, #FF5C61 100%)',
              color: 'white'
            }}>
              <Box component={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Menu
                </Typography>
              </Box>
              <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <List sx={{ pt: 2 }}>
              {navItems.map((item, index) => (
                <Box
                  key={item.path}
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  sx={{ px: 2, py: 0.8 }}
                >
                  <StyledMobileLink 
                    to={item.path} 
                    onClick={handleLinkClick}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: '40px',
                      color: 'inherit'
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      primaryTypographyProps={{ 
                        fontWeight: 500
                      }}
                    />
                  </StyledMobileLink>
                </Box>
              ))}
            </List>
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 3, bgcolor: 'background.paper' }}>
              <Typography variant="body2" color="text.secondary" align="center">
                Amandinha Pizzaria © {new Date().getFullYear()}
              </Typography>
            </Box>
          </SwipeableDrawer>
        </>
      );
    }

    return (
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1.5,
          position: 'relative'
        }}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
          >
            <Tooltip title={item.title} placement="bottom" arrow>
              <StyledNavLink to={item.path}>
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.4 }}}
                  style={{ marginRight: '8px' }}
                >
                  {item.icon}
                </motion.div>
                <Typography 
                  variant="body1" 
                  fontWeight={600}
                  letterSpacing="0.5px"
                  sx={{ 
                    textTransform: 'uppercase',
                    fontSize: { md: '0.85rem', lg: '0.9rem' }
                  }}
                >
                  {item.title}
                </Typography>
              </StyledNavLink>
            </Tooltip>
          </motion.div>
        ))}
      </Box>
    );
  }, [isMobile, isTablet, drawerOpen, toggleDrawer, navItems, handleLinkClick]);

  // Badge animada memoizada
  const cartBadge = useMemo(() => (
    <Box>
      <Tooltip title="Carrinho de Compras">
        <Box component={NavLink} to="/cart" sx={{ textDecoration: 'none' }}>
          <IconButton 
            color="inherit"
            sx={{ 
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              p: 1.5,
              bgcolor: location.pathname === '/cart' ? 'rgba(215, 59, 62, 0.1)' : 'transparent',
              borderRadius: '12px',
              '&:hover': {
                bgcolor: 'rgba(215, 59, 62, 0.08)',
                transform: 'translateY(-2px)'
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            <StyledBadge 
              badgeContent={cartItemsCount} 
              color="primary"
              invisible={cartItemsCount === 0}
              showZero={false}
            >
              <motion.div
                animate={cartItemsCount > 0 ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCartIcon 
                  color={location.pathname === '/cart' ? 'primary' : 'inherit'} 
                  sx={{ fontSize: 24 }}
                />
              </motion.div>        
            </StyledBadge>
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <Fade in={cartItemsCount > 0}>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      transition: 'all 0.3s ease',
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 0.6, transform: 'scale(1)' },
                        '50%': { opacity: 1, transform: 'scale(1.2)' },
                        '100%': { opacity: 0.6, transform: 'scale(1)' }
                      }
                    }}
                  />
                </Fade>
              )}
            </AnimatePresence>
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  ), [cartItemsCount, location.pathname]);

  // Logo memoizado
  const logoComponent = useMemo(() => (
    <NavLink to="/" style={{ textDecoration: 'none' }}>
      <Box
        component={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '8px',
          flex: { xs: '1 1 auto', sm: '0 0 auto' },
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}
      >
        <Avatar 
          src={LOGO_PATH} 
          alt="Pizza Logo" 
          sx={{ 
            width: { xs: 40, md: 60 }, 
            height: { xs: 40, md: 60 },
            bgcolor: 'white',
            border: '2px solid',
            borderColor: 'primary.main',
            p: 0.2,
            borderRadius: '50%',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }} 
        />
      </Box>
    </NavLink>
  ), []);

  return (
    <AppBar 
      component={motion.div}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      position="sticky" 
      color="inherit" 
      elevation={0}
      sx={{ 
        backdropFilter: 'blur(20px)',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'rgba(230, 230, 230, 1)' : 'transparent',
        background: isMobile 
          ? 'rgba(255, 255, 255, 0.9)' 
          : scrolled 
            ? 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(250,250,250,0.95))' 
            : 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,245,245,0.8))',
        boxShadow: scrolled 
          ? '0 5px 20px rgba(0, 0, 0, 0.08)' 
          : isMobile 
            ? 'none' 
            : '0 4px 30px rgba(0, 0, 0, 0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        transition: 'all 0.4s ease',
        transform: `translateY(${scrolled && isMobile ? '-10px' : '0'})`,
        height: scrolled ? (isMobile ? '60px' : '70px') : (isMobile ? '70px' : '80px'),
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, md: 1 },
          height: '100%'
        }}>
          {isMobile ? (
            <>
              {renderNavigation()}
              {logoComponent}
              {cartBadge}
            </>
          ) : (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr auto 1fr',
              width: '100%',
              alignItems: 'center'
            }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-start',
                  pr: 2
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '30px',
                    padding: '8px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      boxShadow: '0 10px 25px rgba(215, 59, 62, 0.1)',
                      backgroundColor: 'rgba(255, 248, 248, 0.8)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderNavigation()}
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  px: 2
                }}
              >
                {logoComponent}
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  pl: 2
                }}
              >
                <Box 
                  component={motion.div}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 25px rgba(215, 59, 62, 0.15)',
                      backgroundColor: 'rgba(255, 248, 248, 0.8)',
                    }
                  }}
                >
                  {cartBadge}
                </Box>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// Memoização do componente para evitar renderizações desnecessárias
export default React.memo(Navbar);