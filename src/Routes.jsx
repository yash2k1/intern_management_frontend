import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import SignIn from './pages/signIn';
import Home from './pages/Home';
// frontend\src\pages\SignIn.jsx

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home/>} /> 
      <Route path="/SignIn" element={<SignIn/>} /> 
      <Route path="*" element={<NotFound/>} /> 
      
    </Routes>
  );
};

export default AppRoutes;
