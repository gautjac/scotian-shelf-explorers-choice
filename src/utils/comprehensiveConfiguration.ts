import { scenarios } from '../data/content';
import { Choice } from '../types';
import { getChoiceImpact } from './impactConfiguration';
import Papa from 'papaparse';

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

// Parse copydeck CSV content with proper CSV parsing
export const parseCopydeckCSVContent = (csvContent: string) => {
  console.log('📊 [CSV-PARSE] Starting improved CSV parsing...');
  
  const parseResult = Papa.parse(csvContent, {
    header: false,
    skipEmptyLines: true,
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ',',
    transform: (value: string) => value.trim()
  });

  if (parseResult.errors.length > 0) {
    console.warn('⚠️ [CSV-PARSE] Parse errors:', parseResult.errors);
  }

  const rows = parseResult.data as string[][];
  if (rows.length === 0) return { result: {}, errors: ['No data found in CSV'], successCount: 0 };
  
  const headers = rows[0];
  console.log('📊 [CSV-PARSE] Headers found:', headers);
  
  // Map headers to language codes
  const languageMap: { [key: string]: string } = {
    'English': 'en',
    'French': 'fr',
    "Mi'kmaw": 'mi'
  };
  
  const result: { [screenId: string]: { [elementId: string]: { [lang: string]: string } } } = {};
  const errors: string[] = [];
  let successCount = 0;
  
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    const lineNumber = i + 1;
    
    if (values.length < 2) {
      errors.push(`Line ${lineNumber}: Insufficient columns (need at least 2)`);
      continue;
    }
    
    const screenId = values[0];
    const elementId = values[1];
    
    if (!screenId || !elementId) {
      errors.push(`Line ${lineNumber}: Missing screen ID or element ID`);
      continue;
    }
    
    if (!result[screenId]) {
      result[screenId] = {};
    }
    
    if (!result[screenId][elementId]) {
      result[screenId][elementId] = {};
    }
    
    let hasValidContent = false;
    
    // Process language columns
    for (let j = 2; j < Math.min(values.length, headers.length); j++) {
      const headerName = headers[j];
      const langCode = languageMap[headerName] || headerName.toLowerCase();
      const value = values[j];
      
      if (value && value !== '""' && value !== "''") {
        result[screenId][elementId][langCode] = value;
        hasValidContent = true;
      }
    }
    
    if (hasValidContent) {
      successCount++;
      console.log(`✅ [CSV-PARSE] Line ${lineNumber}: ${screenId}.${elementId} imported successfully`);
    } else {
      errors.push(`Line ${lineNumber}: No valid content found for ${screenId}.${elementId}`);
    }
  }
  
  console.log(`📊 [CSV-PARSE] Import complete: ${successCount} entries imported, ${errors.length} errors`);
  
  return { result, errors, successCount };
};

