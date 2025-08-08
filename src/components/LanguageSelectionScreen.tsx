import { Language } from '../types';
import { languages } from '../data/content';
import rockyShoreBackground from '../assets/rocky-shore-background.jpg';

interface LanguageSelectionScreenProps {
  onLanguageSelect: (language: Language['code']) => void;
}

const languageTexts = {
  mi: 'Papultmimk L\'nuiktuk',
  en: 'Play in English', 
  fr: 'Joue en Français'
};

const languageColors = {
  mi: 'bg-[#FBD026] text-black hover:bg-[#FBD026]/90 active:bg-[#FBD026]/80', // Mi'kmaw - Yellow
  en: 'bg-[#00AE9F] text-white hover:bg-[#00AE9F]/90 active:bg-[#00AE9F]/80', // English - Teal
  fr: 'bg-[#AD4557] text-white hover:bg-[#AD4557]/90 active:bg-[#AD4557]/80'  // French - Maroon
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
              className={`flex-1 aspect-square rounded-2xl text-2xl lg:text-4xl xl:text-5xl font-bold transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 ${
                languageColors[lang.code]
              }`}
            >
              {languageTexts[lang.code]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};