// Utility to clear cached configurations from storage
export const clearCachedConfigurations = () => {
  try {
    // Clear localStorage keys that might contain cached configurations
    const keysToRemove = [
      'comprehensive_config',
      'config_timestamp',
      'fallback_ui_text',
      'config_health'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear any IndexedDB configurations if they exist
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      // Attempt to delete configuration databases
      const deleteRequests = [
        indexedDB.deleteDatabase('comprehensive_config_db'),
        indexedDB.deleteDatabase('configuration_storage')
      ];
      
      deleteRequests.forEach(request => {
        request.onsuccess = () => {
          console.log('Cleared cached configuration database');
        };
        request.onerror = () => {
          console.log('No configuration database to clear');
        };
      });
    }
    
    console.log('Cleared all cached configurations - app will now use static content only');
    return true;
  } catch (error) {
    console.warn('Error clearing cached configurations:', error);
    return false;
  }
};

// Clear configurations on app initialization to ensure clean state
if (typeof window !== 'undefined') {
  clearCachedConfigurations();
}