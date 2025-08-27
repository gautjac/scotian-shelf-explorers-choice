
import { HealthMetrics } from '../types';
import { Waves, Coins, Heart } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface HealthMetersProps {
  healthMetrics: HealthMetrics;
  language: 'en' | 'fr' | 'mi';
  showInitialAnimation?: boolean;
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

  const isPulsingRed = value < 50;

  const getAnimatedIcon = (type: string) => {
    const iconClasses = `w-10 h-10 transition-all duration-300 ${animationClass} ${isPulsingRed ? 'text-red-100' : 'text-white'}`;
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
    <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border transition-all duration-500 group">
      {/* Elegant Icon Circle */}
      <div className="relative mb-6 flex justify-center">
        <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${getAnimatedHealthColor(value)} shadow-xl flex items-center justify-center transition-all duration-500 ${isAnimating ? 'animate-pulse' : ''} ${isPulsingRed ? 'animate-pulse-red' : ''}`}>
          {getAnimatedIcon(metricKey)}
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent"></div>
          {/* Animated ring on change */}
          {isAnimating && (
            <div className="absolute -inset-2 rounded-full border-2 border-current opacity-30 animate-ping"></div>
          )}
        </div>
      </div>

      {/* Clean Typography */}
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-foreground mb-2 leading-tight">
          {labels[language][metricKey as keyof typeof labels[typeof language]]}
        </h4>
        <div className={`text-4xl font-bold text-foreground transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
          {displayValue}%
        </div>
      </div>
      
      {/* Sleek Progress Bar */}
      <div className="relative mb-6">
        <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
          <div 
            className={`h-full bg-gradient-to-r ${getAnimatedHealthColor(value)} transition-all duration-1000 ease-out rounded-full relative ${isAnimating ? 'animate-pulse' : ''} ${isPulsingRed ? 'animate-pulse-red' : ''}`}
            style={{ width: `${value}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Status Badge */}
      <div className="text-center">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getAnimatedHealthColor(value)} shadow-md transition-all duration-500 ${isAnimating ? 'scale-105' : ''} ${isPulsingRed ? 'animate-pulse-red' : ''}`}>
          {getHealthStatus(value, language)}
        </span>
      </div>
    </div>
  );
};

export const HealthMeters = ({ 
  healthMetrics, 
  language,
  showInitialAnimation = false
}: HealthMetersProps) => {
  const previousMetrics = useRef<HealthMetrics>(
    showInitialAnimation ? { ecosystem: 0, economic: 0, community: 0 } : healthMetrics
  );
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (showInitialAnimation) {
      // Trigger initial animation on mount
      setTimeout(() => {
        setAnimationKey(prev => prev + 1);
        previousMetrics.current = { ...healthMetrics };
      }, 500);
      return;
    }

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
  }, [healthMetrics, showInitialAnimation]);

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
    <div className="bg-card/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-border">
      <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
        {language === 'en' && 'How Healthy is the Ocean?'}
        {language === 'fr' && 'Comment va l\'océan?'}
        {language === 'mi' && 'Samqwanikatl ukamkinu\'kuom?'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {Object.entries(healthMetrics).map(([key, value], index) => (
          <div 
            key={`${key}-${animationKey}`} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
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
