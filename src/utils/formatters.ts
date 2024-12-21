import type { Student, Teacher } from '../types/student';
import type { Record } from '../types/record';
import { SHEETS_CONFIG } from '../config/sheets.config';

export function formatSheetData<T>(
  rows: any[],
  sheetKey: keyof typeof SHEETS_CONFIG.ranges
): T[] {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  switch (sheetKey) {
    case 'students':
      return rows.map(row => ({
        id: row[0]?.toString() || '',
        studentName: row[1]?.toString() || '',
        level: row[2]?.toString() || '',
        classNumber: row[3]?.toString() || '',
        violations: row[4]?.toString() || '',
        parts: row[5]?.toString() || '',
        points: parseInt(row[6]?.toString() || '0', 10),
        phone: row[7]?.toString() || ''
      })) as T[];

    case 'records':
      return rows.map(row => ({
        id: row[0]?.toString() || '',
        studentId: row[1]?.toString() || '',
        studentName: row[2]?.toString() || '',
        pages: row[3]?.toString() || '',
        reason: row[4]?.toString() || '',
        teacher: row[5]?.toString() || '',
        dateTime: row[6]?.toString() || '',
        date: row[7]?.toString() || '',
        phoneNumber: row[8]?.toString() || '',
        teacherName: row[9]?.toString() || '',
        totalPoints: parseInt(row[10]?.toString() || '0', 10),
        level: row[11]?.toString() || '',
        badge: row[12]?.toString() || ''
      })) as T[];

    case 'teachers':
      return rows.map(row => ({
        name: row[0]?.toString() || '',
        limit: parseInt(row[1]?.toString() || '0', 10),
        username: row[2]?.toString() || ''
      })) as T[];

    default:
      return [];
  }
}