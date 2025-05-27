
import { HealthMetrics } from '../types';
import { Progress } from './ui/progress';

interface HealthMetersProps {
  healthMetrics: HealthMetrics;
  language: 'en' | 'fr' | 'mi';
}

const getHealthColor = (value: number) => {
  if (value >= 80) return 'bg-green-500';
  if (value >= 60) return 'bg-blue-500';
  if (value >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getHealthStatus = (value: number, language: 'en' | 'fr' | 'mi') => {
  const status = value >= 80 ? 'thriving' : value >= 60 ? 'stable' : value >= 40 ? 'declining' : 'critical';
  
  const statusText = {
    en: {
      thriving: 'Thriving',
      stable: 'Stable',
      declining: 'Declining',
      critical: 'Critical'
    },
    fr: {
      thriving: 'Prospère',
      stable: 'Stable',
      declining: 'En déclin',
      critical: 'Critique'
    },
    mi: {
      thriving: 'Pilei',
      stable: 'Nukek',
      declining: 'Tepisq',
      critical: 'Mekij'
    }
  };

  return statusText[language][status];
};

export const HealthMeters = ({ healthMetrics, language }: HealthMetersProps) => {
  const labels = {
    en: {
      ecosystem: 'Ecosystem Health',
      economic: 'Economic Health',
      community: 'Community Health'
    },
    fr: {
      ecosystem: 'Santé écosystémique',
      economic: 'Santé économique',
      community: 'Santé communautaire'
    },
    mi: {
      ecosystem: 'Ukamkinu\'kuom samqwan',
      economic: 'Toqwa\'tu\'k samqwan',
      community: 'L\'nui samqwan'
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-700 mb-6">
        {language === 'en' && 'Marine Health Status'}
        {language === 'fr' && 'État de santé marine'}
        {language === 'mi' && 'Samqwanikatl ukamkinu\'kuom'}
      </h3>
      
      <div className="space-y-6">
        {Object.entries(healthMetrics).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                {labels[language][key as keyof typeof labels[typeof language]]}
              </span>
              <span className="text-sm font-medium text-slate-600">
                {value}%
              </span>
            </div>
            
            <div className="relative">
              <Progress 
                value={value} 
                className="h-3 bg-slate-200"
              />
              <div 
                className={`absolute inset-0 h-3 rounded-full transition-all duration-500 ${getHealthColor(value)}`}
                style={{ width: `${value}%` }}
              />
            </div>
            
            <div className="text-right">
              <span className={`inline-block px-2 py-1 rounded-full text-xs text-white font-medium ${getHealthColor(value)}`}>
                {getHealthStatus(value, language)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
