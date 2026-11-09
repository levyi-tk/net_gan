import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EducationalFacility } from '../../types';
import { X, Building2, Save, MapPin, Phone, Mail, Users, Compass } from 'lucide-react';

interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (facility: EducationalFacility) => void;
  facilityToEdit?: EducationalFacility | null;
}

export const FacilityModal: React.FC<FacilityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  facilityToEdit,
}) => {
  const { t, language } = useApp();

  const [nameHe, setNameHe] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [cityHe, setCityHe] = useState('');
  const [cityEn, setCityEn] = useState('');
  const [addressHe, setAddressHe] = useState('');
  const [addressEn, setAddressEn] = useState('');
  const [zone, setZone] = useState<'north' | 'center' | 'south'>('center');
  const [contactPersonHe, setContactPersonHe] = useState('');
  const [contactPersonEn, setContactPersonEn] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [ageGroupHe, setAgeGroupHe] = useState('');
  const [ageGroupEn, setAgeGroupEn] = useState('');
  const [totalStudents, setTotalStudents] = useState(20);
  const [geofenceRadiusMeters, setGeofenceRadiusMeters] = useState(100);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (facilityToEdit) {
      setNameHe(facilityToEdit.nameHe || '');
      setNameEn(facilityToEdit.nameEn || '');
      setCityHe(facilityToEdit.cityHe || '');
      setCityEn(facilityToEdit.cityEn || '');
      setAddressHe(facilityToEdit.addressHe || '');
      setAddressEn(facilityToEdit.addressEn || '');
      setZone(facilityToEdit.zone || 'center');
      setContactPersonHe(facilityToEdit.contactPersonHe || '');
      setContactPersonEn(facilityToEdit.contactPersonEn || '');
      setContactPhone(facilityToEdit.contactPhone || '');
      setContactEmail(facilityToEdit.contactEmail || '');
      setAgeGroupHe(facilityToEdit.ageGroupHe || '');
      setAgeGroupEn(facilityToEdit.ageGroupEn || '');
      setTotalStudents(facilityToEdit.totalStudents || 20);
      setGeofenceRadiusMeters(facilityToEdit.geofenceRadiusMeters || 100);
      setNotes(facilityToEdit.notes || '');
    } else {
      setNameHe('');
      setNameEn('');
      setCityHe(language === 'he' ? 'תל אביב' : 'Tel Aviv');
      setCityEn('Tel Aviv');
      setAddressHe('');
      setAddressEn('');
      setZone('center');
      setContactPersonHe('');
      setContactPersonEn('');
      setContactPhone('05');
      setContactEmail('');
      setAgeGroupHe(language === 'he' ? 'גילאי 3-4 (טרום חובה)' : 'Ages 3-4 (Pre-K)');
      setAgeGroupEn('Ages 3-4 (Pre-K)');
      setTotalStudents(20);
      setGeofenceRadiusMeters(100);
      setNotes('');
    }
  }, [facilityToEdit, isOpen, language]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameHe.trim() && !nameEn.trim()) return;

    const savedFacility: EducationalFacility = {
      id: facilityToEdit ? facilityToEdit.id : `fac-${Date.now()}`,
      nameHe: nameHe.trim() || nameEn.trim(),
      nameEn: nameEn.trim() || nameHe.trim(),
      cityHe: cityHe.trim() || (language === 'he' ? 'תל אביב' : 'Tel Aviv'),
      cityEn: cityEn.trim() || 'Tel Aviv',
      addressHe: addressHe.trim() || nameHe.trim(),
      addressEn: addressEn.trim() || nameEn.trim(),
      zone,
      contactPersonHe: contactPersonHe.trim() || (language === 'he' ? 'מנהלת הגן' : 'Director'),
      contactPersonEn: contactPersonEn.trim() || 'Director',
      contactPhone: contactPhone.trim() || '050-0000000',
      contactEmail: contactEmail.trim(),
      ageGroupHe: ageGroupHe.trim() || (language === 'he' ? 'גילאי 3-5' : 'Ages 3-5'),
      ageGroupEn: ageGroupEn.trim() || 'Ages 3-5',
      totalStudents: Math.max(1, totalStudents),
      geofenceRadiusMeters: Math.max(30, Math.min(500, geofenceRadiusMeters)),
      notes: notes.trim(),
      assignedInstructorsCount: facilityToEdit?.assignedInstructorsCount || 0,
    };

    onSave(savedFacility);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {facilityToEdit ? t.contractorView.editFacility : t.contractorView.addFacility}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'he'
                  ? 'הקמת גן ילדים חדש בחוזה הפעלה, הגדרת איש קשר ורדיוס GPS'
                  : 'Register a kindergarten facility, on-site contact, and GPS verification boundary'}
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
          
          {/* Facility Names Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityNameHe} *
              </label>
              <input
                type="text"
                required
                value={nameHe}
                onChange={(e) => setNameHe(e.target.value)}
                placeholder="לדוגמה: גן שושנים"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityNameEn}
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Gan Shoshanim"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* City & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityCity} *
              </label>
              <input
                type="text"
                required
                value={cityHe}
                onChange={(e) => setCityHe(e.target.value)}
                placeholder="תל אביב / חולון / רמת גן"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityAddressHe} *
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={addressHe}
                  onChange={(e) => setAddressHe(e.target.value)}
                  placeholder="רחוב וייצמן 42"
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* On-Site Contact Person & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityContactPerson} *
              </label>
              <input
                type="text"
                required
                value={contactPersonHe}
                onChange={(e) => setContactPersonHe(e.target.value)}
                placeholder="חנה לוי (מנהלת גן)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityContactPhone} *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="054-2211993"
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Cohort, Enrolled Count & Geofence GPS Radius */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityTotalStudents}
              </label>
              <div className="relative">
                <Users className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="5"
                  max="40"
                  value={totalStudents}
                  onChange={(e) => setTotalStudents(Number(e.target.value) || 20)}
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {t.contractorView.facilityGeofenceRadius}
              </label>
              <div className="relative">
                <Compass className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="30"
                  max="500"
                  step="10"
                  value={geofenceRadiusMeters}
                  onChange={(e) => setGeofenceRadiusMeters(Number(e.target.value) || 100)}
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{language === 'he' ? 'מ׳' : 'm'}</span>
              </div>
            </div>
          </div>

          {/* Access Notes / Gate Code */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {t.contractorView.facilityNotes}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="קוד כניסה לשער, הנחיות חניה למדריכים, מיקום מרחב מוגן"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
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
              <span>{language === 'he' ? 'שמור מוסד' : 'Save Facility'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
