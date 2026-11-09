import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dir } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed bottom-20 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none ${
        dir === 'rtl' ? 'left-4' : 'right-4'
      }`}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700/80 flex items-center gap-3 animate-fade-in text-xs sm:text-sm font-medium"
        >
          {toast.type === 'warning' ? (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
