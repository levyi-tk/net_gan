import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MunicipalityTab } from '../../types';
import {
  Landmark,
  ShieldCheck,
  BarChart3,
  Users,
  AlertTriangle,
  FileCheck2,
  Building,
  CheckCircle2,
  TrendingUp,
  Download,
  Filter,
  Eye,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const MunicipalityView: React.FC = () => {
  const { municipalityTab, setMunicipalityTab, t, language, showToast } = useApp();
  const [selectedCluster, setSelectedCluster] = useState<'all' | 'north' | 'center' | 'south'>('all');

  const navItems: { id: MunicipalityTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: t.nav.municipalOverview, icon: Landmark },
    { id: 'supervision', label: t.nav.supervisionQuality, icon: ShieldCheck },
    { id: 'attendance', label: t.nav.attendanceCapacity, icon: Users },
    { id: 'slas', label: t.nav.contractorSLAs, icon: BarChart3 },
    { id: 'incidents', label: t.nav.incidentsAlerts, icon: AlertTriangle },
    { id: 'audits', label: t.nav.exportAudits, icon: FileCheck2 },
  ];

  // Contractor Benchmarking Data
  const contractors = [
    {
      id: '1',
      name: language === 'he' ? 'אורנים שירותי חינוך בע״מ' : 'Oranim Educational Services',
      preschools: 28,
      slaScore: '98.5%',
      staffCompliance: '99.1%',
      status: 'excellent',
      grade: 'A+',
    },
    {
      id: '2',
      name: language === 'he' ? 'אלומה פתרונות חינוך' : 'Aluma Education Solutions',
      preschools: 18,
      slaScore: '97.2%',
      staffCompliance: '96.8%',
      status: 'good',
      grade: 'A',
    },
    {
      id: '3',
      name: language === 'he' ? 'קשת לגיל הרך בע״מ' : 'Keshet Early Childhood',
      preschools: 12,
      slaScore: '96.4%',
      staffCompliance: '95.0%',
      status: 'good',
      grade: 'B+',
    },
    {
      id: '4',
      name: language === 'he' ? 'מרחבים שירותי קהילה' : 'Merhavim Community Services',
      preschools: 6,
      slaScore: '95.1%',
      staffCompliance: '94.2%',
      status: 'warning',
      grade: 'B',
    },
  ];

  const districtClusters = [
    {
      id: 'north',
      name: language === 'he' ? 'אשכול צפון (עבר הירקון ורמת אביב)' : 'North District',
      preschools: 24,
      enrolled: 690,
      attendance: '93.4%',
      safetyStatus: '100% תקין',
    },
    {
      id: 'center',
      name: language === 'he' ? 'אשכול מרכז (לב העיר והצפון הישן)' : 'Center District',
      preschools: 22,
      enrolled: 630,
      attendance: '91.8%',
      safetyStatus: '100% תקין',
    },
    {
      id: 'south',
      name: language === 'he' ? 'אשכול דרום (יפו ודרום העיר)' : 'South District',
      preschools: 18,
      enrolled: 522,
      attendance: '90.1%',
      safetyStatus: '2 בבדיקה',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Top Welcome & Oversight Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.roles.municipality.badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {t.municipalityView.welcomeTitle}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              {t.municipalityView.welcomeSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast(language === 'he' ? 'כל מדדי הבקרה והאיכות סונכרנו' : 'Municipal oversight metrics synced', 'success')}
              className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.actions.refreshData}</span>
            </button>
            <button
              type="button"
              onClick={() => showToast(language === 'he' ? 'דוח פיקוח עירוני נשלח למנהלת המחוז' : 'Executive audit report generated', 'success')}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.actions.exportReport}</span>
            </button>
          </div>
        </div>

        {/* 4 Municipal Oversight KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'סך ילדים רשומים בעיר' : 'Total Enrolled Children'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {t.municipalityView.totalEnrolled}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {t.municipalityView.totalEnrolledSub}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'מדד SLA ואיכות קבלנים' : 'Contractor SLA Index'}
            </div>
            <div className="text-2xl font-bold text-teal-800 mt-1 tabular-nums font-mono">
              {t.municipalityView.contractorScore}
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">
              {t.municipalityView.contractorScoreSub}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'נוכחות עירונית בזמן אמת' : 'Citywide Attendance'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {t.municipalityView.districtAttendance}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {t.municipalityView.districtAttendanceSub}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'עמידה במבדקי בטיחות' : 'Safety Compliance'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {t.municipalityView.safetyCompliance}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {t.municipalityView.safetyComplianceSub}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Sidebar Navigation + Main Municipal Oversight Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = municipalityTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMunicipalityTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-start ${
                    isActive
                      ? 'bg-purple-50 text-purple-900 font-semibold border border-purple-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'incidents' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      0
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-slate-100 px-3">
            <div className="text-[11px] text-slate-400">
              {language === 'he' ? 'סטטוס ביקורת עירוני:' : 'Audit Status:'}
            </div>
            <div className="text-xs font-medium text-emerald-700 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.municipalityView.auditStatus}</span>
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* District Clusters Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 mb-3">
              {t.municipalityView.cityMapHeader}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {districtClusters.map((cluster) => (
                <div
                  key={cluster.id}
                  onClick={() => setSelectedCluster(cluster.id as any)}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 cursor-pointer transition-all hover:border-teal-300"
                >
                  <div className="text-xs font-bold text-slate-800">
                    {cluster.name}
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>{language === 'he' ? 'גנים פעילים:' : 'Preschools:'}</span>
                      <span className="font-semibold text-slate-800 tabular-nums">{cluster.preschools}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'he' ? 'ילדים רשומים:' : 'Enrolled:'}</span>
                      <span className="font-semibold text-slate-800 tabular-nums">{cluster.enrolled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'he' ? 'נוכחות היום:' : 'Today Attendance:'}</span>
                      <span className="font-bold text-teal-700 tabular-nums">{cluster.attendance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contractor Performance & Benchmark Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {t.municipalityView.contractorOverviewHeader}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'he' ? 'מעקב אחר עמידה בתנאי המכרז ואיכות השירות' : 'Oversight of tender requirements and service delivery quality'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast(language === 'he' ? 'דוח ציוני ספקים הופק בהצלחה' : 'Vendor scorecards generated', 'info')}
                className="text-xs text-purple-700 hover:text-purple-900 font-semibold"
              >
                {t.actions.viewDetails}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'קבלן מפעיל' : 'Contractor'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'גנים בהפעלה' : 'Preschools'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'ציון SLA' : 'SLA Score'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'עמידה בתקני צוות' : 'Staff Compliance'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'דירוג' : 'Grade'}</th>
                    <th className="py-2.5 px-4 text-end font-semibold">{language === 'he' ? 'פעולה' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contractors.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">{c.name}</td>
                      <td className="py-3 px-4 text-slate-700 font-mono tabular-nums">{c.preschools}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900 tabular-nums">{c.slaScore}</td>
                      <td className="py-3 px-4 font-mono text-teal-700 font-medium tabular-nums">{c.staffCompliance}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                          {c.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-end">
                        <button
                          type="button"
                          onClick={() => showToast(`${language === 'he' ? 'מציג תיק ספק מלא עבור' : 'Opening dossier for'} ${c.name}`, 'info')}
                          className="text-xs text-purple-700 hover:text-purple-900 font-medium hover:underline inline-flex items-center gap-1"
                        >
                          <span>{t.actions.viewDetails}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
