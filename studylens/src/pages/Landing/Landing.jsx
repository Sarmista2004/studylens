import { Link } from "react-router-dom";
import { Search, Flame, Calendar, BarChart3, ArrowRight } from "lucide-react";
import heroImg from "../../assets/hero.jpeg";
import logoIcon from "../../assets/logo-icon.svg";

const FEATURES = [
  {
    icon: <Flame size={20} className="text-orange-500" />,
    title: "Stay consistent",
    desc: "Track streaks and daily goals so momentum never slips.",
  },
  {
    icon: <Calendar size={20} className="text-purple-600" />,
    title: "Plan your day",
    desc: "Schedule study blocks and events without leaving the app.",
  },
  {
    icon: <BarChart3 size={20} className="text-emerald-600" />,
    title: "See your progress",
    desc: "Analytics and AI-driven insights on every subject you track.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Nav */}
      <div className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <img src={logoIcon} alt="" className="w-10 h-10" />
          <span className="text-xl font-bold text-purple-600">StudyLens</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-8 pt-12 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <Search size={14} />
            Study smarter, not just longer
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Focus, track, and understand{" "}
            <span className="text-purple-600">how you study</span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg mt-5 max-w-md">
            StudyLens brings your subjects, focus sessions, planner, and
            analytics into one place — so you always know what to work on
            next.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Link
              to="/register"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl px-6 py-3 text-sm transition-colors"
            >
              Get started free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={heroImg}
            alt="StudyLens app preview"
            className="w-full max-w-md rounded-2xl"
          />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-8 pb-24 grid md:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-1.5">
              {f.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;