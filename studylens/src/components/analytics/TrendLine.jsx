function TrendLine({ data }) {
  const maxMinutes = Math.max(...data.map((d) => d.minutes), 60);
  const width = 220;
  const height = 70;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.minutes / maxMinutes) * height;
    return { x, y, minutes: d.minutes };
  });

  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(" ");
  const maxHours = Math.ceil(maxMinutes / 60);

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Weekly trend
      </h2>

      <div className="flex gap-2">
        <div className="flex flex-col justify-between text-xs text-gray-400 dark:text-gray-500 h-[70px] pb-1">
          <span>{maxHours}h</span>
          <span>{Math.round(maxHours / 2)}h</span>
          <span>0h</span>
        </div>

        <div className="flex-1">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[70px]">
            <line x1="0" y1="8" x2={width} y2="8" stroke="currentColor" className="text-gray-100 dark:text-slate-800" strokeWidth="1" />
            <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="currentColor" className="text-gray-100 dark:text-slate-800" strokeWidth="1" />
            <line x1="0" y1={height} x2={width} y2={height} stroke="currentColor" className="text-gray-100 dark:text-slate-800" strokeWidth="1" />
            <polyline points={pointsStr} fill="none" stroke="#9333ea" strokeWidth="2.5" />
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#9333ea" />
            ))}
          </svg>

          <div className="flex gap-1 mt-1">
            {data.map((d) => (
              <span
                key={d.day}
                className="flex-1 text-center text-[10px] text-gray-400 dark:text-gray-500"
              >
                {d.day[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendLine;
