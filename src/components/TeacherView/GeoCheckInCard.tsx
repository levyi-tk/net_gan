import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Clock,
  Compass,
  LogOut,
  RefreshCw,
  Navigation
} from 'lucide-react';

export const GeoCheckInCard: React.FC = () => {
  const {
    t,
    language,
    selectedClass,
    geoStatus,
    distanceMeters,
    checkInTime,
    geoCoords,
    performCheckIn,
    performCheckOut,
    toggleGeoSimulation,
  } = useApp();

  const isVerified = geoStatus === 'verified';
  const isOutOfRange = geoStatus === 'out_of_range';
  const isChecking = geoStatus === 'checking';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
      {/* Header & Status Indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isVerified
                ? 'bg-emerald-100 text-emerald-800'
                : isOutOfRange
                ? 'bg-rose-100 text-rose-800'
                : 'bg-teal-100 text-teal-800'
            }`}
          >
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {t.teacherModules.geoVerification}
            </h3>
            <span className="text-[11px] text-slate-500 block truncate max-w-[210px] sm:max-w-xs">
              {language === 'he' ? selectedClass.addressHe : selectedClass.addressEn}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {isVerified ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.teacherModules.verifiedAtLocation}</span>
            </span>
          ) : isOutOfRange ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.teacherModules.outOfRange}</span>
            </span>
          ) : isChecking ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
              <span>{t.teacherModules.checkingLocation}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
              <Radio className="w-3 h-3 text-slate-400" />
              <span>{language === 'he' ? 'ממתין לאימות' : 'Pending Check-In'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Geofence Data Readout */}
      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 text-xs text-slate-600 mb-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-500">
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.teacherModules.distanceToGate}:</span>
          </span>
          <span
            className={`font-semibold tabular-nums font-mono ${
              isVerified
                ? 'text-emerald-700 font-bold'
                : isOutOfRange
                ? 'text-rose-700 font-bold'
                : 'text-slate-700'
            }`}
          >
            {isVerified
              ? `${distanceMeters} ${language === 'he' ? 'מטרים (בטווח המורשה)' : 'm (Authorized range)'}`
              : isOutOfRange
              ? `${(distanceMeters / 1000).toFixed(1)} ${language === 'he' ? 'ק״מ (חריגה משער הגן)' : 'km (Out of boundary)'}`
              : language === 'he'
              ? 'טרם אומת'
              : 'Not captured yet'}
          </span>
        </div>

        {checkInTime && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.teacherModules.lastVerified}:</span>
            </span>
            <span className="font-mono text-slate-800 font-medium tabular-nums">
              {checkInTime}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50">
          <span>{t.teacherModules.gpsCoordinates}:</span>
          <span className="font-mono tabular-nums">
            {geoCoords.lat.toFixed(4)}°N, {geoCoords.lng.toFixed(4)}°E
          </span>
        </div>
      </div>

      {/* Primary Check-In / Check-Out Action Button */}
      <div className="flex items-center gap-2">
        {isVerified ? (
          <button
            type="button"
            onClick={performCheckOut}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors min-h-[44px] shadow-xs active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4 text-slate-300" />
            <span>{t.teacherModules.checkOut}</span>
          </button>
        ) : (
          <button
            type="button"
            disabled={isChecking}
            onClick={() => performCheckIn(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors min-h-[44px] shadow-sm active:scale-[0.99]"
          >
            <MapPin className="w-4 h-4 text-teal-100" />
            <span>
              {isChecking
                ? t.teacherModules.checkingLocation
                : t.teacherModules.checkIn}
            </span>
          </button>
        )}
      </div>

      {/* Simulator Test Controls: Easily toggle between In-Range and Out-of-Range */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[10px] text-slate-400 font-medium">
          {language === 'he' ? 'בדיקת סימולציה:' : 'Test Geofence:'}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleGeoSimulation(true)}
            className={`text-[10px] px-2 py-1 rounded-md font-medium border transition-colors ${
              isVerified
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.teacherModules.simInRange}
          </button>
          <button
            type="button"
            onClick={() => toggleGeoSimulation(false)}
            className={`text-[10px] px-2 py-1 rounded-md font-medium border transition-colors ${
              isOutOfRange
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.teacherModules.simOutOfRange}
          </button>
        </div>
      </div>
    </div>
  );
};
