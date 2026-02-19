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
import { ideologies } from "@/data/ideologies";
import PoliticalCompass from "@/components/PoliticalCompass";
import ResultsGrid from "@/components/ResultsGrid";
import { ShareResults } from "@/components/ShareResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Trash2, History as HistoryIcon } from "lucide-react";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { generateShareUrl } from "@/lib/utils";

const getAxisLabel = (value: number, left: string, right: string): string => {
  const abs = Math.abs(value);
  if (abs < 1.5) return "Neutro";
  if (abs < 3.5) return value < 0 ? left : right;
  return value < 0 ? `${left}` : `${right}`;
};

const getQuadrantColor = (economicScore: number, authorityScore: number): string => {
  // Check if neutral on both axes
  const economicNeutral = Math.abs(economicScore) < 1.5;
  const authorityNeutral = Math.abs(authorityScore) < 1.5;
  
  if (economicNeutral && authorityNeutral) return "bg-gray-200"; // Neutral
  
  // Quadrants: Left-Auth (red), Right-Auth (orange), Left-Lib (green), Right-Lib (blue)
  const isLeft = economicScore < 0;
  const isAuth = authorityScore > 0;
  
  if (isLeft && isAuth) return "bg-red-400"; // Left-Authoritarian
  if (!isLeft && isAuth) return "bg-orange-400"; // Right-Authoritarian
  if (isLeft && !isAuth) return "bg-green-400"; // Left-Libertarian
  return "bg-blue-400"; // Right-Libertarian
};

const getProfileDescription = (result: StoredResult): string => {
  const econ = getAxisLabel(result.economicScore, "Esq", "Dir");
  const auth = getAxisLabel(result.authorityScore, "Lib", "Aut");
  const soc = getAxisLabel(result.socialScore, "Prog", "Cons");
  const sov = getAxisLabel(result.sovereigntyScore, "Global", "Nac");
  return `${econ} • ${auth} • ${soc} • ${sov}`;
};

export default function Bussola() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<StoredResult[]>(() => loadHistory());
  const [selected, setSelected] = useState<StoredResult | null>(() => {
    const hist = loadHistory();
    return hist.length > 0 ? hist[hist.length - 1] : null;
  });

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

  const userCoords = useMemo(
    () => ({
      economicScore: displayResult.economicScore,
      authorityScore: displayResult.authorityScore,
      socialScore: displayResult.socialScore,
      sovereigntyScore: displayResult.sovereigntyScore,
    }),
    [displayResult],
  );

  // Cálculo de ranking de partidos para o componente PartyResults
  const rankedParties = useMemo(() => {
    return [...parties]
      .map((party) => {
        const dEcon = displayResult.economicScore - party.x;
        const dAuth = displayResult.authorityScore - party.y;
        const dSoc = displayResult.socialScore - (party.z ?? 0);
        const dSov = displayResult.sovereigntyScore - (party.s ?? 0);

        const distance = Math.sqrt(
          Math.pow(dEcon, 2) +
            Math.pow(dAuth, 2) +
            Math.pow(dSoc, 2) +
            Math.pow(dSov, 2),
        );

        const match = Math.max(
          0,
          Math.min(100, Math.round((1 - distance / 40) * 100)),
        );
        return { ...party, distance, match };
      })
      .sort((a, b) => a.distance - b.distance);
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
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <AppHeader showBussola={false} />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6 space-y-12">
        {/* 1. Histórico Horizontal */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <HistoryIcon className="w-4 h-4 text-primary" />
            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
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
                <span className={`${TYPOGRAPHY.meta.sm} truncate`}>
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
                  className={`flex-shrink-0 flex flex-col justify-between w-32 h-20 p-3 rounded-2xl border transition-all ${
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
                      className={`w-2 h-2 rounded-full border border-white/20 ${getQuadrantColor(r.economicScore, r.authorityScore)}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono opacity-90 line-clamp-2 text-center">
                    {getProfileDescription(r)}
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
          <div className="space-y-12">
            {/* 2. Visualização da Bússola */}
            <div className="w-full overflow-hidden">
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

            {/* 3. Nota Metodológica */}
            <div className="w-full mx-auto p-6 rounded-2xl bg-secondary/20 border border-border/50">
              <h4 className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Nota Metodológica
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A proximidade é calculada através da distância euclidiana num espaço
                multidimensional que inclui os 4 eixos (Economia, Autoridade,
                Sociedade e Soberania).
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                O valor reflete a compatibilidade entre a tua posição e o programa
                oficial dos partidos para 2026.
              </p>
            </div>

            {/* 4. Grid de Resultados */}
            <ResultsGrid
              result={displayResult}
              rankedParties={rankedParties}
              ideologies={ideologies}
            />

            {/* 5. Share Results */}
            <Card className="border-primary/20 bg-primary/5 rounded-2xl md:rounded-3xl overflow-hidden">
              <CardContent className="p-4 md:p-8">
                <ShareResults
                  url={generateShareUrl(
                    displayResult.economicScore,
                    displayResult.authorityScore,
                    displayResult.socialScore,
                    displayResult.sovereigntyScore,
                  )}
                  text={`O meu perfil político para 2026! Partido mais próximo: ${rankedParties[0]?.shortName}.`}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <AppFooter />
    </div>
  );
}
