import React, { useState } from 'react';
import { X } from '../icons';
import type { Student } from '../../types/student';
import { Button } from '../ui/Button';

const STUDY_GROUPS = [
  'حلقة التلقين',
  'حلقة الكبار',
  'حلقة المتوسطة والثانوية',
  'حلقة الإبتدائية'
] as const;

interface StudentAddModalProps {
  onClose: () => void;
  onAdd: (student: Omit<Student, 'id' | 'points'>) => Promise<boolean>;
}

export function StudentAddModal({ onClose, onAdd }: StudentAddModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    studentName: '',
    level: STUDY_GROUPS[0],
    classNumber: '',
    phone: '',
    parts: '',
    violations: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const success = await onAdd({
        ...formData,
        violations: '',
        parts: '',
        points: 0,
      });
      
      if (success) {
        onClose();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">إضافة طالب جديد</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSaving}
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                رقم الهوية
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isSaving}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم الطالب</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isSaving}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الحلقة</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isSaving}
                required
              >
                {STUDY_GROUPS.map(group => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الحلقة</label>
              <input
                type="text"
                name="classNumber"
                value={formData.classNumber}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isSaving}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الجوال</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isSaving}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              disabled={isSaving}
            >
              إلغاء
            </Button>
            <Button 
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'جاري الحفظ...' : 'إضافة الطالب'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
