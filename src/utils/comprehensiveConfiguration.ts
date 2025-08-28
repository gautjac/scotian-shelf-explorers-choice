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
  uiElements.forEach(element => {
    if (element.english) {
      rows.push({
        section: 'UI_ELEMENTS',
        type: 'ui_text',
        id: `${element.screen}_${element.element}`,
        language: 'en',
        field: element.element,
        content: element.english,
        notes: element.notes
      });
    }
    
    if (element.french) {
      rows.push({
        section: 'UI_ELEMENTS',
        type: 'ui_text',
        id: `${element.screen}_${element.element}`,
        language: 'fr',
        field: element.element,
        content: element.french,
        notes: element.notes
      });
    }
    
    if (element.mikmaq) {
      rows.push({
        section: 'UI_ELEMENTS',
        type: 'ui_text',
        id: `${element.screen}_${element.element}`,
        language: 'mi',
        field: element.element,
        content: element.mikmaq,
        notes: element.notes
      });
    }
  });
  
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
  
  const lines = csvContent.split('\n');
  console.log('🔧 [CSV-PARSE] Total lines:', lines.length);
  
  const config = {
    scenarios: {} as any,
    uiElements: {} as any,
    impactValues: {} as any
  };
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV (handle quoted strings)
    const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
    if (!matches || matches.length < 6) continue;
    
    const values = matches.map(match => 
      match.startsWith(',') ? match.slice(1) : match
    ).map(value => 
      value.startsWith('"') && value.endsWith('"') 
        ? value.slice(1, -1).replace(/""/g, '"')
        : value
    );
    
    const [section, type, id, language, field, content, ecosystemStr, economicStr, communityStr, notes] = values;
    
    console.log('🔧 [CSV-PARSE] Processing row:', { section, type, id, language, field, content: content?.substring(0, 50) + '...' });
    
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
  
  return config;
};

// Export utilities for fallback usage
export const parseCopydeckCSVForFallback = () => {
  const lines = uiTextContent.trim().split('\n');
  const headers = lines[0].split(',');
  const data: any = {};
  
  // Map CSV headers to language codes
  const languageMapping: { [key: string]: string } = {
    'English': 'en',
    'French': 'fr',
    'Mi\'kmaw': 'mi'
  };
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const screen = values[0];
    const element = values[1];
    
    for (let j = 2; j < headers.length; j++) {
      const csvLanguage = headers[j];
      const languageCode = languageMapping[csvLanguage] || csvLanguage;
      const content = values[j];
      
      if (!data[languageCode]) data[languageCode] = {};
      if (!data[languageCode][screen]) data[languageCode][screen] = {};
      data[languageCode][screen][element] = content;
    }
  }
  
  return data;
};

export { uiTextContent };

// Validate comprehensive configuration
export const validateComprehensiveConfig = (config: any): string[] => {
  const errors: string[] = [];
  
  // Check required languages
  const requiredLanguages = ['en', 'fr', 'mi'];
  
  // Validate scenarios
  if (config.scenarios) {
    requiredLanguages.forEach(lang => {
      if (!config.scenarios[lang]) {
        errors.push(`Missing scenarios for language: ${lang}`);
      }
    });
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