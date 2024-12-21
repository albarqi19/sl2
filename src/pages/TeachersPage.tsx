import React, { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/layout/PageHeader';
import { PageLayout } from '../components/layout/PageLayout';
import { useTeachersColumns } from '../hooks/useTeachersColumns';
import { useGoogleSheets } from '../hooks/useGoogleSheets';
import { Button } from '../components/ui/Button';
import { Plus } from '../components/icons';
import { TeacherFormModal } from '../components/teachers/TeacherFormModal';

export function TeachersPage() {
  const { teachers, loading, error } = useGoogleSheets();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const columns = useTeachersColumns();

  if (loading) {
    return (
      <PageLayout>
        <div className="text-center py-8">جاري تحميل البيانات...</div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="text-center py-8 text-red-600">{error}</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader 
        title="المعلمين"
        action={
          <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
            إضافة معلم
          </Button>
        }
      />
      <DataTable data={teachers} columns={columns} />
      {isAddModalOpen && (
        <TeacherFormModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </PageLayout>
  );
}