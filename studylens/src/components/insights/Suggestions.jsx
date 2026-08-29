import { Sparkle, Trophy, Scale, CalendarRange, TrendingUp, AlertCircle } from "lucide-react";

const ICON_MAP = {
  alert: { Icon: AlertCircle, color: "text-amber-600 dark:text-amber-400" },
  trending: { Icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" },
  calendar: { Icon: CalendarRange, color: "text-blue-600 dark:text-blue-400" },
  trophy: { Icon: Trophy, color: "text-purple-600 dark:text-purple-400" },
  scale: { Icon: Scale, color: "text-orange-600 dark:text-orange-400" },
  default: { Icon: Sparkle, color: "text-purple-600 dark:text-purple-400" },
};

function Suggestions({ suggestions }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Suggestions
      </h2>

      {suggestions.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Complete a few sessions to unlock suggestions.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-slate-800">
          {suggestions.map((s, i) => {
            const item = typeof s === "string" ? { text: s, icon: "default" } : s;
            const { Icon, color } = ICON_MAP[item.icon] || ICON_MAP.default;
            return (
              <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`w-7 h-7 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${color}`}>
                  <Icon size={14} />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 pt-0.5">{item.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Suggestions;