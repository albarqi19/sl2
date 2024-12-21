import { fetchSheetData } from '../lib/googleSheets';
import { SHEETS_CONFIG } from '../config/sheets.config';
import type { Student } from '../types/student';
import type { Record } from '../types/record';
import type { Teacher } from '../types/student';

class SheetsService {
  async fetchAllData() {
    try {
      const [studentsData, recordsData, teachersData] = await Promise.all([
        fetchSheetData(SHEETS_CONFIG.ranges.students),
        fetchSheetData(SHEETS_CONFIG.ranges.records),
        fetchSheetData(SHEETS_CONFIG.ranges.teachers)
      ]);

      // تنسيق السجلات أولاً لأننا نحتاجها لحساب نقاط المعلمين
      const records = this.formatRecords(recordsData);
      
      return {
        students: this.formatStudents(studentsData),
        records: records,
        teachers: this.formatTeachers(teachersData, records)
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  private formatStudents(data: any[]): Student[] {
    return data.map(row => ({
      id: row[0],
      name: row[1],
      grade: row[2],
      section: row[3],
      parentPhone: row[4],
      parentName: row[5],
      notes: row[6],
      status: row[7]
    }));
  }

  private formatRecords(data: any[]): Record[] {
    // تخطي الصف الأول (عناوين الأعمدة)
    const records = data.slice(1).map(row => ({
      id: row[0],
      studentId: row[1],
      studentName: row[2],
      pages: row[3],
      reason: row[4],
      teacher: row[5],
      dateTime: row[6],
      date: row[7],
      studentNumber: row[8],
      teacherName: row[9],
      totalPoints: Number(row[10]) || 0,
      level: row[11],
      badge: row[12]
    }));

    return records.filter(record => record.id); // إرجاع فقط السجلات التي لها معرف
  }

  private formatTeachers(data: any[], records: Record[]): Teacher[] {
    // إنشاء خريطة لحساب مجموع النقاط لكل معلم
    const teacherPoints = new Map<string, number>();
    
    // حساب مجموع النقاط لكل معلم
    records.forEach(record => {
      if (record.teacherName && record.totalPoints) {
        const currentPoints = teacherPoints.get(record.teacherName) || 0;
        teacherPoints.set(record.teacherName, currentPoints + record.totalPoints);
      }
    });

    return data.map(row => {
      const teacherName = row[1];
      return {
        id: row[0],
        name: teacherName,
        subject: row[2],
        username: row[3], // إضافة اسم المستخدم من العمود D
        addedPoints: teacherPoints.get(teacherName) || 0
      };
    });
  }
}

export const sheetsService = new SheetsService();