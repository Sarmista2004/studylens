function GoalRing({ percentage, completedMin, goalMin }) {
  const clamped = Math.min(100, percentage);
  const completedH = Math.floor(completedMin / 60);
  const completedM = completedMin % 60;
  const leftMin = Math.max(0, goalMin - completedMin);
  const leftH = Math.floor(leftMin / 60);
  const leftM = leftMin % 60;
  const goalH = Math.floor(goalMin / 60);
  const goalM = goalMin % 60;

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
        Today's goal progress
      </h2>

      <div className="flex items-center gap-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: `conic-gradient(#9333ea ${clamped}%, #e5e7eb ${clamped}%)`,
          }}
        >
          <div className="w-[68px] h-[68px] rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {clamped}%
            </span>
          </div>
        </div>

        <div className="text-sm space-y-2">
          <p className="text-gray-500 dark:text-gray-400">
            Completed{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              {completedH}h {completedM}m
            </span>
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Left{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              {leftH}h {leftM}m
            </span>
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Goal{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              {goalH}h {goalM}m
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoalRing;
