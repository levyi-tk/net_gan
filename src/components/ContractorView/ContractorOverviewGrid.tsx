import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ContractorClassSession } from '../../types';
import {
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Play,
  Users,
  Phone,
  Building2,
  Radio,
  FileCheck2,
  FileWarning,
  ExternalLink,
  Search,
  Filter,
  Check
} from 'lucide-react';

interface ContractorOverviewGridProps {
  classes: ContractorClassSession[];
  onCallTeacher: (teacherName: string, phone: string) => void;
  onCallKindergarten: (kindergartenName: string, phone: string) => void;
}

export const ContractorOverviewGrid: React.FC<ContractorOverviewGridProps> = ({
  classes: initialClasses,
  onCallTeacher,
  onCallKindergarten,
}) => {
  const { t, language, showToast } = useApp();
  const [classes, setClasses] = useState<ContractorClassSession[]>(initialClasses);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'completed' | 'anomalies'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassModal, setSelectedClassModal] = useState<ContractorClassSession | null>(null);

  // Live timer tick effect for active classes
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setClasses((prev) =>
        prev.map((c) => {
          if (c.status === 'active' && c.isTimerRunning) {
            return {
              ...c,
              timerSecondsElapsed: c.timerSecondsElapsed + 1,
            };
          }
          return c;
        })
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Format seconds to mm:ss or hh:mm:ss
  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  // Filter classes
  const filteredClasses = classes.filter((c) => {
    const matchesSearch =
      (language === 'he' ? c.kindergartenNameHe : c.kindergartenNameEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === 'he' ? c.teacherNameHe : c.teacherNameEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === 'he' ? c.cityHe : c.cityEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === 'he' ? c.subjectHe : c.subjectEn).toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return c.status === 'active';
    if (statusFilter === 'upcoming') return c.status === 'upcoming';
    if (statusFilter === 'completed') return c.status === 'completed';
    if (statusFilter === 'anomalies') return c.gpsStatus === 'out_of_range' || (!c.hasLogSubmitted && c.status === 'completed');

    return true;
  });

  const activeCount = classes.filter((c) => c.status === 'active').length;
  const anomaliesCount = classes.filter((c) => c.gpsStatus === 'out_of_range' || (!c.hasLogSubmitted && c.status === 'completed')).length;

  return (
    <div className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t.contractorView.activeClassesTitle}
              </h2>
              {activeCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeCount} {language === 'he' ? 'בפעילות כעת' : 'live now'}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contractorView.activeClassesSubtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.actions.searchPlaceholder}
              className="w-full text-xs ps-9 pe-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-slate-100 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{t.contractorView.filterAllClasses}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/60 text-white font-mono">
              {classes.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              statusFilter === 'active'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.contractorView.filterLiveNow}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-800/40 text-white font-mono">
              {activeCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('upcoming')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              statusFilter === 'upcoming'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <span>{t.contractorView.filterUpcoming}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              statusFilter === 'completed'
                ? 'bg-slate-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{t.contractorView.filterCompleted}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('anomalies')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              statusFilter === 'anomalies'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.contractorView.filterAnomalies}</span>
            {anomaliesCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-800/40 text-white font-mono">
                {anomaliesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Grid of Class Cards */}
      {filteredClasses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
          {t.contractorView.noClassesFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClasses.map((item) => {
            const isHebrew = language === 'he';
            const kName = isHebrew ? item.kindergartenNameHe : item.kindergartenNameEn;
            const city = isHebrew ? item.cityHe : item.cityEn;
            const teacherName = isHebrew ? item.teacherNameHe : item.teacherNameEn;
            const subject = isHebrew ? item.subjectHe : item.subjectEn;
            const ageGroup = isHebrew ? item.ageGroupHe : item.ageGroupEn;
            const address = isHebrew ? item.addressHe : item.addressEn;
            const totalDurationSec = item.timerTotalDurationMinutes * 60;
            const progressPercent = Math.min(100, Math.round((item.timerSecondsElapsed / totalDurationSec) * 100));

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  item.gpsStatus === 'out_of_range'
                    ? 'border-rose-300 ring-1 ring-rose-200'
                    : item.status === 'active'
                    ? 'border-emerald-300 ring-1 ring-emerald-100'
                    : 'border-slate-200'
                }`}
              >
                {/* Card Top Banner / Badges */}
                <div className="p-4 sm:p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                        <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-semibold text-slate-700">{city}</span>
                        <span>•</span>
                        <span className="truncate max-w-[150px]">{address}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {kName}
                      </h3>
                      <div className="text-xs font-medium text-teal-800 mt-0.5">
                        {subject}
                      </div>
                    </div>

                    {/* Session Status Pill */}
                    {item.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{t.contractorView.sessionActiveNow}</span>
                      </span>
                    ) : item.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{t.contractorView.sessionCompleted}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{t.contractorView.sessionUpcoming}</span>
                      </span>
                    )}
                  </div>

                  {/* Teacher Info Row */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {teacherName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{teacherName}</div>
                        <div className="text-[11px] text-slate-500">{ageGroup}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onCallTeacher(teacherName, item.teacherPhone)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors"
                      title={t.contractorView.callTeacher}
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-600" />
                    </button>
                  </div>

                  {/* Live Class Timer Section */}
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.scheduledTime}</span>
                      </span>

                      {item.status === 'active' ? (
                        <span className="font-mono font-bold text-emerald-700 text-xs flex items-center gap-1">
                          <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
                          <span>{formatTimer(item.timerSecondsElapsed)}</span>
                          <span className="text-[10px] text-slate-400 font-normal">/ {item.timerTotalDurationMinutes}m</span>
                        </span>
                      ) : item.status === 'completed' ? (
                        <span className="font-mono text-xs font-semibold text-slate-600">
                          {item.timerTotalDurationMinutes} {language === 'he' ? 'דק׳ (הושלם)' : 'min (done)'}
                        </span>
                      ) : (
                        <span className="text-xs text-blue-600 font-medium">
                          {language === 'he' ? 'טרם החל' : 'Not started'}
                        </span>
                      )}
                    </div>

                    {/* Progress Bar for Active Class */}
                    {item.status === 'active' && (
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* GPS Verification Badge & Location */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {item.gpsStatus === 'verified' ? (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          {t.contractorView.verifiedAtLocation} ({item.gpsDistanceMeters} {t.contractorView.distanceMeters})
                        </span>
                      </div>
                    ) : item.gpsStatus === 'out_of_range' ? (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-300 animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>
                          {t.contractorView.outOfRange} ({(item.gpsDistanceMeters / 1000).toFixed(1)} {language === 'he' ? 'ק״מ' : 'km'})
                        </span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{t.contractorView.pendingCheckIn}</span>
                      </div>
                    )}

                    {/* Attendance Pill */}
                    <div className="text-xs font-mono font-medium text-slate-600 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>{item.attendanceCount}/{item.totalStudents}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    {item.hasLogSubmitted ? (
                      <span className="text-[11px] text-teal-700 font-medium flex items-center gap-1">
                        <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>{language === 'he' ? 'יומן הוגש' : 'Log filed'}</span>
                      </span>
                    ) : item.status === 'completed' ? (
                      <span className="text-[11px] text-amber-700 font-bold flex items-center gap-1">
                        <FileWarning className="w-3.5 h-3.5 text-amber-600" />
                        <span>{language === 'he' ? 'יומן חסר' : 'Log missing'}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">
                        {language === 'he' ? 'בסיום יוגש יומן' : 'Log pending end'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedClassModal(item)}
                      className="px-2.5 py-1 text-xs font-semibold text-teal-700 hover:text-teal-900 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      {t.contractorView.viewDetails}
                    </button>
                    <button
                      type="button"
                      onClick={() => onCallKindergarten(kName, item.contactPhone)}
                      className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                      title={t.contractorView.callKindergarten}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Class Details Modal */}
      {selectedClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  {language === 'he' ? selectedClassModal.cityHe : selectedClassModal.cityEn}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {language === 'he' ? selectedClassModal.kindergartenNameHe : selectedClassModal.kindergartenNameEn}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'he' ? selectedClassModal.addressHe : selectedClassModal.addressEn}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClassModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 text-[11px]">{language === 'he' ? 'מדריך מוצב:' : 'Assigned Instructor:'}</div>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">
                    {language === 'he' ? selectedClassModal.teacherNameHe : selectedClassModal.teacherNameEn}
                  </div>
                  <div className="text-teal-700 mt-0.5">{selectedClassModal.teacherPhone}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 text-[11px]">{language === 'he' ? 'איש קשר בגן:' : 'Preschool Contact:'}</div>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">
                    {language === 'he' ? selectedClassModal.contactPersonHe : selectedClassModal.contactPersonEn}
                  </div>
                  <div className="text-teal-700 mt-0.5">{selectedClassModal.contactPhone}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">{language === 'he' ? 'נושא הפעילות:' : 'Enrichment Subject:'}</span>
                  <span className="font-semibold text-slate-800">{language === 'he' ? selectedClassModal.subjectHe : selectedClassModal.subjectEn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{language === 'he' ? 'שכבת גיל:' : 'Age Group:'}</span>
                  <span className="font-semibold text-slate-800">{language === 'he' ? selectedClassModal.ageGroupHe : selectedClassModal.ageGroupEn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{language === 'he' ? 'שעות שיעור:' : 'Scheduled Hours:'}</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedClassModal.scheduledTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{language === 'he' ? 'נוכחות ילדים:' : 'Student Attendance:'}</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedClassModal.attendanceCount} / {selectedClassModal.totalStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{language === 'he' ? 'אימות GPS שטח:' : 'GPS Gate Verification:'}</span>
                  <span className={`font-semibold ${selectedClassModal.gpsStatus === 'verified' ? 'text-emerald-700' : selectedClassModal.gpsStatus === 'out_of_range' ? 'text-rose-700' : 'text-amber-700'}`}>
                    {selectedClassModal.gpsStatus === 'verified'
                      ? `${t.contractorView.verifiedAtLocation} (${selectedClassModal.gpsDistanceMeters}m)`
                      : selectedClassModal.gpsStatus === 'out_of_range'
                      ? `${t.contractorView.outOfRange} (${(selectedClassModal.gpsDistanceMeters / 1000).toFixed(1)}km)`
                      : t.contractorView.pendingCheckIn}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  onCallTeacher(
                    language === 'he' ? selectedClassModal.teacherNameHe : selectedClassModal.teacherNameEn,
                    selectedClassModal.teacherPhone
                  );
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.contractorView.callTeacher}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedClassModal(null)}
                className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
              >
                {language === 'he' ? 'סגור' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
