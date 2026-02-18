import { Party } from "@/data/parties";
import { QuizResult, StoredResult } from "@/lib/scoring";
import { Ideology, ideologies } from "@/data/ideologies";
import { memo, useMemo, useState, useCallback } from "react";
import IdeologyModal from "@/components/IdeologyModal";
import IdeologyTooltip from "@/components/IdeologyTooltip";

interface Props {
  parties: Party[];
  userResult: QuizResult;
  pastResults?: StoredResult[];
}

const COMPASS_SIZE = 750;
const PADDING = 40;
const INNER = COMPASS_SIZE - PADDING * 2;

// Transformação de Coordenadas
function toX(value: number): number {
  return PADDING + ((value + 10) / 20) * INNER;
}

function toY(value: number): number {
  // Inversão: y > 0 (Auth) sobe para o topo (valor SVG menor)
  // y < 0 (Lib) desce para o fundo (valor SVG maior)
  return PADDING + ((10 - value) / 20) * INNER;
}

const IdeologyLayer = memo(function IdeologyLayer({
  onHoverIdeology,
  onLeaveIdeology,
  onClickIdeology,
}: {
  onHoverIdeology: (ideo: Ideology, e: React.MouseEvent) => void;
  onLeaveIdeology: () => void;
  onClickIdeology: (ideo: Ideology) => void;
}) {
  const ideologyCoords = useMemo(
    () =>
      ideologies.map((ideo) => ({
        ideo,
        ix: toX(ideo.x),
        iy: toY(ideo.y),
        lines: ideo.name.split("\n"),
      })),
    [],
  );

  return (
    <g id="ideology-layer">
      {ideologyCoords.map(({ ideo, ix, iy, lines }) => (
        <g
          key={ideo.name}
          className="cursor-pointer group"
          onMouseEnter={(e) => onHoverIdeology(ideo, e)}
          onMouseMove={(e) => onHoverIdeology(ideo, e)}
          onMouseLeave={onLeaveIdeology}
          onClick={() => onClickIdeology(ideo)}
        >
          <circle
            cx={ix}
            cy={iy}
            r={40}
            fill={ideo.color}
            className="opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-300"
          />
          {lines.map((line, li) => (
            <text
              key={li}
              x={ix}
              y={iy + (li - (lines.length - 1) / 2) * 11}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={10}
              fontWeight={500}
              fill={ideo.color}
              className="select-none pointer-events-none opacity-30 group-hover:opacity-100 transition-all duration-200 uppercase tracking-tighter"
              style={{ filter: "drop-shadow(0px 0px 2px white)" }}
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </g>
  );
});

const GridLayer = memo(function GridLayer() {
  const lines = Array.from({ length: 21 }, (_, i) => {
    const pos = PADDING + (i / 20) * INNER;
    const isCenter = i === 10;
    return { pos, isCenter };
  });

  return (
    <g id="grid-layer" className="pointer-events-none">
      {lines.map(({ pos, isCenter }) => (
        <g key={pos}>
          <line
            x1={pos}
            y1={PADDING}
            x2={pos}
            y2={PADDING + INNER}
            stroke="currentColor"
            className={
              isCenter ? "text-foreground/20" : "text-foreground/[0.04]"
            }
            strokeWidth={isCenter ? 1.5 : 0.5}
          />
          <line
            y1={pos}
            x1={PADDING}
            y2={pos}
            x2={PADDING + INNER}
            stroke="currentColor"
            className={
              isCenter ? "text-foreground/20" : "text-foreground/[0.04]"
            }
            strokeWidth={isCenter ? 1.5 : 0.5}
          />
        </g>
      ))}
    </g>
  );
});

function PoliticalCompass({ parties, userResult, pastResults = [] }: Props) {
  const [hoveredParty, setHoveredParty] = useState<Party | null>(null);
  const [selectedIdeology, setSelectedIdeology] = useState<Ideology | null>(
    null,
  );
  const [hoveredIdeology, setHoveredIdeology] = useState<Ideology | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Gestão de Viewport Mobile
  const handleInteraction = useCallback((callback?: () => void) => {
    if (callback) callback();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, type: "party" | "ideology", data: any) => {
      setTooltipPos({ x: e.clientX, y: e.clientY });
      if (type === "party") setHoveredParty(data);
      if (type === "ideology") setHoveredIdeology(data);
    },
    [],
  );

  const handleMouseLeave = useCallback((type: "party" | "ideology") => {
    if (type === "party") setHoveredParty(null);
    if (type === "ideology") setHoveredIdeology(null);
  }, []);

  const userX = toX(userResult.economicScore);
  const userY = toY(userResult.authorityScore);
  const limitedPast = useMemo(() => pastResults.slice(-10), [pastResults]);

  return (
    <div className="relative w-full max-w-[800px] mx-auto p-6 bg-background rounded-3xl border transition-all">
      <svg
        viewBox={`0 0 ${COMPASS_SIZE} ${COMPASS_SIZE}`}
        className="w-full h-auto overflow-visible"
      >
        <g id="quadrants" opacity={0.03}>
          <rect
            x={PADDING}
            y={PADDING}
            width={INNER / 2}
            height={INNER / 2}
            fill="#ff4b4b"
          />
          <rect
            x={PADDING + INNER / 2}
            y={PADDING}
            width={INNER / 2}
            height={INNER / 2}
            fill="#f59e0b"
          />
          <rect
            x={PADDING}
            y={PADDING + INNER / 2}
            width={INNER / 2}
            height={INNER / 2}
            fill="#10b981"
          />
          <rect
            x={PADDING + INNER / 2}
            y={PADDING + INNER / 2}
            width={INNER / 2}
            height={INNER / 2}
            fill="#3b82f6"
          />
        </g>

        <IdeologyLayer
          onHoverIdeology={(ideo, e) => handleMouseMove(e, "ideology", ideo)}
          onLeaveIdeology={() => handleMouseLeave("ideology")}
          onClickIdeology={(ideo) =>
            handleInteraction(() => setSelectedIdeology(ideo))
          }
        />

        <GridLayer />

        {limitedPast.map((r, i) => (
          <circle
            key={r.id || i}
            cx={toX(r.economicScore)}
            cy={toY(r.authorityScore)}
            r={5}
            className="fill-primary/10 stroke-background stroke-1"
          />
        ))}

        {parties.map((party) => {
          const px = toX(party.x);
          const py = toY(party.y);
          const isHovered = hoveredParty?.shortName === party.shortName;

          return (
            <g
              key={party.shortName}
              onMouseEnter={(e) => handleMouseMove(e, "party", party)}
              onMouseMove={(e) => handleMouseMove(e, "party", party)}
              onMouseLeave={() => handleMouseLeave("party")}
              onClick={() => handleInteraction()}
              className="cursor-help transition-all"
            >
              <circle
                cx={px}
                cy={py}
                r={isHovered ? 12 : 8}
                fill={party.color}
                className="stroke-background stroke-[3px] shadow-sm transition-all duration-300"
              />
              <text
                x={px}
                y={py - 18}
                textAnchor="middle"
                fontSize={13}
                fontWeight={800}
                className="fill-foreground select-none pointer-events-none tracking-tight"
              >
                {party.shortName}
              </text>
            </g>
          );
        })}

        <g className="drop-shadow-lg pointer-events-none">
          <circle
            cx={userX}
            cy={userY}
            r={10}
            className="fill-primary stroke-background stroke-[4px]"
          />
          <text
            x={userX}
            y={userY - 20}
            textAnchor="middle"
            fontSize={16}
            fontWeight={950}
            className="fill-primary uppercase tracking-tighter"
          >
            TU
          </text>
        </g>

        <g className="fill-muted-foreground/40 text-[11px] font-black uppercase tracking-[0.2em] pointer-events-none">
          <text x={COMPASS_SIZE / 2} y={PADDING - 30} textAnchor="middle">
            Autoritário
          </text>
          <text
            x={COMPASS_SIZE / 2}
            y={COMPASS_SIZE - PADDING + 45}
            textAnchor="middle"
          >
            Libertário
          </text>
          <text
            x={PADDING - 35}
            y={COMPASS_SIZE / 2}
            textAnchor="middle"
            transform={`rotate(-90, ${PADDING - 35}, ${COMPASS_SIZE / 2})`}
          >
            Esquerda
          </text>
          <text
            x={COMPASS_SIZE - PADDING + 35}
            y={COMPASS_SIZE / 2}
            textAnchor="middle"
            transform={`rotate(90, ${COMPASS_SIZE - PADDING + 35}, ${COMPASS_SIZE / 2})`}
          >
            Direita
          </text>
        </g>
      </svg>

      {hoveredParty && (
        <div
          className="fixed z-50 pointer-events-none bg-card/95 backdrop-blur-md border-2 rounded-2xl p-4 max-w-[220px] animate-in fade-in zoom-in-95"
          style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 20 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: hoveredParty.color }}
            />
            <span className="font-black text-sm tracking-tight">
              {hoveredParty.shortName}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">
            {hoveredParty.description}
          </p>
        </div>
      )}

      <IdeologyTooltip
        ideology={hoveredIdeology}
        x={tooltipPos.x}
        y={tooltipPos.y}
        visible={!!hoveredIdeology}
      />
      <IdeologyModal
        ideology={selectedIdeology}
        open={!!selectedIdeology}
        onClose={() => setSelectedIdeology(null)}
      />
    </div>
  );
}

export default memo(PoliticalCompass);
