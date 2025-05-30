import { useNavigate } from "react-router-dom";
// useage Example for this Btn 
{/* <MainButtons
  title="Accepted"
  onClick={() => onConfirm({ title, subTitle, description })}
  className="px-4 py-2 rounded-full text-white text-sm bg-secondary hover:bg-primary"
/> */}
const MainButtons = ({ title, path, onClick, className = "" ,disabled=false}) => {
  const navigate = useNavigate();

 const handleClick = async (e) => {
  e.preventDefault();
  try {
    if (onClick) {
      await onClick(); // now safely wrapped
    }
    if (path) {
      navigate(path);
    }
  } catch (err) {
    console.error("Button click failed:", err);
  }
};


  return (
    <button
      onClick={handleClick}
      className={className==""?"cursor-pointer px-4 py-2 rounded-full text-sm bg-secondary text-white font-medium shadow-md hover:bg-primary dark:hover:bg-alert  transition-all" :className}
    disabled={disabled}
    >
      {title}
    </button>
  );
};

export default MainButtons;