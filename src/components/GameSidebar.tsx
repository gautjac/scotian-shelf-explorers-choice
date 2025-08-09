import { CompactHealthMeters } from './CompactHealthMeters';
import { HealthMetrics, Language } from '../types';
interface GameSidebarProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
  onBackToPreview: () => void;
  onRestart: () => void;
}
export const GameSidebar = ({
  healthMetrics,
  language,
  onBackToPreview,
  onRestart
}: GameSidebarProps) => {
  return <div className="w-full h-full p-6 lg:p-8 overflow-y-auto flex flex-col">
      {/* Health Meters - compact version for sidebar */}
      <div className="mb-6">
        <CompactHealthMeters healthMetrics={healthMetrics} language={language} />
      </div>

      {/* Back to Stories button - positioned after health meters */}
      <div className="mb-8">
        {/* Game Actions */}
        <div className="flex flex-col gap-4 items-center">
          <button onClick={onBackToPreview} className="bg-[#0C556B]/30 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-medium text-base active:bg-[#0C556B]/50 transition-colors duration-200 shadow-lg">
            {language === 'en' && 'Back to Stories'}
            {language === 'fr' && 'Retour aux histoires'}
            {language === 'mi' && 'Kluskap koqoey'}
          </button>
          
        </div>

      </div>
    </div>;
};