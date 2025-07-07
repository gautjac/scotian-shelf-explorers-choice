
import { CompactHealthMeters } from './CompactHealthMeters';
import { HealthMetrics, Language } from '../types';

interface GameSidebarProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
}

export const GameSidebar = ({ healthMetrics, language }: GameSidebarProps) => {
  return (
    <div className="w-full h-full bg-[#0072A0] p-6 lg:p-8 overflow-y-auto">
      {/* Health Meters - compact version for sidebar */}
      <div className="mb-8">
        <CompactHealthMeters 
          healthMetrics={healthMetrics} 
          language={language}
        />
      </div>
    </div>
  );
};
