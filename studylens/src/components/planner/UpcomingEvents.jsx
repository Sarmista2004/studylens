function UpcomingEvents({ events }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Upcoming events
      </h2>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nothing upcoming yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => {
            const date = new Date(event.date);
            return (
              <div key={event.id} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex flex-col items-center justify-center shrink-0 text-xs font-medium">
                  <span>{date.toLocaleDateString(undefined, { month: "short" })}</span>
                  <span className="text-sm font-semibold">{date.getDate()}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {event.start_time} – {event.end_time} · {event.subject}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UpcomingEvents;
