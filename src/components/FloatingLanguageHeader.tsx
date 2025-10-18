import { Undo2 } from 'lucide-react';
import { languages } from '../data/content';
import { Language } from '../types';
import speechBubbleIcon from '../assets/SpeechBubble.png';

interface FloatingLanguageHeaderProps {
  currentLanguage: Language['code'];
  onLanguageChange: (language: Language['code']) => void;
  onBackToLanguageSelection: () => void;
}

const languageColors = {
  mi: 'bg-[#FBD026] text-black active:bg-[#FBD026]/80', // Mi'kmaw - Yellow
  en: 'bg-[#00AE9F] text-white active:bg-[#00AE9F]/80', // English - Teal
  fr: 'bg-[#AD4557] text-white active:bg-[#AD4557]/80'  // French - Maroon
};

export const FloatingLanguageHeader = ({ 
  currentLanguage, 
  onLanguageChange, 
  onBackToLanguageSelection 
}: FloatingLanguageHeaderProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="flex items-center justify-between w-full">
        {/* Language selection buttons */}
        <div className="flex gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-[340px] min-h-[70px] rounded-2xl font-helvetica text-4xl font-bold transition-all duration-200 flex items-center justify-start gap-2 pl-6 ${
                languageColors[lang.code]
              } ${
                currentLanguage === lang.code
                  ? 'scale-105 border-4 border-white'
                  : 'border-4 border-transparent'
              }`}
            >
              <img 
                src={speechBubbleIcon} 
                alt="" 
                className={`w-12 h-12 ${lang.code === 'mi' ? 'brightness-0' : 'brightness-0 invert'}`}
              />
              {lang.nativeName}
            </button>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={onBackToLanguageSelection}
          className="w-[120px] min-h-[70px] rounded-3xl bg-[#00AE9F] hover:bg-[#00AE9F]/90 active:bg-[#00AE9F]/80 transition-all duration-200 flex items-center justify-center"
        >
          <Undo2 className="w-14 h-14 text-white" />
        </button>
      </div>
    </div>
  );
};