
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
      return <Waves className="w-24 h-24 lg:w-32 lg:h-32 text-white" />;
    case 'economic':
      return <Coins className="w-24 h-24 lg:w-32 lg:h-32 text-white" />;
    case 'community':
      return <Heart className="w-24 h-24 lg:w-32 lg:h-32 text-white" />;
    default:
      return <Waves className="w-24 h-24 lg:w-32 lg:h-32 text-white" />;
  }
};

export const HealthMeters = ({ healthMetrics, language }: HealthMetersProps) => {
  const labels = {
    en: {
      ecosystem: 'Animals & Plants Health',
      economic: 'Money & Jobs Health',
      community: 'People\'s Health'
    },
    fr: {
      ecosystem: 'Santé des animaux et plantes',
      economic: 'Santé de l\'argent et des emplois',
      community: 'Santé des gens'
    },
    mi: {
      ecosystem: 'Ukamkinu\'kuom samqwan',
      economic: 'Toqwa\'tu\'k samqwan',
      community: 'L\'nui samqwan'
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl">
      <h3 className="text-4xl lg:text-8xl xl:text-10xl font-bold text-slate-700 mb-16 lg:mb-24 text-center">
        {language === 'en' && 'How Healthy is the Ocean'}
        {language === 'fr' && 'Comment va l\'océan'}
        {language === 'mi' && 'Samqwanikatl ukamkinu\'kuom'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {Object.entries(healthMetrics).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center text-center">
            {/* Circular Icon - much larger for 32" screen */}
            <div className="relative mb-12 lg:mb-16">
              <div className="w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-12 lg:border-16 border-white shadow-2xl flex items-center justify-center">
                {getIcon(key)}
              </div>
            </div>

            {/* Label and Percentage - larger text */}
            <div className="mb-12 lg:mb-16 w-full">
              <div className="text-2xl lg:text-4xl xl:text-6xl font-bold text-slate-700 mb-6 lg:mb-8 leading-tight">
                {labels[language][key as keyof typeof labels[typeof language]]}
              </div>
              <div className="text-6xl lg:text-10xl xl:text-12xl font-bold text-slate-600">
                {value}%
              </div>
            </div>
            
            {/* Progress Bar - much larger for touch screen */}
            <div className="relative h-12 lg:h-16 xl:h-20 bg-slate-300 rounded-full border-8 lg:border-12 border-white shadow-inner overflow-hidden w-full mb-12 lg:mb-16">
              <div 
                className={`h-full bg-gradient-to-r ${getHealthColor(value)} transition-all duration-500 rounded-full relative`}
                style={{ width: `${value}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                {/* Dots pattern - larger for visibility */}
                <div className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 flex gap-2 lg:gap-3">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Status Badge - larger text */}
            <span className={`inline-block px-12 py-6 lg:px-16 lg:py-8 rounded-full text-2xl lg:text-4xl xl:text-4xl text-white font-bold bg-gradient-to-r ${getHealthColor(value)} shadow-lg`}>
              {getHealthStatus(value, language)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
