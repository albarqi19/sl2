import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

const navigation = [
  { name: 'الرئيسية', path: '/', icon: '🏠' },
  { name: 'الطلاب', path: '/students', icon: '👥' },
  { name: 'السجلات', path: '/records', icon: '📝' },
  { name: 'المعلمين', path: '/teachers', icon: '👨‍🏫' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { isDark } = useThemeStore();

  return (
    <aside className={`w-64 shrink-0 border-l ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Logo */}
      <div className={`h-16 flex items-center justify-center border-b ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          نظام المتابعة
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? isDark
                    ? 'bg-gray-700 text-white'
                    : 'bg-brown-100 text-brown-900'
                  : isDark
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-brown-50 hover:text-brown-900'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};