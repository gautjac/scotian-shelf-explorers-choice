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
             'Wela\'liek! Kil keleweltaqanik welta\'simk ukamkinu\'kuom samqwanik.';
    } else if (health >= 50) {
      return language === 'en' ? 'Good work! Some of your choices help sea animals.' :
             language === 'fr' ? 'Bon travail! Certains de vos choix aident les animaux marins.' :
             'Welta\'si luki\'k! Alt keleweltaqanik welta\'simk ukamkinu\'kuom koqwei.';
    } else {
      return language === 'en' ? 'Try again with different choices to help sea animals more.' :
             language === 'fr' ? 'Essayez à nouveau avec des choix différents pour mieux aider les animaux marins.' :
             'Ap siawa\'tul pekisesk keleweltaqanik welta\'simk ukamkinu\'kuom koqwei.';
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 lg:p-8 pb-40"
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

      <div className="bg-gradient-to-br from-[#0B424E]/95 to-[#0C556B]/95 backdrop-blur-sm rounded-3xl p-7 max-w-6xl mx-auto text-white shadow-2xl animate-fade-in mb-32">
        
        <div className="text-center mb-7">
          <h1 className="text-[2.75rem] lg:text-5xl font-bold text-white mb-3 animate-pulse-glow">
            {language === 'en' ? 'MISSION ACCOMPLISHED!' :
             language === 'fr' ? 'MISSION ACCOMPLIE!' :
             'LUKI\'K KJISA\'TUK!'}
          </h1>
          
          <p className="text-lg lg:text-xl text-blue-100 mb-5">
            {language === 'en' ? 'Your choices have an impact!' :
             language === 'fr' ? 'Vos choix ont un impact!' :
             'Kil keleweltaqanik elta\'sikl!'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-7 mb-7">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-3">
            {language === 'en' ? 'How You Did' :
             language === 'fr' ? 'Comment vous avez fait' :
             'Tan teltulit'}
          </h2>
          
          <HealthMeters 
            healthMetrics={healthMetrics}
            language={language}
            showInitialAnimation={true}
          />
          
          <div className="mt-5 p-4 bg-white/10 rounded-2xl">
            <p className="text-sm lg:text-base text-center text-blue-100">
              {getOverallHealthMessage(overallHealth, language)}
            </p>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-7 mb-7">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-3">
            {language === 'en' ? 'What We Learned' :
             language === 'fr' ? 'Ce que nous avons appris' :
             'Koqoey kinu\'tm\'neu'}
          </h3>
          <p className="text-sm lg:text-base text-blue-100 leading-normal mb-3">
            {language === 'en' ? 'Every choice we make affects the ocean and its animals. Some choices help them grow stronger, while others can make things harder for them.' :
             language === 'fr' ? 'Chaque choix que nous faisons affecte l\'océan et ses animaux. Certains choix les aident à devenir plus forts, tandis que d\'autres peuvent rendre les choses plus difficiles pour eux.' :
             'Maw keleweltaqan etluemk elta\'sikl ukamkinu\'kuom aqq koqwei. Alt keleweltaqanik welta\'timk kjipusqeltimk, ula pekisesk koqoey a\'sutmukl mawijo\'tmikl.'}
          </p>
          <p className="text-sm lg:text-base text-blue-100 leading-normal">
            {language === 'en' ? 'Want to see what happens with different choices? Try again and pick different things to see how they change the ocean.' :
             language === 'fr' ? 'Voulez-vous voir ce qui se passe avec des choix différents? Essayez à nouveau et choisissez des choses différentes pour voir comment elles changent l\'océan.' :
             'Welta\'si nemu\'l tan teluen pekisesk keleweltaqanik? Ap siawa\'tul aqq kelewel pekisesk koqoey nemu\'l tan elta\'sikl ukamkinu\'kuom.'}
          </p>
        </div>

        <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-white/20 hover:bg-white/30 text-white px-10 py-3 rounded-3xl font-bold text-lg transition-all duration-200 shadow-xl border border-white/30 hover:scale-105"
        >
          {language === 'en' ? 'Play Again' :
           language === 'fr' ? 'Jouer encore' :
           'Ap pewatmui'}
        </button>
        </div>
      </div>

    </div>
  );
};