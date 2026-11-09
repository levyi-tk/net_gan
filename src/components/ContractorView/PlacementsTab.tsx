import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassPlacementAssignment } from '../../types';
import {
  CalendarClock,
  Clock,
  MapPin,
  User,
  Building,
  Plus,
  Trash2,
  Edit2,
  Coins,
  CheckCircle2,
  Phone,
  Search,
  Calendar as CalendarIcon,
  Repeat,
  Sparkles,
  Info
} from 'lucide-react';

interface PlacementsTabProps {
  placements: ClassPlacementAssignment[];
  onAddPlacement: () => void;
  onEditPlacement: (placement: ClassPlacementAssignment) => void;
  onDeletePlacement: (placementId: string) => void;
  onCallTeacher: (name: string, phone: string) => void;
  onCallKindergarten: (name: string, phone: string) => void;
}

export const PlacementsTab: React.FC<PlacementsTabProps> = ({
  placements,
  onAddPlacement,
  onEditPlacement,
  onDeletePlacement,
  onCallTeacher,
  onCallKindergarten,
}) => {
  const { t, language } = useApp();
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'recurring_weekly' | 'specific_date'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  const daysLabels = [
    { value: 0, labelHe: 'יום ראשון', labelEn: 'Sunday', shortHe: 'א׳', shortEn: 'Sun' },
    { value: 1, labelHe: 'יום שני', labelEn: 'Monday', shortHe: 'ב׳', shortEn: 'Mon' },
    { value: 2, labelHe: 'יום שלישי', labelEn: 'Tuesday', shortHe: 'ג׳', shortEn: 'Tue' },
    { value: 3, labelHe: 'יום רביעי', labelEn: 'Wednesday', shortHe: 'ד׳', shortEn: 'Wed' },
    { value: 4, labelHe: 'יום חמישי', labelEn: 'Thursday', shortHe: 'ה׳', shortEn: 'Thu' },
    { value: 5, labelHe: 'יום שישי', labelEn: 'Friday', shortHe: 'ו׳', shortEn: 'Fri' },
  ];

  // Helper to convert ISO date (YYYY-MM-DD) to Israeli date format (DD/MM/YYYY)
  const formatIsraeliDate = (isoStr?: string) => {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoStr;
  };

  const filteredPlacements = placements.filter((p) => {
    const isHebrew = language === 'he';
    const teacherName = isHebrew ? p.instructorNameHe : p.instructorNameEn;
    const facName = isHebrew ? p.facilityNameHe : p.facilityNameEn;
    const city = isHebrew ? p.cityHe : p.cityEn;
    const subject = isHebrew ? p.subjectHe : p.subjectEn;
    const israeliDate = formatIsraeliDate(p.specificDate);

    const matchesSearch =
      teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      israeliDate.includes(searchQuery) ||
      (p.specificDate && p.specificDate.includes(searchQuery));

    const matchesType = typeFilter === 'all' || (p.scheduleType || 'recurring_weekly') === typeFilter;

    let matchesDay = true;
    if (selectedDayFilter !== 'all') {
      if (p.scheduleType === 'specific_date') {
        matchesDay = p.dayOfWeek === selectedDayFilter;
      } else {
        // Recurring weekly
        const days = p.recurringWeekdays && p.recurringWeekdays.length > 0 ? p.recurringWeekdays : [p.dayOfWeek];
        matchesDay = days.includes(selectedDayFilter);
      }
    }

    return matchesSearch && matchesType && matchesDay;
  });

  const confirmDelete = () => {
    if (deleteCandidateId) {
      onDeletePlacement(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  const recurringCount = placements.filter((p) => (p.scheduleType || 'recurring_weekly') === 'recurring_weekly').length;
  const specificDateCount = placements.filter((p) => p.scheduleType === 'specific_date').length;

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-teal-600" />
                <span>{t.contractorView.placementsTitle}</span>
              </h2>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                DD/MM/YYYY • 24h
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contractorView.placementsSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onAddPlacement}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.contractorView.addPlacement}</span>
          </button>
        </div>

        {/* Schedule Mode Filters (All vs Recurring Weekly vs Specific Date) */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-semibold text-[11px] me-1">
            {language === 'he' ? 'סינון מועד:' : 'Filter Type:'}
          </span>
          <button
            type="button"
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
              typeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'he' ? 'הכל' : 'All'} ({placements.length})
          </button>

          <button
            type="button"
            onClick={() => setTypeFilter('recurring_weekly')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 ${
              typeFilter === 'recurring_weekly'
                ? 'bg-teal-600 text-white shadow-2xs font-bold'
                : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>{t.contractorView.recurringBadge}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-teal-800/40 text-white">
              {recurringCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTypeFilter('specific_date')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 ${
              typeFilter === 'specific_date'
                ? 'bg-blue-600 text-white shadow-2xs font-bold'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{t.contractorView.singleSessionBadge}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-blue-800/40 text-white">
              {specificDateCount}
            </span>
          </button>
        </div>

        {/* Day of Week Filter Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-slate-100 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedDayFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedDayFilter === 'all'
                ? 'bg-slate-800 text-white shadow-2xs font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{t.contractorView.filterDayAll}</span>
          </button>

          {daysLabels.map((d) => {
            const count = placements.filter((p) => {
              if (p.scheduleType === 'specific_date') {
                return p.dayOfWeek === d.value;
              }
              const days = p.recurringWeekdays && p.recurringWeekdays.length > 0 ? p.recurringWeekdays : [p.dayOfWeek];
              return days.includes(d.value);
            }).length;

            const isSelected = selectedDayFilter === d.value;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => setSelectedDayFilter(d.value)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{language === 'he' ? d.labelHe : d.labelEn}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-teal-800/60 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Filter */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${t.actions.searchPlaceholder} (${language === 'he' ? 'שם גן, מדריך, תאריך DD/MM/YYYY' : 'Name, date DD/MM/YYYY'})`}
              className="w-full text-xs ps-9 pe-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'he' ? 'זמני שהות מוצגים בפורמט שעון 24 שעות ישראלי' : 'Displaying Israeli 24h clock hours'}</span>
          </div>
        </div>
      </div>

      {/* Placements Cards Grid */}
      {filteredPlacements.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
          {t.contractorView.noPlacementsFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlacements.map((p) => {
            const isHebrew = language === 'he';
            const teacherName = isHebrew ? p.instructorNameHe : p.instructorNameEn;
            const facName = isHebrew ? p.facilityNameHe : p.facilityNameEn;
            const city = isHebrew ? p.cityHe : p.cityEn;
            const address = isHebrew ? p.addressHe : p.addressEn;
            const subject = isHebrew ? p.subjectHe : p.subjectEn;
            const dayLabel = daysLabels.find((d) => d.value === p.dayOfWeek);
            const isSpecificDate = p.scheduleType === 'specific_date';
            const israeliDate = formatIsraeliDate(p.specificDate);

            // Format recurring weekdays if multiple
            const recurringWeekdaysLabels = (p.recurringWeekdays || [p.dayOfWeek])
              .map((val) => daysLabels.find((d) => d.value === val)?.[isHebrew ? 'shortHe' : 'shortEn'])
              .join(', ');

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  {/* Top Bar: Recurrence / Date Badge & 24h Time */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {isSpecificDate ? (
                      <div className="flex flex-col">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                          <CalendarIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{israeliDate}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                          {isHebrew ? dayLabel?.labelHe : dayLabel?.labelEn} ({t.contractorView.singleSessionBadge})
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                          <Repeat className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{isHebrew ? `ימי ${recurringWeekdaysLabels}` : `Every ${recurringWeekdaysLabels}`}</span>
                        </span>
                        <span className="text-[10px] text-teal-700 font-semibold mt-0.5">
                          {t.contractorView.recurringBadge}
                        </span>
                      </div>
                    )}

                    {/* 24h Clock Time Badge (e.g. 14:00 - 15:30) */}
                    <div className="text-end">
                      <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{p.startTime} - {p.endTime}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        24h clock
                      </span>
                    </div>
                  </div>

                  {/* Facility Info */}
                  <div className="mt-2.5">
                    <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-teal-600" />
                      <span>{city}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {facName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{address}</p>
                  </div>

                  {/* Instructor Box */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {teacherName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{teacherName}</div>
                        <div className="text-[11px] text-teal-800 font-medium">{subject}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onCallTeacher(teacherName, p.instructorPhone)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-teal-700"
                      title={t.contractorView.callTeacher}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Financial & Split Pill */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 bg-slate-50/70 p-2 rounded-lg border border-slate-100 font-mono">
                    <span>
                      {language === 'he' ? 'שכר: ' : 'Pay: '}
                      <strong className="text-teal-700">₪{(p.ratePerClass * (p.teacherSplit / 100)).toFixed(0)}</strong> ({p.teacherSplit}%)
                    </span>
                    <span>
                      {language === 'he' ? 'רווח: ' : 'Margin: '}
                      <strong className="text-emerald-700">₪{(p.ratePerClass * ((100 - p.teacherSplit) / 100)).toFixed(0)}</strong>
                    </span>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onEditPlacement(p)}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 hover:bg-teal-50 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>{t.contractorView.editPlacement}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteCandidateId(p.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                    title={t.contractorView.deletePlacement}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
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
                {t.contractorView.deletePlacement}
              </h4>
              <p className="text-slate-500 mt-1">
                {t.contractorView.deletePlacementConfirm}
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
                {language === 'he' ? 'בטל שיבוץ' : 'Cancel Placement'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
