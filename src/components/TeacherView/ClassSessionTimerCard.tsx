import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Square, RotateCcw, Timer, CheckCircle, Flame } from 'lucide-react';

export const ClassSessionTimerCard: React.FC = () => {
  const {
    t,
    language,
    selectedClass,
    sessionState,
    sessionSeconds,
    startClassSession,
    endClassSession,
    resetClassSession,
  } = useApp();

  const isNotStarted = sessionState === 'not_started';
  const isActive = sessionState === 'active';
  const isEnded = sessionState === 'ended';

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isActive
                ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-200 animate-pulse'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {t.teacherModules.sessionTimer}
            </h3>
            <span className="text-[11px] text-slate-500 block">
              {language === 'he' ? selectedClass.roomHe : selectedClass.roomEn}
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        <div>
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>{t.teacherModules.activeSession}</span>
            </span>
          ) : isEnded ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 shadow-2xs">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'he' ? 'שיעור הושלם' : 'Session Ended'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
              <span>{language === 'he' ? 'מוכן להפעלה' : 'Ready'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Timer Numeric Display */}
      <div className="bg-slate-900 text-white rounded-xl p-4 text-center mb-3 border border-slate-800 shadow-inner">
        <div className="text-[11px] font-medium text-slate-400 tracking-wider uppercase mb-1">
          {t.teacherModules.elapsedTime}
        </div>
        <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white tabular-nums">
          {formatTimer(sessionSeconds)}
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
          <span>{language === 'he' ? 'שעות יעד:' : 'Scheduled:'}</span>
          <span className="font-mono text-slate-200">{selectedClass.timeSlot}</span>
        </div>
      </div>

      {/* Timer Action Buttons */}
      <div className="flex items-center gap-2">
        {isNotStarted && (
          <button
            type="button"
            onClick={startClassSession}
            className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors min-h-[44px] shadow-sm active:scale-[0.99]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t.teacherModules.startClass}</span>
          </button>
        )}

        {isActive && (
          <button
            type="button"
            onClick={endClassSession}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors min-h-[44px] shadow-sm active:scale-[0.99]"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>{t.teacherModules.endClass}</span>
          </button>
        )}

        {isEnded && (
          <>
            <button
              type="button"
              onClick={startClassSession}
              className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors min-h-[44px] shadow-sm active:scale-[0.99]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{language === 'he' ? 'המשך / התחל שיעור חדש' : 'Start Next Session'}</span>
            </button>
            <button
              type="button"
              onClick={resetClassSession}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
              title={t.teacherModules.resetTimer}
              aria-label={t.teacherModules.resetTimer}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Sync footer status */}
      <div className="mt-2.5 text-center">
        <span className="text-[10px] text-slate-400">
          ✓ {t.teacherModules.loggedToContractor}
        </span>
      </div>
    </div>
  );
};
