import { scenarios } from '../data/content';
import { Choice } from '../types';
import { getChoiceImpact } from './impactConfiguration';

// CSV row interface for comprehensive export
interface ComprehensiveConfigRow {
  section: 'SCENARIOS' | 'UI_ELEMENTS' | 'IMPACT_VALUES';
  type: 'title' | 'description' | 'choice' | 'consequence' | 'pros' | 'cons' | 'ui_text' | 'impact';
  id: string;
  language: string;
  field: string;
  content: string;
  ecosystemImpact?: number;
  economicImpact?: number;
  communityImpact?: number;
  notes?: string;
}

// Parse copydeck CSV content
const parseCopydeckCSVContent = (csvContent: string) => {
  const lines = csvContent.split('\n');
  const uiElements: any[] = [];
  
  // Skip header and empty lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',');
    if (parts.length >= 5) {
      uiElements.push({
        screen: parts[0],
        element: parts[1],
        english: parts[2],
        french: parts[3],
        mikmaq: parts[4],
        notes: parts[5] || ''
      });
    }
  }
  
  return uiElements;
};

// Function to load static CSV configuration file
export const loadStaticCSVConfiguration = async (): Promise<any> => {
  try {
    console.log('🔄 [STATIC-CSV] Loading static CSV configuration...');
    const response = await fetch('/fixed_comprehensive_config.csv');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvContent = await response.text();
    console.log('✅ [STATIC-CSV] Successfully loaded CSV file');
    console.log('📊 [STATIC-CSV] CSV content preview:', csvContent.substring(0, 200));
    
    const config = parseComprehensiveCSV(csvContent);
    console.log('✅ [STATIC-CSV] Successfully parsed CSV configuration');
    console.log('📊 [STATIC-CSV] Config summary:', {
      scenarios: Object.keys(config.scenarios).length,
      uiLanguages: Object.keys(config.uiElements).length
    });
    
    return config;
  } catch (error) {
    console.error('❌ [STATIC-CSV] Failed to load static CSV configuration:', error);
    throw error;
  }
};

// Export comprehensive configuration to CSV
export const exportComprehensiveCSV = (): string => {
  const rows: ComprehensiveConfigRow[] = [];
  
  // Add scenario content
  Object.entries(scenarios).forEach(([language, scenarioList]) => {
    scenarioList.forEach(scenario => {
      // Add scenario title
      rows.push({
        section: 'SCENARIOS',
        type: 'title',
        id: scenario.id,
        language,
        field: 'title',
        content: scenario.title
      });
      
      // Add scenario description
      rows.push({
        section: 'SCENARIOS',
        type: 'description',
        id: scenario.id,
        language,
        field: 'description',
        content: scenario.description
      });
      
      // Add choices and their data
      scenario.choices.forEach(choice => {
        const impacts = getChoiceImpact(scenario.id, choice);
        
        // Choice text
        rows.push({
          section: 'SCENARIOS',
          type: 'choice',
          id: `${scenario.id}_${choice.id}`,
          language,
          field: 'text',
          content: choice.text,
          ecosystemImpact: impacts.ecosystem,
          economicImpact: impacts.economic,
          communityImpact: impacts.community
        });
        
        // Choice consequence
        if (choice.consequence) {
          rows.push({
            section: 'SCENARIOS',
            type: 'consequence',
            id: `${scenario.id}_${choice.id}`,
            language,
            field: 'consequence',
            content: choice.consequence
          });
        }
        
        // Choice pros
        if (choice.pros) {
          rows.push({
            section: 'SCENARIOS',
            type: 'pros',
            id: `${scenario.id}_${choice.id}`,
            language,
            field: 'pros',
            content: choice.pros
          });
        }
        
        // Choice cons
        if (choice.cons) {
          rows.push({
            section: 'SCENARIOS',
            type: 'cons',
            id: `${scenario.id}_${choice.id}`,
            language,
            field: 'cons',
            content: choice.cons
          });
        }
      });
    });
  });
  
  // Note: UI elements should be managed through the static CSV file now
  // No longer adding hardcoded UI elements to export
  
  // Create CSV header
  const header = [
    'Section',
    'Type', 
    'ID',
    'Language',
    'Field',
    'Content',
    'Ecosystem Impact (-50 to +50)',
    'Economic Impact (-50 to +50)',
    'Community Impact (-50 to +50)',
    'Notes'
  ].join(',');
  
  // Create CSV rows
  const csvRows = rows.map(row => [
    row.section,
    row.type,
    row.id,
    row.language,
    row.field,
    `"${row.content.replace(/"/g, '""')}"`,
    row.ecosystemImpact || '',
    row.economicImpact || '',
    row.communityImpact || '',
    row.notes ? `"${row.notes.replace(/"/g, '""')}"` : ''
  ].join(','));
  
  return [header, ...csvRows].join('\n');
};

