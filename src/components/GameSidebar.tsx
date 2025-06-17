
import { CompactHealthMeters } from './CompactHealthMeters';
import { LanguageSelector } from './LanguageSelector';
import { HealthMetrics, Language } from '../types';

interface GameSidebarProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
}

export const GameSidebar = ({ healthMetrics, language, onLanguageChange }: GameSidebarProps) => {
  return (
    <div className="w-80 lg:w-96 xl:w-[420px] h-full bg-gradient-to-b from-[#0072A0] to-[#0B424E] p-6 lg:p-8 overflow-y-auto">
      {/* Health Meters - compact version for sidebar */}
      <div className="mb-8">
        <CompactHealthMeters 
          healthMetrics={healthMetrics} 
          language={language}
        />
      </div>
      
      {/* Language Selector */}
      <div className="mt-8">
        <LanguageSelector 
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
          className="bg-[#0B424E]/30 backdrop-blur-sm rounded-2xl p-4"
        />
      </div>
    </div>
  );
};
