import { useState, useEffect } from 'react';
import { scenarios } from '../data/content';
import { parseCopydeckCSVForFallback } from '../utils/comprehensiveConfiguration';
import { retrieveConfiguration } from '../utils/persistentStorage';
import { detectInvalidCachedData, clearAllCache, getValidScenarioIds } from '../utils/cacheManager';

// Hook to manage comprehensive configuration
export const useComprehensiveConfig = () => {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackUIText, setFallbackUIText] = useState<any>(null);
  const [forceStaticMode, setForceStaticMode] = useState(false);

  // Load configuration from persistent storage with localStorage fallback
  const reloadConfig = async () => {
    setIsLoading(true);
    console.log('🔄 [DEBUG] Reloading comprehensive config...');
    try {
      // Check for invalid cached data first
      const hasInvalidData = await detectInvalidCachedData();
      
      if (hasInvalidData) {
        console.log('Invalid cached data detected, clearing all caches...');
        await clearAllCache();
        setConfig(null);
        setIsLoading(false);
        return;
      }

      // Try persistent storage first
      let stored = await retrieveConfiguration('comprehensive');
      console.log('📦 [DEBUG] Retrieved from persistent storage:', stored);
      
      // Validate stored config
      if (stored) {
        const validScenarios = getValidScenarioIds();
        let configIsValid = true;
        
        if (stored.scenarios) {
          for (const language of Object.keys(stored.scenarios)) {
            const scenarioIds = Object.keys(stored.scenarios[language]);
            const hasInvalidScenarios = scenarioIds.some(id => 
              !validScenarios.includes(id.split('_')[0])
            );
            if (hasInvalidScenarios) {
              configIsValid = false;
              break;
            }
          }
        }
        
        if (!configIsValid) {
          console.log('Stored config contains invalid scenarios, clearing...');
          await clearAllCache();
          stored = null;
        }
      }
      
      // Fallback to localStorage
      if (!stored) {
        const localData = localStorage.getItem('comprehensiveConfiguration');
        if (localData) {
          stored = JSON.parse(localData);
          console.log('💾 [DEBUG] Retrieved from localStorage:', stored);
        }
      }
      
      console.log('✅ [DEBUG] Final config set:', stored);
      setConfig(stored || null);
    } catch (error) {
      console.error('❌ [DEBUG] Failed to load comprehensive configuration:', error);
      setConfig(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Parse fallback UI text on mount
    try {
      const parsedUI = parseCopydeckCSVForFallback();
      setFallbackUIText(parsedUI);
    } catch (error) {
      console.error('Failed to parse fallback UI text:', error);
    }

    // Check for force static mode
    const urlParams = new URLSearchParams(window.location.search);
    const forceStatic = urlParams.get('force_static') === 'true' || 
                       localStorage.getItem('force_static_content') === 'true';
    setForceStaticMode(forceStatic);
    
    console.log('🚀 [STATIC-MODE] Force static content mode:', forceStatic);

    // Load initial configuration unless force static mode is enabled
    if (!forceStatic) {
      reloadConfig();
    } else {
      console.log('⚡ [STATIC-MODE] Skipping config loading - using static content only');
      setIsLoading(false);
    }
  }, []);

  // Hot-reload configuration when uploads happen (same-tab) or in other tabs
  useEffect(() => {
    const handleConfigUpdated = () => reloadConfig();
    const handleCacheInvalidated = () => reloadConfig();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'comprehensiveConfiguration') reloadConfig();
    };

    window.addEventListener('comprehensive-config-updated', handleConfigUpdated as EventListener);
    window.addEventListener('cache-invalidated', handleCacheInvalidated as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('comprehensive-config-updated', handleConfigUpdated as EventListener);
      window.removeEventListener('cache-invalidated', handleCacheInvalidated as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, [reloadConfig]);

  // Get scenario text with STATIC CONTENT PRIORITY
  const getScenarioText = (scenarioId: string, field: string, language: string = 'en') => {
    console.log(`🔍 [SCENARIO-DEBUG] getScenarioText(${scenarioId}, ${field}, ${language})`);
    console.log(`🔧 [STATIC-MODE] Force static mode:`, forceStaticMode);
    
    // ALWAYS USE STATIC CONTENT FIRST (reverse priority)
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    
    const staticText = field === 'title' ? scenario?.title : 
                      field === 'description' ? scenario?.description : null;
    
    // In force static mode, ONLY return static content
    if (forceStaticMode || !config) {
      console.log(`⚡ [STATIC-MODE] USING STATIC CONTENT ONLY for ${scenarioId}.${field}:`, staticText?.substring(0, 100) + '...');
      return staticText;
    }
    
    // Check for cached override only if static content is missing and not in force mode
    if (!staticText && config?.scenarios?.[language]?.[scenarioId]?.[field]) {
      const override = config.scenarios[language][scenarioId][field];
      console.log(`📦 [SCENARIO-DEBUG] USING CACHED FALLBACK for ${scenarioId}.${field}:`, override.substring(0, 100) + '...');
      return override;
    }
    
    console.log(`✅ [SCENARIO-DEBUG] USING STATIC CONTENT for ${scenarioId}.${field}:`, staticText?.substring(0, 100) + '...');
    return staticText;
  };

  // Get choice text with STATIC CONTENT PRIORITY  
  const getChoiceText = (scenarioId: string, choiceId: string, field: string, language: string = 'en') => {
    const compositeId = `${scenarioId}_${choiceId}`;
    console.log(`🔍 [CHOICE-DEBUG] getChoiceText(${scenarioId}, ${choiceId}, ${field}, ${language})`);
    console.log(`🔧 [STATIC-MODE] Force static mode:`, forceStaticMode);
    
    // ALWAYS USE STATIC CONTENT FIRST (reverse priority)
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    const choice = scenario?.choices.find(c => c.id === choiceId);
    
    const staticText = field === 'text' ? choice?.text :
                      field === 'consequence' ? choice?.consequence :
                      field === 'pros' ? choice?.pros :
                      field === 'cons' ? choice?.cons : null;
    
    // In force static mode, ONLY return static content
    if (forceStaticMode || !config) {
      console.log(`⚡ [STATIC-MODE] USING STATIC CONTENT ONLY for ${compositeId}.${field}:`, staticText?.substring(0, 100) + '...');
      return staticText;
    }
    
    // Check for cached override only if static content is missing and not in force mode
    if (!staticText && config?.scenarios?.[language]?.[compositeId]?.[field]) {
      const override = config.scenarios[language][compositeId][field];
      console.log(`📦 [CHOICE-DEBUG] USING CACHED FALLBACK for ${compositeId}.${field}:`, override.substring(0, 100) + '...');
      return override;
    }
    
    console.log(`✅ [CHOICE-DEBUG] USING STATIC CONTENT for ${compositeId}.${field}:`, staticText?.substring(0, 100) + '...');
    return staticText;
  };

  // Get choice impact values with override support
  const getChoiceImpact = (scenarioId: string, choiceId: string, language: string = 'en') => {
    const compositeId = `${scenarioId}_${choiceId}`;
    
    if (config?.scenarios?.[language]?.[compositeId]) {
      const configChoice = config.scenarios[language][compositeId];
      if (configChoice.ecosystemImpact !== undefined && 
          configChoice.economicImpact !== undefined && 
          configChoice.communityImpact !== undefined) {
        return {
          ecosystem: configChoice.ecosystemImpact,
          economic: configChoice.economicImpact,
          community: configChoice.communityImpact
        };
      }
    }
    
    // Fallback to original content or legacy conversion
    return null;
  };

  // Get UI text with override support
  const getUIText = (screenId: string, elementId: string, language: string = 'en') => {
    const compositeId = `${screenId}_${elementId}`;
    
    if (config?.uiElements?.[language]?.[compositeId]?.[elementId]) {
      return config.uiElements[language][compositeId][elementId];
    }
    
    // Fallback to parsed copydeck content
    if (fallbackUIText?.[language]?.[screenId]?.[elementId]) {
      return fallbackUIText[language][screenId][elementId];
    }
    
    return null;
  };


  // Function to enable force static mode
  const enableForceStaticMode = () => {
    console.log('🚀 [STATIC-MODE] Enabling force static content mode');
    localStorage.setItem('force_static_content', 'true');
    setForceStaticMode(true);
    setConfig(null); // Clear any cached config
  };

  // Function to disable force static mode
  const disableForceStaticMode = () => {
    console.log('🔄 [STATIC-MODE] Disabling force static content mode');
    localStorage.removeItem('force_static_content');
    setForceStaticMode(false);
    reloadConfig(); // Reload config
  };

  return {
    config,
    isLoading,
    getScenarioText,
    getChoiceText,
    getChoiceImpact,
    getUIText,
    reloadConfig,
    hasConfig: !!config,
    forceStaticMode,
    enableForceStaticMode,
    disableForceStaticMode
  };
};