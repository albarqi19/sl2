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

  const { id } = req.query;

  try {
    switch (req.method) {
      case 'PUT':
        const updatedStudent = req.body as Student;
        
        // Get current data to find the row
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'Students Data!A2:H'
        });
        
        const rows = response.data.values || [];
        const rowIndex = rows.findIndex(row => row[0]?.toString() === id);
        
        if (rowIndex === -1) {
          res.status(404).json({ error: 'Student not found' });
          return;
        }
        
        // Update the row
        const range = `Students Data!A${rowIndex + 2}:H${rowIndex + 2}`; // +2 because we start from A2
        
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[
              id, // Keep the original ID
              updatedStudent.studentName,
              updatedStudent.level,
              updatedStudent.classNumber,
              updatedStudent.violations || '',
              updatedStudent.parts || '',
              updatedStudent.points || 0,
              updatedStudent.phone
            ]]
          }
        });
        
        res.status(200).json(updatedStudent);
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
