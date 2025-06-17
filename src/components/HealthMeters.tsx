import { HealthMetrics } from '../types';
import { Waves, Coins, Heart } from 'lucide-react';

interface HealthMetersProps {
  healthMetrics: HealthMetrics;
  language: 'en' | 'fr' | 'mi';
}

const getHealthColor = (value: number) => {
  if (value >= 80) return 'from-green-400 to-green-500';
  if (value >= 60) return 'from-blue-400 to-blue-500';
  if (value >= 40) return 'from-yellow-400 to-yellow-500';
  return 'from-red-400 to-red-500';
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

const getIcon = (type: string) => {
  switch (type) {
    case 'ecosystem':
      return <Waves className="w-8 h-8 text-white" />;
    case 'economic':
      return <Coins className="w-8 h-8 text-white" />;
    case 'community':
      return <Heart className="w-8 h-8 text-white" />;
    default:
      return <Waves className="w-8 h-8 text-white" />;
  }
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(healthMetrics).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center text-center">
            {/* Circular Icon */}
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-4 border-white shadow-lg flex items-center justify-center">
                {getIcon(key)}
              </div>
            </div>

            {/* Label and Percentage */}
            <div className="mb-3 w-full">
              <div className="text-sm font-medium text-slate-700 mb-1">
                {labels[language][key as keyof typeof labels[typeof language]]}
              </div>
              <div className="text-lg font-bold text-slate-600">
                {value}%
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-4 bg-slate-300 rounded-full border-2 border-white shadow-inner overflow-hidden w-full mb-3">
              <div 
                className={`h-full bg-gradient-to-r ${getHealthColor(value)} transition-all duration-500 rounded-full relative`}
                style={{ width: `${value}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                {/* Dots pattern */}
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex gap-0.5">
                  <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                  <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                  <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Status Badge */}
            <span className={`inline-block px-3 py-1 rounded-full text-xs text-white font-medium bg-gradient-to-r ${getHealthColor(value)}`}>
              {getHealthStatus(value, language)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
