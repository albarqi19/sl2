import { useState, useEffect } from 'react';
import { sheetsService } from '../services/sheets.service';
import type { Student } from '../types/student';
import type { Record } from '../types/record';
import type { Teacher } from '../types/student';

export function useGoogleSheets() {
  const [data, setData] = useState<{
    students: Student[];
    records: Record[];
    teachers: Teacher[];
  }>({
    students: [],
    records: [],
    teachers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await sheetsService.fetchAllData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    ...data,
    loading,
    error,
  };
}