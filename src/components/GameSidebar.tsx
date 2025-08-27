import { CompactHealthMeters } from './CompactHealthMeters';
import { HealthMetrics, Language } from '../types';
interface GameSidebarProps {
  healthMetrics: HealthMetrics;
  language: Language['code'];
  currentScenarioIndex: number;
  onBackToPreview: () => void;
  onRestart: () => void;
}
export const GameSidebar = ({
  healthMetrics,
  language,
  currentScenarioIndex,
  onBackToPreview,
  onRestart
}: GameSidebarProps) => {
  return <div className="w-full h-full p-6 lg:p-8 overflow-y-auto flex flex-col">
      {/* Health Meters - compact version for sidebar */}
      <div className="mb-4">
        <CompactHealthMeters healthMetrics={healthMetrics} language={language} />
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700 mb-2">
              {language === 'en' && 'Progress'}
              {language === 'fr' && 'Progrès'}
              {language === 'mi' && 'Mawkina\'tiek'}
            </div>
            <div className="text-lg font-bold text-[#0C556B]">
              {currentScenarioIndex + 1} / 5 
              {language === 'en' && ' completed'}
              {language === 'fr' && ' complétés'}
              {language === 'mi' && ' kespek'}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-[#0C556B] h-2 rounded-full transition-all duration-300" style={{
              width: `${(currentScenarioIndex + 1) / 5 * 100}%`
            }} />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Stories button - positioned after health meters */}
      <div className="mb-8">
        {/* Game Actions */}
        <div className="flex flex-col gap-4 items-center">
          
          
        </div>

      </div>
    </div>;
};