import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ContractorTab,
  InstructorItem,
  EducationalFacility,
  ClassPlacementAssignment,
  ContractorClassSession
} from '../../types';
import {
  LayoutDashboard,
  Users2,
  Building,
  CalendarClock,
  Receipt,
  Settings,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpRight,
  UserCheck,
  UserX,
  PhoneCall,
  Clock,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
  Coins,
  TrendingUp,
  MapPin,
  Radio,
  Phone,
  Plus,
  CalendarPlus,
  Building2
} from 'lucide-react';
import { ContractorOverviewGrid } from './ContractorOverviewGrid';
import { FinancialSplitManager } from './FinancialSplitManager';
import { OperationalAlertsBanner } from './OperationalAlertsBanner';
import { StaffCrudTab } from './StaffCrudTab';
import { FacilitiesCrudTab } from './FacilitiesCrudTab';
import { PlacementsTab } from './PlacementsTab';
import { InstructorModal } from './InstructorModal';
import { FacilityModal } from './FacilityModal';
import { PlacementModal } from './PlacementModal';
import {
  initialContractorClasses,
  initialTeacherFinancials,
  initialContractorAlerts,
  initialInstructorsList,
  initialFacilitiesList,
  initialAssignmentsList,
  INITIAL_MUNICIPAL_CLASS_RATE,
  DEFAULT_TEACHER_PERCENTAGE
} from '../../data/mockContractor';

