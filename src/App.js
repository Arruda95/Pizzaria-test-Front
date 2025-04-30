import React, { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Box, CssBaseline } from '@mui/material';
import { theme } from './theme';
import NotificationProvider from './components/shared/Notification';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import LazyLoad from './components/shared/LazyLoad';
import ErrorBoundary from './components/shared/ErrorBoundary';

// Para carregamento imediato de componentes críticos
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Menu from './pages/Menu'; // Carregando o Menu normalmente, sem lazy

// Imagens que precisam ser pré-carregadas
const PRELOAD_IMAGES = [
  '/logo-pizza.jpg',
  '/logo512.png',
  '/pizza-hero.jpg',
  // Adicione mais imagens conforme necessário
];

// Para carregamento lazy de outros componentes menos críticos
const Cart = lazy(() => import('./pages/Cart'));
const Success = lazy(() => import('./pages/Success'));
const NotFound = lazy(() => import('./pages/404'));

// Componente para pré-carregar imagens
function ImagePreloader() {
  useEffect(() => {
    PRELOAD_IMAGES.forEach(imagePath => {
      if (imagePath) {
        const img = new Image();
        
        // Adicionar handlers para lidar com sucesso e falha
        img.onload = () => {
          console.log(`Imagem carregada com sucesso: ${imagePath}`);
        };
        
        img.onerror = () => {
          console.warn(`Erro ao carregar imagem: ${imagePath}`);
        };
        
        img.src = imagePath;
      }
    });
  }, []);

  return null;
}

// Layout principal que envolve as rotas
function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <Router>
            <ImagePreloader />
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={
                  <LazyLoad>
                    <Cart />
                  </LazyLoad>
                } />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={
                  <LazyLoad>
                    <Success />
                  </LazyLoad>
                } />
                <Route path="*" element={
                  <LazyLoad>
                    <NotFound />
                  </LazyLoad>
                } />
              </Routes>
            </MainLayout>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;