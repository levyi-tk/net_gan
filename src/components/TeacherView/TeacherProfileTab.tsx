import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, ShieldCheck, Phone, Mail, Award, Building, LogOut } from 'lucide-react';

export const TeacherProfileTab: React.FC = () => {
  const { t, language, showToast } = useApp();

  return (
    <div className="space-y-4 pb-4">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs text-center">
        <div className="w-16 h-16 rounded-full bg-teal-700 text-white font-bold text-xl flex items-center justify-center mx-auto mb-2 shadow-xs ring-4 ring-teal-50">
          {language === 'he' ? 'רכ' : 'RC'}
        </div>
        <h2 className="text-base font-bold text-slate-900">
          {language === 'he' ? 'רונית כהן' : 'Ronit Cohen'}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'he' ? 'גננת מובילה • דרגה 6' : 'Lead Preschool Teacher • Grade 6'}
        </p>
        <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-medium border border-teal-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'he' ? 'הסמכת עזרה ראשונה בתוקף' : 'First Aid Certified'}</span>
        </div>
      </div>

      {/* Information Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs divide-y divide-slate-100 text-xs">
        <div className="py-2.5 flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-400" />
            {language === 'he' ? 'גן משויך' : 'Assigned Preschool'}
          </span>
          <span className="font-semibold text-slate-800">
            {language === 'he' ? 'גן שושנים (מחוז ת״א)' : 'Shoshanim (Tel Aviv)'}
          </span>
        </div>

        <div className="py-2.5 flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-2">
            <Award className="w-4 h-4 text-slate-400" />
            {language === 'he' ? 'קבלן מעסיק' : 'Operating Contractor'}
          </span>
          <span className="font-semibold text-slate-800">
            {language === 'he' ? 'אורנים שירותי חינוך בע״מ' : 'Oranim Educational Services'}
          </span>
        </div>

        <div className="py-2.5 flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            {language === 'he' ? 'טלפון חירום מפקחת' : 'Supervisor Emergency Line'}
          </span>
          <a
            href="tel:03-5550192"
            onClick={(e) => {
              e.preventDefault();
              showToast(language === 'he' ? 'חיוג למפקחת אזורית: 03-555-0192' : 'Calling regional supervisor...', 'info');
            }}
            className="font-mono text-teal-600 font-semibold hover:underline"
          >
            03-555-0192
          </a>
        </div>

        <div className="py-2.5 flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            {language === 'he' ? 'דוא״ל מערכתי' : 'System Email'}
          </span>
          <span className="font-mono text-slate-700">
            ronit.c@gannet-tlv.edu
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => showToast(language === 'he' ? 'פעולת פרוטוטייפ: התנתקות' : 'Prototype action: Logged out', 'info')}
        className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 font-semibold text-xs flex items-center justify-center gap-2 transition-colors min-h-[44px]"
      >
        <LogOut className="w-4 h-4" />
        <span>{language === 'he' ? 'יציאה מהחשבון' : 'Sign Out'}</span>
      </button>
    </div>
  );
};
