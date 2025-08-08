import { Language } from '../types';
import { languages } from '../data/content';
import rockyShoreBackground from '../assets/rocky-shore-background.jpg';
import { Leaf } from 'lucide-react';

interface LanguageSelectionScreenProps {
  onLanguageSelect: (language: Language['code']) => void;
}

const languageTexts = {
  mi: { line1: 'Papultmimk', line2: 'L\'nuiktuk' },
  en: { line1: 'Play in', line2: 'English' }, 
  fr: { line1: 'Joue en', line2: 'Français' }
};

const languageColors = {
  mi: 'bg-[#FFD700] text-black hover:bg-[#FFD700]/90 active:bg-[#FFD700]/80', // Mi'kmaw - Bright Yellow
  en: 'bg-[#00AE9F] text-white hover:bg-[#00AE9F]/90 active:bg-[#00AE9F]/80', // English - Teal
  fr: 'bg-[#E53E3E] text-white hover:bg-[#E53E3E]/90 active:bg-[#E53E3E]/80'  // French - Red
};

export const LanguageSelectionScreen = ({ onLanguageSelect }: LanguageSelectionScreenProps) => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${rockyShoreBackground})` }}
    >
      <div className="flex flex-col items-center gap-8 p-8 w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full max-w-[75vw]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className={`flex-1 aspect-square rounded-2xl font-bold transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 ${
                languageColors[lang.code]
              }`}
            >
              <Leaf size={32} className="lg:w-10 lg:h-10" />
              <div className="text-center">
                <div className="text-4xl lg:text-6xl xl:text-7xl font-helvetica font-medium">{languageTexts[lang.code].line1}</div>
                <div className="text-4xl lg:text-6xl xl:text-7xl font-helvetica font-medium">{languageTexts[lang.code].line2}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};