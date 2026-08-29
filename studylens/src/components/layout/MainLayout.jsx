import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors">

        <Navbar />

        <Outlet />

      </div>

    </div>
  );
}

export default MainLayout;