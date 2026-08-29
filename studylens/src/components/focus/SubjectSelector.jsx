import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function SubjectSelector({ subject, setSubject, subjects }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-purple-300 text-2xl font-semibold hover:text-purple-200 transition-colors"
      >
        {subject}
        <ChevronDown
          size={22}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-40 py-2 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-xl z-20">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSubject(s);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                s === subject
                  ? "text-purple-300 bg-white/5"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectSelector;