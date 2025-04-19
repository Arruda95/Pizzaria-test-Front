import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import { theme } from './theme';
import NotificationProvider from './components/shared/Notification';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import LazyLoad from './components/shared/LazyLoad';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Menu = lazy(() => import('./pages/Menu'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Success = lazy(() => import('./pages/Success'));
const NotFound = lazy(() => import('./pages/404'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <Router>
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
              <LazyLoad>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </LazyLoad>
            </Box>
            <Footer />
          </Box>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;