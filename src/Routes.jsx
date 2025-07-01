import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import AuthWrapper from './pages/AuthWrapper';
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

import ProtectedRoute from './ProtectedRoute';
import ResetPassword from './pages/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-in" element={<AuthWrapper />} />
      <Route path="/sign-up" element={<AuthWrapper />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />
      <Route path="/change-password" element={
         <ProtectedRoute><ChangePassword /></ProtectedRoute>
        } />
      <Route path="/assign-intern" element={
        <ProtectedRoute><AssignInterns /></ProtectedRoute>
      } />
      <Route path="/ongoing-projects" element={
        <ProtectedRoute><OngoingProjects /></ProtectedRoute>
      } />
      <Route path="/completed" element={
        <ProtectedRoute><Completed /></ProtectedRoute>
      } />
      <Route path="/members" element={
        <ProtectedRoute><Members /></ProtectedRoute>
      } />
      <Route path="/project-list" element={
        <ProtectedRoute><ProjectList /></ProtectedRoute>
      } />
      <Route path="/project-list/:id" element={
        <ProtectedRoute><ProjectManagement /></ProtectedRoute>
      } />
      <Route path="/registration-request" element={
        <ProtectedRoute><RegisterRequest /></ProtectedRoute>
      } />
      {/* for HR Only */}
      <Route path="/add-new-intern" element={
        <ProtectedRoute><AddNewIntern /></ProtectedRoute>
      } />
      <Route path="/elevate-role" element={
        <ProtectedRoute><ElevateRole /></ProtectedRoute>
      } />
      <Route path="/assign-mentor" element={
        <ProtectedRoute><AssignMentor /></ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
