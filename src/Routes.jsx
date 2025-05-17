import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import AuthWrapper from './pages/AuthWrapper';// this contain both sign in and sign up
import Home from './pages/Home';
import NewInterns from './pages/NewInterns';
import OngoingProjects from './pages/OngoingProjects';
import Completed from './pages/completed';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home/>} /> 
        <Route path="/signIn" element={<AuthWrapper />} />
        <Route path="/signUp" element={<AuthWrapper />} />
        <Route path="/new-interns" element={<NewInterns />} />
        <Route path="/ongoing-projects" element={<OngoingProjects />} />
        <Route path="/completed" element={<Completed />} />
        
      <Route path="*" element={<NotFound/>} /> 
      
    </Routes>
  );
};

export default AppRoutes;
