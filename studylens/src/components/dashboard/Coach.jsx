import { Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Coach({ message, focusSubject }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} />
          <h2 className="text-lg font-semibold">Coach</h2>
        </div>

        <p className="text-sm leading-relaxed opacity-90">{message}</p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() =>
            navigate("/focus", { state: { subject: focusSubject } })
          }
          className="bg-white text-purple-700 font-semibold text-sm rounded-xl px-4 py-2 flex items-center gap-2"
        >
          <Play size={16} />
          Start focus
        </button>

        <a
          href="/insights"
          className="text-sm opacity-90 hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            navigate("/insights");
          }}
        >
          View full insights →
        </a>
      </div>
    </div>
  );
}

export default Coach;
