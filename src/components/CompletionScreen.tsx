import { HealthMetrics, Language, Choice } from '../types';
import { HealthMeters } from './HealthMeters';
import { FloatingLanguageHeader } from './FloatingLanguageHeader';
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
  const overallHealth = (healthMetrics.ecosystem + healthMetrics.economic + healthMetrics.community) / 3;

  const getOverallHealthMessage = (health: number, language: Language['code']) => {
    if (health >= 75) {
      return language === 'en' ? 'Great job! Your choices help keep the ocean healthy.' :
             language === 'fr' ? 'Excellent travail! Vos choix aident à garder l\'océan en bonne santé.' :
             'Pilei! Ketu kikewkulis wokisalutew kmu ukamkinu\'kuom samqwanikatl.';
    } else if (health >= 50) {
      return language === 'en' ? 'Good work! Some of your choices help sea animals.' :
             language === 'fr' ? 'Bon travail! Certains de vos choix aident les animaux marins.' :
             'Wolteye! Kitpu ketu kikewkulis wokisalutew ukamlamuktal.';
    } else {
      return language === 'en' ? 'Try again with different choices to help sea animals more.' :
             language === 'fr' ? 'Essayez encore avec des choix différents pour aider davantage les animaux marins.' :
             'Apoqot elkulewatultinisa pikiskaw wokisalutinisaq ukamlamuktal.';
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
            {language === 'en' ? 'MISSION ACCOMPLISHED!' :
             language === 'fr' ? 'MISSION ACCOMPLIE!' :
             'LUKWAKN KISITAQ!'}
          </h1>
          
          <p className="text-2xl lg:text-3xl text-blue-100 mb-8">
            {language === 'en' ? 'Your choices have an impact!' :
             language === 'fr' ? 'Vos choix ont un impact!' :
             'Ketu kikewkulis mijuaqanikatl!'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {language === 'en' ? 'How You Did' :
             language === 'fr' ? 'Comment vous avez fait' :
             'Tami kisitulip'}
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
            {language === 'en' ? 'Every choice we make changes ocean life. Things like plastic trash and fishing affect sea animals. Your choices today help decide what happens to the ocean tomorrow.' :
             language === 'fr' ? 'Chaque choix que nous faisons change la vie océanique. Des choses comme les déchets plastiques et la pêche affectent les animaux marins. Vos choix d\'aujourd\'hui aident à décider ce qui arrive à l\'océan demain.' :
             'Amu kikewkul kesalultultijik ukamkinu\'kuomk memajutew. Koqoey kaqtawlmuewakon aqq tmaluwewa wokisnuatutew ukamlamuktal. Ketu kikewkulis kesk\'tuk wokisalutew tami kiju kesaluatuk ukamkinu\'kuom saqipunk.'}
          </p>
          <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
            {language === 'en' ? 'Want to see what happens with different choices? Try again and pick different things to see how they change the ocean.' :
             language === 'fr' ? 'Voulez-vous voir ce qui se passe avec des choix différents? Essayez encore et choisissez des choses différentes pour voir comment elles changent l\'océan.' :
             'Ula wape\'wol tami kiju kesaluk aptekutomuwakon kikewkulek? Apoqot elkulewatultinisa aqq netukulin aptekuton koqoey nenawisq uk ukamkinu\'kuomk.'}
          </p>
        </div>

        <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-white/20 hover:bg-white/30 text-white px-12 py-6 rounded-3xl font-bold text-2xl transition-all duration-200 shadow-xl border border-white/30 hover:scale-105"
        >
          {language === 'en' ? 'Play Again' :
           language === 'fr' ? 'Jouer encore' :
           'Ap elkulewati'}
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