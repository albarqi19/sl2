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
    <div className={`min-h-screen flex ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-brown-50 to-brown-100'}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`sticky top-0 z-10 border-b ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow-sm`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              لوحة التحكم
            </h1>
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="container mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className={`border-t ${
          isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
        } py-4 px-6 text-center`}>
          <p className="text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};
