import { useState } from "react";
import { Sparkles, Flame, Trophy } from "lucide-react";
import useStudyData from "../../hooks/useStudyData";
import InsightBanner from "../../components/insights/InsightBanner";
import SubjectStatusList from "../../components/insights/SubjectStatusList";
import Suggestions from "../../components/insights/Suggestions";
import StatCard from "../../components/dashboard/StatCard";
import WeekHeatmap from "../../components/insights/WeekHeatmap";

function buildSuggestions({ subjectStatus, lightestDay, bestDay, streak, longestStreak, subjectBreakdown }) {
  const suggestions = [];

  const weakest = subjectStatus.find((s) => s.status === "Needs attention");
  if (weakest) {
    suggestions.push({
      icon: "alert",
      text: `Focus on ${weakest.name} for your next session — it's the one falling behind.`,
    });
  }

  const strongest = subjectStatus.find((s) => s.status === "Strong");
  if (strongest) {
    suggestions.push({
      icon: "trending",
      text: `${strongest.name} is ahead of goal — a short session today keeps the momentum.`,
    });
  }

  // Longest streak comparison
  if (longestStreak > 0) {
    if (streak >= longestStreak) {
      suggestions.push({
        icon: "trophy",
        text: `You've matched or beaten your longest streak of ${longestStreak} ${longestStreak === 1 ? "day" : "days"} — new record! 🎉`,
      });
    } else {
      suggestions.push({
        icon: "trophy",
        text: `Your longest streak is ${longestStreak} days — you're ${longestStreak - streak} ${longestStreak - streak === 1 ? "day" : "days"} away from beating it.`,
      });
    }
  }

  // Subject imbalance flag
  const dominant = subjectBreakdown.find((s) => s.percent >= 60);
  if (dominant && subjectBreakdown.length > 1) {
    suggestions.push({
      icon: "scale",
      text: `You're spending ${dominant.percent}% of your time on ${dominant.name} — your other subjects may need more attention.`,
    });
  }

  // Best vs lightest day, combined
  if (bestDay && lightestDay && bestDay.day !== lightestDay.day && bestDay.minutes > 0) {
    suggestions.push({
      icon: "calendar",
      text: `${bestDay.day}s are your strongest day (${bestDay.minutes} min) — ${lightestDay.day}s tend to be lightest. Even 15 minutes on ${lightestDay.day} keeps your streak alive.`,
    });
  } else if (lightestDay && lightestDay.minutes >= 0) {
    suggestions.push({
      icon: "calendar",
      text: `${lightestDay.day}s tend to be your lightest day — even 15 minutes keeps your streak alive.`,
    });
  }

  return suggestions;
}

function Insights() {
  const {
    subjects, subjectStatus, lightestDay, bestDay, todayMinutes,
    streak, longestStreak, subjectBreakdown, weeklyTrend,
  } = useStudyData();

  const [bannerDismissed, setBannerDismissed] = useState(false);

  const weakest = subjectStatus.find((s) => s.status === "Needs attention");
  const bannerMessage = weakest
    ? `${weakest.name} needs attention — ${weakest.reason.toLowerCase()}.`
    : subjects.length === 0
    ? "Add a subject on the Study page to get personalized insights."
    : "You're on track across all your subjects right now.";

  const suggestions = buildSuggestions({
    subjectStatus, lightestDay, bestDay, streak, longestStreak, subjectBreakdown,
  });

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white p-5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold leading-tight"> Insights</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Your personal study coach.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <StatCard
          icon={<Flame size={18} className="text-orange-500" />}
          title="Current streak"
          value={`${streak} ${streak === 1 ? "day" : "days"}`}
        />
        <StatCard
          icon={<Trophy size={18} className="text-purple-600" />}
          title="Longest streak"
          value={`${longestStreak} ${longestStreak === 1 ? "day" : "days"}`}
        />
      </div>

      <div className="mt-4">
        <WeekHeatmap weeklyTrend={weeklyTrend} />
      </div>

      {!bannerDismissed && (
        <div className="mt-4">
          <InsightBanner
            message={bannerMessage}
            focusSubject={weakest?.name || subjects[0]?.name}
            onDismiss={() => setBannerDismissed(true)}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <SubjectStatusList subjects={subjectStatus} />
        <Suggestions suggestions={suggestions} />
      </div>
    </div>
  );
}

export default Insights;