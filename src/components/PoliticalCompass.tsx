import { Party } from "@/data/parties";
import { QuizResult, StoredResult } from "@/lib/scoring";
import { ideologies as originalIdeologies, Ideology } from "@/data/ideologies";
import { memo, useMemo, useState, useCallback, useEffect } from "react";
import IdeologyModal from "@/components/IdeologyModal";
import IdeologyTooltip from "@/components/IdeologyTooltip";
import { useI18n } from "@/i18n/i18nContext";
import { useTranslatedIdeologies } from "@/i18n/useContentTranslation";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

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
  return PADDING + ((10 - value) / 20) * INNER;
}

// Get responsive compass size with improved mobile scaling
function getResponsiveCompassSize(): { 
  size: number; 
  padding: number; 
  fontSize: { label: number; party: number; axis: number };
  gridStrokeWidth: { center: number; regular: number };
} {
  if (typeof window === "undefined") {
    return { 
      size: COMPASS_SIZE, 
      padding: PADDING, 
      fontSize: { label: 10, party: 13, axis: 14 },
      gridStrokeWidth: { center: 3, regular: 1.5 }
    };
  }
  
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  
  if (width < 640) {
    // Mobile: Smaller size, better fit
    return {
      size: 340,
      padding: 35,
      fontSize: { 
        label: 8,
        party: 11, 
        axis: 11
      },
      gridStrokeWidth: { center: 3, regular: 1.5 }
    };
  } else if (width < 1024) {
    // Tablet
    return {
      size: 550,
      padding: 32,
      fontSize: { label: 8, party: 12, axis: 12 },
      gridStrokeWidth: { center: 3, regular: 1.5 }
    };
  }
  
  // Desktop
  return {
    size: COMPASS_SIZE,
    padding: PADDING,
    fontSize: { label: 10, party: 14, axis: 14 },
    gridStrokeWidth: { center: 3, regular: 1.5 }
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
  visible,
  ideologies,
}: {
  onHoverIdeology: (ideo: Ideology, e: React.MouseEvent) => void;
  onLeaveIdeology: () => void;
  onClickIdeology: (ideo: Ideology) => void;
  padding: number;
  inner: number;
  toX: (value: number) => number;
  toY: (value: number) => number;
  isMobile: boolean;
  visible: boolean;
  ideologies: Ideology[];
}) {
  const ideologyCoords = useMemo(
    () =>
      ideologies.map((ideo) => ({
        ideo,
        ix: toX(ideo.x),
        iy: toY(ideo.y),
        lines: ideo.name.split("\n"),
      })),
    [toX, toY, ideologies],
  );

  // Enhanced sizing for better readability
  const circleRadius = isMobile ? 24 : 44; // Minimum 44dp touch target
  const fontSize = isMobile ? 6 : 10;
  const lineSpacing = isMobile ? 9 : 12;

  if (!visible) return null;

  return (
    <g id="ideology-layer" style={{ opacity: visible ? 1 : 0, transition: 'opacity 200ms ease-in-out' }}>
      {ideologyCoords.map(({ ideo, ix, iy, lines }) => (
        <g
          key={ideo.name}
          className="cursor-pointer group"
          onMouseEnter={(e) => onHoverIdeology(ideo, e)}
          onMouseMove={(e) => onHoverIdeology(ideo, e)}
          onMouseLeave={onLeaveIdeology}
          onClick={() => onClickIdeology(ideo)}
          role="button"
          tabIndex={0}
          aria-label={`Ideology: ${ideo.name.replace('\n', ' ')}`}
        >
          {/* Light mode circle */}
          <circle
            cx={ix}
            cy={iy}
            r={circleRadius}
            fill={ideo.color}
            className="opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300 dark:opacity-0"
          />
          {/* Light mode border - almost transparent */}
          <circle
            cx={ix}
            cy={iy}
            r={circleRadius}
            fill="none"
            stroke={ideo.color}
            strokeWidth="2"
            className="opacity-[0.08] group-hover:opacity-20 transition-opacity duration-300 dark:opacity-0"
          />
          
          {/* Dark mode circle */}
          <circle
            cx={ix}
            cy={iy}
            r={circleRadius}
            fill={ideo.color}
            className="opacity-0 group-hover:opacity-[0.18] transition-opacity duration-300 dark:opacity-[0.10] dark:group-hover:opacity-[0.25]"
          />
          {/* Dark mode border - enhanced contrast */}
          <circle
            cx={ix}
            cy={iy}
            r={circleRadius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="2"
            className="opacity-0 transition-opacity duration-300 dark:opacity-100 dark:group-hover:opacity-100"
          />
          
          {/* Light mode text - HIGH CONTRAST */}
          {lines.map((line, li) => (
            <text
              key={li}
              x={ix}
              y={iy + (li - (lines.length - 1) / 2) * lineSpacing}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fontWeight={700}
              fill="#1A1A1A"
              className="select-none pointer-events-none opacity-70 group-hover:opacity-100 transition-all duration-200 uppercase tracking-tight dark:opacity-0"
              style={{
                paintOrder: 'stroke fill',
                stroke: 'rgba(255, 255, 255, 0.8)',
                strokeWidth: '0.5px',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {line}
            </text>
          ))}
          
          {/* Dark mode text - enhanced visibility */}
          {lines.map((line, li) => (
            <text
              key={`dark-${li}`}
              x={ix}
              y={iy + (li - (lines.length - 1) / 2) * lineSpacing}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fontWeight={700}
              fill="rgba(255, 255, 255, 0.95)"
              className="select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 uppercase tracking-tight dark:opacity-100"
              style={{ 
                filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.9))",
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
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
  gridStrokeWidth,
}: {
  padding: number;
  inner: number;
  compassSize: number;
  gridStrokeWidth: { center: number; regular: number };
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
              isCenter ? "text-foreground/50 dark:text-foreground/60" : "text-foreground/[0.08]"
            }
            strokeWidth={isCenter ? gridStrokeWidth.center : gridStrokeWidth.regular}
          />
          <line
            y1={pos}
            x1={padding}
            y2={pos}
            x2={padding + inner}
            stroke="currentColor"
            className={
              isCenter ? "text-foreground/50 dark:text-foreground/60" : "text-foreground/[0.08]"
            }
            strokeWidth={isCenter ? gridStrokeWidth.center : gridStrokeWidth.regular}
          />
        </g>
      ))}
    </g>
  );
});

function PoliticalCompass({ parties, userResult, pastResults = [] }: Props) {
  const { t, locale } = useI18n();
  const ideologies = useTranslatedIdeologies(originalIdeologies);
  const [hoveredParty, setHoveredParty] = useState<Party | null>(null);
  const [selectedIdeology, setSelectedIdeology] = useState<Ideology | null>(null);
  const [hoveredIdeology, setHoveredIdeology] = useState<Ideology | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState(() => getResponsiveCompassSize());
  const [sortedIdeologiesList, setSortedIdeologiesList] = useState<Ideology[]>([]);
  const [ideologiesVisible, setIdeologiesVisible] = useState(() => {
    const stored = localStorage.getItem('ideologiesVisible');
    return stored === null ? true : stored === 'true';
  });

  // Persist ideology visibility
  useEffect(() => {
    localStorage.setItem('ideologiesVisible', String(ideologiesVisible));
  }, [ideologiesVisible]);

  const handleIdeologyClick = useCallback((ideology: Ideology) => {
    if (window.innerWidth < 640) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        const originalContent = viewport.getAttribute('content');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        
        setTimeout(() => {
          if (originalContent) {
            viewport.setAttribute('content', originalContent);
          }
        }, 100);
      }
    }
    
    const sorted = [...ideologies].sort((a, b) => a.x - b.x);
    setSortedIdeologiesList(sorted);
    setSelectedIdeology(ideology);
  }, []);

  const handleIdeologyNavigate = useCallback((direction: 'prev' | 'next') => {
    if (!selectedIdeology || sortedIdeologiesList.length === 0) return;
    
    const currentIndex = sortedIdeologiesList.findIndex(
      (ideo) => ideo.x === selectedIdeology.x && ideo.y === selectedIdeology.y
    );
    
    if (currentIndex === -1) return;
    
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
  const gridStrokeWidth = windowSize.gridStrokeWidth;
  const isMobile = windowSize.size < 550;

  const toXResponsive = (value: number) => padding + ((value + 10) / 20) * inner;
  const toYResponsive = (value: number) => padding + ((10 - value) / 20) * inner;

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

  const userPositionText = locale === 'en' ? 'YOU' : 'TU';

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      {/* Toggle Button */}
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIdeologiesVisible(!ideologiesVisible)}
          className="text-xs font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:hover:bg-primary/20 dark:hover:border-primary/50 transition-all duration-200"
          aria-label={ideologiesVisible ? t('compass.hideIdeologies') : t('compass.showIdeologies')}
        >
          {ideologiesVisible ? (
            <>
              <EyeOff className="w-3 h-3 mr-1.5" />
              {t('compass.hideIdeologies')}
            </>
          ) : (
            <>
              <Eye className="w-3 h-3 mr-1.5" />
              {t('compass.showIdeologies')}
            </>
          )}
        </Button>
      </div>

      <div className="p-2 sm:p-3 bg-background rounded-3xl border transition-all">
        <svg
          viewBox={`0 0 ${compassSize} ${compassSize}`}
          className="w-full h-auto overflow-visible"
          role="img"
          aria-label={t('compass.title')}
        >
          <g id="quadrants" opacity={0.04}>
            <rect x={padding} y={padding} width={inner / 2} height={inner / 2} fill="#ff4b4b" />
            <rect x={padding + inner / 2} y={padding} width={inner / 2} height={inner / 2} fill="#f59e0b" />
            <rect x={padding} y={padding + inner / 2} width={inner / 2} height={inner / 2} fill="#10b981" />
            <rect x={padding + inner / 2} y={padding + inner / 2} width={inner / 2} height={inner / 2} fill="#3b82f6" />
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
            visible={ideologiesVisible}
            ideologies={ideologies}
          />

          <GridLayer 
            padding={padding} 
            inner={inner} 
            compassSize={compassSize}
            gridStrokeWidth={gridStrokeWidth}
          />

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
                className="cursor-help transition-all outline-none focus:outline-none"
                role="button"
                tabIndex={-1}
                aria-label={`${party.name}: ${party.description}`}
              >
                <circle
                  cx={px}
                  cy={py}
                  r={isHovered ? 12 : 8}
                  fill={party.color}
                  className="stroke-foreground/20 dark:stroke-white stroke-[2px] shadow-sm transition-all duration-300"
                />
                <text
                  x={px}
                  y={py - 18}
                  textAnchor="middle"
                  fontSize={fontSize.party}
                  fontWeight={800}
                  className="fill-foreground select-none pointer-events-none tracking-tight"
                  style={{
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                  }}
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
              className="fill-primary stroke-background dark:stroke-white stroke-[3px] dark:stroke-[2px]"
            >
              <animate
                attributeName="cy"
                values={`${userY};${userY - 3};${userY}`}
                dur="2s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
              />
            </circle>
            <text
              x={userX}
              y={userY - 20}
              textAnchor="middle"
              fontSize={fontSize.party}
              fontWeight={950}
              className="fill-white dark:fill-primary uppercase tracking-tighter"
              style={{
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              <animate
                attributeName="y"
                values={`${userY - 20};${userY - 23};${userY - 20}`}
                dur="2s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
              />
              {userPositionText}
            </text>
          </g>

          {/* Enhanced axis labels with better contrast */}
          <g className="fill-foreground/60 dark:fill-foreground/70 font-black uppercase tracking-[0.2em] pointer-events-none">
            <text 
              x={compassSize / 2} 
              y={padding - 15} 
              textAnchor="middle" 
              fontSize={fontSize.axis}
              fontWeight={700}
              style={{
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {t('compass.axisAuth')}
            </text>
            <text
              x={compassSize / 2}
              y={compassSize - padding + 30}
              textAnchor="middle"
              fontSize={fontSize.axis}
              fontWeight={700}
              style={{
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {t('compass.axisLib')}
            </text>
            <text
              x={padding - 20}
              y={compassSize / 2}
              textAnchor="middle"
              fontSize={fontSize.axis}
              fontWeight={700}
              transform={`rotate(-90, ${padding - 20}, ${compassSize / 2})`}
              style={{
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {t('compass.axisLeft')}
            </text>
            <text
              x={compassSize - padding + 20}
              y={compassSize / 2}
              textAnchor="middle"
              fontSize={fontSize.axis}
              fontWeight={700}
              transform={`rotate(90, ${compassSize - padding + 20}, ${compassSize / 2})`}
              style={{
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {t('compass.axisRight')}
            </text>
          </g>
        </svg>

        {hoveredParty && (
          <div
            className="fixed z-50 pointer-events-none bg-card/95 backdrop-blur-md border-2 rounded-2xl p-4 max-w-[220px] animate-in fade-in zoom-in-95"
            style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 20 }}
            role="tooltip"
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
    </div>
  );
}

export default memo(PoliticalCompass);
