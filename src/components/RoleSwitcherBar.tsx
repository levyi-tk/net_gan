import React from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import { GraduationCap, Building2, Landmark, Check } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { role, setRole, t, language } = useApp();

  const roleConfigs: { id: Role; label: string; icon: React.FC<{ className?: string }>; badge: string }[] = [
    {
      id: 'teacher',
      label: t.roles.teacher.name,
      icon: GraduationCap,
      badge: t.roles.teacher.badge,
    },
    {
      id: 'contractor',
      label: t.roles.contractor.name,
      icon: Building2,
      badge: t.roles.contractor.badge,
    },
    {
      id: 'municipality',
      label: t.roles.municipality.name,
      icon: Landmark,
      badge: t.roles.municipality.badge,
    },
  ];

  return (
    <aside aria-label="Role Switcher" className="bg-slate-900 text-white border-b border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Active persona descriptor */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
            <span className="text-slate-400 font-medium whitespace-nowrap">
              {t.roleSwitcherTitle}
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-slate-300 hidden sm:inline text-xs truncate max-w-md">
              {t.roles[role].desc}
            </span>
          </div>

          {/* Interactive Role Switcher Segmented Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-xl border border-slate-700/80 w-full sm:w-auto overflow-x-auto">
            {roleConfigs.map((item) => {
              const Icon = item.icon;
              const isActive = role === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  type="button"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-1 sm:flex-initial justify-center ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm ring-1 ring-teal-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5 opacity-80 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
