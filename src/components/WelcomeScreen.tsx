
import { LanguageSelector } from './LanguageSelector';
import { Language } from '../types';

interface WelcomeScreenProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onStart: () => void;
}

const welcomeText = {
  en: {
    title: 'Your Choices, Their Future',
    subtitle: 'Discover how human actions impact marine life on the Scotian Shelf',
    description: 'Explore interactive scenarios and see how your decisions affect the ocean ecosystem off Nova Scotia\'s coast. Make choices, learn from consequences, and replay to discover different outcomes.',
    startButton: 'Begin Your Journey',
    instruction: 'Touch to start exploring'
  },
  fr: {
    title: 'Vos choix, leur avenir',
    subtitle: 'Découvrez comment les actions humaines impactent la vie marine du plateau continental scotian',
    description: 'Explorez des scénarios interactifs et voyez comment vos décisions affectent l\'écosystème océanique au large des côtes de la Nouvelle-Écosse. Faites des choix, apprenez des conséquences et rejouez pour découvrir différents résultats.',
    startButton: 'Commencer votre voyage',
    instruction: 'Touchez pour commencer l\'exploration'
  },
  mi: {
    title: 'Kil koqoey elkewek, nka ukamskusuwakon',
    subtitle: 'Wejkukuom talimkewe\'k samqwanikatl Kespukek',
    description: 'Kjinuatukewey koqoey elkewek aq nemi\'j samqwan Kespukek. Koqoey kisi elkewek, kenuk wejkukewek, aq aqq nikma koqoey nemiwultimk.',
    startButton: 'Mawita\'n',
    instruction: 'Pekowsin mawita\'si\'k'
  }
};

export const WelcomeScreen = ({ currentLanguage, onLanguageChange, onStart }: WelcomeScreenProps) => {
  const content = welcomeText[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-teal-600 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-blue-300/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Language selector */}
        <div className="mb-8 flex justify-center">
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
          />
        </div>

        {/* Main title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          {content.title}
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {content.subtitle}
        </h2>

        {/* Description */}
        <p className="text-lg text-blue-50 mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
          {content.description}
        </p>

        {/* Start button */}
        <button
          onClick={onStart}
          className="bg-white text-blue-900 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-fade-in hover:bg-blue-50"
          style={{ animationDelay: '1.5s' }}
        >
          {content.startButton}
        </button>

        {/* Touch instruction */}
        <p className="text-blue-200 mt-6 animate-fade-in" style={{ animationDelay: '2s' }}>
          {content.instruction}
        </p>
      </div>

      {/* Marine life silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/50 to-transparent">
        <div className="absolute bottom-4 left-8 text-6xl animate-pulse">🐋</div>
        <div className="absolute bottom-8 right-16 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🦞</div>
        <div className="absolute bottom-6 left-1/3 text-3xl animate-pulse" style={{ animationDelay: '2s' }}>🐟</div>
        <div className="absolute bottom-4 right-1/3 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌿</div>
      </div>
    </div>
  );
};
