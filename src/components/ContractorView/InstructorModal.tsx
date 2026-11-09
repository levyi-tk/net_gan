import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { InstructorItem } from '../../types';
import { X, UserPlus, Save, Sparkles, Phone, Mail, MapPin, Award, Percent } from 'lucide-react';

interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (instructor: InstructorItem) => void;
  instructorToEdit?: InstructorItem | null;
}

export const InstructorModal: React.FC<InstructorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  instructorToEdit,
}) => {
  const { t, language } = useApp();

  const [nameHe, setNameHe] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [roleHe, setRoleHe] = useState('');
  const [roleEn, setRoleEn] = useState('');
  const [subjectHe, setSubjectHe] = useState('');
  const [subjectEn, setSubjectEn] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zone, setZone] = useState<'north' | 'center' | 'south'>('center');
  const [status, setStatus] = useState<'active' | 'standby' | 'sick' | 'inactive'>('active');
  const [seniorityHe, setSeniorityHe] = useState('');
  const [seniorityEn, setSeniorityEn] = useState('');
  const [defaultSplit, setDefaultSplit] = useState(60);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (instructorToEdit) {
      setNameHe(instructorToEdit.nameHe || '');
      setNameEn(instructorToEdit.nameEn || '');
      setRoleHe(instructorToEdit.roleHe || '');
      setRoleEn(instructorToEdit.roleEn || '');
      setSubjectHe(instructorToEdit.subjectHe || '');
      setSubjectEn(instructorToEdit.subjectEn || '');
      setPhone(instructorToEdit.phone || '');
      setEmail(instructorToEdit.email || '');
      setZone(instructorToEdit.zone || 'center');
      setStatus(instructorToEdit.status || 'active');
      setSeniorityHe(instructorToEdit.seniorityHe || '');
      setSeniorityEn(instructorToEdit.seniorityEn || '');
      setDefaultSplit(instructorToEdit.defaultSplit || 60);
      setNotes(instructorToEdit.notes || '');
    } else {
      // Defaults for new instructor
      setNameHe('');
      setNameEn('');
      setRoleHe(language === 'he' ? 'מדריך/ת העשרה' : 'Enrichment Instructor');
      setRoleEn('Enrichment Instructor');
      setSubjectHe('');
      setSubjectEn('');
      setPhone('05');
      setEmail('');
      setZone('center');
      setStatus('active');
      setSeniorityHe(language === 'he' ? 'שנה ראשונה' : '1st year');
      setSeniorityEn('1st year');
      setDefaultSplit(60);
      setNotes('');
    }
  }, [instructorToEdit, isOpen, language]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameHe.trim() && !nameEn.trim()) return;

    const savedInstructor: InstructorItem = {
      id: instructorToEdit ? instructorToEdit.id : `inst-${Date.now()}`,
      nameHe: nameHe.trim() || nameEn.trim(),
      nameEn: nameEn.trim() || nameHe.trim(),
      roleHe: roleHe.trim() || (language === 'he' ? 'מדריך/ת העשרה' : 'Instructor'),
      roleEn: roleEn.trim() || 'Enrichment Instructor',
      subjectHe: subjectHe.trim() || (language === 'he' ? 'העשרה כללית' : 'General Enrichment'),
      subjectEn: subjectEn.trim() || 'General Enrichment',
      phone: phone.trim() || '050-0000000',
      email: email.trim() || 'instructor@oranim-edu.co.il',
      zone,
      status,
      seniorityHe: seniorityHe.trim() || 'מוסמך',
      seniorityEn: seniorityEn.trim() || 'Certified',
      defaultSplit: Math.max(10, Math.min(95, defaultSplit)),
      notes: notes.trim(),
      assignedFacilitiesCount: instructorToEdit?.assignedFacilitiesCount || 0,
      avatarBg: instructorToEdit?.avatarBg || 'bg-teal-600',
    };

    onSave(savedInstructor);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {instructorToEdit ? t.contractorView.editInstructor : t.contractorView.addInstructor}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'he'
                  ? 'הגדרת פרטי איש/אשת צוות שטח, תחום העשרה ואחוזי שכר'
                  : 'Configure field instructor profile, discipline, and compensation split'}
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
          
          {/* Names Row (Hebrew & English) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorNameHe} *
              </label>
              <input
                type="text"
                required
                value={nameHe}
                onChange={(e) => setNameHe(e.target.value)}
                placeholder="לדוגמה: רונית כהן"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorNameEn}
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Ronit Cohen"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Subject / Specialty & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorSubject} *
              </label>
              <input
                type="text"
                required
                value={subjectHe}
                onChange={(e) => setSubjectHe(e.target.value)}
                placeholder="לדוגמה: תנועה, מוזיקה ומקצב / רובוטיקה"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorRole}
              </label>
              <input
                type="text"
                value={roleHe}
                onChange={(e) => setRoleHe(e.target.value)}
                placeholder="לדוגמה: מדריכה בכירה / כוננית"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Contact Details: Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorPhone} *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="050-1234567"
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorEmail}
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="instructor@oranim.co.il"
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* District Zone, Status, and Default Split */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorZone}
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="center">{language === 'he' ? 'מחוז מרכז (גוש דן)' : 'Center'}</option>
                <option value="north">{language === 'he' ? 'מחוז צפון' : 'North'}</option>
                <option value="south">{language === 'he' ? 'מחוז דרום' : 'South'}</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorStatus}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="active">{language === 'he' ? 'פעיל/ה בשטח' : 'Active'}</option>
                <option value="standby">{language === 'he' ? 'כוננות זמינה' : 'Standby'}</option>
                <option value="sick">{language === 'he' ? 'חופשה / מחלה' : 'On Leave'}</option>
                <option value="inactive">{language === 'he' ? 'לא פעיל/ה' : 'Inactive'}</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorDefaultSplit}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="90"
                  value={defaultSplit}
                  onChange={(e) => setDefaultSplit(Number(e.target.value) || 60)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </div>
          </div>

          {/* Seniority & Internal Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.instructorSeniority}
              </label>
              <input
                type="text"
                value={seniorityHe}
                onChange={(e) => setSeniorityHe(e.target.value)}
                placeholder="לדוגמה: 3+ שנים, בוגר וינגייט"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === 'he' ? 'הערות מפעיל וציוד נייד' : 'Notes & Equipment'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="לדוגמה: בעל רכב, ערכות רובוטיקה עצמאיות"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
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
              <span>{language === 'he' ? 'שמור מדריך' : 'Save Instructor'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
