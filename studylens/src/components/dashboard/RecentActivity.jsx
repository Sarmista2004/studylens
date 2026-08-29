import { Flame, CheckCircle2 } from "lucide-react";

function timeAgo(timestamp) {
  const date = new Date(timestamp);
  const isToday = date.toDateString() === new Date().toDateString();
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return isToday ? `Today, ${time}` : `${date.toLocaleDateString()}, ${time}`;
}

function RecentActivity({ activity }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent activity
          </h2>
        </div>
      </div>

      {activity.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Complete a focus session to see activity here.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {activity.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                {item.text}
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                {timeAgo(item.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
