import { Play, Pause, RotateCcw } from "lucide-react";

function Controls({
  isRunning = false,
  onStart = () => {},
  onPause = () => {},
  onReset = () => {},
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="flex items-center gap-3 px-8 h-16 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <Play size={22} fill="currentColor" />
          Start
        </button>
      ) : (
        <button
          onClick={onPause}
          className="flex items-center gap-3 px-8 h-16 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-semibold shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
        >
          <Pause size={22} fill="currentColor" />
          Pause
        </button>
      )}

      <button
        onClick={onReset}
        className="flex items-center gap-3 px-8 h-16 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow-lg shadow-red-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
      >
        <RotateCcw size={20} />
        Reset
      </button>
    </div>
  );
}

export default Controls;