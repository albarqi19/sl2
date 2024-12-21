import React from 'react';
import { Home as HomeIcon } from 'lucide-react';

// تعريف الأيقونات كمكونات React بسيطة
export const Moon = () => <span>🌙</span>;
export const Sun = () => <span>☀️</span>;
export const Users = () => <span>👥</span>;
export const ClipboardList = () => <span>📋</span>;
export const GraduationCap = () => <span>🎓</span>;
export const BookOpen = () => <span>📖</span>;
export const Plus = () => <span>➕</span>;
export const Edit = () => <span>✏️</span>;
export const Trash2 = () => <span>🗑️</span>;
export const X = () => <span>❌</span>;
export const AlertTriangle = () => <span>⚠️</span>;
export const Eye = () => <span>👁️</span>;
export const ChevronUp = () => <span>⬆️</span>;
export const ChevronDown = () => <span>⬇️</span>;
export const TrendingUp = () => <span>📈</span>;
export const ArrowRight = () => <span>➡️</span>;
export const Home = ({ className }: { className?: string }) => (
  <HomeIcon className={className} />
);