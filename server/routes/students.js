import express from 'express';
import { sheets, spreadsheetId } from '../config/sheets.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
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

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students data' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newStudent = req.body;
    const studentId = newStudent.id; // استخدام رقم الهوية المرسل من واجهة المستخدم
    
    // التحقق من عدم وجود طالب بنفس رقم الهوية
    const existingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Students Data!A2:A'
    });
    
    const existingIds = existingResponse.data.values || [];
    if (existingIds.some(row => row[0]?.toString() === studentId)) {
      return res.status(400).json({ error: 'رقم الهوية مستخدم مسبقاً' });
    }
    
    console.log('Adding new student:', { id: studentId, ...newStudent });
    
    // Get current data to find the last row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Students Data!A2:H'
    });
    
    const rows = response.data.values || [];
    const newRowIndex = rows.length + 2; // +2 because we start from A2
    
    // Add the new row
    const range = `Students Data!A${newRowIndex}:H${newRowIndex}`;
    console.log('Adding to range:', range);
    
    const updateResponse = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
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
    
    console.log('Add response:', updateResponse.data);
    res.json({ id: studentId, ...newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student data', details: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = req.body;
    
    console.log('Updating student with ID:', id);
    console.log('Updated data:', updatedStudent);
    
    // Get current data to find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Students Data!A2:H'
    });
    
    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0]?.toString() === id);
    
    console.log('Found student at row index:', rowIndex);
    
    if (rowIndex === -1) {
      console.log('Student not found with ID:', id);
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Update the row
    const range = `Students Data!A${rowIndex + 2}:H${rowIndex + 2}`; // +2 because we start from A2
    console.log('Updating range:', range);
    
    const updateResponse = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
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
    
    console.log('Update response:', updateResponse.data);
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student data', details: error.message });
  }
});

export default router;