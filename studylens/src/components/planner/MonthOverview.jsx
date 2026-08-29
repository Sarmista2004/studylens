import { CalendarDays, Clock3, Target } from "lucide-react";

function MonthOverview({ totalEvents, plannedMinutes, goalsOnTrack, goalsTotal }) {
  const hours = Math.floor(plannedMinutes / 60);
  const mins = plannedMinutes % 60;

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <p className="font-semibold text-gray-900 dark:text-white mb-4">
        This month overview
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
            <CalendarDays size={16} />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{totalEvents}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total events</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <Clock3 size={16} />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {hours}h {mins}m
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Planned time</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
            <Target size={16} />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {goalsOnTrack}/{goalsTotal}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Goals on track</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthOverview;
