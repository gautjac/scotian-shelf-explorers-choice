
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
    <div className={`flex items-center gap-2 ${className}`}>
      <Languages className="w-5 h-5 text-slate-600" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentLanguage === lang.code
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};
