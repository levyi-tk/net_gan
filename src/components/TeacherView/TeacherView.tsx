import React from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherBottomNav } from './TeacherBottomNav';
import { TeacherHomeTab } from './TeacherHomeTab';
import { TeacherScheduleTab } from './TeacherScheduleTab';
import { TeacherFeedTab } from './TeacherFeedTab';
import { TeacherProfileTab } from './TeacherProfileTab';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';

export const TeacherView: React.FC = () => {
  const { teacherTab, isPhoneSimulated, language, t, selectedClass, geoStatus } = useApp();

  const renderActiveTab = () => {
    switch (teacherTab) {
      case 'classes':
        return <TeacherHomeTab />;
      case 'schedule':
        return <TeacherScheduleTab />;
      case 'feed':
        return <TeacherFeedTab />;
      case 'profile':
        return <TeacherProfileTab />;
      default:
        return <TeacherHomeTab />;
    }
  };

  // If desktop simulation is enabled, render inside a smartphone frame on desktop,
  // while retaining seamless 100% responsiveness on actual mobile devices.
  if (isPhoneSimulated) {
    return (
      <div className="py-4 px-2 sm:px-4 flex justify-center items-start min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-[420px] bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden flex flex-col relative min-h-[720px] max-h-[860px]">
          
          {/* Simulated Mobile Device Top Notch / Status Bar */}
          <div className="bg-slate-900 text-white px-5 py-2 flex items-center justify-between text-xs select-none shrink-0">
            <span className="font-mono text-[11px] font-semibold tabular-nums">09:41</span>
            <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile Screen Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div>
              <div className="text-xs font-bold text-slate-900">
                {language === 'he' ? selectedClass.nameHe : selectedClass.nameEn}
              </div>
              <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                {language === 'he' ? selectedClass.roomHe : selectedClass.roomEn}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {geoStatus === 'verified' && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  GPS ✓
                </span>
              )}
              <span className="text-[10px] font-semibold text-teal-800 bg-teal-100/90 px-2 py-0.5 rounded-full border border-teal-300/60">
                {t.actions.statusActive}
              </span>
            </div>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-100/60">
            {renderActiveTab()}
          </div>

          {/* Embedded Mobile Bottom Tab Navigation */}
          <TeacherBottomNav isEmbeddedInPhone={true} />

          {/* Smartphone Bottom Home Bar */}
          <div className="bg-white py-1.5 flex justify-center shrink-0">
            <div className="w-28 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Full-width responsive view (standard mobile web or expanded desktop)
  return (
    <div className="max-w-3xl mx-auto px-4 py-4 pb-24">
      {renderActiveTab()}
      <TeacherBottomNav isEmbeddedInPhone={false} />
    </div>
  );
};
