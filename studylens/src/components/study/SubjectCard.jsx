import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SubjectCard({ subject, onUpdate, onDelete }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(subject.name);
  const [goal, setGoal] = useState(subject.goal);
  const [saving, setSaving] = useState(false);

  const percentage = (subject.progress / (subject.goal * 60)) * 100;

  async function handleDelete() {
    await onDelete(subject.id);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onUpdate(subject.id, { name, goal: Number(goal) });
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function handleStartFocus() {
    navigate("/focus", { state: { subject: subject.name } });
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 transition-colors">
      {isEditing ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg p-2 w-full"
          />

          <input
            type="number"
            min="1"
            step="1"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg p-2 w-full mt-3"
          />

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="border border-gray-300 dark:border-slate-700 dark:text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold dark:text-white">{subject.name}</h2>

          <p className="mt-3 text-gray-700 dark:text-gray-300"> Goal : {subject.goal} hrs</p>
          <p className="text-gray-700 dark:text-gray-300">Progress : {Math.round(subject.progress)} mins</p>

          <div className="w-full h-3 bg-gray-200 dark:bg-slate-800 rounded-full mt-4">
            <div
              className="bg-purple-600 h-3 rounded-full"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleStartFocus}
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
            >
              Start Focus
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 border border-gray-300 dark:border-slate-700 dark:text-white py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SubjectCard;