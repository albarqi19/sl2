import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import studentsRouter from './routes/students.js';
import recordsRouter from './routes/records.js';
import teachersRouter from './routes/teachers.js';

// تحميل المتغيرات البيئية
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentsRouter);
app.use('/api/records', recordsRouter);
app.use('/api/teachers', teachersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});