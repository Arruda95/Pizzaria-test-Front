import { createTheme } from '@mui/material';

// Paleta de cores de pizzaria italiana
const pizzaColors = {
  tomato: {
    main: '#D73B3E',     // Vermelho tomate
    light: '#E35E5E',
    dark: '#B22A2D',
  },
  mozzarella: {
    main: '#F5F5F5',     // Branco queijo
    light: '#FFFFFF',
    dark: '#E0E0E0',
  },
  basil: {
    main: '#357A38',     // Verde manjericão
    light: '#4CAF50',
    dark: '#2E6930',
  },
  crust: {
    main: '#D4A056',     // Cor da massa/crosta
    light: '#E2B76F',
    dark: '#B78638',
  },
  woodFire: {
    main: '#854836',     // Marrom forno a lenha 
    light: '#A05A45',
    dark: '#6A3929',
  },
  olive: {
    main: '#808000',     // Verde oliva
    light: '#9A9940',
    dark: '#5C5C00',
  }
};

// Definindo a família de fontes principal
const fontFamily = "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif";

export const theme = createTheme({
  palette: {
    primary: pizzaColors.tomato,
    secondary: pizzaColors.basil,
    background: {
      default: '#f8f5f2',  // Bege claro para fundo
      paper: pizzaColors.mozzarella.main,
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    pizza: {
      ...pizzaColors,
    },
    error: {
      main: pizzaColors.tomato.main,
    },
    warning: {
      main: pizzaColors.crust.main,
    },
    success: {
      main: pizzaColors.basil.main,
    },
  },
  typography: {
    fontFamily: fontFamily,
    fontSize: 14,
    h1: {
      fontFamily: fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: fontFamily,
      fontWeight: 600,
    },
    h4: {
      fontFamily: fontFamily,
      fontWeight: 600,
    },
    h5: {
      fontFamily: fontFamily,
      fontWeight: 600,
    },
    h6: {
      fontFamily: fontFamily,
      fontWeight: 600,
    },
    body1: {
      fontFamily: fontFamily,
      fontWeight: 400,
    },
    body2: {
      fontFamily: fontFamily,
      fontWeight: 400,
    },
    button: {
      fontFamily: fontFamily,
      fontWeight: 600,
      textTransform: 'none',
    },
    subtitle1: {
      fontFamily: fontFamily,
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: fontFamily,
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: fontFamily
        },
        body: {
          fontFamily: fontFamily
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          fontFamily: fontFamily,
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(215, 59, 62, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(215, 59, 62, 0.35)',
          },
        },
        containedSecondary: {
          boxShadow: '0 4px 10px rgba(53, 122, 56, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(53, 122, 56, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        }
      }
    },
  },
});