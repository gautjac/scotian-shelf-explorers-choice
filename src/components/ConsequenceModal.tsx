import { Choice, Language } from '../types';
import geometricBackground from '../assets/geometric-background.png';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
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
  const { getUIText } = useComprehensiveConfig();
  
  if (!isVisible) return null;
  return <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-6 lg:p-8" style={{
    backgroundImage: `url(${geometricBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      <div className={`bg-gradient-to-br ${impactColors[choice.impact]} rounded-3xl p-10 lg:p-12 max-w-6xl lg:max-w-7xl mx-auto text-white animate-scale-in shadow-2xl`}>
        <div className="text-center">
          
          
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-10 lg:mb-12">
            {getUIText('ConsequenceModal', 'Title', language) || 'Think About What Happens'}
          </h3>

          {/* Your Choice */}
          <div className="bg-white/20 rounded-2xl p-8 lg:p-10 mb-10">
            <h4 className="text-2xl lg:text-3xl font-semibold mb-6">
              {getUIText('ConsequenceModal', 'Your Choice Label', language) || 'Your Choice:'}
            </h4>
            <p className="text-xl lg:text-2xl leading-relaxed">{choice.text}</p>
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-12">
            {/* Pros */}
            <div className="bg-green-500/30 rounded-2xl p-8 lg:p-10">
              <h4 className="text-2xl lg:text-3xl font-semibold mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">✅</span>
                {getUIText('ConsequenceModal', 'The Pros', language) || 'The pros'}
              </h4>
              <p className="text-lg lg:text-xl leading-relaxed">{choice.pros}</p>
            </div>

            {/* Cons */}
            <div className="bg-red-500/30 rounded-2xl p-8 lg:p-10">
              <h4 className="text-2xl lg:text-3xl font-semibold mb-6 flex items-center justify-center gap-3">
                <span className="text-4xl">❌</span>
                {getUIText('ConsequenceModal', 'The Cons', language) || 'The cons'}
              </h4>
              <p className="text-lg lg:text-xl leading-relaxed">{choice.cons}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
            <button onClick={onReturn} className="bg-white/20 text-white px-12 py-6 lg:px-16 lg:py-8 rounded-2xl font-semibold text-2xl lg:text-3xl active:bg-white/40 transition-colors duration-200 shadow-lg min-h-[80px] lg:min-h-[100px] transform active:scale-95 border-2 border-white/40">
              {getUIText('ConsequenceModal', 'Return Button', language) || 'Go Back to Choices'}
            </button>
            
            <button onClick={onConfirm} className="bg-white text-gray-800 px-12 py-6 lg:px-16 lg:py-8 rounded-2xl font-semibold text-2xl lg:text-3xl active:bg-gray-200 transition-colors duration-200 shadow-lg min-h-[80px] lg:min-h-[100px] transform active:scale-95">
              {getUIText('ConsequenceModal', 'Confirm Button', language) || 'Yes I Choose This'}
            </button>
          </div>
        </div>
      </div>
    </div>;
};