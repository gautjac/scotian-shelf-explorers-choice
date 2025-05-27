
import { LanguageSelector } from './LanguageSelector';
import { Language } from '../types';

interface WelcomeScreenProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onStart: () => void;
}

const welcomeText = {
  en: {
    title: 'Guardians of the Scotian Shelf',
    subtitle: 'Discover how human actions impact marine life on the Scotian Shelf',
    description: 'Explore interactive scenarios and see how your decisions affect the ocean ecosystem off Nova Scotia\'s coast. Make choices, learn from consequences, and replay to discover different outcomes.',
    startButton: 'Begin Your Journey',
    instruction: 'Touch to start exploring'
  },
  fr: {
    title: 'Gardiens du plateau continental scotian',
    subtitle: 'Découvrez comment les actions humaines impactent la vie marine du plateau continental scotian',
    description: 'Explorez des scénarios interactifs et voyez comment vos décisions affectent l\'écosystème océanique au large des côtes de la Nouvelle-Écosse. Faites des choix, apprenez des conséquences et rejouez pour découvrir différents résultats.',
    startButton: 'Commencer votre voyage',
    instruction: 'Touchez pour commencer l\'exploration'
  },
  mi: {
    title: 'Ankamkewe\'k Kespukek',
    subtitle: 'Wejkukuom talimkewe\'k samqwanikatl Kespukek',
    description: 'Kjinuatukewey koqoey elkewek aq nemi\'j samqwan Kespukek. Koqoey kisi elkewek, kenuk wejkukewek, aq aqq nikma koqoey nemiwultimk.',
    startButton: 'Mawita\'n',
    instruction: 'Pekowsin mawita\'si\'k'
  }
};

export const WelcomeScreen = ({ currentLanguage, onLanguageChange, onStart }: WelcomeScreenProps) => {
  const content = welcomeText[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B424E] via-[#0C556B] to-[#0072A0] flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden">
      {/* Animated background elements - using palette colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#008BBF]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#004DE]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CDE2ED]/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Language selector - larger for touch */}
        <div className="mb-12 flex justify-center">
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            className="bg-[#0B424E]/30 backdrop-blur-sm rounded-2xl p-6"
          />
        </div>

        {/* Main title - larger for 32" display */}
        <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 animate-fade-in">
          {content.title}
        </h1>

        {/* Subtitle - increased size */}
        <h2 className="text-2xl lg:text-3xl xl:text-4xl text-[#CDE2ED] mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {content.subtitle}
        </h2>

        {/* Description - larger text for readability */}
        <p className="text-xl lg:text-2xl xl:text-3xl text-[#CDE2ED]/90 mb-16 leading-relaxed max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
          {content.description}
        </p>

        {/* Start button - much larger for touch */}
        <button
          onClick={onStart}
          className="bg-white text-[#0B424E] px-16 py-8 lg:px-20 lg:py-10 rounded-full text-3xl lg:text-4xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in hover:bg-[#CDE2ED] min-h-[100px] lg:min-h-[120px]"
          style={{ animationDelay: '1.5s' }}
        >
          {content.startButton}
        </button>

        {/* Touch instruction - larger text */}
        <p className="text-[#CDE2ED]/80 mt-8 text-lg lg:text-xl animate-fade-in" style={{ animationDelay: '2s' }}>
          {content.instruction}
        </p>
      </div>

      {/* Marine life silhouettes - larger for visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B424E]/50 to-transparent">
        <div className="absolute bottom-6 left-12 text-8xl lg:text-9xl animate-pulse">🐋</div>
        <div className="absolute bottom-12 right-20 text-6xl lg:text-7xl animate-pulse" style={{ animationDelay: '1s' }}>🦞</div>
        <div className="absolute bottom-8 left-1/3 text-5xl lg:text-6xl animate-pulse" style={{ animationDelay: '2s' }}>🐟</div>
        <div className="absolute bottom-6 right-1/3 text-7xl lg:text-8xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌿</div>
      </div>
    </div>
  );
};
