import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sheets, spreadsheetId } from '../config/sheets';
import type { Student } from '../types/student';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'Students Data!A2:H'
        });
        
        const rows = response.data.values || [];
        const students = rows.map(row => ({
          id: row[0]?.toString() || '',
          studentName: row[1]?.toString() || '',
          level: row[2]?.toString() || '',
          classNumber: row[3]?.toString() || '',
          violations: row[4]?.toString() || '',
          parts: row[5]?.toString() || '',
          points: parseInt(row[6]?.toString() || '0'),
          phone: row[7]?.toString() || ''
        }));

        res.status(200).json(students);
        break;

      case 'POST':
        const newStudent = req.body as Student;
        const studentId = newStudent.id;
        
        // التحقق من عدم وجود طالب بنفس رقم الهوية
        const existingResponse = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'Students Data!A2:A'
        });
        
        const existingIds = existingResponse.data.values || [];
        if (existingIds.some(row => row[0]?.toString() === studentId)) {
          res.status(400).json({ error: 'رقم الهوية مستخدم مسبقاً' });
          return;
        }
        
        // Get current data to find the last row
        const currentData = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'Students Data!A2:H'
        });
        
        const currentRows = currentData.data.values || [];
        const newRowIndex = currentRows.length + 2; // +2 because we start from A2
        
        // Add the new row
        const range = `Students Data!A${newRowIndex}:H${newRowIndex}`;
        
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[
              studentId,
              newStudent.studentName,
              newStudent.level,
              newStudent.classNumber,
              newStudent.violations || '',
              newStudent.parts || '',
              newStudent.points || 0,
              newStudent.phone
            ]]
          }
        });
        
        res.status(200).json({ id: studentId, ...newStudent });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
