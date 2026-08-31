import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toDateStr(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonday(date) {
  const d = new Date(date);
  const dayOfWeek = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dayOfWeek);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Backend dates can come back as full ISO timestamps
// ("2026-08-09T18:30:00.000Z") — trim to "YYYY-MM-DD".
function normalizeDate(value) {
  if (!value) return value;
  return String(value).split("T")[0];
}

function useStudyData() {
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [activity, setActivity] = useState([]);
  const [settings, setSettings] = useState({ dailyGoalHours: 2, name: "" });
  const [loading, setLoading] = useState(true);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refetch = () => setRefreshIndex((i) => i + 1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [subjectsRes, sessionsRes, eventsRes, activityRes, settingsRes] =
          await Promise.all([
            api.getSubjects(),
            api.getSessions(),
            api.getEvents(),
            api.getActivity(),
            api.getSettings(),
          ]);

        if (cancelled) return;

        setSubjects(subjectsRes || []);
        setSessions((sessionsRes || []).map((s) => ({ ...s, date: normalizeDate(s.date) })));
        setEvents((eventsRes || []).map((e) => ({ ...e, date: normalizeDate(e.date) })));
        setActivity(activityRes || []);
        setSettings({
          name: settingsRes?.name || "",
          dailyGoalHours: settingsRes?.daily_goal_hours || 2,
        });
      } catch (err) {
        console.error("Failed to load study data:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [refreshIndex]);

  const derived = useMemo(() => {
    const today = new Date();
    const todayStr = toDateStr(today);
    const monday = getMonday(today);

    const todayMinutes = sessions
      .filter((s) => s.date === todayStr)
      .reduce((sum, s) => sum + s.minutes, 0);

    const weeklyTrend = DAY_LABELS.map((label, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = toDateStr(date);
      const minutes = sessions
        .filter((s) => s.date === dateStr)
        .reduce((sum, s) => sum + s.minutes, 0);
      return { day: label, dateStr, minutes };
    });

    const weeklyMinutes = weeklyTrend.reduce((sum, d) => sum + d.minutes, 0);

    const sessionDates = new Set(sessions.map((s) => s.date));
    let streak = 0;
    let cursor = new Date(today);
    if (!sessionDates.has(toDateStr(cursor))) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (sessionDates.has(toDateStr(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    const sortedDates = [...sessionDates].sort();
    let longestStreak = 0;
    let running = 0;
    let prevDate = null;
    sortedDates.forEach((dateStr) => {
      const d = new Date(dateStr);
      if (prevDate) {
        const diffDays = Math.round((d - prevDate) / 86400000);
        running = diffDays === 1 ? running + 1 : 1;
      } else {
        running = 1;
      }
      longestStreak = Math.max(longestStreak, running);
      prevDate = d;
    });

    const bestDay = weeklyTrend.reduce(
      (best, d) => (d.minutes > best.minutes ? d : best),
      weeklyTrend[0]
    );

    const subjectMinutes = {};
    sessions.forEach((s) => {
      subjectMinutes[s.subject] = (subjectMinutes[s.subject] || 0) + s.minutes;
    });
    const totalTrackedMinutes = Object.values(subjectMinutes).reduce((a, b) => a + b, 0);
    const subjectBreakdown = Object.entries(subjectMinutes)
      .map(([name, minutes]) => ({
        name,
        minutes,
        percent: totalTrackedMinutes > 0 ? Math.round((minutes / totalTrackedMinutes) * 100) : 0,
      }))
      .sort((a, b) => b.minutes - a.minutes);

    const totalGoalMinutes = subjects.reduce((sum, s) => sum + (s.goal || 0) * 60, 0);
    const totalProgressMinutes = subjects.reduce((sum, s) => sum + (s.progress || 0), 0);
    const goalPercentage =
      totalGoalMinutes === 0 ? 0 : Math.round((totalProgressMinutes / totalGoalMinutes) * 100);

    const dailyGoalMinutes = (settings.dailyGoalHours || 2) * 60;
    const todayGoalPercentage =
      dailyGoalMinutes === 0 ? 0 : Math.min(100, Math.round((todayMinutes / dailyGoalMinutes) * 100));

    const todayEvents = events
      .filter((e) => e.date === todayStr)
      .sort((a, b) => (a.start_time || "").localeCompare(b.start_time || ""));

    const upcomingEvents = events
      .filter((e) => e.date > todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
    const pastEvents = events
  .filter((e) => e.date < todayStr)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5);
    const lightestDay = weeklyTrend.reduce(
      (min, d) => (d.minutes < min.minutes ? d : min),
      weeklyTrend[0]
    );

    const subjectStatus = subjects.map((subj) => {
      const subjSessions = sessions.filter((s) => s.subject === subj.name);
      const lastSession = subjSessions.map((s) => s.date).sort().pop();
      const daysSinceLast = lastSession
        ? Math.round((new Date(todayStr) - new Date(lastSession)) / 86400000)
        : null;

      const goalMinutes = (subj.goal || 0) * 60;
      const percentOfGoal =
        goalMinutes > 0 ? Math.round(((subj.progress || 0) / goalMinutes) * 100) : 0;

      let status = "On track";
      let reason = "On pace with your goal";

      if (daysSinceLast === null || daysSinceLast >= 4) {
        status = "Needs attention";
        reason = daysSinceLast === null ? "Not studied yet" : `Not studied in ${daysSinceLast} days`;
      } else if (percentOfGoal >= 100) {
        status = "Strong";
        reason = `${percentOfGoal}% of goal completed`;
      }

      return { ...subj, status, reason, percentOfGoal };
    });

    const subjectOverview = subjects.map((subj) => {
      const subjSessions = sessions.filter((s) => s.subject === subj.name);
      const totalMin = subjSessions.reduce((sum, s) => sum + s.minutes, 0);
      const count = subjSessions.length;
      const avgMin = count > 0 ? Math.round(totalMin / count) : 0;
      const goalMinutes = (subj.goal || 0) * 60;
      const completion =
        goalMinutes > 0 ? Math.min(100, Math.round((totalMin / goalMinutes) * 100)) : 0;
      return { name: subj.name, sessions: count, avgMin, completion };
    });

    return {
  subjects, sessions, events, activity, settings,
  todayMinutes, weeklyMinutes, weeklyTrend, streak, longestStreak,
  bestDay, lightestDay, subjectBreakdown, goalPercentage,
  dailyGoalMinutes, todayGoalPercentage, todayEvents, upcomingEvents,
  pastEvents, subjectStatus, subjectOverview,
};
  }, [subjects, sessions, events, activity, settings]);

  return { ...derived, loading, refetch };
}

export default useStudyData;