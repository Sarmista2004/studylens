import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function bucketColor(minutes) {
  if (minutes >= 240) return "bg-purple-600 text-white";
  if (minutes >= 120) return "bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
  if (minutes > 0) return "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200";
  return "bg-transparent text-gray-700 dark:text-gray-300";
}

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function MonthCalendar({ sessionsByDate, onDayClick }) {
  const [cursor, setCursor] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const cells = buildMonthGrid(year, month);
  const monthLabel = cursor.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const today = new Date();
  const isToday = (d) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const changeMonth = (delta) => {
    setCursor(new Date(year, month + delta, 1));
    setSelectedDay(null);
  };

  const dateStrFor = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const handleDayClick = (d) => {
    setSelectedDay(d);
    if (onDayClick) onDayClick(dateStrFor(d));
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => changeMonth(-1)}
          className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
        >
          <ChevronLeft size={16} />
        </button>

        <p className="font-semibold text-gray-900 dark:text-white">{monthLabel}</p>

        <button
          onClick={() => changeMonth(1)}
          className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-gray-400 dark:text-gray-500 mb-2">
        {DAY_LABELS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const minutes = sessionsByDate[dateStrFor(d)] || 0;
          return (
            <button
              key={i}
              onClick={() => handleDayClick(d)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer transition-transform hover:scale-105 ${bucketColor(
                minutes
              )} ${isToday(d) ? "ring-2 ring-purple-600" : ""} ${
                selectedDay === d ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-5 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> 4+ hours
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-200 dark:bg-purple-900" /> 2–4 hours
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-100 dark:bg-amber-900" /> under 2 hours
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-slate-700" /> no study
        </span>
      </div>
    </div>
  );
}

export default MonthCalendar;