import { Party } from "@/data/parties";
import { QuizResult, StoredResult } from "@/lib/scoring";
import { Ideology, ideologies } from "@/data/ideologies";
import { memo, useMemo, useState, useCallback, useEffect } from "react";
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

// Get responsive compass size based on viewport
function getResponsiveCompassSize(): { size: number; padding: number; fontSize: { label: number; party: number; axis: number } } {
  if (typeof window === "undefined") {
    return { size: COMPASS_SIZE, padding: PADDING, fontSize: { label: 10, party: 13, axis: 11 } };
  }
  
  const width = window.innerWidth;
  
  if (width < 640) {
    // Mobile: 320-640px
    return {
      size: 400,
      padding: 25,
      fontSize: {label: 4, party: 10, axis: 8 },
    };
  } else if (width < 1024) {
    // Tablet: 640-1024px
    return {
      size: 550,
      padding: 32,
      fontSize: {label: 6, party: 11, axis: 9 },
    };
  }
  
  // Desktop: 1024px+
  return {
    size: COMPASS_SIZE,
    padding: PADDING,
    fontSize: { label: 10, party: 13, axis: 11 },
  };
}

const IdeologyLayer = memo(function IdeologyLayer({
  onHoverIdeology,
  onLeaveIdeology,
  onClickIdeology,
  padding,
  inner,
  toX,
  toY,
  isMobile,
}: {
  onHoverIdeology: (ideo: Ideology, e: React.MouseEvent) => void;
  onLeaveIdeology: () => void;
  onClickIdeology: (ideo: Ideology) => void;
  padding: number;
  inner: number;
  toX: (value: number) => number;
  toY: (value: number) => number;
  isMobile: boolean;
}) {
  const ideologyCoords = useMemo(
    () =>
      ideologies.map((ideo) => ({
        ideo,
        ix: toX(ideo.x),
        iy: toY(ideo.y),
        lines: ideo.name.split("\n"),
      })),
    [toX, toY],
  );

  // Use smaller circles and text on mobile
  const circleRadius = isMobile ? 20 : 40;
  const fontSize = isMobile ? 5 : 9;
  const lineSpacing = isMobile ? 8 : 11;

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
            r={circleRadius}
            fill={ideo.color}
            className="opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-300"
          />
          {lines.map((line, li) => (
            <text
              key={li}
              x={ix}
              y={iy + (li - (lines.length - 1) / 2) * lineSpacing}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
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

const GridLayer = memo(function GridLayer({
  padding,
  inner,
  compassSize,
}: {
  padding: number;
  inner: number;
  compassSize: number;
}) {
  const lines = Array.from({ length: 21 }, (_, i) => {
    const pos = padding + (i / 20) * inner;
    const isCenter = i === 10;
    return { pos, isCenter };
  });

  return (
    <g id="grid-layer" className="pointer-events-none">
      {lines.map(({ pos, isCenter }) => (
        <g key={pos}>
          <line
            x1={pos}
            y1={padding}
            x2={pos}
            y2={padding + inner}
            stroke="currentColor"
            className={
              isCenter ? "text-foreground/20" : "text-foreground/[0.04]"
            }
            strokeWidth={isCenter ? 1.5 : 0.5}
          />
          <line
            y1={pos}
            x1={padding}
            y2={pos}
            x2={padding + inner}
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
  const [windowSize, setWindowSize] = useState(() => getResponsiveCompassSize());
  const [sortedIdeologiesList, setSortedIdeologiesList] = useState<Ideology[]>([]);

  // Create sorted list when an ideology is first selected
  const handleIdeologyClick = useCallback((ideology: Ideology) => {
    // Sort ideologies from left to right (by x coordinate)
    const sorted = [...ideologies].sort((a, b) => a.x - b.x);
    
    setSortedIdeologiesList(sorted);
    setSelectedIdeology(ideology);
  }, []);

  const handleIdeologyNavigate = useCallback((direction: 'prev' | 'next') => {
    if (!selectedIdeology || sortedIdeologiesList.length === 0) return;
    
    // Find current index by comparing x and y coordinates (more reliable than name)
    const currentIndex = sortedIdeologiesList.findIndex(
      (ideo) => ideo.x === selectedIdeology.x && ideo.y === selectedIdeology.y
    );
    
    if (currentIndex === -1) {
      console.error('Current ideology not found in sorted list', selectedIdeology);
      return;
    }
    
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedIdeology(sortedIdeologiesList[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < sortedIdeologiesList.length - 1) {
      setSelectedIdeology(sortedIdeologiesList[currentIndex + 1]);
    }
  }, [selectedIdeology, sortedIdeologiesList]);

  const currentIdeologyIndex = useMemo(() => {
    if (!selectedIdeology || sortedIdeologiesList.length === 0) return -1;
    return sortedIdeologiesList.findIndex(
      (ideo) => ideo.x === selectedIdeology.x && ideo.y === selectedIdeology.y
    );
  }, [selectedIdeology, sortedIdeologiesList]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getResponsiveCompassSize());
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const compassSize = windowSize.size;
  const padding = windowSize.padding;
  const inner = compassSize - padding * 2;
  const fontSize = windowSize.fontSize;
  const isMobile = windowSize.size < 550; // Mobile if size is less than 550

  // Create responsive coordinate functions
  const toXResponsive = (value: number) => padding + ((value + 10) / 20) * inner;
  const toYResponsive = (value: number) => padding + ((10 - value) / 20) * inner;

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

  const userX = toXResponsive(userResult.economicScore);
  const userY = toYResponsive(userResult.authorityScore);
  const limitedPast = useMemo(() => pastResults.slice(-10), [pastResults]);

  return (
    <div className="relative w-full max-w-[800px] mx-auto p-2 sm:p-3 bg-background rounded-3xl border transition-all">
      <svg
        viewBox={`0 0 ${compassSize} ${compassSize}`}
        className="w-full h-auto overflow-visible"
      >
        <g id="quadrants" opacity={0.03}>
          <rect
            x={padding}
            y={padding}
            width={inner / 2}
            height={inner / 2}
            fill="#ff4b4b"
          />
          <rect
            x={padding + inner / 2}
            y={padding}
            width={inner / 2}
            height={inner / 2}
            fill="#f59e0b"
          />
          <rect
            x={padding}
            y={padding + inner / 2}
            width={inner / 2}
            height={inner / 2}
            fill="#10b981"
          />
          <rect
            x={padding + inner / 2}
            y={padding + inner / 2}
            width={inner / 2}
            height={inner / 2}
            fill="#3b82f6"
          />
        </g>

        <IdeologyLayer
          onHoverIdeology={(ideo, e) => handleMouseMove(e, "ideology", ideo)}
          onLeaveIdeology={() => handleMouseLeave("ideology")}
          onClickIdeology={handleIdeologyClick}
          padding={padding}
          inner={inner}
          toX={toXResponsive}
          toY={toYResponsive}
          isMobile={isMobile}
        />

        <GridLayer padding={padding} inner={inner} compassSize={compassSize} />

        {limitedPast.map((r, i) => (
          <circle
            key={r.id || i}
            cx={toXResponsive(r.economicScore)}
            cy={toYResponsive(r.authorityScore)}
            r={5}
            className="fill-primary/10 stroke-background stroke-1"
          />
        ))}

        {parties.map((party) => {
          const px = toXResponsive(party.x);
          const py = toYResponsive(party.y);
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
                fontSize={fontSize.party}
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
            fontSize={fontSize.party}
            fontWeight={950}
            className="fill-primary uppercase tracking-tighter"
          >
            TU
          </text>
        </g>

        <g className="fill-muted-foreground/40 font-black uppercase tracking-[0.2em] pointer-events-none">
          <text x={compassSize / 2} y={padding - 30} textAnchor="middle" fontSize={fontSize.axis}>
            Autoritário
          </text>
          <text
            x={compassSize / 2}
            y={compassSize - padding + 45}
            textAnchor="middle"
            fontSize={fontSize.axis}
          >
            Libertário
          </text>
          <text
            x={padding - 35}
            y={compassSize / 2}
            textAnchor="middle"
            fontSize={fontSize.axis}
            transform={`rotate(-90, ${padding - 35}, ${compassSize / 2})`}
          >
            Esquerda
          </text>
          <text
            x={compassSize - padding + 35}
            y={compassSize / 2}
            textAnchor="middle"
            fontSize={fontSize.axis}
            transform={`rotate(90, ${compassSize - padding + 35}, ${compassSize / 2})`}
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
        onClose={() => {
          setSelectedIdeology(null);
          setSortedIdeologiesList([]);
        }}
        onNavigate={handleIdeologyNavigate}
        hasPrev={currentIdeologyIndex > 0}
        hasNext={currentIdeologyIndex < sortedIdeologiesList.length - 1}
      />
    </div>
  );
}

export default memo(PoliticalCompass);
