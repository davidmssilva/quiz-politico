import { Party } from "@/data/parties";
import { motion } from "framer-motion";
import { memo } from "react";

interface RankedParty extends Party {
  distance: number;
}

interface Props {
  rankedParties: RankedParty[];
}

function PartyResults({ rankedParties }: Props) {
  const maxDist = Math.max(...rankedParties.map((p) => p.distance), 1);

  return (
    <div className="space-y-3">
      {rankedParties.map((party, i) => {
        const match = Math.max(
          0,
          Math.round((1 - party.distance / maxDist) * 100),
        );
        return (
          <motion.div
            key={party.id}
            className="flex items-center gap-3 bg-card border border-border rounded-lg p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: party.color }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm text-card-foreground truncate">
                  {party.name}
                </span>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {match}% afinidade
                </span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: party.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${match}%` }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
export default memo(PartyResults);