
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
    title: 'Journey Complete!',
    subtitle: 'You\'ve experienced how human choices impact the Scotian Shelf marine ecosystem',
    message: 'Every decision we make affects the delicate balance of ocean life. From plastic pollution to sustainable fishing, your choices today shape the future of marine conservation.',
    encouragement: 'Want to explore different outcomes? Try making different choices and see how they change the ecosystem.',
    restartButton: 'Start New Journey',
    choicesTitle: 'Your Impact'
  },
  fr: {
    title: 'Voyage terminé!',
    subtitle: 'Vous avez découvert comment les choix humains impactent l\'écosystème marin du plateau continental scotian',
    message: 'Chaque décision que nous prenons affecte l\'équilibre délicat de la vie océanique. De la pollution plastique à la pêche durable, vos choix d\'aujourd\'hui façonnent l\'avenir de la conservation marine.',
    encouragement: 'Voulez-vous explorer différents résultats? Essayez de faire des choix différents et voyez comment ils changent l\'écosystème.',
    restartButton: 'Nouveau voyage',
    choicesTitle: 'Votre impact'
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
            {positiveChoices.length >= 2 && (language === 'en' ? 'Excellent work! Your choices promote healthy marine ecosystems.' : language === 'fr' ? 'Excellent travail! Vos choix favorisent des écosystèmes marins sains.' : 'Kelu wetulti\'k! Kil koqoey elkewek pilei samqwanikatl ukepmikatl.')}
            {positiveChoices.length === 1 && (language === 'en' ? 'Good effort! Some of your choices help marine conservation.' : language === 'fr' ? 'Bon effort! Certains de vos choix aident la conservation marine.' : 'Pilei wetulti\'k! Apjiw kil koqoey elkewek kepmikatl samqwanikatl.')}
            {positiveChoices.length === 0 && (language === 'en' ? 'Try again with different choices to see positive outcomes for marine life.' : language === 'fr' ? 'Essayez à nouveau avec des choix différents pour voir des résultats positifs pour la vie marine.' : 'Aqq nikma koqoey elkewek pilei samqwanikatl ukepmikatil.')}
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
