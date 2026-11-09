import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Language,
  TeacherTab,
  ContractorTab,
  MunicipalityTab,
  ClassSession,
  GeoVerificationStatus,
  DailyLogPost,
  Student,
  EnrichmentClassEvent,
  ScheduleViewMode
} from '../types';
import { translations, TranslationSchema } from '../i18n/translations';
import { mockClasses, initialDailyLogs } from '../data/mockClasses';
import { mockScheduleEvents } from '../data/mockSchedule';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: 'rtl' | 'ltr';
  t: TranslationSchema;
  teacherTab: TeacherTab;
  setTeacherTab: (tab: TeacherTab) => void;
  contractorTab: ContractorTab;
  setContractorTab: (tab: ContractorTab) => void;
  municipalityTab: MunicipalityTab;
  setMunicipalityTab: (tab: MunicipalityTab) => void;
  isPhoneSimulated: boolean;
  setIsPhoneSimulated: (val: boolean) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Teacher Classroom State
  classesList: ClassSession[];
  selectedClassId: string;
  selectedClass: ClassSession;
  setSelectedClassId: (id: string) => void;
  updateStudentStatus: (studentId: string, status: 'present' | 'absent' | 'late') => void;
  cycleStudentStatus: (studentId: string) => void;
  markAllStudentsPresent: () => void;

  // Geolocation Geofence Check-In
  geoStatus: GeoVerificationStatus;
  distanceMeters: number;
  checkInTime: string | null;
  geoCoords: { lat: number; lng: number };
  performCheckIn: (forceInRange?: boolean) => void;
  performCheckOut: () => void;
  toggleGeoSimulation: (inRange: boolean) => void;

  // Session Timer
  sessionState: 'not_started' | 'active' | 'ended';
  sessionSeconds: number;
  startClassSession: () => void;
  endClassSession: () => void;
  resetClassSession: () => void;

  // Daily Logs & Feed
  dailyLogs: DailyLogPost[];
  addDailyLog: (post: Omit<DailyLogPost, 'id' | 'likes' | 'commentsCount'>) => void;
  likeDailyLog: (id: string) => void;

  // Itinerary & Teacher Schedule
  scheduleEvents: EnrichmentClassEvent[];
  scheduleViewMode: ScheduleViewMode;
  setScheduleViewMode: (mode: ScheduleViewMode) => void;
  selectedScheduleDate: string;
  setSelectedScheduleDate: (date: string) => void;
  toggleReminder: (eventId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('teacher');
  const [language, setLanguage] = useState<Language>('he');
  const [teacherTab, setTeacherTab] = useState<TeacherTab>('classes');
  const [contractorTab, setContractorTab] = useState<ContractorTab>('overview');
  const [municipalityTab, setMunicipalityTab] = useState<MunicipalityTab>('overview');
  const [isPhoneSimulated, setIsPhoneSimulated] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Class sessions & students
  const [classesList, setClassesList] = useState<ClassSession[]>(mockClasses);
  const [selectedClassId, setSelectedClassId] = useState<string>('class-shoshanim');

  // Geolocation state
  const [geoStatus, setGeoStatus] = useState<GeoVerificationStatus>('idle');
  const [distanceMeters, setDistanceMeters] = useState<number>(18);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number }>({
    lat: 32.0853,
    lng: 34.7818,
  });

  // Class Session Timer state
  const [sessionState, setSessionState] = useState<'not_started' | 'active' | 'ended'>('not_started');
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);

  // Daily Logs
  const [dailyLogs, setDailyLogs] = useState<DailyLogPost[]>(initialDailyLogs);

  // Itinerary & Teacher Schedule state
  const [scheduleEvents, setScheduleEvents] = useState<EnrichmentClassEvent[]>(mockScheduleEvents);
  const [scheduleViewMode, setScheduleViewMode] = useState<ScheduleViewMode>('daily');
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<string>('2026-11-09');

  const dir: 'rtl' | 'ltr' = language === 'he' ? 'rtl' : 'ltr';

  // Synchronize document direction and lang attribute
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  // Session timer tick
  useEffect(() => {
    let interval: any = null;
    if (sessionState === 'active') {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sessionState]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'he' ? 'en' : 'he'));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3400);
  };

  const selectedClass =
    classesList.find((c) => c.id === selectedClassId) || classesList[0];

  // Student roster manipulations
  const updateStudentStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setClassesList((prev) =>
      prev.map((c) => {
        if (c.id !== selectedClassId) return c;
        return {
          ...c,
          students: c.students.map((s) => (s.id === studentId ? { ...s, status } : s)),
        };
      })
    );
  };

  const cycleStudentStatus = (studentId: string) => {
    const current = selectedClass.students.find((s) => s.id === studentId);
    if (!current) return;
    const nextMap: Record<string, 'present' | 'absent' | 'late'> = {
      present: 'absent',
      absent: 'late',
      late: 'present',
    };
    const next = nextMap[current.status];
    updateStudentStatus(studentId, next);
    const childName = language === 'he' ? current.nameHe : current.nameEn;
    const statusText =
      next === 'present'
        ? language === 'he'
          ? 'נוכח/ת'
          : 'Present'
        : next === 'absent'
        ? language === 'he'
          ? 'נעדר/ת'
          : 'Absent'
        : language === 'he'
        ? 'איחור'
        : 'Late';
    showToast(`${childName}: ${statusText}`, 'info');
  };

  const markAllStudentsPresent = () => {
    setClassesList((prev) =>
      prev.map((c) => {
        if (c.id !== selectedClassId) return c;
        return {
          ...c,
          students: c.students.map((s) => ({ ...s, status: 'present' })),
        };
      })
    );
    showToast(
      language === 'he'
        ? `כל ${selectedClass.students.length} הילדים סומנו כנוכחים!`
        : `All ${selectedClass.students.length} children marked present!`,
      'success'
    );
  };

  // Geolocation Check-In
  const performCheckIn = (forceInRange = true) => {
    setGeoStatus('checking');
    showToast(
      language === 'he' ? 'דוגם נתוני GPS ומאמת מול שער המוסד...' : 'Capturing GPS signal & verifying geofence...',
      'info'
    );

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (forceInRange) {
        setGeoStatus('verified');
        setDistanceMeters(14);
        setCheckInTime(timeStr);
        setGeoCoords({
          lat: selectedClass.targetLat + (Math.random() - 0.5) * 0.0001,
          lng: selectedClass.targetLng + (Math.random() - 0.5) * 0.0001,
        });
        showToast(
          language === 'he'
            ? `נוכחות אומתה בהצלחה! מרחק משער הגן: 14 מטרים (${timeStr})`
            : `Verified at location! 14m from gate (${timeStr})`,
          'success'
        );
      } else {
        setGeoStatus('out_of_range');
        setDistanceMeters(1240);
        showToast(
          language === 'he'
            ? 'התראה: מיקומך נמצא 1.2 ק״מ מחוץ לשער הגן! הדיווח מסומן בחריגה.'
            : 'Alert: GPS indicates 1.2km outside the kindergarten geofence.',
          'warning'
        );
      }
    }, 900);
  };

  const performCheckOut = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setGeoStatus('idle');
    setCheckInTime(null);
    showToast(
      language === 'he'
        ? `צ׳ק-אאוט נרשם ב-${timeStr}. יום הפעילות נסגר והועבר לקבלן.`
        : `Check-Out recorded at ${timeStr}. Daily shift closed and reported to agency.`,
      'info'
    );
  };

  const toggleGeoSimulation = (inRange: boolean) => {
    performCheckIn(inRange);
  };

  // Session Timer Controls
  const startClassSession = () => {
    setSessionState('active');
    showToast(
      language === 'he'
        ? `שעון שיעור הופעל עבור ${selectedClass.nameHe}`
        : `Class session timer started for ${selectedClass.nameEn}`,
      'success'
    );
  };

  const endClassSession = () => {
    setSessionState('ended');
    const minutes = Math.floor(sessionSeconds / 60);
    const secs = sessionSeconds % 60;
    const durationStr = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    showToast(
      language === 'he'
        ? `השיעור הסתיים! משך הפעילות: ${durationStr} דקות. נרשם במערכת.`
        : `Class session ended! Duration: ${durationStr}. Registered in logs.`,
      'success'
    );
  };

  const resetClassSession = () => {
    setSessionState('not_started');
    setSessionSeconds(0);
    showToast(
      language === 'he' ? 'שעון הפעילות אופס' : 'Session timer reset',
      'info'
    );
  };

  // Daily Logs & Feed
  const addDailyLog = (postData: Omit<DailyLogPost, 'id' | 'likes' | 'commentsCount'>) => {
    const newLog: DailyLogPost = {
      ...postData,
      id: 'log-' + Date.now(),
      likes: 0,
      commentsCount: 0,
    };
    setDailyLogs((prev) => [newLog, ...prev]);
    showToast(
      language === 'he'
        ? 'העדכון פורסם בהצלחה בלוח העדכונים ובקבוצת ההורים!'
        : 'Daily update published to feed and parent channel!',
      'success'
    );
  };

  const likeDailyLog = (id: string) => {
    setDailyLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, likes: log.likes + 1 } : log))
    );
  };

  // Schedule Reminders
  const toggleReminder = (eventId: string) => {
    setScheduleEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const nextState = !ev.reminderActive;
        const kName = language === 'he' ? ev.kindergartenNameHe : ev.kindergartenNameEn;
        showToast(
          nextState
            ? `${t.itinerary.reminderSetToast} • ${kName} (${ev.startTime})`
            : `${t.itinerary.reminderCanceledToast} • ${kName}`,
          nextState ? 'success' : 'info'
        );
        return { ...ev, reminderActive: nextState };
      })
    );
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        toggleLanguage,
        dir,
        t,
        teacherTab,
        setTeacherTab,
        contractorTab,
        setContractorTab,
        municipalityTab,
        setMunicipalityTab,
        isPhoneSimulated,
        setIsPhoneSimulated,
        toasts,
        showToast,

        // Teacher Classroom State
        classesList,
        selectedClassId,
        selectedClass,
        setSelectedClassId,
        updateStudentStatus,
        cycleStudentStatus,
        markAllStudentsPresent,

        // Geolocation
        geoStatus,
        distanceMeters,
        checkInTime,
        geoCoords,
        performCheckIn,
        performCheckOut,
        toggleGeoSimulation,

        // Session Timer
        sessionState,
        sessionSeconds,
        startClassSession,
        endClassSession,
        resetClassSession,

        // Daily Logs & Feed
        dailyLogs,
        addDailyLog,
        likeDailyLog,

        // Itinerary & Teacher Schedule
        scheduleEvents,
        scheduleViewMode,
        setScheduleViewMode,
        selectedScheduleDate,
        setSelectedScheduleDate,
        toggleReminder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
