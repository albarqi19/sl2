import { google } from 'googleapis';

function validateEnvironmentVariables() {
  const missingVars = [];

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    missingVars.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  }

  if (!process.env.GOOGLE_PRIVATE_KEY) {
    missingVars.push('GOOGLE_PRIVATE_KEY');
  }

  if (!process.env.GOOGLE_SHEETS_ID) {
    missingVars.push('GOOGLE_SHEETS_ID');
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

try {
  validateEnvironmentVariables();

  console.log('Initializing Google Sheets client...');
  console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  console.log('Sheets ID:', process.env.GOOGLE_SHEETS_ID);
  
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!privateKey) {
    throw new Error('Private key is invalid');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  console.log('Google Sheets client initialized successfully');
  
  export const sheets = google.sheets({ version: 'v4', auth });
  export const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
} catch (error) {
  console.error('Error initializing Google Sheets client:', error);
  throw error;
}
