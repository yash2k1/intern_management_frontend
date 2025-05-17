
import { useNavigate } from "react-router-dom";

const ButtonCard=({ title, path }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="cursor-pointer w-full aspect-auto  sm:aspect-[3/1] sm:w-60 p-4 bg-secondary text-white font-medium rounded-xl shadow-md hover:bg-primary dark:hover:bg-alert  transition-all"
    >
      {title}
    </button>
  );
}
export default ButtonCard;