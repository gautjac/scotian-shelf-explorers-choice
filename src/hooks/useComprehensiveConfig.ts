import { useState, useEffect } from 'react';
import { scenarios } from '../data/content';
import { loadStaticCSVConfiguration } from '../utils/comprehensiveConfiguration';
import { retrieveConfiguration } from '../utils/persistentStorage';

// Hook to manage comprehensive configuration
export const useComprehensiveConfig = () => {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [staticConfig, setStaticConfig] = useState<any>(null);

  // Load static CSV configuration as default source of truth
  const loadStaticConfig = async () => {
    try {
      console.log('🔄 [CONFIG] Loading static CSV configuration...');
      const staticCfg = await loadStaticCSVConfiguration();
      setStaticConfig(staticCfg);
      console.log('✅ [CONFIG] Static CSV configuration loaded');
    } catch (error) {
      console.error('❌ [CONFIG] Failed to load static CSV configuration:', error);
      setStaticConfig(null);
    }
  };

  // Load configuration with static CSV as fallback
  const reloadConfig = async () => {
    setIsLoading(true);
    console.log('🔄 [DEBUG] Reloading comprehensive config...');
    try {
      // Try persistent storage first (user overrides)
      let stored = await retrieveConfiguration('comprehensive');
      console.log('📦 [DEBUG] Retrieved from persistent storage:', stored);
      
      // Fallback to localStorage (user overrides)
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
    // Load static CSV configuration first
    loadStaticConfig();
    
    // Load initial configuration (user overrides)
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

  // Get scenario text with CSV as source of truth and user override support
  const getScenarioText = (scenarioId: string, field: string, language: string = 'en') => {
    console.log(`🔍 [DEBUG] getScenarioText(${scenarioId}, ${field}, ${language})`);
    
    // Check user overrides first
    if (config?.scenarios?.[scenarioId]?.[language]?.[field]) {
      const override = config.scenarios[scenarioId][language][field];
      console.log(`✅ [DEBUG] Found user override for ${scenarioId}.${field}:`, override);
      return override;
    }
    
    // Use static CSV as primary source
    if (staticConfig?.scenarios?.[scenarioId]?.[language]?.[field]) {
      const csvValue = staticConfig.scenarios[scenarioId][language][field];
      console.log(`📄 [DEBUG] Found CSV value for ${scenarioId}.${field}:`, csvValue);
      return csvValue;
    }
    
    // Final fallback to original content (should rarely be needed)
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    
    const fallback = field === 'title' ? scenario?.title : 
                    field === 'description' ? scenario?.description : null;
    
    console.log(`📋 [DEBUG] Using hardcoded fallback for ${scenarioId}.${field}:`, fallback);
    return fallback;
  };

  // Get choice text with CSV as source of truth and user override support
  const getChoiceText = (scenarioId: string, choiceId: string, field: string, language: string = 'en') => {
    console.log(`🔍 [DEBUG] getChoiceText(${scenarioId}, ${choiceId}, ${field}, ${language})`);
    
    // Check user overrides first
    if (config?.scenarios?.[scenarioId]?.[language]?.choices) {
      const choice = config.scenarios[scenarioId][language].choices.find((c: any) => c.id === choiceId);
      if (choice?.[field]) {
        console.log(`✅ [DEBUG] Found user override for choice ${scenarioId}_${choiceId}.${field}`);
        return choice[field];
      }
    }
    
    // Use static CSV as primary source
    if (staticConfig?.scenarios?.[scenarioId]?.[language]?.choices) {
      const choice = staticConfig.scenarios[scenarioId][language].choices.find((c: any) => c.id === choiceId);
      if (choice?.[field]) {
        console.log(`📄 [DEBUG] Found CSV value for choice ${scenarioId}_${choiceId}.${field}`);
        return choice[field];
      }
    }
    
    // Final fallback to original content
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    const choice = scenario?.choices.find(c => c.id === choiceId);
    
    const fallback = field === 'text' ? choice?.text :
                    field === 'consequence' ? choice?.consequence :
                    field === 'pros' ? choice?.pros :
                    field === 'cons' ? choice?.cons : null;
    
    console.log(`📋 [DEBUG] Using hardcoded fallback for choice ${scenarioId}_${choiceId}.${field}:`, fallback);
    return fallback;
  };

  // Get choice impact values with CSV as source of truth and user override support
  const getChoiceImpact = (scenarioId: string, choiceId: string, language: string = 'en') => {
    // Check user overrides first
    if (config?.scenarios?.[scenarioId]?.[language]?.choices) {
      const choice = config.scenarios[scenarioId][language].choices.find((c: any) => c.id === choiceId);
      if (choice && choice.ecosystemImpact !== undefined && 
          choice.economicImpact !== undefined && 
          choice.communityImpact !== undefined) {
        return {
          ecosystem: choice.ecosystemImpact,
          economic: choice.economicImpact,
          community: choice.communityImpact
        };
      }
    }
    
    // Use static CSV as primary source
    if (staticConfig?.scenarios?.[scenarioId]?.[language]?.choices) {
      const choice = staticConfig.scenarios[scenarioId][language].choices.find((c: any) => c.id === choiceId);
      if (choice && choice.ecosystemImpact !== undefined && 
          choice.economicImpact !== undefined && 
          choice.communityImpact !== undefined) {
        return {
          ecosystem: choice.ecosystemImpact,
          economic: choice.economicImpact,
          community: choice.communityImpact
        };
      }
    }
    
    // Fallback to original content or legacy conversion
    return null;
  };

  // Get UI text with CSV as source of truth and user override support
  const getUIText = (screenId: string, elementId: string, language: string = 'en') => {
    const compositeId = `${screenId}_${elementId}`;
    const combinedId = `${screenId} ${elementId}`;
    
    // Check user overrides first - try exact elementId
    if (config?.uiElements?.[language]?.[compositeId]?.[elementId]) {
      return config.uiElements[language][compositeId][elementId];
    }
    
    // Check user overrides - try combined format (e.g., "Progress Label")
    if (config?.uiElements?.[language]?.[compositeId]?.[combinedId]) {
      return config.uiElements[language][compositeId][combinedId];
    }
    
    // Use static CSV as primary source - try exact elementId
    if (staticConfig?.uiElements?.[language]?.[compositeId]?.[elementId]) {
      return staticConfig.uiElements[language][compositeId][elementId];
    }
    
    // Use static CSV - try combined format (e.g., "Progress Label")
    if (staticConfig?.uiElements?.[language]?.[compositeId]?.[combinedId]) {
      return staticConfig.uiElements[language][compositeId][combinedId];
    }
    
    return null;
  };


  return {
    config,
    staticConfig,
    isLoading,
    getScenarioText,
    getChoiceText,
    getChoiceImpact,
    getUIText,
    reloadConfig,
    hasConfig: !!config || !!staticConfig
  };
};