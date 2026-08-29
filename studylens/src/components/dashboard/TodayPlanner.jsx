import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

function formatTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function TodayPlanner({ events }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Today's planner
          </h2>
        </div>

        <button
          onClick={() => navigate("/planner")}
          className="text-sm text-purple-600 dark:text-purple-400"
        >
          View all
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nothing scheduled today.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {events.slice(0, 4).map((event) => (
            <div key={event.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                {event.start_time ? `${formatTime(event.start_time)} · ` : ""}
                {event.title}
              </span>
              {event.subject && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  {event.subject}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/planner")}
        className="text-sm text-purple-600 dark:text-purple-400 mt-4"
      >
        + Add new event
      </button>
    </div>
  );
}

export default TodayPlanner;