import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { Users, ClipboardList, GraduationCap, Sun, Moon, Home } from './icons/Icons';

// Helper function to combine class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const navigation = [
  {
    name: 'الرئيسية',
    href: '/',
    icon: Home,
    current: false
  },
  {
    name: 'الطلاب',
    href: '/students',
    icon: Users,
    current: false
  },
  {
    name: 'السجلات',
    href: '/records',
    icon: ClipboardList,
    current: false
  },
  {
    name: 'المعلمين',
    href: '/teachers',
    icon: GraduationCap,
    current: false
  }
];

export const Sidebar = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const location = useLocation();

  navigation.forEach(item => {
    item.current = location.pathname === item.href;
  });

  return (
    <div className={cn(
      'fixed top-0 right-0 h-full w-64 flex flex-col',
      isDark ? 'bg-gray-900' : 'bg-white border-l'
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <h1 className={cn(
          'text-xl font-bold',
          isDark ? 'text-white' : 'text-gray-900'
        )}>
          برنامج نــافـس
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out',
              item.current
                ? isDark
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-900'
                : isDark
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <item.icon
              className={cn(
                'flex-shrink-0 h-5 w-5 ml-3',
                item.current
                  ? isDark
                    ? 'text-white'
                    : 'text-gray-900'
                  : isDark
                    ? 'text-gray-300'
                    : 'text-gray-400'
              )}
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          className={cn(
            'w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out',
            isDark
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          )}
        >
          {isDark ? (
            <Sun className="h-5 w-5 ml-2" />
          ) : (
            <Moon className="h-5 w-5 ml-2" />
          )}
          {isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
        </button>
        <div className={cn(
          'mt-4 text-xs text-center',
          isDark ? 'text-gray-400' : 'text-gray-500'
        )}>
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};