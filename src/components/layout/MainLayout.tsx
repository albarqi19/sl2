import React from 'react';
import { Sidebar } from '../Sidebar';
import { ThemeToggle } from '../ThemeToggle';
import { useThemeStore } from '../../store/themeStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="pr-64">
        {/* Header */}
        <header className={`h-16 flex items-center justify-between px-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } border-b`}>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
