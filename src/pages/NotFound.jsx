import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainButtons from '../Components/Ui/MainButtons';

const funnyLines = [
  "You've taken a wrong turn at the internet crossroads.",
  "This page fell into a black hole.",
  "Oops! Someone stole this page.",
  "404 – Nothing but digital tumbleweeds here.",
  "The page you're looking for is off on a coffee break ☕",
  "Looks like this page has gone incognito.",
  "Error 404: Page not found but donuts found 🍩",
  "You're lost... but you're doing great!",
  "The page you seek has left the building.",
  "You’ve reached the end of the internet. Congratulations!",
  "404? More like 4-oh-no!",
  "We couldn't find that page, but we found this cat 🐱",
  "Turn around, bright eyes… this page isn’t here.",
  "It’s not you, it’s the page.",
  "This page ran away with another page."
];

export default function NotFound() {
  const [line, setLine] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyLines.length);
    setLine(funnyLines[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="text-6xl font-extrabold text-[#4A90E2] mb-4">404</h1>
      <p className="text-2xl font-semibold mb-4">Page Not Found</p>
      <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-8">{line}</p>

      <MainButtons
        title={"Go to Home"}
        onClick={() => navigate("/")}
        className="relative cursor-pointer px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 overflow-hidden group"
      />

    </div>
  );
}
