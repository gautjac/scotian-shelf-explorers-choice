import { useEffect, useRef, useState } from 'react';
import { HealthMetrics, Language } from '../types';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import { Waves, DollarSign, Users, Fish } from 'lucide-react';

interface HealthMetersProps {
  healthMetrics: HealthMetrics;
  previousHealthMetrics?: HealthMetrics;
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
  animationDelay?: number;
}

const AnimatedHealthMeter = ({ metricKey, value, previousValue, language, labels, getUIText, animationDelay = 0 }: AnimatedHealthMeterProps) => {
  const [displayValue, setDisplayValue] = useState(previousValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showChangeIndicator, setShowChangeIndicator] = useState(false);

  useEffect(() => {
    if (previousValue !== value && !hasStarted) {
      const startAnimation = () => {
        setHasStarted(true);
        setIsAnimating(true);
        setShowChangeIndicator(true);
        
        const animationDuration = 2000;
        const startTime = Date.now();
        const startValue = previousValue;
        const endValue = value;
        const change = endValue - startValue;
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);
          
          // Enhanced easing function with bounce effect for dramatic changes
          const isDramaticChange = Math.abs(change) > 20;
          let easeOut;
          
          if (isDramaticChange && progress > 0.8) {
            // Add slight bounce for dramatic changes
            const bounceProgress = (progress - 0.8) / 0.2;
            const bounce = 1 + Math.sin(bounceProgress * Math.PI * 2) * 0.05 * (1 - bounceProgress);
            easeOut = 0.8 + (1 - 0.8) * bounceProgress * bounce;
          } else {
            easeOut = 1 - Math.pow(1 - progress, 3);
          }
          
          const currentValue = Math.round(startValue + change * easeOut);
          setDisplayValue(currentValue);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            // Hide change indicator after animation
            setTimeout(() => setShowChangeIndicator(false), 1000);
          }
        };
        
        requestAnimationFrame(animate);
      };
      
      // Apply staggered delay
      setTimeout(startAnimation, animationDelay);
    }
  }, [value, previousValue, animationDelay, hasStarted]);

  const Icon = getIcon(metricKey);
  const isPulsingRed = displayValue < 50;
  const change = value - previousValue;
  const isDramaticChange = Math.abs(change) > 20;
  const isPositiveChange = change > 0;
  const isNegativeChange = change < 0;

  return (
    <div className={`text-center transition-all duration-500 ${!hasStarted ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="relative mb-4">
        {/* Change indicator */}
        {showChangeIndicator && change !== 0 && (
          <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in ${
            isPositiveChange ? 'text-emerald-400' : 'text-red-400'
          } font-bold text-lg`}>
            {isPositiveChange ? '+' : ''}{change}
            <div className={`inline-block ml-1 ${isPositiveChange ? 'animate-bounce' : 'animate-pulse'}`}>
              {isPositiveChange ? '↗' : '↘'}
            </div>
          </div>
        )}
        
        {/* Particle effects for dramatic changes */}
        {isAnimating && isDramaticChange && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full animate-ping ${
                  isPositiveChange ? 'bg-emerald-400' : 'bg-red-400'
                }`}
                style={{
                  top: `${20 + Math.sin(i * Math.PI / 4) * 30}%`,
                  left: `${50 + Math.cos(i * Math.PI / 4) * 30}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}

        {/* Circular progress background with enhanced effects */}
        <div className={`w-24 h-24 mx-auto relative ${
          isAnimating && isDramaticChange ? (isNegativeChange ? 'animate-pulse' : 'animate-pulse') : ''
        }`}>
          {/* Glow effect for positive changes */}
          {isAnimating && isPositiveChange && isDramaticChange && (
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
          )}
          
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
            {/* Progress circle with enhanced styling */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - displayValue / 100)}`}
              className="transition-all duration-1000 ease-out drop-shadow-lg"
              strokeLinecap="round"
            />
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={
                  displayValue >= 80 ? 'stop-emerald-400' :
                  displayValue >= 60 ? 'stop-blue-400' :
                  displayValue >= 40 ? 'stop-amber-400' :
                  'stop-red-400'
                } />
                <stop offset="100%" className={
                  displayValue >= 80 ? 'stop-emerald-600' :
                  displayValue >= 60 ? 'stop-blue-600' :
                  displayValue >= 40 ? 'stop-amber-600' :
                  'stop-red-600'
                } />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Icon in center with enhanced effects */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`w-8 h-8 transition-all duration-300 ${
              isAnimating && isDramaticChange ? 'animate-pulse scale-110' : ''
            } ${
              isPulsingRed ? 'text-red-500' : 'text-white drop-shadow-lg'
            }`} />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mb-2">
        <h4 className="text-sm font-medium text-slate-200 mb-1">
          {labels[metricKey]}
        </h4>
        <div className={`text-2xl font-bold text-white transition-all duration-500 ${
          isAnimating ? 'scale-125 drop-shadow-lg' : 'scale-100'
        } ${
          isAnimating && isDramaticChange && isNegativeChange ? 'animate-pulse text-red-400' : ''
        } ${
          isAnimating && isDramaticChange && isPositiveChange ? 'text-emerald-400' : ''
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

export const HealthMeters = ({ healthMetrics, previousHealthMetrics, language, showInitialAnimation = false }: HealthMetersProps) => {
  const { getUIText } = useComprehensiveConfig();
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  const labels = {
    ecosystem: getUIText('HealthMeters', 'Ecosystem Health', language) || (language === 'en' ? 'Animals & Plants Health' : language === 'fr' ? 'Santé des animaux et plantes' : 'Ukamkinu\'kuom samqwan'),
    economic: getUIText('HealthMeters', 'Economic Health', language) || (language === 'en' ? 'Money & Jobs Health' : language === 'fr' ? 'Santé de l\'argent et des emplois' : 'Toqwa\'tu\'k samqwan'),
    community: getUIText('HealthMeters', 'Community Health', language) || (language === 'en' ? 'People\'s Health' : language === 'fr' ? 'Santé des gens' : 'L\'nui samqwan')
  };

  // Use passed previous values or fallback to current values
  const prevValues = previousHealthMetrics || healthMetrics;

  // Staggered animation delays
  const animationDelays = {
    ecosystem: 0,
    economic: 600,
    community: 1200
  };

  useEffect(() => {
    // Start title animation
    const timer = setTimeout(() => {
      setTitleAnimationComplete(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <h2 className={`text-2xl lg:text-3xl font-bold text-center mb-8 text-slate-100 transition-all duration-1000 ${
        titleAnimationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {getUIText('HealthMeters', 'Marine Health Status', language) || 
         (language === 'en' ? 'How Healthy is the Ocean' : 
          language === 'fr' ? 'Comment va l\'océan' : 
          'Samqwanikatl ukamkinu\'kuom')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {Object.entries(healthMetrics).map(([metricKey, value]) => (
          <div key={metricKey} className="animate-fade-in">
            <AnimatedHealthMeter
              key={`${metricKey}-${JSON.stringify(prevValues)}`}
              metricKey={metricKey}
              value={value}
              previousValue={prevValues[metricKey as keyof HealthMetrics]}
              language={language}
              labels={labels}
              getUIText={getUIText}
              animationDelay={animationDelays[metricKey as keyof typeof animationDelays]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};