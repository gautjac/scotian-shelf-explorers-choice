import { useState, useEffect } from 'react';
import { scenarios } from '../data/content';
import { parseCopydeckCSVForFallback } from '../utils/comprehensiveConfiguration';
import { loadOfflineConfig } from '../utils/offlineConfigManager';

// Hook to manage comprehensive configuration
export const useComprehensiveConfig = () => {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackUIText, setFallbackUIText] = useState<any>(null);

  // Load configuration with enhanced offline manager
  const reloadConfig = async () => {
    setIsLoading(true);
    console.log('🔄 [DEBUG] Reloading comprehensive config with enhanced manager...');
    try {
      const stored = await loadOfflineConfig('comprehensive');
      console.log('📦 [DEBUG] Retrieved from offline manager:', stored);
      
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

    // Load initial configuration
    reloadConfig();
  }, []);

  // Hot-reload configuration when uploads happen (same-tab) or in other tabs
  useEffect(() => {
    const handleConfigUpdated = () => reloadConfig();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'comprehensiveConfiguration') reloadConfig();
    };

    window.addEventListener('comprehensive-config-updated', handleConfigUpdated as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('comprehensive-config-updated', handleConfigUpdated as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, [reloadConfig]);

  // Get scenario text with override support
  const getScenarioText = (scenarioId: string, field: string, language: string = 'en') => {
    console.log(`🔍 [DEBUG] getScenarioText(${scenarioId}, ${field}, ${language})`);
    console.log(`📊 [DEBUG] Config available:`, !!config);
    console.log(`📊 [DEBUG] Config scenarios:`, config?.scenarios);
    
    if (config?.scenarios?.[language]?.[scenarioId]?.[field]) {
      const override = config.scenarios[language][scenarioId][field];
      console.log(`✅ [DEBUG] Found override for ${scenarioId}.${field}:`, override);
      return override;
    }
    
    // Fallback to original content
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    
    const fallback = field === 'title' ? scenario?.title : 
                    field === 'description' ? scenario?.description : null;
    
    console.log(`📋 [DEBUG] Using fallback for ${scenarioId}.${field}:`, fallback);
    return fallback;
  };

  // Get choice text with override support
  const getChoiceText = (scenarioId: string, choiceId: string, field: string, language: string = 'en') => {
    const compositeId = `${scenarioId}_${choiceId}`;
    console.log(`🔍 [DEBUG] getChoiceText(${scenarioId}, ${choiceId}, ${field}, ${language})`);
    console.log(`🔗 [DEBUG] Looking for composite ID: ${compositeId}`);
    
    if (config?.scenarios?.[language]?.[compositeId]?.[field]) {
      const override = config.scenarios[language][compositeId][field];
      console.log(`✅ [DEBUG] Found choice override for ${compositeId}.${field}:`, override);
      return override;
    }
    
    // Fallback to original content
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    const choice = scenario?.choices.find(c => c.id === choiceId);
    
    const fallback = field === 'text' ? choice?.text :
                    field === 'consequence' ? choice?.consequence :
                    field === 'pros' ? choice?.pros :
                    field === 'cons' ? choice?.cons : null;
    
    console.log(`📋 [DEBUG] Using choice fallback for ${compositeId}.${field}:`, fallback);
    return fallback;
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


  return {
    config,
    isLoading,
    getScenarioText,
    getChoiceText,
    getChoiceImpact,
    getUIText,
    reloadConfig,
    hasConfig: !!config
  };
};