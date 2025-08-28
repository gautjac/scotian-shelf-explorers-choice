// Utility to clear all cached configuration data and ensure single source of truth
export const clearAllCachedData = async () => {
  console.log('🧹 [CACHE] Starting comprehensive cache clear for single source of truth...');
  
  try {
    // Clear localStorage completely for single source of truth
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ [CACHE] Cleared localStorage key: ${key}`);
    });
    console.log('✅ [CACHE] All localStorage cleared completely');
    
    // Clear IndexedDB more aggressively
    if ('indexedDB' in window) {
      try {
        // List of possible database names to clear
        const dbNames = ['PersistentStorage', 'GameStorage', 'ConfigStorage', 'ContentStorage'];
        
        for (const dbName of dbNames) {
          const deleteRequest = indexedDB.deleteDatabase(dbName);
          deleteRequest.onsuccess = () => {
            console.log(`✅ [CACHE] Cleared IndexedDB: ${dbName}`);
          };
          deleteRequest.onerror = () => {
            console.log(`⚠️ [CACHE] Could not clear IndexedDB: ${dbName}`);
          };
        }
      } catch (error) {
        console.log('⚠️ [CACHE] IndexedDB deletion error:', error);
      }
    }
    
    // Clear any session storage
    sessionStorage.clear();
    console.log('✅ [CACHE] Cleared sessionStorage');
    
    // Clear service worker cache more aggressively
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(async cacheName => {
            console.log(`🗑️ [CACHE] Deleting cache: ${cacheName}`);
            return await caches.delete(cacheName);
          })
        );
        console.log('✅ [CACHE] All service worker caches cleared');
      } catch (error) {
        console.log('⚠️ [CACHE] Service worker cache deletion error:', error);
      }
    }
    
    // Fire event to notify components
    window.dispatchEvent(new CustomEvent('cache-cleared'));
    console.log('✅ [CACHE] Cache clearing complete - using offlineContent.ts as single source of truth');
    
  } catch (error) {
    console.error('❌ [CACHE] Error clearing cache:', error);
  }
};

// Initialize cache clearing on app start
export const initializeCacheClearing = () => {
  console.log('🚀 [CACHE] Initializing cache management for single source of truth (offlineContent.ts)');
  console.log('🔧 [CACHE] Eliminating all dynamic configuration overrides...');
  clearAllCachedData();
  
  // Also clear on page reload to be extra sure
  window.addEventListener('beforeunload', () => {
    console.log('🔄 [CACHE] Page unloading - clearing cache to ensure fresh start');
    clearAllCachedData();
  });
};