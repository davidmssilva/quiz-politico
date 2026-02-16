import { useNavigate } from "react-router-dom";
import { loadHistory, clearHistory, StoredResult } from "@/lib/scoring";
import { parties } from "@/data/parties";
import PoliticalCompass from "@/components/PoliticalCompass";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<StoredResult[]>(() => loadHistory());
  const [selected, setSelected] = useState<StoredResult | null>(null);

  const displayResult = selected ?? history[history.length - 1];

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    setSelected(null);
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <span className="font-serif text-lg text-primary">Bússola Política</span>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>Início</Button>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Ainda não tens resultados guardados.</p>
            <Button onClick={() => navigate("/quiz")}>Fazer o Quiz</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">Bússola Política</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>Início</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-serif text-3xl text-foreground">Histórico de Resultados</h1>
          <p className="text-muted-foreground mt-1">Os teus resultados anteriores e a evolução ideológica.</p>
        </motion.div>

        {displayResult && (
          <PoliticalCompass
            parties={parties}
            userResult={{ economicScore: displayResult.economicScore, authorityScore: displayResult.authorityScore }}
            pastResults={history.filter((r) => r.id !== displayResult.id)}
          />
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl text-foreground">Linha temporal</h3>
            <Button variant="outline" size="sm" onClick={handleClear} className="text-destructive">
              Limpar tudo
            </Button>
          </div>
          {[...history].reverse().map((r, i) => {
            const isSelected = selected?.id === r.id;
            const date = new Date(r.date);
            return (
              <motion.button
                key={r.id}
                onClick={() => setSelected(r)}
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
                    {date.toLocaleDateString("pt-PT")} – {date.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    E: {r.economicScore.toFixed(1)} | A: {r.authorityScore.toFixed(1)}
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
      </main>
    </div>
  );
}
