
import { HealthMeters } from './HealthMeters';
import { HealthMetrics, Language } from '../types';

interface GameHeaderProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
}

export const GameHeader = ({ healthMetrics, language }: GameHeaderProps) => {
  return (
    <div className="max-w-7xl mx-auto mb-10 lg:mb-12">
      <HealthMeters 
        healthMetrics={healthMetrics} 
        language={language}
      />
    </div>
  );
};
