import { Language } from '../types';
import { languages } from '../data/content';
import rockyShoreBackground from '../assets/rocky-shore-background.jpg';
import { Leaf } from 'lucide-react';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';

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
  const { getUIText } = useComprehensiveConfig();
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${rockyShoreBackground})` }}
    >
      <div className="flex flex-col items-center gap-8 p-8 w-full">
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
                <Leaf size={32} className="lg:w-10 lg:h-10" />
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