
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
  en: 'bg-[#0072A0] text-white hover:bg-[#0072A0]/90 active:bg-[#0072A0]/80', // English - Deep blue from palette
  fr: 'bg-[#0B424E] text-white hover:bg-[#0B424E]/90 active:bg-[#0B424E]/80'  // French - Dark teal from palette
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
