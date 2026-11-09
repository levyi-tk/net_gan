import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EnrichmentClassEvent, ScheduleViewMode } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Navigation,
  Bell,
  BellRing,
  Phone,
  Car,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  PackageCheck,
  Building,
  Route
} from 'lucide-react';

export const TeacherScheduleTab: React.FC = () => {
  const {
    t,
    language,
    scheduleEvents,
    scheduleViewMode,
    setScheduleViewMode,
    selectedScheduleDate,
    setSelectedScheduleDate,
    toggleReminder,
    showToast,
  } = useApp();

  // Days in current week (Sun-Fri)
  const currentWeekDays = [
    { dateStr: '2026-11-08', dayNameHe: 'א׳', dayNameEn: 'Sun', labelHe: 'ראשון', labelEn: 'Sunday' },
    { dateStr: '2026-11-09', dayNameHe: 'ב׳', dayNameEn: 'Mon', labelHe: 'שני (היום)', labelEn: 'Monday (Today)', isToday: true },
    { dateStr: '2026-11-10', dayNameHe: 'ג׳', dayNameEn: 'Tue', labelHe: 'שלישי', labelEn: 'Tuesday' },
    { dateStr: '2026-11-11', dayNameHe: 'ד׳', dayNameEn: 'Wed', labelHe: 'רביעי', labelEn: 'Wednesday' },
    { dateStr: '2026-11-12', dayNameHe: 'ה׳', dayNameEn: 'Thu', labelHe: 'חמישי', labelEn: 'Thursday' },
    { dateStr: '2026-11-13', dayNameHe: 'ו׳', dayNameEn: 'Fri', labelHe: 'שישי', labelEn: 'Friday' },
  ];

  // Filter events for the selected date
  const eventsForSelectedDate = scheduleEvents.filter(
    (ev) => ev.dateStr === selectedScheduleDate
  );

  // Calculate daily transit summary
  const dailyTotalTransitMin = eventsForSelectedDate.reduce(
    (acc, curr) => acc + (curr.transitMinutesFromPrev || 0),
    0
  );
  const dailyTotalTransitKm = eventsForSelectedDate.reduce(
    (acc, curr) => acc + (curr.transitKmFromPrev || 0),
    0
  );

  // Waze link generator
  const getWazeUrl = (event: EnrichmentClassEvent) => {
    const query = `${language === 'he' ? event.kindergartenNameHe : event.kindergartenNameEn}, ${
      language === 'he' ? event.addressHe : event.addressEn
    }`;
    return `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;
  };

  const handleOpenWaze = (event: EnrichmentClassEvent, e: React.MouseEvent) => {
    const kName = language === 'he' ? event.kindergartenNameHe : event.kindergartenNameEn;
    const address = language === 'he' ? event.addressHe : event.addressEn;
    showToast(
      language === 'he'
        ? `פותח ניווט Waze ל-${kName} (${address}) 🚗`
        : `Opening Waze navigation to ${kName} (${address}) 🚗`,
      'success'
    );
  };

  return (
    <div className="space-y-4 pb-4">
      
      {/* 1. Header & View Mode Switcher (Daily / Weekly / Monthly) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {t.itinerary.todayItineraryHeader}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.itinerary.todaySubtitle}
            </p>
          </div>

          {/* View Mode Segmented Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
            {(['daily', 'weekly', 'monthly'] as ScheduleViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setScheduleViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[34px] ${
                  scheduleViewMode === mode
                    ? 'bg-white text-teal-800 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode === 'daily'
                  ? t.itinerary.dailyView
                  : mode === 'weekly'
                  ? t.itinerary.weeklyView
                  : t.itinerary.monthlyView}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            VIEW MODE 1: DAILY VIEW (יומי)
           ======================================================== */}
        {scheduleViewMode === 'daily' && (
          <div className="space-y-4">
            
            {/* Horizontal Day Selector */}
            <div className="grid grid-cols-6 gap-1.5 p-1 bg-slate-100/80 rounded-xl">
              {currentWeekDays.map((day) => {
                const isSelected = selectedScheduleDate === day.dateStr;
                const countForDay = scheduleEvents.filter((e) => e.dateStr === day.dateStr).length;
                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    onClick={() => setSelectedScheduleDate(day.dateStr)}
                    className={`py-2 px-1 rounded-lg text-center transition-all flex flex-col items-center justify-center min-h-[54px] ${
                      isSelected
                        ? 'bg-teal-700 text-white shadow-xs font-bold'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/60'
                    }`}
                  >
                    <span className="text-xs font-bold">
                      {language === 'he' ? day.dayNameHe : day.dayNameEn}
                    </span>
                    <span
                      className={`text-[10px] font-mono mt-0.5 ${
                        isSelected ? 'text-teal-100' : 'text-slate-400'
                      }`}
                    >
                      {day.dateStr.slice(8, 10)}/11
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 rounded-full mt-0.5 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : countForDay > 0
                          ? 'bg-teal-50 text-teal-800 border border-teal-200'
                          : 'text-slate-300'
                      }`}
                    >
                      {countForDay > 0 ? `${countForDay}` : '—'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Daily Itinerary Summary Strip */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">
                  {eventsForSelectedDate.length} {language === 'he' ? 'שיעורים במוסדות שונים' : 'classes scheduled'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Building className="w-3.5 h-3.5 text-teal-600" />
                  <span>
                    {Array.from(new Set(eventsForSelectedDate.map((e) => e.cityHe))).length} {language === 'he' ? 'ערים במסלול' : 'cities'}
                  </span>
                </span>
              </div>

              {dailyTotalTransitMin > 0 && (
                <div className="flex items-center gap-1 text-teal-800 font-medium bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  <Car className="w-3.5 h-3.5 text-teal-600" />
                  <span>
                    {language === 'he' ? 'זמן נסיעה כולל:' : 'Total drive:'} ~{dailyTotalTransitMin} {t.itinerary.estimatedDrive} ({dailyTotalTransitKm.toFixed(1)} {t.itinerary.estimatedDistance})
                  </span>
                </div>
              )}
            </div>

            {/* Itinerary Timeline */}
            {eventsForSelectedDate.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-medium text-slate-600">{t.itinerary.noClassesOnDate}</p>
                <p className="text-[11px] text-slate-400 mt-1">{t.itinerary.selectDatePrompt}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {eventsForSelectedDate.map((event, idx) => {
                  const kName = language === 'he' ? event.kindergartenNameHe : event.kindergartenNameEn;
                  const city = language === 'he' ? event.cityHe : event.cityEn;
                  const address = language === 'he' ? event.addressHe : event.addressEn;
                  const subject = language === 'he' ? event.subjectHe : event.subjectEn;
                  const ageGroup = language === 'he' ? event.ageGroupHe : event.ageGroupEn;
                  const contactName = language === 'he' ? event.contactNameHe : event.contactNameEn;
                  const equipment = language === 'he' ? event.equipmentHe : event.equipmentEn;

                  return (
                    <React.Fragment key={event.id}>
                      {/* Transit Buffer between consecutive classes in different locations */}
                      {idx > 0 && event.transitMinutesFromPrev && (
                        <div className="relative py-1 flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-dashed border-slate-200" />
                          </div>
                          <div className="relative bg-white px-3 py-1 rounded-full border border-slate-200 text-[11px] text-slate-600 flex items-center gap-1.5 shadow-2xs font-medium">
                            <Car className="w-3.5 h-3.5 text-teal-600" />
                            <span>
                              {t.itinerary.transitBuffer}: <strong className="text-slate-900 font-mono">{event.transitMinutesFromPrev} {t.itinerary.estimatedDrive}</strong> ({event.transitKmFromPrev} {t.itinerary.estimatedDistance})
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Class Itinerary Card */}
                      <div
                        className={`p-4 rounded-2xl border transition-all ${
                          event.status === 'current'
                            ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-200/50 shadow-xs'
                            : event.status === 'completed'
                            ? 'bg-slate-50/80 border-slate-200 opacity-80'
                            : 'bg-white border-slate-200 hover:shadow-xs'
                        }`}
                      >
                        {/* Top Time, Status & Reminders */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-slate-900 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-teal-600" />
                              <span>{event.startTime} - {event.endTime}</span>
                            </span>

                            {event.status === 'current' && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                <span>{t.itinerary.statusCurrent}</span>
                              </span>
                            )}
                            {event.status === 'completed' && (
                              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                                ✓ {t.itinerary.statusCompleted}
                              </span>
                            )}
                          </div>

                          {/* Reminder Toggle Button */}
                          <button
                            type="button"
                            onClick={() => toggleReminder(event.id)}
                            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all min-h-[32px] ${
                              event.reminderActive
                                ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold shadow-2xs'
                                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                            }`}
                            title={event.reminderActive ? t.itinerary.reminderActive : t.itinerary.setReminder}
                          >
                            {event.reminderActive ? (
                              <BellRing className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                            ) : (
                              <Bell className="w-3.5 h-3.5 text-slate-400" />
                            )}
                            <span className="text-[11px]">
                              {event.reminderActive ? t.itinerary.reminderActive : t.itinerary.setReminder}
                            </span>
                          </button>
                        </div>

                        {/* Kindergarten Name & City Lockup */}
                        <div className="mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900">
                              {kName}
                            </h3>
                            <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                              {city}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-teal-700 mt-0.5">
                            {subject}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {ageGroup}
                          </div>
                        </div>

                        {/* Address & Direct Waze Link */}
                        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70 mb-3 text-xs space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-1 text-slate-600">
                              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                              <span className="font-medium">{address}</span>
                            </div>

                            {/* Waze Action Link */}
                            <a
                              href={getWazeUrl(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => handleOpenWaze(event, e)}
                              className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-2xs shrink-0 whitespace-nowrap min-h-[34px]"
                            >
                              <Navigation className="w-3.5 h-3.5 fill-white" />
                              <span>{t.itinerary.navigateWaze}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                            </a>
                          </div>

                          {/* Contact Person & Direct Phone Call */}
                          <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/50 text-[11px]">
                            <span className="text-slate-500 flex items-center gap-1">
                              <span>{t.itinerary.contactLead}:</span>
                              <strong className="text-slate-800">{contactName}</strong>
                            </span>
                            <a
                              href={`tel:${event.contactPhone}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(
                                  `${language === 'he' ? 'חיוג ל-' : 'Calling '}${contactName} (${event.contactPhone})`,
                                  'info'
                                );
                              }}
                              className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 font-mono hover:underline"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{event.contactPhone}</span>
                            </a>
                          </div>
                        </div>

                        {/* Equipment & Kit tags */}
                        {equipment && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                            <PackageCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span className="text-slate-400">{t.itinerary.requiredEquipment}:</span>
                            <span className="text-slate-700 font-medium truncate">{equipment}</span>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            VIEW MODE 2: WEEKLY VIEW (שבועי)
           ======================================================== */}
        {scheduleViewMode === 'weekly' && (
          <div className="space-y-4">
            
            {/* Weekly Header Banner */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
              <span className="font-bold text-slate-900">
                {language === 'he' ? 'לוח שבועי מרוכז: 8 עד 13 בנובמבר 2026' : 'Weekly Overview: Nov 8 – Nov 13, 2026'}
              </span>
              <span className="text-teal-800 font-semibold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                13 {language === 'he' ? 'שיעורים • 5 ערים שונות' : 'classes across 5 cities'}
              </span>
            </div>

            {/* Days Accordion / Card Column */}
            <div className="space-y-3">
              {currentWeekDays.map((day) => {
                const dayEvents = scheduleEvents.filter((e) => e.dateStr === day.dateStr);
                return (
                  <div
                    key={day.dateStr}
                    className={`rounded-2xl border p-3.5 transition-all ${
                      day.isToday
                        ? 'border-teal-300 bg-teal-50/30 ring-1 ring-teal-200 shadow-2xs'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {/* Day Title Bar */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                          {language === 'he' ? day.dayNameHe : day.dayNameEn}
                        </span>
                        <div>
                          <span className="font-bold text-xs text-slate-900">
                            {language === 'he' ? day.labelHe : day.labelEn}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono ms-2">
                            {day.dateStr.slice(8, 10)}/11/2026
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {dayEvents.length} {language === 'he' ? 'שיעורים' : 'classes'}
                      </span>
                    </div>

                    {/* Classes for this day */}
                    {dayEvents.length === 0 ? (
                      <div className="text-[11px] text-slate-400 py-1 text-center">
                        {language === 'he' ? 'אין שיעורים ביום זה' : 'No classes scheduled'}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {dayEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between gap-2"
                          >
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-mono font-bold text-teal-800">
                                  {ev.startTime} - {ev.endTime}
                                </span>
                                <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                                  {language === 'he' ? ev.cityHe : ev.cityEn}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {language === 'he' ? ev.kindergartenNameHe : ev.kindergartenNameEn}
                              </h4>
                              <p className="text-[11px] text-slate-500 truncate">
                                {language === 'he' ? ev.subjectHe : ev.subjectEn}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                              <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                                {language === 'he' ? ev.addressHe : ev.addressEn}
                              </span>

                              {/* Waze icon button */}
                              <a
                                href={getWazeUrl(ev)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => handleOpenWaze(ev, e)}
                                className="px-2 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-bold flex items-center gap-1 shrink-0"
                              >
                                <Navigation className="w-3 h-3 fill-sky-600 text-sky-600" />
                                <span>Waze</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE 3: MONTHLY VIEW (חודשי)
           ======================================================== */}
        {scheduleViewMode === 'monthly' && (
          <div className="space-y-4">
            
            {/* Monthly KPI Overview Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">
                  {t.itinerary.totalClassesMonth}
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                  48
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">
                  {t.itinerary.distinctKindergartens}
                </div>
                <div className="text-xl font-bold font-mono text-teal-800 mt-0.5 tabular-nums">
                  12
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">
                  {t.itinerary.teachingHours}
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                  56.5
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">
                  {t.itinerary.citiesCovered}
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
                  5
                </div>
              </div>
            </div>

            {/* Interactive Month Calendar Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {language === 'he' ? 'נובמבר 2026 • חשוון - כסלו תשפ״ז' : 'November 2026'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {language === 'he' ? 'הקש על יום להצגת המסלול' : 'Tap date to preview route'}
                </span>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100">
                <span>{language === 'he' ? 'א׳' : 'Sun'}</span>
                <span>{language === 'he' ? 'ב׳' : 'Mon'}</span>
                <span>{language === 'he' ? 'ג׳' : 'Tue'}</span>
                <span>{language === 'he' ? 'ד׳' : 'Wed'}</span>
                <span>{language === 'he' ? 'ה׳' : 'Thu'}</span>
                <span>{language === 'he' ? 'ו׳' : 'Fri'}</span>
                <span className="text-slate-400">{language === 'he' ? 'ש׳' : 'Sat'}</span>
              </div>

              {/* 30 Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-1 pt-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateStr = `2026-11-${dayNum < 10 ? '0' : ''}${dayNum}`;
                  const isSelected = selectedScheduleDate === dateStr;
                  const isCurrentDay = dayNum === 9; // Today is Nov 9
                  const hasClasses = scheduleEvents.some((e) => e.dateStr === dateStr);
                  const isSaturday = (dayNum + 6) % 7 === 6;

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      disabled={isSaturday}
                      onClick={() => {
                        setSelectedScheduleDate(dateStr);
                        setScheduleViewMode('daily');
                        showToast(
                          `${language === 'he' ? 'נבחר תאריך' : 'Selected date'}: ${dayNum}/11/2026`,
                          'info'
                        );
                      }}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center transition-all relative ${
                        isSaturday
                          ? 'opacity-30 bg-slate-50 text-slate-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-teal-700 text-white font-bold shadow-xs'
                          : isCurrentDay
                          ? 'border border-teal-500 bg-teal-50/60 font-bold text-teal-900'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-mono tabular-nums leading-none">
                        {dayNum}
                      </span>
                      {hasClasses && (
                        <div className="flex gap-0.5 mt-1">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-amber-300' : 'bg-teal-500'
                            }`}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Preview Strip */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-600">
                {t.itinerary.classesScheduledOnDate}: <strong className="text-slate-900 font-mono">{selectedScheduleDate}</strong>
              </span>
              <button
                type="button"
                onClick={() => setScheduleViewMode('daily')}
                className="text-teal-700 hover:text-teal-900 font-bold hover:underline flex items-center gap-1"
              >
                <span>{language === 'he' ? 'פתח מסלול יומי מלא' : 'Open full day route'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${language === 'he' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
