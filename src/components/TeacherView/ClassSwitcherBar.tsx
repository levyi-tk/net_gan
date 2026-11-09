import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Clock, MapPin, Users, ChevronDown } from 'lucide-react';

export const ClassSwitcherBar: React.FC = () => {
  const {
    classesList,
    selectedClassId,
    setSelectedClassId,
    selectedClass,
    language,
    t,
    showToast,
  } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-teal-600" />
          <span>{t.teacherModules.todaysClasses}</span>
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          3 {language === 'he' ? 'מוסדות משובצים' : 'Assigned today'}
        </span>
      </div>

      {/* Class Pills */}
      <div className="grid grid-cols-3 gap-1.5">
        {classesList.map((cls) => {
          const isSelected = cls.id === selectedClassId;
          const name = language === 'he' ? cls.nameHe : cls.nameEn;
          return (
            <button
              key={cls.id}
              type="button"
              onClick={() => {
                setSelectedClassId(cls.id);
                showToast(
                  language === 'he'
                    ? `הועברת לניהול ${cls.nameHe} (${cls.timeSlot})`
                    : `Switched to ${cls.nameEn} (${cls.timeSlot})`,
                  'info'
                );
              }}
              className={`p-2 rounded-xl border text-start transition-all min-h-[52px] flex flex-col justify-between ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/80 ring-1 ring-teal-500/20 shadow-2xs'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-white text-slate-600'
              }`}
            >
              <div className="text-xs font-bold text-slate-900 truncate">
                {name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono tabular-nums truncate">
                {cls.timeSlot}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Class Details Sub-strip */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5 text-slate-600 truncate max-w-full sm:max-w-[280px]">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span className="truncate">
            {language === 'he' ? selectedClass.addressHe : selectedClass.addressEn}
          </span>
          <a
            href={`https://waze.com/ul?q=${encodeURIComponent(
              (language === 'he' ? selectedClass.nameHe : selectedClass.nameEn) +
                ', ' +
                (language === 'he' ? selectedClass.addressHe : selectedClass.addressEn)
            )}&navigate=yes`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              showToast(
                language === 'he'
                  ? `פותח ניווט Waze ל-${selectedClass.nameHe} 🚗`
                  : `Opening Waze navigation to ${selectedClass.nameEn} 🚗`,
                'success'
              );
            }}
            className="ms-1 px-2 py-0.5 rounded bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-bold flex items-center gap-1 shrink-0"
            title="Waze"
          >
            <span>Waze 🚗</span>
          </a>
        </div>
        <div className="flex items-center gap-3 shrink-0 font-mono">
          <span className="flex items-center gap-1 text-teal-700 font-medium">
            <Users className="w-3 h-3" />
            <span>{selectedClass.students.length} {language === 'he' ? 'תלמידים' : 'students'}</span>
          </span>
          <span className="text-slate-400">·</span>
          <span>{language === 'he' ? selectedClass.ageGroupHe : selectedClass.ageGroupEn}</span>
        </div>
      </div>
    </div>
  );
};
