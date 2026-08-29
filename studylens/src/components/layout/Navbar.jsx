import { Bell, Search, UserCircle, Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-8 transition-colors">

      <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl px-4 py-2 w-96">

        <Search size={18} className="text-gray-500 dark:text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full text-gray-900 dark:text-white placeholder:text-gray-400"
        />

      </div>

      <div className="flex items-center gap-5">

        <Bell size={22} className="text-gray-700 dark:text-gray-300" />

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <UserCircle size={30} className="text-gray-700 dark:text-gray-300" />

      </div>

    </div>
  );
}

export default Navbar;