import React, { useMemo } from "react";
import { motion } from "framer-motion";

export interface Ideology {
  name: string;
  x: number; // Mapeia para o Score Económico
  y: number; // Mapeia para o Score de Autoridade
  social?: number; // Progressismo vs Conservadorismo
  sovereignty?: number; // Globalismo vs Nacionalismo
  color: string;
  description: string;
}

interface RankedIdeology extends Ideology {
  distance: number;
  match: number;
}

interface Props {
  userCoords: {
    economicScore: number;
    authorityScore: number;
    socialScore: number;
    sovereigntyScore: number;
  };
  ideologies: Ideology[];
}

export default function IdeologyResults({ userCoords, ideologies }: Props) {
  const ranked = useMemo(() => {
    return ideologies
      .map((ideology) => {
        // Cálculo da Distância em 4D usando os nomes corretos dos scores
        const dEcon = userCoords.economicScore - ideology.x;
        const dAuth = userCoords.authorityScore - ideology.y;
        const dSoc = userCoords.socialScore - (ideology.social ?? 0);
        const dSov = userCoords.sovereigntyScore - (ideology.sovereignty ?? 0);

        const distance = Math.sqrt(
          Math.pow(dEcon, 2) +
            Math.pow(dAuth, 2) +
            Math.pow(dSoc, 2) +
            Math.pow(dSov, 2),
        );

        // Normalização baseada na distância máxima teórica
        const maxPossibleDist = 40;
        const match = Math.max(
          0,
          Math.min(100, Math.round((1 - distance / maxPossibleDist) * 100)),
        );

        return { ...ideology, distance, match };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [userCoords, ideologies]);

  return (
    <div className="space-y-4">
      {ranked.map((ideology, i) => (
        <motion.div
          key={ideology.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="group relative overflow-hidden bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-all shadow-sm"
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ backgroundColor: ideology.color }}
          />

          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
                Afinidade #0{i + 1}
              </span>
              <h4 className="font-bold text-base text-card-foreground leading-tight">
                {ideology.name.replace("\n", " ")}
              </h4>
            </div>
            <span className="text-xl font-black text-primary font-mono">
              {ideology.match}%
            </span>
          </div>

          <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ideology.match}%` }}
              transition={{
                duration: 1.2,
                delay: 0.4 + i * 0.1,
                ease: "circOut",
              }}
              className="h-full rounded-full"
              style={{ backgroundColor: ideology.color }}
            />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed italic">
            {ideology.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
