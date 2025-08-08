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
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className={`w-48 h-48 lg:w-56 lg:h-56 rounded-2xl text-xl lg:text-2xl font-bold transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95 ${
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