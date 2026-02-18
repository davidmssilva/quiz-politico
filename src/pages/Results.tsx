import { useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { questions } from "@/data/questions";
import { parties } from "@/data/parties";
import { ideologies } from "@/data/ideologies";
import {
  calculateResult,
  rankParties,
  saveResult,
  loadHistory,
} from "@/lib/scoring";
import { generateShareUrl } from "@/lib/utils";

import PoliticalCompass from "@/components/PoliticalCompass";
import PartyResults from "@/components/PartyResults";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { IdeologicalDimensions } from "@/components/IdeologicalDimensions";
import { ShareResults } from "@/components/ShareResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IdeologyResults from "@/components/IdeologyResults";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { scores, isReadOnly } = useMemo(() => {
    const hash = window.location.hash;
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const hashParams = new URLSearchParams(queryString);

    const econ = hashParams.get("econ");
    const auth = hashParams.get("auth");
    const soc = hashParams.get("soc");
    const sov = hashParams.get("sov");

    if (econ !== null || auth !== null || soc !== null || sov !== null) {
      return {
        scores: {
          economicScore: parseFloat(econ || "0"),
          authorityScore: parseFloat(auth || "0"),
          socialScore: parseFloat(soc || "0"),
          sovereigntyScore: parseFloat(sov || "0"),
        },
        isReadOnly: true,
      };
    }

    const state = location.state as any;
    if (state?.answers) {
      return {
        scores: calculateResult(
          state.answers,
          questions,
          state.importanceWeights || {},
        ),
        isReadOnly: false,
      };
    }

    return { scores: null, isReadOnly: false };
  }, [location]);

  const userCoords = useMemo(() => {
    if (!scores) return null;
    return {
      economicScore: scores.economicScore,
      authorityScore: scores.authorityScore,
      socialScore: scores.socialScore,
      sovereigntyScore: scores.sovereigntyScore,
    };
  }, [scores]);

  const ranked = useMemo(
    () => (scores ? rankParties(scores, parties) : []),
    [scores],
  );

  const history = useMemo(() => loadHistory(), []);

  useEffect(() => {
    const state = location.state as any;
    if (scores && !isReadOnly && state?.answers) {
      saveResult({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        ...scores,
        answers: state.answers,
        importanceWeights: state.importanceWeights,
        closestParties: ranked.slice(0, 3).map((p) => p.shortName),
      });
    }
  }, [scores, isReadOnly, ranked, location.state]);

  if (!scores || !userCoords) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-balance">
          Sem dados de resultados
        </h2>
        <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
      </div>
    );
  }

  const shareUrl = generateShareUrl(
    scores.economicScore,
    scores.authorityScore,
    scores.socialScore,
    scores.sovereigntyScore
  );
  const shareText = `O meu perfil político para 2026! Partido mais próximo: ${ranked[0]?.shortName}.`;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <AppHeader />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 space-y-12">
        <section className="text-center space-y-4 px-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif text-3xl md:text-4xl font-black leading-tight"
          >
            A Tua <span className="text-primary italic">Identidade</span>{" "}
            Política
          </motion.h1>
          {isReadOnly && (
            <p className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 w-fit mx-auto px-3 py-1 rounded-full">
              Modo de Visualização
            </p>
          )}
        </section>

        {/* Bússola: O componente deve ser internamente responsivo */}
        <div className="w-full overflow-hidden">
          <PoliticalCompass
            parties={parties}
            userResult={scores}
            pastResults={history}
          />
        </div>

        {/* Nota Metodológica no Fim de Tudo */}
        <div className="w-full mx-auto p-6 rounded-2xl bg-secondary/20 border border-border/50">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Nota Metodológica
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            A proximidade é calculada através da distância euclidiana num espaço
            multidimensional que inclui os 4 eixos (Economia, Autoridade,
            Sociedade e Soberania).
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            O valor reflete a compatibilidade entre a tua posição e o programa
            oficial dos partidos para 2026.
          </p>
        </div>

        {/* Grid de Resultados: Stack vertical em mobile, 2 colunas em LG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Coluna 1: Afinidade Partidária */}
          <div className="space-y-8 w-full overflow-hidden">
            <h2 className="font-serif text-2xl font-bold border-b pb-4">
              Afinidade Partidária
            </h2>
            <PartyResults rankedParties={ranked} />
          </div>

          {/* Coluna 2: Dimensões e Ideologias */}
          <div className="space-y-12 w-full overflow-hidden">
            <section className="space-y-8">
              <h2 className="font-serif text-2xl font-bold border-b pb-4">
                Profundidade Ideológica
              </h2>
              <IdeologicalDimensions result={scores} />
            </section>

            <section className="space-y-8">
              <h2 className="font-serif text-2xl font-bold border-b pb-4">
                Espectro Ideológico
              </h2>
              <IdeologyResults
                userCoords={userCoords}
                ideologies={ideologies}
              />
            </section>
          </div>
        </div>

        {/* Secção de Rodapé: Share e Ações em largura total */}
        <footer className="pt-8 border-t space-y-6 w-full">
          <Card className="border-primary/20 bg-primary/5 rounded-2xl md:rounded-3xl overflow-hidden">
            <CardContent className="p-4 md:p-8">
              <ShareResults url={shareUrl} text={shareText} />
            </CardContent>
          </Card>

          <Button
            onClick={() => navigate("/quiz")}
            size="lg"
            className="w-full h-14 md:h-16 rounded-2xl font-bold text-base md:text-lg shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98]"
          >
            Repetir Questionário
          </Button>
        </footer>
      </main>
      <AppFooter />
    </div>
  );
}
