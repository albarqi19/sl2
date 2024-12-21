import React from 'react';
import { useThemeStore } from '../store/themeStore';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-brown-50 transition-colors"
      title={isDark ? 'تفعيل النمط الفاتح' : 'تفعيل النمط الداكن'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}