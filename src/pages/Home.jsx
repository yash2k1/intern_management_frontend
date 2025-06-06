import React, { useState } from 'react'
import Navbar from '../Components/Ui/Navbar'
import HrImg from  '../assets/hrImg.png'
import mentorImg from  '../assets/mentorImg.jpg'
import Counter from '../features/counter/Counter'
import Footer from '../Components/Ui/Footer'
import MainButtons from '../Components/Ui/MainButtons'

const Home = () => {
  // for HR
  const buttonDataHR = [
  { title: "Add New Interns", path: "/add-new-intern" },
  { title: "Assign Mentors", path: "/assign-mentor" },
  { title: "Ongoing projects", path: "/ongoing-projects" },
  { title: "Completed", path: "/completed" },
  { title: "Members", path: "/members" },
  { title: "Registration Request", path: "/registration-request" },
  { title: "Elevate role Request", path: "/elevate-role" },
  { title: "Project List ", path: "/project-list" },
  { title: "Certificate Issued", path: "/certificates" },
];
// for Mentor
  const buttonDataMentor = [
  { title: "New Interns", path: "/assign-intern" },
  { title: "Ongoing projects", path: "/ongoing-projects" },
  { title: "Completed", path: "/completed" },
  { title: "Members", path: "/members" },
  { title: "Project List ", path: "/project-list" },
  { title: "Registration Request", path: "/registration-request" },

];
const [data,setData]=useState("");
const [authrization,setAuthrization]=useState("");// can be "HR" or "MENTOR"
useState(
  ()=>{
    
    setData(buttonDataMentor);
    setAuthrization("MENTOR");
    // setData(buttonDataHR);
    // setAuthrization("HR");
  }
  ,[]
)
// temp
function changeAuth(){
  if (authrization=="MENTOR"){
    setData(buttonDataHR);
    setAuthrization("HR");
  }  
  else if (authrization=="HR"){
   setData(buttonDataMentor);
    setAuthrization("MENTOR");
  }
}
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
  {/* <Counter/> */}
  {/* temp */}
  <MainButtons onClick={()=>changeAuth()}title={`Temporary btn ${authrization}`} className={'cursor-pointer px-4 py-2 my-4 mx-auto rounded-full text-sm bg-secondary text-white font-medium shadow-md hover:bg-primary dark:hover:bg-secondary  transition-all  w-50 aspect-auto  sm:aspect-[3/1] sm:w-60 p-4'}/>
  <div className="flex-grow flex flex-col justify-center items-center px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {data.map((btn, index) => (
        <MainButtons key={index} title={btn.title} path={btn.path} className={'cursor-pointer px-4 py-2 rounded-full text-sm bg-secondary text-white font-medium shadow-md hover:bg-primary dark:hover:bg-alert  transition-all  w-full aspect-auto  sm:aspect-[3/1] sm:w-60 p-4'} />
      ))}
    </div>
  </div>
  
  <Footer/>
</div>

  )
}
 
}

export default Home
