import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { questions } from "@/data/questions";
import { parties } from "@/data/parties";
import { Answer, calculateResult, rankParties, saveResult, loadHistory, StoredResult } from "@/lib/scoring";
import PoliticalCompass from "@/components/PoliticalCompass";
import PartyResults from "@/components/PartyResults";
import AdSlot from "@/components/AdSlot";
import { Button } from "@/components/ui/button";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sharedEcon = searchParams.get("econ");
  const sharedAuth = searchParams.get("auth");

  const state = location.state as { answers?: Record<number, Answer>; importanceWeights?: Record<number, number> } | null;
  const answers = state?.answers;
  const importanceWeights = state?.importanceWeights ?? {};

  const result = useMemo(() => {
    if (sharedEcon && sharedAuth) {
      return {
        economicScore: parseFloat(sharedEcon),
        authorityScore: parseFloat(sharedAuth),
      };
    }
    if (answers) {
      return calculateResult(answers, questions, importanceWeights);
    }
    return null;
  }, [answers, importanceWeights, sharedEcon, sharedAuth]);

  const ranked = useMemo(() => {
    if (!result) return [];
    return rankParties(result, parties);
  }, [result]);

  const pastResults = useMemo(() => loadHistory(), []);

  useEffect(() => {
    if (result && answers) {
      const stored: StoredResult = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        economicScore: result.economicScore,
        authorityScore: result.authorityScore,
        answers,
        importanceWeights,
        closestParties: ranked.slice(0, 3).map((p) => p.shortName),
      };
      saveResult(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Nenhum resultado encontrado.</p>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const getQuadrant = () => {
    const econ = result.economicScore > 0 ? "liberal" : "socialista";
    // Positive authorityScore = libertarian, negative = authoritarian
    const auth = result.authorityScore > 0 ? "libertário" : "autoritário";
    return `${econ} e ${auth}`;
  };

  const shareUrl = `${window.location.origin}/resultados?econ=${result.economicScore.toFixed(1)}&auth=${result.authorityScore.toFixed(1)}`;
  const shareText = `Bússola Política de Portugal\nEconómico: ${result.economicScore.toFixed(1)} | Autoridade: ${result.authorityScore.toFixed(1)}\nPartido mais próximo: ${ranked[0]?.shortName}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">Bússola Política</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/bussola")}>
              Bússola
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Novo Quiz
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground">Os Teus Resultados</h1>
          <p className="text-muted-foreground">
            A tua posição política é tendencialmente <strong className="text-foreground">{getQuadrant()}</strong>.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
            <span>Económico: <strong className="text-foreground">{result.economicScore.toFixed(1)}</strong></span>
            <span>Autoridade: <strong className="text-foreground">{result.authorityScore.toFixed(1)}</strong></span>
          </div>
        </div>

        <PoliticalCompass parties={parties} userResult={result} pastResults={pastResults} />

        <div className="grid lg:grid-cols-2 gap-8">
          <PartyResults rankedParties={ranked} />

          <div className="space-y-4">
            <h3 className="font-serif text-xl text-foreground">Como funciona</h3>
            <div className="bg-card border border-border rounded-lg p-5 space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-card-foreground">Eixo Económico (horizontal):</strong> Esquerda indica preferência por intervenção estatal e redistribuição. Direita indica preferência por mercado livre e privatização.
              </p>
              <p>
                <strong className="text-card-foreground">Eixo de Autoridade (vertical):</strong> Topo indica autoritarismo e controlo estatal. Base indica liberdades civis e descentralização.
              </p>
              <p>
                A posição dos partidos é baseada nos seus programas eleitorais e posições públicas. Podes ajustar a importância de cada pergunta para personalizar o resultado.
              </p>
            </div>

            <h3 className="font-serif text-xl text-foreground pt-2">Partilhar</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm"
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank")}>
                Twitter / X
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")}>
                Facebook
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`, "_blank")}>
                WhatsApp
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => window.open(`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("O meu resultado na Bússola Política de Portugal")}`, "_blank")}>
                Reddit
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => navigator.clipboard.writeText(shareUrl)}>
                Copiar Link
              </Button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="flex-1" onClick={() => navigate("/quiz")}>
                Repetir Quiz
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AdSlot className="container max-w-4xl mx-auto px-4" />

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Baseado nos programas oficiais dos partidos portugueses. Apenas para fins informativos.
      </footer>
    </div>
  );
}
