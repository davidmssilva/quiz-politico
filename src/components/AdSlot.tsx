import { memo } from "react";
import { ADS_ENABLED } from "@/config/ads";

interface Props {
  enabled?: boolean;
  className?: string;
}

function AdSlot({ enabled = ADS_ENABLED, className = "" }: Props) {
  if (!enabled) return null;

  return (
    <div className={`w-full flex items-center justify-center py-4 ${className}`}>
      <div className="w-full max-w-[728px] min-h-[90px] bg-secondary/30 border border-border rounded-lg flex items-center justify-center">
        <span className="text-xs text-muted-foreground">Espaço Publicitário</span>
        {/* Future Google AdSense insertion point */}
      </div>
    </div>
  );
}

export default memo(AdSlot);
