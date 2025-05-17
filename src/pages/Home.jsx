import React, { useState } from 'react'
import Navbar from '../Components/Ui/Navbar'
import ButtonCard from '../Components/Ui/ButtonCard'
import HrImg from  '../assets/hrImg.png'
import mentorImg from  '../assets/mentorImg.jpg'
import Counter from '../features/counter/Counter'

const Home = () => {
  // for HR
  const buttonDataHR = [
  { title: "Add New Interns", path: "/add-interns" },
  { title: "Assign Mentors", path: "/assign-mentors" },
  { title: "Ongoing projects", path: "/ongoing-projects" },
  { title: "Completed", path: "/completed" },
  { title: "Certificate Issued", path: "/certificates" },
];
// for Mentor
  const buttonDataMentor = [
  { title: "New Interns", path: "/new-interns" },
  { title: "Ongoing projects", path: "/ongoing-projects" },
  { title: "Completed", path: "/completed" },
];
const [data,setData]=useState("");
const [authrization,setAuthrization]=useState("");// can be "HR" or "MENTOR"
useState(
  ()=>{
    setData(buttonDataMentor);
    setAuthrization("MENTOR");
    // setAuthrization("HR");
  }
  ,[]
)
if (!data || !authrization){
  return(  
  <div className="min-h-screen items-center justify-center  bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
     Rendering...
    </div>
    )
}else{
 return (

   <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
  <Navbar />

  {/* Banner Section */}
  <div
    className="relative h-52 w-full flex items-end px-8 py-6"
    style={{
      background: 'linear-gradient(to bottom, #4A90E2, #002147)', 
    }}
  >
    {/* Text */}
    <h1 className="text-white text-3xl sm:text-4xl font-bold z-10">{authrization}</h1>

    {/* Blended Image */}
    <img
      src={authrization==="HR"?HrImg:mentorImg}
      alt="HR Background"
      className="absolute right-0 bottom-0 h-full object-contain opacity-40 pointer-events-none select-none"
    />
  </div>

  {/* Button Grid Section */}
  <Counter/>
  <div className="flex-grow flex flex-col justify-center items-center px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {data.map((btn, index) => (
        <ButtonCard key={index} title={btn.title} path={btn.path} />
      ))}
    </div>
  </div>
</div>

  )
}
 
}

export default Home
