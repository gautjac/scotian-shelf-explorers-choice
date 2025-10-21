// Clear user overrides (localStorage and IndexedDB) while preserving PWA caches
export const clearAllCachedData = async () => {
  console.log('🧹 [CACHE] Clearing user overrides (localStorage/IndexedDB only)...');
  
  try {
    // Clear localStorage - user configuration overrides
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ [CACHE] Cleared localStorage key: ${key}`);
    });
    console.log('✅ [CACHE] All localStorage cleared');
    
    // Clear IndexedDB - user configuration overrides
    if ('indexedDB' in window) {
      try {
        const dbNames = [
          'PersistentStorage', 
          'GameStorage', 
          'ConfigStorage', 
          'ContentStorage',
          'OceanGuardianStorage',
          'ocean-guardian-db',
          'comprehensive-config'
        ];
        
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
    
    // Clear session storage
    sessionStorage.clear();
    console.log('✅ [CACHE] Cleared sessionStorage');
    
    // IMPORTANT: Do NOT clear service worker caches - they contain PWA assets for offline use
    console.log('✅ [CACHE] PWA caches preserved for offline functionality');
    
    // Notify components to reload configuration
    window.dispatchEvent(new CustomEvent('cache-cleared'));
    window.dispatchEvent(new CustomEvent('comprehensive-config-updated'));
    console.log('✅ [CACHE] User overrides cleared - app will use published CSV content');
    
  } catch (error) {
    console.error('❌ [CACHE] Error clearing cache:', error);
  }
};

// Reset content cache specifically for configuration overrides
export const resetContentCache = async () => {
  console.log('🔄 [CACHE] Resetting content cache to prioritize CSV changes...');
  
  try {
    // Clear specific configuration keys from localStorage
    const configKeys = [
      'comprehensiveConfiguration',
      'impactConfiguration', 
      'gameState',
      'persistentConfig'
    ];
    
    configKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`🗑️ [CACHE] Removed override: ${key}`);
      }
    });
    
    // Clear Ocean Guardian specific IndexedDB storage
    if ('indexedDB' in window) {
      const oceanDBNames = ['OceanGuardianStorage', 'ocean-guardian-content'];
      for (const dbName of oceanDBNames) {
        const deleteRequest = indexedDB.deleteDatabase(dbName);
        deleteRequest.onsuccess = () => {
          console.log(`✅ [CACHE] Cleared Ocean Guardian DB: ${dbName}`);
        };
      }
    }
    
    // Clear specific cache entries for Ocean Guardian content
    if ('caches' in window) {
      try {
        const oceanCacheNames = ['ocean-guardian-content', 'comprehensive-config'];
        for (const cacheName of oceanCacheNames) {
          await caches.delete(cacheName);
          console.log(`✅ [CACHE] Cleared Ocean Guardian cache: ${cacheName}`);
        }
      } catch (error) {
        console.log('⚠️ [CACHE] Ocean Guardian cache deletion error:', error);
      }
    }
    
    // Notify components to reload from static CSV
    window.dispatchEvent(new CustomEvent('cache-cleared'));
    window.dispatchEvent(new CustomEvent('comprehensive-config-updated'));
    console.log('✅ [CACHE] Content cache reset complete - CSV should now be primary source');
    
  } catch (error) {
    console.error('❌ [CACHE] Error resetting content cache:', error);
  }
};

// Initialize cache clearing on app start
export const initializeCacheClearing = () => {
  console.log('🚀 [CACHE] Cache manager initialized - PWA caches preserved for offline use');
  console.log('🔧 [CACHE] CSV-First architecture: Published CSV is the source of truth');
  
  // Clear user overrides on app start to ensure published content is used
  clearAllCachedData();
};