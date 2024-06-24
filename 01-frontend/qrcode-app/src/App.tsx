import React from 'react';
import './App.css';
import { Navbar } from './Layouts/NavAndFooter/NavBar';
import { Footer } from './Layouts/NavAndFooter/Footer';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SearchPartsPage } from './Layouts/SearchPartsPage/SearchPartsPage';
import { PartDetail } from './Layouts/MachinePartsPage/PartDetailPage';
import { PartForm } from './Layouts/FormPage/PartFormPage';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<Navigate to='/search' />} />
          <Route path='/search' element={<SearchPartsPage />} />
          <Route path='/detail/:id' element={<PartDetail />} />
          <Route path='/form/:id' element={<PartForm />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
