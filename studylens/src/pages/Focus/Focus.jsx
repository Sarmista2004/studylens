import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/focus/Header";
import TipBanner from "../../components/focus/TipBanner";
import CircularTimer from "../../components/focus/CircularTimer";
import Controls from "../../components/focus/Controls";
import ExitButton from "../../components/focus/ExitButton";
import BackgroundPicker, {
  BACKGROUNDS,
} from "../../components/focus/BackgroundPicker";
import { api } from "../../lib/api";

const DEFAULT_SESSION = 25;

function Focus() {
  const location = useLocation();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  const incomingSubject = location.state?.subject;

  const [subject, setSubject] = useState(incomingSubject || "");

  const [sessionMinutes, setSessionMinutes] = useState(DEFAULT_SESSION);
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_SESSION * 60);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SESSION * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [background, setBackground] = useState(BACKGROUNDS[0].id);
  const [justCompleted, setJustCompleted] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const intervalRef = useRef(null);
  // Refs mirror state so the setInterval callback always sees the
  // latest values, not whatever was current when it started.
  const subjectsRef = useRef(subjects);
  const subjectRef = useRef(subject);
  const totalSecondsRef = useRef(totalSeconds);

  useEffect(() => { subjectsRef.current = subjects; }, [subjects]);
  useEffect(() => { subjectRef.current = subject; }, [subject]);
  useEffect(() => { totalSecondsRef.current = totalSeconds; }, [totalSeconds]);

  useEffect(() => {
    api
      .getSubjects()
      .then((data) => {
        const list = data || [];
        setSubjects(list);
        if (!incomingSubject && list.length > 0) {
          setSubject(list[0].name);
        }
      })
      .catch((err) => console.error("Failed to load subjects:", err))
      .finally(() => setSubjectsLoading(false));
    // eslint-disable-next-line
  }, []);

  const saveEarnedMinutes = async () => {
    const earnedMinutes = totalSecondsRef.current / 60;
    const currentSubjectName = subjectRef.current;
    const currentSubject = subjectsRef.current.find(
      (s) => s.name === currentSubjectName
    );
    const now = new Date(); const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    try {
      // one transactional call — session save + progress update + activity log
      // all succeed together or all roll back together
      await api.completeFocusSession(
        currentSubjectName,
        today,
        earnedMinutes,
        currentSubject?.id
      );
      setSaveError(false);
      setJustCompleted(true);
    } catch (err) {
      console.error("Failed to save focus session:", err);
      setSaveError(true);
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          saveEarnedMinutes();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [isRunning]);

  const handleStart = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(totalSeconds);
      setJustCompleted(false);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
    setJustCompleted(false);
  };

  const increaseTime = () => {
    if (isRunning) return;
    const mins = sessionMinutes + 1;
    setSessionMinutes(mins);
    setTotalSeconds(mins * 60);
    setSecondsLeft(mins * 60);
  };

  const decreaseTime = () => {
    if (isRunning) return;
    if (sessionMinutes <= 1) return;
    const mins = sessionMinutes - 1;
    setSessionMinutes(mins);
    setTotalSeconds(mins * 60);
    setSecondsLeft(mins * 60);
  };

  const activeBg =
    BACKGROUNDS.find((b) => b.id === background) ?? BACKGROUNDS[0];

  if (subjectsLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">No subjects yet</h1>
        <p className="text-gray-400 mt-3">Add a subject first.</p>
        <button
          onClick={() => navigate("/study")}
          className="mt-6 px-6 py-3 rounded-xl bg-violet-600"
        >
          Go to Study
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative text-white overflow-y-auto transition-colors duration-700 ${activeBg.className}`}
    >
      <div className="absolute inset-0" style={activeBg.overlayStyle} />

      <div className="relative z-10 flex justify-between items-start gap-4 px-8 pt-6">
        <TipBanner />
        <ExitButton />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 py-6">
        <Header />

        {justCompleted && (
          <div className="px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
            +{totalSeconds / 60} min added to {subject}
          </div>
        )}

        {saveError && (
          <div className="px-5 py-2 rounded-full bg-red-500/15 border border-red-500/40 text-red-300">
            Couldn't save your session — check your connection and try again.
          </div>
        )}

        <CircularTimer
          secondsLeft={secondsLeft}
          totalSeconds={totalSeconds}
          subject={subject}
          setSubject={setSubject}
          subjects={subjects.map((s) => s.name)}
          increaseTime={increaseTime}
          decreaseTime={decreaseTime}
          isRunning={isRunning}
        />

        <BackgroundPicker selected={background} onSelect={setBackground} />

        <Controls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

export default Focus;