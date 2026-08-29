import { Lightbulb, X } from "lucide-react";
import { useMemo, useState } from "react";

const TIPS = [
  { line1: "Distractions fade when your focus gets stronger.", line2: "You've got this! 💪" },
  { line1: "Small steps, done daily, beat big plans done never.", line2: "Keep going! 🔥" },
  { line1: "Your future self is watching this session.", line2: "Make it count. ✨" },
  { line1: "Deep work compounds like interest.", line2: "Stay in the zone. 🎯" },
];

function TipBanner() {
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative flex items-center gap-3 px-4 py-3 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg w-full max-w-xs sm:max-w-sm min-w-0">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-500/30 shrink-0">
        <Lightbulb size={16} className="text-white" />
      </div>
      <div className="min-w-0 pr-4">
        <p className="text-white text-sm font-medium leading-snug truncate">{tip.line1}</p>
        <p className="text-purple-300 text-xs mt-0.5 truncate">{tip.line2}</p>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss tip"
        className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default TipBanner;