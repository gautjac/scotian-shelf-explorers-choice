
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
      return <Waves className="w-12 h-12 lg:w-16 lg:h-16 text-white" />;
    case 'economic':
      return <Coins className="w-12 h-12 lg:w-16 lg:h-16 text-white" />;
    case 'community':
      return <Heart className="w-12 h-12 lg:w-16 lg:h-16 text-white" />;
    default:
      return <Waves className="w-12 h-12 lg:w-16 lg:h-16 text-white" />;
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
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl">
      <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-slate-700 mb-8 lg:mb-12 text-center">
        {language === 'en' && 'Marine Health Status'}
        {language === 'fr' && 'État de santé marine'}
        {language === 'mi' && 'Samqwanikatl ukamkinu\'kuom'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {Object.entries(healthMetrics).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center text-center">
            {/* Circular Icon - much larger for 32" screen */}
            <div className="relative mb-6 lg:mb-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-6 lg:border-8 border-white shadow-2xl flex items-center justify-center">
                {getIcon(key)}
              </div>
            </div>

            {/* Label and Percentage - larger text */}
            <div className="mb-6 lg:mb-8 w-full">
              <div className="text-lg lg:text-2xl xl:text-3xl font-bold text-slate-700 mb-3 lg:mb-4 leading-tight">
                {labels[language][key as keyof typeof labels[typeof language]]}
              </div>
              <div className="text-3xl lg:text-5xl xl:text-6xl font-bold text-slate-600">
                {value}%
              </div>
            </div>
            
            {/* Progress Bar - much larger for touch screen */}
            <div className="relative h-6 lg:h-8 xl:h-10 bg-slate-300 rounded-full border-4 lg:border-6 border-white shadow-inner overflow-hidden w-full mb-6 lg:mb-8">
              <div 
                className={`h-full bg-gradient-to-r ${getHealthColor(value)} transition-all duration-500 rounded-full relative`}
                style={{ width: `${value}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                {/* Dots pattern - larger for visibility */}
                <div className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 flex gap-1 lg:gap-1.5">
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-white/60 rounded-full"></div>
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-white/60 rounded-full"></div>
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Status Badge - larger text */}
            <span className={`inline-block px-6 py-3 lg:px-8 lg:py-4 rounded-full text-lg lg:text-xl xl:text-2xl text-white font-bold bg-gradient-to-r ${getHealthColor(value)} shadow-lg`}>
              {getHealthStatus(value, language)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
