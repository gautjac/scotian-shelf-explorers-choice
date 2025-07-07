
import { HealthMetrics } from '../types';
import { Waves, Coins, Heart } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

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

interface AnimatedHealthMeterProps {
  metricKey: string;
  value: number;
  previousValue: number;
  language: 'en' | 'fr' | 'mi';
  labels: any;
}

const AnimatedHealthMeter = ({ metricKey, value, previousValue, language, labels }: AnimatedHealthMeterProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    if (previousValue !== value) {
      const isPositive = value > previousValue;
      const isNegative = value < previousValue;
      
      setIsAnimating(true);
      setAnimationClass(isPositive ? 'animate-pulse' : isNegative ? 'animate-bounce' : '');
      
      // Animate the number counting
      const startValue = previousValue;
      const endValue = value;
      const duration = 800;
      const startTime = Date.now();
      
      const updateValue = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        } else {
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationClass('');
          }, 300);
        }
      };
      
      requestAnimationFrame(updateValue);
    }
  }, [value, previousValue]);

  const getAnimatedHealthColor = (val: number) => {
    if (val >= 80) return 'from-green-400 to-green-500';
    if (val >= 60) return 'from-blue-400 to-blue-500';
    if (val >= 40) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  const getAnimatedIcon = (type: string) => {
    const iconClasses = `w-24 h-24 lg:w-32 lg:h-32 text-white transition-all duration-300 ${animationClass}`;
    switch (type) {
      case 'ecosystem':
        return <Waves className={iconClasses} />;
      case 'economic':
        return <Coins className={iconClasses} />;
      case 'community':
        return <Heart className={iconClasses} />;
      default:
        return <Waves className={iconClasses} />;
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Circular Icon with animation */}
      <div className="relative mb-12 lg:mb-16">
        <div className={`w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-12 lg:border-16 border-white shadow-2xl flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-105 shadow-3xl' : ''}`}>
          {getAnimatedIcon(metricKey)}
          {/* Ripple effect on change */}
          {isAnimating && (
            <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping"></div>
          )}
        </div>
      </div>

      {/* Label and Percentage */}
      <div className="mb-12 lg:mb-16 w-full">
        <div className="text-2xl lg:text-4xl xl:text-6xl font-bold text-slate-700 mb-6 lg:mb-8 leading-tight">
          {labels[language][metricKey as keyof typeof labels[typeof language]]}
        </div>
        <div className={`text-6xl lg:text-10xl xl:text-12xl font-bold text-slate-600 transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
          {displayValue}%
        </div>
      </div>
      
      {/* Animated Progress Bar */}
      <div className="relative h-12 lg:h-16 xl:h-20 bg-slate-300 rounded-full border-8 lg:border-12 border-white shadow-inner overflow-hidden w-full mb-12 lg:mb-16">
        <div 
          className={`h-full bg-gradient-to-r ${getAnimatedHealthColor(value)} transition-all duration-1000 ease-out rounded-full relative ${isAnimating ? 'animate-pulse' : ''}`}
          style={{ width: `${value}%` }}
        >
          {/* Enhanced shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>
          {/* Wave animation on change */}
          {isAnimating && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full animate-pulse"></div>
          )}
          {/* Floating dots */}
          <div className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 flex gap-2 lg:gap-3">
            <div className={`w-2 h-2 lg:w-3 lg:h-3 bg-white/60 rounded-full transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}></div>
            <div className={`w-2 h-2 lg:w-3 lg:h-3 bg-white/60 rounded-full transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`} style={{animationDelay: '0.1s'}}></div>
            <div className={`w-2 h-2 lg:w-3 lg:h-3 bg-white/60 rounded-full transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`} style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Animated Status Badge */}
      <span className={`inline-block px-12 py-6 lg:px-16 lg:py-8 rounded-full text-2xl lg:text-4xl xl:text-4xl text-white font-bold bg-gradient-to-r ${getAnimatedHealthColor(value)} shadow-lg transition-all duration-500 ${isAnimating ? 'scale-105 shadow-2xl' : ''}`}>
        {getHealthStatus(value, language)}
      </span>
    </div>
  );
};

export const HealthMeters = ({ 
  healthMetrics, 
  language
}: HealthMetersProps) => {
  const previousMetrics = useRef<HealthMetrics>(healthMetrics);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Check if any metric has changed
    const hasChanged = Object.keys(healthMetrics).some(
      key => previousMetrics.current[key as keyof HealthMetrics] !== healthMetrics[key as keyof HealthMetrics]
    );
    
    if (hasChanged) {
      setAnimationKey(prev => prev + 1);
      // Update previous metrics after a delay to allow animation to complete
      setTimeout(() => {
        previousMetrics.current = { ...healthMetrics };
      }, 100);
    }
  }, [healthMetrics]);

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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-xl">
      <h3 className="text-4xl lg:text-8xl xl:text-10xl font-bold text-slate-700 mb-16 lg:mb-24 text-center">
        {language === 'en' && 'How Healthy is the Ocean'}
        {language === 'fr' && 'Comment va l\'océan'}
        {language === 'mi' && 'Samqwanikatl ukamkinu\'kuom'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {Object.entries(healthMetrics).map(([key, value], index) => (
          <div key={`${key}-${animationKey}`} style={{ animationDelay: `${index * 0.1}s` }}>
            <AnimatedHealthMeter
              metricKey={key}
              value={value}
              previousValue={previousMetrics.current[key as keyof HealthMetrics]}
              language={language}
              labels={labels}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
