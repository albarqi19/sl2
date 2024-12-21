import React, { useState } from 'react';
import { Plus } from '../components/icons';
import { DataTable } from '../components/DataTable';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/layout/PageHeader';
import { PageLayout } from '../components/layout/PageLayout';
import { ErrorMessage } from '../components/layout/ErrorMessage';
import { useStudentsColumns } from '../hooks/useStudentsColumns';
import { useSheetData } from '../hooks/useSheetData';
import type { Student } from '../types/student';
import { StudentDetailsModal } from '../components/students/StudentDetailsModal';
import { StudentAddModal } from '../components/students/StudentAddModal';
import { api } from '../lib/api';

export function StudentsPage() {
  const { 
    data: students, 
    loading, 
    error, 
    isUsingMockData,
    mutate,
    refresh 
  } = useSheetData<Student>('students');
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const handleStudentEdit = async (updatedStudent: Student) => {
    try {
      setUpdateError(null);
      console.log('Sending update request for student:', updatedStudent);
      
      const response = await api.updateStudent(updatedStudent.id, updatedStudent);
      console.log('Update response:', response);
      
      // تحديث واجهة المستخدم
      mutate(
        students?.map(student => 
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      
      // تحديث البيانات من الخادم
      await refresh();
      
      return true; // نجاح العملية
    } catch (error) {
      console.error('Error updating student:', error);
      setUpdateError(error instanceof Error ? error.message : 'حدث خطأ أثناء تحديث بيانات الطالب');
      return false; // فشل العملية
    }
  };

  const handleStudentAdd = async (newStudent: Omit<Student, 'id' | 'points'>) => {
    try {
      setUpdateError(null);
      console.log('Sending add request for student:', newStudent);
      
      const response = await api.addStudent({
        ...newStudent,
        points: 0
      });
      console.log('Add response:', response);
      
      // تحديث البيانات من الخادم
      await refresh();
      
      return true; // نجاح العملية
    } catch (error) {
      console.error('Error adding student:', error);
      setUpdateError(error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة الطالب');
      return false; // فشل العملية
    }
  };

  const columns = useStudentsColumns({ 
    onStudentSelect: setSelectedStudent,
    onStudentEdit: handleStudentEdit
  });

  return (
    <PageLayout>
      <PageHeader 
        title="بيانات الطلاب"
        action={
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>
            إضافة طالب
          </Button>
        }
      />
      
      {error && <ErrorMessage message={error} />}
      {updateError && (
        <div className="mb-4 text-red-600 bg-red-50 p-4 rounded-lg">
          {updateError}
        </div>
      )}
      {isUsingMockData && (
        <div className="mb-4 text-amber-600 bg-amber-50 p-4 rounded-lg">
          ملاحظة: يتم عرض بيانات تجريبية حالياً
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">جاري تحميل البيانات...</div>
      ) : (
        <DataTable data={students} columns={columns} />
      )}
      
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
      
      {showAddModal && (
        <StudentAddModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleStudentAdd}
        />
      )}
    </PageLayout>
  );
}