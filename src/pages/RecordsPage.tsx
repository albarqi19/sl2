import React from 'react';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/layout/PageHeader';
import { PageLayout } from '../components/layout/PageLayout';
import { useRecordsColumns } from '../hooks/useRecordsColumns';
import { useGoogleSheets } from '../hooks/useGoogleSheets';

export function RecordsPage() {
  const { records, loading, error } = useGoogleSheets();
  const columns = useRecordsColumns();
  
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
        title="سجل النقاط"
        subtitle="عرض سجل نقاط الطلاب"
      />
      <DataTable data={records} columns={columns} />
    </PageLayout>
  );
}