export const ContractorView: React.FC = () => {
  const { contractorTab, setContractorTab, t, language, showToast } = useApp();

  // State for CRUD resources
  const [instructors, setInstructors] = useState<InstructorItem[]>(initialInstructorsList);
  const [facilities, setFacilities] = useState<EducationalFacility[]>(initialFacilitiesList);
  const [placements, setPlacements] = useState<ClassPlacementAssignment[]>(initialAssignmentsList);
  const [classes, setClasses] = useState<ContractorClassSession[]>(initialContractorClasses);

  // Modals state
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [instructorToEdit, setInstructorToEdit] = useState<InstructorItem | null>(null);

  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [facilityToEdit, setFacilityToEdit] = useState<EducationalFacility | null>(null);

  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);
  const [placementToEdit, setPlacementToEdit] = useState<ClassPlacementAssignment | null>(null);
  const [placementPrefillInstId, setPlacementPrefillInstId] = useState<string | undefined>();
  const [placementPrefillFacId, setPlacementPrefillFacId] = useState<string | undefined>();

  // Sub-view toggle in shifts: 'placements' or 'live_grid'
  const [shiftsSubView, setShiftsSubView] = useState<'placements' | 'live_grid'>('placements');

  const navItems: { id: ContractorTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: t.nav.overview, icon: LayoutDashboard },
    { id: 'shifts', label: language === 'he' ? 'שיבוצים ושעות שהות' : 'Placements & Schedule', icon: CalendarClock },
    { id: 'staff', label: language === 'he' ? 'ניהול מדריכים (CRUD)' : 'Instructors (CRUD)', icon: Users2 },
    { id: 'kindergartens', label: language === 'he' ? 'ניהול גנים ומוסדות (CRUD)' : 'Facilities (CRUD)', icon: Building },
    { id: 'invoicing', label: language === 'he' ? 'פיצול שכר וחיובים' : 'Financial Split & Invoicing', icon: Receipt },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  // -------------------------------------------------------------
  // Instructor CRUD Handlers
  // -------------------------------------------------------------
  const handleOpenAddInstructor = () => {
    setInstructorToEdit(null);
    setIsInstructorModalOpen(true);
  };

  const handleOpenEditInstructor = (instructor: InstructorItem) => {
    setInstructorToEdit(instructor);
    setIsInstructorModalOpen(true);
  };

  const handleSaveInstructor = (savedInstructor: InstructorItem) => {
    setInstructors((prev) => {
      const exists = prev.some((i) => i.id === savedInstructor.id);
      if (exists) {
        return prev.map((i) => (i.id === savedInstructor.id ? savedInstructor : i));
      }
      return [savedInstructor, ...prev];
    });
    setIsInstructorModalOpen(false);
    showToast(t.contractorView.instructorSavedToast, 'success');
  };

  const handleDeleteInstructor = (instructorId: string) => {
    setInstructors((prev) => prev.filter((i) => i.id !== instructorId));
    // Also remove any active placements for this instructor
    setPlacements((prev) => prev.filter((p) => p.instructorId !== instructorId));
    showToast(t.contractorView.instructorDeletedToast, 'info');
  };

  // -------------------------------------------------------------
  // Facility CRUD Handlers
  // -------------------------------------------------------------
  const handleOpenAddFacility = () => {
    setFacilityToEdit(null);
    setIsFacilityModalOpen(true);
  };

  const handleOpenEditFacility = (facility: EducationalFacility) => {
    setFacilityToEdit(facility);
    setIsFacilityModalOpen(true);
  };

  const handleSaveFacility = (savedFacility: EducationalFacility) => {
    setFacilities((prev) => {
      const exists = prev.some((f) => f.id === savedFacility.id);
      if (exists) {
        return prev.map((f) => (f.id === savedFacility.id ? savedFacility : f));
      }
      return [savedFacility, ...prev];
    });
    setIsFacilityModalOpen(false);
    showToast(t.contractorView.facilitySavedToast, 'success');
  };

  const handleDeleteFacility = (facilityId: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== facilityId));
    // Also remove any active placements for this facility
    setPlacements((prev) => prev.filter((p) => p.facilityId !== facilityId));
    showToast(t.contractorView.facilityDeletedToast, 'info');
  };

  // -------------------------------------------------------------
  // Placement / Assignment CRUD Handlers
  // -------------------------------------------------------------
  const handleOpenAddPlacement = (prefillInstId?: string, prefillFacId?: string) => {
    setPlacementToEdit(null);
    setPlacementPrefillInstId(prefillInstId);
    setPlacementPrefillFacId(prefillFacId);
    setIsPlacementModalOpen(true);
  };

  const handleOpenEditPlacement = (placement: ClassPlacementAssignment) => {
    setPlacementToEdit(placement);
    setIsPlacementModalOpen(true);
  };

  const handleSavePlacement = (savedPlacement: ClassPlacementAssignment) => {
    setPlacements((prev) => {
      const exists = prev.some((p) => p.id === savedPlacement.id);
      if (exists) {
        return prev.map((p) => (p.id === savedPlacement.id ? savedPlacement : p));
      }
      return [savedPlacement, ...prev];
    });

    // Also inject/update into active classes grid
    setClasses((prev) => {
      const newClass: ContractorClassSession = {
        id: `c-${savedPlacement.id}`,
        kindergartenNameHe: savedPlacement.facilityNameHe,
        kindergartenNameEn: savedPlacement.facilityNameEn,
        cityHe: savedPlacement.cityHe,
        cityEn: savedPlacement.cityEn,
        addressHe: savedPlacement.addressHe,
        addressEn: savedPlacement.addressEn,
        teacherId: savedPlacement.instructorId,
        teacherNameHe: savedPlacement.instructorNameHe,
        teacherNameEn: savedPlacement.instructorNameEn,
        teacherPhone: savedPlacement.instructorPhone,
        subjectHe: savedPlacement.subjectHe,
        subjectEn: savedPlacement.subjectEn,
        ageGroupHe: savedPlacement.ageGroupHe,
        ageGroupEn: savedPlacement.ageGroupEn,
        scheduledTime: `${savedPlacement.startTime} - ${savedPlacement.endTime}`,
        status: 'upcoming',
        timerSecondsElapsed: 0,
        timerTotalDurationMinutes: 75,
        isTimerRunning: false,
        gpsStatus: 'pending',
        gpsDistanceMeters: 0,
        attendanceCount: 0,
        totalStudents: 20,
        hasLogSubmitted: false,
        contactPersonHe: savedPlacement.contactPersonHe,
        contactPersonEn: savedPlacement.contactPersonEn,
        contactPhone: savedPlacement.contactPhone,
      };
      return [newClass, ...prev.filter((c) => c.id !== newClass.id)];
    });

    // Update count metrics
    setInstructors((prev) =>
      prev.map((i) =>
        i.id === savedPlacement.instructorId
          ? { ...i, assignedFacilitiesCount: (i.assignedFacilitiesCount || 0) + 1 }
          : i
      )
    );

    setFacilities((prev) =>
      prev.map((f) =>
        f.id === savedPlacement.facilityId
          ? { ...f, assignedInstructorsCount: (f.assignedInstructorsCount || 0) + 1 }
          : f
      )
    );

    setIsPlacementModalOpen(false);
    showToast(t.contractorView.placementSavedToast, 'success');
  };

  const handleDeletePlacement = (placementId: string) => {
    setPlacements((prev) => prev.filter((p) => p.id !== placementId));
    setClasses((prev) => prev.filter((c) => c.id !== `c-${placementId}`));
    showToast(t.contractorView.placementDeletedToast, 'info');
  };

  // Call actions
  const handleCallTeacher = (teacherName: string, phone: string) => {
    showToast(
      language === 'he'
        ? `מחייג למדריך/ה ${teacherName} (${phone})...`
        : `Calling instructor ${teacherName} (${phone})...`,
      'info'
    );
  };

  const handleCallKindergarten = (kindergartenName: string, phone: string) => {
    showToast(
      language === 'he'
        ? `מחייג לגן ${kindergartenName} (${phone})...`
        : `Calling kindergarten ${kindergartenName} (${phone})...`,
      'info'
    );
  };

  const handleDispatchSubstitute = () => {
    showToast(
      language === 'he'
        ? 'הכוננית דנה אשכנזי שובצה לגן המבוקש!'
        : 'Standby aide Dana Ashkenazi dispatched!',
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Top Welcome & Agency Headline Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.roles.contractor.badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {t.contractorView.welcomeTitle}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              {t.contractorView.welcomeSubtitle}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => handleOpenAddPlacement()}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>{language === 'he' ? 'שבץ מדריך לגן' : 'Assign to Facility'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddInstructor}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'he' ? 'הוסף מדריך' : 'New Instructor'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddFacility}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{language === 'he' ? 'הוסף גן' : 'New Facility'}</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'מדריכים רשומים במערכת' : 'Total Instructors'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {instructors.length}
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{instructors.filter((i) => i.status === 'active').length} {language === 'he' ? 'פעילים בשטח' : 'active'}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'מוסדות וגנים בהסכם' : 'Managed Preschools'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {facilities.length}
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">
              {language === 'he' ? `${placements.length} שיבוצי חוגים שבועיים` : `${placements.length} weekly placements`}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'תעריף שיעור עירוני' : 'Municipal Class Rate'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              ₪{INITIAL_MUNICIPAL_CLASS_RATE}
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">
              {language === 'he' ? `פיצול ממוצע: 60% מדריך / 40% קבלן` : `Avg split: 60% teacher / 40% agency`}
            </div>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
            <div className="text-xs text-amber-800 font-medium">
              {language === 'he' ? 'התראות וחריגות שטח' : 'Active Field Alerts'}
            </div>
            <div className="text-2xl font-bold text-amber-900 mt-1 tabular-nums font-mono">
              3 {language === 'he' ? 'חריגות' : 'Alerts'}
            </div>
            <div className="text-[11px] text-amber-700 mt-1">
              {language === 'he' ? '1 איחור, 1 יומן חסר, 1 GPS' : '1 Late, 1 Missing Log, 1 GPS'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace: Navigation Sidebar + Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = contractorTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setContractorTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-start ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold border border-teal-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'shifts' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono">
                      {placements.length}
                    </span>
                  )}
                  {item.id === 'staff' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-mono">
                      {instructors.length}
                    </span>
                  )}
                  {item.id === 'kindergartens' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-mono">
                      {facilities.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-slate-100 px-3">
            <div className="text-[11px] text-slate-400">
              {language === 'he' ? 'מזהה חוזה עירוני:' : 'Municipal Contract ID:'}
            </div>
            <div className="text-xs font-mono font-semibold text-slate-700 mt-0.5">
              TLV-EDU-2026-B94
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {contractorTab === 'overview' && (
            <div className="space-y-6">
              {/* Operational Alerts Component */}
              <OperationalAlertsBanner
                initialAlerts={initialContractorAlerts}
                onCallTeacher={handleCallTeacher}
                onDispatchSubstitute={handleDispatchSubstitute}
              />

              {/* Overview Grid Component: Active Classes with live timer & GPS badges */}
              <ContractorOverviewGrid
                classes={classes}
                onCallTeacher={handleCallTeacher}
                onCallKindergarten={handleCallKindergarten}
              />

              {/* Quick Placement Manager Banner */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white text-teal-800 text-[11px] font-bold border border-teal-200">
                    <CalendarClock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{language === 'he' ? 'שיבוץ והצמדת מדריך לגן' : 'Instructor Placement'}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {language === 'he' ? 'הגדרת זמני שהות ושעות פעילות מדויקות בגנים' : 'Set Arrival Hours & School Site Placements'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {language === 'he'
                      ? 'הוסף מדריך למוסד יעד, הגדר שעת כניסה ושעת יציאה, ועדכן את תוכנית העבודה.'
                      : 'Assign an instructor to a facility with specific arrival & departure hours and track execution.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenAddPlacement()}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs whitespace-nowrap transition-colors shadow-2xs shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.contractorView.addPlacement}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PLACEMENTS & SCHEDULE (SHIFTS) */}
          {contractorTab === 'shifts' && (
            <div className="space-y-4">
              {/* Sub-view switcher: Placements Matrix vs Live Active Classes Grid */}
              <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShiftsSubView('placements')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      shiftsSubView === 'placements'
                        ? 'bg-teal-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {language === 'he' ? 'לוח שיבוצים ושעות שהות' : 'Placements & Hours Matrix'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShiftsSubView('live_grid')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      shiftsSubView === 'live_grid'
                        ? 'bg-teal-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{language === 'he' ? 'מוקד פעילות וטיימר חי' : 'Live Operations & Timers'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenAddPlacement()}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'he' ? 'שיבוץ חדש' : 'New Placement'}</span>
                </button>
              </div>

              {shiftsSubView === 'placements' ? (
                <PlacementsTab
                  placements={placements}
                  onAddPlacement={() => handleOpenAddPlacement()}
                  onEditPlacement={handleOpenEditPlacement}
                  onDeletePlacement={handleDeletePlacement}
                  onCallTeacher={handleCallTeacher}
                  onCallKindergarten={handleCallKindergarten}
                />
              ) : (
                <ContractorOverviewGrid
                  classes={classes}
                  onCallTeacher={handleCallTeacher}
                  onCallKindergarten={handleCallKindergarten}
                />
              )}
            </div>
          )}

          {/* TAB 3: INSTRUCTORS CRUD (STAFF) */}
          {contractorTab === 'staff' && (
            <StaffCrudTab
              instructors={instructors}
              onAddInstructor={handleOpenAddInstructor}
              onEditInstructor={handleOpenEditInstructor}
              onDeleteInstructor={handleDeleteInstructor}
              onQuickAssign={(instId) => handleOpenAddPlacement(instId, undefined)}
              onCallTeacher={handleCallTeacher}
            />
          )}

          {/* TAB 4: EDUCATIONAL FACILITIES CRUD (KINDERGARTENS) */}
          {contractorTab === 'kindergartens' && (
            <FacilitiesCrudTab
              facilities={facilities}
              onAddFacility={handleOpenAddFacility}
              onEditFacility={handleOpenEditFacility}
              onDeleteFacility={handleDeleteFacility}
              onQuickAssign={(facId) => handleOpenAddPlacement(undefined, facId)}
              onCallKindergarten={handleCallKindergarten}
            />
          )}

          {/* TAB 5: FINANCIAL SPLIT MANAGER */}
          {contractorTab === 'invoicing' && (
            <FinancialSplitManager initialFinancials={initialTeacherFinancials} />
          )}

          {/* TAB 6: SETTINGS */}
          {contractorTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  {language === 'he' ? 'הגדרות חוזה ותעריפים עירוניים' : 'Contract & Municipal Rate Settings'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'he' ? 'פרמטרים קבועים להפעלת חוגי העשרה לשנת הלימודים תשפ״ו' : 'Standard operational parameters for enrichment enrichment 2026'}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{language === 'he' ? 'תעריף חיוב עירוני סטנדרטי' : 'Default Municipal Billing Rate'}</div>
                    <div className="text-slate-500 text-[11px]">{language === 'he' ? 'קבוע בהסכם מכרז מול עיריית ת״א-יפו' : 'Fixed by municipal tender TLV'}</div>
                  </div>
                  <div className="font-mono font-bold text-sm text-teal-700">₪350 / {language === 'he' ? 'שיעור' : 'class'}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{language === 'he' ? 'פיצול שכר ברירת מחדל למדריך חדש' : 'Default Instructor Split Percentage'}</div>
                    <div className="text-slate-500 text-[11px]">{language === 'he' ? 'ניתן לשינוי פרטני בלשונית פיצול שכר' : 'Customizable per instructor in Financial Split Manager'}</div>
                  </div>
                  <div className="font-mono font-bold text-sm text-teal-700">60% (₪210 / {language === 'he' ? 'שיעור' : 'class'})</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{language === 'he' ? 'רדיוס גדר גיאוגרפית (Geofence)' : 'GPS Geofence Tolerance'}</div>
                    <div className="text-slate-500 text-[11px]">{language === 'he' ? 'מרחק מרבי משער הגן לאימות מיקום אוטומטי' : 'Max allowable distance from school gate'}</div>
                  </div>
                  <div className="font-mono font-bold text-sm text-slate-700">100 {language === 'he' ? 'מטרים' : 'meters'}</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ---------------- Modals ---------------- */}

      {/* Instructor Create / Edit Modal */}
      <InstructorModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
        onSave={handleSaveInstructor}
        instructorToEdit={instructorToEdit}
      />

      {/* Facility Create / Edit Modal */}
      <FacilityModal
        isOpen={isFacilityModalOpen}
        onClose={() => setIsFacilityModalOpen(false)}
        onSave={handleSaveFacility}
        facilityToEdit={facilityToEdit}
      />

      {/* Placement Modal (Assign instructor to facility with time) */}
      <PlacementModal
        isOpen={isPlacementModalOpen}
        onClose={() => setIsPlacementModalOpen(false)}
        onSave={handleSavePlacement}
        instructors={instructors}
        facilities={facilities}
        placementToEdit={placementToEdit}
        initialInstructorId={placementPrefillInstId}
        initialFacilityId={placementPrefillFacId}
      />

    </div>
  );
};
