
import { HealthMeters } from './HealthMeters';
import { LanguageSelector } from './LanguageSelector';
import { HealthMetrics, Language } from '../types';

interface GameHeaderProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
}

export const GameHeader = ({ healthMetrics, language, onLanguageChange }: GameHeaderProps) => {
  return (
    <div className="max-w-7xl mx-auto mb-10 lg:mb-12">
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        <div className="flex-1">
          <HealthMeters 
            healthMetrics={healthMetrics} 
            language={language}
          />
        </div>
        <LanguageSelector 
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
          className="bg-[#0B424E]/30 backdrop-blur-sm rounded-2xl p-6"
        />
      </div>
    </div>
  );
};
