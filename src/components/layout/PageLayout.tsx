import React from 'react';
import { BackButton } from '../BackButton';
import { ThemeToggle } from '../ThemeToggle';
import { useThemeStore } from '../../store/themeStore';

interface PageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export function PageLayout({ children, showBackButton = true }: PageLayoutProps) {
  const { isDark } = useThemeStore();
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="flex justify-between items-center">
        {showBackButton && <BackButton />}
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}