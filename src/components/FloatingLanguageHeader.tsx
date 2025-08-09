import { ArrowLeft } from 'lucide-react';
import { languages } from '../data/content';
import { Language } from '../types';

interface FloatingLanguageHeaderProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onBackToLanguageSelection: () => void;
}

const languageColors = {
  mi: 'bg-[#FBD026] text-black hover:bg-[#FBD026]/90 active:bg-[#FBD026]/80', // Mi'kmaw - Yellow
  en: 'bg-[#00AE9F] text-white hover:bg-[#00AE9F]/90 active:bg-[#00AE9F]/80', // English - Teal
  fr: 'bg-[#AD4557] text-white hover:bg-[#AD4557]/90 active:bg-[#AD4557]/80'  // French - Maroon
};

export const FloatingLanguageHeader = ({ 
  currentLanguage, 
  onLanguageChange, 
  onBackToLanguageSelection 
}: FloatingLanguageHeaderProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="flex items-center justify-center gap-4 backdrop-blur-sm bg-black/20 rounded-lg p-4 max-w-fit mx-auto">
        {/* Back button */}
        <button
          onClick={onBackToLanguageSelection}
          className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 shadow-lg flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </button>

        {/* Language selection buttons */}
        <div className="flex gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg text-sm lg:text-base font-bold transition-all duration-200 shadow-lg ${
                languageColors[lang.code]
              } ${
                currentLanguage === lang.code
                  ? 'ring-4 ring-white/50 scale-105'
                  : ''
              }`}
            >
              {lang.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};