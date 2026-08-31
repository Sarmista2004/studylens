import { useState } from "react";

function AddSubject({ onAdd }) {

  const [subjectName, setSubjectName] = useState("");
  const [goal, setGoal] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAddSubject() {

    if (!subjectName.trim() || !goal) return;

    setSaving(true);
    try {
      await onAdd(subjectName.trim(), Number(goal));
      setSubjectName("");
      setGoal("");
    } finally {
      setSaving(false);
    }
  }

  return (

    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 transition-colors">

      <h2 className="text-2xl font-bold">
        Add Subject
      </h2>

      <div className="grid grid-cols-3 gap-4 mt-6">

        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e)=>setSubjectName(e.target.value)}
          className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <input
          type="number"
          placeholder="Daily Goal (Hours)"
          min="1"
          step="1"
          value={goal}
          onChange={(e)=>setGoal(e.target.value)}
          className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <button
          onClick={handleAddSubject}
          disabled={saving}
          className="bg-purple-600 text-white rounded-lg disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add Subject"}
        </button>

      </div>

    </div>

  );

}

export default AddSubject;