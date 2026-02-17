import { useMemo, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

// Scoping & Data
import { questions } from "@/data/questions";
import { parties } from "@/data/parties";
import {
  calculateResult,
  rankParties,
  saveResult,
  loadHistory,
} from "@/lib/scoring";

// Components
import PoliticalCompass from "@/components/PoliticalCompass";
import PartyResults from "@/components/PartyResults";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { IdeologicalDimensions } from "@/components/IdeologicalDimensions";
import { ShareResults } from "@/components/ShareResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Recuperar dados do estado (vindo do Quiz) ou URL (partilha)
  const state = location.state as any;
  const answers = state?.answers;
  const importance = state?.importanceWeights ?? {};

  const scores = useMemo(() => {
    // Se vier de um link de partilha (URL params)
    if (params.get("econ")) {
      return {
        economicScore: parseFloat(params.get("econ") || "0"),
        authorityScore: parseFloat(params.get("auth") || "0"),
        socialScore: parseFloat(params.get("soc") || "0"),
        sovereigntyScore: parseFloat(params.get("sov") || "0"),
      };
    }
    // Se vier do Quiz atual
    if (answers) {
      return calculateResult(answers, questions, importance);
    }
    return null;
  }, [answers, importance, params]);

  // Ranking de partidos baseado no cálculo vetorial
  const ranked = useMemo(
    () => (scores ? rankParties(scores, parties) : []),
    [scores],
  );

  // Histórico para mostrar pontos passados na bússola
  const history = useMemo(() => loadHistory(), []);

  // Guardar no LocalStorage apenas se o resultado for "fresco" (vindo de respostas)
  useEffect(() => {
    if (scores && answers) {
      saveResult({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        ...scores,
        answers,
        importanceWeights: importance,
        closestParties: ranked.slice(0, 3).map((p) => p.shortName),
      });
    }
  }, [scores, answers, importance, ranked]);

  if (!scores) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold">
          Sem dados de resultados
        </h2>
        <p className="text-muted-foreground">
          Não encontramos respostas para processar.
        </p>
        <Button onClick={() => navigate("/")} className="rounded-xl px-8">
          Voltar ao Início
        </Button>
      </div>
    );
  }

  // Configuração de partilha
  const shareUrl = `${window.location.origin}/resultados?econ=${scores.economicScore.toFixed(1)}&auth=${scores.authorityScore.toFixed(1)}&soc=${scores.socialScore.toFixed(1)}&sov=${scores.sovereigntyScore.toFixed(1)}`;
  const shareText = `O meu perfil político para 2026! Partido mais próximo: ${ranked[0]?.shortName}. Vê o teu aqui:`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-12 sm:space-y-20">
        {/* Introdução / Título */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              A Tua <span className="text-primary italic">Identidade</span>{" "}
              Política
            </h1>
            <p className="text-muted-foreground text-sm sm:text-lg mt-4 leading-relaxed">
              Análise baseada nos programas eleitorais de 2026. A bússola mostra
              a tua posição clássica, enquanto os eixos abaixo detalham a tua
              visão sobre sociedade e soberania.
            </p>
          </motion.div>
        </section>

        {/* 1. Bússola Política Clássica (2 Eixos) */}
        <section className="space-y-8">
          {/* Passamos apenas economicScore e authorityScore para manter o gráfico original */}
          <PoliticalCompass
            parties={parties}
            userResult={{
              economicScore: scores.economicScore,
              authorityScore: scores.authorityScore,
              socialScore: scores.socialScore,
              sovereigntyScore: scores.sovereigntyScore,
            }}
            pastResults={history}
          />
        </section>

        {/* 2. Grid de Detalhes: Afinidade e Dimensões 4-Eixos */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Coluna Esquerda: Afinidade Partidária */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl font-bold">
                Afinidade Partidária
              </h2>
              <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                Proximidade %
              </span>
            </div>
            <PartyResults rankedParties={ranked} />
          </div>

          {/* Coluna Direita: Profundidade Ideológica e Partilha */}
          <div className="space-y-10 order-1 lg:order-2">
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Nota Metodológica
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A proximidade é calculada através da distância euclidiana num
                espaço multidimensional. Este inclui os 4 eixos adicionais.
                Mesmo que um partido esteja no teu quadrante, a distância final
                considera todos os pesos atribuídos às tuas respostas e a
                importância que deste a cada tema.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <h2 className="font-serif text-2xl font-bold">
                  Dimensões Detalhadas
                </h2>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Análise de 4 Eixos
                </span>
              </div>
              <IdeologicalDimensions result={scores} />
            </div>

            <Card className="border-primary/20 bg-primary/5 rounded-3xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <ShareResults url={shareUrl} text={shareText} />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => navigate("/quiz")}
                size="lg"
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02]"
              >
                Repetir Questionário
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="w-full h-12 text-muted-foreground font-bold"
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
