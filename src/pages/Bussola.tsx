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
import { useState, useMemo } from "react";

function getConfidenceLabel(pct: number): { label: string; color: string } {
  if (pct >= 80) return { label: "Confiança alta", color: "text-accent" };
  if (pct >= 40) return { label: "Confiança média", color: "text-primary" };
  return { label: "Confiança baixa", color: "text-destructive" };
}

export default function Bussola() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<StoredResult[]>(() => loadHistory());
  const [selected, setSelected] = useState<StoredResult | null>(null);

  // Live position from current session
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

  // Determine what to show on compass
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
    clearHistory();
    setHistory([]);
    setSelected(null);
  };

  const confidence = liveResult ? getConfidenceLabel(answeredPct) : null;
  const hasNoData = !liveResult && history.length === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
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

      <main className="flex-1 container max-w-4xl mx-auto px-5 py-8 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl text-foreground">
            Bússola: 4 Eixos
          </h1>
          <p className="text-muted-foreground mt-1">
            A tua posição ideológica nos 4 quadrantes do espectro político.
          </p>
        </motion.div>

        {/* Live confidence indicator */}
        {liveResult && !selected && (
          <div className="flex items-center gap-3 text-sm">
            <span className={`font-medium ${confidence!.color}`}>
              {confidence!.label}
            </span>
            <span className="text-muted-foreground">
              ({liveResult.answeredCount}/{questions.length} perguntas
              respondidas — {answeredPct}%)
            </span>
          </div>
        )}

        {hasNoData && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            A tua bússola ideológica aparecerá aqui à medida que responderes às
            perguntas.
          </div>
        )}

        <PoliticalCompass
          parties={parties}
          userResult={displayResult}
          pastResults={pastForCompass}
        />

        {/* History timeline */}
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

        {/* CTA if no answers yet */}
        {hasNoData && (
          <div className="text-center">
            <Button onClick={() => navigate("/quiz")}>
              Começar Questionário
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
