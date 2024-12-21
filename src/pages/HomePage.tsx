import React from 'react';
import { Users, ClipboardList, GraduationCap, BookOpen, TrendingUp } from '../components/icons';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import { useGoogleSheets } from '../hooks/useGoogleSheets';

export const HomePage: React.FC = () => {
  const { isDark } = useThemeStore();
  const { data: studentsData } = useGoogleSheets('students');
  const { data: recordsData } = useGoogleSheets('records');
  const { data: teachersData } = useGoogleSheets('teachers');

  const stats = [
    {
      title: 'إجمالي الطلاب',
      value: studentsData?.length || 0,
      icon: <Users className="w-6 h-6" />,
      trend: '+5% من الشهر الماضي',
      color: 'blue'
    },
    {
      title: 'السجلات النشطة',
      value: recordsData?.length || 0,
      icon: <ClipboardList className="w-6 h-6" />,
      trend: '+12% من الشهر الماضي',
      color: 'green'
    },
    {
      title: 'المعلمين',
      value: teachersData?.length || 0,
      icon: <GraduationCap className="w-6 h-6" />,
      trend: 'ثابت',
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      title: 'إضافة طالب',
      description: 'تسجيل طالب جديد في النظام',
      icon: <Users className="w-8 h-8" />,
      link: '/students',
      color: 'blue'
    },
    {
      title: 'تسجيل نقاط',
      description: 'إضافة سجل نقاط جديد',
      icon: <ClipboardList className="w-8 h-8" />,
      link: '/records',
      color: 'green'
    },
    {
      title: 'إدارة المعلمين',
      description: 'عرض وإدارة بيانات المعلمين',
      icon: <GraduationCap className="w-8 h-8" />,
      link: '/teachers',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        light: 'bg-blue-50 text-blue-600',
        dark: 'bg-blue-900/20 text-blue-400',
        icon: 'bg-blue-600/10 text-blue-600',
        border: 'border-blue-200'
      },
      green: {
        light: 'bg-green-50 text-green-600',
        dark: 'bg-green-900/20 text-green-400',
        icon: 'bg-green-600/10 text-green-600',
        border: 'border-green-200'
      },
      purple: {
        light: 'bg-purple-50 text-purple-600',
        dark: 'bg-purple-900/20 text-purple-400',
        icon: 'bg-purple-600/10 text-purple-600',
        border: 'border-purple-200'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className={`p-6 rounded-2xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          مرحباً بك في نظام المتابعة 👋
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          هنا يمكنك إدارة بيانات الطلاب والسجلات والمعلمين بكل سهولة
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const colorClasses = getColorClasses(stat.color);
          return (
            <div
              key={index}
              className={`p-6 rounded-2xl border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  isDark ? colorClasses.dark : colorClasses.light
                }`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        الإجراءات السريعة
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const colorClasses = getColorClasses(action.color);
          return (
            <Link
              key={index}
              to={action.link}
              className={`block p-6 rounded-2xl border transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`p-3 rounded-xl w-fit mb-4 ${
                isDark ? colorClasses.dark : colorClasses.light
              }`}>
                {action.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {action.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};