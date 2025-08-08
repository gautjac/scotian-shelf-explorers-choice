import { useState, useEffect } from 'react';
import { scenarios } from '../data/content';

// Hook to manage comprehensive configuration
export const useComprehensiveConfig = () => {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Reload configuration from localStorage
  const reloadConfig = () => {
    try {
      const savedConfig = localStorage.getItem('comprehensiveConfiguration');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } else {
        setConfig(null);
      }
    } catch (error) {
      console.error('Failed to reload comprehensive configuration:', error);
    }
  };

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('comprehensiveConfiguration');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      }
    } catch (error) {
      console.error('Failed to load comprehensive configuration:', error);
    } finally {
      setIsLoading(false);
    }
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
    if (config?.scenarios?.[language]?.[scenarioId]?.[field]) {
      return config.scenarios[language][scenarioId][field];
    }
    
    // Fallback to original content
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    
    if (field === 'title') return scenario?.title;
    if (field === 'description') return scenario?.description;
    
    return null;
  };

  // Get choice text with override support
  const getChoiceText = (scenarioId: string, choiceId: string, field: string, language: string = 'en') => {
    const compositeId = `${scenarioId}_${choiceId}`;
    
    if (config?.scenarios?.[language]?.[compositeId]?.[field]) {
      return config.scenarios[language][compositeId][field];
    }
    
    // Fallback to original content
    const originalScenarios = scenarios[language as keyof typeof scenarios];
    const scenario = originalScenarios?.find(s => s.id === scenarioId);
    const choice = scenario?.choices.find(c => c.id === choiceId);
    
    if (field === 'text') return choice?.text;
    if (field === 'consequence') return choice?.consequence;
    if (field === 'pros') return choice?.pros;
    if (field === 'cons') return choice?.cons;
    
    return null;
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
    
    // Fallback to hardcoded text or original copydeck
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