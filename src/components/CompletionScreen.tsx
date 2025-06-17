import { LanguageSelector } from './LanguageSelector';
import { Language } from '../types';

interface CompletionScreenProps {
  language: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onRestart: () => void;
  choicesMade: Array<{ scenarioId: string; choiceId: string; timestamp: number }>;
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

export const CompletionScreen = ({ language, onLanguageChange, onRestart, choicesMade }: CompletionScreenProps) => {
  const content = completionText[language];
  const positiveChoices = choicesMade.filter(choice => choice.choiceId.includes('ban-plastics') || choice.choiceId.includes('sustainable') || choice.choiceId.includes('renewable') || choice.choiceId.includes('marine-reserves') || choice.choiceId.includes('cleanup') || choice.choiceId.includes('carbon-capture'));

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-600 via-blue-700 to-blue-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated success elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-teal-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Celebration emoji */}
        <div className="text-8xl mb-6 animate-bounce">🌊🐋🎉</div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          {content.title}
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {content.subtitle}
        </h2>

        {/* Impact summary */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold text-white mb-4">{content.choicesTitle}</h3>
          <div className="text-6xl mb-4">
            {positiveChoices.length >= 2 ? '🌊💚' : positiveChoices.length === 1 ? '🌊💛' : '🌊💔'}
          </div>
          <p className="text-blue-100 text-lg">
            {positiveChoices.length >= 2 && (language === 'en' ? 'Great job! Your choices help keep the ocean healthy.' : language === 'fr' ? 'Excellent travail! Vos choix aident à garder l\'océan en bonne santé.' : 'Kelu wetulti\'k! Kil koqoey elkewek pilei samqwanikatl ukepmikatl.')}
            {positiveChoices.length === 1 && (language === 'en' ? 'Good work! Some of your choices help sea animals.' : language === 'fr' ? 'Bon travail! Certains de vos choix aident les animaux marins.' : 'Pilei wetulti\'k! Apjiw kil koqoey elkewek kepmikatl samqwanikatl.')}
            {positiveChoices.length === 0 && (language === 'en' ? 'Try again with different choices to help sea animals more.' : language === 'fr' ? 'Essayez encore avec différents choix pour aider davantage les animaux marins.' : 'Aqq nikma koqoey elkewek pilei samqwanikatl ukepmikatil.')}
          </p>
        </div>

        {/* Message */}
        <p className="text-lg text-blue-50 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '1.5s' }}>
          {content.message}
        </p>

        {/* Encouragement */}
        <p className="text-blue-200 mb-8 animate-fade-in" style={{ animationDelay: '2s' }}>
          {content.encouragement}
        </p>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="bg-white text-blue-900 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-fade-in hover:bg-blue-50"
          style={{ animationDelay: '2.5s' }}
        >
          {content.restartButton}
        </button>
      </div>

      {/* Language selector - bottom right corner */}
      <div className="absolute bottom-8 right-8 z-20">
        <LanguageSelector 
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
          className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
        />
      </div>

      {/* Celebrating marine life */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <div className="absolute bottom-4 left-8 text-6xl animate-bounce">🐋</div>
        <div className="absolute bottom-8 right-16 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🦞</div>
        <div className="absolute bottom-6 left-1/3 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🐟</div>
        <div className="absolute bottom-4 right-1/3 text-5xl animate-bounce" style={{ animationDelay: '1.5s' }}>🌿</div>
      </div>
    </div>
  );
};
