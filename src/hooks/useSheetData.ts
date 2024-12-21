import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { mockStudents, mockRecords, mockTeachers } from '../data/mockData';

export function useSheetData<T>(sheetKey: string) {
  const [data, setData] = useState<T[]>(() => {
    // تهيئة البيانات الأولية
    switch (sheetKey) {
      case 'students':
        return mockStudents as T[];
      case 'records':
        return mockRecords as T[];
      case 'teachers':
        return mockTeachers as T[];
      default:
        return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let fetchedData;
      switch (sheetKey) {
        case 'students':
          fetchedData = await api.getStudents();
          break;
        case 'records':
          fetchedData = await api.getRecords();
          break;
        case 'teachers':
          fetchedData = await api.getTeachers();
          break;
        default:
          throw new Error('Invalid sheet key');
      }
      setData(fetchedData as T[]);
      setIsUsingMockData(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء جلب البيانات');
      // في حالة الخطأ، نستمر باستخدام البيانات الوهمية
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  }, [sheetKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mutate = useCallback((newData: T[] | ((oldData: T[]) => T[])) => {
    setData(prev => {
      if (typeof newData === 'function') {
        return newData(prev);
      }
      return newData;
    });
  }, []);

  return { 
    data, 
    loading, 
    error, 
    isUsingMockData,
    mutate,
    refresh: fetchData
  };
}