import { useNavigate } from "react-router-dom";
import {
  loadHistory,
  clearHistory,
  loadSession,
  calculateResult,
  StoredResult,
  QuizResult,
} from "@/lib/scoring";
import { questions } from "@/data/questions";
import { parties } from "@/data/parties";
import PoliticalCompass from "@/components/PoliticalCompass";
import { IdeologicalDimensions } from "@/components/IdeologicalDimensions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Trash2, History as HistoryIcon, Users } from "lucide-react";

export default function Bussola() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<StoredResult[]>(() => loadHistory());
  const [selected, setSelected] = useState<StoredResult | null>(null);

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

  const displayResult: QuizResult = useMemo(() => {
    const base = selected ||
      liveResult?.result ||
      history[history.length - 1] || {
        economicScore: 0,
        authorityScore: 0,
        socialScore: 0,
        sovereigntyScore: 0,
      };
    return {
      economicScore: base.economicScore,
      authorityScore: base.authorityScore,
      socialScore: (base as any).socialScore ?? 0,
      sovereigntyScore: (base as any).sovereigntyScore ?? 0,
    };
  }, [selected, liveResult, history]);

  const topParties = useMemo(() => {
    return [...parties]
      .map((party) => {
        const distance = Math.sqrt(
          Math.pow(party.x - displayResult.economicScore, 2) +
            Math.pow(party.y - displayResult.authorityScore, 2) +
            Math.pow(party.z - (displayResult as any).socialScore, 2) +
            Math.pow(party.s - (displayResult as any).sovereigntyScore, 2),
        );
        const affinity = Math.max(0, Math.min(100, 100 - distance * 3.5));
        return { ...party, affinity };
      })
      .sort((a, b) => b.affinity - a.affinity)
      .slice(0, 5);
  }, [displayResult]);

  const handleClear = () => {
    if (confirm("Apagar todo o histórico de resultados?")) {
      clearHistory();
      setHistory([]);
      setSelected(null);
    }
  };

  const hasNoData = !liveResult && history.length === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={false} />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* 1. Histórico Horizontal */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <HistoryIcon className="w-4 h-4 text-primary" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Histórico de Sessões
            </h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
            {history.length > 0 && (
              <button
                onClick={handleClear}
                className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-16 rounded-2xl border border-dashed border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-bold uppercase">Limpar</span>
              </button>
            )}

            {liveResult && (
              <button
                onClick={() => setSelected(null)}
                className={`flex-shrink-0 flex flex-col justify-between w-32 h-16 p-3 rounded-2xl border transition-all ${
                  !selected
                    ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/20"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <span className="text-[10px] font-bold uppercase opacity-80">
                  Atual
                </span>
                <span className="text-xs font-serif font-bold truncate">
                  Em curso...
                </span>
              </button>
            )}

            {[...history].reverse().map((r) => {
              const isSelected = selected?.id === r.id;
              const date = new Date(r.date);
              return (
                <button
                  key={r.id}
                  onClick={() => setSelected(isSelected ? null : r)}
                  className={`flex-shrink-0 flex flex-col justify-between w-32 h-16 p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/20"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-[10px] font-bold uppercase opacity-70">
                      {date.toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full border border-white/20 ${r.economicScore < 0 ? "bg-red-400" : "bg-blue-400"}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono opacity-90 truncate">
                    E:{r.economicScore.toFixed(0)} A:
                    {r.authorityScore.toFixed(0)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {hasNoData ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <p className="text-muted-foreground italic">Sem dados guardados.</p>
            <Button onClick={() => navigate("/quiz")} className="rounded-full">
              Começar Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 2. Grid Principal: Bússola à Esquerda, Eixos à Direita */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="bg-card rounded-3xl border border-border">
                  <PoliticalCompass
                    parties={parties}
                    userResult={displayResult}
                    pastResults={
                      selected
                        ? history.filter((h) => h.id !== selected.id)
                        : history
                    }
                  />
                </div>
              </div>

              <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                <section className="bg-card rounded-3xl border border-border">
                  {selected && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                      Histórico
                    </span>
                  )}

                  <div className="scale-100 origin-top">
                    <IdeologicalDimensions result={displayResult} />
                  </div>
                </section>

                {/* Nota Metodológica no Fim de Tudo */}
                <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-secondary/20 border border-border/50">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    Nota Metodológica
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    A proximidade é calculada através da distância euclidiana
                    num espaço multidimensional que inclui os 4 eixos (Economia,
                    Autoridade, Sociedade e Soberania). O valor reflete a
                    compatibilidade entre a tua posição e o programa oficial dos
                    partidos para 2026.
                  </p>
                </div>
                {/* Tendência Dominante Logo Abaixo dos Eixos */}
                {displayResult.economicScore !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">
                      Tendência Dominante
                    </p>
                    <p className="text-xl font-serif font-bold text-primary italic leading-tight">
                      {displayResult.economicScore < 0 ? "Esquerda" : "Direita"}{" "}
                      {displayResult.authorityScore < 0
                        ? "Liberal"
                        : "Conservadora"}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* 3. Afinidade Partidária (Top 5) - Ocupa a largura total abaixo */}
            <section className="space-y-8 pt-8 border-t border-border">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Afinidade Partidária
                </h2>
                <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Top 5 %
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-12 gap-y-6 max-w-4xl mx-auto">
                {topParties.map((party, index) => (
                  <motion.div
                    key={party.shortName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">
                          {party.shortName}
                        </span>
                        <span className="text-sm font-bold group-hover:text-primary transition-colors">
                          {party.name}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-serif font-black italic">
                          {party.affinity.toFixed(0)}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm border border-border/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${party.affinity}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: index * 0.1,
                        }}
                        style={{ backgroundColor: party.color }}
                        className="h-full rounded-full shadow-[0_0_15px_-3px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
