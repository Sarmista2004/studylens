import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import AddSubject from "../../components/study/AddSubject";
import SubjectList from "../../components/study/SubjectList";
import { api } from "../../lib/api";

function Study() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSubjects = () => {
    setLoading(true);
    api
      .getSubjects()
      .then((data) => setSubjects(data || []))
      .catch((err) => console.error("Failed to load subjects:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleAdd = async (name, goal) => {
    try {
      await api.addSubject(name, goal);
      loadSubjects();
    } catch (err) {
      console.error("Failed to add subject:", err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await api.updateSubject(id, data);
      loadSubjects();
    } catch (err) {
      console.error("Failed to update subject:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSubject(id);
      loadSubjects();
    } catch (err) {
      console.error("Failed to delete subject:", err);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white p-5 transition-colors">

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
          <BookOpen size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold leading-tight">Study</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total subjects: {subjects.length}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <AddSubject onAdd={handleAdd} />
      </div>

      <div className="mt-10">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading subjects...</p>
        ) : (
          <SubjectList
            subjects={subjects}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>

    </div>
  );
}

export default Study;