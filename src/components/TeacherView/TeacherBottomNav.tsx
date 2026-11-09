import React from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherTab } from '../../types';
import { LayoutGrid, CalendarDays, MessageSquareText, UserCheck } from 'lucide-react';

interface TabItem {
  id: TeacherTab;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: number;
}

export const TeacherBottomNav: React.FC<{ isEmbeddedInPhone?: boolean }> = ({ isEmbeddedInPhone = false }) => {
  const { teacherTab, setTeacherTab, t } = useApp();

  const tabs: TabItem[] = [
    {
      id: 'classes',
      label: t.nav.homeClasses,
      icon: LayoutGrid,
    },
    {
      id: 'schedule',
      label: t.nav.schedule,
      icon: CalendarDays,
    },
    {
      id: 'feed',
      label: t.nav.dailyFeed,
      icon: MessageSquareText,
      badge: 2,
    },
    {
      id: 'profile',
      label: t.nav.profile,
      icon: UserCheck,
    },
  ];

  return (
    <nav
      aria-label="Teacher mobile navigation"
      className={`${
        isEmbeddedInPhone
          ? 'sticky bottom-0 left-0 right-0'
          : 'fixed bottom-0 left-0 right-0 z-40'
      } bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg`}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = teacherTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTeacherTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors group ${
                isActive ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform group-active:scale-90 ${
                    isActive ? 'text-teal-600 scale-105' : 'text-slate-500'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -end-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight truncate max-w-[70px]">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
