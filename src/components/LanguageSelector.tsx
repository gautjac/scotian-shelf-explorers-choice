
import { Languages } from 'lucide-react';
import { languages } from '../data/content';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  className?: string;
}

export const LanguageSelector = ({ currentLanguage, onLanguageChange, className = '' }: LanguageSelectorProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Languages className="w-8 h-8 lg:w-10 lg:h-10 text-slate-600" />
      <div className="flex gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-6 py-4 lg:px-8 lg:py-5 rounded-xl text-lg lg:text-xl font-medium transition-all duration-200 min-h-[60px] lg:min-h-[70px] min-w-[100px] lg:min-w-[120px] ${
              currentLanguage === lang.code
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 active:bg-slate-400'
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};
