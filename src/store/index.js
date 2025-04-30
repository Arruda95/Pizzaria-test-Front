import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { saveState } from './cartSlice';

// Configuração da store do Redux
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  // Middleware para garantir que objetos serializáveis
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar verificação de serialização para certas ações (se necessário)
        // ignoredActions: ['some/action'],
      },
    }),
  // Ativar DevTools apenas em desenvolvimento
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscreve às alterações da store para persistir o estado do carrinho
store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;