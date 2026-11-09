import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassSwitcherBar } from './ClassSwitcherBar';
import { GeoCheckInCard } from './GeoCheckInCard';
import { ClassSessionTimerCard } from './ClassSessionTimerCard';
import { StudentRosterChecklist } from './StudentRosterChecklist';
import { DailyLogModal } from './DailyLogModal';
import {
  Sparkles,
  ClipboardCheck,
  PlusCircle,
  AlertTriangle,
  UserPlus,
  MapPin,
  Bell,
  Clock,
  Calendar,
  MessageSquare,
  Navigation,
  Car,
  BellRing,
  ExternalLink,
  Route
} from 'lucide-react';

export const TeacherHomeTab: React.FC = () => {
  const {
    t,
    language,
    selectedClass,
    showToast,
    setTeacherTab,
    scheduleEvents,
    toggleReminder,
    setScheduleViewMode,
    setSelectedScheduleDate,
  } = useApp();
  const [isDailyLogOpen, setIsDailyLogOpen] = useState(false);

  const todayEvents = scheduleEvents.filter((e) => e.dateStr === '2026-11-09');

  const presentCount = selectedClass.students.filter((s) => s.status === 'present').length;
  const totalCount = selectedClass.students.length;

  const quickActions = [
    {
      id: 'attendance',
      label: t.actions.takeAttendance,
      icon: ClipboardCheck,
      color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
      action: () => {
        const el = document.getElementById('roster-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        showToast(language === 'he' ? 'גלול ליומן הנוכחות' : 'Scrolled to attendance checklist', 'info');
      },
    },
    {
      id: 'log',
      label: t.actions.logDailyActivity,
      icon: PlusCircle,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      action: () => setIsDailyLogOpen(true),
    },
    {
      id: 'incident',
      label: t.actions.reportIncident,
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
      action: () =>
        showToast(
          language === 'he'
            ? 'טופס דיווח חריג נשלח למפקח ולחמ״ל הקבלן'
            : 'Incident report filed with supervisor & contractor',
          'warning'
        ),
    },
    {
      id: 'substitute',
      label: t.actions.requestSubstitute,
      icon: UserPlus,
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      action: () =>
        showToast(
          language === 'he'
            ? 'בקשת ממלא/ת מקום נשלחה לחמ״ל אורנים'
            : 'Substitute request dispatched to operations center',
          'info'
        ),
    },
  ];

  return (
    <div className="space-y-4 pb-4">
      
      {/* 1. Teacher Welcome & Active Class Summary Card */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-teal-100 text-[11px] font-medium backdrop-blur-xs mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{t.roles.teacher.badge}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              {t.teacherView.welcomeTitle}
            </h2>
            <p className="text-teal-100 text-xs mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>
                {language === 'he' ? selectedClass.nameHe : selectedClass.nameEn} • {language === 'he' ? selectedClass.roomHe : selectedClass.roomEn}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => showToast(language === 'he' ? 'אין התראות דחופות למשמרת זו' : 'No urgent alerts for this shift', 'info')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="Alerts"
          >
            <Bell className="w-5 h-5 text-teal-100" />
          </button>
        </div>

        {/* Live Attendance Metric Row */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-[11px] text-teal-200 block">
              {t.actions.present}
            </span>
            <div className="text-lg font-bold tabular-nums">
              {presentCount} / {totalCount}
            </div>
            <span className="text-[10px] text-teal-200/90 block">
              {Math.round((presentCount / (totalCount || 1)) * 100)}% {language === 'he' ? 'נוכחות כיתתית' : 'attendance'}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5">
            <span className="text-[11px] text-teal-200 block">
              {t.teacherModules.assignedTime}
            </span>
            <div className="text-sm font-bold font-mono truncate">
              {selectedClass.timeSlot}
            </div>
            <span className="text-[10px] text-teal-200/90 block">
              {language === 'he' ? selectedClass.ageGroupHe : selectedClass.ageGroupEn}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Today's Classes Switcher */}
      <ClassSwitcherBar />

      {/* 3. Geolocation Geofence Check-In & Verification */}
      <GeoCheckInCard />

      {/* 4. Class Session Timer (Start / End Class & Elapsed Time) */}
      <ClassSessionTimerCard />

      {/* 5. Field Quick Action Grid */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
          {t.teacherView.quickActionsHeader}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={action.action}
                className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition-all active:scale-[0.98] text-start min-h-[72px] ${action.color}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-xs font-bold leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Student Attendance Checklist */}
      <div id="roster-section">
        <StudentRosterChecklist />
      </div>

      {/* 7. Today's Enrichment Itinerary & Transit Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Route className="w-4 h-4 text-teal-600" />
              <span>{t.itinerary.todayItineraryHeader}</span>
            </h3>
            <span className="text-[11px] text-slate-500">
              {todayEvents.length} {language === 'he' ? 'שיעורים ב-3 ערים שונות היום' : 'classes across 3 cities today'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setScheduleViewMode('daily');
              setTeacherTab('schedule');
            }}
            className="text-xs text-teal-700 hover:text-teal-900 font-semibold"
          >
            {language === 'he' ? 'לוח שבועי וחודשי' : 'Weekly & Monthly'} →
          </button>
        </div>

        <div className="space-y-3">
          {todayEvents.map((event, idx) => {
            const kName = language === 'he' ? event.kindergartenNameHe : event.kindergartenNameEn;
            const city = language === 'he' ? event.cityHe : event.cityEn;
            const address = language === 'he' ? event.addressHe : event.addressEn;
            const subject = language === 'he' ? event.subjectHe : event.subjectEn;
            const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
              (language === 'he' ? event.kindergartenNameHe : event.kindergartenNameEn) +
                ', ' +
                (language === 'he' ? event.addressHe : event.addressEn)
            )}&navigate=yes`;

            return (
              <React.Fragment key={event.id}>
                {idx > 0 && event.transitMinutesFromPrev && (
                  <div className="py-1 flex items-center justify-center">
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 font-medium">
                      <Car className="w-3 h-3 text-teal-600" />
                      <span>
                        ~{event.transitMinutesFromPrev} {t.itinerary.estimatedDrive} ({event.transitKmFromPrev} {t.itinerary.estimatedDistance})
                      </span>
                    </span>
                  </div>
                )}

                <div
                  className={`p-3 rounded-xl border transition-all ${
                    event.status === 'current'
                      ? 'border-amber-300 bg-amber-50/40 ring-1 ring-amber-200'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-900">
                        {event.startTime} - {event.endTime}
                      </span>
                      <span className="text-[10px] font-semibold text-teal-800 bg-white px-2 py-0.2 rounded border border-slate-200">
                        {city}
                      </span>
                      {event.status === 'current' && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                          {t.itinerary.statusCurrent}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleReminder(event.id)}
                      className={`text-[11px] p-1 rounded-md transition-colors ${
                        event.reminderActive
                          ? 'text-amber-700 bg-amber-100'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={event.reminderActive ? t.itinerary.reminderActive : t.itinerary.setReminder}
                    >
                      {event.reminderActive ? (
                        <BellRing className="w-3.5 h-3.5 fill-amber-500" />
                      ) : (
                        <Bell className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{kName}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[210px] sm:max-w-xs">{address}</div>
                    </div>

                    {/* Waze Action Link */}
                    <a
                      href={wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        showToast(
                          language === 'he'
                            ? `פותח ניווט Waze ל-${kName} 🚗`
                            : `Opening Waze navigation to ${kName} 🚗`,
                          'success'
                        );
                      }}
                      className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-[10px] flex items-center gap-1 transition-colors shrink-0 shadow-2xs"
                    >
                      <Navigation className="w-3 h-3 fill-white" />
                      <span>Waze</span>
                    </a>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Daily Log Modal */}
      <DailyLogModal
        isOpen={isDailyLogOpen}
        onClose={() => setIsDailyLogOpen(false)}
      />

    </div>
  );
};