// UI text from copydeck.csv content
const uiTextContent = `Screen,Element,English,French,Mi'kmaw,Notes
WelcomeScreen,Title,Guardians of the Scotian Shelf,Gardiens du plateau continental scotian,Ankamkewe'k Kespukek,Main title
WelcomeScreen,Subtitle,See how people affect sea life near Nova Scotia,Découvrez comment les gens affectent la vie marine près de la Nouvelle-Écosse,Wejkukuom talimkewe'k samqwanikatl Kespukek,Subtitle description
WelcomeScreen,Start Button,Start Playing,Commencer à jouer,Mawita'n,Main CTA button
WelcomeScreen,Touch Instruction,Touch to start,Touchez pour commencer,Pekowsin mawita'si'k,Bottom instruction text
ScenarioPreview,Title,Your Ocean Adventure,Votre aventure océanique,Samqwan alasutmaqan petkik,Main heading
ScenarioPreview,Subtitle,Look at what you will do,Regardez ce que vous ferez,Nemi'j koqoey ketu nemitultine'k,Description
ScenarioPreview,Start Button,Start Adventure,Commencer l'aventure,Mawita'n kiskukewey,Main CTA
ScenarioPreview,Back Button,Go Back,Retourner,Apijiw piluei,Navigation button
ScenarioPreview,Instruction,You will make important choices,Vous ferez des choix importants,Msit koqoey ketu elkewek,Info text
ScenarioPreview,Select Scenario,Click on any story to start there,Cliquez sur une histoire pour commencer,Pekowsin koqoey mawita'si'k,Action instruction
ScenarioCard,Question Prompt,What would you do?,Que feriez-vous?,Koqoey ketu elkewek?,Choice selection prompt
ConsequenceModal,Title,Think About What Happens,Pensez à ce qui arrive,Ankweyul koqoey wejkukewek,Modal heading
ConsequenceModal,Your Choice Label,Your Choice:,Votre choix:,Kil koqoey:,Section label
ConsequenceModal,Positive Impact,Good Things,Bonnes choses,Weli koqoey,Pros section header
ConsequenceModal,Negative Impact,Bad Things,Mauvaises choses,Maw koqoey,Cons section header
ConsequenceModal,Confirm Button,Yes I Choose This,Oui je choisis cela,Ketu'k koqoey,Confirmation button
ConsequenceModal,Return Button,Go Back to Choices,Retour aux choix,Eykisk koqoey elkewey,Cancel button
ConsequenceModal,The Pros,The pros,Les avantages,Weli koqoey,Pros label
ConsequenceModal,The Cons,The cons,Les inconvénients,Maw koqoey,Cons label
GameActions,Back to Scenarios,Back to Stories,Retour aux histoires,Kluskap koqoey,Navigation button
GameActions,Restart,Start Over,Recommencer,Pilei mawita'sin,Reset button
CompletionScreen,Title,MISSION ACCOMPLISHED!,Vous avez réussi!,Ankamkewey kespek!,Completion title
CompletionScreen,Subtitle,Your choices have an impact!,Vos choix ont un impact!,Kil koqoey ankamtimul!,Achievement description
CompletionScreen,Message,Every choice we make changes ocean life. Things like plastic trash and fishing affect sea animals. Your choices today help decide what happens to the ocean tomorrow.,Chaque choix que nous faisons change la vie océanique. Des choses comme les déchets plastiques et la pêche affectent les animaux marins. Vos choix d'aujourd'hui aident à décider ce qui arrive à l'océan demain.,Msit koqoey elkewekl menaqanej samqwan ukamskusuwakon. Pekisk aq pilei pu'tu'n kil koqoey elkewek nukta samqwanikatl kepmikatl.,Educational message
CompletionScreen,Encouragement,Want to see what happens with different choices? Try again and pick different things to see how they change the ocean.,Voulez-vous voir ce qui arrive avec différents choix? Essayez encore et choisissez différentes choses pour voir comment elles changent l'océan.,Ketu aqq koqoey nemituom? Ula koqoey elkewek aq nemi'j samqwan ankamtimul.,Replay encouragement
CompletionScreen,Restart Button,Play Again,Jouer encore,Siawey ankamkewey,Restart CTA
CompletionScreen,Your Impact,How You Did,Comment vous avez fait,Kil wenjo'taqn,Impact section title
CompletionScreen,Excellent Work,Great job! Your choices help keep the ocean healthy.,Excellent travail! Vos choix aident à garder l'océan en bonne santé.,Kelu wetulti'k! Kil koqoey elkewek pilei samqwanikatl ukepmikatl.,High positive score message
CompletionScreen,Good Effort,Good work! Some of your choices help sea animals.,Bon travail! Certains de vos choix aident les animaux marins.,Pilei wetulti'k! Apjiw kil koqoey elkewek kepmikatl samqwanikatl.,Medium score message
CompletionScreen,Try Again,Try again with different choices to help sea animals more.,Essayez encore avec différents choix pour aider davantage les animaux marins.,Aqq nikma koqoey elkewek pilei samqwanikatl ukepmikatil.,Low score message
HealthTransitionScreen,Title,Ocean Impact,Impact sur l'océan,Kepkek ta'n telitaqsit,Impact screen title
HealthTransitionScreen,Impact Text,Your choice has changed the ocean health...,Votre choix a changé la santé de l'océan...,Kil koqoey kesalul kepkek wula'tioqn...,Impact description
HealthTransitionScreen,Next Scenario,Next scenario,Prochain scénario,Aq tett,Continue to next
HealthTransitionScreen,Final Results,Final results,Résultats finaux,Klu'su'n,Go to completion
HealthTransitionScreen,Next Button,Next,Suivant,Aqq,Continue button
CompactHealthMeters,Marine Health,Ocean Health,Santé océanique,Samqwan ukamkinu'kuom,Health section title
CompactHealthMeters,Ecosystem,Animals & Plants,Animaux et plantes,Ukamkinu'kuom,Ecosystem health label
CompactHealthMeters,Economic,Money & Jobs,Argent et emplois,Toqwa'tu'k,Economic health label
CompactHealthMeters,Community,People,Gens,L'nui,Community health label
HealthMeters,Marine Health Status,How Healthy is the Ocean,Comment va l'océan,Samqwanikatl ukamkinu'kuom,Full health display title
HealthMeters,Ecosystem Health,Animals & Plants Health,Santé des animaux et plantes,Ukamkinu'kuom samqwan,Full ecosystem label
HealthMeters,Economic Health,Money & Jobs Health,Santé de l'argent et des emplois,Toqwa'tu'k samqwan,Full economic label
HealthMeters,Community Health,People's Health,Santé des gens,L'nui samqwan,Full community label
HealthStatus,Thriving,Doing Great,Très bien,Pilei,80%+ health status
HealthStatus,Stable,Doing OK,Ça va,Nukek,60-79% health status
HealthStatus,Declining,Not Good,Pas bon,Tepisq,40-59% health status
HealthStatus,Critical,Very Bad,Très mauvais,Mekij,Below 40% health status
InactivityModal,Title,You've been away for a while,Vous êtes absent depuis un moment,Telkisqewe'k kiju,Inactivity modal title
InactivityModal,Still Here Button,I'm still here,Je suis toujours là,Aqq tett naka,Still here button
InactivityModal,Start Over Button,Start over,Recommencer,Pilei mawita'sin,Start over button
InactivityModal,Auto Redirect,Auto-redirect in {countdown} seconds,Redirection automatique dans {countdown} secondes,Apijiw-kijatukun {countdown} sekunt,Auto redirect countdown
LanguageSelector,English Button,English,English,English,English language button
LanguageSelector,French Button,Français,Français,Français,French language button
LanguageSelector,Mikmaw Button,Mi'kmaw,Mi'kmaw,Mi'kmaw,Mi'kmaw language button
OfflineStatus,Offline Message,You're currently offline,Vous êtes actuellement hors ligne,Maw kelulti'k,Offline status message
OfflineStatus,Online Text,Online,En ligne,Kelulti'k,Online status text
OfflineStatus,Offline Text,Offline,Hors ligne,Maw kelulti'k,Offline status text`;

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
  
  // Add UI elements
  const uiElements = parseCopydeckCSVContent(uiTextContent);
  if (uiElements.result) {
    Object.entries(uiElements.result).forEach(([screenId, elements]) => {
      Object.entries(elements).forEach(([elementId, langData]) => {
        Object.entries(langData as Record<string, string>).forEach(([lang, content]) => {
          if (content) {
            rows.push({
              section: 'UI_ELEMENTS',
              type: 'ui_text',
              id: `${screenId}_${elementId}`,
              language: lang,
              field: elementId,
              content: content
            });
          }
        });
      });
    });
  }
  
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
  console.log('📊 [COMPREHENSIVE-CSV] Starting improved comprehensive CSV parsing...');
  
  const parseResult = Papa.parse(csvContent, {
    header: false,
    skipEmptyLines: true,
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ',',
    transform: (value: string) => value.trim()
  });

  if (parseResult.errors.length > 0) {
    console.warn('⚠️ [COMPREHENSIVE-CSV] Parse errors:', parseResult.errors);
  }

  const rows = parseResult.data as string[][];
  if (rows.length === 0) return { config: null, errors: ['No data found in CSV'], successCount: 0 };
  
  const headers = rows[0];
  console.log('📊 [COMPREHENSIVE-CSV] Headers:', headers);
  
  const config: any = {
    scenarios: {},
    uiElements: {}
  };
  
  const errors: string[] = [];
  let successCount = 0;
  
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    const lineNumber = i + 1;
    
    if (values.length < 5) {
      errors.push(`Line ${lineNumber}: Insufficient data (need at least 5 columns)`);
      continue;
    }
    
    const section = values[0];
    const type = values[1];
    const id = values[2];
    const language = values[3];
    const content = values[4];
    
    if (!section || !type || !id || !language || !content) {
      errors.push(`Line ${lineNumber}: Missing required data (section, type, id, language, or content)`);
      continue;
    }
    
    console.log(`📊 [COMPREHENSIVE-CSV] Processing Line ${lineNumber}: ${section}.${type}.${id} (${language})`);
    
    try {
      if (section === 'SCENARIOS') {
        if (!config.scenarios[id]) {
          config.scenarios[id] = {};
        }
        if (!config.scenarios[id][language]) {
          config.scenarios[id][language] = {};
        }
        config.scenarios[id][language][type] = content;
        
        // Handle impact values if present
        if (values.length >= 8) {
          const ecosystem = parseFloat(values[5]) || 0;
          const economic = parseFloat(values[6]) || 0;
          const community = parseFloat(values[7]) || 0;
          
          if (!config.scenarios[id][language].impacts) {
            config.scenarios[id][language].impacts = {};
          }
          if (type.startsWith('choice_') && type.includes('_impact')) {
            const choiceId = type.replace('_impact', '');
            config.scenarios[id][language].impacts[choiceId] = {
              ecosystem,
              economic,
              community
            };
          }
        }
      } else if (section === 'UI_ELEMENTS') {
        if (!config.uiElements[type]) {
          config.uiElements[type] = {};
        }
        if (!config.uiElements[type][id]) {
          config.uiElements[type][id] = {};
        }
        config.uiElements[type][id][language] = content;
      }
      
      successCount++;
    } catch (error) {
      errors.push(`Line ${lineNumber}: Error processing data - ${error}`);
    }
  }
  
  console.log(`📊 [COMPREHENSIVE-CSV] Parsing complete: ${successCount} entries processed, ${errors.length} errors`);
  return { config, errors, successCount };
};

