import { Clock3, BookOpen, Target, Flame, CalendarDays, BarChart3 } from "lucide-react";
import useStudyData from "../../hooks/useStudyData";
import StatCard from "../../components/analytics/StatCard";
import TrendLine from "../../components/analytics/TrendLine";
import SubjectDonut from "../../components/analytics/SubjectDonut";
import SubjectOverviewTable from "../../components/analytics/SubjectOverviewTable";

function Analytics() {
  const {
    subjects,
    weeklyMinutes,
    weeklyTrend,
    goalPercentage,
    longestStreak,
    bestDay,
    subjectBreakdown,
    subjectOverview,
  } = useStudyData();

  const weeklyHours = Math.floor(weeklyMinutes / 60);
  const weeklyRemainingMinutes = weeklyMinutes % 60;

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white p-5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
          <BarChart3 size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold leading-tight">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Track your study performance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <StatCard
          icon={<Clock3 size={18} className="text-purple-600" />}
          title="Study time this week"
          value={`${weeklyHours}h ${weeklyRemainingMinutes}m`}
        />
        <StatCard
          icon={<BookOpen size={18} className="text-emerald-600" />}
          title="Subjects tracked"
          value={subjects.length}
        />
        <StatCard
          icon={<Target size={18} className="text-amber-600" />}
          title="Goal completion"
          value={`${goalPercentage}%`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <TrendLine data={weeklyTrend} />
        <SubjectDonut subjects={subjectBreakdown} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatCard
          icon={<Flame size={18} className="text-orange-500" />}
          title="Longest streak"
          value={`${longestStreak} ${longestStreak === 1 ? "day" : "days"}`}
        />
        <StatCard
          icon={<CalendarDays size={18} className="text-blue-600" />}
          title="Most productive day"
          value={bestDay.minutes > 0 ? bestDay.day : "—"}
        />
      </div>

      <div className="mt-4">
        <SubjectOverviewTable rows={subjectOverview} />
      </div>
    </div>
  );
}

export default Analytics;