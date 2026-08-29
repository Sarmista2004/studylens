import { Clock3 } from "lucide-react";

function formatTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function TodaySchedule({ events, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Clock3 size={18} className="text-purple-600" />
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Today's schedule
        </h2>
      </div>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No events scheduled today.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between text-sm group">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">{event.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {formatTime(event.start_time)}
                  {event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
                  {event.subject ? ` · ${event.subject}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {event.subject && (
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                    {event.subject}
                  </span>
                )}
                <button
                  onClick={() => onDelete(event.id)}
                  className="text-xs text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodaySchedule;