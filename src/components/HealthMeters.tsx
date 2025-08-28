import { useEffect, useRef, useState } from 'react';
import { HealthMetrics, Language } from '../types';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import { Waves, DollarSign, Users, Fish } from 'lucide-react';

interface HealthMetersProps {
  healthMetrics: HealthMetrics;
  language: 'en' | 'fr' | 'mi';
  showInitialAnimation?: boolean;
}

const getHealthColor = (value: number) => {
  if (value >= 80) return 'from-emerald-400 to-emerald-500';
  if (value >= 60) return 'from-blue-400 to-blue-500';
  if (value >= 40) return 'from-amber-400 to-amber-500';
  return 'from-red-400 to-red-500';
};

const getHealthStatus = (value: number, language: 'en' | 'fr' | 'mi', getUIText: (screen: string, element: string, lang: string) => string | null): string => {
  if (value >= 80) {
    return getUIText('HealthStatus', 'Thriving', language) || (language === 'en' ? 'Doing Great' : language === 'fr' ? 'Très bien' : 'Pilei');
  } else if (value >= 60) {
    return getUIText('HealthStatus', 'Stable', language) || (language === 'en' ? 'Doing OK' : language === 'fr' ? 'Ça va' : 'Nukek');
  } else if (value >= 40) {
    return getUIText('HealthStatus', 'Declining', language) || (language === 'en' ? 'Not Good' : language === 'fr' ? 'Pas bon' : 'Tepisq');
  } else {
    return getUIText('HealthStatus', 'Critical', language) || (language === 'en' ? 'Very Bad' : language === 'fr' ? 'Très mauvais' : 'Mekij');
  }
};

const getIcon = (type: string) => {
  switch (type) {
    case 'ecosystem':
      return Fish;
    case 'economic':
      return DollarSign;
    case 'community':
      return Users;
    default:
      return Waves;
  }
};

interface AnimatedHealthMeterProps {
  metricKey: string;
  value: number;
  previousValue: number;
  language: 'en' | 'fr' | 'mi';
  labels: { [key: string]: string };
  getUIText: (screen: string, element: string, lang: string) => string | null;
}

const AnimatedHealthMeter = ({ metricKey, value, previousValue, language, labels, getUIText }: AnimatedHealthMeterProps) => {
  const [displayValue, setDisplayValue] = useState(previousValue);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (previousValue !== value) {
      setIsAnimating(true);
      
      const animationDuration = 1500;
      const startTime = Date.now();
      const startValue = displayValue;
      const endValue = value;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [value, previousValue, displayValue]);

  const Icon = getIcon(metricKey);
  const isPulsingRed = displayValue < 50;

  return (
    <div className="text-center">
      <div className="relative mb-4">
        {/* Circular progress background */}
        <div className="w-24 h-24 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-700/30"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - displayValue / 100)}`}
              className={`transition-all duration-1000 ease-out ${
                displayValue >= 80 ? 'text-emerald-500' :
                displayValue >= 60 ? 'text-blue-500' :
                displayValue >= 40 ? 'text-amber-500' :
                'text-red-500'
              }`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`w-8 h-8 transition-all duration-300 ${
              isPulsingRed ? 'text-red-500' : 'text-white'
            }`} />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mb-2">
        <h4 className="text-sm font-medium text-slate-200 mb-1">
          {labels[metricKey]}
        </h4>
        <div className={`text-2xl font-bold text-white transition-all duration-300 ${
          isAnimating ? 'scale-110' : ''
        }`}>
          {displayValue}%
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          displayValue < 50 ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 
          displayValue >= 80 ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30' :
          displayValue >= 60 ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30' :
          'bg-amber-500/20 text-amber-600 border border-amber-500/30'
        }`}>
          {getHealthStatus(displayValue, language, getUIText)}
        </div>
      </div>
    </div>
  );
};

export const HealthMeters = ({ healthMetrics, language, showInitialAnimation = false }: HealthMetersProps) => {
  const previousValuesRef = useRef<HealthMetrics>(
    showInitialAnimation 
      ? { ecosystem: 0, economic: 0, community: 0 }
      : { ...healthMetrics }
  );
  const { getUIText } = useComprehensiveConfig();

  const labels = {
    ecosystem: getUIText('HealthMeters', 'Ecosystem Health', language) || (language === 'en' ? 'Animals & Plants Health' : language === 'fr' ? 'Santé des animaux et plantes' : 'Ukamkinu\'kuom samqwan'),
    economic: getUIText('HealthMeters', 'Economic Health', language) || (language === 'en' ? 'Money & Jobs Health' : language === 'fr' ? 'Santé de l\'argent et des emplois' : 'Toqwa\'tu\'k samqwan'),
    community: getUIText('HealthMeters', 'Community Health', language) || (language === 'en' ? 'People\'s Health' : language === 'fr' ? 'Santé des gens' : 'L\'nui samqwan')
  };

  useEffect(() => {
    // Update previous values after render for next animation
    previousValuesRef.current = { ...healthMetrics };
  });

  return (
    <div className="w-full">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-slate-100">
        {getUIText('HealthMeters', 'Marine Health Status', language) || 
         (language === 'en' ? 'How Healthy is the Ocean' : 
          language === 'fr' ? 'Comment va l\'océan' : 
          'Samqwanikatl ukamkinu\'kuom')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {Object.entries(healthMetrics).map(([metricKey, value]) => (
          <div key={metricKey}>
            <AnimatedHealthMeter
              key={metricKey}
              metricKey={metricKey}
              value={value}
              previousValue={previousValuesRef.current[metricKey as keyof HealthMetrics]}
              language={language}
              labels={labels}
              getUIText={getUIText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};