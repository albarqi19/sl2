import React, { useState } from 'react';
import { Edit, Trash2 } from '../icons';
import type { Student } from '../../types/student';
import { StudentEditModal } from './StudentEditModal';

interface StudentActionsProps {
  row: {
    original: Student;
  };
  onEdit?: (student: Student) => void;
}

export function StudentActions({ row, onEdit }: StudentActionsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (updatedStudent: Student) => {
    if (onEdit) {
      onEdit(updatedStudent);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button 
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Edit size={16} />
        </button>
        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
          <Trash2 size={16} />
        </button>
      </div>

      {isEditModalOpen && (
        <StudentEditModal
          student={row.original}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEdit}
        />
      )}
    </>
  );
}