import { Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InsightBanner({ message, focusSubject }) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 rounded-2xl p-6 flex items-center justify-between gap-6 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shrink-0">
          <Sparkles size={20} className="text-purple-600" />
        </div>
        <p className="text-gray-900 dark:text-white font-medium">{message}</p>
      </div>

      {focusSubject && (
        <button
          onClick={() => navigate("/focus", { state: { subject: focusSubject } })}
          className="bg-purple-600 text-white text-sm font-medium rounded-xl px-4 py-2.5 flex items-center gap-2 shrink-0"
        >
          <Play size={16} />
          Start focus
        </button>
      )}
    </div>
  );
}

export default InsightBanner;
