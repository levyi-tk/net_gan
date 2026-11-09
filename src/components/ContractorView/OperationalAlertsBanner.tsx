import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContractorAlertItem } from '../../types';
import {
  AlertTriangle,
  Clock,
  MapPin,
  FileWarning,
  Phone,
  CheckCircle2,
  UserPlus,
  ShieldAlert,
  Archive,
  ChevronRight
} from 'lucide-react';

interface OperationalAlertsBannerProps {
  initialAlerts: ContractorAlertItem[];
  onCallTeacher: (teacherName: string, phone: string) => void;
  onDispatchSubstitute?: () => void;
}

export const OperationalAlertsBanner: React.FC<OperationalAlertsBannerProps> = ({
  initialAlerts,
  onCallTeacher,
  onDispatchSubstitute,
}) => {
  const { t, language, showToast } = useApp();
  const [alerts, setAlerts] = useState<ContractorAlertItem[]>(initialAlerts);
  const [filterMode, setFilterMode] = useState<'all' | 'urgent' | 'resolved'>('all');

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'resolved' } : a))
    );
    showToast(t.contractorView.alertResolvedToast, 'success');
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, severity: 'info' } : a))
    );
    showToast(language === 'he' ? 'החריגה אושרה ונרשמה בפרוטוקול הבקרה' : 'Exception acknowledged and logged in audit log', 'info');
  };

  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const filteredAlerts = alerts.filter((a) => {
    if (filterMode === 'all') return a.status === 'active';
    if (filterMode === 'urgent') return a.status === 'active' && a.severity === 'urgent';
    if (filterMode === 'resolved') return a.status === 'resolved';
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {t.contractorView.operationalAlertsTitle}
              </h2>
              {activeAlerts.length > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  {activeAlerts.length} {t.contractorView.activeAlertsCount}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.contractorView.operationalAlertsSubtitle}
            </p>
          </div>
        </div>

        {/* Filter Toggle Pills */}
        <div className="flex items-center gap-1.5 text-xs bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              filterMode === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'he' ? 'פעילות' : 'Active'} ({activeAlerts.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('urgent')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              filterMode === 'urgent'
                ? 'bg-rose-600 text-white shadow-2xs font-bold'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            {t.contractorView.alertSeverityUrgent} ({alerts.filter((a) => a.status === 'active' && a.severity === 'urgent').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('resolved')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              filterMode === 'resolved'
                ? 'bg-slate-700 text-white shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'he' ? 'טופלו' : 'Resolved'} ({alerts.filter((a) => a.status === 'resolved').length})
          </button>
        </div>
      </div>

      {/* Alert Item List */}
      {filteredAlerts.length === 0 ? (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-medium flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t.contractorView.allAlertsResolved}</span>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredAlerts.map((alert) => {
            const isHebrew = language === 'he';
            const teacherName = isHebrew ? alert.teacherNameHe : alert.teacherNameEn;
            const kindergarten = isHebrew ? alert.kindergartenNameHe : alert.kindergartenNameEn;
            const message = isHebrew ? alert.messageHe : alert.messageEn;
            const isResolved = alert.status === 'resolved';

            const alertTitle =
              alert.type === 'late_checkin'
                ? t.contractorView.alertTypeLateCheckin
                : alert.type === 'missing_log'
                ? t.contractorView.alertTypeMissingLog
                : t.contractorView.alertTypeGpsAnomaly;

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isResolved
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : alert.severity === 'urgent'
                    ? 'bg-rose-50/60 border-rose-200'
                    : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                {/* Left content: Icon + Title + Details */}
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isResolved
                      ? 'bg-slate-200 text-slate-600'
                      : alert.severity === 'urgent'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {alert.type === 'late_checkin' ? (
                      <Clock className="w-4 h-4" />
                    ) : alert.type === 'missing_log' ? (
                      <FileWarning className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold ${isResolved ? 'text-slate-600 line-through' : 'text-slate-900'}`}>
                        {alertTitle}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({alert.detectedAt})
                      </span>
                      <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.2 rounded border border-teal-200">
                        {teacherName}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        • {kindergarten}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        [{alert.timeSlot}]
                      </span>
                    </div>

                    <p className={`mt-1 text-slate-700 ${isResolved ? 'line-through' : ''}`}>
                      {message}
                    </p>
                  </div>
                </div>

                {/* Right Actions */}
                {!isResolved ? (
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => onCallTeacher(teacherName, alert.teacherPhone)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t.contractorView.callTeacher}</span>
                    </button>

                    {alert.type === 'late_checkin' && onDispatchSubstitute && (
                      <button
                        type="button"
                        onClick={onDispatchSubstitute}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{t.contractorView.dispatchStandby}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium transition-colors"
                    >
                      {t.contractorView.alertAcknowledge}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleResolveAlert(alert.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors shadow-2xs"
                    >
                      {t.contractorView.alertResolve}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'he' ? 'טופל ואושר' : 'Resolved & Logged'}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
