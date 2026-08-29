import { useState } from "react";
import { Calendar } from "lucide-react";
import useStudyData from "../../hooks/useStudyData";
import { api } from "../../lib/api";
import MonthCalendar from "../../components/planner/MonthCalendar";
import MonthOverview from "../../components/planner/MonthOverview";
import AddEventForm from "../../components/planner/AddEventForm";
import TodaySchedule from "../../components/planner/TodaySchedule";
import UpcomingEvents from "../../components/planner/UpcomingEvents";

function Planner() {
  const { subjects, sessions, events, todayEvents, upcomingEvents, refetch } = useStudyData();
  const [selectedDate, setSelectedDate] = useState(null);

  const sessionsByDate = {};
  sessions.forEach((s) => {
    sessionsByDate[s.date] = (sessionsByDate[s.date] || 0) + s.minutes;
  });

  const selectedDateEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : [];

  const plannedMinutes = events.reduce((sum, e) => {
    if (!e.start_time || !e.end_time) return sum;
    const [sh, sm] = e.start_time.split(":").map(Number);
    const [eh, em] = e.end_time.split(":").map(Number);
    return sum + Math.max(0, eh * 60 + em - (sh * 60 + sm));
  }, 0);

  const goalsTotal = subjects.length;
  const goalsOnTrack = subjects.filter((s) => {
    const goalMin = (s.goal || 0) * 60;
    return goalMin > 0 && (s.progress || 0) / goalMin >= 0.5;
  }).length;

  const handleAdd = async (event) => {
    await api.addEvent({
      title: event.title,
      date: event.date,
      start_time: event.startTime,
      end_time: event.endTime,
      subject: event.subject,
    });
    refetch();
  };

  const handleDelete = async (id) => {
    await api.deleteEvent(id);
    refetch();
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white p-5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
          <Calendar size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold leading-tight">Planner</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Plan your day. Stay focused. Achieve more.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <MonthCalendar sessionsByDate={sessionsByDate} onDayClick={setSelectedDate} />
          <div className="mt-4">
            <MonthOverview
              totalEvents={events.length}
              plannedMinutes={plannedMinutes}
              goalsOnTrack={goalsOnTrack}
              goalsTotal={goalsTotal}
            />
          </div>
        </div>

        <div>
          <AddEventForm subjects={subjects} onAdd={handleAdd} />
          <div className="flex flex-col gap-4">
            <TodaySchedule events={todayEvents} onDelete={handleDelete} />
            <UpcomingEvents events={upcomingEvents} />

            {selectedDate && (
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                    Events on {selectedDate}
                  </h2>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                </div>
                {selectedDateEvents.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No events on this day.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {event.title}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">
                            {event.start_time} – {event.end_time} · {event.subject}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-xs text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;