import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Navbar from '../Components/Ui/Navbar';
import HrImg from '../assets/hrImg.png';
import mentorImg from '../assets/mentorImg.jpg';
import internImg from '../assets/internImg.jpg';
import Footer from '../Components/Ui/Footer';
import MainButtons from '../Components/Ui/MainButtons';

const Home = () => {
  const navigate = useNavigate();

  // Button definitions for each role
  const buttonDataHR = [
    // { title: "Add New Interns", path: "/add-new-intern" },
    { title: "Intern Registration", path: "/intern-registration" },
    { title: "Assign Mentors", path: "/assign-mentor" },
    // { title: "Ongoing projects", path: "/ongoing-projects" },
    { title: "Members", path: "/members" },
    { title: "Registration Request", path: "/registration-request" },
    // { title: "Elevate role Request", path: "/elevate-role" },
    // { title: "Project List", path: "/project-list" },
    { title: "Departments", path: "/departments" },
    { title: "Completed", path: "/completed" },
  ];

  const buttonDataMentor = [
    { title: "Intern Registration", path: "/intern-registration" },
    { title: "New Interns", path: "/assign-intern" },
    // { title: "Ongoing projects", path: "/ongoing-projects" },
    // { title: "Completed", path: "/completed" },
    // { title: "Members", path: "/members" },
    // { title: "Project List", path: "/project-list" },
    { title: "Registration Request", path: "/registration-request" },
  ];

  const buttonDataIntern = [
    { title: "My Profile", path: "/my-profile" },
    // { title: "My Projects", path: "/my-projects" },
    // { title: "Calendar", path: "/my-tasks" },
    // { title: "Upload Achievements", path: "/upload-achievements" },
    { title: "View Certificates", path: "/my-certificate" },
  ];

  const [data, setData] = useState(null);
  const [authorization, setAuthorization] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/sign-in", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const { role, exp } = decoded;

      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("token");
        navigate("/sign-in", { replace: true });
        return;
      }

      if (role === "HR") {
        setData(buttonDataHR);
        setAuthorization("HR");
      } else if (role === "MENTOR") {
        setData(buttonDataMentor);
        setAuthorization("MENTOR");
      } else if (role === "INTERN") {
        setData(buttonDataIntern);
        setAuthorization("INTERN");
      } else {
        navigate("/sign-in", { replace: true });
      }
    } catch (err) {
      console.error("Token decode error:", err);
      localStorage.removeItem("token");
      navigate("/sign-in", { replace: true });
    }
  }, [navigate]);

  if (!data || !authorization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-background dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background text-black dark:text-white flex flex-col">
      <Navbar />

      {/* Banner */}
      <div
        className="relative h-52 w-full flex items-end px-8 py-6"
        style={{ background: 'linear-gradient(to bottom, #4A90E2, #002147)' }}
      >
        <h1 className="text-white text-3xl sm:text-4xl font-bold z-10">{authorization}</h1>
        <img
          src={
            authorization === "HR"
              ? HrImg
              : authorization === "MENTOR"
                ? mentorImg
                : internImg
          }
          alt="Role Background"
          className="absolute right-0 bottom-0 h-full object-contain opacity-40 pointer-events-none select-none"
        />
      </div>

      {/* Button Grid */}
      <div className="flex-grow flex flex-col justify-center items-center px-4 py-8">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {data.map((btn, index) => (
            <MainButtons
              key={index}
              title={btn.title}
              path={btn.path}
              className="cursor-pointer px-4 py-2 rounded-full text-sm bg-secondary text-white font-medium shadow-md hover:bg-primary dark:hover:bg-primary transition-all w-full aspect-auto sm:aspect-[3/1] md:w-60 p-4"
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
