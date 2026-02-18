import { useNavigate } from "react-router-dom";
import { loadHistory, clearHistory, StoredResult } from "@/lib/scoring";
import { parties } from "@/data/parties";
import PoliticalCompass from "@/components/PoliticalCompass";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { TYPOGRAPHY } from "@/lib/typography";

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<StoredResult[]>(() => loadHistory());
  const [selected, setSelected] = useState<StoredResult | null>(null);

  const displayResult = selected ?? history[history.length - 1];

  const handleClear = () => {
    if (confirm("Tens a certeza que queres apagar todo o teu histórico?")) {
      clearHistory();
      setHistory([]);
      setSelected(null);
    }
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AppHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className={TYPOGRAPHY.heading.h2}>Sem histórico</h2>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Ainda não concluíste nenhum questionário para guardar resultados.
            </p>
          </div>
          <Button
            onClick={() => navigate("/quiz")}
            size="lg"
            className="rounded-full shadow-md"
          >
            Fazer o Quiz agora
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={TYPOGRAPHY.heading.h1}>
            Evolução Ideológica
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Compara as tuas diferentes sessões e vê como as tuas opiniões mudam.
          </p>
        </motion.div>

        {displayResult && (
          <div className="bg-card p-4 rounded-2xl border border-border shadow-xl">
            <PoliticalCompass
              parties={parties}
              userResult={{
                economicScore: displayResult.economicScore,
                authorityScore: displayResult.authorityScore,
                socialScore: (displayResult as any).socialScore || 0,
                sovereigntyScore: (displayResult as any).sovereigntyScore || 0,
              }}
              pastResults={history.filter((r) => r.id !== displayResult.id)}
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className={TYPOGRAPHY.heading.h3}>Linha Temporal</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="text-destructive hover:bg-destructive/5 border-destructive/20 transition-all"
            >
              Apagar Tudo
            </Button>
          </div>

          <div className="grid gap-3">
            {[...history].reverse().map((r, i) => {
              const isSelected =
                selected?.id === r.id || (!selected && i === 0);
              const date = new Date(r.date);
              return (
                <motion.button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${TYPOGRAPHY.heading.h4} text-card-foreground`}>
                        {date.toLocaleDateString("pt-PT", {
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider">
                        {date.toLocaleTimeString("pt-PT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        E:{" "}
                        <span
                          className={
                            r.economicScore > 0
                              ? "text-blue-500"
                              : "text-red-500"
                          }
                        >
                          {r.economicScore.toFixed(1)}
                        </span>
                      </p>
                      <p className="text-sm font-medium">
                        A:{" "}
                        <span
                          className={
                            r.authorityScore > 0
                              ? "text-slate-500"
                              : "text-green-600"
                          }
                        >
                          {r.authorityScore.toFixed(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                  {r.closestParties.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary/40 w-full"></div>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-semibold whitespace-nowrap">
                        PRÓXIMO DE: {r.closestParties[0]}
                      </span>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
