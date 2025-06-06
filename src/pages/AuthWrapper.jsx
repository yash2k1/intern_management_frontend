
// AuthWrapper.jsx
import { useLocation } from 'react-router-dom';
import LoginForm from '../Components/Ui/LoginForm'
import { useEffect, useState } from 'react';
export default function AuthWrapper() {
  const location = useLocation();
   const [mode, setMode] = useState('sign-in');

  useEffect(() => {
    if (location.pathname.includes('sign-up')) {
      setMode('sign-up');
    } else {
      setMode('sign-in');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      {/* sending pros Authentication=sign in/ sign up */}
      <LoginForm mode={mode} />
    </div>

  );
}