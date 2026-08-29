import rainBg from "../../assets/rain.jpg";
import moonBg from "../../assets/moon.jpg";
import cafeBg from "../../assets/cafe.jpg";
import forestBg from "../../assets/forest.jpg";

import { CloudRain, Trees, Coffee, Moon } from "lucide-react";

export const BACKGROUNDS = [
  {
    id: "rain",
    name: "Rain",
    icon: CloudRain,
    className: "",
    overlayStyle: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${rainBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "forest",
    name: "Forest",
    icon: Trees,
    className: "",
    overlayStyle: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${forestBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "cafe",
    name: "Cafe",
    icon: Coffee,
    className: "",
    overlayStyle: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${cafeBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  {
    id: "night",
    name: "Night",
    icon: Moon,
    className: "",
    overlayStyle: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${moonBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
];
function BackgroundPicker({ selected, onSelect }) {
  return (
    <div className="flex items-center gap-3">
      {BACKGROUNDS.map((bg) => {
        const Icon = bg.icon;
        const active = selected === bg.id;
        return (
          <button
            key={bg.id}
            onClick={() => onSelect(bg.id)}
            aria-label={bg.name}
            className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 backdrop-blur-xl ${
              active
                ? "border-violet-500 bg-white/10 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <Icon size={18} className={active ? "text-violet-300" : "text-gray-300"} />
          </button>
        );
      })}
    </div>
  );
}

export default BackgroundPicker;