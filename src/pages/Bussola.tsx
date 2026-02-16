import { useNavigate } from "react-router-dom";
import {
  loadHistory,
  clearHistory,
  loadSession,
  calculateResult,
  StoredResult,
} from "@/lib/scoring";
import { questions } from "@/data/questions";
import { parties } from "@/data/parties";
import PoliticalCompass from "@/components/PoliticalCompass";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { ZoomIn, ZoomOut, RotateCcw, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function getConfidenceLabel(pct: number): { label: string; color: string } {
  if (pct >= 80) return { label: "Confiança alta", color: "text-accent" };
  if (pct >= 40) return { label: "Confiança média", color: "text-primary" };
  return { label: "Confiança baixa", color: "text-destructive" };
}

export default function Bussola() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [history, setHistory] = useState<StoredResult[]>(() => loadHistory());
  const [selected, setSelected] = useState<StoredResult | null>(null);

  // Estados para Transformação (Pan & Zoom)
  const [style, setStyle] = useState({ x: 0, y: 0, scale: 1 });
  const targetRef = useRef<HTMLDivElement>(null);

  // Auto-reset: Quando o utilizador faz zoom-out até ao mínimo (1), recentra o gráfico
  useEffect(() => {
    if (style.scale <= 1 && (style.x !== 0 || style.y !== 0)) {
      setStyle((s) => ({ ...s, x: 0, y: 0, scale: 1 }));
    }
  }, [style.scale]);

  // Configuração de Gestos Unificada
  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        // Permite arrastar apenas se houver zoom
        if (style.scale > 1) {
          setStyle((s) => ({ ...s, x, y }));
        }
      },
      onPinch: ({ first, movement: [ms], memo }) => {
        if (!isMobile) return;
        if (first) return style.scale;
        const nextScale = Math.max(1, Math.min(memo * ms, 4));
        setStyle((s) => ({ ...s, scale: nextScale }));
        return memo;
      },
    },
    {
      target: targetRef,
      drag: { from: () => [style.x, style.y] },
      pinch: { enabled: isMobile },
      eventOptions: { passive: false },
    },
  );

  const resetTransform = () => setStyle({ x: 0, y: 0, scale: 1 });

  // Lógica de Resultados
  const liveResult = useMemo(() => {
    const session = loadSession();
    if (!session || Object.keys(session.answers).length === 0) return null;
    return {
      result: calculateResult(
        session.answers,
        questions,
        session.importanceWeights,
      ),
      answeredCount: Object.keys(session.answers).length,
    };
  }, []);

  const answeredPct = liveResult
    ? Math.round((liveResult.answeredCount / questions.length) * 100)
    : 0;

  const displayResult = selected
    ? {
        economicScore: selected.economicScore,
        authorityScore: selected.authorityScore,
      }
    : liveResult
      ? liveResult.result
      : history.length > 0
        ? {
            economicScore: history[history.length - 1].economicScore,
            authorityScore: history[history.length - 1].authorityScore,
          }
        : { economicScore: 0, authorityScore: 0 };

  const pastForCompass = selected
    ? history.filter((r) => r.id !== selected.id)
    : history;

  const handleClear = () => {
    if (confirm("Apagar todo o histórico?")) {
      clearHistory();
      setHistory([]);
      setSelected(null);
    }
  };

  const confidence = liveResult ? getConfidenceLabel(answeredPct) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">
            Bússola Política
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/quiz")}
            >
              Questionário
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Início
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-5 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl text-foreground text-center sm:text-left">
            A Tua Bússola
          </h1>
          <p className="text-muted-foreground mt-1">
            A tua posição ideológica nos 4 quadrantes do espectro político.
          </p>
        </motion.div>

        {liveResult && !selected && (
          <div className="flex items-center justify-center sm:justify-start gap-3 text-sm bg-secondary/30 p-3 rounded-lg">
            <span className={`font-bold ${confidence!.color}`}>
              {confidence!.label}
            </span>
            <span className="text-muted-foreground">
              ({answeredPct}% concluído)
            </span>
          </div>
        )}

        {/* CONTENTOR DA BÚSSOLA INTERATIVO */}
        <div
          className={`relative border border-border rounded-2xl bg-card overflow-hidden shadow-sm ${isMobile ? "touch-none" : ""}`}
        >
          {/* CONTROLOS FLUTUANTES */}
          <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full shadow-md border border-border/50 bg-background/90 backdrop-blur"
              onClick={() =>
                setStyle((s) => ({ ...s, scale: Math.min(s.scale + 0.5, 4) }))
              }
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full shadow-md border border-border/50 bg-background/90 backdrop-blur"
              onClick={() =>
                setStyle((s) => ({ ...s, scale: Math.max(s.scale - 0.5, 1) }))
              }
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            {(style.scale > 1 || style.x !== 0 || style.y !== 0) && (
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 rounded-full shadow-md border border-border/50 bg-background/90 backdrop-blur"
                onClick={resetTransform}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* DICA MOBILE */}
          {isMobile && style.scale === 1 && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 pointer-events-none bg-background/90 backdrop-blur px-4 py-1.5 rounded-full border border-border shadow-sm flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground animate-pulse">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Pinch para Zoom</span>
            </div>
          )}

          {/* ÁREA DO GRÁFICO (ASPECT RATIO 1:1) */}
          <div
            className={`w-full aspect-square max-h-[75vh] flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none
              ${style.scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
          >
            <motion.div
              ref={targetRef}
              animate={{ x: style.x, y: style.y, scale: style.scale }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="w-full h-full"
              style={{ touchAction: "none" }}
            >
              <div className="w-full h-full flex items-center justify-center pointer-events-auto">
                <PoliticalCompass
                  parties={parties}
                  userResult={displayResult}
                  pastResults={pastForCompass}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECÇÃO DE HISTÓRICO */}
        {history.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-foreground">Histórico</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="text-destructive"
              >
                Limpar tudo
              </Button>
            </div>
            {[...history].reverse().map((r, i) => {
              const isSelected = selected?.id === r.id;
              const date = new Date(r.date);
              return (
                <motion.button
                  key={r.id}
                  onClick={() => setSelected(isSelected ? null : r)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-card-foreground font-medium">
                      {date.toLocaleDateString("pt-PT")} –{" "}
                      {date.toLocaleTimeString("pt-PT", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      E: {r.economicScore.toFixed(1)} | A:{" "}
                      {r.authorityScore.toFixed(1)}
                    </span>
                  </div>
                  {r.closestParties.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      Mais próximo: {r.closestParties.join(", ")}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
