
import { HealthMetrics } from '../types';
import { Waves, Coins, Heart } from 'lucide-react';

interface CompactHealthMetersProps {
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

export const CompactHealthMeters = ({ healthMetrics, language }: CompactHealthMetersProps) => {
  const labels = {
    en: {
      ecosystem: 'Ecosystem',
      economic: 'Economic',
      community: 'Community'
    },
    fr: {
      ecosystem: 'Écosystème',
      economic: 'Économique',
      community: 'Communauté'
    },
    mi: {
      ecosystem: 'Ukamkinu\'kuom',
      economic: 'Toqwa\'tu\'k',
      community: 'L\'nui'
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-slate-700 mb-6 text-center">
        {language === 'en' && 'Marine Health'}
        {language === 'fr' && 'Santé marine'}
        {language === 'mi' && 'Samqwan ukamkinu\'kuom'}
      </h3>
      
      <div className="space-y-4">
        {Object.entries(healthMetrics).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-slate-600 border-2 border-white shadow-lg flex items-center justify-center flex-shrink-0">
              {getIcon(key)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-700 mb-1 truncate">
                {labels[language][key as keyof typeof labels[typeof language]]}
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-3 bg-slate-300 rounded-full border border-white shadow-inner overflow-hidden mb-1">
                <div 
                  className={`h-full bg-gradient-to-r ${getHealthColor(value)} transition-all duration-500 rounded-full`}
                  style={{ width: `${value}%` }}
                />
              </div>
              
              {/* Value and Status */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-600">{value}%</span>
                <span className={`text-xs px-2 py-1 rounded-full text-white font-medium bg-gradient-to-r ${getHealthColor(value)}`}>
                  {getHealthStatus(value, language)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
