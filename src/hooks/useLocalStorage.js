import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para gerenciar dados no localStorage com funcionalidades avançadas
 * @param {string} key - Chave para armazenar o valor no localStorage
 * @param {any} initialValue - Valor inicial caso nada seja encontrado no localStorage
 * @param {Object} options - Opções adicionais
 * @param {number} options.expireInMinutes - Tempo de expiração em minutos (opcional)
 * @param {boolean} options.useSession - Usar sessionStorage em vez de localStorage (opcional)
 * @returns {Array} - [storedValue, setValue, clearValue]
 */
function useLocalStorage(key, initialValue, options = {}) {
  // Verificar se localStorage está disponível
  const storageAvailable = useCallback((type) => {
    try {
      const storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  const isAvailable = storageAvailable(options.useSession ? 'sessionStorage' : 'localStorage');
  
  // Armazenar a referência ao storage correto com fallback para um objeto vazio
  const getStorage = useCallback(() => {
    if (!isAvailable) return {};
    return options.useSession ? window.sessionStorage : window.localStorage;
  }, [isAvailable, options.useSession]);

  // Função para obter o valor armazenado com verificação de expiração
  const getStoredValue = useCallback(() => {
    if (!isAvailable) return initialValue;
    
    const storage = getStorage();

    try {
      const item = storage.getItem(key);
      
      // Se não existe, retorna o valor inicial
      if (!item) return initialValue;
      
      // Tenta fazer o parse do item
      const parsedItem = JSON.parse(item);
      
      // Verifica se o item tem o formato correto
      if (!parsedItem || typeof parsedItem !== 'object') {
        console.warn(`Item no localStorage '${key}' não tem o formato esperado`);
        return initialValue;
      }
      
      // Extrai os dados (com fallback para manter compatibilidade com versões anteriores)
      const { value, data, expiry, meta } = parsedItem;
      const storedValue = data || value; // Suporta ambos os formatos
      const expiryTime = expiry || (meta && meta.expires);
      
      // Verificar se o valor expirou
      if (options.expireInMinutes && expiryTime && new Date().getTime() > expiryTime && !options.ignoreExpiry) {
        console.log(`Cache expirado para a chave '${key}'`);
        storage.removeItem(key);
        return initialValue;
      }
      
      return storedValue;
    } catch (error) {
      console.error('Erro ao recuperar dado do storage:', error);
      // Em caso de erro, tenta remover o item que pode estar corrompido
      try {
        storage.removeItem(key);
      } catch (_) {
        // Ignora erro ao tentar remover
      }
      return initialValue;
    }
  }, [key, initialValue, isAvailable, options.expireInMinutes, options.ignoreExpiry, getStorage]);

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Atualizar o storage quando o valor mudar
  const setValue = useCallback((value) => {
    try {
      // Caso seja uma função, obter o valor a partir do estado atual
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Verificar se é necessário configurar uma data de expiração
      const item = options.expireInMinutes
        ? {
            value: valueToStore,
            expiry: new Date().getTime() + options.expireInMinutes * 60 * 1000
          }
        : { value: valueToStore };
      
      // Atualizar o estado
      setStoredValue(valueToStore);
      
      if (isAvailable) {
        const storage = getStorage();
        storage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.error('Erro ao salvar no storage:', error);
    }
  }, [key, storedValue, options.expireInMinutes, isAvailable, getStorage]);

  // Limpar o valor do storage
  const clearValue = useCallback(() => {
    try {
      if (isAvailable) {
        const storage = getStorage();
        storage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Erro ao remover do storage:', error);
    }
  }, [key, initialValue, isAvailable, getStorage]);

  // Sincronizar com mudanças feitas em outras abas/janelas
  useEffect(() => {
    if (!isAvailable) return;

    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(getStoredValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, isAvailable, getStoredValue]);

  return [storedValue, setValue, clearValue];
}

export default useLocalStorage;