import { HealthMetrics, Language, Choice } from '../types';
import { HealthMeters } from './HealthMeters';
import { FloatingLanguageHeader } from './FloatingLanguageHeader';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import geometricBackground from '../assets/geometric-background.png';

interface CompletionScreenProps {
  language: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onRestart: () => void;
  choicesMade: Array<{
    scenarioId: string;
    choiceId: string;
    timestamp: number;
  }>;
  healthMetrics: HealthMetrics;
  onBackToLanguageSelection: () => void;
}

export const CompletionScreen = ({
  language,
  onLanguageChange,
  onRestart,
  choicesMade,
  healthMetrics,
  onBackToLanguageSelection
}: CompletionScreenProps) => {
  const { getUIText } = useComprehensiveConfig();
  const overallHealth = (healthMetrics.ecosystem + healthMetrics.economic + healthMetrics.community) / 3;

  const getOverallHealthMessage = (health: number, language: Language['code']) => {
    if (health >= 75) {
      return getUIText('CompletionScreen', 'Excellent Work', language) || 
             'Great job! Your choices help keep the ocean healthy.';
    } else if (health >= 50) {
      return getUIText('CompletionScreen', 'Good Effort', language) || 
             'Good work! Some of your choices help sea animals.';
    } else {
      return getUIText('CompletionScreen', 'Try Again', language) || 
             'Try again with different choices to help sea animals more.';
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 lg:p-8"
      style={{
        backgroundImage: `url(${geometricBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <FloatingLanguageHeader 
        currentLanguage={language}
        onLanguageChange={onLanguageChange}
        onBackToLanguageSelection={onBackToLanguageSelection}
      />

      <div className="bg-gradient-to-br from-[#0B424E]/95 to-[#0C556B]/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto text-white shadow-2xl animate-fade-in">
        
        <div className="text-center mb-12">
          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 animate-pulse-glow">
            {getUIText('CompletionScreen', 'Title', language) || 'MISSION ACCOMPLISHED!'}
          </h1>
          
          <p className="text-2xl lg:text-3xl text-blue-100 mb-8">
            {getUIText('CompletionScreen', 'Subtitle', language) || 'Your choices have an impact!'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {getUIText('CompletionScreen', 'Your Impact', language) || 'How You Did'}
          </h2>
          
          <HealthMeters 
            healthMetrics={healthMetrics}
            language={language}
            showInitialAnimation={true}
          />
          
          <div className="mt-8 p-6 bg-white/10 rounded-2xl">
            <p className="text-lg lg:text-xl text-center text-blue-100">
              {getOverallHealthMessage(overallHealth, language)}
            </p>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">What We Learned</h3>
          <p className="text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
            {getUIText('CompletionScreen', 'Message', language) || 'Every choice we make changes ocean life. Things like plastic trash and fishing affect sea animals. Your choices today help decide what happens to the ocean tomorrow.'}
          </p>
          <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
            {getUIText('CompletionScreen', 'Encouragement', language) || 'Want to see what happens with different choices? Try again and pick different things to see how they change the ocean.'}
          </p>
        </div>

        <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-white/20 hover:bg-white/30 text-white px-12 py-6 rounded-3xl font-bold text-2xl transition-all duration-200 shadow-xl border border-white/30 hover:scale-105"
        >
          {getUIText('CompletionScreen', 'Restart Button', language) || 'Play Again'}
        </button>
        </div>
      </div>

      {/* Animated Marine Life */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-4 animate-swim-by text-4xl"
              style={{
                left: `${-10 + (i * 25)}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + (i * 3)}s`
              }}
            >
              {['🐟', '🐠', '🦈', '🐙', '🦀', '🐡'][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};