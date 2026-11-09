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
