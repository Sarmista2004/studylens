const RING_COLORS = ["#9333ea", "#10b981", "#f59e0b", "#64748b", "#3b82f6", "#ec4899"];

function SubjectDonut({ subjects }) {
  const total = subjects.reduce((sum, s) => sum + s.minutes, 0);

  let cumulative = 0;
  const segments = subjects.map((s, i) => {
    const dash = total > 0 ? (s.minutes / total) * 251.3 : 0;
    const offset = -cumulative;
    cumulative += dash;
    return { ...s, dash, offset, color: RING_COLORS[i % RING_COLORS.length] };
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Time by subject
      </h2>

      {subjects.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Complete a focus session to see this chart.
        </p>
      ) : (
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 100 100" className="w-[74px] h-[74px] shrink-0 -rotate-90">
            {segments.map((s, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={s.color}
                strokeWidth="16"
                strokeDasharray={`${s.dash} 251.3`}
                strokeDashoffset={s.offset}
              />
            ))}
          </svg>

          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            {segments.map((s, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 truncate">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: s.color }}
                  />
                  {s.name}
                </span>
                <span className="text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                  {s.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectDonut;
