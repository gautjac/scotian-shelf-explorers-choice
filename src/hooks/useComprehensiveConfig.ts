import { useState, useEffect } from 'react';
import { scenarios } from '../data/content';
import { parseCopydeckCSVForFallback } from '../utils/comprehensiveConfiguration';
import { retrieveConfiguration } from '../utils/persistentStorage';

// Hook to manage comprehensive configuration
export const useComprehensiveConfig = () => {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackUIText, setFallbackUIText] = useState<any>(null);

  // Load configuration from persistent storage with localStorage fallback
  const reloadConfig = async () => {
    setIsLoading(true);
    try {
      // Try persistent storage first
      let stored = await retrieveConfiguration('comprehensive');
      
      // Fallback to localStorage
      if (!stored) {
        const localData = localStorage.getItem('comprehensiveConfiguration');
        if (localData) {
          stored = JSON.parse(localData);
        }
      }
      
      setConfig(stored || null);
    } catch (error) {
      console.error('Failed to load comprehensive configuration:', error);
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