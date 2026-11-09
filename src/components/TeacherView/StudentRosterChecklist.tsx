import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  CheckCheck,
  ShieldAlert,
  UserCheck
} from 'lucide-react';

export const StudentRosterChecklist: React.FC = () => {
  const {
    t,
    language,
    selectedClass,
    cycleStudentStatus,
    markAllStudentsPresent,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const students = selectedClass.students;

  const filteredStudents = students.filter((s) => {
    const name = language === 'he' ? s.nameHe : s.nameEn;
    const parent = language === 'he' ? s.parentNameHe : s.parentNameEn;
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const lateCount = students.filter((s) => s.status === 'late').length;
  const totalCount = students.length;
  const percentage = Math.round((presentCount / (totalCount || 1)) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
      
      {/* Header and Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              {t.teacherModules.quickAttendanceChecklist}
            </h3>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 tabular-nums">
              {presentCount}/{totalCount} ({percentage}%)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.teacherModules.attendanceSubtitle}
          </p>
        </div>

        {/* Mark All Present Fast Button */}
        <button
          type="button"
          onClick={markAllStudentsPresent}
          className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto min-h-[36px]"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>{t.teacherModules.markAllPresent}</span>
        </button>
      </div>

      {/* Progress Attendance Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3.5 flex">
        <div
          className="bg-teal-500 h-full transition-all duration-300"
          style={{ width: `${(presentCount / totalCount) * 100}%` }}
        />
        <div
          className="bg-amber-400 h-full transition-all duration-300"
          style={{ width: `${(lateCount / totalCount) * 100}%` }}
        />
        <div
          className="bg-rose-400 h-full transition-all duration-300"
          style={{ width: `${(absentCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Search Input Filter */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.teacherModules.searchStudent}
          className="w-full text-xs ps-8 pe-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
      </div>

      {/* Students List Checklist */}
      <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto pr-1">
        {filteredStudents.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            {language === 'he' ? 'לא נמצאו תלמידים תואמים' : 'No matching students found'}
          </div>
        ) : (
          filteredStudents.map((child) => {
            const childName = language === 'he' ? child.nameHe : child.nameEn;
            const parentName = language === 'he' ? child.parentNameHe : child.parentNameEn;
            const allergy = language === 'he' ? child.allergyHe : child.allergyEn;

            return (
              <div
                key={child.id}
                onClick={() => cycleStudentStatus(child.id)}
                className="py-2.5 px-2 -mx-2 flex items-center justify-between hover:bg-slate-50/80 rounded-xl transition-colors cursor-pointer select-none min-h-[52px]"
              >
                {/* Child Info */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs ${child.avatarBg}`}
                  >
                    {childName.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {childName}
                      </span>
                      {allergy && (
                        <span
                          className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.2 rounded border border-rose-200 flex items-center gap-0.5"
                          title={allergy}
                        >
                          <ShieldAlert className="w-3 h-3 text-rose-600" />
                          <span className="max-w-[120px] truncate">{allergy}</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{parentName}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(
                            `${language === 'he' ? 'מחייג להורה' : 'Calling'} ${parentName} (${child.parentPhone})`,
                            'info'
                          );
                        }}
                        className="text-teal-600 hover:text-teal-800 flex items-center gap-0.5 font-mono"
                      >
                        <Phone className="w-2.5 h-2.5" />
                        <span>{child.parentPhone}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status Toggle Capsule Button */}
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-all shadow-2xs ${
                      child.status === 'present'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                        : child.status === 'absent'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {child.status === 'present' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>{t.actions.present}</span>
                      </>
                    ) : child.status === 'absent' ? (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>{t.actions.absent}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t.actions.late}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
