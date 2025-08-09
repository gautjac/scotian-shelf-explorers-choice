import { ArrowLeft } from 'lucide-react';
import { languages } from '../data/content';
import { Language } from '../types';

interface GameHeaderProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onBackToLanguageSelection: () => void;
}

const languageColors = {
  mi: 'bg-[#FBD026] text-black hover:bg-[#FBD026]/90 active:bg-[#FBD026]/80', // Mi'kmaw - Yellow
  en: 'bg-[#00AE9F] text-white hover:bg-[#00AE9F]/90 active:bg-[#00AE9F]/80', // English - Teal
  fr: 'bg-[#AD4557] text-white hover:bg-[#AD4557]/90 active:bg-[#AD4557]/80'  // French - Maroon
};

export const GameHeader = ({ 
  currentLanguage, 
  onLanguageChange, 
  onBackToLanguageSelection 
}: GameHeaderProps) => {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between w-full">
        {/* Language selection buttons */}
        <div className="flex gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`px-4 py-2 rounded-lg text-sm lg:text-base font-bold transition-all duration-200 ${
                languageColors[lang.code]
              } ${
                currentLanguage === lang.code
                  ? 'ring-4 ring-white/50 scale-105'
                  : ''
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={onBackToLanguageSelection}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};