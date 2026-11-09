import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { AppHeader } from './components/AppHeader';
import { TeacherView } from './components/TeacherView/TeacherView';
import { ContractorView } from './components/ContractorView/ContractorView';
import { MunicipalityView } from './components/MunicipalityView/MunicipalityView';
import { ToastContainer } from './components/ToastContainer';

const MainAppContent: React.FC = () => {
  const { role, dir, language, t } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900" dir={dir}>
      {/* 1. Top Bar Role Switcher Banner */}
      <RoleSwitcherBar />

      {/* 2. Application Header with Prominent Language Toggle */}
      <AppHeader />

      {/* 3. Responsive Navigation & View Dashboard based on Active Role */}
      <main className="flex-1">
        {role === 'teacher' && <TeacherView />}
        {role === 'contractor' && <ContractorView />}
        {role === 'municipality' && <MunicipalityView />}
      </main>

      {/* Interactive Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{t.appTitle}</span>
            <span>·</span>
            <span>{t.appSubtitle}</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            {t.prototypeNotice}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
