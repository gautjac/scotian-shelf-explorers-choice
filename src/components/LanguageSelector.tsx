
import { Languages } from 'lucide-react';
import { languages } from '../data/content';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  className?: string;
}

const languageColors = {
  mi: 'bg-[#FBD026] text-black hover:bg-[#FBD026]/90 active:bg-[#FBD026]/80', // Mi'kmaw - Yellow
  en: 'bg-[#00AE9F] text-white hover:bg-[#00AE9F]/90 active:bg-[#00AE9F]/80', // English - Teal from image
  fr: 'bg-[#AD4557] text-white hover:bg-[#AD4557]/90 active:bg-[#AD4557]/80'  // French - Maroon from image
};

export const LanguageSelector = ({ currentLanguage, onLanguageChange, className = '' }: LanguageSelectorProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Languages className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
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
  );
};
