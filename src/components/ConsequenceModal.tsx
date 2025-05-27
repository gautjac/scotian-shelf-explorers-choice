
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-gradient-to-br ${impactColors[choice.impact]} rounded-2xl p-8 max-w-2xl mx-auto text-white animate-scale-in shadow-2xl`}>
        <div className="text-center">
          <div className="text-6xl mb-4">{impactEmojis[choice.impact]}</div>
          
          <h3 className="text-2xl font-bold mb-6">
            {language === 'en' && 'Impact of Your Choice'}
            {language === 'fr' && 'Impact de votre choix'}
            {language === 'mi' && 'Kil koqoey elkewek wenjo\'taq'}
          </h3>
          
          <p className="text-lg leading-relaxed mb-8 bg-white/20 rounded-xl p-6">
            {choice.consequence}
          </p>
          
          <button
            onClick={onContinue}
            className="bg-white text-gray-800 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            {continueText[language]}
          </button>
        </div>
      </div>
    </div>
  );
};
