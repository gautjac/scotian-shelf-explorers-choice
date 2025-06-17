
import { HealthMetrics } from '../types';
import { Waves, Coins, Heart } from 'lucide-react';

interface CompactHealthMetersProps {
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
      thriving: 'Doing Great',
      stable: 'Doing OK',
      declining: 'Not Good',
      critical: 'Very Bad'
    },
    fr: {
      thriving: 'Très bien',
      stable: 'Ça va',
      declining: 'Pas bon',
      critical: 'Très mauvais'
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
      ecosystem: 'Animals & Plants',
      economic: 'Money & Jobs',
      community: 'People'
    },
    fr: {
      ecosystem: 'Animaux et plantes',
      economic: 'Argent et emplois',
      community: 'Gens'
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
        {language === 'en' && 'Ocean Health'}
        {language === 'fr' && 'Santé océanique'}
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
                  className={`h-full ${getHealthColor(value)} transition-all duration-500 rounded-full`}
                  style={{ width: `${value}%` }}
                />
              </div>
              
              {/* Value and Status */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-600">{value}%</span>
                <span className={`text-xs px-2 py-1 rounded-full text-white font-medium ${getHealthColor(value)}`}>
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
