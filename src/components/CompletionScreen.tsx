import { LanguageSelector } from './LanguageSelector';
import { HealthMeters } from './HealthMeters';
import { Language, HealthMetrics } from '../types';
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
}
const completionText = {
  en: {
    title: 'You Did It!',
    subtitle: 'You learned how people\'s choices affect sea animals near Nova Scotia',
    message: 'Every choice we make changes ocean life. Things like plastic trash and fishing affect sea animals. Your choices today help decide what happens to the ocean tomorrow.',
    encouragement: 'Want to see what happens with different choices? Try again and pick different things to see how they change the ocean.',
    restartButton: 'Play Again',
    choicesTitle: 'How You Did'
  },
  fr: {
    title: 'Vous avez réussi!',
    subtitle: 'Vous avez appris comment les choix des gens affectent les animaux marins près de la Nouvelle-Écosse',
    message: 'Chaque choix que nous faisons change la vie océanique. Des choses comme les déchets plastiques et la pêche affectent les animaux marins. Vos choix d\'aujourd\'hui aident à décider ce qui arrive à l\'océan demain.',
    encouragement: 'Voulez-vous voir ce qui arrive avec différents choix? Essayez encore et choisissez différentes choses pour voir comment elles changent l\'océan.',
    restartButton: 'Jouer encore',
    choicesTitle: 'Comment vous avez fait'
  },
  mi: {
    title: 'Ankamkewey kespek!',
    subtitle: 'Wejkukuom talitakuom ketu samqwanikatl Kespukek',
    message: 'Msit koqoey elkewekl menaqanej samqwan ukamskusuwakon. Pekisk aq pilei pu\'tu\'n, kil koqoey elkewek nukta samqwanikatl kepmikatl.',
    encouragement: 'Ketu aqq koqoey nemituom? Ula koqoey elkewek aq nemi\'j samqwan ankamtimul.',
    restartButton: 'Siawey ankamkewey',
    choicesTitle: 'Kil wenjo\'taqn'
  }
};
export const CompletionScreen = ({
  language,
  onLanguageChange,
  onRestart,
  choicesMade,
  healthMetrics
}: CompletionScreenProps) => {
  const content = completionText[language];
  const positiveChoices = choicesMade.filter(choice => choice.choiceId.includes('ban-plastics') || choice.choiceId.includes('sustainable') || choice.choiceId.includes('renewable') || choice.choiceId.includes('marine-reserves') || choice.choiceId.includes('cleanup') || choice.choiceId.includes('carbon-capture'));

  // Calculate overall ocean health average
  const overallHealth = Math.round((healthMetrics.ecosystem + healthMetrics.economic + healthMetrics.community) / 3);
  const getOverallHealthMessage = () => {
    if (overallHealth >= 80) {
      return {
        en: "Excellent! The ocean is thriving thanks to your wise choices!",
        fr: "Excellent! L'océan prospère grâce à vos choix judicieux!",
        mi: "Pilei! Samqwan ukamkinu'kuom pilei welta'q kil koqoey!"
      };
    } else if (overallHealth >= 60) {
      return {
        en: "Good work! The ocean is in decent health with room to improve.",
        fr: "Bon travail! L'océan est en bonne santé avec de la place pour s'améliorer.",
        mi: "Pilei wetulti'k! Samqwan nukek welta'q, ketu nugu' pilei kesalul."
      };
    } else if (overallHealth >= 40) {
      return {
        en: "The ocean is struggling. Different choices could help it recover.",
        fr: "L'océan est en difficulté. Des choix différents pourraient l'aider à récupérer.",
        mi: "Samqwan tepisq. Ula koqoey elkewek wulkwatmul nukta."
      };
    } else {
      return {
        en: "The ocean is in critical condition. We must make better choices.",
        fr: "L'océan est dans un état critique. Nous devons faire de meilleurs choix.",
        mi: "Samqwan mekij welta'q. Pilei koqoey elkewekl."
      };
    }
  };
  const healthMessage = getOverallHealthMessage();
  return <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-teal-900 flex flex-col p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full animate-pulse" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-green-400/10 rounded-full animate-pulse" style={{
        animationDelay: '2s'
      }} />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="text-6xl mb-4 animate-bounce">🌊🏆</div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          {content.title}
        </h1>
        <h2 style={{
        animationDelay: '0.5s'
      }} className="text-lg text-blue-100 animate-fade-in md:text-4xl">
          {content.subtitle}
        </h2>
      </div>

      {/* Main Content - Health Meters */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full py-0 my-[65px]">
        <div className="mb-8 text-center">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 animate-fade-in" style={{
          animationDelay: '1s'
        }}>
            {language === 'en' && 'Final Ocean Health Results'}
            {language === 'fr' && 'Résultats finaux de la santé océanique'}
            {language === 'mi' && 'Qeq samqwan ukamkinu\'kuom kesaltuoq'}
          </h3>
          <div className="text-4xl md:text-6xl font-bold text-white mb-2 animate-fade-in" style={{
          animationDelay: '1.2s'
        }}>
            {overallHealth}%
          </div>
          <p className="text-lg md:text-xl text-blue-100 animate-fade-in" style={{
          animationDelay: '1.4s'
        }}>
            {healthMessage[language]}
          </p>
        </div>

        {/* Health Meters - Featured prominently */}
        <div className="w-full animate-fade-in" style={{
        animationDelay: '1.5s'
      }}>
          <HealthMeters healthMetrics={healthMetrics} language={language} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 text-center mt-8 my-0">
        {/* Educational Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto animate-fade-in" style={{
        animationDelay: '2s'
      }}>
          <p className="text-blue-50 leading-relaxed mb-4 text-2xl mx-0">
            {content.message}
          </p>
          <p className="text-blue-200">
            {content.encouragement}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={onRestart} className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{
          animationDelay: '2.5s'
        }}>
            {content.restartButton}
          </button>
        </div>
      </div>

      {/* Language selector - bottom right corner */}
      <div className="absolute bottom-8 right-8 z-20">
        <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} className="bg-white/20 backdrop-blur-sm rounded-xl p-4" />
      </div>

      {/* Floating marine life decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <div className="absolute bottom-4 left-8 text-4xl animate-bounce opacity-70">🐋</div>
        <div className="absolute bottom-8 right-16 text-3xl animate-bounce opacity-70" style={{
        animationDelay: '0.5s'
      }}>🦞</div>
        <div className="absolute bottom-6 left-1/3 text-2xl animate-bounce opacity-70" style={{
        animationDelay: '1s'
      }}>🐟</div>
        <div className="absolute bottom-4 right-1/3 text-3xl animate-bounce opacity-70" style={{
        animationDelay: '1.5s'
      }}>🌿</div>
      </div>
    </div>;
};