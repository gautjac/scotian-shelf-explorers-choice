import { Language } from '../types';
import { languages } from '../data/content';
import droneBeachVideo from '../assets/drone-beach-loop-1080.mp4';
import compassIcon from '../assets/CompassIcon.png';
import posterFrame from '../assets/posterframe.jpg';
import { motion } from 'framer-motion';

interface LanguageSelectionScreenProps {
  onLanguageSelect: (language: Language['code']) => void;
  isExiting: boolean;
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

export const LanguageSelectionScreen = ({ onLanguageSelect, isExiting }: LanguageSelectionScreenProps) => {
  return (
    <div className="fixed inset-0 z-[2147483000] flex items-center justify-center bg-black">
      <motion.video 
        src={droneBeachVideo}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="metadata"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ opacity: 1, scale: 1 }}
        animate={isExiting ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
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
      
      <motion.div 
        className="relative z-10 flex flex-col items-center gap-8 p-8 w-full"
        initial={{ opacity: 1, y: 0 }}
        animate={isExiting ? { opacity: 0, y: "100vh" } : { opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full max-w-[75vw]">
          {languages.map((lang) => {
            const buttonText = languageButtonText[lang.code];
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageSelect(lang.code)}
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
      </motion.div>
    </div>
  );
};