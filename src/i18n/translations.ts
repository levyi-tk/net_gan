export interface TranslationSchema {
  // Brand & Shell
  appTitle: string;
  appSubtitle: string;
  prototypeNotice: string;
  roleSwitcherTitle: string;
  switchRoleNotice: string;

  // Roles
  roles: {
    teacher: {
      name: string;
      title: string;
      desc: string;
      badge: string;
    };
    contractor: {
      name: string;
      title: string;
      desc: string;
      badge: string;
    };
    municipality: {
      name: string;
      title: string;
      desc: string;
      badge: string;
    };
  };

  // Navigations
  nav: {
    // Teacher
    homeClasses: string;
    schedule: string;
    dailyFeed: string;
    profile: string;
    // Contractor
    overview: string;
    staffManagement: string;
    kindergartens: string;
    operationsShifts: string;
    reportsInvoicing: string;
    settings: string;
    // Municipality
    municipalOverview: string;
    supervisionQuality: string;
    attendanceCapacity: string;
    contractorSLAs: string;
    incidentsAlerts: string;
    exportAudits: string;
  };

  // Actions & Common
  actions: {
    languageToggle: string;
    activeMode: string;
    viewDetails: string;
    exportReport: string;
    quickAction: string;
    refreshData: string;
    takeAttendance: string;
    logDailyActivity: string;
    reportIncident: string;
    requestSubstitute: string;
    assignStaff: string;
    contactSupervisor: string;
    searchPlaceholder: string;
    filterAll: string;
    statusActive: string;
    statusPending: string;
    statusAttention: string;
    present: string;
    absent: string;
    late: string;
    toggleMobileView: string;
    fullDesktopView: string;
    mobileSimulatedView: string;
  };

  // Teacher Specific Modules
  teacherModules: {
    todaysClasses: string;
    switchClass: string;
    assignedTime: string;
    ageGroup: string;
    address: string;
    geoVerification: string;
    checkIn: string;
    checkOut: string;
    verifiedAtLocation: string;
    outOfRange: string;
    checkingLocation: string;
    distanceToGate: string;
    simInRange: string;
    simOutOfRange: string;
    lastVerified: string;
    gpsCoordinates: string;
    gpsPromptHint: string;
    
    // Session Timer
    sessionTimer: string;
    startClass: string;
    endClass: string;
    activeSession: string;
    elapsedTime: string;
    sessionPaused: string;
    sessionEndedSummary: string;
    completedDuration: string;
    resetTimer: string;
    loggedToContractor: string;

    // Roster
    quickAttendanceChecklist: string;
    attendanceSubtitle: string;
    markAllPresent: string;
    searchStudent: string;
    allergyAlert: string;
    guardianContact: string;
    callParent: string;
    totalPresent: string;

    // Daily Log Form
    createDailyLog: string;
    activityTitle: string;
    activityNotes: string;
    category: string;
    photoAttachment: string;
    selectPresetPhoto: string;
    mealNotes: string;
    napNotes: string;
    publishLog: string;
    cancel: string;
    logSuccess: string;
    presetPhotos: {
      painting: string;
      buildingBlocks: string;
      readingCircle: string;
      outdoorPlay: string;
    };
  };

  itinerary: {
    dailyView: string;
    weeklyView: string;
    monthlyView: string;
    todayItineraryHeader: string;
    todaySubtitle: string;
    navigateWaze: string;
    wazeDisclaimer: string;
    setReminder: string;
    reminderActive: string;
    reminderSetToast: string;
    reminderCanceledToast: string;
    transitBuffer: string;
    estimatedDrive: string;
    estimatedDistance: string;
    contactLead: string;
    callLead: string;
    requiredEquipment: string;
    monthlyOverview: string;
    totalClassesMonth: string;
    distinctKindergartens: string;
    teachingHours: string;
    citiesCovered: string;
    selectDatePrompt: string;
    noClassesOnDate: string;
    classesScheduledOnDate: string;
    statusCompleted: string;
    statusCurrent: string;
    statusUpcoming: string;
    allDays: {
      sun: string;
      mon: string;
      tue: string;
      wed: string;
      thu: string;
      fri: string;
    };
  };

  // Views Content
  teacherView: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    activeKindergarten: string;
    kindergartenLocation: string;
    attendanceRate: string;
    attendanceCount: string;
    enrolledTotal: string;
    onDutyStaff: string;
    nextActivity: string;
    nextActivityTime: string;
    dailyUpdatesCount: string;
    todayScheduleHeader: string;
    quickActionsHeader: string;
    recentUpdatesHeader: string;
    morningRoutine: string;
    breakfastRoutine: string;
    musicEnrichment: string;
    yardPlay: string;
    lunchAndRest: string;
    departureAndPickup: string;
  };

    contractorView: {
      welcomeTitle: string;
      welcomeSubtitle: string;
      agencyName: string;
      activeInstructors: string;
      activeInstructorsSub: string;
      managedPreschools: string;
      managedPreschoolsSub: string;
      coverageRate: string;
      coverageRateSub: string;
      openSubstituteRequests: string;
      openSubstituteRequestsSub: string;
      quickOverviewHeader: string;
      deploymentStatusHeader: string;
      urgentNoticeTitle: string;
      urgentNoticeDesc: string;
      dispatchAction: string;

      // Active Classes & Overview Grid
      activeClassesTitle: string;
      activeClassesSubtitle: string;
      filterAllClasses: string;
      filterLiveNow: string;
      filterUpcoming: string;
      filterCompleted: string;
      filterAnomalies: string;
      sessionActiveNow: string;
      sessionCompleted: string;
      sessionUpcoming: string;
      verifiedAtLocation: string;
      outOfRange: string;
      pendingCheckIn: string;
      distanceMeters: string;
      timerRunning: string;
      studentsAttending: string;
      callTeacher: string;
      callKindergarten: string;
      viewDetails: string;
      noClassesFound: string;

      // Financial Split Manager
      financialManagerTitle: string;
      financialManagerSubtitle: string;
      municipalFixedRate: string;
      municipalRatePerClass: string;
      teacherSplitPercentage: string;
      teacherShare: string;
      contractorShare: string;
      teacherPayout: string;
      contractorGrossMargin: string;
      verifiedClasses: string;
      totalBilledMunicipality: string;
      totalTeacherPayroll: string;
      totalContractorProfit: string;
      profitMarginRate: string;
      editSplit: string;
      resetToDefault: string;
      approvedForPayroll: string;
      pendingApproval: string;
      approvePayroll: string;
      payrollApprovedToast: string;
      splitUpdatedToast: string;
      exportPayrollCsv: string;
      rateDisclaimer: string;

      // Operational Alerts
      operationalAlertsTitle: string;
      operationalAlertsSubtitle: string;
      alertTypeLateCheckin: string;
      alertTypeMissingLog: string;
      alertTypeGpsAnomaly: string;
      alertSeverityUrgent: string;
      alertSeverityWarning: string;
      alertAcknowledge: string;
      alertResolve: string;
      alertResolvedToast: string;
      allAlertsResolved: string;
      activeAlertsCount: string;
      dispatchStandby: string;

      // Instructor CRUD
      instructorsTitle: string;
      instructorsSubtitle: string;
      addInstructor: string;
      editInstructor: string;
      deleteInstructor: string;
      deleteInstructorConfirm: string;
      instructorSavedToast: string;
      instructorDeletedToast: string;
      instructorNameHe: string;
      instructorNameEn: string;
      instructorRole: string;
      instructorSubject: string;
      instructorPhone: string;
      instructorEmail: string;
      instructorZone: string;
      instructorStatus: string;
      instructorSeniority: string;
      instructorDefaultSplit: string;
      assignedFacilities: string;
      noInstructorsFound: string;

      // Facility CRUD
      facilitiesTitle: string;
      facilitiesSubtitle: string;
      addFacility: string;
      editFacility: string;
      deleteFacility: string;
      deleteFacilityConfirm: string;
      facilitySavedToast: string;
      facilityDeletedToast: string;
      facilityNameHe: string;
      facilityNameEn: string;
      facilityCity: string;
      facilityAddressHe: string;
      facilityAddressEn: string;
      facilityContactPerson: string;
      facilityContactPhone: string;
      facilityContactEmail: string;
      facilityAgeGroup: string;
      facilityTotalStudents: string;
      facilityGeofenceRadius: string;
      facilityNotes: string;
      assignedInstructors: string;
      noFacilitiesFound: string;

      // Assignments / Placements
      placementsTitle: string;
      placementsSubtitle: string;
      addPlacement: string;
      editPlacement: string;
      deletePlacement: string;
      deletePlacementConfirm: string;
      placementSavedToast: string;
      placementDeletedToast: string;
      selectInstructor: string;
      selectFacility: string;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      timeSlot: string;
      noPlacementsFound: string;
      filterDayAll: string;
      recurrenceMode: string;
      recurringWeekly: string;
      specificDateSession: string;
      selectSpecificDate: string;
      selectWeekdays: string;
      timeFormatNotice: string;
      dateFormatNotice: string;
      singleSessionBadge: string;
      recurringBadge: string;
    };

  municipalityView: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    deptName: string;
    totalEnrolled: string;
    totalEnrolledSub: string;
    contractorScore: string;
    contractorScoreSub: string;
    districtAttendance: string;
    districtAttendanceSub: string;
    safetyCompliance: string;
    safetyComplianceSub: string;
    cityMapHeader: string;
    contractorOverviewHeader: string;
    qualityIndicatorsHeader: string;
    auditStatus: string;
  };
}

