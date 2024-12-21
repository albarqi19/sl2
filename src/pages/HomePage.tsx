import React from 'react';
import { Users, ClipboardList, GraduationCap, Plus } from '../components/icons/Icons';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import { useGoogleSheets } from '../hooks/useGoogleSheets';

// Helper function to combine class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const HomePage: React.FC = () => {
  const { isDark } = useThemeStore();
  const { students, records, teachers, loading, error } = useGoogleSheets();

  const stats = [
    {
      title: 'إجمالي الطلاب',
      value: loading ? '...' : (students?.length || 0),
      icon: <Users className="w-5 h-5" />,
      link: '/students',
      color: 'blue',
      description: 'عرض قائمة الطلاب'
    },
    {
      title: 'إجمالي السجلات',
      value: loading ? '...' : (records?.length || 0),
      icon: <ClipboardList className="w-5 h-5" />,
      link: '/records',
      color: 'green',
      description: 'عرض جميع السجلات'
    },
    {
      title: 'إجمالي المعلمين',
      value: loading ? '...' : (teachers?.length || 0),
      icon: <GraduationCap className="w-5 h-5" />,
      link: '/teachers',
      color: 'purple',
      description: 'عرض قائمة المعلمين'
    }
  ];

  const quickActions = [
    {
      title: 'إضافة طالب',
      description: 'تسجيل طالب جديد في النظام',
      icon: <Users className="w-6 h-6" />,
      link: '/students',
      color: 'blue'
    },
    {
      title: 'تسجيل نقاط',
      description: 'إضافة سجل نقاط جديد',
      icon: <ClipboardList className="w-6 h-6" />,
      link: '/records',
      color: 'green'
    },
    {
      title: 'إضافة معلم',
      description: 'إضافة معلم جديد للنظام',
      icon: <GraduationCap className="w-6 h-6" />,
      link: '/teachers',
      color: 'purple'
    }
  ];

  if (error) {
    return (
      <div className="p-4 text-red-500">
        خطأ: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className={cn(
        'rounded-2xl p-8 mb-8',
        isDark ? 'bg-gray-800' : 'bg-white',
        'border',
        isDark ? 'border-gray-700' : 'border-gray-200'
      )}>
        <h1 className={cn(
          'text-4xl font-bold mb-4',
          isDark ? 'text-white' : 'text-gray-900'
        )}>
          مرحباً بك في برنامج نــافـس
        </h1>
        <p className={cn(
          'text-lg',
          isDark ? 'text-gray-300' : 'text-gray-600'
        )}>
          نظام إدارة الطلاب والمعلمين وتتبع النقاط
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className={cn(
              'block p-6 rounded-xl transition-all duration-200',
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50',
              'border',
              isDark ? 'border-gray-700' : 'border-gray-200'
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                'p-3 rounded-lg',
                isDark ? `bg-${stat.color}-900/20` : `bg-${stat.color}-100`
              )}>
                {stat.icon}
              </div>
              <span className={cn(
                'text-sm font-medium',
                isDark ? 'text-gray-400' : 'text-gray-500'
              )}>
                {stat.title}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={cn(
                  'text-3xl font-bold mb-1',
                  isDark ? 'text-white' : 'text-gray-900'
                )}>
                  {stat.value}
                </h3>
                <p className={cn(
                  'text-sm',
                  isDark ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {stat.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className={cn(
          'text-2xl font-bold mb-6',
          isDark ? 'text-white' : 'text-gray-900'
        )}>
          الإجراءات السريعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={cn(
                'block p-6 rounded-xl transition-all duration-200',
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50',
                'border',
                isDark ? 'border-gray-700' : 'border-gray-200'
              )}
            >
              <div className={cn(
                'p-3 rounded-lg w-fit mb-4',
                isDark ? `bg-${action.color}-900/20` : `bg-${action.color}-100`
              )}>
                {action.icon}
              </div>
              <h3 className={cn(
                'text-lg font-semibold mb-2',
                isDark ? 'text-white' : 'text-gray-900'
              )}>
                {action.title}
              </h3>
              <p className={cn(
                'text-sm',
                isDark ? 'text-gray-400' : 'text-gray-600'
              )}>
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};