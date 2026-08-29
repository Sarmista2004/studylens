import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  "Needs attention": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "On track": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Strong: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
};

function SubjectStatusList({ subjects }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 transition-colors">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Subject status
      </h2>

      {subjects.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add subjects on the Study page to see status here.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-slate-800">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate("/focus", { state: { subject: s.name } })}
              className="flex items-center justify-between py-3.5 text-left first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.reason}</p>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-lg shrink-0 ${STATUS_STYLES[s.status]}`}
              >
                {s.status}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectStatusList;
