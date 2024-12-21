import express from 'express';
import { sheets, spreadsheetId } from '../config/sheets.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'المعلمين!A2:C'
    });
    
    const rows = response.data.values || [];
    const teachers = rows.map(row => ({
      name: row[0]?.toString() || '',
      limit: parseInt(row[1]?.toString() || '0'),
      username: row[2]?.toString() || ''
    }));

    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Failed to fetch teachers data' });
  }
});

export default router;