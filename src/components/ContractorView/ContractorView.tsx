import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContractorTab } from '../../types';
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
  Plus,
  FileSpreadsheet
} from 'lucide-react';

export const ContractorView: React.FC = () => {
  const { contractorTab, setContractorTab, t, language, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterZone, setFilterZone] = useState<'all' | 'north' | 'center' | 'south'>('all');

  const navItems: { id: ContractorTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: t.nav.overview, icon: LayoutDashboard },
    { id: 'staff', label: t.nav.staffManagement, icon: Users2 },
    { id: 'kindergartens', label: t.nav.kindergartens, icon: Building },
    { id: 'shifts', label: t.nav.operationsShifts, icon: CalendarClock },
    { id: 'invoicing', label: t.nav.reportsInvoicing, icon: Receipt },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  // Realistic sample staff deployments
  const staffList = [
    {
      id: '1',
      name: language === 'he' ? 'רונית כהן' : 'Ronit Cohen',
      role: language === 'he' ? 'גננת מובילה' : 'Lead Teacher',
      kindergarten: language === 'he' ? 'גן שושנים (ת״א צפון)' : 'Shoshanim (North TLV)',
      zone: 'north',
      phone: '050-8472911',
      status: 'active',
      checkInTime: '07:28',
    },
    {
      id: '2',
      name: language === 'he' ? 'עידן מור' : 'Idan Mor',
      role: language === 'he' ? 'מדריך תנועה ומוזיקה' : 'Music & Movement Instructor',
      kindergarten: language === 'he' ? 'גן שושנים / גן יסמין' : 'Shoshanim / Yasmin',
      zone: 'north',
      phone: '052-3349102',
      status: 'active',
      checkInTime: '09:15',
    },
    {
      id: '3',
      name: language === 'he' ? 'שירה אלבז' : 'Shira Elbaz',
      role: language === 'he' ? 'סייעת פדגוגית' : 'Teaching Aide',
      kindergarten: language === 'he' ? 'גן אלונים (חולון)' : 'Alonim (Holon)',
      zone: 'center',
      phone: '054-9981203',
      status: 'sick',
      checkInTime: '--:--',
    },
    {
      id: '4',
      name: language === 'he' ? 'יוסף נג׳אר' : 'Youssef Najjar',
      role: language === 'he' ? 'מדריך רובוטיקה והעשרה' : 'Robotics Instructor',
      kindergarten: language === 'he' ? 'גן גומא (יפו)' : 'Goma (Jaffa)',
      zone: 'south',
      phone: '053-1124509',
      status: 'active',
      checkInTime: '08:02',
    },
    {
      id: '5',
      name: language === 'he' ? 'דנה אשכנזי' : 'Dana Ashkenazi',
      role: language === 'he' ? 'כוננית גיבוי / ממלאת מקום' : 'Standby Substitute',
      kindergarten: language === 'he' ? 'כוננות אשכול מרכז' : 'Center Standby Pool',
      zone: 'center',
      phone: '050-4491022',
      status: 'standby',
      checkInTime: '07:00',
    },
  ];

  const filteredStaff = staffList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kindergarten.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = filterZone === 'all' || item.zone === filterZone;
    return matchesSearch && matchesZone;
  });

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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast(language === 'he' ? 'נתוני הפריסה רועננו בהצלחה' : 'Deployment data refreshed', 'success')}
              className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.actions.refreshData}</span>
            </button>
            <button
              type="button"
              onClick={() => showToast(language === 'he' ? 'דוח שיבוצים יומי יוצא ל-CSV' : 'Daily roster exported to CSV', 'success')}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{t.actions.exportReport}</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'מדריכים פעילים בשטח' : 'Active Field Staff'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {t.contractorView.activeInstructors}
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.contractorView.activeInstructorsSub}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'מוסדות וגנים בהפעלה' : 'Managed Preschools'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {t.contractorView.managedPreschools}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {t.contractorView.managedPreschoolsSub}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              {language === 'he' ? 'אחוז כיסוי שיבוצים יומי' : 'Daily Roster Coverage'}
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-mono">
              {t.contractorView.coverageRate}
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">
              {t.contractorView.coverageRateSub}
            </div>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
            <div className="text-xs text-amber-800 font-medium">
              {language === 'he' ? 'בקשות החלפה פתוחות' : 'Open Substitute Requests'}
            </div>
            <div className="text-2xl font-bold text-amber-900 mt-1 tabular-nums font-mono">
              {t.contractorView.openSubstituteRequests}
            </div>
            <div className="text-[11px] text-amber-700 mt-1">
              {t.contractorView.openSubstituteRequestsSub}
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace: Navigation Tabs + Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Sidebar / Segmented Bar */}
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
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      2
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
        <div className="lg:col-span-9 space-y-4">
          
          {/* Urgent Dispatch Notification Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-amber-900">
                  {t.contractorView.urgentNoticeTitle}
                </h2>
                <p className="text-xs text-amber-800 mt-0.5">
                  {t.contractorView.urgentNoticeDesc}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast(language === 'he' ? 'הכוננית דנה אשכנזי שובצה בהצלחה לגן אלונים!' : 'Standby aide Dana Ashkenazi dispatched to Alonim!', 'success')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              {t.contractorView.dispatchAction}
            </button>
          </div>

          {/* Roster & Deployment Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            
            {/* Table Header & Search/Filter Controls */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {t.contractorView.deploymentStatusHeader}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'he' ? 'מעקב בזמן אמת אחר נוכחות מדריכים ושיבוצים' : 'Live tracking of instructor presence & facility placement'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-4 h-4 text-slate-400 absolute start-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.actions.searchPlaceholder}
                    className="w-full text-xs ps-8 pe-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value as any)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
                >
                  <option value="all">{language === 'he' ? 'כל המחוזות' : 'All Zones'}</option>
                  <option value="north">{language === 'he' ? 'מחוז צפון' : 'North'}</option>
                  <option value="center">{language === 'he' ? 'מחוז מרכז' : 'Center'}</option>
                  <option value="south">{language === 'he' ? 'מחוז דרום' : 'South'}</option>
                </select>
              </div>
            </div>

            {/* Table Rows */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'איש/אשת צוות' : 'Staff Member'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'תפקיד' : 'Role'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'מוסד מוצב' : 'Preschool'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'שעת כניסה' : 'Check-In'}</th>
                    <th className="py-2.5 px-4 text-start font-semibold">{language === 'he' ? 'סטטוס' : 'Status'}</th>
                    <th className="py-2.5 px-4 text-end font-semibold">{language === 'he' ? 'פעולה' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                            {staff.name.slice(0, 1)}
                          </div>
                          <span>{staff.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{staff.role}</td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{staff.kindergarten}</td>
                      <td className="py-3 px-4 text-slate-600 font-mono tabular-nums">{staff.checkInTime}</td>
                      <td className="py-3 px-4">
                        {staff.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                            <CheckCircle2 className="w-3 h-3" />
                            {language === 'he' ? 'במשמרת' : 'On Shift'}
                          </span>
                        ) : staff.status === 'sick' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                            <UserX className="w-3 h-3" />
                            {language === 'he' ? 'דיווח מחלה' : 'Sick Leave'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                            <UserCheck className="w-3 h-3" />
                            {language === 'he' ? 'כוננות זמינה' : 'On Standby'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-end">
                        <button
                          type="button"
                          onClick={() => showToast(`${language === 'he' ? 'פתיחת כרטיס עבור' : 'Opening profile for'} ${staff.name}`, 'info')}
                          className="text-xs text-teal-700 hover:text-teal-900 font-medium hover:underline"
                        >
                          {t.actions.viewDetails}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>
                {language === 'he' ? 'מוצגים 5 מתוך 52 אנשי צוות' : 'Showing 5 of 52 rostered staff'}
              </span>
              <button
                type="button"
                onClick={() => showToast(language === 'he' ? 'נטענו עוד 15 רשומות' : 'Loaded 15 more staff members', 'info')}
                className="font-medium text-teal-700 hover:underline"
              >
                {language === 'he' ? 'טען רשומות נוספות' : 'Load more rows'}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
