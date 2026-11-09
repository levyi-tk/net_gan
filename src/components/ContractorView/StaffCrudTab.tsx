import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstructorItem } from '../../types';
import {
  Users2,
  UserPlus,
  Search,
  Filter,
  Phone,
  Mail,
  Edit2,
  Trash2,
  CalendarPlus,
  CheckCircle2,
  UserCheck,
  UserX,
  AlertCircle,
  Building,
  Percent,
  Sparkles
} from 'lucide-react';

interface StaffCrudTabProps {
  instructors: InstructorItem[];
  onAddInstructor: () => void;
  onEditInstructor: (instructor: InstructorItem) => void;
  onDeleteInstructor: (instructorId: string) => void;
  onQuickAssign: (instructorId: string) => void;
  onCallTeacher: (name: string, phone: string) => void;
}

export const StaffCrudTab: React.FC<StaffCrudTabProps> = ({
  instructors,
  onAddInstructor,
  onEditInstructor,
  onDeleteInstructor,
  onQuickAssign,
  onCallTeacher,
}) => {
  const { t, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState<'all' | 'north' | 'center' | 'south'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'standby' | 'sick'>('all');
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  const filteredInstructors = instructors.filter((inst) => {
    const isHebrew = language === 'he';
    const name = isHebrew ? inst.nameHe : inst.nameEn;
    const subject = isHebrew ? inst.subjectHe : inst.subjectEn;
    const role = isHebrew ? inst.roleHe : inst.roleEn;

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.phone.includes(searchQuery);

    const matchesZone = zoneFilter === 'all' || inst.zone === zoneFilter;
    const matchesStatus = statusFilter === 'all' || inst.status === statusFilter;

    return matchesSearch && matchesZone && matchesStatus;
  });

  const activeCount = instructors.filter((i) => i.status === 'active').length;
  const standbyCount = instructors.filter((i) => i.status === 'standby').length;
  const avgSplit = instructors.length > 0
    ? (instructors.reduce((acc, curr) => acc + curr.defaultSplit, 0) / instructors.length).toFixed(0)
    : '60';

  const confirmDelete = () => {
    if (deleteCandidateId) {
      onDeleteInstructor(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Metric Counters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users2 className="w-5 h-5 text-teal-600" />
              <span>{t.contractorView.instructorsTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contractorView.instructorsSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onAddInstructor}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t.contractorView.addInstructor}</span>
          </button>
        </div>

        {/* 3 Metric Summary Counters */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">
              {language === 'he' ? 'סה״כ צוות הדרכה' : 'Total Instructors'}
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {instructors.length}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{language === 'he' ? 'פעילים בשטח' : 'Active On-Site'}</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-900 mt-0.5">
              {activeCount}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
            <div className="text-[11px] text-teal-800 font-medium">
              {language === 'he' ? 'ממוצע אחוז שכר' : 'Avg Teacher Share'}
            </div>
            <div className="text-xl font-bold font-mono text-teal-900 mt-0.5">
              {avgSplit}%
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.actions.searchPlaceholder}
              className="w-full text-xs ps-9 pe-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value as any)}
              className="text-xs px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">{language === 'he' ? 'כל המחוזות' : 'All Districts'}</option>
              <option value="center">{language === 'he' ? 'מחוז מרכז' : 'Center'}</option>
              <option value="north">{language === 'he' ? 'מחוז צפון' : 'North'}</option>
              <option value="south">{language === 'he' ? 'מחוז דרום' : 'South'}</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">{language === 'he' ? 'כל הסטטוסים' : 'All Statuses'}</option>
              <option value="active">{language === 'he' ? 'פעילים' : 'Active'}</option>
              <option value="standby">{language === 'he' ? 'כוננות' : 'Standby'}</option>
              <option value="sick">{language === 'he' ? 'בחופשה/מחלה' : 'On Leave'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Instructors Table / Card List */}
      {filteredInstructors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
          {t.contractorView.noInstructorsFound}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-start font-semibold">{language === 'he' ? 'מדריך/ה' : 'Instructor'}</th>
                  <th className="py-3 px-4 text-start font-semibold">{language === 'he' ? 'תחום העשרה' : 'Discipline'}</th>
                  <th className="py-3 px-4 text-start font-semibold">{language === 'he' ? 'פרטי התקשרות' : 'Contact'}</th>
                  <th className="py-3 px-4 text-center font-semibold">{language === 'he' ? 'מחוז' : 'District'}</th>
                  <th className="py-3 px-4 text-center font-semibold">{t.contractorView.teacherSplitPercentage}</th>
                  <th className="py-3 px-4 text-center font-semibold">{language === 'he' ? 'מוסדות משובצים' : 'Facilities'}</th>
                  <th className="py-3 px-4 text-center font-semibold">{language === 'he' ? 'סטטוס' : 'Status'}</th>
                  <th className="py-3 px-4 text-end font-semibold">{language === 'he' ? 'פעולות' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInstructors.map((inst) => {
                  const isHebrew = language === 'he';
                  const name = isHebrew ? inst.nameHe : inst.nameEn;
                  const role = isHebrew ? inst.roleHe : inst.roleEn;
                  const subject = isHebrew ? inst.subjectHe : inst.subjectEn;
                  const seniority = isHebrew ? inst.seniorityHe : inst.seniorityEn;

                  return (
                    <tr key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name & Role */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${inst.avatarBg || 'bg-teal-600'} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                            {name.slice(0, 1)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{name}</div>
                            <div className="text-[11px] text-slate-500 font-normal">{role} • {seniority}</div>
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                        {subject}
                      </td>

                      {/* Phone & Email */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onCallTeacher(name, inst.phone)}
                            className="inline-flex items-center gap-1 font-mono text-slate-700 hover:text-teal-700 bg-slate-50 hover:bg-teal-50 px-2 py-0.5 rounded border border-slate-200 transition-colors"
                          >
                            <Phone className="w-3 h-3 text-teal-600" />
                            <span>{inst.phone}</span>
                          </button>
                        </div>
                      </td>

                      {/* Zone */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {inst.zone === 'north' ? (isHebrew ? 'צפון' : 'North') : inst.zone === 'south' ? (isHebrew ? 'דרום' : 'South') : (isHebrew ? 'מרכז' : 'Center')}
                        </span>
                      </td>

                      {/* Base Split % */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-teal-800 text-xs whitespace-nowrap">
                        {inst.defaultSplit}%
                      </td>

                      {/* Assigned Facilities Count */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold">
                          <Building className="w-3 h-3 text-slate-500" />
                          <span>{inst.assignedFacilitiesCount || 1}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {inst.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{language === 'he' ? 'פעיל/ה' : 'Active'}</span>
                          </span>
                        ) : inst.status === 'standby' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            <UserCheck className="w-3 h-3" />
                            <span>{language === 'he' ? 'כוננות' : 'Standby'}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            <UserX className="w-3 h-3" />
                            <span>{language === 'he' ? 'חופשה/מחלה' : 'On Leave'}</span>
                          </span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-end whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onQuickAssign(inst.id)}
                            className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1 transition-colors"
                            title={language === 'he' ? 'שבץ לגן' : 'Assign to Facility'}
                          >
                            <CalendarPlus className="w-3 h-3 text-teal-600" />
                            <span>{language === 'he' ? 'שבץ לגן' : 'Assign'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onEditInstructor(inst)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            title={t.contractorView.editInstructor}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteCandidateId(inst.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title={t.contractorView.deleteInstructor}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidateId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold text-slate-900">
                {t.contractorView.deleteInstructor}
              </h4>
              <p className="text-slate-500 mt-1">
                {t.contractorView.deleteInstructorConfirm}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidateId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-100"
              >
                {language === 'he' ? 'ביטול' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                {language === 'he' ? 'כן, מחק' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
