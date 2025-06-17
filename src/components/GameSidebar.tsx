
import { CompactHealthMeters } from './CompactHealthMeters';
import { HealthMetrics, Language } from '../types';

interface GameSidebarProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
}

export const GameSidebar = ({ healthMetrics, language }: GameSidebarProps) => {
  return (
    <div className="w-80 lg:w-96 xl:w-[420px] h-full bg-gradient-to-b from-[#0072A0] to-[#0B424E] p-6 lg:p-8 overflow-y-auto">
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
