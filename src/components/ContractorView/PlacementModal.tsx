import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ClassPlacementAssignment,
  InstructorItem,
  EducationalFacility
} from '../../types';
import {
  X,
  CalendarClock,
  Save,
  Clock,
  MapPin,
  User,
  Building,
  Coins,
  Calendar as CalendarIcon,
  Repeat,
  Sparkles,
  Info
} from 'lucide-react';

interface PlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (placement: ClassPlacementAssignment) => void;
  instructors: InstructorItem[];
  facilities: EducationalFacility[];
  placementToEdit?: ClassPlacementAssignment | null;
  initialInstructorId?: string;
  initialFacilityId?: string;
}

export const PlacementModal: React.FC<PlacementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  instructors,
  facilities,
  placementToEdit,
  initialInstructorId,
  initialFacilityId,
}) => {
  const { t, language } = useApp();

  const [selectedInstructorId, setSelectedInstructorId] = useState('');
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  
  // Recurrence & Date fields
  const [scheduleType, setScheduleType] = useState<'recurring_weekly' | 'specific_date'>('recurring_weekly');
  const [specificDate, setSpecificDate] = useState('2026-11-09'); // YYYY-MM-DD
  const [dayOfWeek, setDayOfWeek] = useState<number>(1); // Monday default
  const [recurringWeekdays, setRecurringWeekdays] = useState<number[]>([1]); // default Monday

  // Time in 24h Israeli format
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:15');

  // Customization
  const [subjectHe, setSubjectHe] = useState('');
  const [subjectEn, setSubjectEn] = useState('');
  const [ageGroupHe, setAgeGroupHe] = useState('');
  const [ageGroupEn, setAgeGroupEn] = useState('');
  const [ratePerClass, setRatePerClass] = useState(350);
  const [teacherSplit, setTeacherSplit] = useState(60);

  const daysList = [
    { value: 0, labelHe: 'יום ראשון', labelEn: 'Sunday', shortHe: 'א׳', shortEn: 'Sun' },
    { value: 1, labelHe: 'יום שני', labelEn: 'Monday', shortHe: 'ב׳', shortEn: 'Mon' },
    { value: 2, labelHe: 'יום שלישי', labelEn: 'Tuesday', shortHe: 'ג׳', shortEn: 'Tue' },
    { value: 3, labelHe: 'יום רביעי', labelEn: 'Wednesday', shortHe: 'ד׳', shortEn: 'Wed' },
    { value: 4, labelHe: 'יום חמישי', labelEn: 'Thursday', shortHe: 'ה׳', shortEn: 'Thu' },
    { value: 5, labelHe: 'יום שישי', labelEn: 'Friday', shortHe: 'ו׳', shortEn: 'Fri' },
  ];

  // Helper to convert YYYY-MM-DD to DD/MM/YYYY
  const toIsraeliDateFormat = (isoStr: string) => {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoStr;
  };

  useEffect(() => {
    if (placementToEdit) {
      setSelectedInstructorId(placementToEdit.instructorId);
      setSelectedFacilityId(placementToEdit.facilityId);
      setScheduleType(placementToEdit.scheduleType || 'recurring_weekly');
      setSpecificDate(placementToEdit.specificDate || '2026-11-09');
      setDayOfWeek(placementToEdit.dayOfWeek ?? 1);
      setRecurringWeekdays(placementToEdit.recurringWeekdays && placementToEdit.recurringWeekdays.length > 0
        ? placementToEdit.recurringWeekdays
        : [placementToEdit.dayOfWeek ?? 1]);
      setStartTime(placementToEdit.startTime || '10:00');
      setEndTime(placementToEdit.endTime || '11:15');
      setSubjectHe(placementToEdit.subjectHe);
      setSubjectEn(placementToEdit.subjectEn);
      setAgeGroupHe(placementToEdit.ageGroupHe);
      setAgeGroupEn(placementToEdit.ageGroupEn);
      setRatePerClass(placementToEdit.ratePerClass || 350);
      setTeacherSplit(placementToEdit.teacherSplit || 60);
    } else {
      const instId = initialInstructorId || (instructors.length > 0 ? instructors[0].id : '');
      const facId = initialFacilityId || (facilities.length > 0 ? facilities[0].id : '');
      
      setSelectedInstructorId(instId);
      setSelectedFacilityId(facId);
      setScheduleType('recurring_weekly');
      setSpecificDate('2026-11-09');
      setDayOfWeek(1);
      setRecurringWeekdays([1]);
      setStartTime('10:00');
      setEndTime('11:15');

      const inst = instructors.find((i) => i.id === instId);
      const fac = facilities.find((f) => f.id === facId);

      setSubjectHe(inst ? inst.subjectHe : (language === 'he' ? 'חוג תנועה ומוזיקה' : 'Music & Movement'));
      setSubjectEn(inst ? inst.subjectEn : 'Music & Movement');
      setAgeGroupHe(fac ? fac.ageGroupHe : (language === 'he' ? 'גילאי 3-4' : 'Ages 3-4'));
      setAgeGroupEn(fac ? fac.ageGroupEn : 'Ages 3-4');
      setRatePerClass(350);
      setTeacherSplit(inst ? inst.defaultSplit : 60);
    }
  }, [placementToEdit, initialInstructorId, initialFacilityId, instructors, facilities, isOpen, language]);

  // When instructor changes, auto update subject and split %
  const handleInstructorChange = (instId: string) => {
    setSelectedInstructorId(instId);
    const inst = instructors.find((i) => i.id === instId);
    if (inst) {
      setSubjectHe(inst.subjectHe);
      setSubjectEn(inst.subjectEn);
      setTeacherSplit(inst.defaultSplit);
    }
  };

  // When facility changes, auto update age group
  const handleFacilityChange = (facId: string) => {
    setSelectedFacilityId(facId);
    const fac = facilities.find((f) => f.id === facId);
    if (fac) {
      setAgeGroupHe(fac.ageGroupHe);
      setAgeGroupEn(fac.ageGroupEn);
    }
  };

  // When specific date changes, compute corresponding day of week
  const handleDateChange = (dateVal: string) => {
    setSpecificDate(dateVal);
    if (dateVal) {
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        const dow = d.getDay();
        setDayOfWeek(dow);
      }
    }
  };

  // Toggle recurring weekday
  const toggleWeekday = (val: number) => {
    setRecurringWeekdays((prev) => {
      if (prev.includes(val)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((d) => d !== val);
      }
      return [...prev, val].sort((a, b) => a - b);
    });
    setDayOfWeek(val);
  };

  // Calculate session duration in minutes
  const calculateDuration = () => {
    try {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);
      const totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      return totalMinutes > 0 ? totalMinutes : 75;
    } catch {
      return 75;
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inst = instructors.find((i) => i.id === selectedInstructorId);
    const fac = facilities.find((f) => f.id === selectedFacilityId);

    if (!inst || !fac) return;

    // Derived day of week
    let calculatedDayOfWeek = dayOfWeek;
    if (scheduleType === 'specific_date' && specificDate) {
      const d = new Date(specificDate);
      if (!isNaN(d.getTime())) {
        calculatedDayOfWeek = d.getDay();
      }
    } else if (scheduleType === 'recurring_weekly' && recurringWeekdays.length > 0) {
      calculatedDayOfWeek = recurringWeekdays[0];
    }

    const savedPlacement: ClassPlacementAssignment = {
      id: placementToEdit ? placementToEdit.id : `asg-${Date.now()}`,
      facilityId: fac.id,
      facilityNameHe: fac.nameHe,
      facilityNameEn: fac.nameEn,
      cityHe: fac.cityHe,
      cityEn: fac.cityEn,
      addressHe: fac.addressHe,
      addressEn: fac.addressEn,
      instructorId: inst.id,
      instructorNameHe: inst.nameHe,
      instructorNameEn: inst.nameEn,
      instructorPhone: inst.phone,
      subjectHe: subjectHe.trim() || inst.subjectHe,
      subjectEn: subjectEn.trim() || inst.subjectEn,
      ageGroupHe: ageGroupHe.trim() || fac.ageGroupHe,
      ageGroupEn: ageGroupEn.trim() || fac.ageGroupEn,
      scheduleType,
      specificDate: scheduleType === 'specific_date' ? specificDate : undefined,
      dayOfWeek: calculatedDayOfWeek,
      recurringWeekdays: scheduleType === 'recurring_weekly' ? recurringWeekdays : undefined,
      startTime,
      endTime,
      ratePerClass,
      teacherSplit,
      status: 'active',
      contactPersonHe: fac.contactPersonHe,
      contactPersonEn: fac.contactPersonEn,
      contactPhone: fac.contactPhone,
    };

    onSave(savedPlacement);
  };

  const currentDuration = calculateDuration();
  const israeliDateDisplay = toIsraeliDateFormat(specificDate);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <CalendarClock className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {placementToEdit ? t.contractorView.editPlacement : t.contractorView.addPlacement}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'he'
                  ? 'שיבוץ מדריך למוסד, קביעת תאריך ספציפי או ימים שבועיים, ושעות שהות (שעון 24h)'
                  : 'Assign instructor with specific date or recurring weekdays and 24h attendance hours'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          
          {/* Instructor & Facility Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.selectInstructor} *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <select
                  required
                  value={selectedInstructorId}
                  onChange={(e) => handleInstructorChange(e.target.value)}
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {language === 'he' ? inst.nameHe : inst.nameEn} ({language === 'he' ? inst.subjectHe : inst.subjectEn})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.selectFacility} *
              </label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <select
                  required
                  value={selectedFacilityId}
                  onChange={(e) => handleFacilityChange(e.target.value)}
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  {facilities.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {language === 'he' ? fac.nameHe : fac.nameEn} ({language === 'he' ? fac.cityHe : fac.cityEn})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule Frequency Mode Segmented Control */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.contractorView.recurrenceMode}</span>
              </span>

              <span className="text-[11px] text-slate-500 font-mono">
                {t.contractorView.dateFormatNotice}
              </span>
            </div>

            {/* Toggle Mode: Weekly Recurring vs Specific Date */}
            <div className="grid grid-cols-2 gap-2 bg-slate-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setScheduleType('recurring_weekly')}
                className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  scheduleType === 'recurring_weekly'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Repeat className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.contractorView.recurringWeekly}</span>
              </button>

              <button
                type="button"
                onClick={() => setScheduleType('specific_date')}
                className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  scheduleType === 'specific_date'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.contractorView.specificDateSession}</span>
              </button>
            </div>

            {/* SUB-SECTION 1: SPECIFIC DATE */}
            {scheduleType === 'specific_date' && (
              <div className="p-3 rounded-xl bg-white border border-teal-200 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold text-xs">
                    {t.contractorView.selectSpecificDate} *
                  </label>
                  <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {israeliDateDisplay}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    required
                    value={specificDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>
                    {language === 'he' ? 'מועד השיעור נקבע ל:' : 'Session scheduled for:'}{' '}
                    <strong>
                      {daysList.find((d) => d.value === dayOfWeek)?.[language === 'he' ? 'labelHe' : 'labelEn']}, {israeliDateDisplay}
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {/* SUB-SECTION 2: RECURRING WEEKDAYS */}
            {scheduleType === 'recurring_weekly' && (
              <div className="space-y-2 animate-in fade-in duration-150">
                <label className="block text-slate-700 font-bold text-xs">
                  {t.contractorView.selectWeekdays} *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {daysList.map((d) => {
                    const isSelected = recurringWeekdays.includes(d.value);
                    return (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => toggleWeekday(d.value)}
                        className={`py-2 px-1.5 rounded-xl text-center font-bold text-xs transition-colors border ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div>{language === 'he' ? d.shortHe : d.shortEn}</div>
                        <div className="text-[10px] font-normal opacity-90 truncate">
                          {language === 'he' ? d.labelHe.replace('יום ', '') : d.labelEn.slice(0, 3)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Time Fields: 24h Israeli Clock (e.g. 14:00 - 15:30) */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.contractorView.timeSlot}</span>
              </span>
              <span className="text-[11px] font-mono text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {currentDuration} {language === 'he' ? 'דק׳ פעילות' : 'min duration'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {t.contractorView.startTime} (24h) *
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="10:00"
                    className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {language === 'he' ? 'למשל: 08:30, 10:00, 14:00' : 'e.g. 08:30, 10:00, 14:00'}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {t.contractorView.endTime} (24h) *
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="11:15"
                    className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {language === 'he' ? 'למשל: 11:15, 15:30' : 'e.g. 11:15, 15:30'}
                </div>
              </div>
            </div>

            <div className="p-2 bg-white rounded-lg border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
              <span>{t.contractorView.timeFormatNotice}</span>
              <strong className="font-mono text-teal-800 text-xs">{startTime} - {endTime}</strong>
            </div>
          </div>

          {/* Subject & Age Cohort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorSubject}
              </label>
              <input
                type="text"
                value={subjectHe}
                onChange={(e) => setSubjectHe(e.target.value)}
                placeholder="לדוגמה: מדענים צעירים וחקר"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityAgeGroup}
              </label>
              <input
                type="text"
                value={ageGroupHe}
                onChange={(e) => setAgeGroupHe(e.target.value)}
                placeholder="גילאי 3-4 (טרום חובה)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Municipal Class Rate & Teacher Share % */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'he' ? 'חישוב תעריף שיעור ופיצול שכר' : 'Rate & Split Calculation'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 text-[11px] font-semibold mb-1">
                  {t.contractorView.municipalFixedRate} (₪)
                </label>
                <input
                  type="number"
                  min="200"
                  max="800"
                  value={ratePerClass}
                  onChange={(e) => setRatePerClass(Number(e.target.value) || 350)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono font-bold bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-[11px] font-semibold mb-1">
                  {t.contractorView.teacherSplitPercentage} (%)
                </label>
                <input
                  type="number"
                  min="20"
                  max="90"
                  value={teacherSplit}
                  onChange={(e) => setTeacherSplit(Number(e.target.value) || 60)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono font-bold bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
              <span>
                {language === 'he' ? 'שכר מדריך לשיעור:' : 'Teacher / Class:'}{' '}
                <strong className="text-teal-700 font-mono">₪{(ratePerClass * (teacherSplit / 100)).toFixed(0)}</strong>
              </span>
              <span>
                {language === 'he' ? 'רווח קבלן לשיעור:' : 'Agency Profit / Class:'}{' '}
                <strong className="text-emerald-700 font-mono">₪{(ratePerClass * ((100 - teacherSplit) / 100)).toFixed(0)}</strong>
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium transition-colors"
            >
              {language === 'he' ? 'ביטול' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'he' ? 'שמור שיבוץ' : 'Save Placement'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
