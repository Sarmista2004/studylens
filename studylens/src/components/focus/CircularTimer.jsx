import {
  Timer,
  Triangle,
} from "lucide-react";

import SubjectSelector from "./SubjectSelector";

function CircularTimer({
  secondsLeft = 1500,
  totalSeconds = 1500,
  subject,
  setSubject = () => {},
  subjects = [],
  increaseTime,
  decreaseTime,
  isRunning,
}) {

  const minutes = String(
    Math.floor(secondsLeft / 60)
  ).padStart(2, "0");

  const seconds = String(
    secondsLeft % 60
  ).padStart(2, "0");

  const radius = 140;

  const circumference =
    2 * Math.PI * radius;

  const progress =
    totalSeconds > 0
      ? secondsLeft / totalSeconds
      : 0;

  const offset =
    circumference * (1 - progress);

  const isComplete =
    secondsLeft === 0;

  return (

    <div className="flex flex-col items-center">

      <div className="mb-2">

        <SubjectSelector
          subject={subject}
          setSubject={setSubject}
          subjects={subjects}
        />

      </div>

      <div className="relative w-96 h-96 flex items-center justify-center">

        {/* Progress Ring */}

        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 320 320"
        >

          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-800/70"
          />

          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ease-linear ${
              isComplete
                ? "text-emerald-400"
                : "text-purple-500"
            }`}
            style={{
              filter: isComplete
                ? "drop-shadow(0 0 16px rgba(52,211,153,.6))"
                : "drop-shadow(0 0 16px rgba(168,85,247,.5))",
            }}
          />

        </svg>

        {/* Timer */}

        <div className="relative z-10 text-center">

          <Timer
            size={22}
            className="mx-auto mb-2 text-purple-300"
          />

          <h2 className="text-7xl font-bold tracking-wider tabular-nums">

            {minutes}:{seconds}

          </h2>

          <p className="text-gray-400 mt-3">

            {isComplete
              ? "Session Complete 🎉"
              : "Pomodoro Session"}

          </p>

        </div>

        {/* Right Side Arrows */}

        <div
          className="
            absolute
            right-16
            top-1/2
            -translate-y-1/2
            flex
            flex-col
            gap-3
            z-10
          "
        >

          <button
            onClick={increaseTime}
            disabled={isRunning}
            className="
              text-gray-300
              hover:text-purple-400
              transition
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >

            <Triangle size={14} fill="currentColor" />

          </button>

          <button
            onClick={decreaseTime}
            disabled={isRunning}
            className="
              text-gray-300
              hover:text-purple-400
              transition
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >

            <Triangle size={14} fill="currentColor" className="rotate-180" />

          </button>

        </div>

      </div>

    </div>

  );

}

export default CircularTimer;