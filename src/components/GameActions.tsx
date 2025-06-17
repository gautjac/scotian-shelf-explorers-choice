
import { Language } from '../types';

interface GameActionsProps {
  language: Language['code'];
  onBackToPreview: () => void;
  onRestart: () => void;
}

export const GameActions = ({ language, onBackToPreview, onRestart }: GameActionsProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button
          onClick={onBackToPreview}
          className="bg-[#0B424E]/30 backdrop-blur-sm text-white px-8 py-6 lg:px-10 lg:py-8 rounded-2xl font-medium text-lg lg:text-xl hover:bg-[#0B424E]/40 active:bg-[#0B424E]/50 transition-colors duration-200 min-h-[70px] lg:min-h-[80px] shadow-lg min-w-[200px] lg:min-w-[250px]"
        >
          {language === 'en' && 'Back to Stories'}
          {language === 'fr' && 'Retour aux histoires'}
          {language === 'mi' && 'Kluskap koqoey'}
        </button>
        <button
          onClick={onRestart}
          className="bg-[#0B424E]/30 backdrop-blur-sm text-white px-8 py-6 lg:px-10 lg:py-8 rounded-2xl font-medium text-lg lg:text-xl hover:bg-[#0B424E]/40 active:bg-[#0B424E]/50 transition-colors duration-200 min-h-[70px] lg:min-h-[80px] shadow-lg min-w-[200px] lg:min-w-[250px]"
        >
          {language === 'en' && 'Start Over'}
          {language === 'fr' && 'Recommencer'}
          {language === 'mi' && 'Pilei mawita\'sin'}
        </button>
      </div>
    </div>
  );
};
