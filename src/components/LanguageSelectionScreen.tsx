import { useState } from 'react';
import { Language } from '../types';
import { languages } from '../data/content';
import droneBeachVideo from '../assets/drone-beach-loop-1080.mp4';
import compassIcon from '../assets/CompassIcon.png';
import posterFrame from '../assets/posterframe.jpg';

interface LanguageSelectionScreenProps {
  onLanguageSelect: (language: Language['code']) => void;
}

const languageColors = {
  mi: 'bg-[#FFD700] text-black active:bg-[#FFD700]/80', // Mi'kmaw - Bright Yellow
  en: 'bg-[#00AE9F] text-white active:bg-[#00AE9F]/80', // English - Teal
  fr: 'bg-[#E53E3E] text-white active:bg-[#E53E3E]/80'  // French - Red
};

const languageButtonText = {
  mi: ['Papultmimk', 'L\'nuiktuk'],
  en: ['Play in', 'English'],
  fr: ['Joue en', 'Français']
};

export const LanguageSelectionScreen = ({ onLanguageSelect }: LanguageSelectionScreenProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const handleLanguageClick = (language: Language['code']) => {
    setSelectedLang(language);
    setIsTransitioning(true);
    
    // Wait for animation to complete before changing screen
    setTimeout(() => {
      onLanguageSelect(language);
    }, 1600);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <video 
        src={droneBeachVideo}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="metadata"
        poster={posterFrame}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[1600ms] ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        onError={(e) => {
          console.error('[LanguageSelectionScreen] Background video error', e);
        }}
        onLoadedMetadata={() => {
          console.info('[LanguageSelectionScreen] Background video metadata loaded', { src: droneBeachVideo });
        }}
        onCanPlay={() => {
          console.info('[LanguageSelectionScreen] Background video can play');
        }}
        onPlay={() => {
          console.info('[LanguageSelectionScreen] Background video playing');
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center gap-8 p-8 w-full">
        <div className={`flex flex-col lg:flex-row gap-6 lg:gap-8 w-full max-w-[75vw] transition-all duration-[1600ms] ${isTransitioning ? 'translate-y-[100vh] opacity-0' : 'translate-y-0 opacity-100'}`}>
          {languages.map((lang) => {
            const buttonText = languageButtonText[lang.code];
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageClick(lang.code)}
                className={`flex-1 aspect-square rounded-2xl font-bold transition-all duration-200 shadow-2xl active:scale-95 flex flex-col items-center justify-center gap-2 ${
                  languageColors[lang.code]
                }`}
              >
                <img 
                  src={compassIcon} 
                  alt="" 
                  className={`w-[66px] h-[66px] ${lang.code === 'mi' ? 'brightness-0' : ''}`}
                />
                <div className="text-center">
                  {buttonText.map((line, index) => (
                    <div key={index} className="text-4xl lg:text-6xl xl:text-7xl font-helvetica font-medium">
                      {line}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};