
import { FloatingLanguageHeader } from './FloatingLanguageHeader';
import { Language } from '../types';
import geometricBackground from '../assets/geometric-background.png';

interface WelcomeScreenProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onStart: () => void;
  onBackToLanguageSelection: () => void;
}

const welcomeText = {
  en: {
    title: 'Become a guardian of the Scotian Shelf',
    subtitle: 'Discover how people can affect sea life',
    description: 'Play games and see how your choices change ocean animals off Nova Scotia\'s coast. Make choices, learn what happens, and play again to try different things.',
    startButton: 'Start Playing',
    instruction: 'Touch to start'
  },
  fr: {
    title: 'Gardiens du plateau continental scotian',
    subtitle: 'Découvrez comment les gens peuvent affecter la vie marine',
    description: 'Jouez à des jeux et voyez comment vos choix changent les animaux océaniques au large des côtes de la Nouvelle-Écosse. Faites des choix, apprenez ce qui arrive et rejouez pour essayer différentes choses.',
    startButton: 'Commencer à jouer',
    instruction: 'Touchez pour commencer'
  },
  mi: {
    title: 'Ankamkewe\'k Kespukek',
    subtitle: 'Wejkukuom talimkewe\'k ketu samqwanikatl',
    description: 'Kjinuatukewey koqoey elkewek aq nemi\'j samqwan Kespukek. Koqoey kisi elkewek, kenuk wejkukewek, aq aqq nikma koqoey nemiwultimk.',
    startButton: 'Mawita\'n',
    instruction: 'Pekowsin mawita\'si\'k'
  }
};

export const WelcomeScreen = ({ currentLanguage, onLanguageChange, onStart, onBackToLanguageSelection }: WelcomeScreenProps) => {
  const content = welcomeText[currentLanguage];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden" style={{ backgroundImage: `url(${geometricBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Animated background elements - using palette colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#008BBF]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#004DE]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CDE2ED]/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Semi-transparent whale background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=1920&h=1080&fit=crop)`,
          backgroundPosition: 'center 40%'
        }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Main title - larger for 32" display */}
        <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 animate-fade-in drop-shadow-2xl">
          {content.title}
        </h1>

        {/* Subtitle - increased size */}
        <h2 className="text-2xl lg:text-3xl xl:text-4xl text-[#CDE2ED] mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {content.subtitle}
        </h2>

        {/* Start button - much larger for touch */}
        <button
          onClick={onStart}
          className="bg-white text-[#0B424E] px-16 py-8 lg:px-20 lg:py-10 rounded-full text-3xl lg:text-4xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in hover:bg-[#CDE2ED] min-h-[100px] lg:min-h-[120px]"
          style={{ animationDelay: '1.5s' }}
        >
          {content.startButton}
        </button>

      </div>

      {/* Floating Language Header */}
      <FloatingLanguageHeader
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        onBackToLanguageSelection={onBackToLanguageSelection}
      />

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
