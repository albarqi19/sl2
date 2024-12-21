import React from 'react';
import { useThemeStore } from '../../store/themeStore';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function DashboardCard({ icon, title, description }: DashboardCardProps) {
  const { isDark } = useThemeStore();
  
  return (
    <div className={`block rounded-xl p-6 transition-all duration-300 transform hover:scale-102 ${
      isDark 
        ? 'bg-gray-800 hover:bg-gray-700' 
        : 'bg-white hover:bg-brown-50 shadow-sm border border-brown-200'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${
          isDark ? 'bg-gray-700' : 'bg-brown-100'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-xl font-semibold mb-1 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {title}
          </h3>
          <p className={`${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}