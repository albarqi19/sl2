import express from 'express';
import { sheets, spreadsheetId } from '../config/sheets.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Record Data!A2:M'
    });
    
    const rows = response.data.values || [];
    const records = rows.map(row => ({
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
      totalPoints: parseInt(row[10]?.toString() || '0'),
      level: row[11]?.toString() || '',
      badge: row[12]?.toString() || ''
    }));

    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Failed to fetch records data' });
  }
});

export default router;