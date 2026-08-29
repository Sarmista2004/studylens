function SubjectOverviewTable({ rows }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Subject overview
      </h2>

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add subjects and complete sessions to see this table.
        </p>
      ) : (
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="text-left text-gray-400 dark:text-gray-500 text-xs">
              <th className="font-normal pb-2 w-2/5">Subject</th>
              <th className="font-normal pb-2">Sessions</th>
              <th className="font-normal pb-2">Avg. session</th>
              <th className="font-normal pb-2">Completion</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-gray-100 dark:border-slate-800">
                <td className="py-2.5 text-gray-900 dark:text-white truncate">{row.name}</td>
                <td className="py-2.5 text-gray-600 dark:text-gray-300">{row.sessions}</td>
                <td className="py-2.5 text-gray-600 dark:text-gray-300">{row.avgMin}m</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${row.completion}%` }}
                      />
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs w-8 shrink-0">
                      {row.completion}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubjectOverviewTable;
