import { Ideology } from "@/data/ideologies";
import { memo } from "react";

interface Props {
  ideology: Ideology | null;
  x: number;
  y: number;
  visible: boolean;
}

function IdeologyTooltip({ ideology, x, y, visible }: Props) {
  if (!ideology) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none transition-all duration-200 ease-out"
      style={{
        left: x + 18,
        top: y + 18,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
      }}
    >
      <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-md px-3 py-2 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="font-medium text-xs text-white tracking-wide uppercase">
            {ideology.name.replace(/\n/g, " ")}
          </span>
          <div className="h-3 w-[1px] bg-white/20" />
          <span className="font-mono text-[10px] text-white/60">
            {ideology.x.toFixed(1)}, {ideology.y.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(IdeologyTooltip);
