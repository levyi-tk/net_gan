export type Role = 'teacher' | 'contractor' | 'municipality';

export type Language = 'he' | 'en';

export type TeacherTab = 'classes' | 'schedule' | 'feed' | 'profile';

export type ContractorTab = 'overview' | 'staff' | 'kindergartens' | 'shifts' | 'invoicing' | 'settings';

export type MunicipalityTab = 'overview' | 'supervision' | 'attendance' | 'slas' | 'incidents' | 'audits';

export type ScheduleViewMode = 'daily' | 'weekly' | 'monthly';

export interface UserPersona {
  name: string;
  role: Role;
  roleTitleHe: string;
  roleTitleEn: string;
  organizationHe: string;
  organizationEn: string;
  avatarBg: string;
}

export interface MetricCardData {
  id: string;
  label: string;
  value: string | number;
  subValue?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface Student {
  id: string;
  nameHe: string;
  nameEn: string;
  avatarBg: string;
  status: 'present' | 'absent' | 'late';
  allergyHe?: string;
  allergyEn?: string;
  parentNameHe: string;
  parentNameEn: string;
  parentPhone: string;
}

export interface ClassSession {
  id: string;
  nameHe: string;
  nameEn: string;
  addressHe: string;
  addressEn: string;
  timeSlot: string;
  roomHe: string;
  roomEn: string;
  ageGroupHe: string;
  ageGroupEn: string;
  targetLat: number;
  targetLng: number;
  students: Student[];
}

export interface EnrichmentClassEvent {
  id: string;
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: number; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri
  startTime: string; // e.g. "10:00"
  endTime: string;   // e.g. "11:15"
  kindergartenNameHe: string;
  kindergartenNameEn: string;
  cityHe: string;
  cityEn: string;
  addressHe: string;
  addressEn: string;
  subjectHe: string;
  subjectEn: string;
  ageGroupHe: string;
  ageGroupEn: string;
  contactNameHe: string;
  contactNameEn: string;
  contactPhone: string;
  transitMinutesFromPrev?: number;
  transitKmFromPrev?: number;
  reminderActive: boolean;
  status: 'completed' | 'current' | 'upcoming';
  equipmentHe?: string;
  equipmentEn?: string;
}

export type GeoVerificationStatus = 'idle' | 'checking' | 'verified' | 'out_of_range';

export interface DailyLogPost {
  id: string;
  time: string;
  authorHe: string;
  authorEn: string;
  titleHe: string;
  titleEn: string;
  textHe: string;
  textEn: string;
  categoryHe: string;
  categoryEn: string;
  photoUrl?: string;
  mealNotesHe?: string;
  mealNotesEn?: string;
  napNotesHe?: string;
  napNotesEn?: string;
  likes: number;
  commentsCount: number;
}

export interface ContractorClassSession {
  id: string;
  kindergartenNameHe: string;
  kindergartenNameEn: string;
  cityHe: string;
  cityEn: string;
  addressHe: string;
  addressEn: string;
  teacherId: string;
  teacherNameHe: string;
  teacherNameEn: string;
  teacherPhone: string;
  subjectHe: string;
  subjectEn: string;
  ageGroupHe: string;
  ageGroupEn: string;
  scheduledTime: string;
  status: 'active' | 'completed' | 'upcoming';
  timerSecondsElapsed: number;
  timerTotalDurationMinutes: number;
  isTimerRunning: boolean;
  gpsStatus: 'verified' | 'out_of_range' | 'pending';
  gpsDistanceMeters: number;
  gpsTimestamp?: string;
  attendanceCount: number;
  totalStudents: number;
  hasLogSubmitted: boolean;
  contactPersonHe: string;
  contactPersonEn: string;
  contactPhone: string;
}

export interface TeacherFinancialRecord {
  id: string;
  teacherNameHe: string;
  teacherNameEn: string;
  subjectHe: string;
  subjectEn: string;
  phone: string;
  completedClasses: number;
  percentageSplit: number;
  seniorityLevelHe: string;
  seniorityLevelEn: string;
  isPayrollApproved: boolean;
}

export interface ContractorAlertItem {
  id: string;
  type: 'late_checkin' | 'missing_log' | 'gps_anomaly';
  severity: 'urgent' | 'warning' | 'info';
  teacherId: string;
  teacherNameHe: string;
  teacherNameEn: string;
  teacherPhone: string;
  kindergartenNameHe: string;
  kindergartenNameEn: string;
  timeSlot: string;
  messageHe: string;
  messageEn: string;
  detectedAt: string;
  status: 'active' | 'resolved';
}

export interface InstructorItem {
  id: string;
  nameHe: string;
  nameEn: string;
  roleHe: string;
  roleEn: string;
  subjectHe: string;
  subjectEn: string;
  phone: string;
  email: string;
  zone: 'north' | 'center' | 'south';
  status: 'active' | 'standby' | 'sick' | 'inactive';
  seniorityHe: string;
  seniorityEn: string;
  defaultSplit: number; // e.g. 60
  avatarBg?: string;
  notes?: string;
  assignedFacilitiesCount?: number;
}

export interface EducationalFacility {
  id: string;
  nameHe: string;
  nameEn: string;
  cityHe: string;
  cityEn: string;
  addressHe: string;
  addressEn: string;
  zone: 'north' | 'center' | 'south';
  contactPersonHe: string;
  contactPersonEn: string;
  contactPhone: string;
  contactEmail?: string;
  ageGroupHe: string;
  ageGroupEn: string;
  totalStudents: number;
  geofenceRadiusMeters: number;
  notes?: string;
  assignedInstructorsCount?: number;
}

export interface ClassPlacementAssignment {
  id: string;
  facilityId: string;
  facilityNameHe: string;
  facilityNameEn: string;
  cityHe: string;
  cityEn: string;
  addressHe: string;
  addressEn: string;
  instructorId: string;
  instructorNameHe: string;
  instructorNameEn: string;
  instructorPhone: string;
  subjectHe: string;
  subjectEn: string;
  ageGroupHe: string;
  ageGroupEn: string;
  scheduleType: 'recurring_weekly' | 'specific_date';
  specificDate?: string; // YYYY-MM-DD
  dayOfWeek: number; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri
  recurringWeekdays?: number[]; // [0, 2] for Sun + Tue
  startTime: string; // 24h format "14:00"
  endTime: string;   // 24h format "15:30"
  ratePerClass: number; // ₪350
  teacherSplit: number; // 60%
  status: 'active' | 'upcoming' | 'completed';
  contactPersonHe: string;
  contactPersonEn: string;
  contactPhone: string;
}
