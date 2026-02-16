import { Party } from "@/data/parties";
import { QuizResult, StoredResult } from "@/lib/scoring";
import { Ideology, ideologies } from "@/data/ideologies";
import { memo, useMemo, useState, useCallback, useRef } from "react";
import IdeologyModal from "@/components/IdeologyModal";
import IdeologyTooltip from "@/components/IdeologyTooltip";

interface Props {
  parties: Party[];
  userResult: QuizResult;
  pastResults?: StoredResult[];
}

const COMPASS_SIZE = 500;
const PADDING = 50;
const INNER = COMPASS_SIZE - PADDING * 2;

function toPixel(value: number): number {
  return PADDING + ((value + 10) / 20) * INNER;
}

// Static ideology background with hover + click
const IdeologyLayer = memo(function IdeologyLayer({
  onHoverIdeology,
  onLeaveIdeology,
  onClickIdeology,
}: {
  onHoverIdeology: (ideo: Ideology, e: React.MouseEvent) => void;
  onLeaveIdeology: () => void;
  onClickIdeology: (ideo: Ideology) => void;
}) {
  return (
    <>
      {ideologies.map((ideo) => {
        const ix = toPixel(ideo.x);
        const iy = toPixel(ideo.y);
        const lines = ideo.name.split("\n");
        return (
          <g
            key={ideo.name}
            className="cursor-pointer"
            onMouseEnter={(e) => onHoverIdeology(ideo, e)}
            onMouseMove={(e) => onHoverIdeology(ideo, e)}
            onMouseLeave={onLeaveIdeology}
            onClick={() => onClickIdeology(ideo)}
          >
            <circle cx={ix} cy={iy} r={24} fill={ideo.color} opacity={ideo.opacity} />
            {/* Semi-transparent background for readability */}
            <rect
              x={ix - 28}
              y={iy - (lines.length * 10) / 2 - 2}
              width={56}
              height={lines.length * 10 + 4}
              rx={3}
              fill="hsl(var(--background))"
              opacity={0.4}
              className="pointer-events-none"
            />
            {lines.map((line, li) => (
              <text
                key={li}
                x={ix}
                y={iy + (li - (lines.length - 1) / 2) * 10}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={7.5}
                fontWeight={600}
                fill={ideo.color}
                opacity={0.65}
                className="select-none pointer-events-none"
                style={{ textShadow: "0 0 3px hsl(var(--background)), 0 0 6px hsl(var(--background))" }}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </>
  );
});

// Static grid
const GridLayer = memo(function GridLayer() {
  return (
    <>
      {Array.from({ length: 21 }, (_, i) => {
        const pos = PADDING + (i / 20) * INNER;
        const isCenter = i === 10;
        return (
          <g key={i}>
            <line x1={pos} y1={PADDING} x2={pos} y2={PADDING + INNER}
              stroke={isCenter ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--compass-grid))"}
              strokeWidth={isCenter ? 1.5 : 0.5} />
            <line y1={pos} x1={PADDING} y2={pos} x2={PADDING + INNER}
              stroke={isCenter ? "hsl(var(--foreground) / 0.3)" : "hsl(var(--compass-grid))"}
              strokeWidth={isCenter ? 1.5 : 0.5} />
          </g>
        );
      })}
    </>
  );
});

function PoliticalCompass({ parties, userResult, pastResults = [] }: Props) {
  const [hovered, setHovered] = useState<Party | null>(null);
  const [selectedIdeology, setSelectedIdeology] = useState<Ideology | null>(null);
  const [hoveredIdeology, setHoveredIdeology] = useState<Ideology | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback((party: Party) => setHovered(party), []);
  const handleMouseLeave = useCallback(() => setHovered(null), []);
  const handleIdeologyClick = useCallback((ideo: Ideology) => setSelectedIdeology(ideo), []);
  const handleIdeologyHover = useCallback((ideo: Ideology, e: React.MouseEvent) => {
    setHoveredIdeology(ideo);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }, []);
  const handleIdeologyLeave = useCallback(() => setHoveredIdeology(null), []);

  const userX = toPixel(userResult.economicScore);
  const userY = toPixel(userResult.authorityScore);

  const limitedPast = useMemo(
    () => pastResults.slice(-10),
    [pastResults]
  );

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      <svg
        viewBox={`0 0 ${COMPASS_SIZE} ${COMPASS_SIZE}`}
        className="w-full h-auto"
      >
        {/* Layer 1: Background quadrants with labels */}
        <rect x={PADDING} y={PADDING} width={INNER / 2} height={INNER / 2} fill="hsl(0 72% 51% / 0.06)" />
        <rect x={PADDING + INNER / 2} y={PADDING} width={INNER / 2} height={INNER / 2} fill="hsl(30 80% 50% / 0.06)" />
        <rect x={PADDING} y={PADDING + INNER / 2} width={INNER / 2} height={INNER / 2} fill="hsl(153 50% 40% / 0.06)" />
        <rect x={PADDING + INNER / 2} y={PADDING + INNER / 2} width={INNER / 2} height={INNER / 2} fill="hsl(210 80% 55% / 0.06)" />

        {/* Quadrant labels (4 Eixos) */}
        <text x={PADDING + INNER / 4} y={PADDING + 18} textAnchor="middle" fontSize={8} fontWeight={600}
          fill="hsl(0 72% 51%)" opacity={0.25} className="select-none pointer-events-none">
          Esquerda Autoritária
        </text>
        <text x={PADDING + (INNER * 3) / 4} y={PADDING + 18} textAnchor="middle" fontSize={8} fontWeight={600}
          fill="hsl(30 80% 50%)" opacity={0.25} className="select-none pointer-events-none">
          Direita Autoritária
        </text>
        <text x={PADDING + INNER / 4} y={PADDING + INNER - 10} textAnchor="middle" fontSize={8} fontWeight={600}
          fill="hsl(153 50% 40%)" opacity={0.25} className="select-none pointer-events-none">
          Esquerda Libertária
        </text>
        <text x={PADDING + (INNER * 3) / 4} y={PADDING + INNER - 10} textAnchor="middle" fontSize={8} fontWeight={600}
          fill="hsl(210 80% 55%)" opacity={0.25} className="select-none pointer-events-none">
          Direita Libertária
        </text>

        {/* Layer 2: Ideology labels (static, hoverable, clickable) */}
        <IdeologyLayer
          onHoverIdeology={handleIdeologyHover}
          onLeaveIdeology={handleIdeologyLeave}
          onClickIdeology={handleIdeologyClick}
        />

        {/* Layer 3: Grid lines */}
        <GridLayer />

        {/* Border */}
        <rect x={PADDING} y={PADDING} width={INNER} height={INNER} fill="none" stroke="hsl(var(--border))" strokeWidth={1.5} rx={4} />

        {/* Layer 4: Party dots */}
        {parties.map((party) => {
          const px = toPixel(party.x);
          const py = toPixel(party.y);
          const isHovered = hovered?.shortName === party.shortName;
          return (
            <g key={party.shortName}
              onMouseEnter={() => handleMouseEnter(party)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              <circle cx={px} cy={py} r={isHovered ? 10 : 7} fill={party.color} opacity={0.85}
                stroke="white" strokeWidth={1.5}
                style={{ transition: "r 0.15s" }} />
              <text x={px} y={py - 12} textAnchor="middle" fontSize={10} fontWeight={600}
                fill="hsl(var(--foreground))" className="pointer-events-none select-none">
                {party.shortName}
              </text>
            </g>
          );
        })}

        {/* Layer 5: Past result dots */}
        {limitedPast.map((r, i) => {
          const rx = toPixel(r.economicScore);
          const ry = toPixel(r.authorityScore);
          return (
            <circle key={r.id || i} cx={rx} cy={ry} r={5}
              fill="hsl(var(--compass-user))" opacity={0.25}
              stroke="white" strokeWidth={1} />
          );
        })}

        {/* Layer 6: User dot */}
        <circle cx={userX} cy={userY} r={10}
          fill="hsl(var(--compass-user))" stroke="white" strokeWidth={2.5} />
        <text x={userX} y={userY - 16} textAnchor="middle" fontSize={11} fontWeight={700}
          fill="hsl(var(--compass-user))">
          TU
        </text>

        {/* Axis labels */}
        <text x={PADDING - 5} y={COMPASS_SIZE / 2} textAnchor="end" fontSize={9} fill="hsl(var(--muted-foreground))"
          transform={`rotate(-90, ${PADDING - 5}, ${COMPASS_SIZE / 2})`}>
          Autoritário
        </text>
        <text x={COMPASS_SIZE - PADDING + 5} y={COMPASS_SIZE / 2} textAnchor="start" fontSize={9} fill="hsl(var(--muted-foreground))"
          transform={`rotate(90, ${COMPASS_SIZE - PADDING + 5}, ${COMPASS_SIZE / 2})`}>
          Libertário
        </text>
        <text x={COMPASS_SIZE / 2} y={PADDING - 10} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">
          Autoritário
        </text>
        <text x={COMPASS_SIZE / 2} y={COMPASS_SIZE - PADDING + 18} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">
          Libertário
        </text>
        <text x={PADDING - 4} y={COMPASS_SIZE - PADDING + 18} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">
          Esquerda
        </text>
        <text x={COMPASS_SIZE - PADDING + 4} y={COMPASS_SIZE - PADDING + 18} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">
          Direita
        </text>
      </svg>

      {/* Party tooltip */}
      {hovered && (
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 max-w-[200px] z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hovered.color }} />
            <span className="font-semibold text-sm text-card-foreground">{hovered.shortName}</span>
          </div>
          <p className="text-xs text-muted-foreground">{hovered.description}</p>
        </div>
      )}

      {/* Ideology cursor tooltip */}
      <IdeologyTooltip
        ideology={hoveredIdeology}
        x={tooltipPos.x}
        y={tooltipPos.y}
        visible={!!hoveredIdeology}
      />

      {/* Ideology detail modal (on click) */}
      <IdeologyModal
        ideology={selectedIdeology}
        open={!!selectedIdeology}
        onClose={() => setSelectedIdeology(null)}
      />
    </div>
  );
}

export default memo(PoliticalCompass);
