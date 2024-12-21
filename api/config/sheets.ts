import { google } from 'googleapis';

if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not set');
}

if (!process.env.GOOGLE_PRIVATE_KEY) {
  throw new Error('GOOGLE_PRIVATE_KEY is not set');
}

if (!process.env.GOOGLE_SHEETS_ID) {
  throw new Error('GOOGLE_SHEETS_ID is not set');
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export const sheets = google.sheets({ version: 'v4', auth });
export const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
