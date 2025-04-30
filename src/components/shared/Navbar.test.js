import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';
import Navbar from './Navbar';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme';

// Mock de useMediaQuery para testes
jest.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn()
}));

// Mock do useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/'
  })
}));

describe('Navbar Component', () => {
  // Configuração da store para testes
  const mockStore = configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        items: [
          { id: '1', name: 'Pizza Teste', price: 30, quantity: 2 }
        ],
        total: 60
      }
    }
  });

  // Função auxiliar para renderizar o componente com os providers necessários
  const renderWithProviders = (ui) => {
    return render(
      <Provider store={mockStore}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            {ui}
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  test('deve renderizar o logo e navegação em desktop', () => {
    // Mock useMediaQuery para simular desktop
    require('@mui/material/useMediaQuery').default.mockReturnValue(false);
    
    renderWithProviders(<Navbar />);
    
    // Verificar se o logo está presente
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    
    // Verificar se os links de navegação estão presentes
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Cardápio')).toBeInTheDocument();
  });

  test('deve renderizar o menu hamburguer em dispositivos móveis', () => {
    // Mock useMediaQuery para simular dispositivo móvel
    require('@mui/material/useMediaQuery').default.mockReturnValue(true);
    
    renderWithProviders(<Navbar />);
    
    // Verificar se o botão de menu está presente
    const menuButton = screen.getByLabelText('menu');
    expect(menuButton).toBeInTheDocument();
    
    // Verificar se o drawer é aberto ao clicar no botão de menu
    fireEvent.click(menuButton);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  test('deve exibir a quantidade correta de itens no carrinho', () => {
    require('@mui/material/useMediaQuery').default.mockReturnValue(false);
    
    renderWithProviders(<Navbar />);
    
    // Verificar se o badge com a quantidade de itens está correto
    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
  });

  test('deve navegar para a página do carrinho ao clicar no ícone', () => {
    require('@mui/material/useMediaQuery').default.mockReturnValue(false);
    
    renderWithProviders(<Navbar />);
    
    // Verificar se o ícone do carrinho está presente
    const cartIcon = screen.getByLabelText('Carrinho de Compras');
    expect(cartIcon).toBeInTheDocument();
    
    // Simular clique no ícone do carrinho
    fireEvent.click(cartIcon);
    
    // Como estamos usando um mock de BrowserRouter, não podemos verificar a navegação diretamente,
    // mas podemos verificar se o link tem o atributo href correto
    expect(cartIcon.closest('a')).toHaveAttribute('href', '/cart');
  });
}); 