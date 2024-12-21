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

interface StudentEditModalProps {
  student: Student;
  onClose: () => void;
  onSave: (updatedStudent: Student) => Promise<boolean>;
}

export function StudentEditModal({ student, onClose, onSave }: StudentEditModalProps) {
  const [formData, setFormData] = useState({
    id: student.id,
    studentName: student.studentName,
    level: student.level,
    classNumber: student.classNumber,
    parts: student.parts,
    phone: student.phone,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const success = await onSave({
        ...student,
        ...formData,
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
          <h2 className="text-xl font-bold text-gray-900">تعديل بيانات الطالب</h2>
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
                className="block text-sm font-medium text-gray-700"
              >
                رقم الهوية
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="studentName"
                className="block text-sm font-medium text-gray-700"
              >
                اسم الطالب
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="studentName"
                  id="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700"
              >
                الحلقة
              </label>
              <div className="mt-1">
                <select
                  name="level"
                  id="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  {STUDY_GROUPS.map(group => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="classNumber"
                className="block text-sm font-medium text-gray-700"
              >
                رقم الحلقة
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="classNumber"
                  id="classNumber"
                  value={formData.classNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="parts"
                className="block text-sm font-medium text-gray-700"
              >
                المستوى الحالي
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="parts"
                  id="parts"
                  value={formData.parts}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="violations"
                className="block text-sm font-medium text-gray-700"
              >
                المخالفات
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={student.violations}
                  className="block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                الجوال
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="points"
                className="block text-sm font-medium text-gray-700"
              >
                مجموع النقاط
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  value={student.points}
                  disabled
                  className="block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
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
              {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
