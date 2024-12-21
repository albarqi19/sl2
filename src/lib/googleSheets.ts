import { SHEETS_CONFIG } from '../config/sheets.config';

const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export async function fetchSheetData(range: string) {
  try {
    // استخدام عنوان URL مباشرة من Google Sheets API v4
    const sheetName = range.split('!')[0];
    const rangeNotation = range.split('!')[1];
    
    // بناء النطاق بالشكل الصحيح
    const formattedRange = `${encodeURIComponent(sheetName)}!${rangeNotation}`;
    
    const url = new URL(`${BASE_URL}/${SHEETS_CONFIG.spreadsheetId}/values/${formattedRange}`);
    url.searchParams.append('key', SHEETS_CONFIG.apiKey);
    url.searchParams.append('majorDimension', 'ROWS');
    
    console.log('Fetching sheet data:', {
      sheetName,
      rangeNotation,
      formattedRange,
      url: url.toString().replace(SHEETS_CONFIG.apiKey, '***')
    });
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    // طباعة تفاصيل الاستجابة للتشخيص
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: url.toString().replace(SHEETS_CONFIG.apiKey, '***')
      });
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    
    // طباعة البيانات المستلمة للتشخيص
    console.log('Received data:', {
      range,
      rowCount: data.values?.length || 0,
      hasData: !!data.values
    });

    return data.values || [];
  } catch (error) {
    console.error('Sheet fetch error:', error);
    throw error;
  }
}