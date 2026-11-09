import React from 'react';
import { useApp } from '../context/AppContext';
import { Languages, Smartphone, Monitor, Shield, Sparkles } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { role, language, toggleLanguage, isPhoneSimulated, setIsPhoneSimulated, t, dir } = useApp();

  // Role display metadata
  const roleDisplayNames = {
    teacher: {
      name: language === 'he' ? 'רונית כהן' : 'Ronit Cohen',
      role: language === 'he' ? 'גננת מובילה • גן שושנים' : 'Lead Teacher • Shoshanim',
      avatar: 'רכ',
    },
    contractor: {
      name: language === 'he' ? 'אבי לוי' : 'Avi Levi',
      role: language === 'he' ? 'מנהל תפעול • אורנים חינוך' : 'Ops Director • Oranim Education',
      avatar: 'אל',
    },
    municipality: {
      name: language === 'he' ? 'מיכל שפירא' : 'Michal Shapira',
      role: language === 'he' ? 'מנהלת אגף קדם-יסודי' : 'Director of Early Childhood',
      avatar: 'מש',
    },
  };

  const currentPersona = roleDisplayNames[role];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & System Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                  {t.appTitle}
                </span>
                <span className="text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60 hidden sm:inline-block">
                  {t.roles[role].badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Phone/Desktop simulator (for Teacher), Language Toggle & Profile Chip */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Viewport Toggle (Only visible in Teacher role on larger screens) */}
            {role === 'teacher' && (
              <div className="hidden lg:flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setIsPhoneSimulated(true)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                    isPhoneSimulated
                      ? 'bg-white text-slate-900 shadow-xs font-medium'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={t.actions.mobileSimulatedView}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t.actions.mobileSimulatedView}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPhoneSimulated(false)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                    !isPhoneSimulated
                      ? 'bg-white text-slate-900 shadow-xs font-medium'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={t.actions.fullDesktopView}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{t.actions.fullDesktopView}</span>
                </button>
              </div>
            )}

            {/* Prominent Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors shadow-2xs"
              aria-label="Switch Language / החלף שפה"
            >
              <Languages className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-semibold">
                {language === 'he' ? 'עברית (RTL)' : 'English (LTR)'}
              </span>
              <span className="text-slate-400 text-[10px]">⇄</span>
              <span className="text-slate-500 font-normal">
                {language === 'he' ? 'EN' : 'עב'}
              </span>
            </button>

            {/* Active User Persona Avatar / Status */}
            <div className="flex items-center gap-2 pl-2 border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-medium text-xs flex items-center justify-center shrink-0 shadow-2xs ring-2 ring-slate-100">
                {currentPersona.avatar}
              </div>
              <div className="hidden md:block text-start leading-tight">
                <div className="text-xs font-semibold text-slate-900 truncate max-w-[130px]">
                  {currentPersona.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
                  {currentPersona.role}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
