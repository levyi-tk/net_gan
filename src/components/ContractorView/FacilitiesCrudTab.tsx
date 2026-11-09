import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EducationalFacility } from '../../types';
import {
  Building2,
  Building,
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
  Edit2,
  Trash2,
  CalendarPlus,
  Users,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface FacilitiesCrudTabProps {
  facilities: EducationalFacility[];
  onAddFacility: () => void;
  onEditFacility: (facility: EducationalFacility) => void;
  onDeleteFacility: (facilityId: string) => void;
  onQuickAssign: (facilityId: string) => void;
  onCallKindergarten: (name: string, phone: string) => void;
}

export const FacilitiesCrudTab: React.FC<FacilitiesCrudTabProps> = ({
  facilities,
  onAddFacility,
  onEditFacility,
  onDeleteFacility,
  onQuickAssign,
  onCallKindergarten,
}) => {
  const { t, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState<'all' | 'north' | 'center' | 'south'>('all');
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  const filteredFacilities = facilities.filter((fac) => {
    const isHebrew = language === 'he';
    const name = isHebrew ? fac.nameHe : fac.nameEn;
    const city = isHebrew ? fac.cityHe : fac.cityEn;
    const address = isHebrew ? fac.addressHe : fac.addressEn;
    const contact = isHebrew ? fac.contactPersonHe : fac.contactPersonEn;

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.contactPhone.includes(searchQuery);

    const matchesZone = zoneFilter === 'all' || fac.zone === zoneFilter;

    return matchesSearch && matchesZone;
  });

  const totalStudents = facilities.reduce((acc, curr) => acc + curr.totalStudents, 0);

  const confirmDelete = () => {
    if (deleteCandidateId) {
      onDeleteFacility(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Metric Counters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-600" />
              <span>{t.contractorView.facilitiesTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contractorView.facilitiesSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onAddFacility}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.contractorView.addFacility}</span>
          </button>
        </div>

        {/* 3 Metric Summary Counters */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">
              {language === 'he' ? 'מוסדות בהפעלה' : 'Managed Preschools'}
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {facilities.length}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <div className="text-[11px] text-blue-800 font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'he' ? 'ילדים נהנים מהעשרה' : 'Enrolled Children'}</span>
            </div>
            <div className="text-xl font-bold font-mono text-blue-900 mt-0.5">
              {totalStudents}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'he' ? 'גדר GPS מוגדרת' : 'GPS Geofenced'}</span>
            </div>
            <div className="text-xl font-bold font-mono text-emerald-900 mt-0.5">
              100%
            </div>
          </div>
        </div>

        {/* Search & Zone Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.actions.searchPlaceholder}
              className="w-full text-xs ps-9 pe-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value as any)}
            className="text-xs px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">{language === 'he' ? 'כל המחוזות' : 'All Districts'}</option>
            <option value="center">{language === 'he' ? 'מחוז מרכז' : 'Center'}</option>
            <option value="north">{language === 'he' ? 'מחוז צפון' : 'North'}</option>
            <option value="south">{language === 'he' ? 'מחוז דרום' : 'South'}</option>
          </select>
        </div>
      </div>

      {/* Facilities Grid View */}
      {filteredFacilities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
          {t.contractorView.noFacilitiesFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((fac) => {
            const isHebrew = language === 'he';
            const name = isHebrew ? fac.nameHe : fac.nameEn;
            const city = isHebrew ? fac.cityHe : fac.cityEn;
            const address = isHebrew ? fac.addressHe : fac.addressEn;
            const contactPerson = isHebrew ? fac.contactPersonHe : fac.contactPersonEn;
            const ageGroup = isHebrew ? fac.ageGroupHe : fac.ageGroupEn;

            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                      {city}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 font-mono">
                      <Compass className="w-3 h-3 text-slate-400" />
                      <span>{fac.geofenceRadiusMeters} {language === 'he' ? 'מ׳ GPS' : 'm GPS'}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {name}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{address}</span>
                  </div>

                  {/* Details Pill Row */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 flex-wrap text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                      {ageGroup}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono">
                      {fac.totalStudents} {language === 'he' ? 'ילדים' : 'kids'}
                    </span>
                    {fac.notes && (
                      <span className="text-[11px] text-slate-500 truncate max-w-[200px]" title={fac.notes}>
                        • {fac.notes}
                      </span>
                    )}
                  </div>

                  {/* Contact Box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {language === 'he' ? 'איש/אשת קשר בגן:' : 'Preschool Contact:'}
                      </div>
                      <div className="font-bold text-slate-800">{contactPerson}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onCallKindergarten(name, fac.contactPhone)}
                      className="px-2 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-mono font-medium text-slate-700 flex items-center gap-1 transition-colors"
                      title={t.contractorView.callKindergarten}
                    >
                      <Phone className="w-3 h-3 text-teal-600" />
                      <span>{fac.contactPhone}</span>
                    </button>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onQuickAssign(fac.id)}
                    className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs flex items-center gap-1.5 transition-colors border border-teal-200"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-teal-600" />
                    <span>{language === 'he' ? 'שבץ מדריך' : 'Assign Instructor'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEditFacility(fac)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                      title={t.contractorView.editFacility}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteCandidateId(fac.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                      title={t.contractorView.deleteFacility}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidateId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold text-slate-900">
                {t.contractorView.deleteFacility}
              </h4>
              <p className="text-slate-500 mt-1">
                {t.contractorView.deleteFacilityConfirm}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidateId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-100"
              >
                {language === 'he' ? 'ביטול' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                {language === 'he' ? 'כן, מחק' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
