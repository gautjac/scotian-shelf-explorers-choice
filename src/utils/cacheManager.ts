import { scenarios } from '../data/content';

// Cache keys for different storage types
const CACHE_KEYS = {
  COMPREHENSIVE_CONFIG: 'comprehensive_config',
  IMPACT_CONFIG: 'impact_configuration',
  STORAGE_HEALTH: 'storage_health'
};

// Get all valid scenario IDs from embedded content
export const getValidScenarioIds = (): string[] => {
  const validIds = new Set<string>();
  Object.values(scenarios).forEach(scenarioList => {
    scenarioList.forEach(scenario => {
      validIds.add(scenario.id);
    });
  });
  return Array.from(validIds);
};

// Check if cached configuration contains invalid scenarios
export const detectInvalidCachedData = async (): Promise<boolean> => {
  try {
    const validScenarios = getValidScenarioIds();
    
    // Check IndexedDB configuration
    const dbRequest = indexedDB.open('comprehensive_config_db', 1);
    
    return new Promise((resolve) => {
      dbRequest.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(['configs'], 'readonly');
        const store = transaction.objectStore('configs');
        const request = store.get('comprehensive_config');
        
        request.onsuccess = () => {
          const config = request.result?.data;
          if (config?.scenarios) {
            // Check if any language has invalid scenarios
            for (const language of Object.keys(config.scenarios)) {
              const scenarioIds = Object.keys(config.scenarios[language]);
              const hasInvalidScenarios = scenarioIds.some(id => 
                !validScenarios.includes(id.split('_')[0])
              );
              if (hasInvalidScenarios) {
                console.log('Detected invalid cached scenarios:', scenarioIds.filter(id => 
                  !validScenarios.includes(id.split('_')[0])
                ));
                resolve(true);
                return;
              }
            }
          }
          resolve(false);
        };
        
        request.onerror = () => resolve(false);
      };
      
      dbRequest.onerror = () => resolve(false);
    });
  } catch (error) {
    console.warn('Error detecting invalid cached data:', error);
    return false;
  }
};

// Clear all cached data across storage types
export const clearAllCache = async (): Promise<void> => {
  const clearPromises: Promise<void>[] = [];
  
  // Clear IndexedDB
  clearPromises.push(new Promise<void>((resolve) => {
    const deleteRequest = indexedDB.deleteDatabase('comprehensive_config_db');
    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = () => resolve();
  }));
  
  // Clear localStorage
  clearPromises.push(new Promise<void>((resolve) => {
    try {
      Object.values(CACHE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      // Clear any other game-related storage
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('ocean_game') || key.includes('comprehensive_config')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
    resolve();
  }));
  
  // Clear Cache API
  clearPromises.push(new Promise<void>(async (resolve) => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }
    } catch (error) {
      console.warn('Error clearing Cache API:', error);
    }
    resolve();
  }));
  
  // Wait for all clearing operations to complete
  await Promise.all(clearPromises);
  
  console.log('All caches cleared successfully');
};

// Force reload the page after clearing caches
export const clearCacheAndReload = async (): Promise<void> => {
  await clearAllCache();
  
  // Unregister service worker if present
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.unregister()));
    } catch (error) {
      console.warn('Error unregistering service workers:', error);
    }
  }
  
  // Force hard reload
  window.location.reload();
};

// Check storage health with invalid scenario detection
export const checkStorageHealthWithValidation = async () => {
  const health = {
    indexedDB: false,
    cacheAPI: false,
    localStorage: false,
    hasInvalidData: false,
    errors: [] as string[]
  };
  
  // Check IndexedDB
  try {
    const dbRequest = indexedDB.open('test_db', 1);
    await new Promise((resolve, reject) => {
      dbRequest.onsuccess = () => {
        health.indexedDB = true;
        resolve(void 0);
      };
      dbRequest.onerror = () => reject(new Error('IndexedDB not available'));
    });
  } catch (error) {
    health.errors.push(`IndexedDB: ${error}`);
  }
  
  // Check Cache API
  try {
    if ('caches' in window) {
      await caches.open('test_cache');
      health.cacheAPI = true;
    }
  } catch (error) {
    health.errors.push(`Cache API: ${error}`);
  }
  
  // Check localStorage
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    health.localStorage = true;
  } catch (error) {
    health.errors.push(`localStorage: ${error}`);
  }
  
  // Check for invalid cached data
  try {
    health.hasInvalidData = await detectInvalidCachedData();
  } catch (error) {
    health.errors.push(`Invalid data detection: ${error}`);
  }
  
  return health;
};

// Trigger cache invalidation event
export const triggerCacheInvalidation = () => {
  window.dispatchEvent(new CustomEvent('cache-invalidated'));
};