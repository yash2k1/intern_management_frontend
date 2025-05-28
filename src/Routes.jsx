import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import AuthWrapper from './pages/AuthWrapper';// this contain both sign in and sign up
import Home from './pages/Home';
import AssignInterns from './pages/AssignInterns';
import OngoingProjects from './pages/OngoingProjects';
import Completed from './pages/completed';
import AddNewIntern from './pages/AddNewIntern';
import AssignMentor from './pages/AssignMentor';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home/>} /> 
        <Route path="/signIn" element={<AuthWrapper />} />
        <Route path="/signUp" element={<AuthWrapper />} />
        <Route path="/assign-intern" element={<AssignInterns />} />
        <Route path="/ongoing-projects" element={<OngoingProjects />} />
        <Route path="/completed" element={<Completed />} />
        {/* for HR Only */}
        <Route path="/add-new-intern" element={<AddNewIntern />} />
        <Route path="/assign-mentor" element={<AssignMentor />} />
      <Route path="*" element={<NotFound/>} /> 
      
    </Routes>
  );
};

export default AppRoutes;
