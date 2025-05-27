
import { MarineSpecies } from '../types';

interface SpeciesHealthBarProps {
  species: MarineSpecies[];
  language: 'en' | 'fr' | 'mi';
}

const healthColors = {
  thriving: 'bg-green-500',
  stable: 'bg-blue-500',
  declining: 'bg-yellow-500',
  critical: 'bg-red-500'
};

const healthText = {
  en: {
    thriving: 'Thriving',
    stable: 'Stable',
    declining: 'Declining',
    critical: 'Critical'
  },
  fr: {
    thriving: 'Prospère',
    stable: 'Stable',
    declining: 'En déclin',
    critical: 'Critique'
  },
  mi: {
    thriving: 'Pilei',
    stable: 'Nukek',
    declining: 'Tepisq',
    critical: 'Mekij'
  }
};

export const SpeciesHealthBar = ({ species, language }: SpeciesHealthBarProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        {language === 'en' && 'Marine Life Health'}
        {language === 'fr' && 'Santé de la vie marine'}
        {language === 'mi' && 'Samqwanikatl ukamkinu\'kuom'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {species.map((animal) => (
          <div key={animal.id} className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-slate-200">
              <img
                src={animal.imageUrl}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm font-medium text-slate-700 mb-1">
              {animal.name}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs text-white font-medium ${healthColors[animal.healthStatus]}`}>
              {healthText[language][animal.healthStatus]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