// Parse comprehensive CSV and return structured configuration
export const parseComprehensiveCSV = (csvContent: string) => {
  console.log('🔧 [CSV-PARSE] Starting CSV parsing...');
  console.log('🔧 [CSV-PARSE] First 200 chars:', csvContent.substring(0, 200));
  console.log('🔧 [CSV-PARSE] Last 200 chars:', csvContent.substring(csvContent.length - 200));
  
  const lines = csvContent.split('\n');
  console.log('🔧 [CSV-PARSE] Total lines:', lines.length);
  console.log('🔧 [CSV-PARSE] Non-empty lines:', lines.filter(line => line.trim()).length);
  
  // Verify line distribution
  let headerLines = 0;
  let scenarioLines = 0;
  let uiLines = 0;
  let impactLines = 0;
  let emptyLines = 0;
  let invalidLines = 0;
  
  const config = {
    scenarios: {} as any,
    uiElements: {} as any,
    impactValues: {} as any
  };
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      emptyLines++;
      continue;
    }
    
    if (i === 1) {
      headerLines++;
    }
    
    // Parse CSV (handle quoted strings)
    const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
    if (!matches || matches.length < 6) {
      invalidLines++;
      console.warn(`🔧 [CSV-PARSE] Invalid line ${i}: insufficient columns (${matches?.length || 0})`, line.substring(0, 100));
      continue;
    }
    
    const values = matches.map(match => 
      match.startsWith(',') ? match.slice(1) : match
    ).map(value => 
      value.startsWith('"') && value.endsWith('"') 
        ? value.slice(1, -1).replace(/""/g, '"')
        : value
    );
    
    const [section, type, id, language, field, content, ecosystemStr, economicStr, communityStr, notes] = values;
    
    // Count line types
    if (section === 'SCENARIOS') {
      scenarioLines++;
    } else if (section === 'UI_ELEMENTS') {
      uiLines++;
    } else if (section === 'IMPACT_VALUES') {
      impactLines++;
    }
    
    // Only log every 50th line to avoid spam, plus first/last few
    if (i <= 5 || i >= lines.length - 5 || i % 50 === 0) {
      console.log(`🔧 [CSV-PARSE] Line ${i}:`, { section, type, id, language, field, content: content?.substring(0, 50) + '...' });
    }
    
    if (section === 'SCENARIOS') {
      // Parse scenario ID to get main scenario and choice ID
      const parts = id.split('_');
      const scenarioId = parts[0];
      const choiceId = parts.length > 1 ? parts[1] : null;
      
      if (!config.scenarios[scenarioId]) config.scenarios[scenarioId] = {};
      if (!config.scenarios[scenarioId][language]) config.scenarios[scenarioId][language] = { choices: [] };
      
      if (type === 'title' || type === 'description') {
        config.scenarios[scenarioId][language][field] = content;
      } else if (choiceId && (type === 'choice' || type === 'consequence' || type === 'pros' || type === 'cons')) {
        let choice = config.scenarios[scenarioId][language].choices.find((c: any) => c.id === choiceId);
        if (!choice) {
          choice = { id: choiceId };
          config.scenarios[scenarioId][language].choices.push(choice);
        }
        
        if (type === 'choice') choice.text = content;
        else if (type === 'consequence') choice.consequence = content;
        else if (type === 'pros') choice.pros = content;
        else if (type === 'cons') choice.cons = content;
        
        // Add impact values if present
        if (ecosystemStr || economicStr || communityStr) {
          choice.ecosystemImpact = parseInt(ecosystemStr) || 0;
          choice.economicImpact = parseInt(economicStr) || 0;
          choice.communityImpact = parseInt(communityStr) || 0;
        }
      }
    } else if (section === 'UI_ELEMENTS') {
      if (!config.uiElements[language]) config.uiElements[language] = {};
      if (!config.uiElements[language][id]) config.uiElements[language][id] = {};
      
      config.uiElements[language][id][field] = content;
      if (notes) config.uiElements[language][id].notes = notes;
    }
  }
  
  // Final processing summary
  console.log('🔧 [CSV-PARSE] Processing Summary:');
  console.log(`  📊 Total lines processed: ${lines.length}`);
  console.log(`  📊 Empty lines: ${emptyLines}`);
  console.log(`  📊 Invalid lines: ${invalidLines}`);
  console.log(`  📊 Scenario lines: ${scenarioLines}`);
  console.log(`  📊 UI Element lines: ${uiLines}`);
  console.log(`  📊 Impact Value lines: ${impactLines}`);
  console.log(`  📊 Valid data lines: ${scenarioLines + uiLines + impactLines}`);
  
  console.log('🔧 [CSV-PARSE] Final config structure:', {
    scenarios: Object.keys(config.scenarios),
    uiLanguages: Object.keys(config.uiElements),
    impactValues: Object.keys(config.impactValues)
  });
  console.log('🔧 [CSV-PARSE] Scenarios found:', Object.keys(config.scenarios));
  
  // Detailed scenario content check
  Object.keys(config.scenarios).forEach(scenarioId => {
    const scenario = config.scenarios[scenarioId];
    console.log(`🔧 [CSV-PARSE] Scenario ${scenarioId}:`, {
      languages: Object.keys(scenario),
      choicesInEn: scenario.en?.choices?.length || 0
    });
  });
  
  return config;
};

// Legacy function - kept for compatibility but not used as fallback anymore
export const parseCopydeckCSVForFallback = () => {
  console.log('⚠️ [DEPRECATED] parseCopydeckCSVForFallback called - this should not be used anymore');
  return {};
};

// Validate comprehensive configuration
export const validateComprehensiveConfig = (config: any): string[] => {
  const errors: string[] = [];
  
  // Check required languages
  const requiredLanguages = ['en', 'fr', 'mi'];
  
  // Validate scenarios (new structure: scenarios[scenarioId][language])
  if (config.scenarios) {
    const scenarioIds = Object.keys(config.scenarios);
    if (scenarioIds.length === 0) {
      errors.push('No scenarios found in configuration');
    } else {
      // Check each scenario has all required languages
      scenarioIds.forEach(scenarioId => {
        const scenario = config.scenarios[scenarioId];
        requiredLanguages.forEach(lang => {
          if (!scenario[lang]) {
            errors.push(`Missing ${lang} translation for scenario: ${scenarioId}`);
          }
        });
      });
    }
  } else {
    errors.push('No scenarios section found');
  }
  
  // Validate UI elements
  if (config.uiElements) {
    requiredLanguages.forEach(lang => {
      if (!config.uiElements[lang]) {
        errors.push(`Missing UI elements for language: ${lang}`);
      }
    });
  }
  
  return errors;
};