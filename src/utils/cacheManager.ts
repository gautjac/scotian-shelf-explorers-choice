// Utility to clear all cached configuration data and ensure single source of truth
export const clearAllCachedData = async () => {
  console.log('🧹 [CACHE] Starting comprehensive cache clear for single source of truth...');
  
  try {
    // Clear localStorage completely, especially configuration overrides
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ [CACHE] Cleared localStorage key: ${key}`);
    });
    console.log('✅ [CACHE] All localStorage cleared completely');
    
    // Clear IndexedDB more comprehensively - targeting known Ocean Guardian databases
    if ('indexedDB' in window) {
      try {
        // List of possible database names to clear (including Ocean Guardian specific ones)
        const dbNames = [
          'PersistentStorage', 
          'GameStorage', 
          'ConfigStorage', 
          'ContentStorage',
          'OceanGuardianStorage',  // This is likely where persistent overrides are stored
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
    
    // Clear any session storage
    sessionStorage.clear();
    console.log('✅ [CACHE] Cleared sessionStorage');
    
    // Clear service worker cache more aggressively, targeting Ocean Guardian caches
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(async cacheName => {
            // Keep video cache and workbox precache, only clear config/data caches
            if (cacheName.includes('video-cache') || cacheName.includes('workbox-precache')) {
              console.log(`🎬 [CACHE] Preserving cache: ${cacheName}`);
              return;
            }
            console.log(`🗑️ [CACHE] Deleting cache: ${cacheName}`);
            return await caches.delete(cacheName);
          })
        );
        console.log('✅ [CACHE] Configuration caches cleared, video cache preserved');
      } catch (error) {
        console.log('⚠️ [CACHE] Service worker cache deletion error:', error);
      }
    }
    
    // Fire event to notify components to reload from CSV
    window.dispatchEvent(new CustomEvent('cache-cleared'));
    window.dispatchEvent(new CustomEvent('comprehensive-config-updated'));
    console.log('✅ [CACHE] Cache clearing complete - CSV changes should now be visible');
    
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
  console.log('🚀 [CACHE] PWA Mode: Cache management disabled for offline functionality');
  console.log('ℹ️ [CACHE] Service worker caches will persist for offline support');
  
  // DISABLED: Do not clear caches automatically - this breaks PWA offline functionality
  // clearAllCachedData();
  
  // DISABLED: Do not clear on page reload - service worker needs persistent caches
  // window.addEventListener('beforeunload', () => {
  //   clearAllCachedData();
  // });
  
  console.log('✅ [CACHE] PWA offline mode active - caches preserved');
};