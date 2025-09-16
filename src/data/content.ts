// Single source of truth - re-export from offline content
console.log('📦 [CONTENT] Loading content from offlineContent.ts - single source of truth active');

export { 
  languages, 
  scenarios, 
  marineSpecies 
} from './offlineContent';

// Debug: Log what we're actually exporting
import { scenarios as debugScenarios } from './offlineContent';
console.log('🔍 [CONTENT] Loaded scenarios for debugging:', {
  en: debugScenarios.en?.slice(0, 2).map(s => ({ id: s.id, title: s.title.substring(0, 50) + '...' })),
  fr: debugScenarios.fr?.slice(0, 2).map(s => ({ id: s.id, title: s.title.substring(0, 50) + '...' })),
  mi: debugScenarios.mi?.slice(0, 2).map(s => ({ id: s.id, title: s.title.substring(0, 50) + '...' }))
});
console.log('✅ [CONTENT] Static content loaded successfully from offlineContent.ts');