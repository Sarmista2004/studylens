import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExitButton() {

  const navigate = useNavigate();

  function handleExit() {

    navigate("/study");

  }

  return (

    <button
      onClick={handleExit}
      aria-label="Exit focus"
      className="
        flex
        items-center
        gap-2
        px-5
        py-3
        rounded-full
        bg-red-500/15
        border
        border-red-500/40
        text-red-400
        hover:bg-red-500
        hover:text-white
        hover:border-red-500
        transition
        duration-300
        backdrop-blur-sm
        shrink-0
      "
    >

      <LogOut size={18} />
      <span className="font-medium">Exit</span>

    </button>

  );

}

export default ExitButton;