export const translations: Record<'he' | 'en', TranslationSchema> = {
  he: {
    appTitle: 'גן-נט GanNet',
    appSubtitle: 'מערכת ניהול גנים וגיל רך',
    prototypeNotice: 'פרוטוטייפ חי • מותאם למובייל בשטח ולדסקטופ ניהולי',
    roleSwitcherTitle: 'החלפת תפקיד פעיל במערכת:',
    switchRoleNotice: 'בחר פרופיל לבדיקת חוויית המשתמש והתאמת הממשק (מובייל לגננת / דסקטופ לקבלן ולעירייה)',

    roles: {
      teacher: {
        name: 'מורה / מדריך בשטח',
        title: 'צוות הוראה והדרכה',
        desc: 'ממשק מובייל מהיר לדיווח נוכחות, מערכת יומית, עדכון הורים ותקשורת שוטפת',
        badge: 'ממשק מובייל שטח'
      },
      contractor: {
        name: 'קבלן מפעיל',
        title: 'חברת הפעלה / ספק שירות',
        desc: 'דשבורד תפעולי לשיבוץ מדריכים, מעקב פריסה במוסדות, החלפות וניהול חיובים',
        badge: 'דשבורד ניהולי'
      },
      municipality: {
        name: 'רשות מקומית / בעלים',
        title: 'אגף חינוך קדם-יסודי',
        desc: 'מבט-על עירוני לבקרת איכות, עמידה ב-SLA, ניטור תפוסה וניהול תקציבי',
        badge: 'דשבורד פיקוח ובקרה'
      }
    },

    nav: {
      homeClasses: 'כיתות וראשי',
      schedule: 'לוח שעות',
      dailyFeed: 'עדכון יומי',
      profile: 'פרופיל אישי',

      overview: 'סקירה כללית',
      staffManagement: 'ניהול צוותים',
      kindergartens: 'מוסדות וגנים',
      operationsShifts: 'תפעול ומשמרות',
      reportsInvoicing: 'דוחות ותשלומים',
      settings: 'הגדרות ספק',

      municipalOverview: 'מבט עירוני',
      supervisionQuality: 'פיקוח ובקרה',
      attendanceCapacity: 'נוכחות ותפוסה',
      contractorSLAs: 'עמידה ביעדי קבלנים',
      incidentsAlerts: 'אירועים וחריגות',
      exportAudits: 'ייצוא וביקורת'
    },

    actions: {
      languageToggle: '🌐 עברית',
      activeMode: 'תפקיד פעיל',
      viewDetails: 'הצג פרטים',
      exportReport: 'ייצוא נתונים',
      quickAction: 'פעולה מהירה',
      refreshData: 'רענון נתונים',
      takeAttendance: 'סימון נוכחות',
      logDailyActivity: 'עדכון פעילות',
      reportIncident: 'דיווח חריג',
      requestSubstitute: 'בקשת ממלא/ת מקום',
      assignStaff: 'שיבוץ איש צוות',
      contactSupervisor: 'קשר עם המפקח',
      searchPlaceholder: 'חיפוש גן, עובד, כיתה או מזהה...',
      filterAll: 'הכל',
      statusActive: 'פעיל',
      statusPending: 'ממתין לאישור',
      statusAttention: 'נדרשת תשומת לב',
      present: 'נוכח/ת',
      absent: 'נעדר/ת',
      late: 'איחור',
      toggleMobileView: 'תצוגת מובייל',
      fullDesktopView: 'רוחב מסך מלא',
      mobileSimulatedView: 'סימולציית סמארטפון'
    },

    teacherModules: {
      todaysClasses: 'הגנים והשיעורים שלי היום',
      switchClass: 'החלף כיתה',
      assignedTime: 'שעות פעילות',
      ageGroup: 'שכבת גיל',
      address: 'כתובת',
      geoVerification: 'אימות מיקום GPS בשער המוסד',
      checkIn: 'אימות הגעה (צ׳ק-אין)',
      checkOut: 'צ׳ק-אאוט וסיום יום',
      verifiedAtLocation: 'מאומת במיקום הגן',
      outOfRange: 'מחוץ לטווח הגן',
      checkingLocation: 'קולט נתוני לוויין GPS...',
      distanceToGate: 'מרחק משער הכניסה',
      simInRange: 'הגדר כמאומת (15 מ׳ מהשער)',
      simOutOfRange: 'הגדר כמחוץ לטווח (1.2 ק״מ)',
      lastVerified: 'אומת ב-',
      gpsCoordinates: 'נ.צ. לווייני',
      gpsPromptHint: 'מערכת הגידור הגיאוגרפי מאמתת נוכחות צוות בהתאם לדרישות הרשות המקומית',

      // Session Timer
      sessionTimer: 'שעון פעילות ושיעור כיתתי',
      startClass: 'התחל שיעור',
      endClass: 'סיים שיעור',
      activeSession: 'שיעור מתנהל כעת',
      elapsedTime: 'זמן שיעור שחלף',
      sessionPaused: 'שיעור הושהה',
      sessionEndedSummary: 'שיעור הסתיים ונרשם במערכת',
      completedDuration: 'משך השיעור',
      resetTimer: 'איפוס',
      loggedToContractor: 'נרשם אוטומטית בדוח הקבלן ובאגף החינוך',

      // Roster
      quickAttendanceChecklist: 'רשימת נוכחות מהירה',
      attendanceSubtitle: 'הקש על תלמיד לעדכון מהיר של סטטוס נוכחות',
      markAllPresent: 'סמן את כולם כנוכחים',
      searchStudent: 'חיפוש ילד ברשימה...',
      allergyAlert: 'רגישות / אלרגיה',
      guardianContact: 'הורה / אפוטרופוס',
      callParent: 'התקשר להורה',
      totalPresent: 'נוכחים בכיתה',

      // Daily Log Form
      createDailyLog: 'פרסום עדכון יומי להורים ולמפעיל',
      activityTitle: 'כותרת העדכון / הפעילות',
      activityNotes: 'פירוט הפעילות והודעה להורים',
      category: 'תחום פדגוגי',
      photoAttachment: 'תמונת פעילות',
      selectPresetPhoto: 'בחר מתוך תמונות פעילות לדוגמה',
      mealNotes: 'הערות ארוחה והזנה (אופציונלי)',
      napNotes: 'הערות מנוחה ושינה (אופציונלי)',
      publishLog: 'שלח עדכון להורים ולמפעיל',
      cancel: 'ביטול',
      logSuccess: 'העדכון נשלח בהצלחה ל-26 הורים ולחמ״ל הקבלן!',
      presetPhotos: {
        painting: 'ציור וגואש',
        buildingBlocks: 'משחקי בניה',
        readingCircle: 'שעת סיפור',
        outdoorPlay: 'פעילות חצר',
      },
    },

    itinerary: {
      dailyView: 'לו״ז יומי ומסלול',
      weeklyView: 'לוח שבועי',
      monthlyView: 'מבט חודשי',
      todayItineraryHeader: 'סדר היום והניידות של המדריך',
      todaySubtitle: 'פריסת שיעורי חוגים והעשרה בין הגנים, זמני נסיעה וניווט',
      navigateWaze: 'נווט עם Waze',
      wazeDisclaimer: 'פתיחת יעד מדויק באפליקציית Waze',
      setReminder: 'הפעל תזכורת',
      reminderActive: 'תזכורת מופעלת',
      reminderSetToast: 'תזכורת הופעלה (התראה תשלח 30 דק׳ לפני תחילת השיעור)',
      reminderCanceledToast: 'התזכורת בוטלה',
      transitBuffer: 'זמן נסיעה בין מוסדות',
      estimatedDrive: 'דקות נסיעה',
      estimatedDistance: 'ק״מ',
      contactLead: 'איש קשר במוסד',
      callLead: 'חיוג מהיר',
      requiredEquipment: 'ציוד ועזרים לשיעור',
      monthlyOverview: 'סיכום פריסת שיעורים חודשית',
      totalClassesMonth: 'שיעורים החודש',
      distinctKindergartens: 'גנים ומוסדות שונים',
      teachingHours: 'שעות הדרכה מתוכננות',
      citiesCovered: 'ערים במערך',
      selectDatePrompt: 'בחר יום בלוח לצפייה בשיעורים ובמסלול הניידות',
      noClassesOnDate: 'אין שיעורים מתוכננים בתאריך זה (יום מנוחה או ריענון)',
      classesScheduledOnDate: 'שיעורים מתוכננים לתאריך זה',
      statusCompleted: 'הסתיים',
      statusCurrent: 'מתרחש כעת',
      statusUpcoming: 'מתוכנן להמשך היום',
      allDays: {
        sun: 'א׳',
        mon: 'ב׳',
        tue: 'ג׳',
        wed: 'ד׳',
        thu: 'ה׳',
        fri: 'ו׳',
      },
    },

    teacherView: {
      welcomeTitle: 'בוקר טוב, רונית!',
      welcomeSubtitle: 'גן שושנים • קבוצת בוגרים (גילאי 4-5)',
      activeKindergarten: 'גן שושנים',
      kindergartenLocation: 'רחוב הברוש 14, תל אביב-יפו',
      attendanceRate: '92.3%',
      attendanceCount: '24 מתוך 26 ילדים',
      enrolledTotal: '26 ילדים רשומים',
      onDutyStaff: '3 אנשי צוות נוכחים',
      nextActivity: 'חוג מוזיקה ותנועה עם עידן',
      nextActivityTime: '10:30 (בעוד 20 דק׳)',
      dailyUpdatesCount: '4 עדכונים פורסמו הבוקר',
      todayScheduleHeader: 'סדר היום בגן היום',
      quickActionsHeader: 'פעולות מהירות בשטח',
      recentUpdatesHeader: 'עדכונים אחרונים להורים ולמפעיל',
      morningRoutine: 'מפגש בוקר ושיח נושא',
      breakfastRoutine: 'ארוחת עשר בריאה',
      musicEnrichment: 'חוג תנועה והעשרה מוזיקלית',
      yardPlay: 'פעילות חצר ומשחקי שיתוף',
      lunchAndRest: 'ארוחת צהריים חמה ושעת מנוחה',
      departureAndPickup: 'מפגש סיכום יום ואיסוף הורים'
    },

    contractorView: {
      welcomeTitle: 'שלום, אבי לוי',
      welcomeSubtitle: 'מנהל תפעול • אורנים שירותי חינוך והפעלה',
      agencyName: 'אורנים שירותי חינוך בע״מ',
      activeInstructors: '48 / 52',
      activeInstructorsSub: 'מדריכים וסייעים פרוסים כעת בשטח',
      managedPreschools: '28 גנים',
      managedPreschoolsSub: 'ב-3 מחוזות ואשכולות עירוניים',
      coverageRate: '98.5%',
      coverageRateSub: 'עמידה בשיבוצי בוקר (מול יעד 98%)',
      openSubstituteRequests: '2 פתוחות',
      openSubstituteRequestsSub: 'גן אלונים (חולון), גן דקל (ת״א)',
      quickOverviewHeader: 'מצב פריסה ותפעול יומי',
      deploymentStatusHeader: 'סטטוס מוסדות בטיפול שוטף',
      urgentNoticeTitle: 'התראת שיבוץ מיידית',
      urgentNoticeDesc: 'סייעת בגן אלונים דיווחה על מחלה ב-07:15. יש להפעיל ממלאת מקום מקבוצת כוננות מרכז.',
      dispatchAction: 'שבץ ממלאת מקום כעת',

      // Active Classes & Overview Grid
      activeClassesTitle: 'מוקד שיעורים ופעילות שטח חיה',
      activeClassesSubtitle: 'מעקב חי אחר מהלך השיעורים, טיימר פעילות נוכחי ואימות מיקום גדר גיאוגרפית (GPS)',
      filterAllClasses: 'כל השיעורים',
      filterLiveNow: 'במהלך שיעור כעת',
      filterUpcoming: 'טרם התחילו',
      filterCompleted: 'הסתיימו היום',
      filterAnomalies: 'חריגות ומיקום',
      sessionActiveNow: 'שיעור פעיל כעת',
      sessionCompleted: 'הסתיים',
      sessionUpcoming: 'מתוכנן בהמשך',
      verifiedAtLocation: 'אימות מיקום מאושר',
      outOfRange: 'מחוץ לטווח מורשה',
      pendingCheckIn: 'ממתין לאימות מיקום',
      distanceMeters: 'מ׳ מהגן',
      timerRunning: 'רץ כעת',
      studentsAttending: 'ילדים נוכחים',
      callTeacher: 'התקשר למדריך/ה',
      callKindergarten: 'התקשר לגן',
      viewDetails: 'פרטי שיעור',
      noClassesFound: 'לא נמצאו שיעורים התואמים את הסינון שנבחר.',

      // Financial Split Manager
      financialManagerTitle: 'ניהול פיצול שכר ותחשיב מפעיל מול רשות',
      financialManagerSubtitle: 'תחשיב חלוקת שכר פר שיעור מאומת בין המדריך/ה לרווח הקבלן, ועדכון אחוזי שכר חי',
      municipalFixedRate: 'תעריף שיעור עירוני קבוע',
      municipalRatePerClass: '₪ לשיעור',
      teacherSplitPercentage: 'אחוז שכר מדריך',
      teacherShare: 'חלק המדריך/ה',
      contractorShare: 'רווח גולמי קבלן',
      teacherPayout: 'שכר מדריך מצטבר',
      contractorGrossMargin: 'רווח מפעיל',
      verifiedClasses: 'שיעורים מאומתים',
      totalBilledMunicipality: 'סה״כ חיוב רשות מקומית',
      totalTeacherPayroll: 'סה״כ שכר מדריכים לתשלום',
      totalContractorProfit: 'סה״כ רווח גולמי מפעיל',
      profitMarginRate: 'שיעור רווחיות מפעיל',
      editSplit: 'ערוך פיצול',
      resetToDefault: 'איפוס לברירת מחדל (60%)',
      approvedForPayroll: 'אושר לתשלום',
      pendingApproval: 'ממתין לאישור',
      approvePayroll: 'אשר שכר',
      payrollApprovedToast: 'שכר המדריך/ה אושר בהצלחה להעברה!',
      splitUpdatedToast: 'אחוז הפיצול עודכן בהצלחה והחישובים רועננו!',
      exportPayrollCsv: 'ייצוא דוח שכר וחיובים (CSV)',
      rateDisclaimer: 'החישוב מתבסס על שיעורים שאומתו ב-GPS ונוכחות מלאה עפ״י חוזה העירייה.',

      // Operational Alerts
      operationalAlertsTitle: 'מוקד התראות וחריגות שטח',
      operationalAlertsSubtitle: 'זיהוי מוקדם של איחורים, היעדר דיווח סיום שיעור וחריגות גדר גיאוגרפית (Geofence)',
      alertTypeLateCheckin: 'התרעת איחור הגעה',
      alertTypeMissingLog: 'יומן סיום שיעור חסר',
      alertTypeGpsAnomaly: 'חריגת אימות GPS',
      alertSeverityUrgent: 'דחוף',
      alertSeverityWarning: 'אזהרה',
      alertAcknowledge: 'אישור חריגה ידני',
      alertResolve: 'סמן כטופל',
      alertResolvedToast: 'ההתראה סומנה כטופלה והועברה לארכיון.',
      allAlertsResolved: 'כל ההתראות טופלו בהצלחה! אין חריגות פעילות כעת.',
      activeAlertsCount: 'התראות פעילות הדורשות מענה',
      dispatchStandby: 'הפעל כונן/ית גיבוי',

      // Instructor CRUD
      instructorsTitle: 'ניהול מדריכים וצוות שטח (CRUD)',
      instructorsSubtitle: 'הוספה, עריכה, שיבוץ ועדכון פרטי התקשרות ואחוזי שכר למדריכי העשרה',
      addInstructor: 'הוסף מדריך/ה חדש/ה',
      editInstructor: 'ערוך פרטי מדריך/ה',
      deleteInstructor: 'מחק מדריך/ה',
      deleteInstructorConfirm: 'האם אתה בטוח שברצונך למחוק מדריך זה? כל השיבוצים העתידיים יבוטלו.',
      instructorSavedToast: 'פרטי המדריך/ה נשמרו בהצלחה במערכת!',
      instructorDeletedToast: 'המדריך/ה הוסר/ה מהמערכת בהצלחה.',
      instructorNameHe: 'שם מלא (עברית)',
      instructorNameEn: 'שם מלא (אנגלית)',
      instructorRole: 'תפקיד / הגדרת שכר',
      instructorSubject: 'תחום התמחות והעשרה',
      instructorPhone: 'טלפון נייד',
      instructorEmail: 'כתובת דוא״ל',
      instructorZone: 'מחוז שירות',
      instructorStatus: 'סטטוס פעילות',
      instructorSeniority: 'ותק וניסיון',
      instructorDefaultSplit: 'אחוז שכר בסיס (%)',
      assignedFacilities: 'מוסדות משובצים',
      noInstructorsFound: 'לא נמצאו מדריכים התואמים את הסינון הנוכחי.',

      // Facility CRUD
      facilitiesTitle: 'ניהול מוסדות וגני ילדים (CRUD)',
      facilitiesSubtitle: 'הקמה, עריכה וניהול פרטי מוסדות חינוך, אנשי קשר וגבולות גדר גיאוגרפית (GPS)',
      addFacility: 'הוסף גן / מוסד חדש',
      editFacility: 'ערוך פרטי גן',
      deleteFacility: 'מחק מוסד',
      deleteFacilityConfirm: 'האם אתה בטוח שברצונך להסיר מוסד זה? כל החוגים המשובצים בו יבוטלו.',
      facilitySavedToast: 'פרטי המוסד החינוכי נשמרו בהצלחה במערכת!',
      facilityDeletedToast: 'המוסד החינוכי הוסר מהמערכת בהצלחה.',
      facilityNameHe: 'שם המוסד (עברית)',
      facilityNameEn: 'שם המוסד (אנגלית)',
      facilityCity: 'עיר / יישוב',
      facilityAddressHe: 'כתובת מדויקת (עברית)',
      facilityAddressEn: 'כתובת (אנגלית)',
      facilityContactPerson: 'איש/אשת קשר (מנהלת גן / גננת מובילה)',
      facilityContactPhone: 'טלפון איש קשר',
      facilityContactEmail: 'דוא״ל המוסד',
      facilityAgeGroup: 'שכבת גיל',
      facilityTotalStudents: 'מספר ילדים רשומים',
      facilityGeofenceRadius: 'רדיוס אימות GPS (במטרים)',
      facilityNotes: 'הנחיות הגעה וקוד כניסה',
      assignedInstructors: 'מדריכים פעילים',
      noFacilitiesFound: 'לא נמצאו מוסדות חינוך התואמים את הסינון.',

      // Assignments / Placements
      placementsTitle: 'לוח שיבוצי שטח וזמני הגעה',
      placementsSubtitle: 'הצמדת מדריך למוסד חינוכי, קביעת שעות שהות מדויקות, ימי פעילות ותחשיב שכר',
      addPlacement: 'שבץ מדריך לגן חדש',
      editPlacement: 'ערוך שיבוץ ושעות שהות',
      deletePlacement: 'בטל שיבוץ',
      deletePlacementConfirm: 'האם לבטל שיבוץ זה? המדריך והגן יעודכנו אוטומטית.',
      placementSavedToast: 'השיבוץ נקלט בהצלחה והתווסף ללוח הזמנים השבועי!',
      placementDeletedToast: 'השיבוץ בוטל בהצלחה.',
      selectInstructor: 'בחר מדריך/ה',
      selectFacility: 'בחר מוסד / גן יעד',
      dayOfWeek: 'יום בשבוע',
      startTime: 'שעת הגעה ותחילת שיעור',
      endTime: 'שעת סיום שהות',
      timeSlot: 'טווח שעות פעילות (24 שעות)',
      noPlacementsFound: 'לא קיימים שיבוצים פעילים התואמים את הסינון.',
      filterDayAll: 'כל המועדים והימים',
      recurrenceMode: 'אופן קביעת המועד',
      recurringWeekly: 'קבוע שבועי (לפי ימי פעילות)',
      specificDateSession: 'תאריך ספציפי / שיעור חד-פעמי',
      selectSpecificDate: 'תאריך השיעור (DD/MM/YYYY)',
      selectWeekdays: 'ימי פעילות קבועים בשבוע',
      timeFormatNotice: 'שעון 24 שעות ישראלי (לדוגמה: 14:00, 15:30)',
      dateFormatNotice: 'תאריך בפורמט ישראלי מלא (יום/חודש/שנה)',
      singleSessionBadge: 'תאריך ספציפי',
      recurringBadge: 'קבוע שבועי'
    },

    municipalityView: {
      welcomeTitle: 'שלום, מיכל שפירא',
      welcomeSubtitle: 'מנהלת אגף חינוך קדם-יסודי • מנהל החינוך העירוני',
      deptName: 'עיריית תל אביב-יפו • אגף קדם-יסודי',
      totalEnrolled: '1,842',
      totalEnrolledSub: 'ילדים רשומים ב-64 כיתות גן עירוניות',
      contractorScore: '97.4%',
      contractorScoreSub: 'מדד עמידה ב-SLA ובקרת איכות של 4 קבלנים',
      districtAttendance: '91.8%',
      districtAttendanceSub: 'נוכחות ילדים מדווחת בזמן אמת',
      safetyCompliance: '62 / 64',
      safetyComplianceSub: 'גנים עברו מבדק בטיחות ותקינות חודשי',
      cityMapHeader: 'מפת פיקוח עירונית לפי רובעים',
      contractorOverviewHeader: 'דירוג קבלנים מפעילים לפי עמידה ביעדים',
      qualityIndicatorsHeader: 'אינדיקטורים עירוניים מובילים',
      auditStatus: 'מבדק שבועי אחרון: תקין בכל המחוזות'
    }
  },

  en: {
    appTitle: 'GanNet',
    appSubtitle: 'Preschool & Kindergarten Management System',
    prototypeNotice: 'Live Interactive Prototype • Mobile Field & Desktop Admin',
    roleSwitcherTitle: 'Switch Active System Role:',
    switchRoleNotice: 'Select a persona to test the UX and layout adaptation (mobile for teachers / desktop for contractor & municipality)',

    roles: {
      teacher: {
        name: 'Teacher / Instructor',
        title: 'Teaching & Care Staff',
        desc: 'Fast mobile-first touch UI for attendance, daily schedules, parent updates, and logs',
        badge: 'Field Mobile UI'
      },
      contractor: {
        name: 'Contractor / Agency Manager',
        title: 'Operating Contractor / Service Agency',
        desc: 'Operational dashboard for staff rostering, kindergarten coverage, substitutes, and billing',
        badge: 'Management Dashboard'
      },
      municipality: {
        name: 'Municipality / Service Requester',
        title: 'Early Childhood Education Department',
        desc: 'City-wide oversight for compliance, SLA tracking, capacity monitoring, and auditing',
        badge: 'Supervision & Oversight'
      }
    },

    nav: {
      homeClasses: 'Home & Classes',
      schedule: 'Schedule',
      dailyFeed: 'Daily Feed',
      profile: 'My Profile',

      overview: 'Overview',
      staffManagement: 'Staff Rostering',
      kindergartens: 'Kindergartens',
      operationsShifts: 'Operations & Shifts',
      reportsInvoicing: 'Reports & Billing',
      settings: 'Agency Settings',

      municipalOverview: 'City Overview',
      supervisionQuality: 'Quality & Supervision',
      attendanceCapacity: 'Attendance & Capacity',
      contractorSLAs: 'Contractor SLAs',
      incidentsAlerts: 'Incidents & Alerts',
      exportAudits: 'Export & Audits'
    },

    actions: {
      languageToggle: '🌐 English',
      activeMode: 'Active Persona',
      viewDetails: 'View Details',
      exportReport: 'Export Data',
      quickAction: 'Quick Action',
      refreshData: 'Refresh Data',
      takeAttendance: 'Take Attendance',
      logDailyActivity: 'Log Activity',
      reportIncident: 'Report Incident',
      requestSubstitute: 'Request Substitute',
      assignStaff: 'Assign Staff',
      contactSupervisor: 'Contact Supervisor',
      searchPlaceholder: 'Search preschool, staff member, class or ID...',
      filterAll: 'All',
      statusActive: 'Active',
      statusPending: 'Pending Approval',
      statusAttention: 'Needs Attention',
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
      toggleMobileView: 'Mobile View',
      fullDesktopView: 'Full Desktop Width',
      mobileSimulatedView: 'Phone Frame Simulation'
    },

    teacherModules: {
      todaysClasses: "Today's Preschools & Classes",
      switchClass: 'Switch Class',
      assignedTime: 'Time Slot',
      ageGroup: 'Age Group',
      address: 'Address',
      geoVerification: 'Gate GPS Geofence Verification',
      checkIn: 'Check-In (Verify Arrival)',
      checkOut: 'Check-Out (End Shift)',
      verifiedAtLocation: 'Verified at Location',
      outOfRange: 'Out of Range',
      checkingLocation: 'Acquiring satellite GPS fix...',
      distanceToGate: 'Distance to gate',
      simInRange: 'Set In-Range (15m from gate)',
      simOutOfRange: 'Set Out-of-Range (1.2km away)',
      lastVerified: 'Verified at',
      gpsCoordinates: 'GPS Coordinates',
      gpsPromptHint: 'Automated municipal geofencing confirms physical presence on campus as required by city audit standards',

      // Session Timer
      sessionTimer: 'Class Session Timer',
      startClass: 'Start Class',
      endClass: 'End Class',
      activeSession: 'Session in Progress',
      elapsedTime: 'Elapsed Session Time',
      sessionPaused: 'Session Paused',
      sessionEndedSummary: 'Class session completed and registered',
      completedDuration: 'Total Duration',
      resetTimer: 'Reset',
      loggedToContractor: 'Synced directly with Agency operations and City dashboard',

      // Roster
      quickAttendanceChecklist: 'Student Attendance Checklist',
      attendanceSubtitle: 'Tap child row to quickly cycle attendance status',
      markAllPresent: 'Mark All Present',
      searchStudent: 'Search child by name...',
      allergyAlert: 'Allergy / Sensitivity',
      guardianContact: 'Parent / Guardian',
      callParent: 'Call Guardian',
      totalPresent: 'Present in Class',

      // Daily Log Form
      createDailyLog: 'Publish Daily Update to Parents & Agency',
      activityTitle: 'Activity Title / Subject',
      activityNotes: 'Activity Summary & Parent Notes',
      category: 'Curriculum Area',
      photoAttachment: 'Activity Photo',
      selectPresetPhoto: 'Choose from sample activity photos',
      mealNotes: 'Meal / Snack Notes (Optional)',
      napNotes: 'Rest / Quiet Time Notes (Optional)',
      publishLog: 'Send Update to Parents & Agency',
      cancel: 'Cancel',
      logSuccess: 'Update sent to 26 families and agency operations dispatch!',
      presetPhotos: {
        painting: 'Painting & Crafts',
        buildingBlocks: 'Building Blocks',
        readingCircle: 'Story Time Circle',
        outdoorPlay: 'Outdoor Play',
      },
    },

    itinerary: {
      dailyView: 'Daily Itinerary & Route',
      weeklyView: 'Weekly Schedule',
      monthlyView: 'Monthly Overview',
      todayItineraryHeader: "Instructor Daily Route & Schedule",
      todaySubtitle: 'Enrichment classes distributed across kindergartens, driving buffers & Waze navigation',
      navigateWaze: 'Navigate with Waze',
      wazeDisclaimer: 'Open destination directly in Waze app',
      setReminder: 'Set Reminder',
      reminderActive: 'Reminder On',
      reminderSetToast: 'Reminder set (notification alert 30 min before class)',
      reminderCanceledToast: 'Reminder cancelled',
      transitBuffer: 'Transit Between Kindergartens',
      estimatedDrive: 'min drive',
      estimatedDistance: 'km',
      contactLead: 'Kindergarten Contact',
      callLead: 'Call Lead',
      requiredEquipment: 'Class Equipment & Props',
      monthlyOverview: 'Monthly Class Distribution Summary',
      totalClassesMonth: 'Classes This Month',
      distinctKindergartens: 'Distinct Preschools',
      teachingHours: 'Teaching Hours Scheduled',
      citiesCovered: 'Cities Covered',
      selectDatePrompt: 'Select any calendar date to view classes & travel route',
      noClassesOnDate: 'No enrichment classes scheduled for this date (rest/prep day)',
      classesScheduledOnDate: 'Classes scheduled on this date',
      statusCompleted: 'Completed',
      statusCurrent: 'In Progress',
      statusUpcoming: 'Upcoming Today',
      allDays: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
      },
    },

    teacherView: {
      welcomeTitle: 'Good morning, Ronit!',
      welcomeSubtitle: 'Shoshanim Kindergarten • Senior Group (Ages 4-5)',
      activeKindergarten: 'Shoshanim Kindergarten',
      kindergartenLocation: '14 HaBrosh St., Tel Aviv-Yafo',
      attendanceRate: '92.3%',
      attendanceCount: '24 of 26 children',
      enrolledTotal: '26 registered children',
      onDutyStaff: '3 staff members on duty',
      nextActivity: 'Music & Movement Session with Idan',
      nextActivityTime: '10:30 (in 20 min)',
      dailyUpdatesCount: '4 updates posted today',
      todayScheduleHeader: "Today's Kindergarten Schedule",
      quickActionsHeader: 'Field Quick Actions',
      recentUpdatesHeader: 'Recent Updates for Parents & Agency',
      morningRoutine: 'Morning Circle & Discussion',
      breakfastRoutine: 'Healthy Morning Snack',
      musicEnrichment: 'Music & Movement Enrichment',
      yardPlay: 'Outdoor Play & Cooperative Games',
      lunchAndRest: 'Hot Lunch & Rest Time',
      departureAndPickup: 'Wrap-up Circle & Parent Pickup'
    },

    contractorView: {
      welcomeTitle: 'Welcome, Avi Levi',
      welcomeSubtitle: 'Operations Director • Oranim Educational Services',
      agencyName: 'Oranim Educational Services Ltd.',
      activeInstructors: '48 / 52',
      activeInstructorsSub: 'Instructors & aides currently deployed',
      managedPreschools: '28 Preschools',
      managedPreschoolsSub: 'Across 3 regional city clusters',
      coverageRate: '98.5%',
      coverageRateSub: 'Morning shift fulfillment (Target: 98%)',
      openSubstituteRequests: '2 Open',
      openSubstituteRequestsSub: 'Alonim (Holon), Dekel (Tel Aviv)',
      quickOverviewHeader: 'Daily Operational Deployment',
      deploymentStatusHeader: 'Facilities Status Overview',
      urgentNoticeTitle: 'Urgent Substitute Dispatch',
      urgentNoticeDesc: 'Aide at Alonim Kindergarten called in sick at 07:15. Dispatch on-call standby staff.',
      dispatchAction: 'Dispatch Standby Now',

      // Active Classes & Overview Grid
      activeClassesTitle: 'Live Class Operations & Field Oversight',
      activeClassesSubtitle: 'Real-time monitoring of session progress, live timers, and geofence GPS verification',
      filterAllClasses: 'All Classes',
      filterLiveNow: 'In Session Now',
      filterUpcoming: 'Upcoming',
      filterCompleted: 'Completed Today',
      filterAnomalies: 'Anomalies & GPS',
      sessionActiveNow: 'Active Session',
      sessionCompleted: 'Completed',
      sessionUpcoming: 'Scheduled',
      verifiedAtLocation: 'Verified at Location',
      outOfRange: 'Out of Range',
      pendingCheckIn: 'Pending Verification',
      distanceMeters: 'm from gate',
      timerRunning: 'Live Timer',
      studentsAttending: 'Children Present',
      callTeacher: 'Call Instructor',
      callKindergarten: 'Call Kindergarten',
      viewDetails: 'Session Details',
      noClassesFound: 'No classes match the selected filter criteria.',

      // Financial Split Manager
      financialManagerTitle: 'Financial Split & Contractor Invoicing Manager',
      financialManagerSubtitle: 'Real-time revenue split calculator between instructor pay & agency gross profit based on verified sessions',
      municipalFixedRate: 'Fixed Municipal Rate / Class',
      municipalRatePerClass: '₪ / class',
      teacherSplitPercentage: 'Teacher Share %',
      teacherShare: 'Teacher Share',
      contractorShare: 'Contractor Margin',
      teacherPayout: 'Total Teacher Payout',
      contractorGrossMargin: 'Agency Gross Margin',
      verifiedClasses: 'Verified Sessions',
      totalBilledMunicipality: 'Total Municipal Invoiced',
      totalTeacherPayroll: 'Total Teacher Payroll',
      totalContractorProfit: 'Total Agency Gross Profit',
      profitMarginRate: 'Agency Margin %',
      editSplit: 'Edit Split',
      resetToDefault: 'Reset to Default (60%)',
      approvedForPayroll: 'Approved for Payout',
      pendingApproval: 'Audit Pending',
      approvePayroll: 'Approve Payout',
      payrollApprovedToast: 'Instructor payout approved for bank disbursement!',
      splitUpdatedToast: 'Percentage split updated and calculations refreshed!',
      exportPayrollCsv: 'Export Payroll & Billing (CSV)',
      rateDisclaimer: 'Calculations based on GPS-verified sessions and completed attendances under municipal SLA.',

      // Operational Alerts
      operationalAlertsTitle: 'Operational Alerts & Field Exceptions',
      operationalAlertsSubtitle: 'Early detection of late check-ins, missing post-class logs, and GPS geofence breaches',
      alertTypeLateCheckin: 'Late Check-In Alert',
      alertTypeMissingLog: 'Missing Post-Class Log',
      alertTypeGpsAnomaly: 'GPS Geofence Breach',
      alertSeverityUrgent: 'Urgent',
      alertSeverityWarning: 'Warning',
      alertAcknowledge: 'Acknowledge Exception',
      alertResolve: 'Mark Resolved',
      alertResolvedToast: 'Alert marked as resolved and archived.',
      allAlertsResolved: 'All operational alerts resolved! No active field exceptions.',
      activeAlertsCount: 'Active alerts requiring operational attention',
      dispatchStandby: 'Dispatch Standby Staff',

      // Instructor CRUD
      instructorsTitle: 'Instructor & Field Staff Management (CRUD)',
      instructorsSubtitle: 'Create, update, assign, and manage contact information and compensation splits for instructors',
      addInstructor: 'Add New Instructor',
      editInstructor: 'Edit Instructor Details',
      deleteInstructor: 'Delete Instructor',
      deleteInstructorConfirm: 'Are you sure you want to delete this instructor? All scheduled classes will be unassigned.',
      instructorSavedToast: 'Instructor profile saved successfully!',
      instructorDeletedToast: 'Instructor deleted from system successfully.',
      instructorNameHe: 'Full Name (Hebrew)',
      instructorNameEn: 'Full Name (English)',
      instructorRole: 'Staff Role / Designation',
      instructorSubject: 'Specialty & Discipline',
      instructorPhone: 'Mobile Phone',
      instructorEmail: 'Email Address',
      instructorZone: 'Service District',
      instructorStatus: 'Active Status',
      instructorSeniority: 'Seniority Level',
      instructorDefaultSplit: 'Base Compensation Share (%)',
      assignedFacilities: 'Assigned Facilities',
      noInstructorsFound: 'No instructors match your current filter.',

      // Facility CRUD
      facilitiesTitle: 'Educational Facilities & Preschools (CRUD)',
      facilitiesSubtitle: 'Register, edit, and configure kindergarten facilities, contacts, and geofence GPS boundaries',
      addFacility: 'Add Preschool / Facility',
      editFacility: 'Edit Facility Details',
      deleteFacility: 'Delete Facility',
      deleteFacilityConfirm: 'Are you sure you want to delete this facility? All scheduled classes will be removed.',
      facilitySavedToast: 'Facility registered and saved successfully!',
      facilityDeletedToast: 'Educational facility removed from system.',
      facilityNameHe: 'Facility Name (Hebrew)',
      facilityNameEn: 'Facility Name (English)',
      facilityCity: 'City / Municipality',
      facilityAddressHe: 'Street Address (Hebrew)',
      facilityAddressEn: 'Street Address (English)',
      facilityContactPerson: 'On-Site Contact (Lead Teacher / Director)',
      facilityContactPhone: 'Contact Phone',
      facilityContactEmail: 'Contact Email',
      facilityAgeGroup: 'Age Cohort',
      facilityTotalStudents: 'Enrolled Children Count',
      facilityGeofenceRadius: 'GPS Geofence Radius (meters)',
      facilityNotes: 'Access Notes & Gate Entry Code',
      assignedInstructors: 'Active Instructors',
      noFacilitiesFound: 'No educational facilities match your filter.',

      // Assignments / Placements
      placementsTitle: 'Field Placements & Time Schedule',
      placementsSubtitle: 'Assign instructors to specific educational facilities, scheduled hours, and subject allocations',
      addPlacement: 'Assign Instructor to Facility',
      editPlacement: 'Edit Placement & Time Hours',
      deletePlacement: 'Unassign / Cancel Placement',
      deletePlacementConfirm: 'Are you sure you want to cancel this placement assignment?',
      placementSavedToast: 'Instructor placement assigned and added to active schedule!',
      placementDeletedToast: 'Placement unassigned successfully.',
      selectInstructor: 'Select Instructor',
      selectFacility: 'Select Educational Facility',
      dayOfWeek: 'Day of Week',
      startTime: 'Arrival & Class Start Time',
      endTime: 'Departure Time',
      timeSlot: 'Time Slot (24h clock)',
      noPlacementsFound: 'No placement assignments found for this filter.',
      filterDayAll: 'All Days & Dates',
      recurrenceMode: 'Schedule Frequency',
      recurringWeekly: 'Weekly Recurring (on selected weekdays)',
      specificDateSession: 'Specific Date / Single Session',
      selectSpecificDate: 'Session Date (DD/MM/YYYY)',
      selectWeekdays: 'Recurring Weekday(s)',
      timeFormatNotice: 'Israeli 24h clock format (e.g. 14:00, 15:30)',
      dateFormatNotice: 'Israeli date format (DD/MM/YYYY)',
      singleSessionBadge: 'Single Date',
      recurringBadge: 'Weekly'
    },

    municipalityView: {
      welcomeTitle: 'Welcome, Michal Shapira',
      welcomeSubtitle: 'Head of Early Childhood Division • Municipal Education Directorate',
      deptName: 'Tel Aviv-Yafo Municipality • Early Childhood Directorate',
      totalEnrolled: '1,842',
      totalEnrolledSub: 'Children enrolled across 64 municipal classrooms',
      contractorScore: '97.4%',
      contractorScoreSub: 'Contractor SLA & quality audit composite across 4 agencies',
      districtAttendance: '91.8%',
      districtAttendanceSub: 'Real-time citywide child attendance',
      safetyCompliance: '62 / 64',
      safetyComplianceSub: 'Classrooms passed monthly safety inspection',
      cityMapHeader: 'District Oversight Map',
      contractorOverviewHeader: 'Contractor Performance & SLA Benchmark',
      qualityIndicatorsHeader: 'Key Municipal Oversight Metrics',
      auditStatus: 'Latest weekly inspection: Nominal across all zones'
    }
  }
};
