function levelFor(minutes) {
  if (minutes <= 0) return 0;
  if (minutes < 30) return 1;
  if (minutes < 60) return 2;
  return 3;
}

const LEVEL_STYLES = [
  "bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700",
  "bg-purple-200 dark:bg-purple-900",
  "bg-purple-400 dark:bg-purple-700",
  "bg-purple-600 dark:bg-purple-500",
];

function WeekHeatmap({ weeklyTrend }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 transition-colors">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          This week
        </h2>

        <div className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
          <span>Less</span>

          {LEVEL_STYLES.map((cls, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${cls}`}
            />
          ))}

          <span>More</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="flex justify-start pl-12">
        <div className="flex gap-9">
          {weeklyTrend.map((day) => (
            <div
              key={day.dateStr}
              className="flex flex-col items-center"
            >
              <div
                title={`${day.day}: ${day.minutes} min`}
                className={`
                  w-10
                  h-10
                  rounded-md
                  transition-all
                  duration-200
                  hover:scale-110
                  cursor-pointer
                  ${LEVEL_STYLES[levelFor(day.minutes)]}
                `}
              />

              <span className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeekHeatmap;