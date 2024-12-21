import React from 'react';
import { X } from '../icons';
import type { Student } from '../../types/student';

interface StudentDetailsModalProps {
  student: Student;
  onClose: () => void;
}

export function StudentDetailsModal({ student, onClose }: StudentDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">تفاصيل الطالب</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم الطالب</label>
              <p className="text-lg font-medium">{student.studentName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المستوى</label>
              <p className="text-lg">{student.level}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الحلقة</label>
              <p className="text-lg">{student.classNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المستوى الحالي</label>
              <p className="text-lg">{student.parts}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">النقاط</label>
              <p className="text-lg font-semibold text-green-600">{student.points}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المخالفات</label>
              <p className="text-lg text-red-600">{student.violations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}