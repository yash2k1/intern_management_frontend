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
import RegisterRequest from './pages/RegisterRequest';
import Members from './pages/Members';
import ForgotPassword from './pages/forgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import ChangePassword from './pages/ChangePassword';
import ProjectList from './pages/projectList';
import ProjectManagement from './pages/ProjectManagement';
import ElevateRole from './pages/ElevateRole';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} /> 
        <Route path="/sign-in" element={<AuthWrapper />} />
        <Route path="/sign-up" element={<AuthWrapper />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-mail" element={<VerifyEmail/>} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/assign-intern" element={<AssignInterns />} />
        <Route path="/ongoing-projects" element={<OngoingProjects />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/members" element={<Members />} />
        <Route path="/project-list" element={<ProjectList/>} />
        <Route path="/project-list/:id" element={<ProjectManagement/>} />
        <Route path="/registration-request" element={<RegisterRequest />} />
        {/* for HR Only */}
        <Route path="/add-new-intern" element={<AddNewIntern />} />
        <Route path="/elevate-role" element={<ElevateRole />} />
        <Route path="/assign-mentor" element={<AssignMentor />} />
      <Route path="*" element={<NotFound/>} /> 
      
    </Routes>
  );
};

export default AppRoutes;

// figma- 50-60%
// frontend-80-90%
// frontend Api integration-
// backend-
// db-