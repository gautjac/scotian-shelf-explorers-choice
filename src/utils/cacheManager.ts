// Utility to clear all cached configuration data and ensure single source of truth
export const clearAllCachedData = async () => {
  console.log('🧹 [CACHE] Clearing all cached data for single source of truth...');
  
  try {
    // Clear localStorage
    localStorage.removeItem('comprehensiveConfiguration');
    localStorage.removeItem('impactConfiguration');
    localStorage.removeItem('gameConfiguration');
    console.log('✅ [CACHE] Cleared localStorage');
    
    // Clear IndexedDB
    if ('indexedDB' in window) {
      try {
        // Try to delete the persistent storage database
        const deleteRequest = indexedDB.deleteDatabase('PersistentStorage');
        deleteRequest.onsuccess = () => {
          console.log('✅ [CACHE] Cleared IndexedDB');
        };
        deleteRequest.onerror = () => {
          console.log('⚠️ [CACHE] Could not clear IndexedDB');
        };
      } catch (error) {
        console.log('⚠️ [CACHE] IndexedDB deletion error:', error);
      }
    }
    
    // Clear any session storage
    sessionStorage.clear();
    console.log('✅ [CACHE] Cleared sessionStorage');
    
    // Fire event to notify components
    window.dispatchEvent(new CustomEvent('cache-cleared'));
    console.log('✅ [CACHE] Cache clearing complete');
    
  } catch (error) {
    console.error('❌ [CACHE] Error clearing cache:', error);
  }
};

// Initialize cache clearing on app start
export const initializeCacheClearing = () => {
  console.log('🚀 [CACHE] Initializing cache management for single source of truth');
  clearAllCachedData();
};