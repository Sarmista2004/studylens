import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoIcon from "../../assets/logo-icon.svg";
import {
  LayoutDashboard,
  BookOpen,
  Timer,
  Calendar,
  BarChart3,
  Sparkles,
  Settings,
} from "lucide-react";
import { api } from "../../lib/api";

const STUDY_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Study", path: "/study", icon: <BookOpen size={20} /> },
  { name: "Focus", path: "/focus", icon: <Timer size={20} /> },
  { name: "Planner", path: "/planner", icon: <Calendar size={20} /> },
];

const INSIGHT_ITEMS = [
  { name: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
  { name: "Insights", path: "/insights", icon: <Sparkles size={20} /> },
];

function NavGroup({ label, items }) {
  return (
    <div className="mb-6">
      <p className="px-4 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-2">
        {label}
      </p>

      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  const [name, setName] = useState("");

  useEffect(() => {
    api
      .getSettings()
      .then((data) => setName(data.name || ""))
      .catch((err) => console.error("Failed to load settings:", err));
  }, []);

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-2 mb-10">
       <img src={logoIcon} alt="" className="w-6 h-6" />
       <h1 className="text-2xl font-bold text-purple-600">StudyLens</h1>
    </div>

      <div className="flex-1">
        <NavGroup label="Study" items={STUDY_ITEMS} />
        <NavGroup label="Insights" items={INSIGHT_ITEMS} />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
              isActive
                ? "bg-purple-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </div>

      <NavLink
        to="/settings"
        className="flex items-center gap-3 px-3 py-3 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center font-semibold text-sm shrink-0">
          {name?.[0]?.toUpperCase() || "?"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {name || "..."}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Keep going 🚀</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Sidebar;