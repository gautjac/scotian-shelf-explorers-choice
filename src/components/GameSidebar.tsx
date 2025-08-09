
import { CompactHealthMeters } from './CompactHealthMeters';
import { GameActions } from './GameActions';
import { LanguageSelector } from './LanguageSelector';
import { HealthMetrics, Language } from '../types';

interface GameSidebarProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onBackToPreview: () => void;
  onRestart: () => void;
}

export const GameSidebar = ({ 
  healthMetrics, 
  language, 
  onLanguageChange, 
  onBackToPreview, 
  onRestart
}: GameSidebarProps) => {
  return (
    <div className="w-full h-full p-6 lg:p-8 overflow-y-auto flex flex-col">
      {/* Health Meters - compact version for sidebar */}
      <div className="mb-8">
        <CompactHealthMeters 
          healthMetrics={healthMetrics} 
          language={language}
        />
      </div>

      {/* Buttons section - evenly spaced at bottom */}
      <div className="mt-auto space-y-6">
        {/* Game Actions */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onBackToPreview}
            className="bg-[#0B424E]/30 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-medium text-lg hover:bg-[#0B424E]/40 active:bg-[#0B424E]/50 transition-colors duration-200 shadow-lg w-full"
          >
            {language === 'en' && 'Back to Stories'}
            {language === 'fr' && 'Retour aux histoires'}
            {language === 'mi' && 'Kluskap koqoey'}
          </button>
          <button
            onClick={onRestart}
            className="bg-[#0B424E]/30 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-medium text-lg hover:bg-[#0B424E]/40 active:bg-[#0B424E]/50 transition-colors duration-200 shadow-lg w-full"
          >
            {language === 'en' && 'Start Over'}
            {language === 'fr' && 'Recommencer'}
            {language === 'mi' && 'Pilei mawita\'sin'}
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center">
          <LanguageSelector 
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
            className="bg-[#0B424E]/30 backdrop-blur-sm rounded-2xl p-4"
          />
        </div>
      </div>
    </div>
  );
};
