
import { CompactHealthMeters } from './CompactHealthMeters';
import { GameActions } from './GameActions';
import { LanguageSelector } from './LanguageSelector';
import { HealthMetrics, Language } from '../types';

interface GameSidebarProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
  onBackToPreview: () => void;
  onRestart: () => void;
  onLanguageChange: (language: Language['code']) => void;
}

export const GameSidebar = ({ healthMetrics, language, onBackToPreview, onRestart, onLanguageChange }: GameSidebarProps) => {
  return (
    <div className="w-full h-full bg-[#0072A0] p-6 lg:p-8 overflow-y-auto">
      {/* Health Meters - compact version for sidebar */}
      <div className="mb-8">
        <CompactHealthMeters 
          healthMetrics={healthMetrics} 
          language={language}
        />
      </div>

      {/* Game Actions */}
      <div className="mb-8">
        <GameActions
          language={language}
          onBackToPreview={onBackToPreview}
          onRestart={onRestart}
        />
      </div>

      {/* Language Selector */}
      <div className="mb-8">
        <LanguageSelector 
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
          className="bg-[#0B424E]/30 backdrop-blur-sm rounded-2xl p-4"
        />
      </div>
    </div>
  );
};
