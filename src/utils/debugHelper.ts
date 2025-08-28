// Debug helper to check what's stored
export const debugStoredContent = () => {
  console.log('🔍 [DEBUG-HELPER] Checking stored content...');
  
  const comprehensive = localStorage.getItem('comprehensiveConfiguration');
  const impact = localStorage.getItem('impactConfiguration');
  
  if (comprehensive) {
    try {
      const config = JSON.parse(comprehensive);
      console.log('📊 [DEBUG-HELPER] Comprehensive config found:', config);
      
      if (config.scenarios && config.scenarios['plastic-pollution'] && config.scenarios['plastic-pollution'].en) {
        const firstScenario = config.scenarios['plastic-pollution'].en;
        console.log('🎯 [DEBUG-HELPER] First scenario in stored config:', {
          title: firstScenario.title,
          description: firstScenario.description
        });
      }
    } catch (e) {
      console.error('❌ [DEBUG-HELPER] Failed to parse comprehensive config:', e);
    }
  } else {
    console.log('⚠️ [DEBUG-HELPER] No comprehensive configuration in localStorage');
  }
  
  if (impact) {
    console.log('📊 [DEBUG-HELPER] Impact config found:', impact.substring(0, 100));
  } else {
    console.log('⚠️ [DEBUG-HELPER] No impact configuration in localStorage');
  }
};

// Call this in console to check
(window as any).debugStoredContent = debugStoredContent;