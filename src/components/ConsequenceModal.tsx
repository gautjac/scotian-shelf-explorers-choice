import { Choice, Language } from '../types';
import geometricBackground from '../assets/geometric-background.png';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import { languages } from '../data/content';
import speechBubbleIcon from '../assets/SpeechBubble.png';

interface ConsequenceModalProps {
  choice: Choice;
  language: Language['code'];
  scenarioId: string;
  onConfirm: () => void;
  onReturn: () => void;
  onLanguageChange: (language: Language['code']) => void;
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

const languageColors = {
  mi: 'bg-[#FBD026] text-black active:bg-[#FBD026]/80',
  en: 'bg-[#00AE9F] text-white active:bg-[#00AE9F]/80',
  fr: 'bg-[#AD4557] text-white active:bg-[#AD4557]/80'
};
export const ConsequenceModal = ({
  choice,
  language,
  scenarioId,
  onConfirm,
  onReturn,
  onLanguageChange,
  isVisible
}: ConsequenceModalProps) => {
  const { getUIText, isLoading } = useComprehensiveConfig();
  
  if (!isVisible) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-6 lg:p-8" style={{
        backgroundImage: `url(${geometricBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="bg-slate-400/80 rounded-3xl p-10 lg:p-12 max-w-6xl lg:max-w-7xl mx-auto text-white animate-scale-in shadow-2xl animate-pulse">
          <div className="text-center">
            <div className="h-12 bg-white/20 rounded mb-10" />
            <div className="bg-white/20 rounded-2xl p-8 lg:p-10 mb-10">
              <div className="h-8 bg-white/20 rounded mb-6" />
              <div className="h-6 bg-white/20 rounded" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-12">
              <div className="bg-white/20 rounded-2xl p-8 lg:p-10">
                <div className="h-8 bg-white/20 rounded mb-6" />
                <div className="h-20 bg-white/20 rounded" />
              </div>
              <div className="bg-white/20 rounded-2xl p-8 lg:p-10">
                <div className="h-8 bg-white/20 rounded mb-6" />
                <div className="h-20 bg-white/20 rounded" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
              <div className="h-20 bg-white/20 rounded-2xl flex-1" />
              <div className="h-20 bg-white/20 rounded-2xl flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-6 lg:p-8" style={{
    backgroundImage: `url(${geometricBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      <div className={`bg-gradient-to-br ${impactColors[choice.impact]} rounded-3xl p-8 max-w-6xl lg:max-w-7xl mx-auto text-white animate-scale-in shadow-2xl`}>
        <div className="text-center">
          
          
          <h3 className="text-3xl lg:text-4xl font-bold mb-8">
            {getUIText('ConsequenceModal', 'Title', language) || 'Think About What Happens'}
          </h3>

          {/* Your Choice */}
          <div className="bg-white/20 rounded-2xl p-6 mb-8">
            <h4 className="text-2xl lg:text-3xl font-semibold mb-6">
              {getUIText('ConsequenceModal', 'Your Choice Label', language) || 'Your Choice:'}
            </h4>
            <p className="text-xl lg:text-2xl leading-relaxed">{choice.text}</p>
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Pros */}
            <div className="bg-green-500/30 rounded-2xl p-6">
              <h4 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-3">
                <span className="text-3xl">✅</span>
                {getUIText('ConsequenceModal', 'The Pros', language) || 'The pros'}
              </h4>
              <p className="text-lg leading-relaxed">{choice.pros}</p>
            </div>

            {/* Cons */}
            <div className="bg-[#0072A0]/30 rounded-2xl p-6">
              <h4 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-3">
                <span className="text-3xl">❌</span>
                {getUIText('ConsequenceModal', 'The Cons', language) || 'The cons'}
              </h4>
              <p className="text-lg leading-relaxed">{choice.cons}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button onClick={onReturn} className="bg-[#0B424E] text-white px-12 py-4 lg:px-16 lg:py-5 rounded-2xl font-semibold text-2xl active:bg-[#0B424E]/90 transition-colors duration-200 shadow-lg min-h-[70px] lg:min-h-[80px] transform active:scale-95 border-2 border-white/40">
              {getUIText('ConsequenceModal', 'Return Button', language) || 'Go Back to Choices'}
            </button>
            
            <button onClick={onConfirm} className="bg-white text-gray-800 px-12 py-4 lg:px-16 lg:py-5 rounded-2xl font-semibold text-2xl active:bg-gray-200 transition-colors duration-200 shadow-lg min-h-[70px] lg:min-h-[80px] transform active:scale-95">
              {getUIText('ConsequenceModal', 'Confirm Button', language) || 'Yes I Choose This'}
            </button>
          </div>

          {/* Language Selection Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`w-[289px] min-h-[70px] rounded-2xl font-helvetica text-4xl font-bold transition-all duration-200 flex items-center justify-start gap-2 pl-6 ${
                  languageColors[lang.code]
                } ${
                  language === lang.code
                    ? 'scale-105 border-4 border-white'
                    : 'border-4 border-transparent'
                }`}
              >
                <img 
                  src={speechBubbleIcon} 
                  alt="" 
                  className={`w-12 h-12 ${lang.code === 'mi' ? 'brightness-0' : 'brightness-0 invert'}`}
                />
                {lang.nativeName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>;
};