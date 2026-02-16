import { Ideology } from "@/data/ideologies";
import { memo } from "react";

interface Props {
  ideology: Ideology | null;
  x: number;
  y: number;
  visible: boolean;
}

function IdeologyTooltip({ ideology, x, y, visible }: Props) {
  if (!ideology || !visible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none transition-opacity duration-150"
      style={{
        left: x + 14,
        top: y + 14,
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="bg-card border border-border rounded-lg p-3 max-w-[220px] shadow-md">
        <div className="font-semibold text-sm text-card-foreground mb-1">
          {ideology.name.replace(/\n/g, " ")}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {ideology.description}
        </p>
      </div>
    </div>
  );
}

export default memo(IdeologyTooltip);
