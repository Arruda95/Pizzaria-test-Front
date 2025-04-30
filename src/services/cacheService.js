/**
 * Serviço para gerenciar cache de dados no aplicativo
 * Oferece funções para armazenar, recuperar e gerenciar dados em cache
 */

// Constantes para configuração do cache
const DEFAULT_EXPIRATION = 60 * 24; // 24 horas em minutos
const CACHE_PREFIX = 'pizza_app_cache_';

/**
 * Verifica se o storage está disponível
 * @param {string} type - Tipo de storage a verificar ('localStorage' ou 'sessionStorage')
 * @returns {boolean} - Indica se o storage está disponível
 */
const isStorageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // Exceções esperadas para storage cheio
      e.code === 22 ||  // Chrome
      e.code === 1014 || // Firefox
      // Mensagem de erro específica quando quota excedida
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    ) && storage && storage.length !== 0;
  }
};

/**
 * Salva dados no cache
 * @param {string} key - Chave para identificar os dados
 * @param {any} data - Dados a serem armazenados
 * @param {Object} options - Opções adicionais 
 * @param {number} options.expireInMinutes - Tempo de expiração em minutos
 * @param {boolean} options.useSession - Usar sessionStorage em vez de localStorage
 * @returns {boolean} - Indica se a operação foi bem-sucedida
 */
export const setCache = (key, data, options = {}) => {
  const { expireInMinutes = DEFAULT_EXPIRATION, useSession = false } = options;
  const storageType = useSession ? 'sessionStorage' : 'localStorage';
  
  if (!isStorageAvailable(storageType)) {
    console.warn(`${storageType} não está disponível`);
    return false;
  }
  
  try {
    const storage = window[storageType];
    const now = new Date();
    
    // Criar objeto com dados e metadados
    const item = {
      data,
      meta: {
        timestamp: now.getTime(),
        expires: expireInMinutes ? now.getTime() + (expireInMinutes * 60 * 1000) : null,
        version: '1.0' // Para controle de versão do formato de cache
      }
    };
    
    storage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('Erro ao salvar no cache:', error);
    return false;
  }
};

/**
 * Recupera dados do cache
 * @param {string} key - Chave para identificar os dados 
 * @param {Object} options - Opções adicionais
 * @param {boolean} options.useSession - Usar sessionStorage em vez de localStorage
 * @param {boolean} options.ignoreExpiry - Ignorar a data de expiração
 * @returns {any|null} - Dados armazenados ou null se não encontrado/expirado
 */
export const getCache = (key, options = {}) => {
  const { useSession = false, ignoreExpiry = false } = options;
  const storageType = useSession ? 'sessionStorage' : 'localStorage';
  
  if (!isStorageAvailable(storageType)) {
    console.warn(`${storageType} não está disponível`);
    return null;
  }
  
  try {
    const storage = window[storageType];
    const rawData = storage.getItem(CACHE_PREFIX + key);
    
    if (!rawData) return null;
    
    const { data, meta } = JSON.parse(rawData);
    
    // Verificar se o cache expirou
    if (!ignoreExpiry && meta.expires && new Date().getTime() > meta.expires) {
      // Cache expirado, remover automaticamente
      storage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao recuperar do cache:', error);
    return null;
  }
};

/**
 * Remove dados do cache
 * @param {string} key - Chave para identificar os dados a remover
 * @param {Object} options - Opções adicionais
 * @param {boolean} options.useSession - Usar sessionStorage em vez de localStorage
 * @returns {boolean} - Indica se a operação foi bem-sucedida
 */
export const removeCache = (key, options = {}) => {
  const { useSession = false } = options;
  const storageType = useSession ? 'sessionStorage' : 'localStorage';
  
  if (!isStorageAvailable(storageType)) {
    console.warn(`${storageType} não está disponível`);
    return false;
  }
  
  try {
    const storage = window[storageType];
    storage.removeItem(CACHE_PREFIX + key);
    return true;
  } catch (error) {
    console.error('Erro ao remover do cache:', error);
    return false;
  }
};

/**
 * Limpa todo o cache da aplicação
 * @param {Object} options - Opções adicionais
 * @param {boolean} options.useSession - Usar sessionStorage em vez de localStorage
 * @param {boolean} options.onlyExpired - Remover apenas itens expirados
 * @returns {boolean} - Indica se a operação foi bem-sucedida
 */
export const clearCache = (options = {}) => {
  const { useSession = false, onlyExpired = false } = options;
  const storageType = useSession ? 'sessionStorage' : 'localStorage';
  
  if (!isStorageAvailable(storageType)) {
    console.warn(`${storageType} não está disponível`);
    return false;
  }
  
  try {
    const storage = window[storageType];
    const now = new Date().getTime();
    
    if (onlyExpired) {
      // Remover apenas itens expirados
      Object.keys(storage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          try {
            const { meta } = JSON.parse(storage.getItem(key));
            if (meta.expires && now > meta.expires) {
              storage.removeItem(key);
            }
          } catch (e) {
            // Se não conseguir parsear, remove o item
            storage.removeItem(key);
          }
        }
      });
    } else {
      // Remover todos os itens do cache da aplicação
      Object.keys(storage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          storage.removeItem(key);
        }
      });
    }
    return true;
  } catch (error) {
    console.error('Erro ao limpar o cache:', error);
    return false;
  }
};

/**
 * Obtém informações sobre o estado do cache
 * @param {Object} options - Opções adicionais 
 * @param {boolean} options.useSession - Usar sessionStorage em vez de localStorage
 * @returns {Object|null} - Informações sobre o cache ou null em caso de erro
 */
export const getCacheInfo = (options = {}) => {
  const { useSession = false } = options;
  const storageType = useSession ? 'sessionStorage' : 'localStorage';
  
  if (!isStorageAvailable(storageType)) {
    console.warn(`${storageType} não está disponível`);
    return null;
  }
  
  try {
    const storage = window[storageType];
    const now = new Date().getTime();
    
    let totalItems = 0;
    let expiredItems = 0;
    let totalSizeBytes = 0;
    const keys = [];
    
    Object.keys(storage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        totalItems++;
        keys.push(key.replace(CACHE_PREFIX, ''));
        
        const item = storage.getItem(key);
        totalSizeBytes += item.length * 2; // Aproximação para UTF-16
        
        try {
          const { meta } = JSON.parse(item);
          if (meta.expires && now > meta.expires) {
            expiredItems++;
          }
        } catch (e) {
          // Ignorar erro de parsing
        }
      }
    });
    
    return {
      totalItems,
      expiredItems,
      validItems: totalItems - expiredItems,
      totalSizeKB: Math.round(totalSizeBytes / 1024),
      keys,
      storageType
    };
  } catch (error) {
    console.error('Erro ao obter informações do cache:', error);
    return null;
  }
};

// Criar objeto de cache para exportação
const cacheService = {
  setCache,
  getCache,
  removeCache,
  clearCache,
  getCacheInfo
};

// Exportar como objeto padrão para facilitar importação
export default cacheService; 