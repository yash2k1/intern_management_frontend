
// AuthWrapper.jsx
import { useLocation } from 'react-router-dom';
import LoginForm from '../Components/Ui/LoginForm'
import Navbar from '../Components/Ui/Navbar';
import { useEffect, useState } from 'react';
export default function AuthWrapper() {
  const location = useLocation();
   const [mode, setMode] = useState('signIn');

  useEffect(() => {
    if (location.pathname.includes('signUp')) {
      setMode('signUp');
    } else {
      setMode('signIn');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar/>
      {/* sending pros Authentication=sign in/ sign up */}
      <LoginForm mode={mode} />
    </div>

  );
}