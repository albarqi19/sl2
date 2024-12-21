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
    // التحقق من متغيرات البيئة
    if (!spreadsheetId) {
      console.error('GOOGLE_SHEETS_ID is not set');
      throw new Error('Google Sheets ID is not configured');
    }

    switch (req.method) {
      case 'GET':
        try {
          console.log('Fetching students data...');
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Students Data!A2:H'
          });
          
          console.log('Response received:', response.status);
          
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

          console.log(`Successfully fetched ${students.length} students`);
          res.status(200).json(students);
        } catch (error) {
          console.error('Error fetching students:', error);
          throw error;
        }
        break;

      case 'POST':
        try {
          console.log('Adding new student...');
          const newStudent = req.body as Student;
          const studentId = newStudent.id;
          
          console.log('Student data:', { id: studentId, ...newStudent });
          
          // التحقق من عدم وجود طالب بنفس رقم الهوية
          const existingResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Students Data!A2:A'
          });
          
          const existingIds = existingResponse.data.values || [];
          if (existingIds.some(row => row[0]?.toString() === studentId)) {
            console.log('Duplicate student ID:', studentId);
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
          console.log('Adding to range:', range);
          
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
          
          console.log('Student added successfully');
          res.status(200).json({ id: studentId, ...newStudent });
        } catch (error) {
          console.error('Error adding student:', error);
          throw error;
        }
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = error instanceof Error ? error.stack : '';
    res.status(500).json({ 
      error: 'Internal server error', 
      message: errorMessage,
      details: errorDetails,
      timestamp: new Date().toISOString()
    });
  }
}
