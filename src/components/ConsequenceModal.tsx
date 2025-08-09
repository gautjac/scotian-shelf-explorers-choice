import { Choice, Language } from '../types';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import geometricBackground from '../assets/geometric-background.png';
interface ConsequenceModalProps {
  choice: Choice;
  language: Language['code'];
  scenarioId: string;
  onConfirm: () => void;
  onReturn: () => void;
  isVisible: boolean;
}
const impactEmojis = {
  positive: '🌊✨',
  negative: '⚠️🌊',
  neutral: '🌊'
};
const impactColors = {
  positive: 'from-green-500 to-teal-600',
  negative: 'from-[#0072A0] to-[#0C556B]',
  neutral: 'from-blue-500 to-indigo-600'
};
export const ConsequenceModal = ({
  choice,
  language,
  scenarioId,
  onConfirm,
  onReturn,
  isVisible
}: ConsequenceModalProps) => {
  if (!isVisible) return null;
  const {
    getChoiceText
  } = useComprehensiveConfig();
  const choiceText = getChoiceText(scenarioId, choice.id, 'text', language) ?? choice.text;
  const prosOverride = getChoiceText(scenarioId, choice.id, 'pros', language);
  const consOverride = getChoiceText(scenarioId, choice.id, 'cons', language);
  const confirmText = {
    en: 'Yes I Choose This',
    fr: 'Oui je choisis cela',
    mi: 'Ketu\'k koqoey'
  };
  const returnText = {
    en: 'Go Back to Choices',
    fr: 'Retour aux choix',
    mi: 'Eykisk koqoey elkewey'
  };
  const prosText = {
    en: 'The pros',
    fr: 'Les avantages',
    mi: 'Weli koqoey'
  };
  const consText = {
    en: 'The cons',
    fr: 'Les inconvénients',
    mi: 'Maw koqoey'
  };
  return <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-6 lg:p-8" style={{
    backgroundImage: `url(${geometricBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      <div className={`bg-gradient-to-br ${impactColors[choice.impact]} rounded-3xl p-10 lg:p-12 max-w-6xl lg:max-w-7xl mx-auto text-white animate-scale-in shadow-2xl`}>
        <div className="text-center">
          
          
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-10 lg:mb-12">
            {language === 'en' && 'Think About What Happens'}
            {language === 'fr' && 'Pensez à ce qui arrive'}
            {language === 'mi' && 'Ankweyul koqoey wejkukewek'}
          </h3>

          {/* Your Choice */}
          <div className="bg-white/20 rounded-2xl p-8 lg:p-10 mb-10">
            <h4 className="text-2xl lg:text-3xl font-semibold mb-6">
              {language === 'en' && 'Your Choice:'}
              {language === 'fr' && 'Votre choix:'}
              {language === 'mi' && 'Kil koqoey:'}
            </h4>
            <p className="text-xl lg:text-2xl leading-relaxed">{choiceText}</p>
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-12">
            {/* Pros */}
            <div className="bg-green-500/30 rounded-2xl p-8 lg:p-10">
              <h4 className="text-2xl lg:text-3xl font-semibold mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">✅</span>
                {prosText[language]}
              </h4>
              <p className="text-lg lg:text-xl leading-relaxed">{prosOverride ?? choice.pros}</p>
            </div>

            {/* Cons */}
            <div className="bg-red-500/30 rounded-2xl p-8 lg:p-10">
              <h4 className="text-2xl lg:text-3xl font-semibold mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">❌</span>
                {consText[language]}
              </h4>
              <p className="text-lg lg:text-xl leading-relaxed">{consOverride ?? choice.cons}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
            <button onClick={onReturn} className="bg-white/20 text-white px-12 py-6 lg:px-16 lg:py-8 rounded-2xl font-semibold text-2xl lg:text-3xl active:bg-white/40 transition-colors duration-200 shadow-lg min-h-[80px] lg:min-h-[100px] transform active:scale-95 border-2 border-white/40">
              {returnText[language]}
            </button>
            
            <button onClick={onConfirm} className="bg-white text-gray-800 px-12 py-6 lg:px-16 lg:py-8 rounded-2xl font-semibold text-2xl lg:text-3xl active:bg-gray-200 transition-colors duration-200 shadow-lg min-h-[80px] lg:min-h-[100px] transform active:scale-95">
              {confirmText[language]}
            </button>
          </div>
        </div>
      </div>
    </div>;
};