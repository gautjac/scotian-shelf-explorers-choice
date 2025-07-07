
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
      return <Waves className="w-16 h-16 text-white" />;
    case 'economic':
      return <Coins className="w-16 h-16 text-white" />;
    case 'community':
      return <Heart className="w-16 h-16 text-white" />;
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

  const descriptions = {
    en: {
      ecosystem: 'Fish, whales, plants and other sea life',
      economic: 'Fishing jobs and coastal businesses',
      community: 'Health and wellbeing of communities'
    },
    fr: {
      ecosystem: 'Poissons, baleines, plantes et autres vies marines',
      economic: 'Emplois de pêche et entreprises côtières',
      community: 'Santé et bien-être des communautés'
    },
    mi: {
      ecosystem: 'Namu, puktew, maskiku aq aqq samqwan mimaji\'kuom',
      economic: 'Ami\'kuew koqoey aq kespukwitk lukwaqnej',
      community: 'Wela\'lin aq welameq l\'nuiwoq'
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-slate-700 mb-12 text-center">
        {language === 'en' && 'Ocean Health'}
        {language === 'fr' && 'Santé océanique'}
        {language === 'mi' && 'Samqwan ukamkinu\'kuom'}
      </h3>
      
      <div className="space-y-8">
        {Object.entries(healthMetrics).map(([key, value]) => (
          <div key={key} className="flex items-center gap-8">
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-slate-600 border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0">
              {getIcon(key)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-lg font-semibold text-slate-700 mb-1 truncate">
                {labels[language][key as keyof typeof labels[typeof language]]}
              </div>
              <div className="text-sm text-slate-500 mb-2">
                {descriptions[language][key as keyof typeof descriptions[typeof language]]}
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-6 bg-slate-300 rounded-full border-2 border-white shadow-inner overflow-hidden mb-2">
                <div 
                  className={`h-full ${getHealthColor(value)} transition-all duration-500 rounded-full`}
                  style={{ width: `${value}%` }}
                />
              </div>
              
              {/* Value and Status */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-slate-600">{value}%</span>
                <span className={`text-sm px-4 py-2 rounded-full text-white font-medium ${getHealthColor(value)}`}>
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
