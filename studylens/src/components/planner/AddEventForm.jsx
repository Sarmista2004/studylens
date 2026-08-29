import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

function todayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function AddEventForm({ subjects, onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(subjects[0]?.name || "");
  const [date, setDate] = useState(todayStr());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (subjects.length > 0 && !subject) {
      setSubject(subjects[0].name);
    }
  }, [subjects]);

  const handleSubmit = () => {
    if (!title || !startTime || !endTime || !subject) return;

    onAdd({ title, subject, date, startTime, endTime });

    setTitle("");
    setStartTime("");
    setEndTime("");
    setDate(todayStr());
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white text-sm font-medium rounded-xl py-2.5 mb-6"
      >
        <Plus size={16} />
        Add event
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 mb-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-gray-900 dark:text-white">Add event</p>
        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="col-span-2 border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm"
        />

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="col-span-2 border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm"
        >
          {subjects.length === 0 && <option value="">No subjects yet</option>}
          {subjects.map((s) => (
            <option key={s.id} value={s.name} className="text-black">
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white text-sm font-medium rounded-lg py-2 mt-4"
      >
        Add event
      </button>
    </div>
  );
}

export default AddEventForm;