import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherFinancialRecord } from '../../types';
import {
  Coins,
  TrendingUp,
  Building,
  Users2,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Percent,
  Sliders,
  DollarSign,
  ChevronUp,
  ChevronDown,
  Info
} from 'lucide-react';

interface FinancialSplitManagerProps {
  initialFinancials: TeacherFinancialRecord[];
}

export const FinancialSplitManager: React.FC<FinancialSplitManagerProps> = ({
  initialFinancials,
}) => {
  const { t, language, showToast } = useApp();

  // Municipal rate charged per verified class
  const [municipalRate, setMunicipalRate] = useState<number>(350);
  // Default fallback teacher share percentage
  const [defaultSplit, setDefaultSplit] = useState<number>(60);
  // Teacher records with individual customizable percentage splits
  const [records, setRecords] = useState<TeacherFinancialRecord[]>(initialFinancials);
  // Active editing row id
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);

  // Update a specific teacher's split percentage
  const handleUpdateSplit = (teacherId: string, newSplit: number) => {
    const clamped = Math.max(10, Math.min(95, newSplit));
    setRecords((prev) =>
      prev.map((r) => (r.id === teacherId ? { ...r, percentageSplit: clamped } : r))
    );
  };

  // Reset a specific teacher to the default split
  const handleResetTeacherSplit = (teacherId: string) => {
    handleUpdateSplit(teacherId, defaultSplit);
    showToast(t.contractorView.splitUpdatedToast, 'info');
  };

  // Toggle approval status for payroll
  const handleToggleApproval = (teacherId: string) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id === teacherId) {
          const nextState = !r.isPayrollApproved;
          if (nextState) {
            showToast(t.contractorView.payrollApprovedToast, 'success');
          }
          return { ...r, isPayrollApproved: nextState };
        }
        return r;
      })
    );
  };

  // Aggregated calculations
  const totalVerifiedClasses = records.reduce((acc, curr) => acc + curr.completedClasses, 0);
  const totalMunicipalBilled = totalVerifiedClasses * municipalRate;

  // Teacher payout = completedClasses * (municipalRate * (percentageSplit / 100))
  const totalTeacherPayroll = records.reduce((acc, curr) => {
    const perClassTeacher = municipalRate * (curr.percentageSplit / 100);
    return acc + curr.completedClasses * perClassTeacher;
  }, 0);

  const totalContractorMargin = totalMunicipalBilled - totalTeacherPayroll;
  const overallMarginPercentage = totalMunicipalBilled > 0
    ? ((totalContractorMargin / totalMunicipalBilled) * 100).toFixed(1)
    : '0.0';

  // Export report to CSV
  const handleExportCSV = () => {
    const headers = [
      'Teacher ID',
      'Teacher Name',
      'Subject',
      'Verified Classes',
      'Municipal Rate',
      'Teacher Share %',
      'Teacher Rate/Class',
      'Contractor Rate/Class',
      'Total Teacher Payout',
      'Total Agency Profit',
      'Payroll Approved'
    ];

    const rows = records.map((r) => {
      const teacherClassRate = (municipalRate * (r.percentageSplit / 100)).toFixed(2);
      const agencyClassRate = (municipalRate * ((100 - r.percentageSplit) / 100)).toFixed(2);
      const totalTeacher = (r.completedClasses * (municipalRate * (r.percentageSplit / 100))).toFixed(2);
      const totalAgency = (r.completedClasses * (municipalRate * ((100 - r.percentageSplit) / 100))).toFixed(2);
      const teacherName = language === 'he' ? r.teacherNameHe : r.teacherNameEn;
      const subject = language === 'he' ? r.subjectHe : r.subjectEn;

      return [
        r.id,
        `"${teacherName}"`,
        `"${subject}"`,
        r.completedClasses,
        municipalRate,
        `${r.percentageSplit}%`,
        teacherClassRate,
        agencyClassRate,
        totalTeacher,
        totalAgency,
        r.isPayrollApproved ? 'YES' : 'NO'
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `financial_split_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(language === 'he' ? 'קובץ פיצול שכר יוצא בהצלחה!' : 'Financial split CSV exported successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Configuration & Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-5 h-5 text-teal-600" />
              <span>{t.contractorView.financialManagerTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contractorView.financialManagerSubtitle}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t.contractorView.exportPayrollCsv}</span>
            </button>
          </div>
        </div>

        {/* Global Contract Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
          
          {/* Municipal Rate Control */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-700">
                {t.contractorView.municipalFixedRate}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {language === 'he' ? 'חוזה עירוני קדם-יסודי תשפ״ו' : 'Municipal preschool contract 2026'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute start-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₪</span>
                <input
                  type="number"
                  min="200"
                  max="800"
                  step="10"
                  value={municipalRate}
                  onChange={(e) => setMunicipalRate(Math.max(100, Number(e.target.value) || 0))}
                  className="w-24 text-center font-mono font-bold text-sm text-slate-900 ps-6 pe-2 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <span className="text-xs text-slate-500">{t.contractorView.municipalRatePerClass}</span>
            </div>
          </div>

          {/* Default Teacher Percentage Split */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-700">
                {language === 'he' ? 'ברירת מחדל לאחוז מדריך' : 'Default Teacher Split %'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {language === 'he' ? 'חל על מדריכים חדשים ואיפוסים' : 'Applies to new hires & resets'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setDefaultSplit((s) => Math.max(20, s - 5))}
                  className="px-2 py-1.5 text-slate-500 hover:bg-slate-100 text-xs font-bold border-e border-slate-200"
                >
                  -5%
                </button>
                <span className="px-3 py-1 font-mono font-bold text-sm text-slate-900 tabular-nums">
                  {defaultSplit}%
                </span>
                <button
                  type="button"
                  onClick={() => setDefaultSplit((s) => Math.min(90, s + 5))}
                  className="px-2 py-1.5 text-slate-500 hover:bg-slate-100 text-xs font-bold border-s border-slate-200"
                >
                  +5%
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRecords((prev) => prev.map((r) => ({ ...r, percentageSplit: defaultSplit })));
                  showToast(language === 'he' ? `כל המדריכים אופסו ל-${defaultSplit}%` : `All teachers reset to ${defaultSplit}%`, 'info');
                }}
                className="text-xs text-teal-700 font-semibold hover:underline"
              >
                {language === 'he' ? 'החל על כולם' : 'Apply to all'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Calculated Aggregate Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Billed to Municipality */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{t.contractorView.totalBilledMunicipality}</span>
            <Building className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            ₪{totalMunicipalBilled.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {totalVerifiedClasses} {t.contractorView.verifiedClasses} × ₪{municipalRate}
          </div>
        </div>

        {/* Total Teacher Payroll Disbursed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{t.contractorView.totalTeacherPayroll}</span>
            <Users2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-teal-700 mt-1 font-mono tabular-nums">
            ₪{Math.round(totalTeacherPayroll).toLocaleString()}
          </div>
          <div className="text-[11px] text-teal-800 font-medium mt-1">
            {language === 'he' ? 'שכר ישיר לצוות ההוראה' : 'Direct instructor wages'}
          </div>
        </div>

        {/* Total Contractor Gross Margin */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{t.contractorView.totalContractorProfit}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
            ₪{Math.round(totalContractorMargin).toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-800 font-semibold mt-1">
            {t.contractorView.profitMarginRate}: {overallMarginPercentage}%
          </div>
        </div>

        {/* Payout Approval Status */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{language === 'he' ? 'סטטוס אישור שכר' : 'Payroll Approvals'}</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {records.filter((r) => r.isPayrollApproved).length} / {records.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {records.filter((r) => !r.isPayrollApproved).length === 0
              ? (language === 'he' ? 'כל השכר אושר להעברה' : 'All payouts approved')
              : `${records.filter((r) => !r.isPayrollApproved).length} ${language === 'he' ? 'בבדיקת רו״ח' : 'pending audit'}`}
          </div>
        </div>

      </div>

      {/* Interactive Per-Teacher Financial Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'he' ? 'פירוט שכר והקצאת רווחיות לפי מדריך/ה' : 'Instructor Payroll & Profit Margin Breakdown'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contractorView.rateDisclaimer}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200">
            <Info className="w-3.5 h-3.5 shrink-0 text-teal-600" />
            <span>{language === 'he' ? 'לחץ על האחוז לעריכה מהירה' : 'Click percentage to adjust'}</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-start font-semibold">{language === 'he' ? 'מדריך/ה' : 'Instructor'}</th>
                <th className="py-3 px-4 text-start font-semibold">{language === 'he' ? 'תחום העשרה' : 'Discipline'}</th>
                <th className="py-3 px-4 text-center font-semibold">{t.contractorView.verifiedClasses}</th>
                <th className="py-3 px-4 text-center font-semibold">{t.contractorView.teacherSplitPercentage}</th>
                <th className="py-3 px-4 text-end font-semibold">{language === 'he' ? 'תעריף מדריך/שיעור' : 'Teacher / Class'}</th>
                <th className="py-3 px-4 text-end font-semibold">{language === 'he' ? 'רווח מפעיל/שיעור' : 'Agency / Class'}</th>
                <th className="py-3 px-4 text-end font-semibold">{t.contractorView.teacherPayout}</th>
                <th className="py-3 px-4 text-end font-semibold">{t.contractorView.contractorGrossMargin}</th>
                <th className="py-3 px-4 text-center font-semibold">{language === 'he' ? 'סטטוס שכר' : 'Approval'}</th>
                <th className="py-3 px-4 text-end font-semibold">{language === 'he' ? 'פעולות' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r) => {
                const teacherName = language === 'he' ? r.teacherNameHe : r.teacherNameEn;
                const subject = language === 'he' ? r.subjectHe : r.subjectEn;
                const seniority = language === 'he' ? r.seniorityLevelHe : r.seniorityLevelEn;

                // Per-class split calculations
                const teacherPerClass = municipalRate * (r.percentageSplit / 100);
                const contractorPerClass = municipalRate * ((100 - r.percentageSplit) / 100);

                // Total calculations
                const totalTeacher = r.completedClasses * teacherPerClass;
                const totalContractor = r.completedClasses * contractorPerClass;

                const isEditing = editingTeacherId === r.id;

                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Instructor Name & Seniority */}
                    <td className="py-3.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {teacherName.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{teacherName}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{seniority}</div>
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {subject}
                    </td>

                    {/* Verified Classes */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800 text-sm tabular-nums">
                      {r.completedClasses}
                    </td>

                    {/* Editable Percentage Split */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {isEditing ? (
                        <div className="inline-flex items-center gap-1 bg-white border border-teal-500 rounded-lg p-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => handleUpdateSplit(r.id, r.percentageSplit - 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="10"
                            max="90"
                            value={r.percentageSplit}
                            onChange={(e) => handleUpdateSplit(r.id, Number(e.target.value) || 0)}
                            className="w-12 text-center font-mono font-bold text-xs focus:outline-none"
                            autoFocus
                          />
                          <span className="text-xs text-slate-400 font-bold pe-1">%</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateSplit(r.id, r.percentageSplit + 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-xs"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTeacherId(null);
                              showToast(t.contractorView.splitUpdatedToast, 'success');
                            }}
                            className="ms-1 px-1.5 py-0.5 bg-teal-600 text-white rounded text-[10px] font-bold"
                          >
                            ✓
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingTeacherId(r.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors group"
                        >
                          <span className="font-mono font-bold text-xs tabular-nums">{r.percentageSplit}%</span>
                          <span className="text-[10px] text-teal-600 group-hover:underline">({t.contractorView.editSplit})</span>
                        </button>
                      )}
                    </td>

                    {/* Teacher Rate Per Class */}
                    <td className="py-3.5 px-4 text-end font-mono font-semibold text-slate-700 tabular-nums whitespace-nowrap">
                      ₪{teacherPerClass.toFixed(0)}
                    </td>

                    {/* Contractor Margin Per Class */}
                    <td className="py-3.5 px-4 text-end font-mono font-semibold text-emerald-700 tabular-nums whitespace-nowrap">
                      ₪{contractorPerClass.toFixed(0)}
                    </td>

                    {/* Total Teacher Payout */}
                    <td className="py-3.5 px-4 text-end font-mono font-bold text-slate-900 text-sm tabular-nums whitespace-nowrap">
                      ₪{Math.round(totalTeacher).toLocaleString()}
                    </td>

                    {/* Total Contractor Margin */}
                    <td className="py-3.5 px-4 text-end font-mono font-bold text-emerald-800 text-sm tabular-nums whitespace-nowrap">
                      ₪{Math.round(totalContractor).toLocaleString()}
                    </td>

                    {/* Approval Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleApproval(r.id)}
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                          r.isPayrollApproved
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {r.isPayrollApproved ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{t.contractorView.approvedForPayroll}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>{t.contractorView.pendingApproval}</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-end whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleResetTeacherSplit(r.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title={t.contractorView.resetToDefault}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleApproval(r.id)}
                          className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                            r.isPayrollApproved
                              ? 'text-slate-500 hover:bg-slate-100'
                              : 'bg-teal-600 hover:bg-teal-700 text-white'
                          }`}
                        >
                          {r.isPayrollApproved ? (language === 'he' ? 'בטל אישור' : 'Revoke') : t.contractorView.approvePayroll}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Table Summary Footer */}
            <tfoot className="bg-slate-100/80 font-semibold border-t-2 border-slate-300">
              <tr>
                <td colSpan={2} className="py-3 px-4 text-slate-900 font-bold">
                  {language === 'he' ? 'סה״כ תקופתי מאוחד' : 'Total Billing Period'}
                </td>
                <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 tabular-nums">
                  {totalVerifiedClasses}
                </td>
                <td className="py-3 px-4 text-center font-mono text-slate-600">
                  {((totalTeacherPayroll / totalMunicipalBilled) * 100).toFixed(1)}% (ממוצע)
                </td>
                <td colSpan={2} className="py-3 px-4 text-center text-slate-500 text-[11px]">
                  {language === 'he' ? 'תעריף בסיס: ₪' + municipalRate : `Base Rate: ₪${municipalRate}`}
                </td>
                <td className="py-3 px-4 text-end font-mono font-bold text-teal-800 text-sm tabular-nums">
                  ₪{Math.round(totalTeacherPayroll).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-end font-mono font-bold text-emerald-800 text-sm tabular-nums">
                  ₪{Math.round(totalContractorMargin).toLocaleString()}
                </td>
                <td colSpan={2} className="py-3 px-4 text-end">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    {language === 'he' ? 'רווחיות מפעיל: ' : 'Net Margin: '} {overallMarginPercentage}%
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};