// Export utilities for fallback usage
export const parseCopydeckCSVForFallback = () => {
  const csvContent = `Screen,Element,English,French,Mi'kmaw
WelcomeScreen,title,"Ocean Game","Jeu de l'océan","Wkte'pi Pugewa'kl"
WelcomeScreen,playButton,"Let's Play!","Jouer!","A'tu'tukan!"
WelcomeScreen,languageLabel,"Language","Langue","Na Teka'si"
LanguageSelectionScreen,title,"Choose Your Language","Choisissez votre langue","Ketu' tettuel"
LanguageSelectionScreen,englishButton,"English","Anglais","Aknu'tatimk"
LanguageSelectionScreen,frenchButton,"French","Français","Pransisisk"
LanguageSelectionScreen,mikmawButton,"Mi'kmaw","Mi'kmaw","Mi'kmaw"
ScenarioPreview,healthLabel,"Ocean Health","Santé de l'océan","Maqamikewiktuk Ta'n Tel-ke'k"
ScenarioPreview,economyLabel,"Economy","Économie","Ta'n Teluek"
ScenarioPreview,ecosystemLabel,"Ecosystem","Écosystème","Ekowsistem"
ScenarioPreview,communityLabel,"Community","Communauté","Weji'kewey"
ScenarioPreview,nextButton,"Next","Suivant","A'lukwet"
ScenarioPreview,previousButton,"Previous","Précédent","Sakiwi'k"
ScenarioPreview,playButton,"Continue","Continuer","A'tu'tu"
CompletionScreen,title,"Game Complete!","Jeu terminé!","Pugewa'kl Kiska'k!"
CompletionScreen,subtitle,"Great job! You've made important decisions for Nova Scotia's ocean.","Excellent! Vous avez pris des décisions importantes pour l'océan de la Nouvelle-Écosse.","Wel Lukwet! Nemitu'nnaq Kijituek Pel-nuo'tisk Ukamkok Kespek."
CompletionScreen,playAgainButton,"Play Again","Rejouer","A'tukwaqan"
CompletionScreen,resultsTitle,"Your Impact","Votre impact","Msit Koqoey Kelulukw"
CompletionScreen,overallHealthLabel,"Overall Ocean Health","Santé globale de l'océan","Msit Ta'n Wkte'k Te'luluk"
CompletionScreen,goodOutcome,"The ocean is thriving!","L'océan prospère!","Wkte'k Ankweyul!"
CompletionScreen,neutralOutcome,"The ocean is stable.","L'océan est stable.","Wkte'k Ketu' Teluek."
CompletionScreen,poorOutcome,"The ocean needs help.","L'océan a besoin d'aide.","Wkte'k Ankamtimuk."
GamePlayingScreen,choicesTitle,"What should we do?","Que devons-nous faire?","Koqoey Kelusite'tukw?"
GamePlayingScreen,impactPreview,"This choice will affect:","Ce choix affectera:","Uknu'taqan Teliaq:"`;
  
  const parseResult = parseCopydeckCSVContent(csvContent);
  return parseResult.result || {};
};

export { uiTextContent };

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