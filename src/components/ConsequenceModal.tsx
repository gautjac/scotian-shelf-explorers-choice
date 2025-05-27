
import { Choice, Language } from '../types';

interface ConsequenceModalProps {
  choice: Choice;
  language: Language['code'];
  onContinue: () => void;
  isVisible: boolean;
}

const impactEmojis = {
  positive: '🌊✨',
  negative: '⚠️🌊',
  neutral: '🌊'
};

const impactColors = {
  positive: 'from-green-500 to-teal-600',
  negative: 'from-red-500 to-orange-600',
  neutral: 'from-blue-500 to-indigo-600'
};

export const ConsequenceModal = ({ choice, language, onContinue, isVisible }: ConsequenceModalProps) => {
  if (!isVisible) return null;

  const continueText = {
    en: 'Continue',
    fr: 'Continuer',
    mi: 'Eykisk'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 lg:p-8">
      <div className={`bg-gradient-to-br ${impactColors[choice.impact]} rounded-3xl p-10 lg:p-12 max-w-4xl lg:max-w-5xl mx-auto text-white animate-scale-in shadow-2xl`}>
        <div className="text-center">
          <div className="text-8xl lg:text-9xl mb-6">{impactEmojis[choice.impact]}</div>
          
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 lg:mb-10">
            {language === 'en' && 'Impact of Your Choice'}
            {language === 'fr' && 'Impact de votre choix'}
            {language === 'mi' && 'Kil koqoey elkewek wenjo\'taq'}
          </h3>
          
          <p className="text-xl lg:text-2xl xl:text-3xl leading-relaxed mb-10 lg:mb-12 bg-white/20 rounded-2xl p-8 lg:p-10">
            {choice.consequence}
          </p>
          
          <button
            onClick={onContinue}
            className="bg-white text-gray-800 px-12 py-6 lg:px-16 lg:py-8 rounded-2xl font-semibold text-2xl lg:text-3xl hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 shadow-lg min-h-[80px] lg:min-h-[100px] transform hover:scale-105 active:scale-95"
          >
            {continueText[language]}
          </button>
        </div>
      </div>
    </div>
  );
};
