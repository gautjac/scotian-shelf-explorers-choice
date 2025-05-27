
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
      <Languages className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
      <div className="flex gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] rounded-lg text-lg lg:text-xl font-bold transition-all duration-200 shadow-lg ${
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
    </div>
  );
};
