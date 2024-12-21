import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { StudentsPage } from './pages/StudentsPage';
import { RecordsPage } from './pages/RecordsPage';
import { TeachersPage } from './pages/TeachersPage';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'rtl',
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        }}
      />
    </Router>
  );
}